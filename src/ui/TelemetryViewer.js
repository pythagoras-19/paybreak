/**
 * Create the telemetry viewer panel
 */
export function createTelemetryViewer(framework, container) {
  container.innerHTML = `
    <div class="card">
      <h2>📈 Telemetry Viewer</h2>
      <p>Monitor and analyze real-time telemetry data from bypass attempts and framework activity.</p>
    </div>

    <div class="grid">
      <div class="card">
        <h3>📊 Telemetry Overview</h3>
        <div class="grid">
          <div class="metric">
            <div class="metric-value" id="total-telemetry">0</div>
            <div class="metric-label">Total Records</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="network-requests">0</div>
            <div class="metric-label">Network Requests</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="console-logs">0</div>
            <div class="metric-label">Console Logs</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="dom-changes">0</div>
            <div class="metric-label">DOM Changes</div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>🎛️ Controls</h3>
        <button class="btn" id="export-telemetry">📤 Export Telemetry</button>
        <button class="btn secondary" id="clear-telemetry">🗑️ Clear Data</button>
        <button class="btn" id="refresh-telemetry">🔄 Refresh</button>
        <button class="btn" id="generate-report">📊 Generate Report</button>
        <div class="checkbox-group">
          <input type="checkbox" id="auto-refresh" checked>
          <label for="auto-refresh">Auto-refresh (5s)</label>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>⚙️ Logging Configuration</h3>
      <div class="grid">
        <div class="form-group">
          <label for="log-level">Log Level:</label>
          <select id="log-level" class="form-control">
            <option value="debug">Debug (All events)</option>
            <option value="info">Info (Important events)</option>
            <option value="warn">Warning (Warnings & errors)</option>
            <option value="error">Error (Errors only)</option>
          </select>
        </div>
        <div class="form-group">
          <label for="max-entries">Max Log Entries:</label>
          <input type="number" id="max-entries" class="form-control" value="10000" min="1000" max="50000">
        </div>
      </div>
      
      <div class="grid">
        <div class="form-group">
          <h4>📡 Tracking Features</h4>
          <div class="checkbox-group">
            <input type="checkbox" id="track-network" checked>
            <label for="track-network">Network Requests</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="track-console" checked>
            <label for="track-console">Console Logs</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="track-dom" checked>
            <label for="track-dom">DOM Mutations</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="track-performance" checked>
            <label for="track-performance">Performance Metrics</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="track-interactions" checked>
            <label for="track-interactions">User Interactions</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="track-errors" checked>
            <label for="track-errors">Error Tracking</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="track-memory" checked>
            <label for="track-memory">Memory Usage</label>
          </div>
          <div class="checkbox-group">
            <input type="checkbox" id="track-storage" checked>
            <label for="track-storage">Storage Changes</label>
          </div>
        </div>
        
        <div class="form-group">
          <h4>📊 Analytics</h4>
          <div class="analytics-grid">
            <div class="analytics-item">
              <span class="analytics-label">Error Rate:</span>
              <span class="analytics-value" id="error-rate">0%</span>
            </div>
            <div class="analytics-item">
              <span class="analytics-label">Avg Response Time:</span>
              <span class="analytics-value" id="avg-response-time">0ms</span>
            </div>
            <div class="analytics-item">
              <span class="analytics-label">Memory Usage:</span>
              <span class="analytics-value" id="memory-usage">0MB</span>
            </div>
            <div class="analytics-item">
              <span class="analytics-label">User Interactions:</span>
              <span class="analytics-value" id="user-interactions">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>📋 Live Telemetry Stream</h3>
      <div class="tabs">
        <button class="tab active" data-tab="all-events">All Events</button>
        <button class="tab" data-tab="bypass-attempts">Bypass Attempts</button>
        <button class="tab" data-tab="network-activity">Network Activity</button>
        <button class="tab" data-tab="console-logs">Console Logs</button>
        <button class="tab" data-tab="dom-mutations">DOM Mutations</button>
        <button class="tab" data-tab="performance">Performance</button>
        <button class="tab" data-tab="user-interactions">User Interactions</button>
        <button class="tab" data-tab="errors">Errors</button>
      </div>

      <div class="tab-content active" id="all-events">
        <div id="telemetry-stream" class="telemetry-stream">
          <p class="log-entry">No telemetry data yet</p>
        </div>
      </div>

      <div class="tab-content" id="bypass-attempts">
        <div id="bypass-stream" class="telemetry-stream">
          <p class="log-entry">No bypass attempts yet</p>
        </div>
      </div>

      <div class="tab-content" id="network-activity">
        <div id="network-stream" class="telemetry-stream">
          <p class="log-entry">No network activity yet</p>
        </div>
      </div>

      <div class="tab-content" id="console-logs">
        <div id="console-stream" class="telemetry-stream">
          <p class="log-entry">No console logs yet</p>
        </div>
      </div>

      <div class="tab-content" id="dom-mutations">
        <div id="dom-stream" class="telemetry-stream">
          <p class="log-entry">No DOM mutations yet</p>
        </div>
      </div>

      <div class="tab-content" id="performance">
        <div id="performance-stream" class="telemetry-stream">
          <p class="log-entry">No performance data yet</p>
        </div>
      </div>

      <div class="tab-content" id="user-interactions">
        <div id="interactions-stream" class="telemetry-stream">
          <p class="log-entry">No user interactions yet</p>
        </div>
      </div>

      <div class="tab-content" id="errors">
        <div id="errors-stream" class="telemetry-stream">
          <p class="log-entry">No errors yet</p>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h3>📈 Event Distribution</h3>
        <div id="event-chart" style="height: 200px; background: #f8f9fa; border-radius: 8px; display: flex; align-items: center; justify-content: center;">
          <p>Chart will appear here</p>
        </div>
      </div>

      <div class="card">
        <h3>🔍 Filter & Search</h3>
        <div class="form-group">
          <label for="event-filter">Event Type:</label>
          <select id="event-filter" class="form-control">
            <option value="">All Events</option>
            <option value="bypass_attempt">Bypass Attempts</option>
            <option value="network_request">Network Requests</option>
            <option value="console_log">Console Logs</option>
            <option value="dom_mutation">DOM Mutations</option>
            <option value="performance_metric">Performance</option>
            <option value="user_interaction">User Interactions</option>
            <option value="error">Errors</option>
          </select>
        </div>
        <div class="form-group">
          <label for="search-telemetry">Search:</label>
          <input type="text" id="search-telemetry" class="form-control" placeholder="Search telemetry data...">
        </div>
        <div class="form-group">
          <label for="time-range">Time Range:</label>
          <select id="time-range" class="form-control">
            <option value="all">All Time</option>
            <option value="1h">Last Hour</option>
            <option value="6h">Last 6 Hours</option>
            <option value="24h">Last 24 Hours</option>
          </select>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>📊 Detailed Statistics</h3>
      <div id="telemetry-stats">
        <p>Statistics will appear here</p>
      </div>
    </div>

    <div class="card" id="recommendations-card" style="display: none;">
      <h3>💡 Recommendations</h3>
      <div id="recommendations-list">
        <!-- Recommendations will be populated here -->
      </div>
    </div>
  `;

  // Add telemetry-specific styles
  addTelemetryStyles();

  // Setup event listeners
  setupTelemetryEvents(framework, container);

  // Initialize tabs
  setupTelemetryTabs();

  // Start updates
  updateTelemetryData(framework);
  setInterval(() => updateTelemetryData(framework), 5000);
}

/**
 * Add telemetry-specific styles
 */
function addTelemetryStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .telemetry-stream {
      max-height: 400px;
      overflow-y: auto;
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      padding: 1rem;
    }

    .telemetry-entry {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 4px;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.85rem;
      line-height: 1.4;
    }

    .telemetry-entry.bypass_attempt {
      border-left: 4px solid #667eea;
    }

    .telemetry-entry.network_request {
      border-left: 4px solid #28a745;
    }

    .telemetry-entry.console_log {
      border-left: 4px solid #ffc107;
    }

    .telemetry-entry.dom_mutation {
      border-left: 4px solid #dc3545;
    }

    .telemetry-entry.performance_metric {
      border-left: 4px solid #6f42c1;
    }

    .telemetry-entry.user_interaction {
      border-left: 4px solid #fd7e14;
    }

    .telemetry-entry.error {
      border-left: 4px solid #e83e8c;
      background: #fff5f5;
    }

    .telemetry-timestamp {
      color: #6c757d;
      font-size: 0.8rem;
      margin-bottom: 0.25rem;
    }

    .telemetry-event {
      font-weight: bold;
      color: #495057;
      margin-bottom: 0.25rem;
    }

    .telemetry-data {
      background: #f8f9fa;
      padding: 0.5rem;
      border-radius: 3px;
      font-size: 0.8rem;
      white-space: pre-wrap;
      word-break: break-word;
    }

    .analytics-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 1rem;
    }

    .analytics-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background: #f8f9fa;
      border-radius: 4px;
      border: 1px solid #e9ecef;
    }

    .analytics-label {
      font-weight: 500;
      color: #495057;
    }

    .analytics-value {
      font-weight: bold;
      color: #1e3a8a;
    }

    .recommendation {
      padding: 1rem;
      margin-bottom: 0.5rem;
      border-radius: 6px;
      border-left: 4px solid;
    }

    .recommendation.warning {
      background: #fff3cd;
      border-color: #ffc107;
      color: #856404;
    }

    .recommendation.error {
      background: #f8d7da;
      border-color: #dc3545;
      color: #721c24;
    }

    .recommendation.info {
      background: #d1ecf1;
      border-color: #17a2b8;
      color: #0c5460;
    }

    .recommendation.success {
      background: #d4edda;
      border-color: #28a745;
      color: #155724;
    }

    .recommendation-priority {
      font-size: 0.8rem;
      font-weight: bold;
      text-transform: uppercase;
      margin-bottom: 0.25rem;
    }

    .log-level-indicator {
      display: inline-block;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      margin-right: 0.5rem;
    }

    .log-level-debug { background: #6c757d; }
    .log-level-info { background: #17a2b8; }
    .log-level-warn { background: #ffc107; }
    .log-level-error { background: #dc3545; }

    .checkbox-group {
      display: flex;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .checkbox-group input[type="checkbox"] {
      margin-right: 0.5rem;
    }

    .checkbox-group label {
      font-size: 0.9rem;
      color: #495057;
    }

    .form-group h4 {
      margin-bottom: 0.75rem;
      color: #1e3a8a;
      font-size: 1rem;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Setup telemetry event listeners
 */
function setupTelemetryEvents(framework, container) {
  // Export telemetry
  container.querySelector('#export-telemetry').addEventListener('click', () => {
    const data = framework.telemetryCollector.exportData('json');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paybreak-telemetry-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Clear telemetry
  container.querySelector('#clear-telemetry').addEventListener('click', () => {
    if (confirm('Are you sure you want to clear all telemetry data?')) {
      framework.telemetryCollector.clearData();
      updateTelemetryData(framework);
    }
  });

  // Refresh telemetry
  container.querySelector('#refresh-telemetry').addEventListener('click', () => {
    updateTelemetryData(framework);
  });

  // Generate report
  container.querySelector('#generate-report').addEventListener('click', () => {
    const report = framework.telemetryCollector.generateEnhancedReport();
    const reportBlob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(reportBlob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paybreak-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    // Show recommendations
    showRecommendations(report.recommendations);
  });

  // Log level configuration
  container.querySelector('#log-level').addEventListener('change', (e) => {
    framework.telemetryCollector.setLogLevel(e.target.value);
  });

  // Max entries configuration
  container.querySelector('#max-entries').addEventListener('change', (e) => {
    framework.telemetryCollector.maxLogEntries = parseInt(e.target.value);
  });

  // Tracking feature toggles
  const trackingToggles = [
    'track-network', 'track-console', 'track-dom', 'track-performance',
    'track-interactions', 'track-errors', 'track-memory', 'track-storage'
  ];

  trackingToggles.forEach(toggleId => {
    container.querySelector(`#${toggleId}`).addEventListener('change', (e) => {
      const isEnabled = e.target.checked;
      const feature = toggleId.replace('track-', '');
      
      // This would need to be implemented in the framework to actually enable/disable tracking
      console.log(`${feature} tracking ${isEnabled ? 'enabled' : 'disabled'}`);
      
      // For now, just log the change
      framework.telemetryCollector.logTelemetry('tracking_config_changed', {
        feature,
        enabled: isEnabled,
        timestamp: Date.now()
      });
    });
  });

  // Auto-refresh toggle
  container.querySelector('#auto-refresh').addEventListener('change', (e) => {
    // This would control the auto-refresh interval
    console.log('Auto-refresh:', e.target.checked);
  });

  // Event filter
  container.querySelector('#event-filter').addEventListener('change', (e) => {
    filterTelemetryData(e.target.value);
  });

  // Search
  container.querySelector('#search-telemetry').addEventListener('input', (e) => {
    searchTelemetryData(e.target.value);
  });

  // Time range
  container.querySelector('#time-range').addEventListener('change', (e) => {
    filterByTimeRange(e.target.value);
  });
}

/**
 * Show recommendations
 */
function showRecommendations(recommendations) {
  const recommendationsCard = document.getElementById('recommendations-card');
  const recommendationsList = document.getElementById('recommendations-list');
  
  if (recommendations.length === 0) {
    recommendationsCard.style.display = 'none';
    return;
  }
  
  recommendationsList.innerHTML = recommendations.map(rec => `
    <div class="recommendation ${rec.type}">
      <div class="recommendation-priority">${rec.priority.toUpperCase()}</div>
      <div>${rec.message}</div>
    </div>
  `).join('');
  
  recommendationsCard.style.display = 'block';
}

/**
 * Setup telemetry tabs
 */
function setupTelemetryTabs() {
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
 * Update telemetry data
 */
function updateTelemetryData(framework) {
  const telemetryData = framework.telemetryCollector.getTelemetryData();
  const networkRequests = framework.telemetryCollector.getNetworkRequests();
  const consoleLogs = framework.telemetryCollector.getConsoleLogs();
  const domChanges = framework.telemetryCollector.getDOMChanges();
  const userInteractions = framework.telemetryCollector.getUserInteractions();
  const errors = framework.telemetryCollector.getErrors();
  const memoryUsage = framework.telemetryCollector.getMemoryUsage();

  // Update overview metrics
  document.getElementById('total-telemetry').textContent = telemetryData.length;
  document.getElementById('network-requests').textContent = networkRequests.length;
  document.getElementById('console-logs').textContent = consoleLogs.length;
  document.getElementById('dom-changes').textContent = domChanges.length;

  // Update analytics
  updateAnalytics(framework);

  // Update streams
  updateTelemetryStream(telemetryData);
  updateBypassStream(telemetryData);
  updateNetworkStream(networkRequests);
  updateConsoleStream(consoleLogs);
  updateDOMStream(domChanges);
  updatePerformanceStream(framework.telemetryCollector.getPerformanceMetrics());
  updateUserInteractionsStream(userInteractions);
  updateErrorsStream(errors);

  // Update statistics
  updateTelemetryStats(telemetryData);
}

/**
 * Update analytics metrics
 */
function updateAnalytics(framework) {
  const telemetryCollector = framework.telemetryCollector;
  
  // Error rate
  const errorRate = telemetryCollector.calculateErrorRate();
  document.getElementById('error-rate').textContent = `${errorRate.toFixed(1)}%`;
  
  // Average response time
  const avgResponseTime = telemetryCollector.calculateAverageResponseTime();
  document.getElementById('avg-response-time').textContent = `${Math.round(avgResponseTime)}ms`;
  
  // Memory usage
  const avgMemory = telemetryCollector.calculateAverageMemoryUsage();
  const memoryMB = (avgMemory / (1024 * 1024)).toFixed(1);
  document.getElementById('memory-usage').textContent = `${memoryMB}MB`;
  
  // User interactions
  const userInteractions = telemetryCollector.getUserInteractions();
  document.getElementById('user-interactions').textContent = userInteractions.length;
}

/**
 * Update user interactions stream
 */
function updateUserInteractionsStream(data) {
  const container = document.getElementById('interactions-stream');
  
  if (data.length === 0) {
    container.innerHTML = '<p class="log-entry">No user interactions yet</p>';
    return;
  }

  const noData = container.querySelector('.log-entry');
  if (noData && noData.textContent === 'No user interactions yet') {
    noData.remove();
  }

  const recentData = data.slice(-20).reverse();
  const html = recentData.map(interaction => `
    <div class="telemetry-entry user_interaction">
      <div class="telemetry-timestamp">${new Date(interaction.timestamp).toLocaleTimeString()}</div>
      <div class="telemetry-event">${interaction.type}</div>
      <div class="telemetry-data">Target: ${interaction.target}</div>
    </div>
  `).join('');
  
  container.innerHTML = html;
}

/**
 * Update errors stream
 */
function updateErrorsStream(data) {
  const container = document.getElementById('errors-stream');
  
  if (data.length === 0) {
    container.innerHTML = '<p class="log-entry">No errors yet</p>';
    return;
  }

  const noData = container.querySelector('.log-entry');
  if (noData && noData.textContent === 'No errors yet') {
    noData.remove();
  }

  const recentData = data.slice(-20).reverse();
  const html = recentData.map(error => `
    <div class="telemetry-entry error">
      <div class="telemetry-timestamp">${new Date(error.timestamp).toLocaleTimeString()}</div>
      <div class="telemetry-event">${error.type}</div>
      <div class="telemetry-data">
        Error: ${error.error}
        ${error.stack ? `<br>Stack: ${error.stack.substring(0, 200)}...` : ''}
      </div>
    </div>
  `).join('');
  
  container.innerHTML = html;
}

/**
 * Update main telemetry stream
 */
function updateTelemetryStream(data) {
  const container = document.getElementById('telemetry-stream');
  
  if (data.length === 0) {
    container.innerHTML = '<p class="log-entry">No telemetry data yet</p>';
    return;
  }

  // Remove "No telemetry data yet" message
  const noData = container.querySelector('.log-entry');
  if (noData && noData.textContent === 'No telemetry data yet') {
    noData.remove();
  }

  // Show last 50 entries
  const recentData = data.slice(-50).reverse();
  const html = recentData.map(entry => createTelemetryEntry(entry)).join('');
  
  container.innerHTML = html;
}

/**
 * Update bypass attempts stream
 */
function updateBypassStream(data) {
  const bypassData = data.filter(entry => entry.event === 'bypass_attempt');
  const container = document.getElementById('bypass-stream');
  
  if (bypassData.length === 0) {
    container.innerHTML = '<p class="log-entry">No bypass attempts yet</p>';
    return;
  }

  const noData = container.querySelector('.log-entry');
  if (noData && noData.textContent === 'No bypass attempts yet') {
    noData.remove();
  }

  const recentData = bypassData.slice(-20).reverse();
  const html = recentData.map(entry => createTelemetryEntry(entry)).join('');
  
  container.innerHTML = html;
}

/**
 * Update network activity stream
 */
function updateNetworkStream(data) {
  const container = document.getElementById('network-stream');
  
  if (data.length === 0) {
    container.innerHTML = '<p class="log-entry">No network activity yet</p>';
    return;
  }

  const noData = container.querySelector('.log-entry');
  if (noData && noData.textContent === 'No network activity yet') {
    noData.remove();
  }

  const recentData = data.slice(-20).reverse();
  const html = recentData.map(request => `
    <div class="telemetry-entry network_request">
      <div class="telemetry-timestamp">${new Date(request.timestamp).toLocaleTimeString()}</div>
      <div class="telemetry-event">${request.method} ${request.url}</div>
      <div class="telemetry-data">
        Status: ${request.status || 'N/A'} | Duration: ${request.duration}ms | Success: ${request.success ? 'Yes' : 'No'}
      </div>
    </div>
  `).join('');
  
  container.innerHTML = html;
}

/**
 * Update console logs stream
 */
function updateConsoleStream(data) {
  const container = document.getElementById('console-stream');
  
  if (data.length === 0) {
    container.innerHTML = '<p class="log-entry">No console logs yet</p>';
    return;
  }

  const noData = container.querySelector('.log-entry');
  if (noData && noData.textContent === 'No console logs yet') {
    noData.remove();
  }

  const recentData = data.slice(-20).reverse();
  const html = recentData.map(log => `
    <div class="telemetry-entry console_log">
      <div class="telemetry-timestamp">${new Date(log.timestamp).toLocaleTimeString()}</div>
      <div class="telemetry-event">Console ${log.level}</div>
      <div class="telemetry-data">${log.message}</div>
    </div>
  `).join('');
  
  container.innerHTML = html;
}

/**
 * Update DOM mutations stream
 */
function updateDOMStream(data) {
  const container = document.getElementById('dom-stream');
  
  if (data.length === 0) {
    container.innerHTML = '<p class="log-entry">No DOM mutations yet</p>';
    return;
  }

  const noData = container.querySelector('.log-entry');
  if (noData && noData.textContent === 'No DOM mutations yet') {
    noData.remove();
  }

  const recentData = data.slice(-20).reverse();
  const html = recentData.map(mutation => `
    <div class="telemetry-entry dom_mutation">
      <div class="telemetry-timestamp">${new Date(mutation.timestamp).toLocaleTimeString()}</div>
      <div class="telemetry-event">${mutation.type} on ${mutation.target}</div>
      <div class="telemetry-data">
        Added: ${mutation.addedNodes.length} | Removed: ${mutation.removedNodes.length}
        ${mutation.attributeName ? `| Attribute: ${mutation.attributeName}` : ''}
      </div>
    </div>
  `).join('');
  
  container.innerHTML = html;
}

/**
 * Update performance metrics stream
 */
function updatePerformanceStream(data) {
  const container = document.getElementById('performance-stream');
  
  if (data.length === 0) {
    container.innerHTML = '<p class="log-entry">No performance data yet</p>';
    return;
  }

  const noData = container.querySelector('.log-entry');
  if (noData && noData.textContent === 'No performance data yet') {
    noData.remove();
  }

  const recentData = data.slice(-20).reverse();
  const html = recentData.map(metric => `
    <div class="telemetry-entry performance_metric">
      <div class="telemetry-timestamp">${new Date(metric.timestamp).toLocaleTimeString()}</div>
      <div class="telemetry-event">${metric.name} (${metric.type})</div>
      <div class="telemetry-data">
        Duration: ${metric.duration}ms | Start: ${metric.startTime}ms
      </div>
    </div>
  `).join('');
  
  container.innerHTML = html;
}

/**
 * Create telemetry entry HTML
 */
function createTelemetryEntry(entry) {
  const timestamp = new Date(entry.timestamp).toLocaleTimeString();
  const eventClass = entry.event.replace(/_/g, '-');
  
  return `
    <div class="telemetry-entry ${eventClass}">
      <div class="telemetry-timestamp">${timestamp}</div>
      <div class="telemetry-event">${entry.event}</div>
      <div class="telemetry-data">${JSON.stringify(entry.data, null, 2)}</div>
    </div>
  `;
}

/**
 * Filter telemetry data by event type
 */
function filterTelemetryData(eventType) {
  console.log('Filtering by event type:', eventType);
  // Implementation would filter the displayed data
}

/**
 * Search telemetry data
 */
function searchTelemetryData(query) {
  console.log('Searching for:', query);
  // Implementation would search through the data
}

/**
 * Filter by time range
 */
function filterByTimeRange(range) {
  console.log('Filtering by time range:', range);
  // Implementation would filter by time
}

/**
 * Update telemetry statistics
 */
function updateTelemetryStats(data) {
  const container = document.getElementById('telemetry-stats');
  
  if (data.length === 0) {
    container.innerHTML = '<p>No data available for statistics</p>';
    return;
  }

  // Calculate statistics
  const eventCounts = {};
  const successCounts = {};
  
  data.forEach(entry => {
    eventCounts[entry.event] = (eventCounts[entry.event] || 0) + 1;
    
    if (entry.event === 'bypass_attempt') {
      const success = entry.data.success;
      successCounts[success] = (successCounts[success] || 0) + 1;
    }
  });

  const totalEvents = data.length;
  const uniqueEvents = Object.keys(eventCounts).length;
  const bypassAttempts = eventCounts['bypass_attempt'] || 0;
  const successfulBypasses = successCounts[true] || 0;
  const successRate = bypassAttempts > 0 ? (successfulBypasses / bypassAttempts * 100).toFixed(1) : 0;

  const html = `
    <div class="stats-grid">
      <div class="stat-item">
        <div class="stat-value">${totalEvents}</div>
        <div class="stat-label">Total Events</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${uniqueEvents}</div>
        <div class="stat-label">Unique Event Types</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${bypassAttempts}</div>
        <div class="stat-label">Bypass Attempts</div>
      </div>
      <div class="stat-item">
        <div class="stat-value">${successRate}%</div>
        <div class="stat-label">Success Rate</div>
      </div>
    </div>
    
    <h4>Event Distribution</h4>
    <div class="event-breakdown">
      ${Object.entries(eventCounts).map(([event, count]) => `
        <div class="event-item">
          <span class="event-name">${event}:</span>
          <span class="event-count">${count}</span>
        </div>
      `).join('')}
    </div>
  `;
  
  container.innerHTML = html;
} 