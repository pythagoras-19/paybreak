import { createDashboard } from './Dashboard.js';
import { createPaywallControls } from './PaywallControls.js';
import { createBypassPanel } from './BypassPanel.js';
import { createTelemetryViewer } from './TelemetryViewer.js';
import { createAnalysisPanel } from './AnalysisPanel.js';
import { createInstructions } from './Instructions.js';

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
          <button class="nav-item" data-panel="instructions">
            📖 Instructions
          </button>
        </nav>
      </div>
      
      <div class="paybreak-content">
        <div id="dashboard-panel" class="panel active"></div>
        <div id="paywall-panel" class="panel"></div>
        <div id="bypass-panel" class="panel"></div>
        <div id="telemetry-panel" class="panel"></div>
        <div id="analysis-panel" class="panel"></div>
        <div id="instructions-panel" class="panel"></div>
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
    @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }

    @keyframes shimmer {
      0% { background-position: -200% 0; }
      100% { background-position: 200% 0; }
    }

    @keyframes pulse {
      0% { opacity: 1; transform: scale(1); }
      50% { opacity: 0.7; transform: scale(1.05); }
      100% { opacity: 1; transform: scale(1); }
    }

    @keyframes fadeInUp {
      from { transform: translateY(20px); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }

    #paybreak-app {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(-45deg, #0f172a, #1e3a8a, #1e40af, #1d4ed8);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      z-index: 10000;
      display: flex;
      flex-direction: column;
    }

    .paybreak-header {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(20px);
      padding: 1.5rem 2rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 2px solid rgba(251, 191, 36, 0.3);
    }

    .paybreak-logo h1 {
      margin: 0;
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 2rem;
      font-weight: 800;
    }

    .paybreak-logo .subtitle {
      color: rgba(255, 255, 255, 0.9);
      font-size: 0.95rem;
      font-weight: 400;
    }

    .paybreak-status {
      display: flex;
      align-items: center;
      gap: 0.75rem;
    }

    .status-indicator {
      width: 14px;
      height: 14px;
      border-radius: 50%;
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      animation: pulse 2s infinite;
    }

    .status-indicator.active {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
    }

    .status-text {
      color: white;
      font-weight: 600;
    }

    .paybreak-main {
      flex: 1;
      display: flex;
      overflow: hidden;
    }

    .paybreak-sidebar {
      width: 280px;
      background: rgba(15, 23, 42, 0.7);
      backdrop-filter: blur(20px);
      border-right: 2px solid rgba(251, 191, 36, 0.2);
    }

    .paybreak-nav {
      padding: 1.5rem 0;
    }

    .nav-item {
      width: 100%;
      padding: 1.25rem 2rem;
      background: none;
      border: none;
      color: rgba(255, 255, 255, 0.8);
      text-align: left;
      font-size: 1rem;
      font-weight: 500;
      cursor: pointer;
      transition: all 0.3s ease;
      border-left: 4px solid transparent;
    }

    .nav-item:hover {
      background: rgba(251, 191, 36, 0.15);
      color: #fbbf24;
      transform: translateX(5px);
    }

    .nav-item.active {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1));
      color: #fbbf24;
      border-left-color: #fbbf24;
    }

    .paybreak-content {
      flex: 1;
      overflow-y: auto;
      padding: 2.5rem;
      background: rgba(255, 255, 255, 0.02);
    }

    .panel {
      display: none;
    }

    .panel.active {
      display: block;
    }

    .card {
      background: rgba(255, 255, 255, 0.95);
      border-radius: 16px;
      padding: 2rem;
      margin-bottom: 2rem;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.1);
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 12px 40px rgba(0, 0, 0, 0.15);
    }

    .card h2 {
      margin: 0 0 1.5rem 0;
      background: linear-gradient(135deg, #1e3a8a, #1e40af);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.6rem;
      font-weight: 700;
    }

    .card h3 {
      margin: 0 0 1rem 0;
      background: linear-gradient(135deg, #1e40af, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-size: 1.2rem;
      font-weight: 600;
    }

    .btn {
      background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 50%, #3b82f6 100%);
      color: white;
      border: none;
      padding: 0.875rem 1.75rem;
      border-radius: 12px;
      font-size: 0.95rem;
      font-weight: 600;
      cursor: pointer;
      transition: all 0.3s ease;
      margin: 0.375rem;
      box-shadow: 0 4px 15px rgba(30, 58, 138, 0.3);
    }

    .btn:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(30, 58, 138, 0.4);
    }

    .btn.secondary {
      background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 50%, #d97706 100%);
      color: #1e3a8a;
      box-shadow: 0 4px 15px rgba(251, 191, 36, 0.3);
    }

    .btn.danger {
      background: linear-gradient(135deg, #dc2626 0%, #b91c1c 50%, #991b1b 100%);
      box-shadow: 0 4px 15px rgba(220, 38, 38, 0.3);
    }

    .btn.success {
      background: linear-gradient(135deg, #10b981 0%, #059669 50%, #047857 100%);
      box-shadow: 0 4px 15px rgba(16, 185, 129, 0.3);
    }

    .btn.info {
      background: linear-gradient(135deg, #3b82f6 0%, #1d4ed8 50%, #1e40af 100%);
      box-shadow: 0 4px 15px rgba(59, 130, 246, 0.3);
    }

    .btn:disabled {
      opacity: 0.6;
      cursor: not-allowed;
      transform: none;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
      gap: 2rem;
    }

    .metric {
      text-align: center;
      padding: 1.5rem;
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05));
      border-radius: 12px;
      border: 1px solid rgba(251, 191, 36, 0.2);
      transition: all 0.3s ease;
    }

    .metric:hover {
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(251, 191, 36, 0.2);
    }

    .metric-value {
      font-size: 2.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #1e3a8a, #fbbf24);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 0.75rem;
    }

    .metric-label {
      color: #6b7280;
      font-size: 0.95rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .status-badge {
      display: inline-block;
      padding: 0.5rem 1rem;
      border-radius: 25px;
      font-size: 0.85rem;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .status-badge.success {
      background: linear-gradient(135deg, #10b981, #059669);
      color: white;
    }

    .status-badge.warning {
      background: linear-gradient(135deg, #fbbf24, #f59e0b);
      color: #1e3a8a;
    }

    .status-badge.danger {
      background: linear-gradient(135deg, #dc2626, #b91c1c);
      color: white;
    }

    .log-entry {
      background: linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 249, 250, 0.9));
      border: 1px solid rgba(251, 191, 36, 0.2);
      border-radius: 8px;
      padding: 1rem;
      margin-bottom: 0.75rem;
      font-family: 'Monaco', 'Menlo', monospace;
      font-size: 0.9rem;
      transition: all 0.3s ease;
    }

    .log-entry:hover {
      transform: translateX(5px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .log-entry.error {
      background: linear-gradient(135deg, rgba(254, 226, 226, 0.9), rgba(254, 202, 202, 0.9));
      border-color: rgba(220, 38, 38, 0.3);
      color: #991b1b;
    }

    .log-entry.success {
      background: linear-gradient(135deg, rgba(254, 243, 199, 0.9), rgba(254, 215, 170, 0.9));
      border-color: rgba(251, 191, 36, 0.3);
      color: #92400e;
    }

    .progress-bar {
      width: 100%;
      height: 12px;
      background: linear-gradient(135deg, rgba(15, 23, 42, 0.1), rgba(30, 58, 138, 0.1));
      border-radius: 6px;
      overflow: hidden;
      margin: 0.75rem 0;
      box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .progress-fill {
      height: 100%;
      background: linear-gradient(90deg, #1e3a8a, #fbbf24, #1e40af);
      transition: width 0.5s ease;
      border-radius: 6px;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    .form-group label {
      display: block;
      margin-bottom: 0.75rem;
      background: linear-gradient(135deg, #1e3a8a, #1e40af);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      font-weight: 600;
      font-size: 0.95rem;
    }

    .form-control {
      width: 100%;
      padding: 1rem;
      border: 2px solid rgba(251, 191, 36, 0.2);
      border-radius: 8px;
      font-size: 0.95rem;
      transition: all 0.3s ease;
      background: rgba(255, 255, 255, 0.9);
    }

    .form-control:focus {
      outline: none;
      border-color: #fbbf24;
      box-shadow: 0 0 0 4px rgba(251, 191, 36, 0.1);
      transform: translateY(-2px);
    }

    .checkbox-group {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      margin-bottom: 0.75rem;
      padding: 0.75rem;
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.05), rgba(251, 191, 36, 0.02));
      border-radius: 8px;
      border: 1px solid rgba(251, 191, 36, 0.1);
      transition: all 0.3s ease;
    }

    .checkbox-group:hover {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05));
      border-color: rgba(251, 191, 36, 0.2);
    }

    .checkbox-group input[type="checkbox"] {
      margin: 0;
      width: 18px;
      height: 18px;
      accent-color: #fbbf24;
    }

    .checkbox-group label {
      margin: 0;
      font-weight: 500;
      color: #1e3a8a;
      cursor: pointer;
    }

    .tabs {
      display: flex;
      border-bottom: 2px solid rgba(251, 191, 36, 0.2);
      margin-bottom: 1.5rem;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 8px 8px 0 0;
      overflow: hidden;
    }

    .tab {
      padding: 1rem 1.5rem;
      background: none;
      border: none;
      cursor: pointer;
      border-bottom: 3px solid transparent;
      transition: all 0.3s ease;
      font-weight: 500;
      color: rgba(255, 255, 255, 0.7);
    }

    .tab:hover {
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.05);
    }

    .tab.active {
      border-bottom-color: #fbbf24;
      color: #fbbf24;
      background: rgba(251, 191, 36, 0.1);
    }

    .tab-content {
      display: none;
    }

    .tab-content.active {
      display: block;
    }

    .spinner {
      display: inline-block;
      width: 16px;
      height: 16px;
      border: 2px solid rgba(255, 255, 255, 0.3);
      border-radius: 50%;
      border-top-color: #fbbf24;
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
      background: linear-gradient(135deg, #1e3a8a, #1e40af);
      color: white;
      text-align: center;
      border-radius: 8px;
      padding: 0.75rem;
      position: absolute;
      z-index: 1;
      bottom: 125%;
      left: 50%;
      margin-left: -100px;
      opacity: 0;
      transition: opacity 0.3s;
      font-size: 0.85rem;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
    }

    .tooltip:hover .tooltiptext {
      visibility: visible;
      opacity: 1;
    }

    .paybreak-footer {
      background: rgba(15, 23, 42, 0.8);
      backdrop-filter: blur(20px);
      padding: 1.5rem 2rem;
      text-align: center;
      border-top: 2px solid rgba(251, 191, 36, 0.3);
      color: rgba(255, 255, 255, 0.7);
      font-size: 0.95rem;
      font-weight: 400;
      letter-spacing: 0.5px;
    }

    .footer-content {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 1.5rem;
      flex-wrap: wrap;
    }

    .footer-content .copyright {
      color: #fbbf24;
      font-weight: 700;
      font-size: 1rem;
      padding: 0.5rem 1rem;
      border-radius: 8px;
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.1), rgba(251, 191, 36, 0.05));
      border: 1px solid rgba(251, 191, 36, 0.3);
      transition: all 0.3s ease;
    }

    .footer-content .copyright:hover {
      background: linear-gradient(135deg, rgba(251, 191, 36, 0.2), rgba(251, 191, 36, 0.1));
      transform: translateY(-3px);
      box-shadow: 0 8px 25px rgba(251, 191, 36, 0.3);
    }

    .footer-content .project {
      color: rgba(255, 255, 255, 0.8);
      font-weight: 500;
      font-size: 0.9rem;
      font-style: italic;
      transition: all 0.3s ease;
    }

    .footer-content .project:hover {
      color: #fbbf24;
      transform: scale(1.05);
    }

    .footer-content .rights {
      color: rgba(255, 255, 255, 0.6);
      font-weight: 400;
      font-size: 0.85rem;
      font-style: italic;
      transition: all 0.3s ease;
    }

    .footer-content .rights:hover {
      color: rgba(255, 255, 255, 0.8);
    }

    .footer-content .separator {
      color: rgba(251, 191, 36, 0.5);
      font-weight: 400;
      font-size: 0.9rem;
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

  console.log('[PayBreak] [UI] Initializing Instructions panel...');
  createInstructions(framework, document.getElementById('instructions-panel'));
  console.log('[PayBreak] [UI] Instructions panel initialized');
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