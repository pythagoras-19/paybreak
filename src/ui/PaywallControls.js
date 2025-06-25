/**
 * Create the paywall controls panel
 */
export function createPaywallControls(framework, container) {
  container.innerHTML = `
    <div class="card">
      <h2>🧱 Paywall Simulator</h2>
      <p>Configure and test different types of paywall implementations.</p>
    </div>

    <div class="grid">
      <div class="card">
        <h3>🎛️ Paywall Configuration</h3>
        <div class="form-group">
          <label for="paywall-type">Paywall Type:</label>
          <select id="paywall-type" class="form-control">
            <option value="soft">Soft Paywall (Blur + Modal)</option>
            <option value="metered">Metered Paywall (Count-based)</option>
            <option value="hard">Hard Paywall (Redirect/Block)</option>
            <option value="obfuscated">Obfuscated Paywall (JS Obfuscation)</option>
            <option value="serverValidated">Server-Validated Paywall</option>
          </select>
        </div>

        <div id="paywall-config" class="paywall-config">
          <!-- Dynamic configuration will be loaded here -->
        </div>

        <div class="form-group">
          <button class="btn success" id="apply-paywall">Apply Paywall</button>
          <button class="btn secondary" id="reset-paywall">Reset Paywall</button>
        </div>
      </div>

      <div class="card">
        <h3>📊 Current Paywall Status</h3>
        <div id="paywall-status">
          <p><strong>Active:</strong> <span id="paywall-active">No</span></p>
          <p><strong>Type:</strong> <span id="paywall-current-type">None</span></p>
          <p><strong>ID:</strong> <span id="paywall-id">None</span></p>
          <p><strong>Applied:</strong> <span id="paywall-applied-time">Never</span></p>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>🔧 Advanced Configuration</h3>
      <div class="tabs">
        <button class="tab active" data-tab="soft-config">Soft</button>
        <button class="tab" data-tab="metered-config">Metered</button>
        <button class="tab" data-tab="hard-config">Hard</button>
        <button class="tab" data-tab="obfuscated-config">Obfuscated</button>
        <button class="tab" data-tab="server-config">Server</button>
      </div>

      <div class="tab-content active" id="soft-config">
        <div class="form-group">
          <label for="blur-intensity">Blur Intensity (px):</label>
          <input type="range" id="blur-intensity" min="1" max="20" value="5" class="form-control">
          <span id="blur-value">5px</span>
        </div>
        <div class="form-group">
          <label for="overlay-opacity">Overlay Opacity:</label>
          <input type="range" id="overlay-opacity" min="0" max="1" step="0.1" value="0.8" class="form-control">
          <span id="opacity-value">0.8</span>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="modal-enabled" checked>
          <label for="modal-enabled">Enable Modal</label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="dismissible">
          <label for="dismissible">Dismissible</label>
        </div>
      </div>

      <div class="tab-content" id="metered-config">
        <div class="form-group">
          <label for="free-articles">Free Articles:</label>
          <input type="number" id="free-articles" min="1" max="100" value="3" class="form-control">
        </div>
        <div class="form-group">
          <label for="reset-interval">Reset Interval (hours):</label>
          <input type="number" id="reset-interval" min="1" max="168" value="24" class="form-control">
        </div>
        <div class="form-group">
          <label for="storage-key">Storage Key:</label>
          <input type="text" id="storage-key" value="metered_paywall_count" class="form-control">
        </div>
      </div>

      <div class="tab-content" id="hard-config">
        <div class="form-group">
          <label for="redirect-url">Redirect URL:</label>
          <input type="text" id="redirect-url" value="/subscribe" class="form-control">
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="require-login" checked>
          <label for="require-login">Require Login</label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="block-content" checked>
          <label for="block-content">Block Content</label>
        </div>
      </div>

      <div class="tab-content" id="obfuscated-config">
        <div class="form-group">
          <label for="obfuscation-level">Obfuscation Level:</label>
          <select id="obfuscation-level" class="form-control">
            <option value="low">Low</option>
            <option value="medium" selected>Medium</option>
            <option value="high">High</option>
          </select>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="variable-mangling" checked>
          <label for="variable-mangling">Variable Name Mangling</label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="function-mangling" checked>
          <label for="function-mangling">Function Name Mangling</label>
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="string-encoding" checked>
          <label for="string-encoding">String Encoding</label>
        </div>
      </div>

      <div class="tab-content" id="server-config">
        <div class="form-group">
          <label for="cookie-name">Cookie Name:</label>
          <input type="text" id="cookie-name" value="paywall_token" class="form-control">
        </div>
        <div class="form-group">
          <label for="validation-endpoint">Validation Endpoint:</label>
          <input type="text" id="validation-endpoint" value="/api/validate-paywall" class="form-control">
        </div>
        <div class="checkbox-group">
          <input type="checkbox" id="signed-cookies" checked>
          <label for="signed-cookies">Signed Cookies</label>
        </div>
        <div class="form-group">
          <label for="expiration-time">Expiration Time (seconds):</label>
          <input type="number" id="expiration-time" min="60" max="86400" value="3600" class="form-control">
        </div>
      </div>
    </div>

    <div class="card">
      <h3>📋 Paywall Templates</h3>
      <div class="grid">
        <div class="card" style="margin: 0;">
          <h4>📰 NYT Style</h4>
          <p>Soft paywall with metered access</p>
          <button class="btn" id="nyt-template">Load NYT Template</button>
        </div>
        <div class="card" style="margin: 0;">
          <h4>📝 Medium Style</h4>
          <p>Metered paywall with overlay</p>
          <button class="btn" id="medium-template">Load Medium Template</button>
        </div>
        <div class="card" style="margin: 0;">
          <h4>📊 WSJ Style</h4>
          <p>Hard paywall with redirect</p>
          <button class="btn" id="wsj-template">Load WSJ Template</button>
        </div>
        <div class="card" style="margin: 0;">
          <h4>📧 Substack Style</h4>
          <p>Server-validated with tokens</p>
          <button class="btn" id="substack-template">Load Substack Template</button>
        </div>
      </div>
    </div>
  `;

  // Setup event listeners
  setupPaywallEvents(framework, container);

  // Initialize tabs
  setupTabs();

  // Start status updates
  updatePaywallStatus(framework);
  setInterval(() => updatePaywallStatus(framework), 1000);
}

/**
 * Setup paywall control event listeners
 */
function setupPaywallEvents(framework, container) {
  // Paywall type change
  container.querySelector('#paywall-type').addEventListener('change', (e) => {
    const type = e.target.value;
    updateConfigurationUI(type);
  });

  // Apply paywall
  container.querySelector('#apply-paywall').addEventListener('click', async () => {
    const button = container.querySelector('#apply-paywall');
    const originalText = button.textContent;
    
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Applying...';
    
    try {
      const type = container.querySelector('#paywall-type').value;
      const config = getCurrentConfig(type);
      
      const result = await framework.applyPaywall(type, config);
      if (result.success) {
        showAlert('Paywall applied successfully!', 'success');
      } else {
        showAlert(`Failed to apply paywall: ${result.error}`, 'danger');
      }
    } catch (error) {
      showAlert(`Error applying paywall: ${error.message}`, 'danger');
      console.error('Paywall application error:', error);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  // Reset paywall
  container.querySelector('#reset-paywall').addEventListener('click', () => {
    framework.paywallSimulator.reset();
    showAlert('Paywall reset successfully!', 'info');
  });

  // Template buttons
  container.querySelector('#nyt-template').addEventListener('click', () => {
    loadTemplate('nyt');
  });

  container.querySelector('#medium-template').addEventListener('click', () => {
    loadTemplate('medium');
  });

  container.querySelector('#wsj-template').addEventListener('click', () => {
    loadTemplate('wsj');
  });

  container.querySelector('#substack-template').addEventListener('click', () => {
    loadTemplate('substack');
  });

  // Range input updates
  container.querySelector('#blur-intensity').addEventListener('input', (e) => {
    container.querySelector('#blur-value').textContent = `${e.target.value}px`;
  });

  container.querySelector('#overlay-opacity').addEventListener('input', (e) => {
    container.querySelector('#opacity-value').textContent = e.target.value;
  });

  // Initialize with soft paywall config
  updateConfigurationUI('soft');
}

/**
 * Setup tab functionality
 */
function setupTabs() {
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
 * Update configuration UI based on paywall type
 */
function updateConfigurationUI(type) {
  const tabs = document.querySelectorAll('.tab');
  const tabContents = document.querySelectorAll('.tab-content');
  
  // Hide all tabs and contents
  tabs.forEach(tab => tab.classList.remove('active'));
  tabContents.forEach(content => content.classList.remove('active'));
  
  // Show relevant tab
  const targetTab = document.querySelector(`[data-tab="${type}-config"]`);
  const targetContent = document.getElementById(`${type}-config`);
  
  if (targetTab && targetContent) {
    targetTab.classList.add('active');
    targetContent.classList.add('active');
  }
}

/**
 * Get current configuration based on form values
 */
function getCurrentConfig(type) {
  const config = {};
  
  switch (type) {
    case 'soft':
      config.blurIntensity = parseInt(document.getElementById('blur-intensity').value);
      config.overlayOpacity = parseFloat(document.getElementById('overlay-opacity').value);
      config.modalEnabled = document.getElementById('modal-enabled').checked;
      config.dismissible = document.getElementById('dismissible').checked;
      break;
      
    case 'metered':
      config.freeArticles = parseInt(document.getElementById('free-articles').value);
      config.resetInterval = parseInt(document.getElementById('reset-interval').value) * 60 * 60 * 1000; // Convert to ms
      config.storageKey = document.getElementById('storage-key').value;
      break;
      
    case 'hard':
      config.redirectUrl = document.getElementById('redirect-url').value;
      config.requireLogin = document.getElementById('require-login').checked;
      config.blockContent = document.getElementById('block-content').checked;
      break;
      
    case 'obfuscated':
      config.obfuscationLevel = document.getElementById('obfuscation-level').value;
      config.variableNameMangling = document.getElementById('variable-mangling').checked;
      config.functionNameMangling = document.getElementById('function-mangling').checked;
      config.stringEncoding = document.getElementById('string-encoding').checked;
      break;
      
    case 'serverValidated':
      config.cookieName = document.getElementById('cookie-name').value;
      config.validationEndpoint = document.getElementById('validation-endpoint').value;
      config.signedCookies = document.getElementById('signed-cookies').checked;
      config.expirationTime = parseInt(document.getElementById('expiration-time').value);
      break;
  }
  
  return config;
}

/**
 * Load predefined template
 */
function loadTemplate(template) {
  const templates = {
    nyt: {
      type: 'soft',
      config: {
        blurIntensity: 8,
        overlayOpacity: 0.9,
        modalEnabled: true,
        dismissible: false
      }
    },
    medium: {
      type: 'metered',
      config: {
        freeArticles: 3,
        resetInterval: 24 * 60 * 60 * 1000,
        storageKey: 'medium_metered_count'
      }
    },
    wsj: {
      type: 'hard',
      config: {
        redirectUrl: '/subscribe',
        requireLogin: true,
        blockContent: true
      }
    },
    substack: {
      type: 'serverValidated',
      config: {
        cookieName: 'substack_token',
        validationEndpoint: '/api/substack/validate',
        signedCookies: true,
        expirationTime: 7200
      }
    }
  };
  
  const templateData = templates[template];
  if (templateData) {
    // Update form values
    document.getElementById('paywall-type').value = templateData.type;
    updateConfigurationUI(templateData.type);
    
    // Apply the template
    framework.applyPaywall(templateData.type, templateData.config);
    
    showAlert(`${template.toUpperCase()} template loaded and applied!`, 'success');
  }
}

/**
 * Update paywall status display
 */
function updatePaywallStatus(framework) {
  const status = framework.getStatus();
  const simulator = framework.paywallSimulator;
  
  document.getElementById('paywall-active').textContent = status.paywallActive ? 'Yes' : 'No';
  document.getElementById('paywall-current-type').textContent = status.paywallType || 'None';
  document.getElementById('paywall-id').textContent = simulator.paywallId || 'None';
  
  const appliedTime = simulator.telemetry.find(t => t.event === 'paywall_applied');
  if (appliedTime) {
    document.getElementById('paywall-applied-time').textContent = 
      new Date(appliedTime.timestamp).toLocaleTimeString();
  } else {
    document.getElementById('paywall-applied-time').textContent = 'Never';
  }
}

/**
 * Show alert message
 */
function showAlert(message, type = 'info') {
  const alert = document.createElement('div');
  alert.className = `alert ${type}`;
  alert.textContent = message;
  
  // Insert at the top of the container
  const container = document.querySelector('#paywall-panel');
  container.insertBefore(alert, container.firstChild);
  
  // Remove after 5 seconds
  setTimeout(() => {
    alert.remove();
  }, 5000);
} 