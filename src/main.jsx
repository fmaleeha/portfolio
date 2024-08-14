import React from 'react';
import ReactDOM from 'react-dom/client'; // Updated import
import App from './App'; // Assuming you have an App component

// Create a root
const root = ReactDOM.createRoot(document.getElementById('root'));

// Initial render
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
