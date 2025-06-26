import React from 'react';
import { createRoot } from 'react-dom/client';
import { App } from './ui/App.jsx';
import './styles.css';

console.log('[PayBreak] Initializing React app...');

// Initialize the React app
const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App />);

console.log('[PayBreak] React app initialized'); 