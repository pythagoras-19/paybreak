import React, { useState } from 'react';

/**
 * Paywall Controls Component - Soft Paywall Only
 */
export function PaywallControls({ onApplyPaywall, onResetPaywall, isActive }) {
  const [config, setConfig] = useState({
    blurIntensity: 5,
    overlayOpacity: 0.8,
    modalEnabled: true,
    dismissible: false
  });

  const handleApply = () => {
    onApplyPaywall('soft', config);
  };

  const handleReset = () => {
    onResetPaywall();
  };

  const updateConfig = (key, value) => {
    setConfig(prev => ({ ...prev, [key]: value }));
  };

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
          onClick={() => {
            console.log('Test button clicked');
            console.log('Content simulation area:', document.getElementById('content-simulation'));
            console.log('Framework available:', !!onApplyPaywall);
          }}
          className="btn-accent"
        >
          🐛 Debug Test
        </button>
      </div>

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