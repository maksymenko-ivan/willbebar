import React from 'react';
import { Link } from 'react-router-dom';
import { cocktails } from '../data/data';
import { useLanguage } from '../context/LanguageContext';

const Menu: React.FC = () => {
  const { lang, t } = useLanguage();

  return (
    <section className="menu-section" id="menu">
      <div className="section-header">
        <h2>{t('collection')}</h2>
        <div className="divider"></div>
      </div>
      
      <div className="menu-grid">
        {cocktails.map((drink: any) => {
          const content = drink[lang];
          return (
            <Link key={drink.id} to={`/cocktails/${drink.slug}`} className="menu-item-link">
              <article className="menu-item cocktail-card">
                <div className="cocktail-image-container">
                  <img src={drink.image} alt={content.name} loading="lazy" />
                </div>
                <div className="cocktail-card-content">
                  <div className="item-header">
                    <span className="item-name">{content.name}</span>
                    <span className="item-price">{drink.price}</span>
                  </div>
                  <p className="item-desc-short">{content.desc}</p>
                  <div className="item-footer">
                    <span className="view-detail">{t('view_details')} →</span>
                  </div>
                </div>
              </article>
            </Link>
          );
        })}
      </div>
    </section>
  );
};

export default Menu;
