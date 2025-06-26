/**
 * Bypass Engine - Soft Paywall Bypass Techniques
 */
export class BypassEngine {
  constructor() {
    this.techniques = [
      'DOM Manipulation',
      'CSS Override',
      'JavaScript Hooks',
      'Storage Manipulation',
      'Network Interception',
      'CSP Bypass',
      'Advanced Methods'
    ];
    
    this.results = [];
    this.isRunning = false;
  }

  /**
   * Run all bypass techniques against soft paywall
   */
  async runFullTestSuite(paywallSimulator) {
    if (this.isRunning) return;
    
    this.isRunning = true;
    this.results = [];
    
    console.log('[BypassEngine] Starting full test suite for soft paywall...');
    
    // Apply soft paywall first
    paywallSimulator.initPaywall('soft');
    paywallSimulator.applyPaywall();
    
    // Wait for paywall to be applied
    await this.delay(500);
    
    // Run each bypass technique
    for (const technique of this.techniques) {
      const result = await this.runTechnique(technique, paywallSimulator);
      this.results.push(result);
      
      // Small delay between techniques
      await this.delay(200);
    }
    
    // Run auto-fuzzing phase
    const fuzzResults = await this.runAutoFuzzing(paywallSimulator);
    this.results.push(...fuzzResults);
    
    this.isRunning = false;
    
    console.log('[BypassEngine] Test suite completed:', this.results);
    return this.results;
  }

  /**
   * Run a specific bypass technique
   */
  async runTechnique(technique, paywallSimulator) {
    console.log(`[BypassEngine] Running technique: ${technique}`);
    
    const startTime = Date.now();
    let success = false;
    let details = {};
    
    try {
      switch (technique) {
        case 'DOM Manipulation':
          success = await this.domManipulation(paywallSimulator);
          break;
        case 'CSS Override':
          success = await this.cssOverride(paywallSimulator);
          break;
        case 'JavaScript Hooks':
          success = await this.javascriptHooks(paywallSimulator);
          break;
        case 'Storage Manipulation':
          success = await this.storageManipulation(paywallSimulator);
          break;
        case 'Network Interception':
          success = await this.networkInterception(paywallSimulator);
          break;
        case 'CSP Bypass':
          success = await this.cspBypass(paywallSimulator);
          break;
        case 'Advanced Methods':
          success = await this.advancedMethods(paywallSimulator);
          break;
      }
    } catch (error) {
      console.error(`[BypassEngine] Error in ${technique}:`, error);
      details.error = error.message;
    }
    
    const result = {
      technique,
      success,
      details,
      duration: Date.now() - startTime,
      timestamp: Date.now()
    };
    
    // Record attempt in paywall simulator
    paywallSimulator.recordBypassAttempt(technique, success, details);
    
    return result;
  }

  /**
   * DOM Manipulation - Remove paywall elements
   */
  async domManipulation(paywallSimulator) {
    const overlays = document.querySelectorAll('[id*="paywall-overlay"]');
    const modals = document.querySelectorAll('.paywall-modal');
    
    overlays.forEach(overlay => overlay.remove());
    modals.forEach(modal => modal.remove());
    
    return overlays.length > 0 || modals.length > 0;
  }

  /**
   * CSS Override - Override paywall styles
   */
  async cssOverride(paywallSimulator) {
    const style = document.createElement('style');
    style.textContent = `
      [id*="paywall-overlay"] {
        display: none !important;
        visibility: hidden !important;
        opacity: 0 !important;
        pointer-events: none !important;
      }
      .paywall-modal {
        display: none !important;
      }
      .paywall-overlay {
        backdrop-filter: none !important;
        background: transparent !important;
      }
    `;
    document.head.appendChild(style);
    
    // Check if paywall is still visible
    const overlays = document.querySelectorAll('[id*="paywall-overlay"]');
    return overlays.length === 0 || Array.from(overlays).every(overlay => 
      overlay.style.display === 'none' || overlay.style.visibility === 'hidden'
    );
  }

  /**
   * JavaScript Hooks - Intercept and modify paywall functions
   */
  async javascriptHooks(paywallSimulator) {
    // Override paywall-related functions
    window.applyPaywall = () => console.log('Paywall application blocked');
    window.initPaywall = () => console.log('Paywall initialization blocked');
    
    // Hook into DOM manipulation
    const originalAppendChild = Element.prototype.appendChild;
    Element.prototype.appendChild = function(child) {
      if (child.id && child.id.includes('paywall-overlay')) {
        console.log('Paywall overlay append blocked');
        return child; // Don't actually append
      }
      return originalAppendChild.call(this, child);
    };
    
    return true;
  }

  /**
   * Storage Manipulation - Clear paywall-related storage
   */
  async storageManipulation(paywallSimulator) {
    // Clear localStorage
    const keys = Object.keys(localStorage);
    keys.forEach(key => {
      if (key.includes('paywall') || key.includes('metered')) {
        localStorage.removeItem(key);
      }
    });
    
    // Clear sessionStorage
    const sessionKeys = Object.keys(sessionStorage);
    sessionKeys.forEach(key => {
      if (key.includes('paywall') || key.includes('metered')) {
        sessionStorage.removeItem(key);
      }
    });
    
    // Clear cookies
    document.cookie.split(";").forEach(cookie => {
      const eqPos = cookie.indexOf("=");
      const name = eqPos > -1 ? cookie.substr(0, eqPos).trim() : cookie.trim();
      if (name.includes('paywall') || name.includes('metered')) {
        document.cookie = `${name}=;expires=Thu, 01 Jan 1970 00:00:00 GMT;path=/`;
      }
    });
    
    return true;
  }

  /**
   * Network Interception - Block paywall-related requests
   */
  async networkInterception(paywallSimulator) {
    // Override fetch to block paywall requests
    const originalFetch = window.fetch;
    window.fetch = function(url, options) {
      if (typeof url === 'string' && (
        url.includes('paywall') || 
        url.includes('subscription') || 
        url.includes('premium')
      )) {
        console.log('Paywall network request blocked:', url);
        return Promise.resolve(new Response(JSON.stringify({ success: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        }));
      }
      return originalFetch.call(this, url, options);
    };
    
    // Override XMLHttpRequest
    const originalXHROpen = XMLHttpRequest.prototype.open;
    XMLHttpRequest.prototype.open = function(method, url) {
      if (typeof url === 'string' && (
        url.includes('paywall') || 
        url.includes('subscription') || 
        url.includes('premium')
      )) {
        console.log('Paywall XHR request blocked:', url);
        return;
      }
      return originalXHROpen.call(this, method, url);
    };
    
    return true;
  }

  /**
   * CSP Bypass - Bypass Content Security Policy
   */
  async cspBypass(paywallSimulator) {
    // Try to inject scripts to bypass CSP
    const script = document.createElement('script');
    script.textContent = `
      // Remove paywall elements
      document.querySelectorAll('[id*="paywall-overlay"]').forEach(el => el.remove());
      document.querySelectorAll('.paywall-modal').forEach(el => el.remove());
      
      // Override paywall functions
      if (window.paywallSimulator) {
        window.paywallSimulator.isActive = false;
      }
    `;
    
    try {
      document.head.appendChild(script);
      return true;
    } catch (error) {
      console.log('CSP blocked script injection:', error);
      return false;
    }
  }

  /**
   * Advanced Methods - Complex bypass techniques
   */
  async advancedMethods(paywallSimulator) {
    // Method 1: Mutation Observer to remove paywall elements
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === 1 && node.id && node.id.includes('paywall-overlay')) {
            node.remove();
          }
        });
      });
    });
    
    observer.observe(document.body, { childList: true, subtree: true });
    
    // Method 2: Override CSS properties
    const style = document.createElement('style');
    style.textContent = `
      *[id*="paywall"] {
        all: unset !important;
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Method 3: Override paywall simulator methods
    if (paywallSimulator && paywallSimulator.applyPaywall) {
      const originalApply = paywallSimulator.applyPaywall;
      paywallSimulator.applyPaywall = () => {
        console.log('Paywall application intercepted and blocked');
        return false;
      };
    }
    
    return true;
  }

  /**
   * Auto-fuzzing phase - Discover new bypass vectors
   */
  async runAutoFuzzing(paywallSimulator) {
    console.log('[BypassEngine] Starting auto-fuzzing phase...');
    
    const fuzzResults = [];
    const fuzzTechniques = [
      'Element ID Fuzzing',
      'Class Name Fuzzing',
      'Attribute Fuzzing',
      'Event Listener Fuzzing'
    ];
    
    for (const technique of fuzzTechniques) {
      const result = await this.runFuzzTechnique(technique, paywallSimulator);
      fuzzResults.push(result);
      await this.delay(100);
    }
    
    return fuzzResults;
  }

  /**
   * Run a fuzzing technique
   */
  async runFuzzTechnique(technique, paywallSimulator) {
    console.log(`[BypassEngine] Fuzzing: ${technique}`);
    
    const startTime = Date.now();
    let success = false;
    let details = {};
    
    try {
      switch (technique) {
        case 'Element ID Fuzzing':
          success = this.fuzzElementIds();
          break;
        case 'Class Name Fuzzing':
          success = this.fuzzClassNames();
          break;
        case 'Attribute Fuzzing':
          success = this.fuzzAttributes();
          break;
        case 'Event Listener Fuzzing':
          success = this.fuzzEventListeners();
          break;
      }
    } catch (error) {
      details.error = error.message;
    }
    
    return {
      technique: `Fuzz: ${technique}`,
      success,
      details,
      duration: Date.now() - startTime,
      timestamp: Date.now()
    };
  }

  /**
   * Fuzz element IDs
   */
  fuzzElementIds() {
    const commonIds = ['paywall', 'overlay', 'modal', 'block', 'gate'];
    let found = false;
    
    commonIds.forEach(id => {
      const elements = document.querySelectorAll(`[id*="${id}"]`);
      elements.forEach(el => {
        el.remove();
        found = true;
      });
    });
    
    return found;
  }

  /**
   * Fuzz class names
   */
  fuzzClassNames() {
    const commonClasses = ['paywall', 'overlay', 'modal', 'block', 'gate', 'premium'];
    let found = false;
    
    commonClasses.forEach(className => {
      const elements = document.querySelectorAll(`.${className}`);
      elements.forEach(el => {
        el.remove();
        found = true;
      });
    });
    
    return found;
  }

  /**
   * Fuzz attributes
   */
  fuzzAttributes() {
    const elements = document.querySelectorAll('[data-paywall], [data-premium], [data-block]');
    let found = false;
    
    elements.forEach(el => {
      el.remove();
      found = true;
    });
    
    return found;
  }

  /**
   * Fuzz event listeners
   */
  fuzzEventListeners() {
    // Try to remove event listeners from paywall elements
    const overlays = document.querySelectorAll('[id*="paywall-overlay"]');
    let found = false;
    
    overlays.forEach(overlay => {
      const clone = overlay.cloneNode(true);
      overlay.parentNode.replaceChild(clone, overlay);
      found = true;
    });
    
    return found;
  }

  /**
   * Utility function for delays
   */
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /**
   * Get test results
   */
  getResults() {
    return this.results;
  }

  /**
   * Clear results
   */
  clearResults() {
    this.results = [];
  }

  /**
   * Get success rate
   */
  getSuccessRate() {
    if (this.results.length === 0) return 0;
    const successful = this.results.filter(r => r.success).length;
    return (successful / this.results.length) * 100;
  }
} 