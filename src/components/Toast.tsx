import React, { useEffect } from 'react';

interface ToastProps {
  message: string;
  isVisible: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(onClose, 3000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="toast-notification">
      <div className="toast-content">
        <span className="toast-icon">✓</span>
        <span className="toast-message">{message}</span>
      </div>
      <style>{`
        .toast-notification {
          position: fixed;
          bottom: 2rem;
          left: 50%;
          transform: translateX(-50%);
          background: #0a0a0c;
          border: 1px solid var(--accent);
          color: #fff;
          padding: 1rem 2rem;
          z-index: 100000;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
          animation: toastIn 0.5s cubic-bezier(0.19, 1, 0.22, 1);
          border-radius: 4px;
        }

        .toast-content {
          display: flex;
          align-items: center;
          gap: 1rem;
        }

        .toast-icon {
          color: var(--accent);
          font-weight: bold;
        }

        .toast-message {
          font-family: monospace;
          font-size: 0.8rem;
          letter-spacing: 1px;
          text-transform: uppercase;
        }

        @keyframes toastIn {
          from { transform: translate(-50%, 100%); opacity: 0; }
          to { transform: translate(-50%, 0); opacity: 1; }
        }
      `}</style>
    </div>
  );
};

export default Toast;
