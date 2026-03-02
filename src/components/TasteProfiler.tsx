import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const TasteProfiler: React.FC = () => {
  const { lang, urlPrefix, t } = useLanguage();
  
  const [profile, setProfile] = useState({
    SWEET: 50,
    SOUR: 50,
    STRONG: 50,
    SMOKY: 20,
    HERBAL: 30
  });

  const categories = Object.keys(profile) as Array<keyof typeof profile>;
  const categoryLabels: Record<string, string> = {
    SWEET: t('tp_sweet'),
    SOUR: t('tp_sour'),
    STRONG: t('tp_strong'),
    SMOKY: t('tp_smoky'),
    HERBAL: t('tp_herbal')
  };
  
  // Calculate exact coordinates for the SVG Radar Chart
  const getPoints = () => {
    return categories.map((cat, i) => {
      const val = profile[cat];
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const r = 120 * (val / 100);
      return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
    }).join(' ');
  };

  // Draw concentric background grid
  const getGridPoints = (scale: number) => {
    return categories.map((_, i) => {
      const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
      const r = 120 * scale;
      return `${150 + r * Math.cos(angle)},${150 + r * Math.sin(angle)}`;
    }).join(' ');
  };

  // Label coordinates
  const getLabelPos = (i: number) => {
    const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
    const r = 145; // slightly outside the max radius
    return {
      x: 150 + r * Math.cos(angle),
      y: 150 + r * Math.sin(angle)
    };
  };

  const handleSliderChange = (cat: keyof typeof profile, val: number) => {
    setProfile(prev => ({ ...prev, [cat]: val }));
  };

  // Dynamic analysis engine
  const analyzeProfile = () => {
    const { SWEET, SOUR, STRONG, SMOKY, HERBAL } = profile;
    
    const results: Record<string, any> = {
      'SMK-01': {
        CZ: { name: "EXPERIMENT NOIR", desc: "Těžký, komplexní profil vyžadující kouř z dubu, prémiové stařené destiláty a ražbu do čirého ledu.", match: "Molekulární bar", base: "Bourbon / Mezcal", glass: "Těžký Tumbler" },
        EN: { name: "THE NOIR EXPERIMENT", desc: "A heavy, complex profile requiring oak smoke, premium aged spirits, and clear ice stamping.", match: "Molecular Bar", base: "Bourbon / Mezcal", glass: "Heavy Tumbler" },
        UA: { name: "ЕКСПЕРИМЕНТ НУАР", desc: "Важкий, складний профіль, що потребує дубового диму, преміальних витриманих спиртів та штампування на чистому льоду.", match: "Молекулярний бар", base: "Бурбон / Мескаль", glass: "Важкий тамблер" }
      },
      'HRB-02': {
        CZ: { name: "BOTANICKÁ SYMFONIE", desc: "Svěží, aromatické a ostré. Ideální pro molekulární sférizaci a prezentaci v suchém ledu.", match: "CRIO bar", base: "Gin / Akvavit", glass: "Coupette" },
        EN: { name: "BOTANICAL SYMPHONY", desc: "Fresh, aromatic, and sharp. Perfect for molecular spherification and dry ice presentation.", match: "CRIO Bar", base: "Gin / Aquavit", glass: "Coupette" },
        UA: { name: "БОТАНІЧНА СИМФОНІЯ", desc: "Свіжий, ароматний і гострий. Ідеально підходить для молекулярної сферифікації та презентації з сухим льодом.", match: "CRIO бар", base: "Джин / Аквавіт", glass: "Купет" }
      },
      'TROP-03': {
        CZ: { name: "TROPICKÁ ILUZE", desc: "Živé a vyvážené. Nejlépe podávané s barmanskou show a klarifikací exotického ovoce.", match: "Tiki bar", base: "Rum / Tequila", glass: "Highball" },
        EN: { name: "TROPICAL ILLUSION", desc: "Vibrant and balanced. Best served with flair theatrics and exotic fruit clarification.", match: "Tiki Bar", base: "Rum / Tequila", glass: "Highball" },
        UA: { name: "ТРОПІЧНА ІЛЮЗІЯ", desc: "Яскравий і збалансований. Найкраще подавати з флейрінг-шоу та кларифікацією екзотичних фруктів.", match: "Тікі бар", base: "Ром / Текіла", glass: "Хайбол" }
      },
      'STR-04': {
        CZ: { name: "EXECUTIVEC", desc: "Silné a nekompromisní. Vyžaduje minimalistickou dokonalost a suroviny nejvyšší kvality.", match: "Autorský bar", base: "Whiskey / Koňak", glass: "Rocks Glass" },
        EN: { name: "THE EXECUTIVE", desc: "Spirit-forward and uncompromising. Requires minimalist perfection and highest quality ingredients.", match: "Signature Bar", base: "Whiskey / Cognac", glass: "Rocks Glass" },
        UA: { name: "ЕКСЕКУТИВ", desc: "Міцний і безкомпромісний. Потребує мінімалістичної досконалості та інгредієнтів найвищої якості.", match: "Авторський бар", base: "Віскі / Коньяк", glass: "Рокс" }
      },
      'BLN-00': {
        CZ: { name: "SIGNATURE BALANC", desc: "Dokonale vyvážený profil vhodný pro velké rozmanité skupiny a elegantní recepce.", match: "Svatební bar", base: "Prémiová Vodka", glass: "Univerzální" },
        EN: { name: "THE SIGNATURE BALANCE", desc: "A perfectly rounded profile suitable for large diverse crowds and elegant receptions.", match: "Wedding Bar", base: "Premium Vodka", glass: "Versatile" },
        UA: { name: "СИГНАТУРНИЙ БАЛАНС", desc: "Ідеально збалансований профіль, що підходить для великих різноманітних компаній та елегантних прийомів.", match: "Весільний бар", base: "Преміальна горілка", glass: "Універсальний" }
      }
    };

    let id = 'BLN-00';
    if (SMOKY > 70 && STRONG > 60) id = 'SMK-01';
    else if (HERBAL > 70 && SOUR > 50) id = 'HRB-02';
    else if (SWEET > 60 && SOUR > 60) id = 'TROP-03';
    else if (STRONG > 80) id = 'STR-04';

    return { id, ...results[id][lang as keyof typeof results['BLN-00']] };
  };

  const analysis = analyzeProfile();

  return (
    <section className="app-console-section animate-in">
      <div className="console-container">
        <div className="console-header">
          <span className="system-tag">{t('tp_tag')}</span>
          <h2>{t('tp_h2')}</h2>
          <p>{t('tp_p')}</p>
        </div>

        <div className="console-interface">
          
          {/* LEFT: Radar Chart & Inputs */}
          <div className="console-panel left-panel">
            <div className="radar-container">
              <svg width="300" height="300" viewBox="0 0 300 300" className="radar-svg">
                {/* Background Grid */}
                {[0.2, 0.4, 0.6, 0.8, 1].map((scale, i) => (
                  <polygon key={i} points={getGridPoints(scale)} className="radar-grid" />
                ))}
                
                {/* Axis Lines */}
                {categories.map((_, i) => {
                  const pos = getLabelPos(i);
                  return <line key={`line-${i}`} x1="150" y1="150" x2={pos.x} y2={pos.y} className="radar-axis" />;
                })}

                {/* Data Polygon */}
                <polygon points={getPoints()} className="radar-data" />
                
                {/* Data Points */}
                {categories.map((cat, i) => {
                  const val = profile[cat];
                  const angle = (Math.PI * 2 * i) / 5 - Math.PI / 2;
                  const r = 120 * (val / 100);
                  const cx = 150 + r * Math.cos(angle);
                  const cy = 150 + r * Math.sin(angle);
                  return <circle key={`pt-${i}`} cx={cx} cy={cy} r="4" className="radar-point" />;
                })}

                {/* Labels */}
                {categories.map((cat, i) => {
                  const pos = getLabelPos(i);
                  return (
                    <text key={`lbl-${i}`} x={pos.x} y={pos.y} className="radar-label" textAnchor="middle" dominantBaseline="middle">
                      {categoryLabels[cat]}
                    </text>
                  );
                })}
              </svg>
            </div>

            <div className="slider-matrix">
              {categories.map(cat => (
                <div key={cat} className="matrix-row">
                  <div className="matrix-label">
                    <span>{categoryLabels[cat]}</span>
                    <span className="matrix-val">{profile[cat]}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={profile[cat]} 
                    onChange={(e) => handleSliderChange(cat, Number(e.target.value))}
                    className="app-slider"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Terminal Output */}
          <div className="console-panel right-panel window-frame">
            <div className="window-header">
              <div className="mac-buttons">
                <span className="mac-dot red"></span>
                <span className="mac-dot yellow"></span>
                <span className="mac-dot green"></span>
              </div>
              <div className="window-tag">{t('tp_blueprint')}</div>
            </div>
            
            <div className="terminal-body">
              <div className="term-block">
                <span className="term-label">ID PROFILU:</span>
                <span className="term-value highlight">{analysis.id}</span>
              </div>
              
              <div className="term-block main-block">
                <span className="term-label">GENEROVANÁ ARCHITEKTURA:</span>
                <h3 className="term-name">{analysis.name}</h3>
                <p className="term-desc">{analysis.desc}</p>
              </div>

              <div className="term-grid">
                <div className="term-block">
                  <span className="term-label">DOPORUČENÝ ZÁKLAD:</span>
                  <span className="term-value">{analysis.base}</span>
                </div>
                <div className="term-block">
                  <span className="term-label">SKLENICE:</span>
                  <span className="term-value">{analysis.glass}</span>
                </div>
              </div>

              <div className="term-action-area">
                <span className="term-label">OPTIMÁLNÍ INTEGRACE SLUŽEB:</span>
                <div className="integration-box">
                  <span className="int-match">{analysis.match}</span>
                  <Link to={`${urlPrefix}/services`} className="int-btn">{t('tp_initialize')} →</Link>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

      <style>{`
        .app-console-section {
          background: #000;
          padding: 8rem 5%;
          border-bottom: 1px solid var(--border);
          font-family: 'Inter', sans-serif;
        }

        .console-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .console-header {
          text-align: center;
          margin-bottom: 5rem;
        }

        .system-tag {
          font-family: monospace;
          color: var(--accent);
          font-size: 0.75rem;
          letter-spacing: 3px;
          display: block;
          margin-bottom: 1.5rem;
        }

        .console-header h2 {
          font-size: 3rem;
          color: #fff;
          letter-spacing: 2px;
          margin-bottom: 1rem;
        }

        .console-header p {
          color: var(--text-muted);
          max-width: 600px;
          margin: 0 auto;
          line-height: 1.6;
        }

        .console-interface {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
          background: #050505;
          border: 1px solid var(--border);
          border-radius: 32px; /* Increased rounding */
          padding: 1rem;
        }

        .console-panel {
          background: #0a0a0c;
          border: 1px solid rgba(255,255,255,0.05);
          border-radius: 24px; /* Increased rounding */
          padding: 3rem;
          display: flex;
          flex-direction: column;
        }

        /* RADAR CHART STYLES */
        .radar-container {
          display: flex;
          justify-content: center;
          margin-bottom: 3rem;
        }

        .radar-svg {
          overflow: visible;
        }

        .radar-grid {
          fill: none;
          stroke: rgba(255,255,255,0.1);
          stroke-width: 1;
        }

        .radar-axis {
          stroke: rgba(255,255,255,0.1);
          stroke-width: 1;
        }

        .radar-data {
          fill: rgba(212, 175, 55, 0.2);
          stroke: var(--accent);
          stroke-width: 2;
          transition: all 0.4s ease;
        }

        .radar-point {
          fill: #000;
          stroke: var(--accent);
          stroke-width: 2;
          transition: all 0.4s ease;
        }

        .radar-label {
          fill: var(--text-muted);
          font-size: 10px;
          font-family: monospace;
          letter-spacing: 1px;
        }

        /* SLIDERS */
        .slider-matrix {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .matrix-row {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .matrix-label {
          display: flex;
          justify-content: space-between;
          font-family: monospace;
          font-size: 0.75rem;
          color: #ccc;
        }

        .matrix-val {
          color: var(--accent);
        }

        .app-slider {
          -webkit-appearance: none;
          width: 100%;
          height: 4px;
          background: rgba(255,255,255,0.1);
          outline: none;
          border-radius: 2px;
        }

        .app-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          width: 16px;
          height: 16px;
          background: var(--accent);
          border-radius: 50%;
          cursor: pointer;
        }

        /* TERMINAL STYLES */
        .right-panel {
          padding: 0;
          background: #020202;
          font-family: monospace;
        }

        .terminal-header {
          display: flex;
          align-items: center;
          background: #111;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid var(--border);
        }

        .term-dots {
          display: flex;
          gap: 6px;
          margin-right: 1.5rem;
        }

        .term-dots span {
          width: 10px; height: 10px; border-radius: 50%;
          background: #333;
        }
        .term-dots span:nth-child(1) { background: #ff5f56; }
        .term-dots span:nth-child(2) { background: #ffbd2e; }
        .term-dots span:nth-child(3) { background: #27c93f; }

        .term-title {
          color: #666;
          font-size: 0.8rem;
          letter-spacing: 1px;
        }

        .terminal-body {
          padding: 3rem;
          display: flex;
          flex-direction: column;
          gap: 2.5rem;
          flex-grow: 1;
        }

        .term-label {
          display: block;
          color: #666;
          font-size: 0.7rem;
          letter-spacing: 2px;
          margin-bottom: 0.5rem;
        }

        .term-value {
          color: #fff;
          font-size: 1rem;
        }

        .term-value.highlight {
          color: var(--accent);
        }

        .main-block {
          border-left: 2px solid var(--accent);
          padding-left: 1.5rem;
        }

        .term-name {
          font-family: 'Playfair Display', serif;
          font-size: 2rem;
          color: #fff;
          margin: 0.5rem 0 1rem;
          line-height: 1.1;
        }

        .term-desc {
          color: #aaa;
          line-height: 1.6;
          font-family: 'Inter', sans-serif;
          font-size: 0.9rem;
        }

        .term-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 2rem;
        }

        .term-action-area {
          margin-top: auto;
          padding-top: 2rem;
          border-top: 1px dashed rgba(255,255,255,0.1);
        }

        .integration-box {
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: rgba(212, 175, 55, 0.05);
          border: 1px solid var(--accent-muted);
          padding: 1.5rem;
          margin-top: 1rem;
          border-radius: 16px; /* Rounded box */
        }

        .int-match {
          color: var(--accent);
          font-weight: bold;
          font-size: 1.1rem;
        }

        .int-btn {
          color: #000;
          background: var(--accent);
          padding: 0.5rem 1.5rem;
          font-size: 0.75rem;
          font-weight: bold;
          text-decoration: none;
          transition: all 0.3s;
          border-radius: 10px; /* Rounded button */
        }

        .int-btn:hover {
          background: #fff;
        }

        @media (max-width: 992px) {
          .console-interface { grid-template-columns: 1fr; }
          .console-header h2 { font-size: 2rem; }
          .terminal-body { padding: 2rem; }
          .term-grid { grid-template-columns: 1fr; }
        }
      `}</style>
    </section>
  );
};

export default TasteProfiler;
