import React, { useMemo } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { cocktails, services } from '../data/data';
import Navbar from '../components/Navbar';
import SEO from '../components/SEO';
import { useLanguage } from '../context/LanguageContext';

const CocktailDetail: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { lang, urlPrefix, t } = useLanguage();
  const navigate = useNavigate();
  
  const currentIndex = useMemo(() => cocktails.findIndex(c => c.slug === slug), [slug]);
  const cocktail = cocktails[currentIndex];
  const nextCocktail = cocktails[(currentIndex + 1) % cocktails.length];

  if (!cocktail) return <div className="detail-not-found">{t('cocktail_not_found')}</div>;
  
  const content = cocktail[lang];
  const serviceMatch = services.find(s => s.slug === cocktail.serviceSlug);

  // Mock flavor data for visualization - in a real app this would come from data.ts
  const flavorProfile = [
    { label: t('tp_sweet'), val: 65 },
    { label: t('tp_sour'), val: 40 },
    { label: t('tp_strong'), val: 85 },
    { label: t('tp_smoky'), val: 20 },
    { label: t('tp_herbal'), val: 30 }
  ];

  return (
    <div className="cocktail-detail-v2">
      <SEO title={content.name} description={content.desc} />
      <Navbar />

      <main className="cocktail-view">
        {/* CINEMATIC HERO */}
        <header className="cocktail-hero">
          <div className="hero-visual">
            <img src={cocktail.image} alt={content.name} className="hero-img" />
            <div className="hero-overlay"></div>
          </div>
          
          <div className="hero-text animate-in">
            <span className="cocktail-id">{t('unit_id')}: CK-{cocktail.id.toString().padStart(3, '0')}</span>
            <h1>{content.name}</h1>
            <p className="hero-price">{cocktail.price}</p>
          </div>
        </header>

        <section className="cocktail-blueprint">
          <div className="blueprint-container">
            
            {/* LEFT: Technical Narrative */}
            <div className="bp-column bp-narrative animate-in">
              <div className="bp-block">
                <span className="bp-tag">01 // {t('about').toUpperCase()}</span>
                <h2>{content.type} {t('architecture')}</h2>
                <p className="bp-long-desc">{content.longDesc || content.desc}</p>
              </div>

              <div className="bp-block">
                <span className="bp-tag">02 // {t('flavor_profile')}</span>
                <div className="flavor-matrix">
                  {flavorProfile.map((f, i) => (
                    <div key={i} className="flavor-row">
                      <div className="f-label">
                        <span>{f.label}</span>
                        <span>{f.val}%</span>
                      </div>
                      <div className="f-bar-bg">
                        <div className="f-bar-fill" style={{ width: `${f.val}%`, transitionDelay: `${i * 0.1}s` }}></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* RIGHT: Visual Blueprint */}
            <div className="bp-column bp-specs animate-in">
              <div className="bp-block">
                <span className="bp-tag">03 // {t('serve_context')}</span>
                <div className="technical-specs-grid">
                  <div className="t-spec">
                    <span className="t-label">{t('tp_vessel')}</span>
                    <span className="t-val">{t('vessel_crystal')}</span>
                  </div>
                  <div className="t-spec">
                    <span className="t-label">{t('ice_program')}</span>
                    <span className="t-val">{t('ice_clear_cube')}</span>
                  </div>
                  <div className="t-spec">
                    <span className="t-label">{t('garnish')}</span>
                    <span className="t-val">{t('garnish_botanicals')}</span>
                  </div>
                  <div className="t-spec">
                    <span className="t-label">{t('service_match')}</span>
                    <span className="t-val highlight">{serviceMatch ? (serviceMatch as any)[lang].title : 'SIGNATURE'}</span>
                  </div>
                </div>
              </div>

              <div className="bp-block">
                <div className="action-box-refined">
                  <p>{t('exp_concept')}</p>
                  <button onClick={() => navigate(`${urlPrefix}/#contact`)} className="blueprint-btn">
                    {t('book_event').toUpperCase()}
                  </button>
                </div>
              </div>
            </div>

          </div>
        </section>

        {/* DISCOVERY FOOTER */}
        <footer className="cocktail-navigator">
          <Link to={`${urlPrefix}/cocktails/${nextCocktail.slug}`} className="nav-next-cocktail">
            <div className="nav-img">
              <img src={nextCocktail.image} alt={nextCocktail[lang].name} loading="lazy" />
            </div>
            <div className="nav-info">
              <span className="nav-sub">{t('discover_next')}</span>
              <h3>{nextCocktail[lang].name}</h3>
              <div className="nav-arrow">→</div>
            </div>
          </Link>
        </footer>
      </main>
    </div>
  );
};

export default CocktailDetail;
