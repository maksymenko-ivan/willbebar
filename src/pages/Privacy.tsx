import React from 'react';
import Navbar from '../components/Navbar';
import { useLanguage } from '../context/LanguageContext';
import SEO from '../components/SEO';

const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="privacy-page-editorial">
      <SEO title={t('privacy_policy')} description="Privacy Policy and Data Protection." />
      <Navbar />

      <main className="privacy-main">
        <header className="privacy-header animate-in">
          <span className="privacy-tag">{t('privacy_tag')}</span>
          <h1>{t('privacy_policy')}</h1>
        </header>

        <section className="privacy-content animate-in">
          <div className="policy-block">
            <span className="block-num">01</span>
            <h2>{t('privacy_h2_1')}</h2>
            <p>{t('privacy_p_1')}</p>
          </div>

          <div className="policy-block">
            <span className="block-num">02</span>
            <h2>{t('privacy_h2_2')}</h2>
            <p>{t('privacy_p_2')}</p>
          </div>

          <div className="policy-block">
            <span className="block-num">03</span>
            <h2>{t('privacy_h2_3')}</h2>
            <p>{t('privacy_p_3')}</p>
          </div>
        </section>
      </main>

      <style>{`
        .privacy-page-editorial {
          background: #000;
          min-height: 100vh;
          color: #fff;
        }

        .privacy-main {
          max-width: 1000px;
          margin: 0 auto;
          padding: 14rem 5% 8rem;
        }

        .privacy-header {
          margin-bottom: 8rem;
          border-bottom: 1px solid var(--border);
          padding-bottom: 4rem;
        }

        .privacy-tag {
          font-family: monospace;
          font-size: 0.7rem;
          color: var(--accent);
          letter-spacing: 4px;
          display: block;
          margin-bottom: 2rem;
        }

        .privacy-header h1 {
          font-size: clamp(3rem, 8vw, 5rem);
          line-height: 0.9;
          letter-spacing: -2px;
        }

        .privacy-content {
          display: flex;
          flex-direction: column;
          gap: 6rem;
        }

        .policy-block {
          position: relative;
          padding-left: 4rem;
        }

        .block-num {
          position: absolute;
          left: 0; top: 0;
          font-family: 'Playfair Display', serif;
          font-size: 1.5rem;
          color: var(--accent);
          opacity: 0.4;
        }

        .policy-block h2 {
          font-size: 1.8rem;
          margin-bottom: 1.5rem;
          letter-spacing: 1px;
        }

        .policy-block p {
          color: var(--text-muted);
          line-height: 1.8;
          font-size: 1.1rem;
          font-weight: 300;
        }

        @media (max-width: 768px) {
          .privacy-main { padding-top: 100px; }
          .privacy-header { margin-bottom: 4rem; }
          .policy-block { padding-left: 0; padding-top: 3rem; }
          .policy-block h2 { font-size: 1.5rem; }
        }
      `}</style>
    </div>
  );
};

export default Privacy;
