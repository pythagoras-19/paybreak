/**
 * Create the paywall controls panel
 */
export function createPaywallControls(framework, container) {
  container.innerHTML = `
    <div class="card">
      <h2>🧱 Paywall Simulator</h2>
      <p>Configure and test different types of paywall implementations on simulated content.</p>
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
      <h3>📰 Simulated Content Area</h3>
      <p>This area simulates a real article that would be behind a paywall. Apply paywalls to this content to test bypass techniques.</p>
      
      <div id="content-simulation" class="content-simulation">
        <article class="simulated-article">
          <header class="article-header">
            <h1 class="article-title">The Future of Web Security: Understanding Paywall Vulnerabilities</h1>
            <div class="article-meta">
              <span class="author">By Dr. Sarah Chen</span>
              <span class="date">December 15, 2024</span>
              <span class="read-time">8 min read</span>
            </div>
          </header>
          
          <div class="article-content">
            <p class="lead">In today's digital landscape, paywalls have become a crucial revenue model for content creators. However, these security measures are not impervious to bypass attempts, raising important questions about their effectiveness and the future of content monetization.</p>
            
            <h2>The Evolution of Paywall Technology</h2>
            <p>Paywalls have evolved significantly since their inception. Early implementations were simple redirects or basic JavaScript overlays that could be easily circumvented. Modern paywalls employ sophisticated techniques including:</p>
            
            <ul>
              <li><strong>Client-side validation</strong> with obfuscated JavaScript</li>
              <li><strong>Server-side verification</strong> of subscription status</li>
              <li><strong>Behavioral analysis</strong> to detect bypass attempts</li>
              <li><strong>Multi-layered protection</strong> combining multiple techniques</li>
            </ul>
            
            <h2>Common Bypass Techniques</h2>
            <p>Security researchers have identified several common methods used to bypass paywalls:</p>
            
            <h3>1. DOM Manipulation</h3>
            <p>The most straightforward approach involves directly modifying the Document Object Model to remove paywall elements. This can include:</p>
            <ul>
              <li>Removing overlay divs and modals</li>
              <li>Unblurring content by modifying CSS properties</li>
              <li>Disabling JavaScript functions that enforce the paywall</li>
            </ul>
            
            <h3>2. Storage Manipulation</h3>
            <p>Many paywalls rely on browser storage to track user access:</p>
            <ul>
              <li>Clearing localStorage and sessionStorage</li>
              <li>Manipulating cookies that track article counts</li>
              <li>Resetting metered access counters</li>
            </ul>
            
            <h3>3. Network Interception</h3>
            <p>Advanced techniques involve intercepting network requests:</p>
            <ul>
              <li>Blocking requests to paywall validation endpoints</li>
              <li>Modifying request headers to appear as premium users</li>
              <li>Intercepting and modifying response data</li>
            </ul>
            
            <h2>The Arms Race Continues</h2>
            <p>As bypass techniques become more sophisticated, paywall providers are responding with increasingly complex countermeasures. This creates an ongoing arms race between security researchers and content providers.</p>
            
            <p>Some emerging trends include:</p>
            <ul>
              <li><strong>Machine learning</strong> to detect unusual access patterns</li>
              <li><strong>Hardware fingerprinting</strong> to identify individual users</li>
              <li><strong>Blockchain-based</strong> verification systems</li>
              <li><strong>Real-time behavioral analysis</strong> during content consumption</li>
            </ul>
            
            <h2>Ethical Considerations</h2>
            <p>While understanding paywall vulnerabilities is important for security research, it's crucial to consider the ethical implications:</p>
            
            <ul>
              <li>Content creators rely on paywalls for their livelihood</li>
              <li>Bypass techniques can undermine legitimate business models</li>
              <li>Research should focus on improving security, not circumventing it</li>
              <li>Responsible disclosure is essential when vulnerabilities are found</li>
            </ul>
            
            <h2>Looking Forward</h2>
            <p>The future of paywall security likely involves a combination of technical and business model innovations. Rather than simply making paywalls harder to bypass, successful content providers may need to:</p>
            
            <ul>
              <li>Offer more value to justify subscription costs</li>
              <li>Implement flexible pricing models</li>
              <li>Focus on user experience and convenience</li>
              <li>Develop alternative monetization strategies</li>
            </ul>
            
            <p>As the digital content landscape continues to evolve, the balance between accessibility and monetization will remain a central challenge for content creators and platforms alike.</p>
            
            <div class="article-footer">
              <p><em>This article is part of our ongoing series on web security and content monetization. Subscribe to access our full library of premium content.</em></p>
            </div>
          </div>
        </article>
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

  // Add styles for the content simulation
  addContentSimulationStyles();

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

/**
 * Add styles for the content simulation
 */
function addContentSimulationStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .content-simulation {
      background: white;
      border: 1px solid #e9ecef;
      border-radius: 8px;
      padding: 2rem;
      margin: 1rem 0;
      max-height: 600px;
      overflow-y: auto;
      position: relative;
    }

    .simulated-article {
      font-family: 'Georgia', serif;
      line-height: 1.6;
      color: #333;
    }

    .article-header {
      margin-bottom: 2rem;
      border-bottom: 2px solid #fbbf24;
      padding-bottom: 1rem;
    }

    .article-title {
      font-size: 2.5rem;
      font-weight: 700;
      color: #1e3a8a;
      margin-bottom: 1rem;
      line-height: 1.2;
    }

    .article-meta {
      display: flex;
      gap: 1rem;
      color: #6c757d;
      font-size: 0.9rem;
    }

    .article-meta span {
      display: flex;
      align-items: center;
    }

    .article-meta span:not(:last-child)::after {
      content: '•';
      margin-left: 1rem;
      color: #dee2e6;
    }

    .article-content {
      font-size: 1.1rem;
    }

    .lead {
      font-size: 1.3rem;
      font-weight: 500;
      color: #495057;
      margin-bottom: 2rem;
      font-style: italic;
    }

    .article-content h2 {
      font-size: 1.8rem;
      font-weight: 600;
      color: #1e3a8a;
      margin: 2rem 0 1rem 0;
      border-left: 4px solid #fbbf24;
      padding-left: 1rem;
    }

    .article-content h3 {
      font-size: 1.4rem;
      font-weight: 600;
      color: #495057;
      margin: 1.5rem 0 0.75rem 0;
    }

    .article-content p {
      margin-bottom: 1rem;
    }

    .article-content ul {
      margin: 1rem 0;
      padding-left: 2rem;
    }

    .article-content li {
      margin-bottom: 0.5rem;
    }

    .article-footer {
      margin-top: 3rem;
      padding-top: 2rem;
      border-top: 1px solid #e9ecef;
      background: #f8f9fa;
      padding: 1.5rem;
      border-radius: 6px;
    }

    .article-footer p {
      margin: 0;
      color: #6c757d;
      font-style: italic;
    }

    /* Paywall overlay styles */
    .paywall-overlay {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.8);
      backdrop-filter: blur(5px);
      z-index: 1000;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 8px;
    }

    .paywall-modal {
      background: white;
      padding: 2rem;
      border-radius: 8px;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
      max-width: 400px;
      text-align: center;
    }

    .paywall-modal h3 {
      color: #1e3a8a;
      margin-bottom: 1rem;
    }

    .paywall-modal p {
      color: #6c757d;
      margin-bottom: 1.5rem;
    }

    .paywall-modal button {
      background: #fbbf24;
      color: #1e3a8a;
      border: none;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-weight: 600;
      cursor: pointer;
      margin: 0 0.5rem;
      transition: background-color 0.3s ease;
    }

    .paywall-modal button:hover {
      background: #f59e0b;
    }

    .paywall-modal button.secondary {
      background: #6c757d;
      color: white;
    }

    .paywall-modal button.secondary:hover {
      background: #5a6268;
    }

    /* Meter indicator */
    .meter-indicator {
      position: absolute;
      top: 1rem;
      right: 1rem;
      background: rgba(0, 0, 0, 0.8);
      color: white;
      padding: 0.5rem 1rem;
      border-radius: 4px;
      font-size: 0.9rem;
      z-index: 1001;
    }
  `;
  document.head.appendChild(style);
} 