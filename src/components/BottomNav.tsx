import React from 'react';
import { NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const BottomNav: React.FC = () => {
  const { t, urlPrefix } = useLanguage();

  return (
    <nav className="bottom-nav">
      <NavLink to={`${urlPrefix}/`} end className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path><polyline points="9 22 9 12 15 12 15 22"></polyline></svg>
        <span>{t('home')}</span>
      </NavLink>
      <NavLink to={`${urlPrefix}/services`} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
        <span>{t('services')}</span>
      </NavLink>
      <NavLink to={`${urlPrefix}/cocktails`} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path></svg>
        <span>{t('collection')}</span>
      </NavLink>
      <NavLink to={`${urlPrefix}/contact`} className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}>
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
        <span>{t('footer_contact')}</span>
      </NavLink>

      <style>{`
        .bottom-nav {
          position: fixed;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 70px;
          background: var(--glass);
          backdrop-filter: blur(30px);
          border-top: 1px solid var(--border);
          display: none;
          grid-template-columns: repeat(4, 1fr);
          z-index: 10001;
          padding-bottom: env(safe-area-inset-bottom);
        }

        @media (max-width: 768px) {
          .bottom-nav { display: grid; }
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          color: var(--text-muted);
          text-decoration: none;
          gap: 4px;
          transition: var(--transition);
        }

        .nav-item svg {
          width: 20px;
          height: 20px;
          stroke-width: 1.5;
        }

        .nav-item span {
          font-size: 0.6rem;
          text-transform: uppercase;
          letter-spacing: 1px;
          font-weight: 600;
        }

        .nav-item.active {
          color: var(--accent);
        }

        .nav-item.active svg {
          stroke: var(--accent);
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;
