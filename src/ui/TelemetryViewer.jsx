import React, { useState, useEffect } from 'react';

/**
 * Telemetry Viewer Component - Soft Paywall Telemetry
 */
export function TelemetryViewer({ framework, sessionData }) {
  const [telemetry, setTelemetry] = useState([]);
  const [filter, setFilter] = useState('all');
  const [logLevel, setLogLevel] = useState('info');

  useEffect(() => {
    if (framework) {
      updateTelemetry();
    }
  }, [framework, sessionData]);

  const updateTelemetry = () => {
    if (!framework) return;
    const telemetryData = framework.getTelemetry();
    setTelemetry(telemetryData);
  };

  const filteredTelemetry = telemetry.filter(event => {
    if (filter === 'all') return true;
    if (filter === 'paywall' && event.event.includes('paywall')) return true;
    if (filter === 'bypass' && event.event.includes('bypass')) return true;
    if (filter === 'error' && event.event.includes('error')) return true;
    return false;
  });

  const clearTelemetry = () => {
    if (framework && framework.telemetryCollector) {
      framework.telemetryCollector.clearData();
      updateTelemetry();
    }
  };

  const exportTelemetry = () => {
    const data = JSON.stringify(telemetry, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paybreak-telemetry-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="telemetry-viewer">
      <div className="panel-header">
        <h2>📈 Soft Paywall Telemetry</h2>
        <p>Real-time monitoring and logging of all framework activities</p>
      </div>

      <div className="telemetry-controls">
        <div className="control-group">
          <label>Filter Events:</label>
          <select value={filter} onChange={(e) => setFilter(e.target.value)}>
            <option value="all">All Events</option>
            <option value="paywall">Paywall Events</option>
            <option value="bypass">Bypass Events</option>
            <option value="error">Error Events</option>
          </select>
        </div>

        <div className="control-group">
          <label>Log Level:</label>
          <select value={logLevel} onChange={(e) => setLogLevel(e.target.value)}>
            <option value="debug">Debug</option>
            <option value="info">Info</option>
            <option value="warn">Warning</option>
            <option value="error">Error</option>
          </select>
        </div>

        <div className="action-buttons">
          <button onClick={updateTelemetry} className="btn-secondary">
            🔄 Refresh
          </button>
          <button onClick={clearTelemetry} className="btn-secondary">
            🗑️ Clear
          </button>
          <button onClick={exportTelemetry} className="btn-primary">
            📤 Export
          </button>
        </div>
      </div>

      <div className="telemetry-stats">
        <div className="stat-card">
          <h3>📊 Telemetry Overview</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{telemetry.length}</span>
              <span className="stat-label">Total Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {telemetry.filter(e => e.event.includes('paywall')).length}
              </span>
              <span className="stat-label">Paywall Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {telemetry.filter(e => e.event.includes('bypass')).length}
              </span>
              <span className="stat-label">Bypass Events</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {telemetry.filter(e => e.event.includes('error')).length}
              </span>
              <span className="stat-label">Error Events</span>
            </div>
          </div>
        </div>
      </div>

      <div className="telemetry-log">
        <h3>📋 Event Log</h3>
        <div className="log-container">
          {filteredTelemetry.length > 0 ? (
            filteredTelemetry.slice(-50).reverse().map((event, index) => (
              <div key={index} className={`log-entry ${event.event.includes('error') ? 'error' : 'info'}`}>
                <div className="log-header">
                  <span className="log-timestamp">
                    {new Date(event.timestamp).toLocaleString()}
                  </span>
                  <span className="log-event">{event.event}</span>
                </div>
                {event.data && Object.keys(event.data).length > 0 && (
                  <div className="log-details">
                    <details>
                      <summary>View Details</summary>
                      <pre>{JSON.stringify(event.data, null, 2)}</pre>
                    </details>
                  </div>
                )}
              </div>
            ))
          ) : (
            <p className="no-data">No telemetry events found</p>
          )}
        </div>
      </div>

      <div className="telemetry-info">
        <h3>ℹ️ About Telemetry</h3>
        <div className="info-content">
          <p>
            <strong>Telemetry</strong> tracks all activities within the PayBreak framework, including:
          </p>
          <ul>
            <li><strong>Paywall Events:</strong> Application, configuration, and reset events</li>
            <li><strong>Bypass Events:</strong> Technique execution and results</li>
            <li><strong>Framework Events:</strong> Initialization, session management, and errors</li>
            <li><strong>User Interactions:</strong> Button clicks and navigation</li>
          </ul>
          <p>
            <em>All data is stored locally and can be exported for analysis.</em>
          </p>
        </div>
      </div>
    </div>
  );
} 