import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const SleekConcierge: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="concierge-wrapper">
      <button 
        className="concierge-trigger-icon-only" 
        onClick={() => window.open(`https://api.whatsapp.com/send?phone=420773144034&text=${encodeURIComponent(t('wa_message'))}`, '_blank')}
        aria-label="WhatsApp Us"
      >
        <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor">
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.347-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.067 2.877 1.215 3.076.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.216 1.36.186 1.871.11.57-.085 1.758-.719 2.006-1.412.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
      </button>

      <style>{`
        .concierge-wrapper {
          position: fixed;
          bottom: 3rem;
          right: 3rem;
          z-index: 9999;
        }

        .concierge-trigger-icon-only {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: rgba(10, 10, 12, 0.6);
          backdrop-filter: blur(20px);
          border: 1px solid var(--border);
          color: var(--accent);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.5s cubic-bezier(0.165, 0.84, 0.44, 1);
          box-shadow: 0 15px 35px rgba(0,0,0,0.4);
          position: relative;
          overflow: hidden;
        }

        .concierge-trigger-icon-only::before {
          content: '';
          position: absolute;
          top: 0; left: 0; width: 100%; height: 100%;
          background: linear-gradient(45deg, transparent, rgba(212, 175, 55, 0.1), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .concierge-trigger-icon-only:hover {
          transform: translateY(-5px) scale(1.05);
          border-color: var(--accent);
          box-shadow: 0 20px 40px rgba(212, 175, 55, 0.15);
          color: #fff;
        }

        .concierge-trigger-icon-only:hover::before {
          transform: translateX(100%);
        }

        .concierge-trigger-icon-only svg {
          transition: transform 0.5s ease;
        }

        .concierge-trigger-icon-only:hover svg {
          transform: rotate(10deg);
        }

        @media (max-width: 768px) {
          .concierge-wrapper {
            bottom: 2rem;
            right: 2rem;
          }
          .concierge-trigger-icon-only {
            width: 50px;
            height: 50px;
          }
        }
      `}</style>
    </div>
  );
};

export default SleekConcierge;
