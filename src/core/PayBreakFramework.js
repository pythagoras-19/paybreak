import { PaywallSimulator } from './PaywallSimulator.js';
import { BypassEngine } from './BypassEngine.js';
import { TelemetryCollector } from './TelemetryCollector.js';

/**
 * Main PayBreak Framework - Orchestrates all components
 */
export class PayBreakFramework {
  constructor() {
    this.paywallSimulator = new PaywallSimulator();
    this.bypassEngine = new BypassEngine(this.paywallSimulator);
    this.telemetryCollector = new TelemetryCollector();
    this.isActive = false;
    this.currentSession = null;
    this.autoFuzzing = false;
    this.fuzzingInterval = null;
  }

  /**
   * Initialize the framework
   */
  async initialize() {
    try {
      // Start telemetry collection
      this.telemetryCollector.startCollection();
      
      // Log initialization
      this.telemetryCollector.logTelemetry('framework_initialized', {
        timestamp: Date.now(),
        version: '1.0.0',
        userAgent: navigator.userAgent
      });

      this.isActive = true;
      return { success: true, message: 'PayBreak Framework initialized successfully' };
    } catch (error) {
      console.error('Failed to initialize PayBreak Framework:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Start a new testing session
   */
  async startSession(config = {}) {
    if (!this.isActive) {
      throw new Error('Framework not initialized. Call initialize() first.');
    }

    this.currentSession = {
      id: this.telemetryCollector.sessionId,
      startTime: Date.now(),
      config,
      status: 'active'
    };

    this.telemetryCollector.logTelemetry('session_started', this.currentSession);
    
    return this.currentSession;
  }

  /**
   * End current session
   */
  async endSession() {
    if (!this.currentSession) {
      throw new Error('No active session to end.');
    }

    this.currentSession.endTime = Date.now();
    this.currentSession.duration = this.currentSession.endTime - this.currentSession.startTime;
    this.currentSession.status = 'completed';

    // Stop auto-fuzzing if active
    if (this.autoFuzzing) {
      this.stopAutoFuzzing();
    }

    this.telemetryCollector.logTelemetry('session_ended', this.currentSession);
    
    const session = this.currentSession;
    this.currentSession = null;
    
    return session;
  }

  /**
   * Apply a paywall for testing
   */
  async applyPaywall(type, config = {}) {
    if (!this.isActive) {
      throw new Error('Framework not initialized. Call initialize() first.');
    }

    try {
      // Initialize and apply paywall
      this.paywallSimulator.initPaywall(type, config);
      this.paywallSimulator.applyPaywall();

      // Capture initial state
      const initialState = this.telemetryCollector.capturePageSnapshot();

      this.telemetryCollector.logTelemetry('paywall_applied', {
        type,
        config,
        initialState,
        timestamp: Date.now()
      });

      return {
        success: true,
        paywallType: type,
        paywallId: this.paywallSimulator.paywallId,
        initialState
      };
    } catch (error) {
      console.error('Failed to apply paywall:', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Execute a specific bypass technique
   */
  async executeBypassTechnique(techniqueName) {
    if (!this.isActive) {
      throw new Error('Framework not initialized. Call initialize() first.');
    }

    try {
      // Execute the technique
      const result = await this.bypassEngine.executeTechnique(techniqueName);
      
      // Capture telemetry for the bypass attempt
      this.telemetryCollector.captureBypassAttempt(
        techniqueName,
        result.success,
        result
      );

      return result;
    } catch (error) {
      console.error(`Failed to execute technique ${techniqueName}:`, error);
      throw error;
    }
  }

  /**
   * Execute all bypass techniques
   */
  async executeAllBypassTechniques() {
    if (!this.isActive) {
      throw new Error('Framework not initialized. Call initialize() first.');
    }

    try {
      const results = await this.bypassEngine.executeAllTechniques();
      
      // Capture telemetry for each result
      results.forEach(result => {
        if (result.technique) {
          this.telemetryCollector.captureBypassAttempt(
            result.technique,
            result.success,
            result
          );
        }
      });

      return results;
    } catch (error) {
      console.error('Failed to execute all techniques:', error);
      throw error;
    }
  }

  /**
   * Execute bypass techniques by category
   */
  async executeBypassTechniquesByCategory(category) {
    if (!this.isActive) {
      throw new Error('Framework not initialized. Call initialize() first.');
    }

    try {
      const results = await this.bypassEngine.executeTechniquesByCategory(category);
      
      // Capture telemetry for each result
      results.forEach(result => {
        if (result.technique) {
          this.telemetryCollector.captureBypassAttempt(
            result.technique,
            result.success,
            result
          );
        }
      });

      return results;
    } catch (error) {
      console.error(`Failed to execute techniques for category ${category}:`, error);
      throw error;
    }
  }

  /**
   * Start auto-fuzzing mode
   */
  async startAutoFuzzing(config = {}) {
    if (!this.isActive) {
      throw new Error('Framework not initialized. Call initialize() first.');
    }

    const {
      interval = 5000, // 5 seconds
      maxIterations = 10,
      paywallTypes = ['soft', 'metered', 'obfuscated'],
      techniqueCategories = ['dom', 'javascript', 'storage']
    } = config;

    this.autoFuzzing = true;
    let iteration = 0;

    this.fuzzingInterval = setInterval(async () => {
      if (iteration >= maxIterations || !this.autoFuzzing) {
        this.stopAutoFuzzing();
        return;
      }

      try {
        // Randomly select paywall type
        const paywallType = paywallTypes[Math.floor(Math.random() * paywallTypes.length)];
        
        // Apply paywall
        await this.applyPaywall(paywallType);
        
        // Wait a bit for paywall to settle
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Execute random technique category
        const category = techniqueCategories[Math.floor(Math.random() * techniqueCategories.length)];
        await this.executeBypassTechniquesByCategory(category);
        
        // Reset paywall
        this.paywallSimulator.reset();
        
        iteration++;
        
        this.telemetryCollector.logTelemetry('fuzzing_iteration', {
          iteration,
          paywallType,
          category,
          timestamp: Date.now()
        });
        
      } catch (error) {
        console.error('Fuzzing iteration failed:', error);
      }
    }, interval);

    this.telemetryCollector.logTelemetry('auto_fuzzing_started', {
      config,
      timestamp: Date.now()
    });

    return { success: true, message: 'Auto-fuzzing started' };
  }

  /**
   * Stop auto-fuzzing mode
   */
  stopAutoFuzzing() {
    if (this.fuzzingInterval) {
      clearInterval(this.fuzzingInterval);
      this.fuzzingInterval = null;
    }
    
    this.autoFuzzing = false;
    
    this.telemetryCollector.logTelemetry('auto_fuzzing_stopped', {
      timestamp: Date.now()
    });
  }

  /**
   * Run a comprehensive test suite
   */
  async runTestSuite(config = {}) {
    if (!this.isActive) {
      throw new Error('Framework not initialized. Call initialize() first.');
    }

    const {
      paywallTypes = ['soft', 'metered', 'obfuscated', 'serverValidated'],
      techniqueCategories = ['dom', 'javascript', 'storage', 'network', 'csp', 'advanced'],
      includeAutoFuzzing = true
    } = config;

    const results = {
      sessionId: this.telemetryCollector.sessionId,
      startTime: Date.now(),
      paywallTests: [],
      techniqueTests: [],
      autoFuzzingResults: null
    };

    try {
      // Test each paywall type
      for (const paywallType of paywallTypes) {
        const paywallResult = await this.applyPaywall(paywallType);
        results.paywallTests.push(paywallResult);
        
        // Test each technique category
        for (const category of techniqueCategories) {
          const techniqueResults = await this.executeBypassTechniquesByCategory(category);
          results.techniqueTests.push({
            paywallType,
            category,
            results: techniqueResults
          });
        }
        
        // Reset paywall for next test
        this.paywallSimulator.reset();
      }

      // Run auto-fuzzing if enabled
      if (includeAutoFuzzing) {
        await this.startAutoFuzzing({ maxIterations: 5 });
        await new Promise(resolve => setTimeout(resolve, 30000)); // Wait 30 seconds
        this.stopAutoFuzzing();
        results.autoFuzzingResults = this.bypassEngine.generateReport();
      }

      results.endTime = Date.now();
      results.duration = results.endTime - results.startTime;

      this.telemetryCollector.logTelemetry('test_suite_completed', results);
      
      return results;
    } catch (error) {
      console.error('Test suite failed:', error);
      results.error = error.message;
      results.endTime = Date.now();
      return results;
    }
  }

  /**
   * Get current status
   */
  getStatus() {
    return {
      isActive: this.isActive,
      currentSession: this.currentSession,
      autoFuzzing: this.autoFuzzing,
      paywallActive: this.paywallSimulator.isActive,
      paywallType: this.paywallSimulator.paywallType,
      telemetryRecords: this.telemetryCollector.getTelemetryData().length,
      bypassAttempts: this.bypassEngine.getExecutionHistory().length,
      successfulBypasses: this.bypassEngine.getSuccessfulBypasses().length
    };
  }

  /**
   * Get bypass report
   */
  getBypassReport() {
    return this.bypassEngine.generateReport();
  }

  /**
   * Get telemetry report
   */
  getTelemetryReport() {
    return this.telemetryCollector.generateReport();
  }

  /**
   * Get comprehensive analysis report
   */
  getAnalysisReport() {
    const bypassReport = this.getBypassReport();
    const telemetryReport = this.getTelemetryReport();
    const status = this.getStatus();

    return {
      framework: {
        version: '1.0.0',
        status,
        session: this.currentSession
      },
      bypass: bypassReport,
      telemetry: telemetryReport,
      analysis: {
        successRate: bypassReport.successRate,
        mostEffectiveTechniques: this.getMostEffectiveTechniques(),
        paywallVulnerabilities: this.analyzePaywallVulnerabilities(),
        recommendations: this.generateRecommendations()
      },
      timestamp: Date.now()
    };
  }

  /**
   * Get most effective bypass techniques
   */
  getMostEffectiveTechniques() {
    const successfulBypasses = this.bypassEngine.getSuccessfulBypasses();
    const techniqueSuccess = {};

    successfulBypasses.forEach(bypass => {
      const technique = bypass.technique;
      techniqueSuccess[technique] = (techniqueSuccess[technique] || 0) + 1;
    });

    return Object.entries(techniqueSuccess)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 5)
      .map(([technique, count]) => ({ technique, successCount: count }));
  }

  /**
   * Analyze paywall vulnerabilities
   */
  analyzePaywallVulnerabilities() {
    const bypassAttempts = this.bypassEngine.getExecutionHistory();
    const vulnerabilities = {};

    bypassAttempts.forEach(attempt => {
      const paywallType = attempt.paywallType || 'unknown';
      if (!vulnerabilities[paywallType]) {
        vulnerabilities[paywallType] = { total: 0, successful: 0, techniques: {} };
      }
      
      vulnerabilities[paywallType].total++;
      if (attempt.success) {
        vulnerabilities[paywallType].successful++;
      }
      
      const technique = attempt.technique;
      if (!vulnerabilities[paywallType].techniques[technique]) {
        vulnerabilities[paywallType].techniques[technique] = 0;
      }
      vulnerabilities[paywallType].techniques[technique]++;
    });

    return vulnerabilities;
  }

  /**
   * Generate recommendations
   */
  generateRecommendations() {
    const vulnerabilities = this.analyzePaywallVulnerabilities();
    const recommendations = [];

    Object.entries(vulnerabilities).forEach(([paywallType, data]) => {
      const successRate = (data.successful / data.total) * 100;
      
      if (successRate > 50) {
        recommendations.push({
          type: 'high_risk',
          paywallType,
          message: `${paywallType} paywall has ${successRate.toFixed(1)}% bypass success rate`,
          suggestion: 'Consider implementing additional server-side validation'
        });
      } else if (successRate > 20) {
        recommendations.push({
          type: 'medium_risk',
          paywallType,
          message: `${paywallType} paywall has ${successRate.toFixed(1)}% bypass success rate`,
          suggestion: 'Review and strengthen client-side protection mechanisms'
        });
      }
    });

    return recommendations;
  }

  /**
   * Export all data
   */
  exportData(format = 'json') {
    const data = {
      framework: {
        version: '1.0.0',
        session: this.currentSession,
        status: this.getStatus()
      },
      bypass: this.bypassEngine.getExecutionHistory(),
      telemetry: this.telemetryCollector.exportData(),
      analysis: this.getAnalysisReport()
    };

    if (format === 'json') {
      return JSON.stringify(data, null, 2);
    } else if (format === 'csv') {
      return this.telemetryCollector.exportData('csv');
    }

    return data;
  }

  /**
   * Cleanup and shutdown
   */
  async shutdown() {
    try {
      // Stop auto-fuzzing if active
      if (this.autoFuzzing) {
        this.stopAutoFuzzing();
      }

      // End current session if active
      if (this.currentSession) {
        await this.endSession();
      }

      // Stop telemetry collection
      this.telemetryCollector.stopCollection();

      // Reset paywall
      this.paywallSimulator.reset();

      this.isActive = false;

      this.telemetryCollector.logTelemetry('framework_shutdown', {
        timestamp: Date.now()
      });

      return { success: true, message: 'Framework shutdown successfully' };
    } catch (error) {
      console.error('Failed to shutdown framework:', error);
      return { success: false, error: error.message };
    }
  }
} 