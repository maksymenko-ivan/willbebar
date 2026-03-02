import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { services, cocktails } from '../data/data';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';
import CateringCalculator from '../components/CateringCalculator';
import TasteProfiler from '../components/TasteProfiler';
import UniformSelector from '../components/UniformSelector';
import Toast from '../components/Toast';

const Landing: React.FC = () => {
  const { lang, urlPrefix, t } = useLanguage();
  const [showToast, setShowToast] = useState(false);
  const videoSrc = `${import.meta.env.BASE_URL}willbebar/@main/videos/hero-bg.mp4`;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowToast(true);
    const form = e.target as HTMLFormElement;
    form.reset();
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "CateringService",
    "name": "Will Be Bar Catering",
    "url": "https://willbebar.cz",
    "logo": "https://willbebar.cz/logo/logo.png",
    "image": "https://images.unsplash.com/photo-1566730623144-b22d3735aa32",
    "description": t('hero_p'),
    "address": [
      {
        "@type": "PostalAddress",
        "streetAddress": "V Kolkovně 920/5",
        "addressLocality": "Prague",
        "postalCode": "110 00",
        "addressCountry": "CZ"
      },
      {
        "@type": "PostalAddress",
        "streetAddress": "Kyiv HQ (Contact for details)",
        "addressLocality": "Kyiv",
        "addressCountry": "UA"
      }
    ],
    "telephone": "+420773144034",
    "priceRange": "$$$",
    "servesCuisine": "Mixology, Cocktails"
  };

  const featuredServices = services.slice(0, 8);
  const featuredCocktails = cocktails.slice(0, 8);

  return (
    <div className="landing-page">
      <SEO title={t('home')} description="Premium bar catering" schema={localBusinessSchema} />
      <Navbar />

      <main>
        <header className="hero main-hero">
          <div className="hero-video-bg">
            <video 
              autoPlay 
              muted 
              loop 
              playsInline 
              className="hero-video"
            >
              <source src={videoSrc} type="video/mp4" />
            </video>
            <div className="hero-video-overlay"></div>
          </div>
          <div className="hero-content">
            <span className="hero-subtitle animate-in">{t('hero_sub')}</span>
            <h1 className="animate-in">{t('hero_title')}</h1>
            <p className="hero-description animate-in">{t('hero_p')}</p>
            <button 
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })} 
              className="primary-btn hero-cta"
            >
              {t('submit')}
            </button>
          </div>
        </header>

        <section className="stats-bar">
          <div className="stat-item"><span className="stat-number">15+</span><span className="stat-label">{t('experience')}</span></div>
          <div className="stat-item"><span className="stat-number">2k+</span><span className="stat-label">{t('weddings')}</span></div>
          <div className="stat-item"><span className="stat-number">50+</span><span className="stat-label">{t('menu_items')}</span></div>
        </section>

        <section className="menu-section archive-section">
          <div className="section-header">
            <div className="header-technical">
              <span className="unit-code">REF // 001-008</span>
              <h2>{t('collection')}</h2>
            </div>
            <div className="divider"></div>
          </div>
          <div className="archive-grid">
            {featuredCocktails.map((drink: any) => {
              const content = drink[lang];
              return (
                <Link key={drink.id} to={`${urlPrefix}/cocktails/${drink.slug}`} className="archive-unit-link">
                  <article className="archive-unit">
                    <div className="unit-visual">
                      <img src={drink.image} alt={content.name} loading="lazy" />
                    </div>
                    <div className="unit-content">
                      <div className="unit-meta">
                        <span className="unit-type">{content.type.toUpperCase()}</span>
                        <span className="unit-id-subtle">#{drink.id.toString().padStart(3, '0')}</span>
                      </div>
                      <h3 className="unit-title">{content.name}</h3>
                      <div className="unit-flavor-tag">
                        <span className="flavor-label">{t('flavor_profile').toUpperCase()}:</span>
                        <span className="flavor-value">{content.taste}</span>
                      </div>
                      <div className="unit-footer">
                        <span className="view-archive">{t('view_details')} // ACCESS</span>
                      </div>
                    </div>
                  </article>
                </Link>
              );
            })}
          </div>
          <div className="archive-cta-wrapper">
            <Link to={`${urlPrefix}/cocktails`} className="technical-btn">{t('view_details')}</Link>
          </div>
        </section>

        <section className="services-section concepts-section" id="services">
          <div className="section-header">
             <div className="header-technical">
              <span className="unit-code">SYS // LX-ARCHIVE</span>
              <h2>{t('services')}</h2>
            </div>
            <div className="divider"></div>
          </div>
          <div className="archive-concepts-list">
            {featuredServices.map((service: any) => {
              const content = service[lang];
              return (
                <Link key={service.id} to={`${urlPrefix}/services/${service.slug}`} className="archive-concept-item">
                  <div className="archive-unit-visual">
                    <img src={service.image} alt={content.title} loading="lazy" />
                    <span className="archive-unit-num">{(service.id).toString().padStart(2, '0')}</span>
                  </div>
                  <div className="archive-unit-details">
                    <div className="archive-unit-header">
                      <span className="archive-unit-cat">{t('sd_luxury_concept')}</span>
                      <h3>{content.title}</h3>
                    </div>
                    <p>{content.desc}</p>
                    <div className="archive-unit-footer">
                      <span className="archive-action">{t('explore_concept')}</span>
                      <div className="archive-action-arrow"></div>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
          <div className="archive-cta-wrapper">
            <Link to={`${urlPrefix}/services`} className="technical-btn">{t('view_details')}</Link>
          </div>
        </section>

        <CateringCalculator />
        <UniformSelector />
        <TasteProfiler />

        <section className="studio-inquiry-section" id="contact">
          <div className="studio-container">
            <div className="studio-info">
              <span className="section-tag">{t('inquiry')}</span>
              <h2>{t('inquiry_h2')}</h2>
              <p>{t('inquiry_p')}</p>
              
              <div className="studio-contact-links">
                <a href="tel:+420773144034" className="studio-link"><span>{t('tel_label')}:</span> +420 773 144 034</a>
                <a href="mailto:info@willbebar.com" className="studio-link"><span>{t('email_label')}:</span> info@willbebar.com</a>
              </div>
            </div>

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
          </div>
        </section>

        <Toast 
          message="Inquiry submitted successfully." 
          isVisible={showToast} 
          onClose={() => setShowToast(false)} 
        />
      </main>
    </div>
  );
};

export default Landing;
