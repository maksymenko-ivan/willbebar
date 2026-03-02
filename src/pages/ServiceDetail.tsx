import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { services } from '../data/data';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

const ServiceDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, urlPrefix, t } = useLanguage();
  const navigate = useNavigate();
  
  const currentIndex = useMemo(() => services.findIndex(s => s.slug === slug), [slug]);
  const service = services[currentIndex];
  const nextService = services[(currentIndex + 1) % services.length];

  if (!service) return <div className="detail-not-found">{t('sd_not_found')}</div>;
  const content = (service as any)[lang];

  return (
    <div className="luxury-detail-wrapper">
      <SEO title={content.title} description={content.desc} />
      <Navbar />

      <main className="concept-container">
        {/* LEFT: Visual Fixed Panel */}
        <aside className="concept-visual">
          <div className="concept-image-frame">
            <img src={service.image} alt={content.title} className="parallax-img" loading="lazy" />
            <div className="visual-overlay"></div>
            <div className="visual-meta">
              <span className="v-num">{(currentIndex + 1).toString().padStart(2, '0')}</span>
              <span className="v-label">{t('sd_luxury_concept')}</span>
            </div>
          </div>
        </aside>

        {/* RIGHT: Content Scrollable Panel */}
        <section className="concept-content">
          <header className="concept-header">
            <span className="concept-tag animate-in">{t('est')}</span>
            <h1 className="animate-in">{content.title}</h1>
            <p className="concept-lead animate-in">{content.desc}</p>
          </header>

          <div className="concept-narrative animate-in">
            {/* 01: THE VISION */}
            <div className="narrative-block">
              <span className="n-label">01 // {t('about').toUpperCase()}</span>
              <div className="n-content">
                <p className="large-p">{content.longDesc}</p>
                <p className="detail-p">
                  {t('sd_vision_text').replace('{title}', content.title)}
                </p>
              </div>
            </div>

            {/* 02: THE MANIFESTO / INCLUSIONS */}
            <div className="narrative-block">
              <span className="n-label">02 // {t('sd_manifesto')}</span>
              <div className="manifest-grid">
                {(content.includes || [
                  t('sd_sight_desc').split('.')[0],
                  t('sd_sound_desc').split('.')[0],
                  t('sd_taste_desc').split('.')[0]
                ]).map((item: string, i: number) => (
                  <div key={i} className="manifest-item">
                    <div className="m-line"></div>
                    <div className="m-info">
                      <span className="m-idx">{i + 1}</span>
                      <span className="m-text">{item}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* 03: THE EXPERIENCE */}
            <div className="narrative-block">
              <span className="n-label">03 // {t('sd_experience')}</span>
              <div className="experience-box">
                <div className="exp-item">
                  <h4>{t('sd_sight')}</h4>
                  <p>{t('sd_sight_desc')}</p>
                </div>
                <div className="exp-item">
                  <h4>{t('sd_sound')}</h4>
                  <p>{t('sd_sound_desc')}</p>
                </div>
                <div className="exp-item">
                  <h4>{t('sd_taste')}</h4>
                  <p>{t('sd_taste_desc')}</p>
                </div>
              </div>
            </div>

            {/* 04: TECHNICAL_SPECIFICATIONS */}
            <div className="narrative-block">
              <span className="n-label">04 // {t('sd_tech_specs')}</span>
              <div className="specs-table">
                <div className="spec-row">
                  <span className="s-label">{t('sd_setup_time')}</span>
                  <span className="s-value">120 - 180 {t('unit_min')}</span>
                </div>
                <div className="spec-row">
                  <span className="s-label">{t('sd_min_space')}</span>
                  <span className="s-value">3{t('unit_m')} x 2{t('unit_m')}</span>
                </div>
                <div className="spec-row">
                  <span className="s-label">{t('sd_power_req')}</span>
                  <span className="s-value">2x 230V / 16A</span>
                </div>
                <div className="spec-row">
                  <span className="s-label">{t('sd_capacity')}</span>
                  <span className="s-value">{t('sd_unlimited').toUpperCase()}</span>
                </div>
              </div>
            </div>

            <div className="action-row">
              <button 
                onClick={() => navigate(`${urlPrefix}/#contact`)} 
                className="reserve-btn"
              >
                {t('book').toUpperCase()}
              </button>
            </div>
          </div>

          {/* NEXT CONCEPT NAVIGATOR */}
          <footer className="next-concept-footer">
            <Link to={`${urlPrefix}/services/${nextService.slug}`} className="next-link">
              <span className="next-tag">{t('sd_up_next')}</span>
              <div className="next-title-row">
                <h2>{(nextService as any)[lang].title}</h2>
                <div className="next-arrow">→</div>
              </div>
            </Link>
          </footer>
        </section>
      </main>
    </div>
  );
};

export default ServiceDetail;
