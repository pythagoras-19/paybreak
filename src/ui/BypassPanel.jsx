import React, { useState, useEffect } from 'react';

/**
 * Bypass Panel Component - Soft Paywall Bypass Tools
 */
export function BypassPanel({ framework, sessionData, onRunBypassTechnique, onRunTestSuite }) {
  const [bypassResults, setBypassResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedTechnique, setSelectedTechnique] = useState(null);

  const techniques = [
    {
      name: 'DOM Manipulation',
      description: 'Remove paywall overlay and modal elements from the DOM',
      category: 'dom',
      icon: '🔧'
    },
    {
      name: 'CSS Override',
      description: 'Override paywall-related CSS styles to hide overlays',
      category: 'css',
      icon: '🎨'
    },
    {
      name: 'JavaScript Hooks',
      description: 'Intercept and modify paywall-related JavaScript functions',
      category: 'javascript',
      icon: '⚡'
    },
    {
      name: 'Storage Manipulation',
      description: 'Clear paywall-related cookies, localStorage, and sessionStorage',
      category: 'storage',
      icon: '🗄️'
    },
    {
      name: 'Network Interception',
      description: 'Block paywall-related network requests',
      category: 'network',
      icon: '🌐'
    },
    {
      name: 'CSP Bypass',
      description: 'Attempt to bypass Content Security Policy restrictions',
      category: 'csp',
      icon: '🛡️'
    },
    {
      name: 'Advanced Methods',
      description: 'Complex bypass techniques including mutation observers',
      category: 'advanced',
      icon: '🚀'
    }
  ];

  useEffect(() => {
    if (framework) {
      updateBypassResults();
    }
  }, [framework, sessionData]);

  const updateBypassResults = () => {
    if (framework) {
      setBypassResults(framework.getBypassResults());
    }
  };

  const handleRunTechnique = async (technique) => {
    if (!framework || isRunning) return;

    setIsRunning(true);
    setSelectedTechnique(technique);

    try {
      await onRunBypassTechnique(technique);
      updateBypassResults();
    } catch (error) {
      console.error('Error running technique:', error);
    } finally {
      setIsRunning(false);
      setSelectedTechnique(null);
    }
  };

  const handleRunTestSuite = async () => {
    if (!framework || isRunning) return;

    setIsRunning(true);

    try {
      await onRunTestSuite();
      updateBypassResults();
    } catch (error) {
      console.error('Error running test suite:', error);
    } finally {
      setIsRunning(false);
    }
  };

  const getTechniqueResult = (techniqueName) => {
    return bypassResults.find(result => result.technique === techniqueName);
  };

  const getSuccessRate = () => {
    if (bypassResults.length === 0) return 0;
    const successful = bypassResults.filter(r => r.success).length;
    return (successful / bypassResults.length) * 100;
  };

  const getTechniquesByCategory = () => {
    const categories = {};
    techniques.forEach(technique => {
      if (!categories[technique.category]) {
        categories[technique.category] = [];
      }
      categories[technique.category].push(technique);
    });
    return categories;
  };

  return (
    <div className="bypass-panel">
      <div className="panel-header">
        <h2>🛠️ Soft Paywall Bypass Tools</h2>
        <p>Test various techniques to bypass soft paywall implementations</p>
      </div>

      {/* Overview Stats */}
      <div className="overview-stats">
        <div className="stat-card">
          <h3>📊 Bypass Statistics</h3>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-value">{bypassResults.length}</span>
              <span className="stat-label">Total Attempts</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {bypassResults.filter(r => r.success).length}
              </span>
              <span className="stat-label">Successful</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">{getSuccessRate().toFixed(1)}%</span>
              <span className="stat-label">Success Rate</span>
            </div>
            <div className="stat-item">
              <span className="stat-value">
                {bypassResults.length > 0 ? 
                  (bypassResults.reduce((sum, r) => sum + r.duration, 0) / bypassResults.length).toFixed(0) : 0
                }ms
              </span>
              <span className="stat-label">Avg Duration</span>
            </div>
          </div>
        </div>

        <div className="action-card">
          <h3>⚡ Quick Actions</h3>
          <button 
            onClick={handleRunTestSuite}
            disabled={isRunning}
            className="btn-primary"
          >
            {isRunning ? '🔄 Running...' : '🚀 Run Full Test Suite'}
          </button>
          <p className="action-description">
            Automatically runs all bypass techniques against the current soft paywall
          </p>
        </div>
      </div>

      {/* Technique Categories */}
      <div className="techniques-section">
        <h3>🎯 Bypass Techniques</h3>
        <p>Click on any technique to test it individually against the soft paywall</p>

        {Object.entries(getTechniquesByCategory()).map(([category, categoryTechniques]) => (
          <div key={category} className="technique-category">
            <h4>{getCategoryTitle(category)}</h4>
            <div className="techniques-grid">
              {categoryTechniques.map((technique) => {
                const result = getTechniqueResult(technique.name);
                const isSelected = selectedTechnique === technique.name;
                
                return (
                  <div 
                    key={technique.name} 
                    className={`technique-card ${result ? (result.success ? 'success' : 'failed') : ''} ${isSelected ? 'selected' : ''}`}
                  >
                    <div className="technique-header">
                      <span className="technique-icon">{technique.icon}</span>
                      <h5>{technique.name}</h5>
                      {result && (
                        <span className={`result-indicator ${result.success ? 'success' : 'failed'}`}>
                          {result.success ? '✅' : '❌'}
                        </span>
                      )}
                    </div>
                    
                    <p className="technique-description">{technique.description}</p>
                    
                    {result && (
                      <div className="technique-result">
                        <span className="result-duration">{result.duration}ms</span>
                        <span className="result-time">
                          {new Date(result.timestamp).toLocaleTimeString()}
                        </span>
                      </div>
                    )}
                    
                    <button 
                      onClick={() => handleRunTechnique(technique.name)}
                      disabled={isRunning}
                      className="btn-technique"
                    >
                      {isSelected && isRunning ? '🔄 Running...' : '▶️ Run'}
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {/* Results History */}
      <div className="results-section">
        <h3>📋 Recent Results</h3>
        <div className="results-list">
          {bypassResults.slice(-10).reverse().map((result, index) => (
            <div key={index} className={`result-item ${result.success ? 'success' : 'failed'}`}>
              <div className="result-header">
                <span className="result-technique">{result.technique}</span>
                <span className={`result-status ${result.success ? 'success' : 'failed'}`}>
                  {result.success ? '✅ Success' : '❌ Failed'}
                </span>
              </div>
              <div className="result-details">
                <span className="result-duration">Duration: {result.duration}ms</span>
                <span className="result-time">
                  {new Date(result.timestamp).toLocaleString()}
                </span>
              </div>
              {result.details && Object.keys(result.details).length > 0 && (
                <div className="result-details-expanded">
                  <details>
                    <summary>View Details</summary>
                    <pre>{JSON.stringify(result.details, null, 2)}</pre>
                  </details>
                </div>
              )}
            </div>
          ))}
          {bypassResults.length === 0 && (
            <p className="no-results">No bypass attempts yet. Try running a technique or the full test suite.</p>
          )}
        </div>
      </div>

      {/* Soft Paywall Info */}
      <div className="info-section">
        <h3>ℹ️ About Soft Paywall Bypasses</h3>
        <div className="info-content">
          <p>
            <strong>Soft paywalls</strong> are easier to bypass than hard paywalls because the content remains in the DOM. 
            Common bypass techniques include:
          </p>
          <ul>
            <li><strong>DOM Manipulation:</strong> Removing overlay elements directly</li>
            <li><strong>CSS Override:</strong> Hiding paywall elements with CSS</li>
            <li><strong>JavaScript Hooks:</strong> Intercepting paywall functions</li>
            <li><strong>Storage Manipulation:</strong> Clearing paywall-related data</li>
          </ul>
          <p>
            <em>Note: These techniques are for educational and research purposes only.</em>
          </p>
        </div>
      </div>
    </div>
  );
}

/**
 * Get category title
 */
function getCategoryTitle(category) {
  const titles = {
    dom: '🌐 DOM Manipulation',
    css: '🎨 CSS Override',
    javascript: '⚡ JavaScript Hooks',
    storage: '🗄️ Storage Manipulation',
    network: '🌐 Network Interception',
    csp: '🛡️ CSP Bypass',
    advanced: '🚀 Advanced Methods'
  };
  return titles[category] || category;
} 