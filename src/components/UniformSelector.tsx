import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const UniformSelector: React.FC = () => {
  const { t } = useLanguage();

  return (
    <section className="uniform-section">
      <div className="uniform-container">
        <header className="uniform-header animate-in">
          <span className="section-tag">{t('uniform_tag')}</span>
          <h2>{t('uniform_h2')}</h2>
          <p>{t('uniform_p')}</p>
        </header>

        <div className="window-frame animate-in">
          <div className="window-header">
            <div className="mac-buttons">
              <span className="mac-dot red"></span>
              <span className="mac-dot yellow"></span>
              <span className="mac-dot green"></span>
            </div>
            <span className="window-tag">ATTIRE_ARCHIVE // v4.0.1</span>
          </div>

          <div className="uniform-layout">
            {/* FULL IMAGE BOX */}
            <div className="uniform-full-display">
              <img 
                src="https://static.tildacdn.net/tild6463-6137-4639-b036-623962633239/noroot.png" 
                alt="Bartender Uniform Collection" 
                className="uniform-full-img"
              />
              <div className="uniform-frame-overlay"></div>
            </div>

            {/* SPECIFICATION TEXT */}
            <div className="uniform-spec-content">
              <div className="spec-block">
                <span className="spec-tag">{t('uniform_philosophy_tag')}</span>
                <h3>{t('uniform_philosophy_h3')}</h3>
                <p>{t('uniform_philosophy_p')}</p>
              </div>

              <div className="spec-block">
                <span className="spec-tag">{t('uniform_stats_tag')}</span>
                <ul className="config-list">
                  <li><strong>{t('uniform_style_24')}:</strong> {t('uniform_style_24_p')}</li>
                  <li><strong>{t('uniform_tailored')}:</strong> {t('uniform_tailored_p')}</li>
                  <li><strong>{t('uniform_beyond')}:</strong> {t('uniform_beyond_p')}</li>
                  <li><strong>{t('uniform_curation')}:</strong> {t('uniform_curation_p')}</li>
                </ul>
              </div>

              <div className="spec-block">
                <div className="attire-badge">
                  <span className="badge-num">24</span>
                  <span className="badge-text">{t('uniform_badge')}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .uniform-section {
          background: #000;
          padding: 8rem 5%;
          border-bottom: 1px solid var(--border);
        }

        .uniform-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .uniform-header {
          margin-bottom: 5rem;
          text-align: center;
        }

        .uniform-header h2 {
          font-size: clamp(2rem, 4vw, 3.5rem);
          line-height: 1;
          margin: 1.5rem 0;
          letter-spacing: -1px;
        }

        .uniform-header p {
          color: var(--text-muted);
          font-size: 1.1rem;
          max-width: 650px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .uniform-layout {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 0;
          align-items: stretch;
          background: var(--bg-offset);
        }

        .uniform-full-display {
          position: relative;
          background: #000;
          border-right: 1px solid var(--border);
          padding: 2rem;
        }

        .uniform-full-img {
          width: 100%;
          height: auto;
          display: block;
          filter: brightness(0.8) contrast(1.1);
        }

        .uniform-frame-overlay {
          position: absolute;
          top: 0; left: 0; right: 0; bottom: 0;
          border: 1px solid rgba(255,255,255,0.03);
          pointer-events: none;
          margin: 1rem;
        }

        .uniform-spec-content {
          display: flex;
          flex-direction: column;
          gap: 3rem;
          padding: 4rem;
          background: #050505;
        }

        .spec-tag {
          font-family: monospace;
          font-size: 0.65rem;
          color: var(--accent);
          letter-spacing: 3px;
          display: block;
          margin-bottom: 1.5rem;
          opacity: 0.6;
        }

        .uniform-spec-content h3 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
          color: #fff;
        }

        .uniform-spec-content p {
          color: var(--text-muted);
          font-size: 1rem;
          line-height: 1.7;
          font-weight: 300;
        }

        .config-list {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 1.2rem;
        }

        .config-list li {
          font-size: 0.9rem;
          color: #888;
          padding-left: 1.5rem;
          position: relative;
          line-height: 1.4;
        }

        .config-list li::before {
          content: '';
          position: absolute;
          left: 0; top: 0.7rem;
          width: 8px; height: 1px;
          background: var(--accent);
        }

        .config-list strong {
          color: #fff;
          font-family: monospace;
          font-size: 0.8rem;
          letter-spacing: 1px;
          margin-right: 0.5rem;
        }

        .attire-badge {
          display: inline-flex;
          align-items: center;
          gap: 2rem;
          padding: 2rem;
          border: 1px solid var(--border);
          background: rgba(212, 175, 55, 0.03);
          margin-top: auto;
        }

        .badge-num {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          color: var(--accent);
          line-height: 1;
        }

        .badge-text {
          font-family: monospace;
          font-size: 0.65rem;
          letter-spacing: 3px;
          color: #fff;
          font-weight: 800;
          line-height: 1.4;
        }

        @media (max-width: 1200px) {
          .uniform-layout { grid-template-columns: 1fr; }
          .uniform-full-display { border-right: none; border-bottom: 1px solid var(--border); }
        }

        @media (max-width: 768px) {
          .uniform-section { padding: 6rem 5%; }
          .uniform-spec-content { padding: 3rem 2rem; }
          .uniform-spec-content h3 { font-size: 1.5rem; }
          .attire-badge { width: 100%; justify-content: center; }
        }
      `}</style>
    </section>
  );
};

export default UniformSelector;
