import React, { useState, useEffect } from 'react';
import { PayBreakFramework } from '../core/PayBreakFramework.js';
import { Dashboard } from './Dashboard.jsx';
import { PaywallControls } from './PaywallControls.jsx';
import { BypassPanel } from './BypassPanel.jsx';
import { AnalysisPanel } from './AnalysisPanel.jsx';
import { TelemetryViewer } from './TelemetryViewer.jsx';
import { Instructions } from './Instructions.jsx';

/**
 * Main App Component - Soft Paywall Research Tool
 */
export function App() {
  const [framework, setFramework] = useState(null);
  const [currentPage, setCurrentPage] = useState('dashboard');
  const [paywallActive, setPaywallActive] = useState(false);
  const [sessionData, setSessionData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeFramework();
  }, []);

  const initializeFramework = async () => {
    try {
      const newFramework = new PayBreakFramework();
      await newFramework.initialize();
      setFramework(newFramework);
      setLoading(false);
    } catch (error) {
      console.error('Failed to initialize framework:', error);
      setLoading(false);
    }
  };

  const handleApplyPaywall = async (type, config) => {
    console.log('[App] Attempting to apply paywall:', { type, config });
    if (!framework) {
      console.error('[App] Framework not initialized');
      return;
    }

    try {
      console.log('[App] Calling framework.applySoftPaywall...');
      const result = await framework.applySoftPaywall(config);
      console.log('[App] Paywall application result:', result);
      
      if (result.success) {
        setPaywallActive(true);
        updateSessionData();
        console.log('[App] Paywall applied successfully');
      } else {
        console.error('[App] Paywall application failed:', result.error);
      }
    } catch (error) {
      console.error('[App] Error applying paywall:', error);
    }
  };

  const handleResetPaywall = async () => {
    if (!framework) return;

    try {
      const result = await framework.resetPaywall();
      if (result.success) {
        setPaywallActive(false);
        updateSessionData();
      }
    } catch (error) {
      console.error('Error resetting paywall:', error);
    }
  };

  const handleRunTestSuite = async () => {
    if (!framework) return;

    try {
      const result = await framework.runFullTestSuite();
      if (result.success) {
        updateSessionData();
      }
    } catch (error) {
      console.error('Error running test suite:', error);
    }
  };

  const handleRunBypassTechnique = async (technique) => {
    if (!framework) return;

    try {
      const result = await framework.runBypassTechnique(technique);
      if (result.success) {
        updateSessionData();
      }
    } catch (error) {
      console.error('Error running bypass technique:', error);
    }
  };

  const updateSessionData = () => {
    if (framework) {
      setSessionData(framework.getSessionData());
    }
  };

  const navigateToPage = (page) => {
    setCurrentPage(page);
    updateSessionData();
    
    // Auto-apply soft paywall when navigating to paywall page
    if (page === 'paywall' && !paywallActive) {
      setTimeout(() => {
        handleApplyPaywall('soft', {
          blurIntensity: 5,
          overlayOpacity: 0.8,
          modalEnabled: true,
          dismissible: false
        });
      }, 500); // Small delay to ensure page is rendered
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="loading-spinner"></div>
        <h2>Initializing PayBreak Framework...</h2>
        <p>Setting up soft paywall research environment</p>
      </div>
    );
  }

  return (
    <div className="app">
      <header className="app-header">
        <div className="header-content">
          <h1>
            <img src="/favicon.svg" alt="PayBreak Shield" className="title-icon" />
            PayBreak
          </h1>
          <p>Soft Paywall Security Research Framework</p>
        </div>
        <nav className="app-nav">
          <button 
            onClick={() => navigateToPage('dashboard')}
            className={currentPage === 'dashboard' ? 'active' : ''}
          >
            🏠 Dashboard
          </button>
          <button 
            onClick={() => navigateToPage('paywall')}
            className={currentPage === 'paywall' ? 'active' : ''}
          >
            🔒 Paywall Simulator
          </button>
          <button 
            onClick={() => navigateToPage('bypass')}
            className={currentPage === 'bypass' ? 'active' : ''}
          >
            🛠️ Bypass Tools
          </button>
          <button 
            onClick={() => navigateToPage('analysis')}
            className={currentPage === 'analysis' ? 'active' : ''}
          >
            📊 Analysis
          </button>
          <button 
            onClick={() => navigateToPage('telemetry')}
            className={currentPage === 'telemetry' ? 'active' : ''}
          >
            📈 Telemetry
          </button>
          <button 
            onClick={() => navigateToPage('instructions')}
            className={currentPage === 'instructions' ? 'active' : ''}
          >
            📖 Instructions
          </button>
        </nav>
      </header>

      <main className="app-main">
        {currentPage === 'dashboard' && (
          <Dashboard 
            framework={framework}
            sessionData={sessionData}
            paywallActive={paywallActive}
            onRunTestSuite={handleRunTestSuite}
            onNavigateToPage={navigateToPage}
          />
        )}

        {currentPage === 'paywall' && (
          <div className="page-content">
            <h2>🔒 Soft Paywall Simulator</h2>
            <p>Test and configure soft paywall implementations</p>
            
            <div className="content-simulation" id="content-simulation">
              <h3>📰 Sample Article Content</h3>
              <p>This is a simulated article that demonstrates how soft paywalls work. The content below will be blurred and overlaid when you apply a soft paywall.</p>
              
              <h4>Understanding Soft Paywalls</h4>
              <p>Soft paywalls are user-friendly content restrictions that blur or overlay content rather than completely blocking access. They're commonly used by news sites and content platforms to encourage subscriptions while still allowing users to see what content is available.</p>
              
              <h4>How They Work</h4>
              <p>Soft paywalls typically use CSS blur effects, overlay divs, and modal dialogs to restrict content access. They're easier to bypass than hard paywalls because the content is still present in the DOM, just visually obscured.</p>
              
              <h4>Security Considerations</h4>
              <p>While soft paywalls provide a better user experience, they're more vulnerable to bypass techniques. Common bypass methods include DOM manipulation, CSS overrides, and JavaScript hooks.</p>
              
              <div className="article-meta">
                <span>📅 Published: January 2025</span>
                <span>👁️ Views: 1,234</span>
                <span>💬 Comments: 56</span>
              </div>
            </div>

            <PaywallControls 
              onApplyPaywall={handleApplyPaywall}
              onResetPaywall={handleResetPaywall}
              isActive={paywallActive}
            />
          </div>
        )}

        {currentPage === 'bypass' && (
          <BypassPanel 
            framework={framework}
            sessionData={sessionData}
            onRunBypassTechnique={handleRunBypassTechnique}
            onRunTestSuite={handleRunTestSuite}
          />
        )}

        {currentPage === 'analysis' && (
          <AnalysisPanel 
            framework={framework}
            sessionData={sessionData}
          />
        )}

        {currentPage === 'telemetry' && (
          <TelemetryViewer 
            framework={framework}
            sessionData={sessionData}
          />
        )}

        {currentPage === 'instructions' && (
          <Instructions />
        )}
      </main>

      <footer className="app-footer">
        <div className="footer-content">
          <div className="footer-brand">
            <img src="/favicon.svg" alt="PayBreak Shield" className="footer-icon" />
            <span>PayBreak</span>
          </div>
          <p>&copy; 2025 Matt Christiansen. Soft Paywall Security Research Framework</p>
        </div>
      </footer>
    </div>
  );
} 