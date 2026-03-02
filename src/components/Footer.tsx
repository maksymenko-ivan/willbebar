import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const Footer: React.FC = () => {
  const { t, urlPrefix } = useLanguage();

  return (
    <footer className="footer architectural-footer">
      <div className="footer-top-row">
        <div className="footer-brand-huge">
          <h2>WILL BE BAR</h2>
          <p className="mastery-text">{t('footer_mastery')}</p>
        </div>
        
        <div className="footer-nav-grid">
          <div className="footer-col">
            <h4>{t('footer_explore')}</h4>
            <Link to={`${urlPrefix}/services`}>{t('services')}</Link>
            <Link to={`${urlPrefix}/cocktails`}>{t('collection')}</Link>
            <Link to={`${urlPrefix}/gallery`}>{t('gallery')}</Link>
            <Link to={`${urlPrefix}/about`}>{t('about')}</Link>
            <Link to={`${urlPrefix}/contact`}>{t('footer_contact')}</Link>
          </div>
          <div className="footer-col">
            <h4>{t('footer_social')}</h4>
            <a href="https://instagram.com/willbebar" target="_blank" rel="noreferrer">{t('instagram')}</a>
            <a href="https://facebook.com/willbebar" target="_blank" rel="noreferrer">{t('facebook')}</a>
          </div>
          <div className="footer-col">
            <h4>{t('footer_contact')}</h4>
            <a href="tel:+420773144034">+420 773 144 034</a>
            <a href="mailto:info@willbebar.com">info@willbebar.com</a>
            <p className="footer-address">V Kolkovně 920/5,<br />110 00 {t('footer_city')}</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom-row">
        <p className="copyright">&copy; 2026 WILL BE BAR CATERING. {t('footer_rights')}</p>
        <div className="footer-legal-links">
          <Link to={`${urlPrefix}/privacy`}>{t('privacy_policy')}</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
