import React, { useState } from 'react';

/**
 * Paywall Controls Component - Soft Paywall Only
 */
export function PaywallControls({ onApplyPaywall, onResetPaywall, isActive, framework, onRunBypassTechnique }) {
  const [config, setConfig] = useState({
    blurIntensity: 5,
    overlayOpacity: 0.8,
    modalEnabled: true,
    dismissible: false
  });
  const [showTerminal, setShowTerminal] = useState(false);
  const [terminalLogs, setTerminalLogs] = useState([]);
  const [isRunningBypass, setIsRunningBypass] = useState(false);

  const bypassTechniques = [
    {
      name: 'DOM Manipulation',
      description: 'Remove paywall overlay and modal elements from the DOM',
      icon: '🔧',
      command: 'dom-manipulation'
    },
    {
      name: 'CSS Override',
      description: 'Override paywall-related CSS styles to hide overlays',
      icon: '🎨',
      command: 'css-override'
    },
    {
      name: 'JavaScript Hooks',
      description: 'Intercept and modify paywall-related JavaScript functions',
      icon: '⚡',
      command: 'js-hooks'
    },
    {
      name: 'Storage Manipulation',
      description: 'Clear paywall-related cookies, localStorage, and sessionStorage',
      icon: '🗄️',
      command: 'storage-clear'
    },
    {
      name: 'Network Interception',
      description: 'Block paywall-related network requests',
      icon: '🌐',
      command: 'network-block'
    },
    {
      name: 'CSP Bypass',
      description: 'Attempt to bypass Content Security Policy restrictions',
      icon: '🛡️',
      command: 'csp-bypass'
    },
    {
      name: 'Advanced Methods',
      description: 'Complex bypass techniques including mutation observers',
      icon: '🚀',
      command: 'advanced-fuzz'
    }
  ];

  const addTerminalLog = (message, type = 'info') => {
    const timestamp = new Date().toLocaleTimeString();
    const log = {
      id: Date.now(),
      timestamp,
      message,
      type
    };
    setTerminalLogs(prev => [...prev, log]);
  };

  const clearTerminal = () => {
    setTerminalLogs([]);
  };

  const handleApply = () => {
    onApplyPaywall('soft', config);
  };

  const handleReset = () => {
    onResetPaywall();
  };

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

  const handleRunBypassTechnique = async (technique) => {
    if (!framework || isRunningBypass) return;

    setIsRunningBypass(true);
    setShowTerminal(true);
    clearTerminal();

    addTerminalLog(`🚀 Starting bypass technique: ${technique.name}`, 'command');
    addTerminalLog(`📋 Technique: ${technique.description}`, 'info');
    addTerminalLog(`⏰ Timestamp: ${new Date().toLocaleString()}`, 'info');
    addTerminalLog('─'.repeat(50), 'separator');

    try {
      // Simulate detailed execution steps
      addTerminalLog('🔍 Scanning for paywall elements...', 'info');
      await delay(500);
      
      addTerminalLog('📊 Analyzing DOM structure...', 'info');
      await delay(300);
      
      addTerminalLog(`⚡ Executing: ${technique.command}`, 'command');
      await delay(400);
      
      // Run the actual bypass technique
      const result = await onRunBypassTechnique(technique.name);
      
      if (result && result.success) {
        addTerminalLog('✅ Bypass successful!', 'success');
        addTerminalLog(`⏱️ Duration: ${result.duration}ms`, 'success');
        addTerminalLog('🎯 Paywall elements removed/disabled', 'success');
      } else {
        addTerminalLog('❌ Bypass failed', 'error');
        addTerminalLog('🔍 Paywall elements still present', 'error');
        if (result && result.details) {
          addTerminalLog(`📝 Details: ${JSON.stringify(result.details)}`, 'error');
        }
      }
      
    } catch (error) {
      addTerminalLog(`💥 Error: ${error.message}`, 'error');
    }

    addTerminalLog('─'.repeat(50), 'separator');
    addTerminalLog('🏁 Bypass technique completed', 'info');
    setIsRunningBypass(false);
  };

  const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

  return (
    <div className="paywall-controls">
      <h3>🔒 Soft Paywall Controls</h3>
      
      <div className="paywall-status">
        <div className={`status-indicator ${isActive ? 'active' : 'inactive'}`}>
          <span className="status-dot"></span>
          <span className="status-text">
            {isActive ? 'Paywall Active' : 'Paywall Inactive'}
          </span>
        </div>
      </div>
      
      <div className="control-group">
        <label>
          Blur Intensity: {config.blurIntensity}px
          <input
            type="range"
            min="0"
            max="20"
            value={config.blurIntensity}
            onChange={(e) => updateConfig('blurIntensity', parseInt(e.target.value))}
          />
        </label>
      </div>

      <div className="control-group">
        <label>
          Overlay Opacity: {config.overlayOpacity}
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={config.overlayOpacity}
            onChange={(e) => updateConfig('overlayOpacity', parseFloat(e.target.value))}
          />
        </label>
      </div>

      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={config.modalEnabled}
            onChange={(e) => updateConfig('modalEnabled', e.target.checked)}
          />
          Show Modal
        </label>
      </div>

      <div className="control-group">
        <label>
          <input
            type="checkbox"
            checked={config.dismissible}
            onChange={(e) => updateConfig('dismissible', e.target.checked)}
          />
          Dismissible
        </label>
      </div>

      <div className="button-group">
        <button 
          onClick={handleApply}
          disabled={isActive}
          className="btn-primary"
        >
          Apply Soft Paywall
        </button>
        
        <button 
          onClick={handleReset}
          disabled={!isActive}
          className="btn-secondary"
        >
          Reset Paywall
        </button>
        
        <button 
          onClick={() => setShowTerminal(!showTerminal)}
          className="btn-accent"
          disabled={!isActive}
        >
          🛠️ Bypass Terminal
        </button>
      </div>

      {/* Terminal Popup */}
      {showTerminal && (
        <div className="terminal-overlay">
          <div className="terminal-popup">
            <div className="terminal-header">
              <h4>🖥️ Paywall Bypass Terminal</h4>
              <div className="terminal-controls">
                <button onClick={clearTerminal} className="btn-text">🗑️ Clear</button>
                <button onClick={() => setShowTerminal(false)} className="btn-text">✕</button>
              </div>
            </div>
            
            <div className="terminal-body">
              <div className="terminal-output">
                {terminalLogs.length === 0 ? (
                  <div className="terminal-welcome">
                    <p>🚀 Welcome to the Paywall Bypass Terminal!</p>
                    <p>Select a bypass technique below to see real-time execution details.</p>
                    <p>Each technique will show exactly what it's doing step by step.</p>
                  </div>
                ) : (
                  terminalLogs.map(log => (
                    <div key={log.id} className={`terminal-line ${log.type}`}>
                      <span className="terminal-timestamp">[{log.timestamp}]</span>
                      <span className="terminal-message">{log.message}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
            
            <div className="terminal-actions">
              <h5>🎯 Available Bypass Techniques:</h5>
              <div className="technique-buttons">
                {bypassTechniques.map(technique => (
                  <button
                    key={technique.name}
                    onClick={() => handleRunBypassTechnique(technique)}
                    disabled={isRunningBypass || !isActive}
                    className="btn-technique-small"
                  >
                    {technique.icon} {technique.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="info-box">
        <h4>Soft Paywall Features:</h4>
        <ul>
          <li>🔍 Blur effect on content</li>
          <li>🖼️ Overlay with configurable opacity</li>
          <li>📱 Optional modal dialog</li>
          <li>🎯 Targets content simulation area</li>
          <li>⚡ Easy to bypass for testing</li>
        </ul>
      </div>
    </div>
  );
} 