import React, { useState, useEffect } from 'react';

/**
 * Analysis Panel Component - Soft Paywall Analysis
 */
export function AnalysisPanel({ framework, sessionData }) {
  const [analysisData, setAnalysisData] = useState({
    successRate: 0,
    totalAttempts: 0,
    successfulAttempts: 0,
    failedAttempts: 0,
    techniques: [],
    vulnerabilities: [],
    recommendations: []
  });

  useEffect(() => {
    if (framework) {
      updateAnalysis();
    }
  }, [framework, sessionData]);

  const updateAnalysis = () => {
    if (!framework) return;

    const bypassResults = framework.getBypassResults();
    const totalAttempts = bypassResults.length;
    const successfulAttempts = bypassResults.filter(r => r.success).length;
    const successRate = totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0;

    // Get technique performance
    const techniqueStats = {};
    bypassResults.forEach(result => {
      if (!techniqueStats[result.technique]) {
        techniqueStats[result.technique] = { total: 0, successful: 0 };
      }
      techniqueStats[result.technique].total++;
      if (result.success) {
        techniqueStats[result.technique].successful++;
      }
    });

    const techniques = Object.entries(techniqueStats)
      .map(([name, stats]) => ({
        name,
        successRate: stats.total > 0 ? (stats.successful / stats.total) * 100 : 0,
        total: stats.total,
        successful: stats.successful
      }))
      .sort((a, b) => b.successRate - a.successRate);

    // Generate recommendations
    const recommendations = [];
    if (successRate > 50) {
      recommendations.push({
        type: 'high_risk',
        message: 'Soft paywall has high bypass success rate',
        suggestion: 'Consider implementing additional server-side validation'
      });
    } else if (successRate > 20) {
      recommendations.push({
        type: 'medium_risk',
        message: 'Soft paywall has moderate bypass success rate',
        suggestion: 'Review and strengthen client-side protection mechanisms'
      });
    } else {
      recommendations.push({
        type: 'low_risk',
        message: 'Soft paywall appears to be well-protected',
        suggestion: 'Continue monitoring for new bypass techniques'
      });
    }

    setAnalysisData({
      successRate,
      totalAttempts,
      successfulAttempts,
      failedAttempts: totalAttempts - successfulAttempts,
      techniques,
      vulnerabilities: [],
      recommendations
    });
  };

  const generateReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        successRate: analysisData.successRate,
        totalAttempts: analysisData.totalAttempts,
        successfulAttempts: analysisData.successfulAttempts,
        failedAttempts: analysisData.failedAttempts
      },
      techniques: analysisData.techniques,
      recommendations: analysisData.recommendations
    };

    console.log('Analysis Report:', report);
    alert('Analysis report generated! Check the browser console for details.');
  };

  return (
    <div className="analysis-panel">
      <div className="panel-header">
        <h2>📊 Soft Paywall Analysis</h2>
        <p>Comprehensive analysis of bypass attempts and security insights</p>
      </div>

      <div className="analysis-grid">
        {/* Success Rate Overview */}
        <div className="analysis-card">
          <h3>📈 Overall Success Rate</h3>
          <div className="success-rate-display">
            <div className="success-circle">
              <div className="success-percentage">
                {analysisData.successRate.toFixed(1)}%
              </div>
            </div>
            <div className="success-stats">
              <div className="stat">
                <span className="stat-label">Total Attempts:</span>
                <span className="stat-value">{analysisData.totalAttempts}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Successful:</span>
                <span className="stat-value">{analysisData.successfulAttempts}</span>
              </div>
              <div className="stat">
                <span className="stat-label">Failed:</span>
                <span className="stat-value">{analysisData.failedAttempts}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Technique Performance */}
        <div className="analysis-card">
          <h3>🎯 Technique Performance</h3>
          <div className="techniques-list">
            {analysisData.techniques.length > 0 ? (
              analysisData.techniques.map((technique, index) => (
                <div key={index} className="technique-item">
                  <span className="technique-name">{technique.name}</span>
                  <div className="technique-stats">
                    <span className="technique-success-rate">
                      {technique.successRate.toFixed(1)}%
                    </span>
                    <span className="technique-count">
                      ({technique.successful}/{technique.total})
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-data">No bypass attempts yet</p>
            )}
          </div>
        </div>

        {/* Recommendations */}
        <div className="analysis-card">
          <h3>💡 Security Recommendations</h3>
          <div className="recommendations-list">
            {analysisData.recommendations.map((rec, index) => (
              <div key={index} className={`recommendation-item ${rec.type}`}>
                <h4>{rec.message}</h4>
                <p>{rec.suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actions */}
        <div className="analysis-card">
          <h3>📋 Report Actions</h3>
          <div className="action-buttons">
            <button onClick={generateReport} className="btn-primary">
              📄 Generate Report
            </button>
            <button onClick={() => console.log('Export functionality')} className="btn-secondary">
              📤 Export Data
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 