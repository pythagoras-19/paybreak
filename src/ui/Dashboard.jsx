import React, { useState, useEffect } from 'react';

/**
 * Dashboard Component - Soft Paywall Overview
 */
export function Dashboard({ framework, sessionData, paywallActive, onRunTestSuite, onNavigateToPage }) {
  const [status, setStatus] = useState(null);
  const [bypassResults, setBypassResults] = useState([]);
  const [telemetry, setTelemetry] = useState([]);

  useEffect(() => {
    if (framework) {
      updateDashboardData();
    }
  }, [framework, sessionData]);

  const updateDashboardData = () => {
    if (framework) {
      setStatus(framework.getStatus());
      setBypassResults(framework.getBypassResults());
      setTelemetry(framework.getTelemetry());
    }
  };

  const getSuccessRate = () => {
    if (bypassResults.length === 0) return 0;
    const successful = bypassResults.filter(r => r.success).length;
    return (successful / bypassResults.length) * 100;
  };

  const getRecentTelemetry = () => {
    return telemetry.slice(-5).reverse();
  };

  const getRecentBypassAttempts = () => {
    return bypassResults.slice(-3).reverse();
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>🏠 Dashboard - Soft Paywall Research</h2>
        <p>Monitor and control your soft paywall security testing session</p>
      </div>

      <div className="dashboard-grid">
        {/* Status Overview */}
        <div className="dashboard-card status-card">
          <h3>📊 Framework Status</h3>
          <div className="status-grid">
            <div className="status-item">
              <span className="status-label">Framework:</span>
              <span className={`status-value ${status?.isInitialized ? 'success' : 'error'}`}>
                {status?.isInitialized ? '✅ Active' : '❌ Inactive'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Paywall:</span>
              <span className={`status-value ${paywallActive ? 'warning' : 'success'}`}>
                {paywallActive ? '🔒 Active' : '✅ Inactive'}
              </span>
            </div>
            <div className="status-item">
              <span className="status-label">Type:</span>
              <span className="status-value">Soft Paywall</span>
            </div>
            <div className="status-item">
              <span className="status-label">Telemetry:</span>
              <span className={`status-value ${status?.telemetryEnabled ? 'success' : 'error'}`}>
                {status?.telemetryEnabled ? '✅ Enabled' : '❌ Disabled'}
              </span>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="dashboard-card actions-card">
          <h3>⚡ Quick Actions</h3>
          <div className="action-buttons">
            <button 
              onClick={() => onNavigateToPage('paywall')}
              className="btn-primary"
            >
              🔒 Test Soft Paywall
            </button>
            <button 
              onClick={() => onNavigateToPage('bypass')}
              className="btn-secondary"
            >
              🛠️ Bypass Tools
            </button>
            <button 
              onClick={onRunTestSuite}
              className="btn-accent"
              disabled={status?.bypassEngineRunning}
            >
              🚀 Run Full Test Suite
            </button>
          </div>
          <div className="action-description">
            <p><strong>Test Soft Paywall:</strong> Navigate to the paywall simulator and apply a soft paywall to test content</p>
            <p><strong>Bypass Tools:</strong> Access bypass techniques to test paywall security</p>
            <p><strong>Run Full Test Suite:</strong> Automatically test all bypass techniques against the current paywall</p>
          </div>
        </div>

        {/* Session Stats */}
        <div className="dashboard-card stats-card">
          <h3>📈 Session Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{sessionData?.paywallAttempts?.length || 0}</span>
              <span className="stat-label">Paywall Tests</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{sessionData?.bypassAttempts?.length || 0}</span>
              <span className="stat-label">Bypass Attempts</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{getSuccessRate().toFixed(1)}%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{sessionData?.telemetry?.length || 0}</span>
              <span className="stat-label">Telemetry Events</span>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="dashboard-card activity-card">
          <h3>🕒 Recent Activity</h3>
          <div className="activity-list">
            {getRecentTelemetry().map((event, index) => (
              <div key={index} className="activity-item">
                <span className="activity-time">
                  {new Date(event.timestamp).toLocaleTimeString()}
                </span>
                <span className="activity-event">{event.event}</span>
              </div>
            ))}
            {getRecentTelemetry().length === 0 && (
              <p className="no-activity">No recent activity</p>
            )}
          </div>
        </div>

        {/* Bypass Results */}
        <div className="dashboard-card results-card">
          <h3>🎯 Recent Bypass Results</h3>
          <div className="results-list">
            {getRecentBypassAttempts().map((result, index) => (
              <div key={index} className={`result-item ${result.success ? 'success' : 'failed'}`}>
                <span className="result-technique">{result.technique}</span>
                <span className={`result-status ${result.success ? 'success' : 'failed'}`}>
                  {result.success ? '✅' : '❌'}
                </span>
                <span className="result-duration">{result.duration}ms</span>
              </div>
            ))}
            {getRecentBypassAttempts().length === 0 && (
              <p className="no-results">No bypass attempts yet</p>
            )}
          </div>
        </div>

        {/* Soft Paywall Info */}
        <div className="dashboard-card info-card">
          <h3>ℹ️ About Soft Paywalls</h3>
          <div className="info-content">
            <p><strong>Soft paywalls</strong> use visual techniques like blur effects and overlays to restrict content access while keeping the content in the DOM.</p>
            <ul>
              <li>🔍 Content is blurred or overlaid</li>
              <li>📱 Often includes modal dialogs</li>
              <li>🎯 Easier to bypass than hard paywalls</li>
              <li>⚡ Good for user experience</li>
            </ul>
            <button 
              onClick={() => onNavigateToPage('instructions')}
              className="btn-text"
            >
              📖 Read Full Instructions →
            </button>
          </div>
        </div>
      </div>

      {/* Navigation Footer */}
      <div className="dashboard-footer">
        <div className="nav-suggestions">
          <h4>Suggested Next Steps:</h4>
          <div className="nav-buttons">
            <button onClick={() => onNavigateToPage('paywall')}>
              🔒 Test Soft Paywall
            </button>
            <button onClick={() => onNavigateToPage('bypass')}>
              🛠️ Try Bypass Techniques
            </button>
            <button onClick={() => onNavigateToPage('analysis')}>
              📊 View Analysis
            </button>
            <button onClick={() => onNavigateToPage('telemetry')}>
              📈 Check Telemetry
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 