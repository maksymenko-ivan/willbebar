import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Login: React.FC = () => {
  const { t } = useLanguage();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt');
  };

  return (
    <div className="login-container">
      <div className="window-frame login-card">
        <div className="window-header">
          <div className="mac-buttons">
            <span className="mac-dot red"></span>
            <span className="mac-dot yellow"></span>
            <span className="mac-dot green"></span>
          </div>
          <span className="window-tag">SECURITY_ENCRYPT // v1.0.9</span>
        </div>

        <div className="login-content">
          <div className="header">
            <h1>{t('login_title')}</h1>
            <p>{t('login_subtitle')}</p>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">{t('login_email')}</label>
              <input 
                type="email" 
                id="email" 
                placeholder="name@establishment.com" 
                required 
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">{t('login_password')}</label>
              <input 
                type="password" 
                id="password" 
                placeholder="••••••••" 
                required 
              />
            </div>

            <div className="options">
              <label className="checkbox-container">
                <input type="checkbox" />
                <span>{t('login_stay')}</span>
              </label>
              <a href="#" className="forgot-link">{t('login_forgot')}</a>
            </div>

            <button type="submit" className="login-btn">
              {t('login_enter')}
            </button>
          </form>

          <div className="social-login">
            <button className="social-btn">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" width="18" alt="Google" loading="lazy" />
              {t('login_guild')}
            </button>
          </div>

          <p className="footer-text">
            {t('login_not_member')} <a href="#">{t('login_request')}</a>
          </p>
        </div>
      </div>

      <style>{`
        .login-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg);
          padding: 2rem;
        }

        .login-card {
          width: 100%;
          max-width: 450px;
          background: var(--bg-offset);
        }

        .login-content {
          padding: 4rem;
        }

        .login-card .header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .login-card h1 {
          font-size: 2.5rem;
          margin-bottom: 0.5rem;
        }

        .login-card .header p {
          color: var(--text-muted);
          font-size: 0.9rem;
          letter-spacing: 1px;
        }

        .form-group {
          margin-bottom: 2rem;
        }

        .form-group label {
          display: block;
          font-family: monospace;
          font-size: 0.7rem;
          text-transform: uppercase;
          letter-spacing: 2px;
          color: var(--accent);
          margin-bottom: 0.8rem;
        }

        .form-group input {
          width: 100%;
          background: #000;
          border: 1px solid var(--border);
          padding: 1rem;
          color: #fff;
          font-family: inherit;
          transition: var(--transition);
        }

        .form-group input:focus {
          border-color: var(--accent);
          background: rgba(255,255,255,0.02);
        }

        .options {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.8rem;
          margin-bottom: 2.5rem;
        }

        .checkbox-container {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          cursor: pointer;
          color: var(--text-muted);
        }

        .forgot-link {
          color: var(--accent);
          opacity: 0.8;
        }

        .login-btn {
          width: 100%;
          background: var(--accent);
          color: #000;
          padding: 1.2rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 2px;
          margin-bottom: 2rem;
          transition: var(--transition);
        }

        .login-btn:hover {
          background: #fff;
        }

        .social-login {
          border-top: 1px solid var(--border);
          padding-top: 2rem;
          margin-bottom: 2rem;
        }

        .social-btn {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 1rem;
          background: #000;
          border: 1px solid var(--border);
          padding: 1rem;
          color: #fff;
          font-size: 0.85rem;
          transition: var(--transition);
        }

        .social-btn:hover {
          background: rgba(255,255,255,0.05);
        }

        .footer-text {
          text-align: center;
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        .footer-text a {
          color: var(--accent);
          margin-left: 0.5rem;
        }

        @media (max-width: 480px) {
          .login-content { padding: 3rem 2rem; }
        }
      `}</style>
    </div>
  );
};

export default Login;
