import { PayBreakFramework } from './core/PayBreakFramework.js';
import { createUI } from './ui/App.js';

console.log('[PayBreak] Script loaded: src/index.js');

/**
 * Main entry point for PayBreak Framework
 */
class PayBreakApp {
  constructor() {
    console.log('[PayBreak] Creating PayBreakApp instance...');
    this.framework = new PayBreakFramework();
    this.isInitialized = false;
  }

  /**
   * Initialize the application
   */
  async initialize() {
    try {
      console.log('[PayBreak] Initializing PayBreak Framework...');
      
      // Initialize the framework
      console.log('[PayBreak] Calling framework.initialize()...');
      const initResult = await this.framework.initialize();
      console.log('[PayBreak] framework.initialize() result:', initResult);
      
      if (!initResult.success) {
        throw new Error(initResult.error);
      }

      // Start a session
      console.log('[PayBreak] Calling framework.startSession()...');
      await this.framework.startSession({
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: Date.now()
      });
      console.log('[PayBreak] framework.startSession() complete');

      this.isInitialized = true;
      console.log('[PayBreak] Framework initialized successfully');

      // Create and mount the UI
      console.log('[PayBreak] Calling createUI...');
      createUI(this.framework);
      console.log('[PayBreak] createUI complete');

      // Add global access for debugging
      window.paybreak = this.framework;
      console.log('[PayBreak] Framework exposed globally as window.paybreak');

      return true;
    } catch (error) {
      console.error('[PayBreak] Failed to initialize PayBreak Framework:', error);
      console.error('[PayBreak] Error stack:', error.stack);
      document.getElementById('app').innerHTML = '<div style="color:red;text-align:center;margin-top:2em;">❌ Failed to load PayBreak. Check the browser console for errors.</div>';
      return false;
    }
  }

  /**
   * Get framework instance
   */
  getFramework() {
    return this.framework;
  }

  /**
   * Check if initialized
   */
  isReady() {
    return this.isInitialized;
  }
}

// Initialize the application when DOM is ready
document.addEventListener('DOMContentLoaded', async () => {
  console.log('[PayBreak] DOMContentLoaded event fired');
  const app = new PayBreakApp();
  const result = await app.initialize();
  console.log('[PayBreak] App initialization result:', result);
});

// Export for module usage
export { PayBreakApp }; 