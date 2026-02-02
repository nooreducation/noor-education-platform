import { GraduationCap } from 'lucide-react';

const LoadingSpinner = () => {
    return (
        <div className="loading-container">
            <div className="loading-content">
                <div className="loading-logo">
                    <GraduationCap size={48} />
                </div>
                <div className="spinner"></div>
                <p>Chargement...</p>
            </div>

            <style jsx>{`
        .loading-container {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-primary);
          z-index: 9999;
        }

        .loading-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-lg);
        }

        .loading-logo {
          width: 80px;
          height: 80px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 0 0 rgba(108, 99, 255, 0.7);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 0 20px rgba(108, 99, 255, 0);
          }
        }

        .loading-content p {
          color: var(--text-secondary);
          font-size: 1.125rem;
          margin: 0;
        }
      `}</style>
        </div>
    );
};

export default LoadingSpinner;
