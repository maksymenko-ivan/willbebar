import React, { useState, useMemo } from 'react';
import { cocktails, services } from '../data/data';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const CocktailsPage: React.FC = () => {
  const { lang, t } = useLanguage();
  const [activeCat, setActiveCat] = useState('cat_all');
  const [selectedCocktail, setSelectedCocktail] = useState<any>(null);

  const barServices = services.slice(0, 12);
  const categories = ['cat_all', ...barServices.map(s => s.slug)];

  const filteredCocktails = useMemo(() => {
    if (activeCat === 'cat_all') return cocktails;
    return cocktails.filter((c: any) => c.serviceSlug === activeCat);
  }, [activeCat]);
  
  return (
    <div className="cocktails-finder-archive">
      <SEO title={t('collection')} description="High-definition cocktail asset registry." />
      <Navbar />
      
      <main className="archive-container">
        <header className="archive-header animate-in">
          <div className="archive-title-area">
            <span className="archive-tag">SYS // {t('mixology_archive').toUpperCase()}</span>
            <h1>{t('collection')}</h1>
            <p className="archive-intro">{t('archive_intro_cocktails')}</p>
          </div>
        </header>

        <div className="finder-shell window-frame">
        {/* FINDER HEADER */}
        <div className="finder-header">
          <div className="mac-buttons">
            <span className="mac-dot red" onClick={() => setSelectedCocktail(null)}></span>
            <span className="mac-dot yellow"></span>
            <span className="mac-dot green"></span>
          </div>
          <div className="finder-path">
            <span className="path-root">{t('mixology_archive').toUpperCase()}</span>
            <span className="path-sep">/</span>
            <span className="path-active">
              {selectedCocktail ? selectedCocktail[lang].name.toUpperCase() : activeCat.toUpperCase()}
            </span>
          </div>
          <div className="window-tag">v4.8.2 // {selectedCocktail ? 'DETAIL_VIEW' : 'STABLE'}</div>
        </div>

        <div className="finder-body">
          {/* SIDEBAR TABS */}
          <aside className="finder-sidebar">
            <div className="sidebar-group">
              <span className="group-label">{t('collections')}</span>
              <nav className="sidebar-nav">
                {categories.map(catKey => {
                  const service = barServices.find(s => s.slug === catKey);
                  const label = catKey === 'cat_all' ? t('cat_all') : (service ? (service as any)[lang].title : catKey);
                  
                  return (
                    <button 
                      key={catKey} 
                      className={`sidebar-item ${activeCat === catKey ? 'active' : ''}`}
                      onClick={() => {
                        setActiveCat(catKey);
                        setSelectedCocktail(null);
                      }}
                    >
                      <span className="item-icon">◈</span>
                      <span className="item-label">{label}</span>
                    </button>
                  );
                })}
              </nav>
            </div>
            <div className="sidebar-scroll-hint">
              <div className="hint-line"></div>
              <span>{t('scroll_to_explore').toUpperCase()}</span>
            </div>
          </aside>

          {/* ASSET CANVAS / DETAIL VIEW */}
          <section className="finder-canvas">
            {selectedCocktail ? (
              /* DETAIL VIEW */
              <div className="app-detail-view animate-in">
                <button className="back-to-grid" onClick={() => setSelectedCocktail(null)}>← {t('back_to_collection')}</button>
                
                <div className="detail-layout">
                  <div className="detail-visual-box">
                    <img src={selectedCocktail.image} alt={selectedCocktail[lang].name} />
                  </div>
                  
                  <div className="detail-info-block">
                    <span className="detail-type-tag">{selectedCocktail[lang].type}</span>
                    <h2 className="detail-title">{selectedCocktail[lang].name}</h2>
                    <p className="detail-desc">{selectedCocktail[lang].longDesc || selectedCocktail[lang].desc}</p>
                    
                    <div className="detail-specs-grid">
                      <div className="spec-item">
                        <span className="spec-label">{t('tp_sour')}</span>
                        <div className="spec-bar"><div className="spec-fill" style={{width: '45%'}}></div></div>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">{t('tp_sweet')}</span>
                        <div className="spec-bar"><div className="spec-fill" style={{width: '65%'}}></div></div>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">{t('tp_fruity')}</span>
                        <div className="spec-bar"><div className="spec-fill" style={{width: '85%'}}></div></div>
                      </div>
                      <div className="spec-item">
                        <span className="spec-label">{t('tp_bitter')}</span>
                        <div className="spec-bar"><div className="spec-fill" style={{width: '25%'}}></div></div>
                      </div>
                    </div>

                    <div className="detail-ingredients-block">
                      <span className="detail-type-tag">{t('ingredients_list')}:</span>
                      <ul className="ingredients-list">
                        {selectedCocktail[lang].ingredients?.map((ing: string, i: number) => (
                          <li key={i}>{ing}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              /* GRID VIEW - 4 COLUMNS */
              <>
                <div className="canvas-header">
                  <h2><span>{filteredCocktails.length}</span> {t('units_detected')}</h2>
                </div>

                <div className="asset-grid">
                  {filteredCocktails.map((drink: any) => {
                    const content = drink[lang];
                    return (
                      <article key={drink.id} className="archive-unit" onClick={() => setSelectedCocktail(drink)}>
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
                    );
                  })}
                </div>
              </>
            )}
          </section>
        </div>
      </div>
      </main>
    </div>
  );
};

export default CocktailsPage;
