import { Suspense, lazy } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import Footer from './components/Footer';
import SleekConcierge from './components/SleekConcierge';
import './styles/App.css';

// Lazy load pages
const Landing = lazy(() => import('./pages/Landing'));
const ServicesPage = lazy(() => import('./pages/ServicesPage'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));
const CocktailsPage = lazy(() => import('./pages/CocktailsPage'));
const CocktailDetail = lazy(() => import('./pages/CocktailDetail'));
const About = lazy(() => import('./pages/About'));
const Gallery = lazy(() => import('./pages/Gallery'));
const Contact = lazy(() => import('./pages/Contact'));
const Privacy = lazy(() => import('./pages/Privacy'));

const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/services" element={<ServicesPage />} />
    <Route path="/services/:slug" element={<ServiceDetail />} />
    <Route path="/cocktails" element={<CocktailsPage />} />
    <Route path="/cocktails/:slug" element={<CocktailDetail />} />
    <Route path="/about" element={<About />} />
    <Route path="/gallery" element={<Gallery />} />
    <Route path="/contact" element={<Contact />} />
    <Route path="/privacy" element={<Privacy />} />
    {/* Fallback for unknown routes */}
    <Route path="*" element={<Navigate to="/" replace />} />
  </Routes>
);

function App() {
  return (
    <>
      <ScrollToTop />
      <div className="App">
        <Suspense fallback={<div className="loading-screen"></div>}>
          <Routes>
            {/* Ukrainian Routes */}
            <Route path="/ua/*" element={<AppRoutes />} />
            
            {/* English Routes */}
            <Route path="/eng/*" element={<AppRoutes />} />
            
            {/* Default / Czech Routes */}
            <Route path="/*" element={<AppRoutes />} />
          </Routes>
        </Suspense>
        <SleekConcierge />
        <Footer />
      </div>
    </>
  );
}

export default App;
