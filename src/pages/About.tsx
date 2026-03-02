import React from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const About: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="archive-browser-page about-narrative-page">
      <SEO title={t('about')} description="The history and philosophy of Will Be Bar Catering." />
      <Navbar />
      
      <main className="archive-container">
        <header className="archive-header animate-in">
          <div className="archive-title-area">
            <span className="archive-tag">SYS // {t('history_archive').toUpperCase()}</span>
            <h1>{t('about_h1')}</h1>
            <p className="archive-intro">{t('about_intro_p1')}</p>
          </div>
        </header>

        <section className="about-editorial">
          <div className="editorial-main animate-in">
            <div className="ed-column">
              <span className="ed-tag">{t('about_philosophy_tag')}</span>
              <h2 className="ed-title">{t('about_intro_h2')}</h2>
              <p className="ed-text">{t('about_intro_p2')}</p>
              <div className="ed-quote">
                <div className="quote-line"></div>
                <p>{t('about_quote')}</p>
              </div>
            </div>
            <div className="ed-column">
              <div className="ed-image-box">
                <img src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?auto=format&fit=crop&q=80" alt="Mixing" />
                <div className="ed-image-overlay"></div>
              </div>
            </div>
          </div>

          {/* NEW SECTION: THE PROTOCOL */}
          <div className="protocol-section animate-in">
            <div className="protocol-header">
              <span className="ed-tag">{t('about_protocol_tag')}</span>
              <h2 className="ed-title">{t('operational_precision').toUpperCase()}</h2>
            </div>
            <div className="protocol-grid">
              <div className="protocol-item">
                <span className="p-code">PRT-01</span>
                <h4>{t('ice_program')}</h4>
                <p>{t('protocol_ice_desc')}</p>
              </div>
              <div className="protocol-item">
                <span className="p-code">PRT-02</span>
                <h4>{t('flavor_profile')} ARCHITECTURE</h4>
                <p>{t('protocol_flavor_desc')}</p>
              </div>
              <div className="protocol-item">
                <span className="p-code">PRT-03</span>
                <h4>GLASSWARE LOGISTICS</h4>
                <p>{t('protocol_glass_desc')}</p>
              </div>
              <div className="protocol-item">
                <span className="p-code">PRT-04</span>
                <h4>UNIFORM PROTOCOL</h4>
                <p>{t('protocol_uniform_desc')}</p>
              </div>
            </div>
          </div>

          <div className="editorial-features grid-3 animate-in">
            <div className="feature-block">
              <span className="f-num">01</span>
              <h3>{t('about_feature1_h')}</h3>
              <p>{t('about_feature1_p')}</p>
            </div>
            <div className="feature-block">
              <span className="f-num">02</span>
              <h3>{t('about_feature2_h')}</h3>
              <p>{t('about_feature2_p')}</p>
            </div>
            <div className="feature-block">
              <span className="f-num">03</span>
              <h3>{t('about_feature3_h')}</h3>
              <p>{t('about_feature3_p')}</p>
            </div>
          </div>

          {/* NEW SECTION: REGISTRY */}
          <div className="office-registry animate-in">
            <div className="registry-header">
              <span className="ed-tag">{t('about_registry_tag')}</span>
              <h2 className="ed-title">{t('global_footprint').toUpperCase()}</h2>
            </div>
            <div className="registry-display">
              <div className="registry-card">
                <span className="r-city">PRAGUE</span>
                <span className="r-type">OPERATIONAL HQ</span>
                <div className="r-divider"></div>
                <p>{t('registry_prague_desc')}</p>
              </div>
              <div className="registry-card">
                <span className="r-city">KYIV</span>
                <span className="r-type">CONCEPT STUDIO</span>
                <div className="r-divider"></div>
                <p>{t('registry_kyiv_desc')}</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-stats-visual animate-in">
          <div className="stats-visual-grid">
            <div className="sv-item">
              <span className="sv-val">15+</span>
              <span className="sv-label">{t('years').toUpperCase()} {t('experience').toUpperCase()}</span>
            </div>
            <div className="sv-item">
              <span className="sv-val">2K+</span>
              <span className="sv-label">{t('weddings').toUpperCase()}</span>
            </div>
            <div className="sv-item">
              <span className="sv-val">50+</span>
              <span className="sv-label">{t('menu_items').toUpperCase()}</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default About;
