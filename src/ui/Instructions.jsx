import React from 'react';

/**
 * Instructions Component - Soft Paywall Testing Guide
 */
export function Instructions() {
  return (
    <div className="instructions-panel">
      <div className="panel-header">
        <h2>📖 Soft Paywall Testing Guide</h2>
        <p>Learn how to test and analyze soft paywall security using PayBreak</p>
      </div>

      <div className="instructions-content">
        <div className="instruction-section">
          <h3>🎯 What is a Soft Paywall?</h3>
          <p>
            A <strong>soft paywall</strong> is a client-side content restriction mechanism that 
            prevents users from accessing premium content without a subscription. Unlike hard paywalls 
            that block content at the server level, soft paywalls rely on JavaScript and browser 
            storage to enforce restrictions.
          </p>
          <div className="info-box">
            <h4>Key Characteristics:</h4>
            <ul>
              <li>Content is loaded but hidden/blocked by JavaScript</li>
              <li>Uses browser storage (localStorage, sessionStorage, cookies)</li>
              <li>Can be bypassed by modifying client-side code</li>
              <li>Often implemented with CSS classes or DOM manipulation</li>
            </ul>
          </div>
        </div>

        <div className="instruction-section">
          <h3>🔧 How to Use PayBreak</h3>
          <div className="step-list">
            <div className="step">
              <div className="step-number">1</div>
              <div className="step-content">
                <h4>Initialize the Framework</h4>
                <p>Click "Initialize Framework" to start the PayBreak testing environment.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">2</div>
              <div className="step-content">
                <h4>Apply Soft Paywall</h4>
                <p>Use the "Apply Paywall" button to simulate a soft paywall on the current page.</p>
              </div>
            </div>

            <div className="step">
              <div className="step-number">3</div>
              <div className="step-content">
                <h4>Test Bypass Techniques</h4>
                <p>Click "Test Bypass" to automatically attempt various bypass methods:</p>
                <ul>
                  <li><strong>Storage Manipulation:</strong> Clear/modify localStorage and sessionStorage</li>
                  <li><strong>DOM Inspection:</strong> Find and modify paywall-related elements</li>
                  <li><strong>CSS Override:</strong> Remove hiding styles and overlays</li>
                  <li><strong>JavaScript Injection:</strong> Override paywall functions</li>
                </ul>
              </div>
            </div>

            <div className="step">
              <div className="step-number">4</div>
              <div className="step-content">
                <h4>Analyze Results</h4>
                <p>Review the analysis panel to see success rates, effective techniques, and security recommendations.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="instruction-section">
          <h3>🛡️ Security Testing Techniques</h3>
          <div className="techniques-grid">
            <div className="technique-card">
              <h4>🔍 Storage Analysis</h4>
              <p>Inspect browser storage for paywall-related keys and values that control access.</p>
              <code>localStorage.getItem('paywall_status')</code>
            </div>

            <div className="technique-card">
              <h4>🎨 CSS Override</h4>
              <p>Remove or override CSS classes that hide content behind paywalls.</p>
              <code>.paywall-overlay {'{'} display: none !important; {'}'}</code>
            </div>

            <div className="technique-card">
              <h4>⚡ JavaScript Injection</h4>
              <p>Override JavaScript functions that enforce paywall restrictions.</p>
              <code>window.checkPaywall = () ={'>'} true;</code>
            </div>

            <div className="technique-card">
              <h4>🔧 DOM Manipulation</h4>
              <p>Remove or modify DOM elements that create paywall barriers.</p>
              <code>document.querySelector('.paywall').remove();</code>
            </div>
          </div>
        </div>

        <div className="instruction-section">
          <h3>📊 Understanding Results</h3>
          <div className="results-guide">
            <div className="result-item">
              <h4>Success Rate</h4>
              <p>The percentage of bypass attempts that successfully accessed content.</p>
              <ul>
                <li><strong>0-20%:</strong> Well-protected paywall</li>
                <li><strong>20-50%:</strong> Moderate protection</li>
                <li><strong>50%+:</strong> Vulnerable to bypass</li>
              </ul>
            </div>

            <div className="result-item">
              <h4>Effective Techniques</h4>
              <p>Which bypass methods were most successful against this paywall.</p>
            </div>

            <div className="result-item">
              <h4>Recommendations</h4>
              <p>Security suggestions based on the testing results.</p>
            </div>
          </div>
        </div>

        <div className="instruction-section">
          <h3>⚠️ Important Notes</h3>
          <div className="warning-box">
            <ul>
              <li><strong>Educational Purpose:</strong> This tool is designed for security research and educational purposes only.</li>
              <li><strong>Ethical Use:</strong> Only test paywalls on websites you own or have explicit permission to test.</li>
              <li><strong>Legal Compliance:</strong> Ensure your testing complies with applicable laws and terms of service.</li>
              <li><strong>Responsible Disclosure:</strong> If you find vulnerabilities, report them through proper channels.</li>
            </ul>
          </div>
        </div>

        <div className="instruction-section">
          <h3>🔗 Additional Resources</h3>
          <div className="resources-list">
            <a href="#" className="resource-link">📚 Web Security Fundamentals</a>
            <a href="#" className="resource-link">🛡️ Content Protection Best Practices</a>
            <a href="#" className="resource-link">🔍 Client-Side Security Analysis</a>
            <a href="#" className="resource-link">📖 Responsible Security Research</a>
          </div>
        </div>
      </div>
    </div>
  );
} 