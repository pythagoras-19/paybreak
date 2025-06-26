import React, { useState } from 'react';

/**
 * PaywallExamples Component - Real-world paywall examples
 */
export function PaywallExamples() {
  const [filterType, setFilterType] = useState('all');

  const paywallSites = [
    // Soft Paywalls
    {
      name: 'Medium',
      url: 'https://medium.com',
      type: 'soft',
      description: 'Content blur with subscription prompt',
      category: 'Blogging/Content',
      difficulty: 'Easy'
    },
    {
      name: 'Quora',
      url: 'https://quora.com',
      type: 'soft',
      description: 'Answer blur with login requirement',
      category: 'Q&A Platform',
      difficulty: 'Easy'
    },
    {
      name: 'LinkedIn',
      url: 'https://linkedin.com',
      type: 'soft',
      description: 'Profile blur with premium features',
      category: 'Professional Network',
      difficulty: 'Easy'
    },
    {
      name: 'Twitter/X',
      url: 'https://twitter.com',
      type: 'soft',
      description: 'Content restrictions with premium tiers',
      category: 'Social Media',
      difficulty: 'Easy'
    },

    // Metered Paywalls
    {
      name: 'New York Times',
      url: 'https://nytimes.com',
      type: 'metered',
      description: '5 free articles per month',
      category: 'News',
      difficulty: 'Medium'
    },
    {
      name: 'Washington Post',
      url: 'https://washingtonpost.com',
      type: 'metered',
      description: 'Limited free articles per month',
      category: 'News',
      difficulty: 'Medium'
    },
    {
      name: 'The Atlantic',
      url: 'https://theatlantic.com',
      type: 'metered',
      description: 'Limited free articles',
      category: 'Magazine',
      difficulty: 'Medium'
    },
    {
      name: 'Wired',
      url: 'https://wired.com',
      type: 'metered',
      description: 'Limited free articles per month',
      category: 'Technology',
      difficulty: 'Medium'
    },
    {
      name: 'The Economist',
      url: 'https://economist.com',
      type: 'metered',
      description: 'Limited free articles',
      category: 'Business/News',
      difficulty: 'Medium'
    },

    // Hard Paywalls
    {
      name: 'Wall Street Journal',
      url: 'https://wsj.com',
      type: 'hard',
      description: 'No free content, subscription required',
      category: 'Business News',
      difficulty: 'Hard'
    },
    {
      name: 'Financial Times',
      url: 'https://ft.com',
      type: 'hard',
      description: 'Subscription required for all content',
      category: 'Business News',
      difficulty: 'Hard'
    },
    {
      name: 'Harvard Business Review',
      url: 'https://hbr.org',
      type: 'hard',
      description: 'Academic content behind paywall',
      category: 'Business/Academic',
      difficulty: 'Hard'
    },
    {
      name: 'The Information',
      url: 'https://theinformation.com',
      type: 'hard',
      description: 'Premium tech journalism',
      category: 'Technology News',
      difficulty: 'Hard'
    },
    {
      name: 'Stratechery',
      url: 'https://stratechery.com',
      type: 'hard',
      description: 'Tech analysis behind paywall',
      category: 'Technology Analysis',
      difficulty: 'Hard'
    }
  ];

  const filteredSites = filterType === 'all' 
    ? paywallSites 
    : paywallSites.filter(site => site.type === filterType);

  const getTypeIcon = (type) => {
    switch (type) {
      case 'soft': return '🔓';
      case 'metered': return '📊';
      case 'hard': return '🔒';
      default: return '❓';
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case 'soft': return 'success';
      case 'metered': return 'warning';
      case 'hard': return 'error';
      default: return 'info';
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Easy': return 'success';
      case 'Medium': return 'warning';
      case 'Hard': return 'error';
      default: return 'info';
    }
  };

  return (
    <div className="page-content">
      <div className="examples-header">
        <h2>
          <img src="/favicon.svg" alt="PayBreak Shield" className="title-icon" />
          Paywall Examples
        </h2>
        <p>Real-world examples of different paywall implementations for research and testing</p>
      </div>

      {/* Filter Controls */}
      <div className="filter-controls">
        <div className="filter-buttons">
          <button 
            onClick={() => setFilterType('all')}
            className={`filter-btn ${filterType === 'all' ? 'active' : ''}`}
          >
            🌐 All Types ({paywallSites.length})
          </button>
          <button 
            onClick={() => setFilterType('soft')}
            className={`filter-btn ${filterType === 'soft' ? 'active' : ''}`}
          >
            🔓 Soft ({paywallSites.filter(s => s.type === 'soft').length})
          </button>
          <button 
            onClick={() => setFilterType('metered')}
            className={`filter-btn ${filterType === 'metered' ? 'active' : ''}`}
          >
            📊 Metered ({paywallSites.filter(s => s.type === 'metered').length})
          </button>
          <button 
            onClick={() => setFilterType('hard')}
            className={`filter-btn ${filterType === 'hard' ? 'active' : ''}`}
          >
            🔒 Hard ({paywallSites.filter(s => s.type === 'hard').length})
          </button>
        </div>
      </div>

      {/* Paywall Types Info */}
      <div className="paywall-types-info">
        <div className="type-info-card">
          <h4>🔓 Soft Paywalls</h4>
          <p>Content is blurred or overlaid but remains in the DOM. Easier to bypass using CSS overrides or DOM manipulation.</p>
        </div>
        <div className="type-info-card">
          <h4>📊 Metered Paywalls</h4>
          <p>Allow limited free access (e.g., 5 articles per month) before requiring subscription. Often use cookies or user accounts.</p>
        </div>
        <div className="type-info-card">
          <h4>🔒 Hard Paywalls</h4>
          <p>Content is completely blocked and not present in the DOM. Most difficult to bypass, requiring server-side access.</p>
        </div>
      </div>

      {/* Sites Table */}
      <div className="sites-table-container">
        <table className="sites-table">
          <thead>
            <tr>
              <th>Website</th>
              <th>Type</th>
              <th>Category</th>
              <th>Description</th>
              <th>Difficulty</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {filteredSites.map((site, index) => (
              <tr key={index} className={`site-row ${site.type}`}>
                <td className="site-name">
                  <strong>{site.name}</strong>
                </td>
                <td className="site-type">
                  <span className={`type-badge ${getTypeColor(site.type)}`}>
                    {getTypeIcon(site.type)} {site.type.charAt(0).toUpperCase() + site.type.slice(1)}
                  </span>
                </td>
                <td className="site-category">{site.category}</td>
                <td className="site-description">{site.description}</td>
                <td className="site-difficulty">
                  <span className={`difficulty-badge ${getDifficultyColor(site.difficulty)}`}>
                    {site.difficulty}
                  </span>
                </td>
                <td className="site-link">
                  <a 
                    href={site.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="btn-text"
                  >
                    🌐 Visit
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Research Notes */}
      <div className="research-notes">
        <h3>🔬 Research Notes</h3>
        <div className="notes-content">
          <p><strong>Disclaimer:</strong> This list is for educational and research purposes only. Always respect website terms of service and use ethical testing methods.</p>
          
          <h4>Testing Guidelines:</h4>
          <ul>
            <li><strong>Soft Paywalls:</strong> Test CSS overrides, DOM manipulation, and JavaScript hooks</li>
            <li><strong>Metered Paywalls:</strong> Examine cookie handling, user session management, and rate limiting</li>
            <li><strong>Hard Paywalls:</strong> Focus on API analysis, authentication bypass, and content delivery methods</li>
          </ul>

          <h4>Ethical Considerations:</h4>
          <ul>
            <li>Only test on content you have permission to access</li>
            <li>Respect robots.txt and rate limiting</li>
            <li>Don't attempt to circumvent legitimate subscriptions</li>
            <li>Report security vulnerabilities responsibly</li>
          </ul>
        </div>
      </div>
    </div>
  );
} 