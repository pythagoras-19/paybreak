/**
 * Create the dashboard panel
 */
export function createDashboard(framework, container) {
  container.innerHTML = `
    <div class="card">
      <h2>📊 Dashboard Overview</h2>
      <p>Welcome to PayBreak - your comprehensive paywall bypass research framework.</p>
    </div>

    <div class="grid">
      <div class="card">
        <h3>🎯 Quick Actions</h3>
        <button class="btn success" id="run-test-suite">
          🚀 Run Full Test Suite
        </button>
        <button class="btn" id="start-auto-fuzzing">
          🔄 Start Auto-Fuzzing
        </button>
        <button class="btn secondary" id="export-data">
          📤 Export Data
        </button>
        <button class="btn danger" id="reset-framework">
          🔄 Reset Framework
        </button>
      </div>

      <div class="card">
        <h3>📈 Live Metrics</h3>
        <div class="grid">
          <div class="metric">
            <div class="metric-value" id="bypass-attempts">0</div>
            <div class="metric-label">Bypass Attempts</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="successful-bypasses">0</div>
            <div class="metric-label">Successful Bypasses</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="success-rate">0%</div>
            <div class="metric-label">Success Rate</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="telemetry-records">0</div>
            <div class="metric-label">Telemetry Records</div>
          </div>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h3>🔍 Current Status</h3>
        <div id="current-status">
          <p><strong>Framework:</strong> <span id="framework-status">Initializing...</span></p>
          <p><strong>Session:</strong> <span id="session-status">Not started</span></p>
          <p><strong>Paywall:</strong> <span id="paywall-status">None active</span></p>
          <p><strong>Auto-fuzzing:</strong> <span id="fuzzing-status">Inactive</span></p>
        </div>
      </div>

      <div class="card">
        <h3>📋 Recent Activity</h3>
        <div id="recent-activity" style="max-height: 200px; overflow-y: auto;">
          <p class="log-entry">Framework initialized</p>
        </div>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h3>📊 Logging Status</h3>
        <div class="grid">
          <div class="metric">
            <div class="metric-value" id="log-level-indicator">Debug</div>
            <div class="metric-label">Log Level</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="total-log-entries">0</div>
            <div class="metric-label">Log Entries</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="error-count">0</div>
            <div class="metric-label">Errors</div>
          </div>
          <div class="metric">
            <div class="metric-value" id="memory-usage-dashboard">0MB</div>
            <div class="metric-label">Memory</div>
          </div>
        </div>
        <div style="margin-top: 1rem;">
          <button class="btn" onclick="window.paybreak.telemetryCollector.setLogLevel('debug')">Debug</button>
          <button class="btn" onclick="window.paybreak.telemetryCollector.setLogLevel('info')">Info</button>
          <button class="btn" onclick="window.paybreak.telemetryCollector.setLogLevel('warn')">Warn</button>
          <button class="btn" onclick="window.paybreak.telemetryCollector.setLogLevel('error')">Error</button>
        </div>
      </div>

      <div class="card">
        <h3>🔧 Quick Logging Controls</h3>
        <div class="checkbox-group">
          <input type="checkbox" id="dashboard-track-network" checked>
          <label for="dashboard-track-network">Network Tracking</label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="dashboard-track-console" checked>
          <label for="dashboard-track-console">Console Tracking</label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="dashboard-track-dom" checked>
          <label for="dashboard-track-dom">DOM Tracking</label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="dashboard-track-interactions" checked>
          <label for="dashboard-track-interactions">User Interactions</label>
        </div>
        <button class="btn secondary" onclick="window.paybreak.telemetryCollector.clearData()">Clear Logs</button>
        <button class="btn" onclick="window.paybreak.telemetryCollector.generateEnhancedReport()">Generate Report</button>
      </div>
    </div>

    <div class="card">
      <h3>🎯 Paywall Types Available</h3>
      <div class="grid">
        <div class="card" style="margin: 0;">
          <h4>🧱 Soft Paywall</h4>
          <p>Blur + modal overlay</p>
          <button class="btn" onclick="testSoftPaywall()">Test Soft</button>
        </div>
        <div class="card" style="margin: 0;">
          <h4>📊 Metered Paywall</h4>
          <p>Count-based access</p>
          <button class="btn" onclick="testMeteredPaywall()">Test Metered</button>
        </div>
        <div class="card" style="margin: 0;">
          <h4>🔒 Hard Paywall</h4>
          <p>Redirect/block content</p>
          <button class="btn" onclick="testHardPaywall()">Test Hard</button>
        </div>
        <div class="card" style="margin: 0;">
          <h4>🔐 Obfuscated</h4>
          <p>JS obfuscation</p>
          <button class="btn" onclick="testObfuscatedPaywall()">Test Obfuscated</button>
        </div>
      </div>
    </div>
  `;

  // Setup event listeners
  setupDashboardEvents(framework, container);
  setupDashboardLoggingControls(framework, container);

  // Start metrics updates
  updateMetrics(framework);
  setInterval(() => updateMetrics(framework), 2000);

  // Add global functions for paywall testing
  window.testSoftPaywall = () => {
    // Navigate to paywall simulator and apply soft paywall
    const paywallTab = document.querySelector('[data-panel="paywall"]');
    if (paywallTab) {
      paywallTab.click();
      setTimeout(() => {
        window.paybreak.applyPaywall('soft');
      }, 500);
    }
  };

  window.testMeteredPaywall = () => {
    const paywallTab = document.querySelector('[data-panel="paywall"]');
    if (paywallTab) {
      paywallTab.click();
      setTimeout(() => {
        window.paybreak.applyPaywall('metered');
      }, 500);
    }
  };

  window.testHardPaywall = () => {
    const paywallTab = document.querySelector('[data-panel="paywall"]');
    if (paywallTab) {
      paywallTab.click();
      setTimeout(() => {
        window.paybreak.applyPaywall('hard');
      }, 500);
    }
  };

  window.testObfuscatedPaywall = () => {
    const paywallTab = document.querySelector('[data-panel="paywall"]');
    if (paywallTab) {
      paywallTab.click();
      setTimeout(() => {
        window.paybreak.applyPaywall('obfuscated');
      }, 500);
    }
  };
}

/**
 * Setup dashboard event listeners
 */
function setupDashboardEvents(framework, container) {
  // Run test suite
  container.querySelector('#run-test-suite').addEventListener('click', async () => {
    const button = container.querySelector('#run-test-suite');
    const originalText = button.textContent;
    
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Running Test Suite...';
    
    try {
      const results = await framework.runTestSuite();
      addActivityLog('Test suite completed successfully', 'success');
      console.log('Test suite results:', results);
    } catch (error) {
      addActivityLog(`Test suite failed: ${error.message}`, 'error');
      console.error('Test suite error:', error);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  // Start auto-fuzzing
  container.querySelector('#start-auto-fuzzing').addEventListener('click', async () => {
    const button = container.querySelector('#start-auto-fuzzing');
    const originalText = button.textContent;
    
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Starting Auto-Fuzzing...';
    
    try {
      await framework.startAutoFuzzing({ maxIterations: 10 });
      addActivityLog('Auto-fuzzing started', 'success');
      button.textContent = '🛑 Stop Auto-Fuzzing';
      button.classList.remove('btn');
      button.classList.add('btn', 'danger');
      button.onclick = async () => {
        framework.stopAutoFuzzing();
        addActivityLog('Auto-fuzzing stopped', 'info');
        button.textContent = originalText;
        button.classList.remove('btn', 'danger');
        button.classList.add('btn');
        button.onclick = null;
        setupDashboardEvents(framework, container);
      };
    } catch (error) {
      addActivityLog(`Auto-fuzzing failed: ${error.message}`, 'error');
      console.error('Auto-fuzzing error:', error);
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  // Export data
  container.querySelector('#export-data').addEventListener('click', () => {
    const data = framework.exportData('json');
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paybreak-data-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    addActivityLog('Data exported successfully', 'success');
  });

  // Reset framework
  container.querySelector('#reset-framework').addEventListener('click', async () => {
    if (confirm('Are you sure you want to reset the framework? This will clear all data.')) {
      const button = container.querySelector('#reset-framework');
      const originalText = button.textContent;
      
      button.disabled = true;
      button.innerHTML = '<span class="spinner"></span> Resetting...';
      
      try {
        await framework.shutdown();
        await framework.initialize();
        await framework.startSession();
        addActivityLog('Framework reset successfully', 'success');
      } catch (error) {
        addActivityLog(`Reset failed: ${error.message}`, 'error');
        console.error('Reset error:', error);
      } finally {
        button.disabled = false;
        button.textContent = originalText;
      }
    }
  });
}

/**
 * Update dashboard metrics
 */
function updateMetrics(framework) {
  const status = framework.getStatus();
  const bypassReport = framework.getBypassReport();
  const telemetryCollector = framework.telemetryCollector;

  // Update metric values
  document.getElementById('bypass-attempts').textContent = status.bypassAttempts;
  document.getElementById('successful-bypasses').textContent = status.successfulBypasses;
  document.getElementById('success-rate').textContent = `${bypassReport.successRate.toFixed(1)}%`;
  document.getElementById('telemetry-records').textContent = status.telemetryRecords;

  // Update logging status
  document.getElementById('log-level-indicator').textContent = telemetryCollector.logLevel;
  document.getElementById('total-log-entries').textContent = telemetryCollector.telemetryData.length;
  document.getElementById('error-count').textContent = telemetryCollector.errors.length;
  
  const avgMemory = telemetryCollector.calculateAverageMemoryUsage();
  const memoryMB = (avgMemory / (1024 * 1024)).toFixed(1);
  document.getElementById('memory-usage-dashboard').textContent = `${memoryMB}MB`;

  // Update status
  document.getElementById('framework-status').textContent = status.isActive ? 'Active' : 'Inactive';
  document.getElementById('session-status').textContent = status.currentSession ? 'Active' : 'Not started';
  document.getElementById('paywall-status').textContent = status.paywallActive ? status.paywallType : 'None active';
  document.getElementById('fuzzing-status').textContent = status.autoFuzzing ? 'Active' : 'Inactive';
}

/**
 * Setup dashboard logging controls
 */
function setupDashboardLoggingControls(framework, container) {
  // Dashboard tracking toggles
  const dashboardToggles = [
    'dashboard-track-network', 'dashboard-track-console', 
    'dashboard-track-dom', 'dashboard-track-interactions'
  ];

  dashboardToggles.forEach(toggleId => {
    container.querySelector(`#${toggleId}`).addEventListener('change', (e) => {
      const isEnabled = e.target.checked;
      const feature = toggleId.replace('dashboard-track-', '');
      
      // Log the configuration change
      framework.telemetryCollector.logTelemetry('dashboard_tracking_changed', {
        feature,
        enabled: isEnabled,
        timestamp: Date.now()
      });
    });
  });
}

/**
 * Add activity log entry
 */
function addActivityLog(message, type = 'info') {
  const activityContainer = document.getElementById('recent-activity');
  const logEntry = document.createElement('p');
  logEntry.className = `log-entry ${type}`;
  logEntry.textContent = `[${new Date().toLocaleTimeString()}] ${message}`;
  
  activityContainer.insertBefore(logEntry, activityContainer.firstChild);
  
  // Keep only last 10 entries
  const entries = activityContainer.querySelectorAll('.log-entry');
  if (entries.length > 10) {
    entries[entries.length - 1].remove();
  }
} 