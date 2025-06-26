import { PaywallSimulator } from './PaywallSimulator.js';
import { BypassEngine } from './BypassEngine.js';
import { TelemetryCollector } from './TelemetryCollector.js';

/**
 * PayBreak Framework - Soft Paywall Security Research Tool
 */
export class PayBreakFramework {
  constructor() {
    this.paywallSimulator = new PaywallSimulator();
    this.bypassEngine = new BypassEngine();
    this.telemetryCollector = new TelemetryCollector();
    
    this.isInitialized = false;
    this.currentSession = null;
    this.sessionData = {
      paywallAttempts: [],
      bypassAttempts: [],
      telemetry: [],
      startTime: null,
      endTime: null
    };
  }

  /**
   * Initialize the framework
   */
  async initialize() {
    if (this.isInitialized) return;
    
    console.log('[PayBreakFramework] Initializing...');
    
    // Initialize telemetry collector
    this.telemetryCollector.startCollection();
    
    // Start new session
    this.currentSession = this.generateSessionId();
    this.sessionData.startTime = Date.now();
    
    this.isInitialized = true;
    
    console.log('[PayBreakFramework] Initialized successfully');
    
    return {
      sessionId: this.currentSession,
      timestamp: Date.now()
    };
  }

  /**
   * Apply soft paywall
   */
  async applySoftPaywall(config = {}) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    console.log('[PayBreakFramework] Applying soft paywall...');
    
    try {
      // Initialize and apply paywall
      this.paywallSimulator.initPaywall('soft', config);
      this.paywallSimulator.applyPaywall();
      
      // Record attempt
      this.sessionData.paywallAttempts.push({
        type: 'soft',
        config,
        timestamp: Date.now(),
        success: true
      });
      
      return {
        success: true,
        paywallId: this.paywallSimulator.paywallId,
        timestamp: Date.now()
      };
      
    } catch (error) {
      console.error('[PayBreakFramework] Error applying soft paywall:', error);
      
      this.sessionData.paywallAttempts.push({
        type: 'soft',
        config,
        timestamp: Date.now(),
        success: false,
        error: error.message
      });
      
      return {
        success: false,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Reset current paywall
   */
  async resetPaywall() {
    console.log('[PayBreakFramework] Resetting paywall...');
    
    try {
      this.paywallSimulator.reset();
      
      return {
        success: true,
        timestamp: Date.now()
      };
      
    } catch (error) {
      console.error('[PayBreakFramework] Error resetting paywall:', error);
      
      return {
        success: false,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Run full test suite against soft paywall
   */
  async runFullTestSuite() {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    console.log('[PayBreakFramework] Running full test suite...');
    
    try {
      // Apply soft paywall first
      await this.applySoftPaywall();
      
      // Run bypass techniques
      const results = await this.bypassEngine.runFullTestSuite(this.paywallSimulator);
      
      // Record results
      this.sessionData.bypassAttempts.push(...results);
      
      return {
        success: true,
        results,
        totalTechniques: results.length,
        successRate: this.bypassEngine.getSuccessRate(),
        timestamp: Date.now()
      };
      
    } catch (error) {
      console.error('[PayBreakFramework] Error running test suite:', error);
      
      return {
        success: false,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Run individual bypass technique
   */
  async runBypassTechnique(technique) {
    if (!this.isInitialized) {
      await this.initialize();
    }
    
    console.log(`[PayBreakFramework] Running bypass technique: ${technique}`);
    
    try {
      const result = await this.bypassEngine.runTechnique(technique, this.paywallSimulator);
      
      // Record result
      this.sessionData.bypassAttempts.push(result);
      
      return {
        success: true,
        result,
        timestamp: Date.now()
      };
      
    } catch (error) {
      console.error(`[PayBreakFramework] Error running technique ${technique}:`, error);
      
      return {
        success: false,
        error: error.message,
        timestamp: Date.now()
      };
    }
  }

  /**
   * Get current session data
   */
  getSessionData() {
    return {
      sessionId: this.currentSession,
      isInitialized: this.isInitialized,
      paywallAttempts: this.sessionData.paywallAttempts,
      bypassAttempts: this.sessionData.bypassAttempts,
      telemetry: this.telemetryCollector.getTelemetryData(),
      startTime: this.sessionData.startTime,
      endTime: this.sessionData.endTime,
      duration: this.sessionData.startTime ? 
        (this.sessionData.endTime || Date.now()) - this.sessionData.startTime : 0
    };
  }

  /**
   * Get telemetry data
   */
  getTelemetry() {
    return this.telemetryCollector.getTelemetryData();
  }

  /**
   * Get bypass results
   */
  getBypassResults() {
    return this.bypassEngine.getResults();
  }

  /**
   * Get paywall simulator data
   */
  getPaywallData() {
    return {
      isActive: this.paywallSimulator.isActive,
      paywallType: this.paywallSimulator.paywallType,
      config: this.paywallSimulator.config,
      telemetry: this.paywallSimulator.getTelemetry(),
      bypassAttempts: this.paywallSimulator.getBypassAttempts()
    };
  }

  /**
   * Generate session ID
   */
  generateSessionId() {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * End current session
   */
  endSession() {
    this.sessionData.endTime = Date.now();
    
    console.log('[PayBreakFramework] Session ended:', {
      sessionId: this.currentSession,
      duration: this.sessionData.endTime - this.sessionData.startTime,
      totalPaywallAttempts: this.sessionData.paywallAttempts.length,
      totalBypassAttempts: this.sessionData.bypassAttempts.length
    });
    
    return this.getSessionData();
  }

  /**
   * Get framework status
   */
  getStatus() {
    return {
      isInitialized: this.isInitialized,
      sessionId: this.currentSession,
      bypassEngineRunning: this.bypassEngine.isRunning,
      telemetryEnabled: this.telemetryCollector.isCollecting,
      paywallActive: this.paywallSimulator.isActive,
      paywallType: this.paywallSimulator.paywallType,
      timestamp: Date.now()
    };
  }
} 