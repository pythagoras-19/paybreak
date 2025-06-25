import { PayBreakFramework } from './core/PayBreakFramework.js';
import { createUI } from './ui/App.js';

/**
 * Main entry point for PayBreak Framework
 */
class PayBreakApp {
  constructor() {
    this.framework = new PayBreakFramework();
    this.isInitialized = false;
  }

  /**
   * Initialize the application
   */
  async initialize() {
    try {
      console.log('🚀 Initializing PayBreak Framework...');
      
      // Initialize the framework
      const initResult = await this.framework.initialize();
      if (!initResult.success) {
        throw new Error(initResult.error);
      }

      // Start a session
      await this.framework.startSession({
        userAgent: navigator.userAgent,
        url: window.location.href,
        timestamp: Date.now()
      });

      this.isInitialized = true;
      console.log('✅ PayBreak Framework initialized successfully');

      // Create and mount the UI
      createUI(this.framework);

      // Add global access for debugging
      window.paybreak = this.framework;

      return true;
    } catch (error) {
      console.error('❌ Failed to initialize PayBreak Framework:', error);
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
  const app = new PayBreakApp();
  await app.initialize();
});

// Export for module usage
export { PayBreakApp }; 