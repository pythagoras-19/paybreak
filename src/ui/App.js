import { createDashboard } from './Dashboard.js';
import { createPaywallControls } from './PaywallControls.js';
import { createBypassPanel } from './BypassPanel.js';
import { createTelemetryViewer } from './TelemetryViewer.js';
import { createAnalysisPanel } from './AnalysisPanel.js';

/**
 * Create and mount the main application UI
 */
export function createUI(framework) {
  console.log('[PayBreak] [UI] Starting UI creation...');
  
  // Create main container
  const appContainer = document.createElement('div');
  appContainer.id = 'paybreak-app';
  appContainer.innerHTML = `
    <div class="paybreak-header">
      <div class="paybreak-logo">
        <h1>🧩 PayBreak</h1>
        <span class="subtitle">Paywall Bypass Research Framework</span>
      </div>
      <div class="paybreak-status">
        <span class="status-indicator" id="status-indicator"></span>
        <span class="status-text" id="status-text">Initializing...</span>
      </div>
    </div>
    
    <div class="paybreak-main">
      <div class="paybreak-sidebar">
        <nav class="paybreak-nav">
          <button class="nav-item active" data-panel="dashboard">
            📊 Dashboard
          </button>
          <button class="nav-item" data-panel="paywall">
            🧱 Paywall Simulator
          </button>
          <button class="nav-item" data-panel="bypass">
            🧪 Bypass Engine
          </button>
          <button class="nav-item" data-panel="telemetry">
            📈 Telemetry
          </button>
          <button class="nav-item" data-panel="analysis">
            🔍 Analysis
          </button>
        </nav>
      </div>
      
      <div class="paybreak-content">
        <div id="dashboard-panel" class="panel active"></div>
        <div id="paywall-panel" class="panel"></div>
        <div id="bypass-panel" class="panel"></div>
        <div id="telemetry-panel" class="panel"></div>
        <div id="analysis-panel" class="panel"></div>
      </div>
    </div>

    <div class="paybreak-footer">
      <div class="footer-content">
        <span class="copyright">© 2025 Matt Christiansen</span>
        <span class="separator">•</span>
        <span class="project">PayBreak Framework</span>
        <span class="separator">•</span>
        <span class="rights">All rights reserved</span>
      </div>
    </div>
  `;

  console.log('[PayBreak] [UI] Container HTML created');

  // Add styles
  console.log('[PayBreak] [UI] Adding styles...');
  addStyles();
  console.log('[PayBreak] [UI] Styles added');

  // Mount to page
  console.log('[PayBreak] [UI] Mounting to page...');
  document.body.appendChild(appContainer);
  console.log('[PayBreak] [UI] Mounted to page');

  // Initialize panels
  console.log('[PayBreak] [UI] Initializing panels...');
  initializePanels(framework);
  console.log('[PayBreak] [UI] Panels initialized');

  // Setup navigation
  console.log('[PayBreak] [UI] Setting up navigation...');
  setupNavigation();
  console.log('[PayBreak] [UI] Navigation setup complete');

  // Update status
  console.log('[PayBreak] [UI] Updating status...');
  updateStatus(framework);
  console.log('[PayBreak] [UI] Status updated');

  // Start status updates
  console.log('[PayBreak] [UI] Starting status updates...');
  setInterval(() => updateStatus(framework), 2000);
  console.log('[PayBreak] [UI] Status updates started');

  console.log('[PayBreak] [UI] UI creation complete!');
}

/**
 * Add CSS styles
 */
function addStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #paybreak-app {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 10000;
      display: flex;
      flex-direction: column;
    }

    .paybreak-header {
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      padding: 1rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    }

    .paybreak-logo h1 {
      margin: 0;
      color: #fbbf24;
      font-size: 1.8rem;
      font-weight: 700;
    }

    .paybreak-logo .subtitle {
      color: rgba(255, 255, 255, 0.8);
      font-size: 0.9rem;
    }

    .paybreak-status {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    .status-indicator {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #dc2626;
      animation: pulse 2s infinite;
    }

    .status-indicator.active {
      background: #fbbf24;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }

    .status-text {
      color: white;
      font-weight: 500;
    }

    .paybreak-main {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    .paybreak-sidebar {
      width: 250px;
      background: rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      border-right: 1px solid rgba(255, 255, 255, 0.2);
    }

    .paybreak-nav {
      padding: 1rem 0;
    }

    .nav-item {
      width: 100%;
      padding: 1rem 1.5rem;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.8);
      text-align: left;
      font-size: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .nav-item:hover {
      background: rgba(251, 191, 36, 0.1);
      color: #fbbf24;
    }

    .nav-item.active {
      background: rgba(251, 191, 36, 0.2);
      color: #fbbf24;
      border-left-color: #fbbf24;
    }

    .paybreak-content {
      flex: 1;
      overflow-y: auto;
      padding: 2rem;
    }

    .panel {
      display: none;
    }

    .panel.active {
      display: block;
    }

    .card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      margin-bottom: 1.5rem;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(0, 0, 0, 0.05);
    }

    .card h2 {
      margin: 0 0 1rem 0;
      color: #1e3a8a;
      font-size: 1.4rem;
      font-weight: 600;
    }

    .card h3 {
      margin: 0 0 0.5rem 0;
      color: #1e40af;
      font-size: 1.1rem;
      font-weight: 500;
    }

    .btn {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
      color: white;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 8px;
      font-size: 0.9rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 0.25rem;
    }

    .btn:hover {
      transform: translateY(-2px);
      box-shadow: 0 4px 15px rgba(30, 58, 138, 0.4);
    }

    .btn:active {
      transform: translateY(0);
    }

    .btn.secondary {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      color: #1e3a8a;
    }

    .btn.danger {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 100%);
    }

    .btn.success {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
      color: #1e3a8a;
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
    }

    .metric {
      text-align: center;
      padding: 1rem;
    }

    .metric-value {
      font-size: 2rem;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 0.5rem;
    }

    .metric-label {
      color: #6b7280;
      font-size: 0.9rem;
      font-weight: 500;
    }

    .status-badge {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 20px;
      font-size: 0.8rem;
      font-weight: 500;
      text-transform: uppercase;
    }

    .status-badge.success {
      background: #fef3c7;
      color: #92400e;
    }

    .status-badge.warning {
      background: #fef3c7;
      color: #92400e;
    }

    .status-badge.danger {
      background: #fee2e2;
      color: #991b1b;
    }

    .log-entry {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      padding: 0.75rem;
      margin-bottom: 0.5rem;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.85rem;
    }

    .log-entry.error {
      background: #fee2e2;
      border-color: #fecaca;
      color: #991b1b;
    }

    .log-entry.success {
      background: #fef3c7;
      border-color: #fed7aa;
      color: #92400e;
    }

    .progress-bar {
      width: 100%;
      height: 8px;
      background: #e9ecef;
      border-radius: 4px;
      overflow: hidden;
      margin: 0.5rem 0;
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #1e3a8a 0%, #fbbf24 100%);
      transition: width 0.3s ease;
    }

    .form-group {
      margin-bottom: 1rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.5rem;
      color: #1e3a8a;
      font-weight: 500;
    }

    .form-control {
      width: 100%;
      padding: 0.75rem;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 0.9rem;
      transition: border-color 0.3s ease;
    }

    .form-control:focus {
      outline: none;
      border-color: #1e3a8a;
      box-shadow: 0 0 0 3px rgba(30, 58, 138, 0.1);
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-bottom: 0.5rem;
    }

    .checkbox-group input[type="checkbox"] {
      margin: 0;
    }

    .tabs {
      display: flex;
      border-bottom: 1px solid #e9ecef;
      margin-bottom: 1rem;
    }

    .tab {
      padding: 0.75rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      border-bottom: 2px solid transparent;
      transition: all 0.3s ease;
    }

    .tab.active {
      border-bottom-color: #667eea;
      color: #667eea;
      font-weight: 500;
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    .alert {
      padding: 1rem;
      border-radius: 6px;
      margin-bottom: 1rem;
    }

    .alert.info {
      background: #d1ecf1;
      border: 1px solid #bee5eb;
      color: #0c5460;
    }

    .alert.success {
      background: #d4edda;
      border: 1px solid #c3e6cb;
      color: #155724;
    }

    .alert.warning {
      background: #fff3cd;
      border: 1px solid #ffeaa7;
      color: #856404;
    }

    .alert.danger {
      background: #f8d7da;
      border: 1px solid #f5c6cb;
      color: #721c24;
    }

    .spinner {
      display: inline-block;
      width: 20px;
      height: 20px;
      border: 3px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: white;
      animation: spin 1s ease-in-out infinite;
    }

    @keyframes spin {
      to { transform: rotate(360deg); }
    }

    .tooltip {
      position: relative;
      display: inline-block;
    }

    .tooltip .tooltiptext {
      visibility: hidden;
      width: 200px;
      background-color: #555;
      color: white;
      text-align: center;
      border-radius: 6px;
      padding: 5px;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -100px;
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 0.8rem;
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }

    .paybreak-footer {
      background: rgba(255, 255, 255, 0.08);
      backdrop-filter: blur(15px);
      padding: 1rem 2rem;
      text-align: center;
      border-top: 1px solid rgba(255, 255, 255, 0.15);
      color: rgba(255, 255, 255, 0.6);
      font-size: 0.9rem;
      font-weight: 400;
      letter-spacing: 0.5px;
      position: relative;
      overflow: hidden;
    }

    .paybreak-footer::before {
      content: '';
      position: absolute;
      top: 0;
      left: 50%;
      transform: translateX(-50%);
      width: 60px;
      height: 2px;
      background: linear-gradient(90deg, transparent, #fbbf24, transparent);
      border-radius: 1px;
    }

    .paybreak-footer span:hover {
      background: rgba(251, 191, 36, 0.15);
      border-color: rgba(251, 191, 36, 0.3);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(251, 191, 36, 0.2);
    }

    .footer-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1rem;
      flex-wrap: wrap;
    }

    .footer-content .author {
      color: #fbbf24;
      font-weight: 600;
      font-size: 0.95rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      position: relative;
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.2);
      transition: all 0.3s ease;
    }

    .footer-content .author:hover {
      background: rgba(251, 191, 36, 0.15);
      border-color: rgba(251, 191, 36, 0.3);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(251, 191, 36, 0.2);
    }

    .footer-content .copyright {
      color: #fbbf24;
      font-weight: 600;
      font-size: 0.95rem;
      text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
      position: relative;
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 4px;
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.2);
      transition: all 0.3s ease;
    }

    .footer-content .copyright:hover {
      background: rgba(251, 191, 36, 0.15);
      border-color: rgba(251, 191, 36, 0.3);
      transform: translateY(-1px);
      box-shadow: 0 2px 8px rgba(251, 191, 36, 0.2);
    }

    .footer-content .year {
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
      font-size: 0.9rem;
    }

    .footer-content .separator {
      color: rgba(255, 255, 255, 0.4);
      font-weight: 300;
      font-size: 0.8rem;
    }

    .footer-content .project {
      color: rgba(255, 255, 255, 0.7);
      font-weight: 400;
      font-size: 0.85rem;
      font-style: italic;
    }

    .footer-content .rights {
      color: rgba(255, 255, 255, 0.6);
      font-weight: 400;
      font-size: 0.8rem;
      font-style: italic;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Initialize all panels
 */
function initializePanels(framework) {
  console.log('[PayBreak] [UI] Initializing Dashboard panel...');
  createDashboard(framework, document.getElementById('dashboard-panel'));
  console.log('[PayBreak] [UI] Dashboard panel initialized');

  console.log('[PayBreak] [UI] Initializing Paywall Controls panel...');
  createPaywallControls(framework, document.getElementById('paywall-panel'));
  console.log('[PayBreak] [UI] Paywall Controls panel initialized');

  console.log('[PayBreak] [UI] Initializing Bypass panel...');
  createBypassPanel(framework, document.getElementById('bypass-panel'));
  console.log('[PayBreak] [UI] Bypass panel initialized');

  console.log('[PayBreak] [UI] Initializing Telemetry Viewer panel...');
  createTelemetryViewer(framework, document.getElementById('telemetry-panel'));
  console.log('[PayBreak] [UI] Telemetry Viewer panel initialized');

  console.log('[PayBreak] [UI] Initializing Analysis panel...');
  createAnalysisPanel(framework, document.getElementById('analysis-panel'));
  console.log('[PayBreak] [UI] Analysis panel initialized');
}

/**
 * Setup navigation
 */
function setupNavigation() {
  const navItems = document.querySelectorAll('.nav-item');
  const panels = document.querySelectorAll('.panel');

  navItems.forEach(item => {
    item.addEventListener('click', () => {
      const targetPanel = item.getAttribute('data-panel');
      
      // Update active nav item
      navItems.forEach(nav => nav.classList.remove('active'));
      item.classList.add('active');
      
      // Update active panel
      panels.forEach(panel => panel.classList.remove('active'));
      document.getElementById(`${targetPanel}-panel`).classList.add('active');
    });
  });
}

/**
 * Update status display
 */
function updateStatus(framework) {
  const statusIndicator = document.getElementById('status-indicator');
  const statusText = document.getElementById('status-text');
  
  const status = framework.getStatus();
  
  if (status.isActive) {
    statusIndicator.classList.add('active');
    statusText.textContent = 'Active';
    
    if (status.autoFuzzing) {
      statusText.textContent = 'Auto-fuzzing...';
    } else if (status.paywallActive) {
      statusText.textContent = `Testing ${status.paywallType} paywall`;
    }
  } else {
    statusIndicator.classList.remove('active');
    statusText.textContent = 'Inactive';
  }
} 