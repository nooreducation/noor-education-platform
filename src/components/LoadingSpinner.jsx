import AnimatedLogo from './AnimatedLogo';

const LoadingSpinner = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">
        <div className="brand-logo-wrapper" style={{ padding: '15px' }}>
          <AnimatedLogo size={120} />
        </div>
        <div className="spinner"></div>
        <p>Chargement de Noor Education...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
