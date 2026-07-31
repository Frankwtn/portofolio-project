/**
 * main.jsx
 * ─────────────────────────────────────────────────────────────
 * Entry point aplikasi React.
 * Mount <App /> ke elemen #root di index.html.
 * StrictMode mengaktifkan pemeriksaan tambahan di development
 * (double-invoke effects, deprecated API warnings, dll).
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
