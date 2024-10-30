import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import axios from 'axios';

// Set Axios defaults globally
axios.defaults.withCredentials = true;
axios.defaults.baseURL = 'http://localhost:3000';  // Set base URL

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
