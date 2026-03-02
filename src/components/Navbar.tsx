import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { lang, setLang, urlPrefix, t } = useLanguage();
  const logoSrc = `${import.meta.env.BASE_URL}public/logo/logo.png`;

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  const handleBookClick = () => {
    navigate(`${urlPrefix}/contact`);
    setIsMenuOpen(false);
  };

  return (
    <nav className={`navbar ${isMenuOpen ? 'menu-open' : ''}`}>
      <Link to={`${urlPrefix}/`} className="nav-logo-container">
        <div className="logo-img-wrapper bat-logo-hover">
          <div className="bat-wing wing-l">
            <img src={logoSrc} alt="" />
          </div>
          <div className="bat-body">
            <img src={logoSrc} alt="Will Be Bar Logo" className="navbar-logo-img" />
          </div>
          <div className="bat-wing wing-r">
            <img src={logoSrc} alt="" />
          </div>
        </div>
        <span className="logo-text">WILL BE BAR</span>
      </Link>

      <div className="nav-links desktop-only">
        <Link to={`${urlPrefix}/services`}>{t('services')}</Link>
        <Link to={`${urlPrefix}/cocktails`}>{t('collection')}</Link>
        <Link to={`${urlPrefix}/gallery`}>{t('gallery')}</Link>
        <Link to={`${urlPrefix}/about`}>{t('about')}</Link>
        <Link to={`${urlPrefix}/contact`}>{t('footer_contact')}</Link>
      </div>

      <div className="nav-right-actions">
        <a href="tel:+420773144034" className="nav-phone-link" aria-label="Call Us">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.7 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
        </a>
        <div className="lang-toggle">
          <button onClick={() => setLang('CZ')} className={lang === 'CZ' ? 'active' : ''}>CZ</button>
          <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'active' : ''}>EN</button>
          <button onClick={() => setLang('UA')} className={lang === 'UA' ? 'active' : ''}>UA</button>
        </div>
        <button className="book-btn" onClick={handleBookClick}>{t('book')}</button>
      </div>

      <button className="burger-menu" onClick={toggleMenu} aria-label="Toggle Menu">
        <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
        <div className={`line ${isMenuOpen ? 'open' : ''}`}></div>
      </button>

      {isMenuOpen && (
        <div className="mobile-nav-overlay active">
          <div className="mobile-links">
            <Link to={`${urlPrefix}/services`}>{t('services')}</Link>
            <Link to={`${urlPrefix}/cocktails`}>{t('collection')}</Link>
            <Link to={`${urlPrefix}/gallery`}>{t('gallery')}</Link>
            <Link to={`${urlPrefix}/about`}>{t('about')}</Link>
            <Link to={`${urlPrefix}/contact`}>{t('footer_contact')}</Link>
            <div className="mobile-lang-row">
              <button onClick={() => setLang('CZ')} className={lang === 'CZ' ? 'active' : ''}>CZ</button>
              <button onClick={() => setLang('EN')} className={lang === 'EN' ? 'active' : ''}>EN</button>
              <button onClick={() => setLang('UA')} className={lang === 'UA' ? 'active' : ''}>UA</button>
            </div>
            <button className="primary-btn" onClick={handleBookClick}>{t('book')}</button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
