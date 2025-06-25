import { v4 as uuidv4 } from 'uuid';

/**
 * Bypass Engine - Implements various bypass techniques and automation
 */
export class BypassEngine {
  constructor(paywallSimulator) {
    this.paywallSimulator = paywallSimulator;
    this.techniques = this.initializeTechniques();
    this.executionHistory = [];
    this.currentSession = uuidv4();
  }

  /**
   * Initialize all bypass techniques
   */
  initializeTechniques() {
    return {
      // DOM-based attacks
      domRemoval: {
        name: 'DOM Element Removal',
        description: 'Remove paywall overlay and modal elements',
        execute: () => this.executeDOMRemoval(),
        category: 'dom'
      },
      unblurContent: {
        name: 'Content Unblur',
        description: 'Remove blur effects from content',
        execute: () => this.executeUnblurContent(),
        category: 'dom'
      },
      overrideStyles: {
        name: 'Style Override',
        description: 'Override paywall-related CSS styles',
        execute: () => this.executeStyleOverride(),
        category: 'dom'
      },

      // JavaScript hook attacks
      functionOverride: {
        name: 'Function Override',
        description: 'Override paywall-related JavaScript functions',
        execute: () => this.executeFunctionOverride(),
        category: 'javascript'
      },
      propertyHooks: {
        name: 'Property Hooks',
        description: 'Hook into object properties and getters',
        execute: () => this.executePropertyHooks(),
        category: 'javascript'
      },
      prototypePollution: {
        name: 'Prototype Pollution',
        description: 'Attempt prototype pollution attacks',
        execute: () => this.executePrototypePollution(),
        category: 'javascript'
      },

      // Storage manipulation
      cookieManipulation: {
        name: 'Cookie Manipulation',
        description: 'Manipulate paywall-related cookies',
        execute: () => this.executeCookieManipulation(),
        category: 'storage'
      },
      localStorageReset: {
        name: 'LocalStorage Reset',
        description: 'Reset localStorage counters and flags',
        execute: () => this.executeLocalStorageReset(),
        category: 'storage'
      },
      sessionStorageClear: {
        name: 'SessionStorage Clear',
        description: 'Clear sessionStorage data',
        execute: () => this.executeSessionStorageClear(),
        category: 'storage'
      },

      // Network interception
      fetchInterception: {
        name: 'Fetch Interception',
        description: 'Intercept and modify fetch requests',
        execute: () => this.executeFetchInterception(),
        category: 'network'
      },
      xhrOverride: {
        name: 'XHR Override',
        description: 'Override XMLHttpRequest behavior',
        execute: () => this.executeXHROverride(),
        category: 'network'
      },

      // CSP bypass attempts
      jsonpBypass: {
        name: 'JSONP Bypass',
        description: 'Attempt JSONP-based CSP bypass',
        execute: () => this.executeJSONPBypass(),
        category: 'csp'
      },
      postMessageBypass: {
        name: 'PostMessage Bypass',
        description: 'Use postMessage for CSP bypass',
        execute: () => this.executePostMessageBypass(),
        category: 'csp'
      },

      // Advanced techniques
      iframeInjection: {
        name: 'Iframe Injection',
        description: 'Inject iframe to bypass restrictions',
        execute: () => this.executeIframeInjection(),
        category: 'advanced'
      },
      workerBypass: {
        name: 'Web Worker Bypass',
        description: 'Use Web Workers to bypass restrictions',
        execute: () => this.executeWorkerBypass(),
        category: 'advanced'
      }
    };
  }

  /**
   * Execute a specific bypass technique
   */
  async executeTechnique(techniqueName) {
    const technique = this.techniques[techniqueName];
    if (!technique) {
      throw new Error(`Unknown technique: ${techniqueName}`);
    }

    const executionId = uuidv4();
    const startTime = Date.now();

    try {
      // Capture initial state
      const initialState = this.capturePageState();

      // Execute technique
      const result = await technique.execute();

      // Capture final state
      const finalState = this.capturePageState();

      // Determine success
      const success = this.evaluateBypassSuccess(initialState, finalState);

      // Record execution
      const execution = {
        id: executionId,
        technique: techniqueName,
        techniqueDetails: technique,
        success,
        result,
        executionTime: Date.now() - startTime,
        initialState,
        finalState,
        timestamp: Date.now(),
        sessionId: this.currentSession
      };

      this.executionHistory.push(execution);
      this.paywallSimulator.recordBypassAttempt(techniqueName, success, execution);

      return execution;

    } catch (error) {
      const execution = {
        id: executionId,
        technique: techniqueName,
        techniqueDetails: technique,
        success: false,
        error: error.message,
        executionTime: Date.now() - startTime,
        timestamp: Date.now(),
        sessionId: this.currentSession
      };

      this.executionHistory.push(execution);
      this.paywallSimulator.recordBypassAttempt(techniqueName, false, execution);

      throw error;
    }
  }

  /**
   * Execute all bypass techniques
   */
  async executeAllTechniques() {
    const results = [];
    
    for (const [name, technique] of Object.entries(this.techniques)) {
      try {
        const result = await this.executeTechnique(name);
        results.push(result);
        
        // Small delay between techniques
        await new Promise(resolve => setTimeout(resolve, 100));
        
      } catch (error) {
        console.error(`Error executing technique ${name}:`, error);
        results.push({
          technique: name,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * Execute techniques by category
   */
  async executeTechniquesByCategory(category) {
    const categoryTechniques = Object.entries(this.techniques)
      .filter(([_, technique]) => technique.category === category)
      .map(([name, _]) => name);

    const results = [];
    for (const techniqueName of categoryTechniques) {
      try {
        const result = await this.executeTechnique(techniqueName);
        results.push(result);
      } catch (error) {
        console.error(`Error executing ${techniqueName}:`, error);
      }
    }

    return results;
  }

  /**
   * DOM-based bypass techniques
   */
  executeDOMRemoval() {
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

    let removedCount = 0;
    selectors.forEach(selector => {
      const elements = document.querySelectorAll(selector);
      elements.forEach(el => {
        el.remove();
        removedCount++;
      });
    });

    return { removedCount, selectors };
  }

  executeUnblurContent() {
    const elements = document.querySelectorAll('*');
    let unblurredCount = 0;

    elements.forEach(el => {
      const style = window.getComputedStyle(el);
      if (style.filter.includes('blur') || style.backdropFilter.includes('blur')) {
        el.style.filter = 'none';
        el.style.backdropFilter = 'none';
        unblurredCount++;
      }
    });

    return { unblurredCount };
  }

  executeStyleOverride() {
    const style = document.createElement('style');
    style.textContent = `
      [id*="paywall"], [class*="paywall"] { display: none !important; }
      [style*="blur"] { filter: none !important; backdrop-filter: none !important; }
      [style*="opacity"] { opacity: 1 !important; }
      body { overflow: auto !important; }
    `;
    document.head.appendChild(style);

    return { styleInjected: true };
  }

  /**
   * JavaScript hook techniques
   */
  executeFunctionOverride() {
    const overrides = {
      'checkPaywall': () => false,
      'isSubscribed': () => true,
      'hasAccess': () => true,
      'blockContent': () => false
    };

    const overriddenFunctions = [];
    
    Object.entries(overrides).forEach(([funcName, overrideFunc]) => {
      if (window[funcName]) {
        const original = window[funcName];
        window[funcName] = overrideFunc;
        overriddenFunctions.push({ name: funcName, original });
      }
    });

    return { overriddenFunctions };
  }

  executePropertyHooks() {
    const hooks = [];
    
    // Hook into common paywall properties
    const properties = ['paywall', 'subscription', 'access', 'blocked'];
    
    properties.forEach(prop => {
      if (window[prop] !== undefined) {
        const original = window[prop];
        Object.defineProperty(window, prop, {
          get: () => false,
          set: () => {},
          configurable: true
        });
        hooks.push({ property: prop, original });
      }
    });

    return { hooks };
  }

  executePrototypePollution() {
    // Attempt prototype pollution on common objects
    const targets = [Object.prototype, Array.prototype, String.prototype];
    const payloads = [
      { '__proto__.paywall': false },
      { '__proto__.blocked': false },
      { '__proto__.hasAccess': true }
    ];

    const attempts = [];
    
    targets.forEach(target => {
      payloads.forEach(payload => {
        try {
          Object.assign(target, payload);
          attempts.push({ target: target.constructor.name, payload, success: true });
        } catch (error) {
          attempts.push({ target: target.constructor.name, payload, success: false, error: error.message });
        }
      });
    });

    return { attempts };
  }

  /**
   * Storage manipulation techniques
   */
  executeCookieManipulation() {
    const paywallCookies = [
      'paywall_token',
      'subscription_status',
      'access_granted',
      'metered_count'
    ];

    const manipulated = [];
    
    paywallCookies.forEach(cookieName => {
      const value = this.getCookie(cookieName);
      if (value !== null) {
        // Try to manipulate cookie value
        document.cookie = `${cookieName}=true; path=/; max-age=3600`;
        manipulated.push({ name: cookieName, originalValue: value, newValue: 'true' });
      }
    });

    return { manipulated };
  }

  executeLocalStorageReset() {
    const paywallKeys = [
      'paywall_count',
      'metered_paywall_count',
      'subscription_status',
      'access_granted'
    ];

    const reset = [];
    
    paywallKeys.forEach(key => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        localStorage.removeItem(key);
        reset.push({ key, originalValue: value });
      }
    });

    return { reset };
  }

  executeSessionStorageClear() {
    const keys = Object.keys(sessionStorage);
    const paywallKeys = keys.filter(key => 
      key.toLowerCase().includes('paywall') || 
      key.toLowerCase().includes('subscription') ||
      key.toLowerCase().includes('access')
    );

    const cleared = [];
    paywallKeys.forEach(key => {
      const value = sessionStorage.getItem(key);
      sessionStorage.removeItem(key);
      cleared.push({ key, originalValue: value });
    });

    return { cleared };
  }

  /**
   * Network interception techniques
   */
  executeFetchInterception() {
    const originalFetch = window.fetch;
    const intercepted = [];

    window.fetch = async (...args) => {
      const [url, options] = args;
      
      // Intercept paywall-related requests
      if (typeof url === 'string' && (
        url.includes('paywall') || 
        url.includes('subscription') || 
        url.includes('access')
      )) {
        intercepted.push({ url, options });
        
        // Return fake successful response
        return new Response(JSON.stringify({ access: true, subscribed: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      return originalFetch(...args);
    };

    return { intercepted, originalFetch };
  }

  executeXHROverride() {
    const originalOpen = XMLHttpRequest.prototype.open;
    const originalSend = XMLHttpRequest.prototype.send;
    const overridden = [];

    XMLHttpRequest.prototype.open = function(method, url, ...args) {
      if (typeof url === 'string' && (
        url.includes('paywall') || 
        url.includes('subscription') || 
        url.includes('access')
      )) {
        overridden.push({ method, url });
        // Override with fake URL
        return originalOpen.call(this, method, '/fake-access-endpoint', ...args);
      }
      return originalOpen.call(this, method, url, ...args);
    };

    return { overridden };
  }

  /**
   * CSP bypass techniques
   */
  executeJSONPBypass() {
    // Attempt JSONP bypass by creating script tags
    const script = document.createElement('script');
    script.src = 'data:text/javascript,window.paywall=false;window.access=true;';
    document.head.appendChild(script);

    return { jsonpInjected: true };
  }

  executePostMessageBypass() {
    // Use postMessage to bypass CSP
    window.postMessage({
      type: 'paywall_bypass',
      payload: { access: true, subscribed: true }
    }, '*');

    return { postMessageSent: true };
  }

  /**
   * Advanced techniques
   */
  executeIframeInjection() {
    const iframe = document.createElement('iframe');
    iframe.src = 'about:blank';
    iframe.style.display = 'none';
    document.body.appendChild(iframe);

    // Try to access parent context
    try {
      iframe.contentWindow.parent = window;
    } catch (e) {
      // Cross-origin restrictions
    }

    return { iframeInjected: true };
  }

  executeWorkerBypass() {
    const workerCode = `
      self.onmessage = function(e) {
        if (e.data.type === 'paywall_check') {
          self.postMessage({ access: true, subscribed: true });
        }
      };
    `;

    const blob = new Blob([workerCode], { type: 'application/javascript' });
    const worker = new Worker(URL.createObjectURL(blob));
    
    worker.postMessage({ type: 'paywall_check' });

    return { workerCreated: true };
  }

  /**
   * Utility methods
   */
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  capturePageState() {
    return {
      url: window.location.href,
      title: document.title,
      paywallElements: document.querySelectorAll('[id*="paywall"], [class*="paywall"]').length,
      overlayElements: document.querySelectorAll('[id*="overlay"], [class*="overlay"]').length,
      modalElements: document.querySelectorAll('[id*="modal"], [class*="modal"]').length,
      cookies: document.cookie,
      localStorage: Object.keys(localStorage).filter(key => 
        key.toLowerCase().includes('paywall') || 
        key.toLowerCase().includes('subscription')
      ),
      timestamp: Date.now()
    };
  }

  evaluateBypassSuccess(initialState, finalState) {
    // Check if paywall elements were removed
    const paywallRemoved = finalState.paywallElements < initialState.paywallElements;
    const overlayRemoved = finalState.overlayElements < initialState.overlayElements;
    const modalRemoved = finalState.modalElements < initialState.modalElements;

    // Check if content is visible (no blur, no blocking)
    const contentVisible = !document.querySelector('[style*="blur"]') && 
                          !document.querySelector('[style*="display: none"]');

    return paywallRemoved || overlayRemoved || modalRemoved || contentVisible;
  }

  /**
   * Get execution history
   */
  getExecutionHistory() {
    return this.executionHistory;
  }

  /**
   * Get successful bypasses
   */
  getSuccessfulBypasses() {
    return this.executionHistory.filter(execution => execution.success);
  }

  /**
   * Generate bypass report
   */
  generateReport() {
    const totalAttempts = this.executionHistory.length;
    const successfulAttempts = this.getSuccessfulBypasses().length;
    const successRate = totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0;

    const techniquesByCategory = {};
    this.executionHistory.forEach(execution => {
      const category = execution.techniqueDetails?.category || 'unknown';
      if (!techniquesByCategory[category]) {
        techniquesByCategory[category] = { total: 0, successful: 0 };
      }
      techniquesByCategory[category].total++;
      if (execution.success) {
        techniquesByCategory[category].successful++;
      }
    });

    return {
      sessionId: this.currentSession,
      totalAttempts,
      successfulAttempts,
      successRate,
      techniquesByCategory,
      executionHistory: this.executionHistory,
      timestamp: Date.now()
    };
  }
} 