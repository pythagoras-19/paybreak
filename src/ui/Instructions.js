/**
 * Create the instructions manual panel
 */
export function createInstructions(framework, container) {
  container.innerHTML = `
    <div class="card">
      <h2>📖 PayBreak Instruction Manual</h2>
      <p class="lead">A comprehensive guide to using PayBreak for paywall security research and learning.</p>
    </div>

    <div class="card">
      <h3>🎯 Table of Contents</h3>
      <div class="toc">
        <a href="#what-is-paybreak" class="toc-item">What is PayBreak?</a>
        <a href="#getting-started" class="toc-item">Getting Started</a>
        <a href="#dashboard-guide" class="toc-item">Dashboard Guide</a>
        <a href="#paywall-simulator" class="toc-item">Paywall Simulator</a>
        <a href="#bypass-engine" class="toc-item">Bypass Engine</a>
        <a href="#telemetry-viewer" class="toc-item">Telemetry Viewer</a>
        <a href="#analysis-panel" class="toc-item">Analysis Panel</a>
        <a href="#logging-system" class="toc-item">Logging System</a>
        <a href="#best-practices" class="toc-item">Best Practices</a>
        <a href="#troubleshooting" class="toc-item">Troubleshooting</a>
      </div>
    </div>

    <div id="what-is-paybreak" class="section">
      <div class="card">
        <h3>🧩 What is PayBreak?</h3>
        <p>PayBreak is a comprehensive <strong>paywall security research framework</strong> designed to help you understand how paywalls work and test bypass techniques in a safe, controlled environment.</p>
        
        <h4>🎯 Purpose</h4>
        <ul>
          <li><strong>Educational Tool:</strong> Learn about web security and paywall vulnerabilities</li>
          <li><strong>Research Platform:</strong> Test and analyze bypass techniques systematically</li>
          <li><strong>Development Aid:</strong> Help developers build more secure paywalls</li>
          <li><strong>Security Training:</strong> Understand real-world security challenges</li>
        </ul>

        <h4>🔒 What We're Testing</h4>
        <p>PayBreak simulates real-world paywalls like those found on:</p>
        <ul>
          <li><strong>News Sites:</strong> NYT, WSJ, Medium, Bloomberg</li>
          <li><strong>Content Platforms:</strong> Substack, Patreon, premium blogs</li>
          <li><strong>Subscription Services:</strong> Any site that restricts content access</li>
        </ul>

        <div class="info-box">
          <h4>⚠️ Important Note</h4>
          <p>This tool is for <strong>educational and research purposes only</strong>. Always respect website terms of service and use this knowledge responsibly to improve security, not circumvent legitimate business models.</p>
        </div>
      </div>
    </div>

    <div id="getting-started" class="section">
      <div class="card">
        <h3>🚀 Getting Started</h3>
        
        <h4>📋 Prerequisites</h4>
        <ul>
          <li>Modern web browser (Chrome, Firefox, Safari, Edge)</li>
          <li>Basic understanding of web technologies (helpful but not required)</li>
          <li>Curiosity about web security</li>
        </ul>

        <h4>🎮 Quick Start (5 minutes)</h4>
        <div class="step-by-step">
          <div class="step">
            <div class="step-number">1</div>
            <div class="step-content">
              <h5>Open the Application</h5>
              <p>Navigate to the PayBreak application in your browser</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">2</div>
            <div class="step-content">
              <h5>Check Dashboard</h5>
              <p>Verify the framework status shows "Active" in the Dashboard</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">3</div>
            <div class="step-content">
              <h5>Test a Paywall</h5>
              <p>Click "Test Soft" under Soft Paywall to see a paywall in action</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">4</div>
            <div class="step-content">
              <h5>Try Bypass</h5>
              <p>Go to Bypass Engine and click "Execute All Techniques"</p>
            </div>
          </div>
          <div class="step">
            <div class="step-number">5</div>
            <div class="step-content">
              <h5>Observe Results</h5>
              <p>Watch the paywall get bypassed and content become visible</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id="dashboard-guide" class="section">
      <div class="card">
        <h3>📊 Dashboard Guide</h3>
        <p>The Dashboard is your command center for PayBreak operations.</p>

        <h4>🎛️ Quick Actions</h4>
        <div class="feature-grid">
          <div class="feature">
            <h5>🚀 Run Full Test Suite</h5>
            <p>Automatically tests all paywall types and bypass techniques. Perfect for comprehensive analysis.</p>
          </div>
          <div class="feature">
            <h5>🔄 Start Auto-Fuzzing</h5>
            <p>Begins automated testing with random variations to discover new bypass vectors.</p>
          </div>
          <div class="feature">
            <h5>📤 Export Data</h5>
            <p>Downloads your research data as JSON for external analysis.</p>
          </div>
          <div class="feature">
            <h5>🔄 Reset Framework</h5>
            <p>Clears all data and starts fresh. Use when you want a clean slate.</p>
          </div>
        </div>

        <h4>📈 Live Metrics</h4>
        <ul>
          <li><strong>Bypass Attempts:</strong> Total number of bypass techniques executed</li>
          <li><strong>Successful Bypasses:</strong> Number of successful bypass attempts</li>
          <li><strong>Success Rate:</strong> Percentage of successful bypasses</li>
          <li><strong>Telemetry Records:</strong> Total number of logged events</li>
        </ul>

        <h4>🧱 Paywall Types</h4>
        <div class="paywall-types">
          <div class="paywall-type">
            <h5>🧱 Soft Paywall</h5>
            <p>Blur + modal overlay (like Medium, NYT)</p>
            <button class="btn" onclick="testSoftPaywall()">Test Now</button>
          </div>
          <div class="paywall-type">
            <h5>📊 Metered Paywall</h5>
            <p>Count-based access (3 free articles, then pay)</p>
            <button class="btn" onclick="testMeteredPaywall()">Test Now</button>
          </div>
          <div class="paywall-type">
            <h5>🔒 Hard Paywall</h5>
            <p>Redirect/block content (like WSJ)</p>
            <button class="btn" onclick="testHardPaywall()">Test Now</button>
          </div>
          <div class="paywall-type">
            <h5>🔐 Obfuscated</h5>
            <p>JavaScript obfuscation techniques</p>
            <button class="btn" onclick="testObfuscatedPaywall()">Test Now</button>
          </div>
        </div>

        <h4>📊 Logging Status</h4>
        <p>The Dashboard also shows real-time logging information:</p>
        <ul>
          <li><strong>Log Level:</strong> Current logging verbosity (Debug/Info/Warn/Error)</li>
          <li><strong>Log Entries:</strong> Total number of logged events</li>
          <li><strong>Errors:</strong> Number of errors encountered</li>
          <li><strong>Memory Usage:</strong> Current memory consumption</li>
        </ul>
      </div>
    </div>

    <div id="paywall-simulator" class="section">
      <div class="card">
        <h3>🧱 Paywall Simulator</h3>
        <p>The Paywall Simulator is where you can configure and test different types of paywalls on realistic content.</p>

        <h4>📰 Simulated Content</h4>
        <p>The simulator includes a realistic article about paywall security that serves as your "premium content" for testing. This makes the experience much more authentic than testing on dummy content.</p>

        <h4>⚙️ Configuration Options</h4>
        <div class="config-options">
          <div class="config-group">
            <h5>🧱 Soft Paywall Settings</h5>
            <ul>
              <li><strong>Blur Intensity:</strong> How much the content is blurred (1-20px)</li>
              <li><strong>Overlay Opacity:</strong> Darkness of the overlay (0-1)</li>
              <li><strong>Modal Enabled:</strong> Show subscription popup</li>
              <li><strong>Dismissible:</strong> Allow users to close the paywall</li>
            </ul>
          </div>
          <div class="config-group">
            <h5>📊 Metered Paywall Settings</h5>
            <ul>
              <li><strong>Free Articles:</strong> Number of free articles allowed</li>
              <li><strong>Reset Interval:</strong> When the counter resets (hours)</li>
              <li><strong>Storage Key:</strong> Where the count is stored</li>
            </ul>
          </div>
        </div>

        <h4>🎯 How to Use</h4>
        <ol>
          <li><strong>Select Paywall Type:</strong> Choose from the dropdown menu</li>
          <li><strong>Configure Settings:</strong> Adjust parameters in the tabs below</li>
          <li><strong>Apply Paywall:</strong> Click "Apply Paywall" to see it in action</li>
          <li><strong>Observe Effect:</strong> Watch how the content gets blocked</li>
          <li><strong>Test Bypasses:</strong> Go to Bypass Engine to try bypassing it</li>
        </ol>

        <h4>📋 Paywall Templates</h4>
        <p>Quick-start templates that simulate real-world paywalls:</p>
        <ul>
          <li><strong>NYT Style:</strong> Soft paywall with metered access</li>
          <li><strong>Medium Style:</strong> Metered paywall with overlay</li>
          <li><strong>WSJ Style:</strong> Hard paywall with redirect</li>
          <li><strong>Substack Style:</strong> Server-validated with tokens</li>
        </ul>
      </div>
    </div>

    <div id="bypass-engine" class="section">
      <div class="card">
        <h3>🧪 Bypass Engine</h3>
        <p>The Bypass Engine executes various techniques to attempt to bypass paywalls.</p>

        <h4>🔧 Bypass Techniques</h4>
        <div class="technique-categories">
          <div class="technique-category">
            <h5>🌐 DOM Manipulation</h5>
            <ul>
              <li><strong>Element Removal:</strong> Remove paywall overlay elements</li>
              <li><strong>Unblur Content:</strong> Remove blur effects from content</li>
              <li><strong>Style Override:</strong> Override CSS styles that hide content</li>
            </ul>
          </div>
          <div class="technique-category">
            <h5>⚡ JavaScript Techniques</h5>
            <ul>
              <li><strong>Function Override:</strong> Override paywall functions</li>
              <li><strong>Property Hooks:</strong> Hook into object properties</li>
              <li><strong>Prototype Pollution:</strong> Attempt prototype pollution attacks</li>
            </ul>
          </div>
          <div class="technique-category">
            <h5>💾 Storage Manipulation</h5>
            <ul>
              <li><strong>Cookie Clearing:</strong> Remove paywall-related cookies</li>
              <li><strong>localStorage Reset:</strong> Clear article counters</li>
              <li><strong>sessionStorage Clear:</strong> Remove session data</li>
            </ul>
          </div>
          <div class="technique-category">
            <h5>🌍 Network Interception</h5>
            <ul>
              <li><strong>Fetch Override:</strong> Intercept network requests</li>
              <li><strong>XHR Override:</strong> Override XMLHttpRequest calls</li>
              <li><strong>Response Modification:</strong> Modify server responses</li>
            </ul>
          </div>
        </div>

        <h4>🎮 How to Use</h4>
        <ol>
          <li><strong>Apply a Paywall:</strong> First, apply a paywall in the Paywall Simulator</li>
          <li><strong>Choose Technique:</strong> Select individual techniques or run all</li>
          <li><strong>Execute:</strong> Click "Execute All Techniques" for comprehensive testing</li>
          <li><strong>Monitor Results:</strong> Watch the success/failure indicators</li>
          <li><strong>Check Telemetry:</strong> View detailed logs in the Telemetry tab</li>
        </ol>

        <h4>📊 Understanding Results</h4>
        <ul>
          <li><strong>Success:</strong> Technique successfully bypassed the paywall</li>
          <li><strong>Failure:</strong> Technique did not work against this paywall</li>
          <li><strong>Partial:</strong> Technique had some effect but didn't fully bypass</li>
        </ul>
      </div>
    </div>

    <div id="telemetry-viewer" class="section">
      <div class="card">
        <h3>📈 Telemetry Viewer</h3>
        <p>The Telemetry Viewer provides real-time monitoring and detailed logging of all framework activities.</p>

        <h4>📊 Overview Metrics</h4>
        <ul>
          <li><strong>Total Records:</strong> Number of logged events</li>
          <li><strong>Network Requests:</strong> HTTP requests and responses</li>
          <li><strong>Console Logs:</strong> JavaScript console output</li>
          <li><strong>DOM Changes:</strong> Document modifications</li>
        </ul>

        <h4>⚙️ Configuration Panel</h4>
        <div class="config-section">
          <h5>Log Level Control</h5>
          <ul>
            <li><strong>Debug:</strong> All events (most verbose)</li>
            <li><strong>Info:</strong> Important events and status changes</li>
            <li><strong>Warn:</strong> Warnings and potential issues</li>
            <li><strong>Error:</strong> Errors only (least verbose)</li>
          </ul>
        </div>

        <div class="config-section">
          <h5>Tracking Features</h5>
          <ul>
            <li><strong>Network Requests:</strong> Monitor HTTP traffic</li>
            <li><strong>Console Logs:</strong> Capture JavaScript output</li>
            <li><strong>DOM Mutations:</strong> Track page changes</li>
            <li><strong>Performance Metrics:</strong> Monitor timing data</li>
            <li><strong>User Interactions:</strong> Track clicks and inputs</li>
            <li><strong>Error Tracking:</strong> Capture errors and exceptions</li>
            <li><strong>Memory Usage:</strong> Monitor browser memory</li>
            <li><strong>Storage Changes:</strong> Track localStorage/sessionStorage</li>
          </ul>
        </div>

        <h4>📋 Data Tabs</h4>
        <div class="tab-descriptions">
          <div class="tab-desc">
            <h5>All Events</h5>
            <p>Comprehensive view of all logged events in chronological order</p>
          </div>
          <div class="tab-desc">
            <h5>Bypass Attempts</h5>
            <p>Detailed logs of bypass technique executions and results</p>
          </div>
          <div class="tab-desc">
            <h5>Network Activity</h5>
            <p>HTTP requests, responses, timing, and error information</p>
          </div>
          <div class="tab-desc">
            <h5>Console Logs</h5>
            <p>JavaScript console output with stack traces for errors</p>
          </div>
          <div class="tab-desc">
            <h5>DOM Mutations</h5>
            <p>Document changes, element additions/removals, attribute modifications</p>
          </div>
          <div class="tab-desc">
            <h5>Performance</h5>
            <p>Timing data, memory usage, and performance metrics</p>
          </div>
          <div class="tab-desc">
            <h5>User Interactions</h5>
            <p>Click, input, scroll, and other user action tracking</p>
          </div>
          <div class="tab-desc">
            <h5>Errors</h5>
            <p>Error logs with stack traces and detailed error information</p>
          </div>
        </div>

        <h4>🔍 Filtering and Search</h4>
        <ul>
          <li><strong>Event Type Filter:</strong> Filter by specific event types</li>
          <li><strong>Time Range:</strong> View events from specific time periods</li>
          <li><strong>Search:</strong> Search through telemetry data</li>
          <li><strong>Export:</strong> Download data for external analysis</li>
        </ul>
      </div>
    </div>

    <div id="analysis-panel" class="section">
      <div class="card">
        <h3>🔍 Analysis Panel</h3>
        <p>The Analysis Panel provides comprehensive reports and insights about your testing sessions.</p>

        <h4>📊 Report Types</h4>
        <ul>
          <li><strong>Bypass Success Analysis:</strong> Which techniques work best</li>
          <li><strong>Performance Metrics:</strong> Response times and efficiency</li>
          <li><strong>Error Analysis:</strong> Common issues and failures</li>
          <li><strong>User Behavior:</strong> Interaction patterns and usage</li>
        </ul>

        <h4>📈 Key Metrics</h4>
        <ul>
          <li><strong>Success Rates:</strong> Percentage of successful bypasses by technique</li>
          <li><strong>Performance Trends:</strong> How response times change over time</li>
          <li><strong>Error Patterns:</strong> Most common error types and frequencies</li>
          <li><strong>Memory Usage:</strong> Browser memory consumption patterns</li>
        </ul>

        <h4>💡 Recommendations</h4>
        <p>The system automatically analyzes your data and provides recommendations for:</p>
        <ul>
          <li><strong>Performance Optimization:</strong> Ways to improve response times</li>
          <li><strong>Error Prevention:</strong> How to avoid common issues</li>
          <li><strong>Security Improvements:</strong> Suggestions for better paywall design</li>
          <li><strong>Research Focus:</strong> Which areas to investigate further</li>
        </ul>
      </div>
    </div>

    <div id="logging-system" class="section">
      <div class="card">
        <h3>🔍 Logging System</h3>
        <p>PayBreak includes a comprehensive logging system that captures detailed information about all activities.</p>

        <h4>📊 What Gets Logged</h4>
        <ul>
          <li><strong>Network Requests:</strong> All HTTP requests with timing and status</li>
          <li><strong>Console Output:</strong> JavaScript logs with stack traces</li>
          <li><strong>DOM Changes:</strong> Page modifications and element updates</li>
          <li><strong>User Interactions:</strong> Clicks, inputs, scrolls, and other actions</li>
          <li><strong>Performance Data:</strong> Memory usage, response times, metrics</li>
          <li><strong>Error Information:</strong> Exceptions, failures, and issues</li>
          <li><strong>Storage Changes:</strong> localStorage and sessionStorage modifications</li>
        </ul>

        <h4>⚙️ Log Level Configuration</h4>
        <div class="log-levels">
          <div class="log-level">
            <h5>🐛 Debug</h5>
            <p>Most verbose - shows all events. Use during development and detailed analysis.</p>
          </div>
          <div class="log-level">
            <h5>ℹ️ Info</h5>
            <p>Important events and status changes. Good for general monitoring.</p>
          </div>
          <div class="log-level">
            <h5>⚠️ Warn</h5>
            <p>Warnings and potential issues. Use for production-like testing.</p>
          </div>
          <div class="log-level">
            <h5>❌ Error</h5>
            <p>Errors only. Use when you want minimal logging.</p>
          </div>
        </div>

        <h4>📤 Data Export</h4>
        <ul>
          <li><strong>JSON Export:</strong> Complete data in JSON format</li>
          <li><strong>CSV Export:</strong> Tabular data for spreadsheet analysis</li>
          <li><strong>Enhanced Reports:</strong> Comprehensive analysis reports</li>
          <li><strong>Filtered Exports:</strong> Export specific time ranges or event types</li>
        </ul>
      </div>
    </div>

    <div id="best-practices" class="section">
      <div class="card">
        <h3>🎯 Best Practices</h3>
        
        <h4>🔬 For Research</h4>
        <ul>
          <li><strong>Start Simple:</strong> Begin with basic paywall types before moving to complex ones</li>
          <li><strong>Document Everything:</strong> Use the logging system to capture all activities</li>
          <li><strong>Test Systematically:</strong> Use the full test suite for comprehensive analysis</li>
          <li><strong>Export Regularly:</strong> Save your data periodically for backup and analysis</li>
          <li><strong>Use Auto-Fuzzing:</strong> Let the system discover new bypass vectors automatically</li>
        </ul>

        <h4>🎓 For Learning</h4>
        <ul>
          <li><strong>Read the Content:</strong> The simulated article contains valuable information about paywall security</li>
          <li><strong>Experiment Freely:</strong> Try different combinations of paywalls and bypass techniques</li>
          <li><strong>Monitor Telemetry:</strong> Watch the real-time logs to understand what's happening</li>
          <li><strong>Analyze Failures:</strong> Failed bypass attempts can teach you about effective security measures</li>
          <li><strong>Use Templates:</strong> Start with the provided paywall templates to understand real-world implementations</li>
        </ul>

        <h4>⚡ For Performance</h4>
        <ul>
          <li><strong>Monitor Memory:</strong> Watch memory usage to prevent browser crashes</li>
          <li><strong>Clear Logs Periodically:</strong> Large log files can slow down the application</li>
          <li><strong>Use Appropriate Log Levels:</strong> Use Debug for development, Info for general use</li>
          <li><strong>Limit Auto-Fuzzing:</strong> Set reasonable limits to prevent excessive resource usage</li>
        </ul>

        <h4>🔒 For Security</h4>
        <ul>
          <li><strong>Use Responsibly:</strong> This tool is for education and research, not circumventing legitimate paywalls</li>
          <li><strong>Respect Terms of Service:</strong> Always follow website terms when doing real-world research</li>
          <li><strong>Report Vulnerabilities:</strong> If you find real vulnerabilities, report them responsibly</li>
          <li><strong>Focus on Defense:</strong> Use your knowledge to improve security, not exploit it</li>
        </ul>
      </div>
    </div>

    <div id="troubleshooting" class="section">
      <div class="card">
        <h3>🔧 Troubleshooting</h3>
        
        <h4>🚨 Common Issues</h4>
        <div class="troubleshooting-grid">
          <div class="issue">
            <h5>App Won't Load</h5>
            <p><strong>Symptoms:</strong> Stuck on loading screen</p>
            <p><strong>Solutions:</strong></p>
            <ul>
              <li>Check browser console for errors</li>
              <li>Try refreshing the page</li>
              <li>Ensure JavaScript is enabled</li>
              <li>Try a different browser</li>
            </ul>
          </div>
          <div class="issue">
            <h5>High Memory Usage</h5>
            <p><strong>Symptoms:</strong> Browser becomes slow or crashes</p>
            <p><strong>Solutions:</strong></p>
            <ul>
              <li>Clear telemetry data</li>
              <li>Reduce log level to Info or Warn</li>
              <li>Stop auto-fuzzing if running</li>
              <li>Refresh the page</li>
            </ul>
          </div>
          <div class="issue">
            <h5>Paywall Not Applying</h5>
            <p><strong>Symptoms:</strong> No visual change when applying paywall</p>
            <p><strong>Solutions:</strong></p>
            <ul>
              <li>Make sure you're on the Paywall Simulator page</li>
              <li>Check that the content simulation area is visible</li>
              <li>Try a different paywall type</li>
              <li>Check browser console for errors</li>
            </ul>
          </div>
          <div class="issue">
            <h5>Bypass Not Working</h5>
            <p><strong>Symptoms:</strong> Paywall remains after bypass attempt</p>
            <p><strong>Solutions:</strong></p>
            <ul>
              <li>Check telemetry for error messages</li>
              <li>Try individual techniques instead of "Execute All"</li>
              <li>Verify paywall is properly applied first</li>
              <li>Check if paywall type supports the technique</li>
            </ul>
          </div>
        </div>

        <h4>📞 Getting Help</h4>
        <ul>
          <li><strong>Check Console:</strong> Browser developer tools often show helpful error messages</li>
          <li><strong>Review Telemetry:</strong> The Telemetry tab shows detailed logs of what's happening</li>
          <li><strong>Start Fresh:</strong> Use the "Reset Framework" button to clear all data and start over</li>
          <li><strong>Document Issues:</strong> Note down steps to reproduce problems for better troubleshooting</li>
        </ul>
      </div>
    </div>

    <div class="card">
      <h3>🎉 Congratulations!</h3>
      <p>You've completed the PayBreak instruction manual. You now have the knowledge to effectively use this powerful security research tool.</p>
      
      <div class="next-steps">
        <h4>🚀 Next Steps</h4>
        <ol>
          <li><strong>Practice:</strong> Try the quick start guide to get hands-on experience</li>
          <li><strong>Experiment:</strong> Test different paywall types and bypass combinations</li>
          <li><strong>Learn:</strong> Read the simulated article content for deeper insights</li>
          <li><strong>Research:</strong> Use the comprehensive logging and analysis features</li>
          <li><strong>Share:</strong> Use your knowledge to improve web security</li>
        </ol>
      </div>
    </div>
  `;

  // Add styles for the instructions
  addInstructionStyles();

  // Setup smooth scrolling for table of contents
  setupTOCNavigation();
}

/**
 * Add styles for the instructions
 */
function addInstructionStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .lead {
      font-size: 1.2rem;
      color: #495057;
      margin-bottom: 2rem;
    }

    .toc {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .toc-item {
      color: #1e3a8a;
      text-decoration: none;
      padding: 0.5rem 1rem;
      border-radius: 6px;
      transition: all 0.3s ease;
      border-left: 3px solid transparent;
    }

    .toc-item:hover {
      background: rgba(251, 191, 36, 0.1);
      border-left-color: #fbbf24;
      color: #1e3a8a;
      text-decoration: none;
    }

    .section {
      margin-bottom: 3rem;
    }

    .step-by-step {
      display: flex;
      flex-direction: column;
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .step {
      display: flex;
      align-items: flex-start;
      gap: 1rem;
    }

    .step-number {
      background: #fbbf24;
      color: #1e3a8a;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      flex-shrink: 0;
    }

    .step-content h5 {
      margin: 0 0 0.5rem 0;
      color: #1e3a8a;
    }

    .step-content p {
      margin: 0;
      color: #6c757d;
    }

    .feature-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .feature {
      background: rgba(251, 191, 36, 0.05);
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid rgba(251, 191, 36, 0.2);
    }

    .feature h5 {
      color: #1e3a8a;
      margin: 0 0 1rem 0;
    }

    .feature p {
      margin: 0;
      color: #6c757d;
    }

    .paywall-types {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }

    .paywall-type {
      background: white;
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e9ecef;
      text-align: center;
    }

    .paywall-type h5 {
      color: #1e3a8a;
      margin: 0 0 0.5rem 0;
    }

    .paywall-type p {
      color: #6c757d;
      margin: 0 0 1rem 0;
      font-size: 0.9rem;
    }

    .technique-categories {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .technique-category {
      background: rgba(251, 191, 36, 0.05);
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid rgba(251, 191, 36, 0.2);
    }

    .technique-category h5 {
      color: #1e3a8a;
      margin: 0 0 1rem 0;
    }

    .config-options {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 2rem;
      margin: 2rem 0;
    }

    .config-group {
      background: rgba(255, 255, 255, 0.5);
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }

    .config-group h5 {
      color: #1e3a8a;
      margin: 0 0 1rem 0;
    }

    .config-section {
      margin: 2rem 0;
    }

    .config-section h5 {
      color: #1e3a8a;
      margin: 0 0 1rem 0;
    }

    .tab-descriptions {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }

    .tab-desc {
      background: rgba(255, 255, 255, 0.5);
      padding: 1rem;
      border-radius: 6px;
      border: 1px solid #e9ecef;
    }

    .tab-desc h5 {
      color: #1e3a8a;
      margin: 0 0 0.5rem 0;
      font-size: 0.9rem;
    }

    .tab-desc p {
      margin: 0;
      color: #6c757d;
      font-size: 0.85rem;
    }

    .log-levels {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
      margin: 2rem 0;
    }

    .log-level {
      background: rgba(255, 255, 255, 0.5);
      padding: 1rem;
      border-radius: 6px;
      border: 1px solid #e9ecef;
    }

    .log-level h5 {
      color: #1e3a8a;
      margin: 0 0 0.5rem 0;
    }

    .log-level p {
      margin: 0;
      color: #6c757d;
      font-size: 0.9rem;
    }

    .troubleshooting-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 1.5rem;
      margin: 2rem 0;
    }

    .issue {
      background: rgba(255, 255, 255, 0.5);
      padding: 1.5rem;
      border-radius: 8px;
      border: 1px solid #e9ecef;
    }

    .issue h5 {
      color: #dc3545;
      margin: 0 0 1rem 0;
    }

    .issue p {
      margin: 0 0 0.5rem 0;
      color: #6c757d;
    }

    .issue ul {
      margin: 0.5rem 0 0 0;
      padding-left: 1.5rem;
    }

    .info-box {
      background: rgba(251, 191, 36, 0.1);
      border: 1px solid rgba(251, 191, 36, 0.3);
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .info-box h4 {
      color: #856404;
      margin: 0 0 1rem 0;
    }

    .info-box p {
      margin: 0;
      color: #856404;
    }

    .next-steps {
      background: rgba(40, 167, 69, 0.1);
      border: 1px solid rgba(40, 167, 69, 0.3);
      border-radius: 8px;
      padding: 1.5rem;
      margin: 2rem 0;
    }

    .next-steps h4 {
      color: #155724;
      margin: 0 0 1rem 0;
    }

    .next-steps ol {
      margin: 0;
      color: #155724;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Setup table of contents navigation
 */
function setupTOCNavigation() {
  const tocLinks = document.querySelectorAll('.toc-item');
  
  tocLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetId = link.getAttribute('href').substring(1);
      const targetElement = document.getElementById(targetId);
      
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
} 