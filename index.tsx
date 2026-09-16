import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { storage } from './services/storage';
import './styles.css';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Could not find root element to mount to');
}

const startApp = async () => {
  await storage.initialize();

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  );
};

void startApp();
