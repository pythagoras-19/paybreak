# 🧩 PayBreak

A comprehensive JavaScript-based framework and experimental web app for simulating real-world paywalls and testing bypass techniques. This research tool helps identify novel, previously undocumented bypass vectors through automated testing and detailed telemetry collection.

## 🎯 Overview

PayBreak is designed for security researchers, developers, and organizations to:

- **Simulate** multiple types of real-world paywalls (soft, metered, hard, obfuscated, server-validated)
- **Test** various bypass techniques (DOM manipulation, JavaScript hooks, storage manipulation, network interception, CSP bypass)
- **Analyze** bypass success rates and identify vulnerabilities
- **Collect** detailed telemetry data for research and defense development

## 🚀 Features

### 🧱 Paywall Simulation
- **Soft Paywalls**: Blur + modal overlay (like NYT, Medium)
- **Metered Paywalls**: Count-based access with localStorage tracking
- **Hard Paywalls**: Redirect/block content (like WSJ)
- **Obfuscated Paywalls**: JavaScript obfuscation techniques
- **Server-Validated**: Token-based validation with signed cookies

### 🧪 Bypass Techniques
- **DOM-based**: Element removal, unblur content, style overrides
- **JavaScript**: Function overrides, property hooks, prototype pollution
- **Storage**: Cookie manipulation, localStorage reset, sessionStorage clear
- **Network**: Fetch interception, XHR override
- **CSP**: JSONP bypass, postMessage bypass
- **Advanced**: Iframe injection, Web Worker bypass

### 📊 Telemetry & Analysis
- Real-time data collection (network requests, console logs, DOM mutations)
- Performance metrics and execution timing
- Comprehensive reporting and vulnerability analysis
- Export capabilities (JSON, CSV)

### 🎨 Modern Web Interface
- Beautiful, responsive UI with real-time updates
- Interactive dashboards and controls
- Live telemetry streaming
- Detailed analysis panels

## 📦 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/pythagoras-19/paybreak.git
   cd paybreak
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173` (or the URL shown in your terminal)

## 🎮 Quick Start

### Basic Usage

1. **Initialize the Framework**
   ```javascript
   // The framework initializes automatically when the page loads
   // Access it globally via window.paybreak
   ```

2. **Apply a Paywall**
   ```javascript
   // Apply a soft paywall
   await window.paybreak.applyPaywall('soft', {
     blurIntensity: 5,
     overlayOpacity: 0.8
   });
   ```

3. **Execute Bypass Techniques**
   ```javascript
   // Execute all techniques
   await window.paybreak.executeAllBypassTechniques();
   
   // Or execute specific techniques
   await window.paybreak.executeBypassTechnique('domRemoval');
   ```

4. **Run Auto-Fuzzing**
   ```javascript
   // Start automated testing
   await window.paybreak.startAutoFuzzing({
     maxIterations: 10,
     interval: 5000
   });
   ```

### Advanced Usage

```javascript
// Run a comprehensive test suite
const results = await window.paybreak.runTestSuite({
  paywallTypes: ['soft', 'metered', 'obfuscated'],
  techniqueCategories: ['dom', 'javascript', 'storage'],
  includeAutoFuzzing: true
});

// Get detailed analysis
const analysis = window.paybreak.getAnalysisReport();

// Export data
const data = window.paybreak.exportData('json');
```

## 🏗️ Architecture

### Core Components

- **`PaywallSimulator`**: Handles different paywall implementations
- **`BypassEngine`**: Executes bypass techniques and automation
- **`TelemetryCollector`**: Captures detailed data and metrics
- **`PayBreakFramework`**: Main orchestrator and API

### UI Components

- **Dashboard**: Overview and quick actions
- **Paywall Controls**: Configuration and simulation
- **Bypass Panel**: Technique execution and monitoring
- **Telemetry Viewer**: Real-time data streaming
- **Analysis Panel**: Reports and insights

## 📊 Paywall Types

### Soft Paywall
```javascript
// Blur + modal overlay
await window.paybreak.applyPaywall('soft', {
  blurIntensity: 8,
  overlayOpacity: 0.9,
  modalEnabled: true
});
```

### Metered Paywall
```javascript
// Count-based access
await window.paybreak.applyPaywall('metered', {
  freeArticles: 3,
  resetInterval: 24 * 60 * 60 * 1000, // 24 hours
  storageKey: 'metered_paywall_count'
});
```

### Hard Paywall
```javascript
// Redirect/block content
await window.paybreak.applyPaywall('hard', {
  redirectUrl: '/subscribe',
  requireLogin: true,
  blockContent: true
});
```

### Obfuscated Paywall
```javascript
// JavaScript obfuscation
await window.paybreak.applyPaywall('obfuscated', {
  obfuscationLevel: 'medium',
  variableNameMangling: true,
  functionNameMangling: true
});
```

### Server-Validated Paywall
```javascript
// Token-based validation
await window.paybreak.applyPaywall('serverValidated', {
  cookieName: 'paywall_token',
  validationEndpoint: '/api/validate-paywall',
  signedCookies: true
});
```

## 🧪 Bypass Techniques

### DOM Techniques
- `domRemoval`: Remove paywall overlay elements
- `unblurContent`: Remove blur effects
- `overrideStyles`: Override CSS styles

### JavaScript Techniques
- `functionOverride`: Override paywall functions
- `propertyHooks`: Hook into object properties
- `prototypePollution`: Attempt prototype pollution

### Storage Techniques
- `cookieManipulation`: Manipulate cookies
- `localStorageReset`: Reset localStorage counters
- `sessionStorageClear`: Clear sessionStorage data

### Network Techniques
- `fetchInterception`: Intercept fetch requests
- `xhrOverride`: Override XMLHttpRequest

### CSP Techniques
- `jsonpBypass`: JSONP-based CSP bypass
- `postMessageBypass`: PostMessage CSP bypass

### Advanced Techniques
- `iframeInjection`: Inject iframes
- `workerBypass`: Use Web Workers

## 📈 Analysis & Reporting

### Success Metrics
- Overall bypass success rate
- Technique effectiveness ranking
- Performance metrics (execution time, etc.)

### Vulnerability Analysis
- Paywall type vulnerability assessment
- Risk categorization (High/Medium/Low)
- Technique usage patterns

### Recommendations
- Security improvement suggestions
- Defense strategy recommendations
- Implementation guidance

## 🔧 Configuration

### Framework Configuration
```javascript
// Custom framework configuration
const framework = new PayBreakFramework();
await framework.initialize();
await framework.startSession({
  userAgent: navigator.userAgent,
  url: window.location.href
});
```

### Auto-Fuzzing Configuration
```javascript
await framework.startAutoFuzzing({
  interval: 5000, // 5 seconds between iterations
  maxIterations: 10,
  paywallTypes: ['soft', 'metered', 'obfuscated'],
  techniqueCategories: ['dom', 'javascript', 'storage']
});
```

## 📤 Data Export

### Export Formats
```javascript
// JSON export
const jsonData = framework.exportData('json');

// CSV export
const csvData = framework.exportData('csv');

// Raw data
const rawData = framework.exportData();
```

### Telemetry Export
```javascript
// Export telemetry data
const telemetryData = framework.telemetryCollector.exportData('json');
```

## 🛠️ Development

### Building
```bash
npm run build
```

### Testing
```bash
npm test
```

### Linting
```bash
npm run lint
```

### Formatting
```bash
npm run format
```

## 🔒 Security Considerations

⚠️ **Important**: This framework is designed for research and educational purposes. Please use responsibly and only on systems you own or have explicit permission to test.

### Ethical Usage
- Only test on your own systems or with explicit permission
- Respect rate limits and terms of service
- Do not use for malicious purposes
- Follow responsible disclosure practices

### Legal Compliance
- Ensure compliance with local laws and regulations
- Respect intellectual property rights
- Follow ethical hacking guidelines

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Inspired by real-world paywall implementations
- Built with modern web technologies
- Designed for security research and education

## 📞 Support

- **Issues**: [GitHub Issues](https://github.com/pythagoras-19/paybreak/issues)
- **Discussions**: [GitHub Discussions](https://github.com/pythagoras-19/paybreak/discussions)
- **Documentation**: [Wiki](https://github.com/pythagoras-19/paybreak/wiki)

## 🔮 Roadmap

- [ ] Browser extension support
- [ ] Advanced machine learning analysis
- [ ] Real-time collaboration features
- [ ] Integration with security tools
- [ ] Mobile app version
- [ ] API for external integrations

## 🔍 Enhanced Logging System

PayBreak now includes a comprehensive, in-depth logging system that captures detailed information about all framework activities, user interactions, and system performance.

### 📊 Logging Features

#### **Real-Time Data Collection**
- **Network Requests**: Detailed tracking of all fetch/XHR requests with timing, status, and response data
- **Console Logs**: Complete console output capture with stack traces for errors
- **DOM Mutations**: Real-time monitoring of DOM changes and element modifications
- **User Interactions**: Tracking of clicks, inputs, scrolls, and other user actions
- **Performance Metrics**: Memory usage, response times, and performance indicators
- **Error Tracking**: Global error handling and unhandled promise rejection capture
- **Storage Monitoring**: localStorage and sessionStorage change tracking

#### **Configurable Logging Levels**
- **Debug**: All events (most verbose)
- **Info**: Important events and status changes
- **Warn**: Warnings and potential issues
- **Error**: Errors only (least verbose)

#### **Advanced Analytics**
- **Error Rate Calculation**: Automatic calculation of network request failure rates
- **Performance Analysis**: Average response times and memory usage tracking
- **User Behavior Insights**: Most common interactions and interaction timelines
- **Bypass Success Analysis**: Detailed statistics on bypass technique effectiveness

### 🎛️ Logging Controls

#### **Dashboard Controls**
- Quick log level switching (Debug/Info/Warn/Error)
- Real-time logging status display
- Memory usage monitoring
- Error count tracking
- One-click log clearing and report generation

#### **Telemetry Viewer**
- **Comprehensive Configuration Panel**:
  - Log level selection
  - Maximum log entries limit
  - Individual tracking feature toggles
  - Real-time analytics display

- **Multi-Tab Data Viewing**:
  - All Events (comprehensive view)
  - Bypass Attempts (success/failure tracking)
  - Network Activity (request/response details)
  - Console Logs (with stack traces)
  - DOM Mutations (element changes)
  - Performance Metrics (timing data)
  - User Interactions (click/input tracking)
  - Errors (detailed error information)

- **Advanced Filtering**:
  - Event type filtering
  - Time range selection
  - Search functionality
  - Real-time data filtering

### 📈 Enhanced Reporting

#### **Automated Report Generation**
```javascript
// Generate comprehensive report
const report = framework.telemetryCollector.generateEnhancedReport();

// Report includes:
// - Session duration and statistics
// - Performance metrics and recommendations
// - User behavior analysis
// - Error analysis and common issues
// - Bypass attempt success rates
// - Memory usage patterns
```

#### **Smart Recommendations**
The system automatically analyzes collected data and provides recommendations:
- **High Error Rates**: Alerts when network request failure rates exceed thresholds
- **Memory Issues**: Warnings about excessive memory usage
- **Performance Problems**: Suggestions for slow network requests
- **Successful Bypasses**: Highlights effective bypass techniques

### 🔧 Usage Examples

#### **Basic Logging Setup**
```javascript
// Access the telemetry collector
const telemetry = framework.telemetryCollector;

// Set log level
telemetry.setLogLevel('debug');

// Clear logs
telemetry.clearData();

// Export data
const data = telemetry.exportData('json');
```

#### **Advanced Filtering**
```javascript
// Get filtered telemetry data
const filteredData = telemetry.getTelemetryData({
  event: 'bypass_attempt',
  startTime: Date.now() - 3600000, // Last hour
  sessionId: 'specific-session-id'
});
```

#### **Real-Time Monitoring**
```javascript
// Monitor specific metrics
const errorRate = telemetry.calculateErrorRate();
const avgResponseTime = telemetry.calculateAverageResponseTime();
const memoryUsage = telemetry.calculateAverageMemoryUsage();

// Get user interaction patterns
const interactions = telemetry.getMostCommonInteractions();
```

### 🎯 Logging Best Practices

#### **For Development**
1. **Use Debug Level**: Set log level to 'debug' during development for maximum visibility
2. **Monitor Console**: Watch the browser console for real-time logging output
3. **Export Regularly**: Export telemetry data periodically for analysis
4. **Track User Actions**: Enable user interaction tracking to understand usage patterns

#### **For Production Testing**
1. **Use Info Level**: Set log level to 'info' for production-like testing
2. **Monitor Performance**: Watch memory usage and response times
3. **Analyze Errors**: Review error logs to identify issues
4. **Generate Reports**: Use automated reporting for comprehensive analysis

#### **For Research**
1. **Enable All Tracking**: Turn on all tracking features for complete data collection
2. **Export Raw Data**: Export telemetry data for external analysis
3. **Use Filtering**: Use advanced filtering to focus on specific events
4. **Review Recommendations**: Pay attention to automated recommendations

### 📊 Data Export Formats

#### **JSON Export**
```javascript
// Export all telemetry data as JSON
const jsonData = telemetry.exportData('json');
```

#### **CSV Export**
```javascript
// Export specific data types as CSV
const csvData = telemetry.exportData('csv');
```

#### **Enhanced Report**
```javascript
// Generate comprehensive analysis report
const report = telemetry.generateEnhancedReport();
```

### 🔍 Troubleshooting

#### **High Memory Usage**
- Reduce maximum log entries limit
- Clear logs periodically
- Use higher log levels to reduce verbosity

#### **Performance Issues**
- Disable unnecessary tracking features
- Use time-based filtering to focus on recent events
- Monitor error rates and response times

#### **Missing Data**
- Check log level settings
- Verify tracking features are enabled
- Ensure framework is properly initialized

This enhanced logging system provides unprecedented visibility into PayBreak's operations, making it an invaluable tool for security research, debugging, and performance analysis.

---

**🧩 PayBreak** - Unlocking the secrets of paywall security through research and innovation. 