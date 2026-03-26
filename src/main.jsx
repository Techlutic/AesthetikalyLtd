/* ============================================
   APPLICATION ENTRY POINT
   React 18 with Concurrent Features
   ============================================ */

import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Import styles (order matters)
import './index.css';
import './App.css';

// Create root with React 18 concurrent features
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render application
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// Performance monitoring (optional)
if (import.meta.env.DEV) {
  // Log render times in development
  console.log('🚀 Derma Natura - Development Mode');
}

// Register service worker for PWA (optional)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed
    });
  });
}