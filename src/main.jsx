import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Design System & Layout Stylesheets
import './styles/variables.css';
import './styles/global.css';
import './styles/layout.css';
import './styles/agency.css';
import './styles/discoveryWizard.css';
import './styles/print.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

