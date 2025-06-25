import { v4 as uuidv4 } from 'uuid';

/**
 * Core Paywall Simulator - Handles different types of paywall implementations
 */
export class PaywallSimulator {
  constructor() {
    this.paywallId = uuidv4();
    this.isActive = false;
    this.paywallType = null;
    this.config = {};
    this.telemetry = [];
    this.bypassAttempts = [];
  }

  /**
   * Initialize a specific paywall type
   */
  initPaywall(type, config = {}) {
    this.paywallType = type;
    this.config = { ...this.getDefaultConfig(type), ...config };
    this.isActive = true;
    
    this.logTelemetry('paywall_initialized', {
      type,
      config: this.config,
      timestamp: Date.now()
    });

    return this;
  }

  /**
   * Get default configuration for paywall types
   */
  getDefaultConfig(type) {
    const configs = {
      soft: {
        blurIntensity: 5,
        overlayOpacity: 0.8,
        modalEnabled: true,
        dismissible: false
      },
      metered: {
        freeArticles: 3,
        currentCount: 0,
        resetInterval: 24 * 60 * 60 * 1000, // 24 hours
        storageKey: 'metered_paywall_count'
      },
      hard: {
        redirectUrl: '/subscribe',
        requireLogin: true,
        blockContent: true
      },
      obfuscated: {
        obfuscationLevel: 'medium',
        variableNameMangling: true,
        functionNameMangling: true,
        stringEncoding: true
      },
      serverValidated: {
        cookieName: 'paywall_token',
        validationEndpoint: '/api/validate-paywall',
        signedCookies: true,
        expirationTime: 3600
      }
    };

    return configs[type] || {};
  }

  /**
   * Apply paywall to the current page
   */
  applyPaywall() {
    if (!this.isActive) return;

    switch (this.paywallType) {
      case 'soft':
        this.applySoftPaywall();
        break;
      case 'metered':
        this.applyMeteredPaywall();
        break;
      case 'hard':
        this.applyHardPaywall();
        break;
      case 'obfuscated':
        this.applyObfuscatedPaywall();
        break;
      case 'serverValidated':
        this.applyServerValidatedPaywall();
        break;
    }

    this.logTelemetry('paywall_applied', {
      type: this.paywallType,
      timestamp: Date.now()
    });
  }

  /**
   * Soft paywall - blur + modal overlay
   */
  applySoftPaywall() {
    const { blurIntensity, overlayOpacity, modalEnabled } = this.config;
    
    // Create overlay
    const overlay = document.createElement('div');
    overlay.id = `paywall-overlay-${this.paywallId}`;
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, ${overlayOpacity});
      z-index: 9999;
      backdrop-filter: blur(${blurIntensity}px);
    `;

    // Create modal
    if (modalEnabled) {
      const modal = document.createElement('div');
      modal.id = `paywall-modal-${this.paywallId}`;
      modal.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: white;
        padding: 2rem;
        border-radius: 8px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        z-index: 10000;
        max-width: 500px;
        text-align: center;
      `;
      modal.innerHTML = `
        <h2>Subscribe to Continue Reading</h2>
        <p>This content is behind a paywall. Subscribe to access unlimited articles.</p>
        <button onclick="document.getElementById('paywall-overlay-${this.paywallId}').remove()">Subscribe Now</button>
        <button onclick="document.getElementById('paywall-overlay-${this.paywallId}').remove()">Maybe Later</button>
      `;
      overlay.appendChild(modal);
    }

    document.body.appendChild(overlay);
  }

  /**
   * Metered paywall - count-based access
   */
  applyMeteredPaywall() {
    const { freeArticles, storageKey } = this.config;
    
    // Get current count from storage
    let currentCount = parseInt(localStorage.getItem(storageKey) || '0');
    
    if (currentCount >= freeArticles) {
      // Apply paywall
      this.applySoftPaywall();
    } else {
      // Increment count
      currentCount++;
      localStorage.setItem(storageKey, currentCount.toString());
      
      // Show meter indicator
      this.showMeterIndicator(currentCount, freeArticles);
    }
  }

  /**
   * Show meter indicator
   */
  showMeterIndicator(current, total) {
    const indicator = document.createElement('div');
    indicator.id = `meter-indicator-${this.paywallId}`;
    indicator.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 10px 15px;
      border-radius: 5px;
      font-size: 14px;
      z-index: 9998;
    `;
    indicator.textContent = `${current}/${total} free articles used`;
    document.body.appendChild(indicator);
  }

  /**
   * Hard paywall - redirect or block content
   */
  applyHardPaywall() {
    const { redirectUrl, requireLogin, blockContent } = this.config;
    
    if (redirectUrl) {
      // Simulate redirect
      window.location.href = redirectUrl;
    } else if (blockContent) {
      // Hide all content
      document.body.innerHTML = `
        <div style="text-align: center; padding: 50px;">
          <h1>Content Blocked</h1>
          <p>This content requires a subscription.</p>
          <button onclick="window.location.reload()">Go Back</button>
        </div>
      `;
    }
  }

  /**
   * Obfuscated paywall - JavaScript obfuscation
   */
  applyObfuscatedPaywall() {
    const { obfuscationLevel, variableNameMangling, functionNameMangling } = this.config;
    
    // Create obfuscated paywall logic
    const obfuscatedCode = this.generateObfuscatedCode();
    
    // Inject obfuscated script
    const script = document.createElement('script');
    script.textContent = obfuscatedCode;
    document.head.appendChild(script);
    
    // Apply obfuscated paywall
    this.applySoftPaywall();
  }

  /**
   * Generate obfuscated JavaScript code
   */
  generateObfuscatedCode() {
    return `
      (function(){
        var _0x1a2b = ['paywall', 'check', 'block', 'content'];
        var _0x3c4d = function(_0x5e6f) {
          return _0x1a2b[_0x5e6f];
        };
        
        var _0x7g8h = function() {
          var _0x9i0j = document[_0x3c4d(0)];
          if (_0x9i0j) {
            _0x9i0j[_0x3c4d(1)] = true;
            _0x9i0j[_0x3c4d(2)] = true;
          }
        };
        
        _0x7g8h();
      })();
    `;
  }

  /**
   * Server-validated paywall
   */
  applyServerValidatedPaywall() {
    const { cookieName, validationEndpoint, signedCookies } = this.config;
    
    // Check for valid token
    const token = this.getCookie(cookieName);
    
    if (!token || !this.validateToken(token)) {
      this.applySoftPaywall();
    }
  }

  /**
   * Get cookie value
   */
  getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
    return null;
  }

  /**
   * Validate token (simulated)
   */
  validateToken(token) {
    // Simulate token validation
    return token && token.length > 10;
  }

  /**
   * Log telemetry data
   */
  logTelemetry(event, data) {
    const telemetryEntry = {
      id: uuidv4(),
      event,
      data,
      timestamp: Date.now(),
      paywallId: this.paywallId,
      paywallType: this.paywallType
    };
    
    this.telemetry.push(telemetryEntry);
    
    // Also log to console for debugging
    console.log(`[PayBreak Telemetry] ${event}:`, telemetryEntry);
  }

  /**
   * Record bypass attempt
   */
  recordBypassAttempt(technique, success, details = {}) {
    const attempt = {
      id: uuidv4(),
      technique,
      success,
      details,
      timestamp: Date.now(),
      paywallId: this.paywallId,
      paywallType: this.paywallType
    };
    
    this.bypassAttempts.push(attempt);
    this.logTelemetry('bypass_attempt', attempt);
    
    return attempt;
  }

  /**
   * Get telemetry data
   */
  getTelemetry() {
    return this.telemetry;
  }

  /**
   * Get bypass attempts
   */
  getBypassAttempts() {
    return this.bypassAttempts;
  }

  /**
   * Reset paywall
   */
  reset() {
    this.isActive = false;
    this.paywallType = null;
    this.config = {};
    
    // Remove paywall elements
    const elements = document.querySelectorAll(`[id*="${this.paywallId}"]`);
    elements.forEach(el => el.remove());
    
    this.logTelemetry('paywall_reset', {
      timestamp: Date.now()
    });
  }
} 