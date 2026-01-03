import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';
import { apiClient } from './config/axiosConfig';
import { initializeAuth, initializeApi } from '@bonchi/shared';

// Initialize shared modules with apiClient
initializeAuth(apiClient);
initializeApi(apiClient);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
