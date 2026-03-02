import React, { useState } from 'react';
import { galleryImages } from '../data/data';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Gallery: React.FC = () => {
  const { lang, t } = useLanguage();
  const [filter, setFilter] = useState('All');
  const [selectedImg, setSelectedImg] = useState<string | null>(null);

  const categories = [
    { id: 'All', label: t('cat_all') },
    { id: 'Weddings', label: t('cat_weddings') },
    { id: 'Corporate', label: t('cat_corporate') },
    { id: 'Mixology', label: t('cat_mixology') }
  ];

  const filteredImages = filter === 'All' 
    ? galleryImages 
    : galleryImages.filter((img: any) => img[lang].category === t(`cat_${filter.toLowerCase()}`));

  return (
    <div className="archive-browser-page">
      <SEO title={t('gallery')} description="A curated visual archive of our finest events." />
      <Navbar />
      
      <main className="archive-container">
        <header className="archive-header animate-in">
          <div className="archive-title-area">
            <span className="archive-tag">SYS // {t('visual_archive').toUpperCase()}</span>
            <h1>{t('gallery')}</h1>
            <p className="archive-intro">{t('archive_intro_gallery')}</p>
          </div>
          
          <nav className="archive-tabs">
            {categories.map(cat => (
              <button 
                key={cat.id} 
                className={`archive-tab ${filter === cat.id ? 'active' : ''}`}
                onClick={() => setFilter(cat.id)}
              >
                <span className="tab-label">{cat.label.toUpperCase()}</span>
                <span className="tab-count">
                  {cat.id === 'All' ? galleryImages.length : galleryImages.filter((i: any) => i[lang].category === cat.label).length}
                </span>
              </button>
            ))}
          </nav>
        </header>

        <div className="gallery-masonry-grid">
          {filteredImages.map((img: any, idx: number) => {
            // Larger, more impactful spans
            let sizeClass = "";
            if (idx % 8 === 0) sizeClass = "big"; // 2x2
            else if (idx % 5 === 0) sizeClass = "wide"; // 2x1
            else if (idx % 3 === 0) sizeClass = "tall"; // 1x2

            return (
              <div 
                key={idx} 
                className={`gallery-panel ${sizeClass}`} 
                onClick={() => setSelectedImg(img.url)}
              >
                <div className="panel-frame">
                  <img src={img.url} alt={`Gallery ${idx}`} loading="lazy" />
                  <div className="panel-overlay">
                    <div className="panel-meta">
                      <span className="panel-num">{(idx + 1).toString().padStart(3, '0')}</span>
                      <span className="panel-cat">{img[lang].category.toUpperCase()}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </main>

      {/* Lightbox */}
      {selectedImg && (
        <div className="lightbox-overlay active" onClick={() => setSelectedImg(null)}>
          <button className="close-lightbox">×</button>
          <img src={selectedImg} alt={t('enlarged_view')} loading="lazy" onClick={(e) => e.stopPropagation()} />
        </div>
      )}
    </div>
  );
};

export default Gallery;
