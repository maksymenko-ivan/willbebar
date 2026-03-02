import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import Toast from '../components/Toast';

const Contact: React.FC = () => {
  const { t } = useLanguage();
  const [showToast, setShowToast] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  return (
    <div className="archive-browser-page contact-clean-page">
      <SEO title={t('footer_contact')} description="Get in touch with Will Be Bar Catering." />
      <Navbar />
      
      <main className="archive-container compact-container">
        <header className="archive-header animate-in">
          <div className="archive-title-area">
            <span className="archive-tag">SYS // {t('direct_connect').toUpperCase()}</span>
            <h1>{t('contact_h1')}</h1>
            <p className="company-official-name">EMOTION GROUP S.R.O.</p>
          </div>
        </header>

        <section className="contact-top-nav animate-in">
          <div className="contact-info-hub">
            <div className="hub-row">
              <a href="tel:+420773144034" className="hub-item">
                <span>{t('tel_label')}</span>
                <strong>+420 773 144 034</strong>
              </a>
              <a href="mailto:info@willbebar.com" className="hub-item">
                <span>{t('email_label')}</span>
                <strong>info@willbebar.com</strong>
              </a>
            </div>
            <div className="hub-row social">
              <a href="https://instagram.com/willbebar" target="_blank" rel="noreferrer" className="social-block">
                <span className="s-label">{t('instagram').toUpperCase()}</span>
                <div className="s-action">
                  <strong>{t('follow').toUpperCase()}</strong>
                  <div className="s-arrow">→</div>
                </div>
              </a>
              <a href="https://facebook.com/willbebar" target="_blank" rel="noreferrer" className="social-block">
                <span className="s-label">{t('facebook').toUpperCase()}</span>
                <div className="s-action">
                  <strong>{t('connect').toUpperCase()}</strong>
                  <div className="s-arrow">→</div>
                </div>
              </a>
              <a 
                href={`https://api.whatsapp.com/send?phone=420773144034&text=${encodeURIComponent(t('wa_message'))}`} 
                target="_blank" rel="noreferrer" className="social-block highlight"
              >
                <span className="s-label">WHATSAPP</span>
                <div className="s-action">
                  <strong>{t('start_chat').toUpperCase()}</strong>
                  <div className="s-arrow">→</div>
                </div>
              </a>
            </div>
          </div>
        </section>

        <section className="contact-form-centered animate-in">
          <div className="window-frame">
            <div className="window-header">
              <div className="mac-buttons">
                <span className="mac-dot red"></span>
                <span className="mac-dot yellow"></span>
                <span className="mac-dot green"></span>
              </div>
              <span className="window-tag">{t('contact_form_title')}</span>
            </div>
            
            <form className="studio-form" onSubmit={handleSubmit}>
              <div className="studio-field">
                <input type="text" placeholder={t('name')} required />
              </div>
              <div className="studio-field">
                <input type="email" placeholder={t('email')} required />
              </div>
              <div className="form-row-split">
                <div className="studio-field">
                  <input type="text" placeholder={t('date')} />
                </div>
                <div className="studio-field">
                  <input type="text" placeholder={t('guests')} />
                </div>
              </div>
              <div className="studio-field">
                <textarea placeholder={t('vision')} className="studio-textarea"></textarea>
              </div>
              <button type="submit" className="studio-submit-btn">{t('submit')}</button>
            </form>
          </div>
        </section>
      </main>

      <Toast 
        message="Inquiry submitted successfully." 
        isVisible={showToast} 
        onClose={() => setShowToast(false)} 
      />
    </div>
  );
};

export default Contact;
