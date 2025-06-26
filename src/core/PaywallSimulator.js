import { v4 as uuidv4 } from 'uuid';

/**
 * Core Paywall Simulator - Handles soft paywall implementation
 */
export class PaywallSimulator {
  constructor() {
    this.paywallId = uuidv4();
    this.isActive = false;
    this.paywallType = 'soft';
    this.config = {};
    this.telemetry = [];
    this.bypassAttempts = [];
  }

  /**
   * Initialize soft paywall
   */
  initPaywall(type = 'soft', config = {}) {
    if (type !== 'soft') {
      console.warn('Only soft paywalls are supported. Defaulting to soft paywall.');
    }
    
    this.paywallType = 'soft';
    this.config = { ...this.getDefaultConfig(), ...config };
    this.isActive = true;
    
    this.logTelemetry('paywall_initialized', {
      type: 'soft',
      config: this.config,
      timestamp: Date.now()
    });

    return this;
  }

  /**
   * Get default configuration for soft paywall
   */
  getDefaultConfig() {
    return {
      blurIntensity: 5,
      overlayOpacity: 0.8,
      modalEnabled: true,
      dismissible: false
    };
  }

  /**
   * Apply soft paywall to the current page
   */
  applyPaywall() {
    if (!this.isActive) return;

    this.applySoftPaywall();

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
    
    console.log('[PaywallSimulator] Applying soft paywall with config:', this.config);
    
    // Find the content simulation area
    const contentArea = document.getElementById('content-simulation');
    console.log('[PaywallSimulator] Content area found:', contentArea);
    
    if (!contentArea) {
      console.warn('Content simulation area not found, applying to entire page');
      this.applySoftPaywallToPage(blurIntensity, overlayOpacity, modalEnabled);
      return;
    }
    
    // Apply paywall to content area only
    this.applySoftPaywallToContent(contentArea, blurIntensity, overlayOpacity, modalEnabled);
  }

  /**
   * Apply soft paywall to specific content area
   */
  applySoftPaywallToContent(contentArea, blurIntensity, overlayOpacity, modalEnabled) {
    console.log('[PaywallSimulator] Applying to content area:', contentArea);
    
    // Create overlay for content area
    const overlay = document.createElement('div');
    overlay.id = `paywall-overlay-${this.paywallId}`;
    overlay.className = 'paywall-overlay';
    overlay.style.cssText = `
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, ${overlayOpacity});
      z-index: 1000;
      backdrop-filter: blur(${blurIntensity}px);
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    `;

    console.log('[PaywallSimulator] Created overlay:', overlay);

    // Create modal
    if (modalEnabled) {
      const modal = document.createElement('div');
      modal.className = 'paywall-modal';
      modal.innerHTML = `
        <h3>🔒 Premium Content</h3>
        <p>This article is part of our premium content library. Subscribe to continue reading.</p>
        <div class="modal-buttons">
          <button class="btn-primary" onclick="this.closest('.paywall-overlay').remove()">Subscribe Now</button>
          ${this.config.dismissible ? '<button class="btn-secondary" onclick="this.closest(\'.paywall-overlay\').remove()">Maybe Later</button>' : ''}
        </div>
      `;
      overlay.appendChild(modal);
      console.log('[PaywallSimulator] Added modal to overlay');
    }

    // Add click handler for dismissible functionality
    if (this.config.dismissible && !modalEnabled) {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.remove();
          this.logTelemetry('paywall_dismissed', {
            method: 'click_outside',
            timestamp: Date.now()
          });
        }
      });
    }

    contentArea.appendChild(overlay);
    console.log('[PaywallSimulator] Added overlay to content area');
    
    this.logTelemetry('paywall_overlay_created', {
      blurIntensity,
      overlayOpacity,
      modalEnabled,
      dismissible: this.config.dismissible,
      timestamp: Date.now()
    });
  }

  /**
   * Apply soft paywall to entire page (fallback)
   */
  applySoftPaywallToPage(blurIntensity, overlayOpacity, modalEnabled) {
    // Create overlay for entire page
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
   * Log telemetry data
   */
  logTelemetry(event, data) {
    const telemetryEntry = {
      id: uuidv4(),
      event,
      data,
      timestamp: Date.now(),
      paywallId: this.paywallId
    };

    this.telemetry.push(telemetryEntry);
    console.log(`[PaywallSimulator] ${event}:`, data);
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
    // Remove any existing paywall overlays
    const overlays = document.querySelectorAll('[id*="paywall-overlay"]');
    overlays.forEach(overlay => overlay.remove());

    this.isActive = false;
    this.paywallType = null;
    this.config = {};
    
    this.logTelemetry('paywall_reset', {
      timestamp: Date.now()
    });
  }
} 