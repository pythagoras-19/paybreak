import { v4 as uuidv4 } from 'uuid';

/**
 * Telemetry Collector - Captures detailed data about bypass attempts and page state
 */
export class TelemetryCollector {
  constructor() {
    this.sessionId = uuidv4();
    this.telemetryData = [];
    this.networkRequests = [];
    this.consoleLogs = [];
    this.domChanges = [];
    this.performanceMetrics = [];
    this.isCollecting = false;
    
    // Bind methods
    this.captureNetworkRequest = this.captureNetworkRequest.bind(this);
    this.captureConsoleLog = this.captureConsoleLog.bind(this);
    this.captureDOMMutation = this.captureDOMMutation.bind(this);
    this.capturePerformanceMetric = this.capturePerformanceMetric.bind(this);
  }

  /**
   * Start telemetry collection
   */
  startCollection() {
    if (this.isCollecting) return;

    this.isCollecting = true;
    this.setupNetworkInterception();
    this.setupConsoleInterception();
    this.setupDOMMutationObserver();
    this.setupPerformanceObserver();

    this.logTelemetry('collection_started', {
      sessionId: this.sessionId,
      timestamp: Date.now(),
      userAgent: navigator.userAgent,
      url: window.location.href
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
      totalRecords: this.telemetryData.length
    });
  }

  /**
   * Setup network request interception
   */
  setupNetworkInterception() {
    // Intercept fetch requests
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      const startTime = Date.now();
      const [url, options] = args;
      
      try {
        const response = await originalFetch(...args);
        this.captureNetworkRequest({
          type: 'fetch',
          url: typeof url === 'string' ? url : url.toString(),
          method: options?.method || 'GET',
          status: response.status,
          duration: Date.now() - startTime,
          timestamp: startTime,
          success: response.ok
        });
        return response;
      } catch (error) {
        this.captureNetworkRequest({
          type: 'fetch',
          url: typeof url === 'string' ? url : url.toString(),
          method: options?.method || 'GET',
          error: error.message,
          duration: Date.now() - startTime,
          timestamp: startTime,
          success: false
        });
        throw error;
      }
    };

    // Intercept XMLHttpRequest
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    
    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      this._paybreakMethod = method;
      this._paybreakUrl = url;
      this._paybreakStartTime = Date.now();
      return originalOpen.call(this, method, url, ...args);
    };

    XMLHttpRequest.prototype.send = function(...args) {
      const xhr = this;
      const originalOnReadyStateChange = xhr.onreadystatechange;
      
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          this.captureNetworkRequest({
            type: 'xhr',
            url: xhr._paybreakUrl,
            method: xhr._paybreakMethod,
            status: xhr.status,
            duration: Date.now() - xhr._paybreakStartTime,
            timestamp: xhr._paybreakStartTime,
            success: xhr.status >= 200 && xhr.status < 300
          });
        }
        
        if (originalOnReadyStateChange) {
          originalOnReadyStateChange.apply(xhr, arguments);
        }
      }.bind(this);
      
      return originalSend.apply(xhr, args);
    }.bind(this);
  }

  /**
   * Setup console log interception
   */
  setupConsoleInterception() {
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;

    console.log = (...args) => {
      this.captureConsoleLog('log', args);
      originalLog.apply(console, args);
    };

    console.error = (...args) => {
      this.captureConsoleLog('error', args);
      originalError.apply(console, args);
    };

    console.warn = (...args) => {
      this.captureConsoleLog('warn', args);
      originalWarn.apply(console, args);
    };

    console.info = (...args) => {
      this.captureConsoleLog('info', args);
      originalInfo.apply(console, args);
    };
  }

  /**
   * Setup DOM mutation observer
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
      attributeFilter: ['style', 'class', 'id']
    });
  }

  /**
   * Setup performance observer
   */
  setupPerformanceObserver() {
    if ('PerformanceObserver' in window) {
      this.performanceObserver = new PerformanceObserver((list) => {
        list.getEntries().forEach(entry => {
          this.capturePerformanceMetric(entry);
        });
      });

      this.performanceObserver.observe({ entryTypes: ['navigation', 'resource', 'paint'] });
    }
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
  captureConsoleLog(level, args) {
    const log = {
      id: uuidv4(),
      sessionId: this.sessionId,
      level,
      message: args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg) : String(arg)
      ).join(' '),
      timestamp: Date.now()
    };

    this.consoleLogs.push(log);
    this.logTelemetry('console_log', log);
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
   * Log telemetry data
   */
  logTelemetry(event, data) {
    const telemetryEntry = {
      id: uuidv4(),
      sessionId: this.sessionId,
      event,
      data,
      timestamp: Date.now()
    };

    this.telemetryData.push(telemetryEntry);
    
    // Also log to console for debugging
    console.log(`[PayBreak Telemetry] ${event}:`, telemetryEntry);
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
  getTelemetryData() {
    return this.telemetryData;
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
} 