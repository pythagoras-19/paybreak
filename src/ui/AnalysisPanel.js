/**
 * Create the analysis panel
 */
export function createAnalysisPanel(framework, container) {
  container.innerHTML = `
    <div class="card">
      <h2>🔍 Analysis & Insights</h2>
      <p>Comprehensive analysis of bypass attempts, vulnerabilities, and recommendations.</p>
    </div>

    <div class="grid">
      <div class="card">
        <h3>📊 Overall Success Rate</h3>
        <div class="success-rate-display">
          <div class="success-circle">
            <div class="success-percentage" id="overall-success-rate">0%</div>
          </div>
          <div class="success-stats">
            <div class="stat">
              <span class="stat-label">Total Attempts:</span>
              <span class="stat-value" id="total-attempts-analysis">0</span>
            </div>
            <div class="stat">
              <span class="stat-label">Successful:</span>
              <span class="stat-value" id="successful-attempts-analysis">0</span>
            </div>
            <div class="stat">
              <span class="stat-label">Failed:</span>
              <span class="stat-value" id="failed-attempts-analysis">0</span>
            </div>
          </div>
        </div>
      </div>

      <div class="card">
        <h3>🎯 Most Effective Techniques</h3>
        <div id="effective-techniques-analysis">
          <p>No data available yet</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>🔒 Paywall Vulnerability Analysis</h3>
      <div id="vulnerability-analysis">
        <p>No vulnerability data available yet</p>
      </div>
    </div>

    <div class="card">
      <h3>💡 Recommendations</h3>
      <div id="recommendations">
        <p>No recommendations available yet</p>
      </div>
    </div>

    <div class="grid">
      <div class="card">
        <h3>📈 Technique Performance by Category</h3>
        <div id="category-performance">
          <p>No category data available yet</p>
        </div>
      </div>

      <div class="card">
        <h3>⏱️ Performance Metrics</h3>
        <div id="performance-metrics">
          <p>No performance data available yet</p>
        </div>
      </div>
    </div>

    <div class="card">
      <h3>📋 Detailed Analysis Report</h3>
      <div class="form-group">
        <button class="btn success" id="generate-report">📄 Generate Full Report</button>
        <button class="btn" id="export-analysis">📤 Export Analysis</button>
        <button class="btn secondary" id="print-report">🖨️ Print Report</button>
      </div>
      <div id="detailed-report">
        <p>Click "Generate Full Report" to create a comprehensive analysis.</p>
      </div>
    </div>
  `;

  // Add analysis-specific styles
  addAnalysisStyles();

  // Setup event listeners
  setupAnalysisEvents(framework, container);

  // Start updates
  updateAnalysis(framework);
  setInterval(() => updateAnalysis(framework), 10000);
}

/**
 * Add analysis-specific styles
 */
function addAnalysisStyles() {
  const style = document.createElement('style');
  style.textContent = `
    .success-rate-display {
      display: flex;
      align-items: center;
      gap: 2rem;
    }

    .success-circle {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      background: conic-gradient(#28a745 0deg, #28a745 0deg, #e9ecef 0deg);
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;
    }

    .success-circle::before {
      content: '';
      position: absolute;
      width: 80px;
      height: 80px;
      border-radius: 50%;
      background: white;
    }

    .success-percentage {
      position: relative;
      z-index: 1;
      font-size: 1.5rem;
      font-weight: 700;
      color: #2c3e50;
    }

    .success-stats {
      flex: 1;
    }

    .stat {
      display: flex;
      justify-content: space-between;
      margin-bottom: 0.5rem;
      padding: 0.5rem 0;
      border-bottom: 1px solid #e9ecef;
    }

    .stat-label {
      font-weight: 500;
      color: #6c757d;
    }

    .stat-value {
      font-weight: 600;
      color: #2c3e50;
    }

    .technique-ranking {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .technique-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.75rem;
      background: #f8f9fa;
      border-radius: 6px;
      border-left: 4px solid #667eea;
    }

    .technique-name {
      font-weight: 500;
      color: #2c3e50;
    }

    .technique-score {
      background: #667eea;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
    }

    .vulnerability-item {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1rem;
    }

    .vulnerability-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .vulnerability-type {
      font-weight: 600;
      color: #2c3e50;
    }

    .vulnerability-risk {
      padding: 0.25rem 0.5rem;
      border-radius: 12px;
      font-size: 0.8rem;
      font-weight: 600;
      text-transform: uppercase;
    }

    .risk-high {
      background: #f8d7da;
      color: #721c24;
    }

    .risk-medium {
      background: #fff3cd;
      color: #856404;
    }

    .risk-low {
      background: #d4edda;
      color: #155724;
    }

    .recommendation-item {
      background: #f8f9fa;
      border: 1px solid #e9ecef;
      border-radius: 6px;
      padding: 1rem;
      margin-bottom: 1rem;
      border-left: 4px solid #667eea;
    }

    .recommendation-type {
      font-weight: 600;
      color: #667eea;
      margin-bottom: 0.5rem;
    }

    .recommendation-message {
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .recommendation-suggestion {
      color: #6c757d;
      font-size: 0.9rem;
      font-style: italic;
    }

    .category-chart {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
      gap: 1rem;
    }

    .category-item {
      text-align: center;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 6px;
      border: 1px solid #e9ecef;
    }

    .category-name {
      font-weight: 600;
      color: #2c3e50;
      margin-bottom: 0.5rem;
    }

    .category-success-rate {
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 0.25rem;
    }

    .category-attempts {
      font-size: 0.8rem;
      color: #6c757d;
    }

    .performance-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .performance-item {
      text-align: center;
      padding: 1rem;
      background: #f8f9fa;
      border-radius: 6px;
      border: 1px solid #e9ecef;
    }

    .performance-value {
      font-size: 1.5rem;
      font-weight: 700;
      color: #667eea;
      margin-bottom: 0.25rem;
    }

    .performance-label {
      font-size: 0.9rem;
      color: #6c757d;
      font-weight: 500;
    }

    .report-section {
      margin-bottom: 2rem;
    }

    .report-section h4 {
      color: #2c3e50;
      border-bottom: 2px solid #667eea;
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
    }

    .report-table {
      width: 100%;
      border-collapse: collapse;
      margin: 1rem 0;
    }

    .report-table th,
    .report-table td {
      padding: 0.75rem;
      text-align: left;
      border-bottom: 1px solid #e9ecef;
    }

    .report-table th {
      background: #f8f9fa;
      font-weight: 600;
      color: #2c3e50;
    }

    .report-table tr:hover {
      background: #f8f9fa;
    }
  `;
  document.head.appendChild(style);
}

/**
 * Setup analysis event listeners
 */
function setupAnalysisEvents(framework, container) {
  // Generate report
  container.querySelector('#generate-report').addEventListener('click', async () => {
    const button = container.querySelector('#generate-report');
    const originalText = button.textContent;
    
    button.disabled = true;
    button.innerHTML = '<span class="spinner"></span> Generating...';
    
    try {
      const report = framework.getAnalysisReport();
      displayDetailedReport(report);
    } catch (error) {
      console.error('Failed to generate report:', error);
    } finally {
      button.disabled = false;
      button.textContent = originalText;
    }
  });

  // Export analysis
  container.querySelector('#export-analysis').addEventListener('click', () => {
    const report = framework.getAnalysisReport();
    const data = JSON.stringify(report, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `paybreak-analysis-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  });

  // Print report
  container.querySelector('#print-report').addEventListener('click', () => {
    window.print();
  });
}

/**
 * Update analysis data
 */
function updateAnalysis(framework) {
  const bypassReport = framework.getBypassReport();
  const analysisReport = framework.getAnalysisReport();

  // Update success rate display
  updateSuccessRateDisplay(bypassReport);
  
  // Update effective techniques
  updateEffectiveTechniquesAnalysis(analysisReport.analysis.mostEffectiveTechniques);
  
  // Update vulnerability analysis
  updateVulnerabilityAnalysis(analysisReport.analysis.paywallVulnerabilities);
  
  // Update recommendations
  updateRecommendations(analysisReport.analysis.recommendations);
  
  // Update category performance
  updateCategoryPerformance(bypassReport.techniquesByCategory);
  
  // Update performance metrics
  updatePerformanceMetrics(framework);
}

/**
 * Update success rate display
 */
function updateSuccessRateDisplay(bypassReport) {
  const successRate = bypassReport.successRate;
  const totalAttempts = bypassReport.totalAttempts;
  const successfulAttempts = bypassReport.successfulAttempts;
  const failedAttempts = totalAttempts - successfulAttempts;

  // Update percentage
  document.getElementById('overall-success-rate').textContent = `${successRate.toFixed(1)}%`;

  // Update circle background
  const circle = document.querySelector('.success-circle');
  const degrees = (successRate / 100) * 360;
  circle.style.background = `conic-gradient(#28a745 0deg, #28a745 ${degrees}deg, #e9ecef ${degrees}deg)`;

  // Update stats
  document.getElementById('total-attempts-analysis').textContent = totalAttempts;
  document.getElementById('successful-attempts-analysis').textContent = successfulAttempts;
  document.getElementById('failed-attempts-analysis').textContent = failedAttempts;
}

/**
 * Update effective techniques analysis
 */
function updateEffectiveTechniquesAnalysis(techniques) {
  const container = document.getElementById('effective-techniques-analysis');
  
  if (techniques.length === 0) {
    container.innerHTML = '<p>No data available yet</p>';
    return;
  }

  const html = `
    <div class="technique-ranking">
      ${techniques.map((technique, index) => `
        <div class="technique-item">
          <div class="technique-name">${index + 1}. ${technique.technique}</div>
          <div class="technique-score">${technique.successCount} successes</div>
        </div>
      `).join('')}
    </div>
  `;
  
  container.innerHTML = html;
}

/**
 * Update vulnerability analysis
 */
function updateVulnerabilityAnalysis(vulnerabilities) {
  const container = document.getElementById('vulnerability-analysis');
  
  if (Object.keys(vulnerabilities).length === 0) {
    container.innerHTML = '<p>No vulnerability data available yet</p>';
    return;
  }

  const html = Object.entries(vulnerabilities).map(([paywallType, data]) => {
    const successRate = (data.successful / data.total) * 100;
    let riskClass = 'risk-low';
    let riskText = 'Low Risk';
    
    if (successRate > 50) {
      riskClass = 'risk-high';
      riskText = 'High Risk';
    } else if (successRate > 20) {
      riskClass = 'risk-medium';
      riskText = 'Medium Risk';
    }

    return `
      <div class="vulnerability-item">
        <div class="vulnerability-header">
          <div class="vulnerability-type">${paywallType} Paywall</div>
          <div class="vulnerability-risk ${riskClass}">${riskText}</div>
        </div>
        <div>Success Rate: ${successRate.toFixed(1)}% (${data.successful}/${data.total} attempts)</div>
        <div>Most used techniques: ${Object.entries(data.techniques)
          .sort(([,a], [,b]) => b - a)
          .slice(0, 3)
          .map(([technique, count]) => `${technique} (${count})`)
          .join(', ')}</div>
      </div>
    `;
  }).join('');
  
  container.innerHTML = html;
}

/**
 * Update recommendations
 */
function updateRecommendations(recommendations) {
  const container = document.getElementById('recommendations');
  
  if (recommendations.length === 0) {
    container.innerHTML = '<p>No recommendations available yet</p>';
    return;
  }

  const html = recommendations.map(rec => `
    <div class="recommendation-item">
      <div class="recommendation-type">${rec.type.replace('_', ' ').toUpperCase()}</div>
      <div class="recommendation-message">${rec.message}</div>
      <div class="recommendation-suggestion">${rec.suggestion}</div>
    </div>
  `).join('');
  
  container.innerHTML = html;
}

/**
 * Update category performance
 */
function updateCategoryPerformance(categories) {
  const container = document.getElementById('category-performance');
  
  if (Object.keys(categories).length === 0) {
    container.innerHTML = '<p>No category data available yet</p>';
    return;
  }

  const html = `
    <div class="category-chart">
      ${Object.entries(categories).map(([category, data]) => {
        const successRate = data.total > 0 ? (data.successful / data.total * 100) : 0;
        return `
          <div class="category-item">
            <div class="category-name">${category}</div>
            <div class="category-success-rate">${successRate.toFixed(1)}%</div>
            <div class="category-attempts">${data.successful}/${data.total} successful</div>
          </div>
        `;
      }).join('')}
    </div>
  `;
  
  container.innerHTML = html;
}

/**
 * Update performance metrics
 */
function updatePerformanceMetrics(framework) {
  const container = document.getElementById('performance-metrics');
  const history = framework.bypassEngine.getExecutionHistory();
  
  if (history.length === 0) {
    container.innerHTML = '<p>No performance data available yet</p>';
    return;
  }

  // Calculate metrics
  const avgExecutionTime = history.reduce((sum, exec) => sum + exec.executionTime, 0) / history.length;
  const fastestExecution = Math.min(...history.map(exec => exec.executionTime));
  const slowestExecution = Math.max(...history.map(exec => exec.executionTime));
  const totalExecutionTime = history.reduce((sum, exec) => sum + exec.executionTime, 0);

  const html = `
    <div class="performance-grid">
      <div class="performance-item">
        <div class="performance-value">${avgExecutionTime.toFixed(0)}ms</div>
        <div class="performance-label">Average Execution Time</div>
      </div>
      <div class="performance-item">
        <div class="performance-value">${fastestExecution}ms</div>
        <div class="performance-label">Fastest Execution</div>
      </div>
      <div class="performance-item">
        <div class="performance-value">${slowestExecution}ms</div>
        <div class="performance-label">Slowest Execution</div>
      </div>
      <div class="performance-item">
        <div class="performance-value">${totalExecutionTime.toFixed(0)}ms</div>
        <div class="performance-label">Total Execution Time</div>
      </div>
    </div>
  `;
  
  container.innerHTML = html;
}

/**
 * Display detailed report
 */
function displayDetailedReport(report) {
  const container = document.getElementById('detailed-report');
  
  const html = `
    <div class="report-section">
      <h4>Executive Summary</h4>
      <p>Framework Version: ${report.framework.version}</p>
      <p>Session Duration: ${report.framework.session ? Math.round(report.framework.session.duration / 1000) : 0}s</p>
      <p>Overall Success Rate: ${report.analysis.successRate.toFixed(1)}%</p>
    </div>

    <div class="report-section">
      <h4>Bypass Attempts Summary</h4>
      <table class="report-table">
        <thead>
          <tr>
            <th>Metric</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total Attempts</td>
            <td>${report.bypass.totalAttempts}</td>
          </tr>
          <tr>
            <td>Successful Bypasses</td>
            <td>${report.bypass.successfulAttempts}</td>
          </tr>
          <tr>
            <td>Success Rate</td>
            <td>${report.bypass.successRate.toFixed(1)}%</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div class="report-section">
      <h4>Most Effective Techniques</h4>
      <table class="report-table">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Technique</th>
            <th>Success Count</th>
          </tr>
        </thead>
        <tbody>
          ${report.analysis.mostEffectiveTechniques.map((technique, index) => `
            <tr>
              <td>${index + 1}</td>
              <td>${technique.technique}</td>
              <td>${technique.successCount}</td>
            </tr>
          `).join('')}
        </tbody>
      </table>
    </div>

    <div class="report-section">
      <h4>Vulnerability Analysis</h4>
      ${Object.entries(report.analysis.paywallVulnerabilities).map(([paywallType, data]) => `
        <h5>${paywallType} Paywall</h5>
        <p>Success Rate: ${(data.successful / data.total * 100).toFixed(1)}% (${data.successful}/${data.total} attempts)</p>
      `).join('')}
    </div>

    <div class="report-section">
      <h4>Recommendations</h4>
      ${report.analysis.recommendations.map(rec => `
        <div class="recommendation-item">
          <div class="recommendation-type">${rec.type.toUpperCase()}</div>
          <div class="recommendation-message">${rec.message}</div>
          <div class="recommendation-suggestion">${rec.suggestion}</div>
        </div>
      `).join('')}
    </div>

    <div class="report-section">
      <h4>Generated At</h4>
      <p>${new Date(report.timestamp).toLocaleString()}</p>
    </div>
  `;
  
  container.innerHTML = html;
} 