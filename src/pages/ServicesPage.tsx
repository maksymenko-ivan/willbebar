import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { services } from '../data/data';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const ServicesPage: React.FC = () => {
  const { lang, urlPrefix, t } = useLanguage();
  const [activeCat, setActiveCat] = useState('cat_all');

  const categories = [
    { id: 'cat_all', label: t('cat_all') },
    { id: 'cat_bars', label: t('cat_bars') },
    { id: 'cat_experience', label: t('cat_experience') },
    { id: 'cat_catering', label: t('cat_catering') }
  ];

  const filteredServices = useMemo(() => {
    if (activeCat === 'cat_all') return services;
    if (activeCat === 'cat_bars') return services.slice(0, 12);
    if (activeCat === 'cat_experience') return services.slice(12, 18);
    return services.slice(18);
  }, [activeCat]);

  return (
    <div className="archive-browser-page">
      <SEO title={t('services')} description="The complete luxury concept archive." />
      <Navbar />
      
      <main className="archive-container">
        <header className="archive-header animate-in">
          <div className="archive-title-area">
            <span className="archive-tag">SYS // {t('concept_registry').toUpperCase()}</span>
            <h1>{t('services')}</h1>
            <p className="archive-intro">{t('archive_intro_services')}</p>
          </div>
          
          <nav className="archive-tabs">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`archive-tab ${activeCat === cat.id ? 'active' : ''}`}
                onClick={() => setActiveCat(cat.id)}
              >
                <span className="tab-label">{cat.label.toUpperCase()}</span>
                <span className="tab-count">{cat.id === 'cat_all' ? services.length : services.filter((_, idx) => {
                   if (cat.id === 'cat_bars') return idx < 12;
                   if (cat.id === 'cat_experience') return idx >= 12 && idx < 18;
                   return idx >= 18;
                }).length}</span>
              </button>
            ))}
          </nav>
        </header>

        <div className="archive-concepts-list">
          {filteredServices.map((service: any) => {
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
                    <div className="archive-action-arrow">→</div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </main>
    </div>
  );
};

export default ServicesPage;
