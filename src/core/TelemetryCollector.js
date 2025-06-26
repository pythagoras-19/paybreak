import { v4 as uuidv4 } from 'uuid';

let isLoggingTelemetry = false;

/**
 * Enhanced Telemetry Collector - Captures detailed data about bypass attempts and page state
 */
export class TelemetryCollector {
  constructor() {
    this.sessionId = uuidv4();
    this.telemetryData = [];
    this.networkRequests = [];
    this.consoleLogs = [];
    this.domChanges = [];
    this.performanceMetrics = [];
    this.userInteractions = [];
    this.errors = [];
    this.memoryUsage = [];
    this.isCollecting = false;
    this.logLevel = 'debug'; // debug, info, warn, error
    this.maxLogEntries = 10000; // Prevent memory issues
    
    // Enhanced event tracking
    this.eventCounters = {
      bypass_attempts: 0,
      network_requests: 0,
      console_logs: 0,
      dom_mutations: 0,
      user_interactions: 0,
      errors: 0,
      performance_events: 0
    };
    
    // Bind methods
    this.captureNetworkRequest = this.captureNetworkRequest.bind(this);
    this.captureConsoleLog = this.captureConsoleLog.bind(this);
    this.captureDOMMutation = this.captureDOMMutation.bind(this);
    this.capturePerformanceMetric = this.capturePerformanceMetric.bind(this);
    this.captureUserInteraction = this.captureUserInteraction.bind(this);
    this.captureError = this.captureError.bind(this);
    this.captureMemoryUsage = this.captureMemoryUsage.bind(this);
  }

  /**
   * Set logging level
   */
  setLogLevel(level) {
    this.logLevel = level;
    this.logTelemetry('log_level_changed', { level, timestamp: Date.now() });
  }

  /**
   * Start telemetry collection with enhanced monitoring
   */
  startCollection() {
    if (this.isCollecting) return;

    this.isCollecting = true;
    this.setupNetworkInterception();
    this.setupConsoleInterception();
    this.setupDOMMutationObserver();
    this.setupPerformanceObserver();
    this.setupUserInteractionTracking();
    this.setupErrorTracking();
    this.setupMemoryMonitoring();
    this.setupPageVisibilityTracking();
    this.setupStorageMonitoring();

    this.logTelemetry('collection_started', {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href,
      screenResolution: `${screen.width}x${screen.height}`,
      viewportSize: `${window.innerWidth}x${window.innerHeight}`,
      timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
      language: navigator.language,
      cookieEnabled: navigator.cookieEnabled,
      onLine: navigator.onLine,
      platform: navigator.platform
    });
  }

  /**
   * Stop telemetry collection
   */
  stopCollection() {
    if (!this.isCollecting) return;

    this.isCollecting = false;
    this.cleanupInterceptors();

    this.logTelemetry('collection_stopped', {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      totalRecords: this.telemetryData.length,
      eventCounters: this.eventCounters
    });
  }

  /**
   * Setup enhanced network request interception
   */
  setupNetworkInterception() {
    // Intercept fetch requests with detailed logging
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = Date.now();
      const [url, options] = args;
      const requestId = uuidv4();
      
      // Capture request details
      const requestData = {
        id: requestId,
        type: 'fetch',
        url: typeof url === 'string' ? url : url.toString(),
        method: options?.method || 'GET',
        headers: options?.headers || {},
        body: options?.body,
        timestamp: startTime,
        requestSize: options?.body ? JSON.stringify(options.body).length : 0
      };

      this.logTelemetry('network_request_started', requestData);
      
      try {
        const response = await originalFetch(...args);
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        // Capture response details
        const responseData = {
          ...requestData,
          status: response.status,
          statusText: response.statusText,
          duration,
          responseSize: response.headers.get('content-length') || 'unknown',
          contentType: response.headers.get('content-type'),
          success: response.ok,
          timestamp: endTime
        };

        this.captureNetworkRequest(responseData);
        this.logTelemetry('network_request_completed', responseData);
        
        return response;
      } catch (error) {
        const endTime = Date.now();
        const duration = endTime - startTime;
        
        const errorData = {
          ...requestData,
          error: error.message,
          errorStack: error.stack,
          duration,
          timestamp: endTime,
          success: false
        };

        this.captureNetworkRequest(errorData);
        this.captureError('network_error', error, { requestData });
        this.logTelemetry('network_request_failed', errorData);
        
        throw error;
      }
    };

    // Enhanced XMLHttpRequest interception
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      this._paybreakMethod = method;
      this._paybreakUrl = url;
      this._paybreakStartTime = Date.now();
      this._paybreakRequestId = uuidv4();
      this._paybreakArgs = args;
      
      this.logTelemetry('xhr_request_started', {
        id: this._paybreakRequestId,
        method,
        url,
        timestamp: this._paybreakStartTime
      });
      
      return originalOpen.call(this, method, url, ...args);
    };

    XMLHttpRequest.prototype.send = function(...args) {
      const xhr = this;
      const originalOnReadyStateChange = xhr.onreadystatechange;
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          const endTime = Date.now();
          const duration = endTime - xhr._paybreakStartTime;
          
          const xhrData = {
            id: xhr._paybreakRequestId,
            type: 'xhr',
            url: xhr._paybreakUrl,
            method: xhr._paybreakMethod,
            status: xhr.status,
            statusText: xhr.statusText,
            duration,
            responseText: xhr.responseText?.substring(0, 1000), // Limit response size
            responseType: xhr.responseType,
            timestamp: endTime,
            success: xhr.status >= 200 && xhr.status < 300
          };

          this.captureNetworkRequest(xhrData);
          this.logTelemetry('xhr_request_completed', xhrData);
        }
        
        if (originalOnReadyStateChange) {
          originalOnReadyStateChange.apply(xhr, arguments);
        }
      }.bind(this);
      
      return originalSend.apply(xhr, args);
    }.bind(this);
  }

  /**
   * Setup enhanced console log interception
   */
  setupConsoleInterception() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;
    const originalDebug = console.debug;
    const originalTrace = console.trace;

    const createConsoleInterceptor = (level, original) => {
      return (...args) => {
        // Capture stack trace for errors and warnings
        const stackTrace = level === 'error' || level === 'warn' ? new Error().stack : null;
        
        this.captureConsoleLog(level, args, stackTrace);
        original.apply(console, args);
      };
    };

    console.log = createConsoleInterceptor('log', originalLog);
    console.error = createConsoleInterceptor('error', originalError);
    console.warn = createConsoleInterceptor('warn', originalWarn);
    console.info = createConsoleInterceptor('info', originalInfo);
    console.debug = createConsoleInterceptor('debug', originalDebug);
    console.trace = createConsoleInterceptor('trace', originalTrace);
  }

  /**
   * Setup enhanced DOM mutation observer
   */
  setupDOMMutationObserver() {
    this.domObserver = new MutationObserver((mutations) => {
      mutations.forEach(mutation => {
        this.captureDOMMutation(mutation);
      });
    });

    this.domObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeOldValue: true,
      characterData: true,
      characterDataOldValue: true
    });
  }

  /**
   * Setup enhanced performance observer
   */
  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          this.capturePerformanceMetric(entry);
        });
      });

      this.performanceObserver.observe({ 
        entryTypes: ['navigation', 'resource', 'paint', 'measure', 'mark', 'largest-contentful-paint', 'first-input', 'layout-shift'] 
      });
    }
  }

  /**
   * Setup user interaction tracking
   */
  setupUserInteractionTracking() {
    const events = ['click', 'input', 'change', 'submit', 'keydown', 'keyup', 'mousedown', 'mouseup', 'scroll', 'resize'];
    
    events.forEach(eventType => {
      document.addEventListener(eventType, (event) => {
        this.captureUserInteraction(eventType, event);
      }, { capture: true, passive: true });
    });
  }

  /**
   * Setup error tracking
   */
  setupErrorTracking() {
    // Global error handler
    window.addEventListener('error', (event) => {
      this.captureError('global_error', event.error, {
        filename: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        message: event.message
      });
    });

    // Unhandled promise rejection
    window.addEventListener('unhandledrejection', (event) => {
      this.captureError('unhandled_rejection', event.reason, {
        promise: event.promise
      });
    });
  }

  /**
   * Setup memory monitoring
   */
  setupMemoryMonitoring() {
    if ('memory' in performance) {
      setInterval(() => {
        this.captureMemoryUsage();
      }, 10000); // Every 10 seconds
    }
  }

  /**
   * Setup page visibility tracking
   */
  setupPageVisibilityTracking() {
    document.addEventListener('visibilitychange', () => {
      this.logTelemetry('page_visibility_changed', {
        hidden: document.hidden,
        timestamp: Date.now()
      });
    });
  }

  /**
   * Setup storage monitoring
   */
  setupStorageMonitoring() {
    // Monitor localStorage changes
    const originalSetItem = Storage.prototype.setItem;
    Storage.prototype.setItem = function(key, value) {
      this.logTelemetry('localStorage_changed', {
        action: 'set',
        key,
        value: String(value).substring(0, 100), // Limit value size
        timestamp: Date.now()
      });
      return originalSetItem.call(this, key, value);
    }.bind(this);

    const originalRemoveItem = Storage.prototype.removeItem;
    Storage.prototype.removeItem = function(key) {
      this.logTelemetry('localStorage_changed', {
        action: 'remove',
        key,
        timestamp: Date.now()
      });
      return originalRemoveItem.call(this, key);
    }.bind(this);
  }

  /**
   * Capture network request
   */
  captureNetworkRequest(data) {
    const request = {
      id: uuidv4(),
      sessionId: this.sessionId,
      ...data
    };

    this.networkRequests.push(request);
    this.logTelemetry('network_request', request);
  }

  /**
   * Capture console log
   */
  captureConsoleLog(level, args, stackTrace) {
    if (isLoggingTelemetry) return;

    let safeArgs;
    try {
      safeArgs = args.map(arg => {
        if (typeof arg === 'object') {
          return JSON.stringify(arg, getCircularReplacer(), 2).slice(0, 1000);
        }
        return String(arg);
      });
    } catch (e) {
      safeArgs = ['[Unserializable argument]'];
    }

    const log = {
      id: uuidv4(),
      sessionId: this.sessionId,
      level,
      message: safeArgs.join(' '),
      stackTrace: stackTrace,
      timestamp: Date.now()
    };

    this.consoleLogs.push(log);
    isLoggingTelemetry = true;
    try {
      this.logTelemetry('console_log', log);
    } finally {
      isLoggingTelemetry = false;
    }
  }

  /**
   * Capture DOM mutation
   */
  captureDOMMutation(mutation) {
    const domChange = {
      id: uuidv4(),
      sessionId: this.sessionId,
      type: mutation.type,
      target: mutation.target.tagName + (mutation.target.id ? `#${mutation.target.id}` : ''),
      addedNodes: Array.from(mutation.addedNodes).map(node => 
        node.nodeType === Node.ELEMENT_NODE ? node.tagName : node.nodeName
      ),
      removedNodes: Array.from(mutation.removedNodes).map(node => 
        node.nodeType === Node.ELEMENT_NODE ? node.tagName : node.nodeName
      ),
      attributeName: mutation.attributeName,
      oldValue: mutation.oldValue,
      timestamp: Date.now()
    };

    this.domChanges.push(domChange);
    this.logTelemetry('dom_mutation', domChange);
  }

  /**
   * Capture performance metric
   */
  capturePerformanceMetric(entry) {
    const metric = {
      id: uuidv4(),
      sessionId: this.sessionId,
      name: entry.name,
      type: entry.entryType,
      duration: entry.duration,
      startTime: entry.startTime,
      timestamp: Date.now()
    };

    this.performanceMetrics.push(metric);
    this.logTelemetry('performance_metric', metric);
  }

  /**
   * Capture user interaction
   */
  captureUserInteraction(eventType, event) {
    const interaction = {
      id: uuidv4(),
      sessionId: this.sessionId,
      type: eventType,
      target: event.target.tagName + (event.target.id ? `#${event.target.id}` : ''),
      timestamp: Date.now()
    };

    this.userInteractions.push(interaction);
    this.logTelemetry('user_interaction', interaction);
  }

  /**
   * Capture error
   */
  captureError(type, error, details) {
    const errorData = {
      id: uuidv4(),
      sessionId: this.sessionId,
      type,
      error: error.message,
      stack: error.stack,
      timestamp: Date.now(),
      ...details
    };

    this.errors.push(errorData);
    this.logTelemetry('error', errorData);
  }

  /**
   * Capture memory usage
   */
  captureMemoryUsage() {
    const memoryUsage = {
      id: uuidv4(),
      sessionId: this.sessionId,
      usedJSHeapSize: performance.memory.usedJSHeapSize,
      totalJSHeapSize: performance.memory.totalJSHeapSize,
      jsHeapSizeLimit: performance.memory.jsHeapSizeLimit,
      timestamp: Date.now()
    };

    this.memoryUsage.push(memoryUsage);
    this.logTelemetry('memory_usage', memoryUsage);
  }

  /**
   * Capture page state snapshot
   */
  capturePageSnapshot() {
    const snapshot = {
      id: uuidv4(),
      sessionId: this.sessionId,
      url: window.location.href,
      title: document.title,
      viewport: {
        width: window.innerWidth,
        height: window.innerHeight
      },
      scrollPosition: {
        x: window.scrollX,
        y: window.scrollY
      },
      paywallElements: this.getPaywallElements(),
      cookies: this.getCookies(),
      localStorage: this.getLocalStorage(),
      sessionStorage: this.getSessionStorage(),
      timestamp: Date.now()
    };

    this.logTelemetry('page_snapshot', snapshot);
    return snapshot;
  }

  /**
   * Get paywall-related elements
   */
  getPaywallElements() {
    const selectors = [
      '[id*="paywall"]',
      '[class*="paywall"]',
      '[id*="overlay"]',
      '[class*="overlay"]',
      '[id*="modal"]',
      '[class*="modal"]',
      '[style*="blur"]',
      '[style*="opacity"]'
    ];

    const elements = {};
    selectors.forEach(selector => {
      const found = document.querySelectorAll(selector);
      elements[selector] = Array.from(found).map(el => ({
        tagName: el.tagName,
        id: el.id,
        className: el.className,
        style: el.style.cssText
      }));
    });

    return elements;
  }

  /**
   * Get cookies
   */
  getCookies() {
    const cookies = {};
    document.cookie.split(';').forEach(cookie => {
      const [name, value] = cookie.trim().split('=');
      if (name && value) {
        cookies[name] = value;
      }
    });
    return cookies;
  }

  /**
   * Get localStorage
   */
  getLocalStorage() {
    const storage = {};
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        storage[key] = localStorage.getItem(key);
      }
    }
    return storage;
  }

  /**
   * Get sessionStorage
   */
  getSessionStorage() {
    const storage = {};
    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key) {
        storage[key] = sessionStorage.getItem(key);
      }
    }
    return storage;
  }

  /**
   * Capture bypass attempt telemetry
   */
  captureBypassAttempt(technique, success, details = {}) {
    const attempt = {
      id: uuidv4(),
      sessionId: this.sessionId,
      technique,
      success,
      details,
      pageSnapshot: this.capturePageSnapshot(),
      networkRequests: this.networkRequests.slice(-10), // Last 10 requests
      consoleLogs: this.consoleLogs.slice(-10), // Last 10 logs
      domChanges: this.domChanges.slice(-20), // Last 20 changes
      timestamp: Date.now()
    };

    this.logTelemetry('bypass_attempt', attempt);
    return attempt;
  }

  /**
   * Log telemetry event with enhanced tracking
   */
  logTelemetry(event, data) {
    if (isLoggingTelemetry) return;

    const telemetryEntry = {
      id: uuidv4(),
      sessionId: this.sessionId,
      event,
      data,
      timestamp: Date.now()
    };

    // Update event counters
    if (this.eventCounters[event]) {
      this.eventCounters[event]++;
    }

    // Add to telemetry data with size management
    this.telemetryData.push(telemetryEntry);
    
    // Prevent memory issues by limiting entries
    if (this.telemetryData.length > this.maxLogEntries) {
      this.telemetryData = this.telemetryData.slice(-this.maxLogEntries / 2);
    }

    // Log to console based on log level
    this.logToConsole(event, data);
  }

  /**
   * Log to console based on log level
   */
  logToConsole(event, data) {
    const logLevels = { debug: 0, info: 1, warn: 2, error: 3 };
    const currentLevel = logLevels[this.logLevel] || 0;
    
    let shouldLog = false;
    let logMethod = 'log';
    
    // Determine if we should log based on event type and level
    if (event.includes('error') || event.includes('failed')) {
      shouldLog = currentLevel <= 3;
      logMethod = 'error';
    } else if (event.includes('warn') || event.includes('warning')) {
      shouldLog = currentLevel <= 2;
      logMethod = 'warn';
    } else if (event.includes('info') || event.includes('started') || event.includes('completed')) {
      shouldLog = currentLevel <= 1;
      logMethod = 'info';
    } else {
      shouldLog = currentLevel <= 0;
      logMethod = 'log';
    }

    if (shouldLog) {
      const timestamp = new Date().toISOString();
      const message = `[PayBreak Telemetry] [${timestamp}] ${event}: ${JSON.stringify(data, null, 2)}`;
      
      // Use the appropriate console method
      if (logMethod === 'error') {
        console.error(message);
      } else if (logMethod === 'warn') {
        console.warn(message);
      } else if (logMethod === 'info') {
        console.info(message);
      } else {
        console.log(message);
      }
    }
  }

  /**
   * Cleanup interceptors
   */
  cleanupInterceptors() {
    if (this.domObserver) {
      this.domObserver.disconnect();
    }
    
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }

  /**
   * Get all telemetry data
   */
  getTelemetryData(filters = {}) {
    let data = [...this.telemetryData];

    // Filter by event type
    if (filters.event) {
      data = data.filter(entry => entry.event === filters.event);
    }

    // Filter by time range
    if (filters.startTime) {
      data = data.filter(entry => entry.timestamp >= filters.startTime);
    }
    if (filters.endTime) {
      data = data.filter(entry => entry.timestamp <= filters.endTime);
    }

    // Filter by session
    if (filters.sessionId) {
      data = data.filter(entry => entry.sessionId === filters.sessionId);
    }

    // Sort by timestamp (newest first)
    data.sort((a, b) => b.timestamp - a.timestamp);

    return data;
  }

  /**
   * Get telemetry data by event type
   */
  getTelemetryByEvent(event) {
    return this.telemetryData.filter(entry => entry.event === event);
  }

  /**
   * Get network requests
   */
  getNetworkRequests() {
    return this.networkRequests;
  }

  /**
   * Get console logs
   */
  getConsoleLogs() {
    return this.consoleLogs;
  }

  /**
   * Get DOM changes
   */
  getDOMChanges() {
    return this.domChanges;
  }

  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    return this.performanceMetrics;
  }

  /**
   * Generate comprehensive telemetry report
   */
  generateReport() {
    const report = {
      sessionId: this.sessionId,
      startTime: this.telemetryData[0]?.timestamp || Date.now(),
      endTime: Date.now(),
      totalRecords: this.telemetryData.length,
      events: this.getEventSummary(),
      networkRequests: {
        total: this.networkRequests.length,
        byType: this.groupBy(this.networkRequests, 'type'),
        byStatus: this.groupBy(this.networkRequests, 'status')
      },
      consoleLogs: {
        total: this.consoleLogs.length,
        byLevel: this.groupBy(this.consoleLogs, 'level')
      },
      domChanges: {
        total: this.domChanges.length,
        byType: this.groupBy(this.domChanges, 'type')
      },
      performanceMetrics: {
        total: this.performanceMetrics.length,
        byType: this.groupBy(this.performanceMetrics, 'type')
      },
      telemetryData: this.telemetryData
    };

    return report;
  }

  /**
   * Get event summary
   */
  getEventSummary() {
    const events = {};
    this.telemetryData.forEach(entry => {
      events[entry.event] = (events[entry.event] || 0) + 1;
    });
    return events;
  }

  /**
   * Group array by property
   */
  groupBy(array, property) {
    return array.reduce((groups, item) => {
      const value = item[property];
      groups[value] = (groups[value] || 0) + 1;
      return groups;
    }, {});
  }

  /**
   * Export telemetry data
   */
  exportData(format = 'json') {
    const data = {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      telemetry: this.telemetryData,
      networkRequests: this.networkRequests,
      consoleLogs: this.consoleLogs,
      domChanges: this.domChanges,
      performanceMetrics: this.performanceMetrics
    };

    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    } else if (format === 'csv') {
      return this.convertToCSV(data);
    }

    return data;
  }

  /**
   * Convert data to CSV format
   */
  convertToCSV(data) {
    // Implementation for CSV conversion
    // This is a simplified version - you might want to implement a more robust CSV converter
    const csv = [];
    
    // Add headers
    csv.push('Event,Timestamp,SessionId,Data');
    
    // Add data rows
    data.telemetry.forEach(entry => {
      csv.push(`${entry.event},${entry.timestamp},${entry.sessionId},"${JSON.stringify(entry.data)}"`);
    });
    
    return csv.join('\n');
  }

  /**
   * Get user interactions
   */
  getUserInteractions() {
    return [...this.userInteractions];
  }

  /**
   * Get errors
   */
  getErrors() {
    return [...this.errors];
  }

  /**
   * Get memory usage data
   */
  getMemoryUsage() {
    return [...this.memoryUsage];
  }

  /**
   * Get event counters
   */
  getEventCounters() {
    return { ...this.eventCounters };
  }

  /**
   * Clear all telemetry data
   */
  clearData() {
    this.telemetryData = [];
    this.networkRequests = [];
    this.consoleLogs = [];
    this.domChanges = [];
    this.performanceMetrics = [];
    this.userInteractions = [];
    this.errors = [];
    this.memoryUsage = [];
    
    // Reset counters
    Object.keys(this.eventCounters).forEach(key => {
      this.eventCounters[key] = 0;
    });

    this.logTelemetry('data_cleared', {
      timestamp: Date.now(),
      sessionId: this.sessionId
    });
  }

  /**
   * Generate enhanced report with detailed analytics
   */
  generateEnhancedReport() {
    const now = Date.now();
    const sessionDuration = now - (this.telemetryData[0]?.timestamp || now);
    
    const report = {
      sessionId: this.sessionId,
      generatedAt: new Date().toISOString(),
      sessionDuration: sessionDuration,
      totalEvents: this.telemetryData.length,
      eventCounters: this.eventCounters,
      
      // Performance metrics
      performance: {
        networkRequests: this.networkRequests.length,
        averageResponseTime: this.calculateAverageResponseTime(),
        slowestRequests: this.getSlowestRequests(5),
        errorRate: this.calculateErrorRate()
      },
      
      // User behavior
      userBehavior: {
        totalInteractions: this.userInteractions.length,
        mostCommonInteractions: this.getMostCommonInteractions(),
        interactionTimeline: this.generateInteractionTimeline()
      },
      
      // Error analysis
      errors: {
        totalErrors: this.errors.length,
        errorTypes: this.groupBy(this.errors, 'type'),
        mostCommonErrors: this.getMostCommonErrors()
      },
      
      // Memory usage
      memory: {
        samples: this.memoryUsage.length,
        averageUsage: this.calculateAverageMemoryUsage(),
        peakUsage: this.getPeakMemoryUsage()
      },
      
      // Bypass attempts
      bypassAttempts: this.getBypassAttempts(),
      
      // Recommendations
      recommendations: this.generateRecommendations()
    };

    return report;
  }

  /**
   * Calculate average response time
   */
  calculateAverageResponseTime() {
    const requests = this.networkRequests.filter(req => req.duration);
    if (requests.length === 0) return 0;
    
    const totalDuration = requests.reduce((sum, req) => sum + req.duration, 0);
    return totalDuration / requests.length;
  }

  /**
   * Get slowest requests
   */
  getSlowestRequests(limit = 5) {
    return this.networkRequests
      .filter(req => req.duration)
      .sort((a, b) => b.duration - a.duration)
      .slice(0, limit)
      .map(req => ({
        url: req.url,
        method: req.method,
        duration: req.duration,
        status: req.status
      }));
  }

  /**
   * Calculate error rate
   */
  calculateErrorRate() {
    const totalRequests = this.networkRequests.length;
    const failedRequests = this.networkRequests.filter(req => !req.success).length;
    return totalRequests > 0 ? (failedRequests / totalRequests) * 100 : 0;
  }

  /**
   * Get most common user interactions
   */
  getMostCommonInteractions() {
    const interactionCounts = {};
    this.userInteractions.forEach(interaction => {
      interactionCounts[interaction.type] = (interactionCounts[interaction.type] || 0) + 1;
    });
    
    return Object.entries(interactionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  }

  /**
   * Generate interaction timeline
   */
  generateInteractionTimeline() {
    const timeline = {};
    this.userInteractions.forEach(interaction => {
      const minute = Math.floor(interaction.timestamp / 60000);
      timeline[minute] = (timeline[minute] || 0) + 1;
    });
    return timeline;
  }

  /**
   * Get most common errors
   */
  getMostCommonErrors() {
    const errorCounts = {};
    this.errors.forEach(error => {
      const key = error.error || error.type;
      errorCounts[key] = (errorCounts[key] || 0) + 1;
    });
    
    return Object.entries(errorCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 10);
  }

  /**
   * Calculate average memory usage
   */
  calculateAverageMemoryUsage() {
    if (this.memoryUsage.length === 0) return 0;
    
    const totalUsage = this.memoryUsage.reduce((sum, sample) => sum + sample.usedJSHeapSize, 0);
    return totalUsage / this.memoryUsage.length;
  }

  /**
   * Get peak memory usage
   */
  getPeakMemoryUsage() {
    if (this.memoryUsage.length === 0) return null;
    
    return this.memoryUsage.reduce((peak, sample) => 
      sample.usedJSHeapSize > peak.usedJSHeapSize ? sample : peak
    );
  }

  /**
   * Get bypass attempts with success rates
   */
  getBypassAttempts() {
    const attempts = this.telemetryData.filter(entry => entry.event === 'bypass_attempt');
    const techniqueStats = {};
    
    attempts.forEach(attempt => {
      const technique = attempt.data.technique;
      if (!techniqueStats[technique]) {
        techniqueStats[technique] = { total: 0, successful: 0 };
      }
      techniqueStats[technique].total++;
      if (attempt.data.success) {
        techniqueStats[technique].successful++;
      }
    });
    
    return Object.entries(techniqueStats).map(([technique, stats]) => ({
      technique,
      total: stats.total,
      successful: stats.successful,
      successRate: (stats.successful / stats.total) * 100
    }));
  }

  /**
   * Generate recommendations based on collected data
   */
  generateRecommendations() {
    const recommendations = [];
    
    // Check for high error rates
    const errorRate = this.calculateErrorRate();
    if (errorRate > 10) {
      recommendations.push({
        type: 'warning',
        message: `High error rate detected: ${errorRate.toFixed(1)}% of network requests failed`,
        priority: 'high'
      });
    }
    
    // Check for memory issues
    const avgMemory = this.calculateAverageMemoryUsage();
    if (avgMemory > 50 * 1024 * 1024) { // 50MB
      recommendations.push({
        type: 'warning',
        message: 'High memory usage detected. Consider optimizing memory usage.',
        priority: 'medium'
      });
    }
    
    // Check for slow requests
    const avgResponseTime = this.calculateAverageResponseTime();
    if (avgResponseTime > 2000) { // 2 seconds
      recommendations.push({
        type: 'info',
        message: 'Slow network requests detected. Consider optimizing network calls.',
        priority: 'medium'
      });
    }
    
    // Check for successful bypasses
    const bypassAttempts = this.getBypassAttempts();
    const successfulBypasses = bypassAttempts.filter(attempt => attempt.successRate > 0);
    if (successfulBypasses.length > 0) {
      recommendations.push({
        type: 'success',
        message: `${successfulBypasses.length} bypass techniques found to be effective`,
        priority: 'low'
      });
    }
    
    return recommendations;
  }
}

// Helper for circular references
function getCircularReplacer() {
  const seen = new WeakSet();
  return (key, value) => {
    if (typeof value === 'object' && value !== null) {
      if (seen.has(value)) return '[Circular]';
      seen.add(value);
    }
    return value;
  };
} 