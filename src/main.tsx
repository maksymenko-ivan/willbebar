import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom';
import './styles/index.css'
import App from './App.tsx'
import { LanguageProvider } from './context/LanguageContext.tsx'
import { HelmetProvider } from 'react-helmet-async'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <Router>
        <LanguageProvider>
          <App />
        </LanguageProvider>
      </Router>
    </HelmetProvider>
  </StrictMode>,
)
