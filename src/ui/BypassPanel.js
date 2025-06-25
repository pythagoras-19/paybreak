/**
 * Create the bypass panel
 */
export function createBypassPanel(framework, container) {
  container.innerHTML = `
    <div class="card">
      <h2>🧪 Bypass Engine</h2>
      <p>Execute and monitor various bypass techniques against the active paywall.</p>
    </div>

    <div class="grid">
      <div class="card">
        <h3>🎯 Quick Actions</h3>
        <button class="btn success" id="execute-all-techniques">
          🚀 Execute All Techniques
        </button>
        <button class="btn" id="execute-dom-techniques">
          🎨 DOM Techniques
        </button>
        <button class="btn" id="execute-js-techniques">
          ⚡ JavaScript Techniques
        </button>
        <button class="btn" id="execute-storage-techniques">
          💾 Storage Techniques
        </button>
        <button class="btn" id="execute-network-techniques">
          🌐 Network Techniques
        </button>
      </div>

      <div class="card">
        <h3>📊 Bypass Statistics</h3>
        <div class="grid">
          <div class="metric">
            <div class="metric-value" id="total-attempts">0</div>
            <div class="metric-label">Total Attempts</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="successful-bypasses">0</div>
            <div class="metric-label">Successful</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="success-rate">0%</div>
            <div class="metric-label">Success Rate</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="avg-execution-time">0ms</div>
            <div class="metric-label">Avg Execution</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>🔧 Individual Techniques</h3>
      <div class="tabs">
        <button class="tab active" data-tab="dom-techniques">DOM</button>
        <button class="tab" data-tab="js-techniques">JavaScript</button>
        <button class="tab" data-tab="storage-techniques">Storage</button>
        <button class="tab" data-tab="network-techniques">Network</button>
        <button class="tab" data-tab="csp-techniques">CSP</button>
        <button class="tab" data-tab="advanced-techniques">Advanced</button>
      </div>

      <div class="tab-content active" id="dom-techniques">
        <div class="technique-grid">
          <div class="technique-card">
            <h4>DOM Element Removal</h4>
            <p>Remove paywall overlay and modal elements</p>
            <button class="btn" data-technique="domRemoval">Execute</button>
            <div class="technique-status" data-technique="domRemoval"></div>
          </div>
          <div class="technique-card">
            <h4>Content Unblur</h4>
            <p>Remove blur effects from content</p>
            <button class="btn" data-technique="unblurContent">Execute</button>
            <div class="technique-status" data-technique="unblurContent"></div>
          </div>
          <div class="technique-card">
            <h4>Style Override</h4>
            <p>Override paywall-related CSS styles</p>
            <button class="btn" data-technique="overrideStyles">Execute</button>
            <div class="technique-status" data-technique="overrideStyles"></div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="js-techniques">
        <div class="technique-grid">
          <div class="technique-card">
            <h4>Function Override</h4>
            <p>Override paywall-related JavaScript functions</p>
            <button class="btn" data-technique="functionOverride">Execute</button>
            <div class="technique-status" data-technique="functionOverride"></div>
          </div>
          <div class="technique-card">
            <h4>Property Hooks</h4>
            <p>Hook into object properties and getters</p>
            <button class="btn" data-technique="propertyHooks">Execute</button>
            <div class="technique-status" data-technique="propertyHooks"></div>
          </div>
          <div class="technique-card">
            <h4>Prototype Pollution</h4>
            <p>Attempt prototype pollution attacks</p>
            <button class="btn" data-technique="prototypePollution">Execute</button>
            <div class="technique-status" data-technique="prototypePollution"></div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="storage-techniques">
        <div class="technique-grid">
          <div class="technique-card">
            <h4>Cookie Manipulation</h4>
            <p>Manipulate paywall-related cookies</p>
            <button class="btn" data-technique="cookieManipulation">Execute</button>
            <div class="technique-status" data-technique="cookieManipulation"></div>
          </div>
          <div class="technique-card">
            <h4>LocalStorage Reset</h4>
            <p>Reset localStorage counters and flags</p>
            <button class="btn" data-technique="localStorageReset">Execute</button>
            <div class="technique-status" data-technique="localStorageReset"></div>
          </div>
          <div class="technique-card">
            <h4>SessionStorage Clear</h4>
            <p>Clear sessionStorage data</p>
            <button class="btn" data-technique="sessionStorageClear">Execute</button>
            <div class="technique-status" data-technique="sessionStorageClear"></div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="network-techniques">
        <div class="technique-grid">
          <div class="technique-card">
            <h4>Fetch Interception</h4>
            <p>Intercept and modify fetch requests</p>
            <button class="btn" data-technique="fetchInterception">Execute</button>
            <div class="technique-status" data-technique="fetchInterception"></div>
          </div>
          <div class="technique-card">
            <h4>XHR Override</h4>
            <p>Override XMLHttpRequest behavior</p>
            <button class="btn" data-technique="xhrOverride">Execute</button>
            <div class="technique-status" data-technique="xhrOverride"></div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="csp-techniques">
        <div class="technique-grid">
          <div class="technique-card">
            <h4>JSONP Bypass</h4>
            <p>Attempt JSONP-based CSP bypass</p>
            <button class="btn" data-technique="jsonpBypass">Execute</button>
            <div class="technique-status" data-technique="jsonpBypass"></div>
          </div>
          <div class="technique-card">
            <h4>PostMessage Bypass</h4>
            <p>Use postMessage for CSP bypass</p>
            <button class="btn" data-technique="postMessageBypass">Execute</button>
            <div class="technique-status" data-technique="postMessageBypass"></div>
          </div>
        </div>
      </div>

      <div class="tab-content" id="advanced-techniques">
        <div class="technique-grid">
          <div class="technique-card">
            <h4>Iframe Injection</h4>
            <p>Inject iframe to bypass restrictions</p>
            <button class="btn" data-technique="iframeInjection">Execute</button>
            <div class="technique-status" data-technique="iframeInjection"></div>
          </div>
          <div class="technique-card">
            <h4>Web Worker Bypass</h4>
            <p>Use Web Workers to bypass restrictions</p>
            <button class="btn" data-technique="workerBypass">Execute</button>
            <div class="technique-status" data-technique="workerBypass"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>📋 Execution History</h3>
      <div id="execution-history" style="max-height: 300px; overflow-y: auto;">
        <p class="log-entry">No executions yet</p>
      </div>
    </div>

    <div class="card">
      <h3>🏆 Most Effective Techniques</h3>
      <div id="effective-techniques">
        <p>No data available yet</p>
      </div>
    </div>
  `;

  // Add technique-specific styles
  addTechniqueStyles();

  // Setup event listeners
  setupBypassEvents(framework, container);

  // Initialize tabs
  setupTechniqueTabs();

  // Start updates
  updateBypassStats(framework);
  setInterval(() => updateBypassStats(framework), 2000);
}

/**
 * Add technique-specific styles
 */
function addTechniqueStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .technique-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1rem;
    }

    .technique-card {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 1rem;
      transition: all 0.3s ease;
    }

    .technique-card:hover {
      border-color: #667eea;
      box-shadow: 0 2px 8px rgba(102, 126, 234, 0.1);
    }

    .technique-card h4 {
      margin: 0 0 0.5rem 0;
      color: #2c3e50;
      font-size: 1rem;
      font-weight: 600;
    }

    .technique-card p {
      margin: 0 0 1rem 0;
      color: #6c757d;
      font-size: 0.85rem;
      line-height: 1.4;
    }

    .technique-status {
      margin-top: 0.5rem;
      font-size: 0.8rem;
      font-weight: 500;
    }

    .technique-status.success {
      color: #28a745;
    }

    .technique-status.failure {
      color: #dc3545;
    }

    .technique-status.pending {
      color: #ffc107;
    }

    .execution-item {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      font-size: 0.85rem;
    }

    .execution-item.success {
      border-left: 4px solid #28a745;
      background: #d4edda;
    }

    .execution-item.failure {
      border-left: 4px solid #dc3545;
      background: #f8d7da;
    }

    .execution-item.pending {
      border-left: 4px solid #ffc107;
      background: #fff3cd;
    }

    .execution-time {
      color: #6c757d;
      font-size: 0.8rem;
    }

    .technique-name {
      font-weight: 600;
      color: #2c3e50;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Setup bypass panel event listeners
 */
function setupBypassEvents(framework, container) {
  // Execute all techniques
  container.querySelector('#execute-all-techniques').addEventListener('click', async () => {
    const button = container.querySelector('#execute-all-techniques');
    const originalText = button.textContent;
    
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Executing...';
    
    try {
      const results = await framework.executeAllBypassTechniques();
      addExecutionLog('All techniques executed', 'info', results);
      updateEffectiveTechniques(framework);
    } catch (error) {
      addExecutionLog(`Failed to execute all techniques: ${error.message}`, 'error');
      console.error('Execution error:', error);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  // Execute by category
  const categoryButtons = [
    { id: 'execute-dom-techniques', category: 'dom' },
    { id: 'execute-js-techniques', category: 'javascript' },
    { id: 'execute-storage-techniques', category: 'storage' },
    { id: 'execute-network-techniques', category: 'network' }
  ];

  categoryButtons.forEach(({ id, category }) => {
    container.querySelector(`#${id}`).addEventListener('click', async () => {
      const button = container.querySelector(`#${id}`);
      const originalText = button.textContent;
      
      button.disabled = true;
      button.innerHTML = '<span class="spinner"></span> Executing...';
      
      try {
        const results = await framework.executeBypassTechniquesByCategory(category);
        addExecutionLog(`${category} techniques executed`, 'info', results);
        updateEffectiveTechniques(framework);
      } catch (error) {
        addExecutionLog(`Failed to execute ${category} techniques: ${error.message}`, 'error');
        console.error('Execution error:', error);
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  });

  // Individual technique buttons
  const techniqueButtons = container.querySelectorAll('[data-technique]');
  techniqueButtons.forEach(button => {
    button.addEventListener('click', async () => {
      const technique = button.getAttribute('data-technique');
      const originalText = button.textContent;
      
      button.disabled = true;
      button.innerHTML = '<span class="spinner"></span>';
      
      try {
        const result = await framework.executeBypassTechnique(technique);
        updateTechniqueStatus(technique, result.success, result.executionTime);
        addExecutionLog(`${technique} executed`, result.success ? 'success' : 'failure', result);
        updateEffectiveTechniques(framework);
      } catch (error) {
        updateTechniqueStatus(technique, false, 0);
        addExecutionLog(`${technique} failed: ${error.message}`, 'error');
        console.error('Technique execution error:', error);
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    });
  });
}

/**
 * Setup technique tabs
 */
function setupTechniqueTabs() {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const targetTab = tab.getAttribute('data-tab');
      
      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      
      // Update active content
      tabContents.forEach(content => content.classList.remove('active'));
      document.getElementById(targetTab).classList.add('active');
    });
  });
}

/**
 * Update bypass statistics
 */
function updateBypassStats(framework) {
  const bypassReport = framework.getBypassReport();
  const history = framework.bypassEngine.getExecutionHistory();
  
  // Calculate average execution time
  const avgTime = history.length > 0 
    ? history.reduce((sum, exec) => sum + exec.executionTime, 0) / history.length 
    : 0;

  document.getElementById('total-attempts').textContent = bypassReport.totalAttempts;
  document.getElementById('successful-bypasses').textContent = bypassReport.successfulAttempts;
  document.getElementById('success-rate').textContent = `${bypassReport.successRate.toFixed(1)}%`;
  document.getElementById('avg-execution-time').textContent = `${avgTime.toFixed(0)}ms`;
}

/**
 * Update technique status
 */
function updateTechniqueStatus(technique, success, executionTime) {
  const statusElement = document.querySelector(`[data-technique="${technique}"] + .technique-status`);
  if (statusElement) {
    statusElement.className = `technique-status ${success ? 'success' : 'failure'}`;
    statusElement.textContent = success ? '✅ Success' : '❌ Failed';
    if (executionTime > 0) {
      statusElement.textContent += ` (${executionTime}ms)`;
    }
  }
}

/**
 * Add execution log entry
 */
function addExecutionLog(message, type = 'info', data = null) {
  const historyContainer = document.getElementById('execution-history');
  
  // Remove "No executions yet" message if present
  const noExecutions = historyContainer.querySelector('.log-entry');
  if (noExecutions && noExecutions.textContent === 'No executions yet') {
    noExecutions.remove();
  }
  
  const logEntry = document.createElement('div');
  logEntry.className = `execution-item ${type}`;
  
  const timestamp = new Date().toLocaleTimeString();
  let content = `[${timestamp}] ${message}`;
  
  if (data) {
    if (Array.isArray(data)) {
      const successCount = data.filter(r => r.success).length;
      const totalCount = data.length;
      content += ` - ${successCount}/${totalCount} successful`;
    } else if (data.executionTime) {
      content += ` (${data.executionTime}ms)`;
    }
  }
  
  logEntry.innerHTML = `
    <div class="technique-name">${content}</div>
    ${data && data.executionTime ? `<div class="execution-time">Execution time: ${data.executionTime}ms</div>` : ''}
  `;
  
  historyContainer.insertBefore(logEntry, historyContainer.firstChild);
  
  // Keep only last 20 entries
  const entries = historyContainer.querySelectorAll('.execution-item');
  if (entries.length > 20) {
    entries[entries.length - 1].remove();
  }
}

/**
 * Update effective techniques display
 */
function updateEffectiveTechniques(framework) {
  const effectiveTechniques = framework.getMostEffectiveTechniques();
  const container = document.getElementById('effective-techniques');
  
  if (effectiveTechniques.length === 0) {
    container.innerHTML = '<p>No data available yet</p>';
    return;
  }
  
  const html = effectiveTechniques.map(technique => `
    <div class="technique-card">
      <h4>${technique.technique}</h4>
      <p>Success count: ${technique.successCount}</p>
    </div>
  `).join('');
  
  container.innerHTML = html;
} 