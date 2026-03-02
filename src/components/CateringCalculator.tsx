import React, { useState, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';

const CateringCalculator: React.FC = () => {
  const { t } = useLanguage();
  const [guests, setGuests] = useState(50);
  const [hours, setHours] = useState(4);
  const [results, setResults] = useState({ cocktails: 0, bars: 0, serviceStaff: 0 });

  useEffect(() => {
    const totalCocktails = Math.ceil(guests * 1.5 + (guests * (hours - 1)));
    const totalBars = Math.ceil(guests / 75);
    const bartenders = Math.ceil(guests / 50);
    let supportStaff = 0;
    if (guests >= 50) {
      supportStaff = Math.floor((guests - 50) / 100) + 1;
    }

    setResults({
      cocktails: totalCocktails,
      bars: totalBars,
      serviceStaff: bartenders + supportStaff
    });
  }, [guests, hours]);

  return (
    <section className="calculator-section animate-in">
      <div className="calc-container">
        <header className="calc-header">
          <span className="section-tag">{t('calc_tag')}</span>
          <h2>{t('calc_h2')}</h2>
          <p>{t('calc_p')}</p>
        </header>

        <div className="window-frame">
          <div className="window-header">
            <div className="mac-buttons">
              <span className="mac-dot red"></span>
              <span className="mac-dot yellow"></span>
              <span className="mac-dot green"></span>
            </div>
            <span className="window-tag">LOGISTICS_CALIBRATOR // v2.4.0</span>
          </div>

          <div className="calc-interface">
            <div className="calc-info">
              <div className="calc-inputs">
                <div className="input-range-group">
                  <div className="label-row">
                    <span>{t('calc_guests')}</span>
                    <span className="value-badge">{guests}</span>
                  </div>
                  <input 
                    type="range" min="20" max="500" step="10" 
                    value={guests} onChange={(e) => setGuests(parseInt(e.target.value))} 
                  />
                </div>

                <div className="input-range-group">
                  <div className="label-row">
                    <span>{t('calc_hours')}</span>
                    <span className="value-badge">{hours}h</span>
                  </div>
                  <input 
                    type="range" min="2" max="12" step="1" 
                    value={hours} onChange={(e) => setHours(parseInt(e.target.value))} 
                  />
                </div>
              </div>
            </div>

            <div className="calc-results-grid large-grid">
              <div className="res-card">
                <span className="res-val">{results.cocktails}</span>
                <span className="res-lab">{t('res_cocktails')}</span>
              </div>
              <div className="res-card">
                <span className="res-val">{results.bars}</span>
                <span className="res-lab">{t('res_bars')}</span>
              </div>
              <div className="res-card full-width-res">
                <span className="res-val">{results.serviceStaff}</span>
                <span className="res-lab">{t('res_staff')}</span>
              </div>
              <div className="res-footer-note">
                {t('res_note')}
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .calculator-section {
          background: #050505;
          padding: 8rem 5%;
          border-bottom: 1px solid var(--border);
        }

        .calc-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .calc-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .calc-header h2 {
          font-size: clamp(2.5rem, 5vw, 4rem);
          line-height: 1;
          margin: 1.5rem 0;
        }

        .calc-header p {
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .calc-interface {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          background: var(--bg-offset);
        }

        .calc-info {
          padding: 4rem;
          border-right: 1px solid var(--border);
        }

        .calc-inputs {
          display: flex;
          flex-direction: column;
          gap: 3rem;
        }

        .input-range-group {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .label-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-family: monospace;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.75rem;
          color: #ccc;
        }

        .value-badge {
          color: var(--accent);
          font-weight: bold;
          font-size: 1rem;
        }

        input[type="range"] {
          -webkit-appearance: none;
          width: 100%;
          height: 2px;
          background: rgba(255,255,255,0.1);
          outline: none;
        }

        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 12px;
          height: 12px;
          background: var(--accent);
          border-radius: 50%;
          cursor: pointer;
          box-shadow: 0 0 10px var(--accent-muted);
        }

        .calc-results-grid {
          padding: 4rem;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          background: #000;
        }

        .res-card {
          padding: 2.5rem;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .full-width-res {
          grid-column: span 2;
          background: var(--accent-muted);
          border-color: var(--accent);
        }

        .res-val {
          font-family: 'Playfair Display', serif;
          font-size: 3rem;
          color: var(--accent);
          line-height: 1;
        }

        .res-lab {
          font-family: monospace;
          font-size: 0.65rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--text-muted);
        }

        .res-footer-note {
          grid-column: span 2;
          font-family: monospace;
          font-size: 0.6rem;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-top: 1rem;
        }

        @media (max-width: 992px) {
          .calc-interface { grid-template-columns: 1fr; }
          .calc-info { border-right: none; border-bottom: 1px solid var(--border); padding: 3rem 2rem; }
          .calc-results-grid { padding: 3rem 2rem; }
        }
      `}</style>
    </section>
  );
};

export default CateringCalculator;
