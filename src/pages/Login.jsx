import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { GraduationCap, Shield, Users, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
    const navigate = useNavigate();
    const { signIn } = useAuthStore();

    const [selectedRole, setSelectedRole] = useState(null);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const roles = [
        {
            id: 'student',
            title: 'Élève',
            icon: GraduationCap,
            color: '#6C63FF',
            description: 'Accédez à vos cours interactifs'
        },
        {
            id: 'parent',
            title: 'Parent',
            icon: Users,
            color: '#4ECDC4',
            description: 'Suivez la progression de vos enfants'
        },
        {
            id: 'admin',
            title: 'Administrateur',
            icon: Shield,
            color: '#FF6B6B',
            description: 'Gérez la plateforme'
        }
    ];

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!selectedRole) {
            toast.error('Veuillez sélectionner votre rôle');
            return;
        }

        setLoading(true);

        try {
            await signIn(email, password);
            toast.success('Connexion réussie !');

            // Redirect based on role
            switch (selectedRole) {
                case 'student':
                    navigate('/student');
                    break;
                case 'parent':
                    navigate('/parent');
                    break;
                case 'admin':
                    navigate('/admin');
                    break;
                default:
                    navigate('/');
            }
        } catch (error) {
            toast.error(error.message || 'Erreur de connexion');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-page">
            <div className="animated-bg"></div>

            <div className="login-container">
                <div className="login-header slide-down">
                    <div className="logo-section">
                        <div className="logo-circle">
                            <GraduationCap size={40} />
                        </div>
                        <h1 className="text-gradient">Noor Education</h1>
                    </div>
                    <p>Plateforme d'apprentissage interactive</p>
                </div>

                {!selectedRole ? (
                    <div className="role-selection fade-in">
                        <h2>Choisissez votre profil</h2>
                        <div className="roles-grid">
                            {roles.map((role, index) => {
                                const Icon = role.icon;
                                return (
                                    <button
                                        key={role.id}
                                        className="role-card"
                                        onClick={() => setSelectedRole(role.id)}
                                        style={{
                                            animationDelay: `${index * 0.1}s`,
                                            '--role-color': role.color
                                        }}
                                    >
                                        <div className="role-icon">
                                            <Icon size={32} />
                                        </div>
                                        <h3>{role.title}</h3>
                                        <p>{role.description}</p>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                ) : (
                    <div className="login-form-container scale-in">
                        <button
                            className="back-btn"
                            onClick={() => setSelectedRole(null)}
                        >
                            ← Retour
                        </button>

                        <div className="selected-role-display">
                            {(() => {
                                const role = roles.find(r => r.id === selectedRole);
                                const Icon = role.icon;
                                return (
                                    <>
                                        <div className="role-icon-small" style={{ background: role.color }}>
                                            <Icon size={24} />
                                        </div>
                                        <span>{role.title}</span>
                                    </>
                                );
                            })()}
                        </div>

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label className="form-label">
                                    <Mail size={18} />
                                    Email
                                </label>
                                <input
                                    type="email"
                                    className="form-input"
                                    placeholder="votre-email@exemple.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    <Lock size={18} />
                                    Mot de passe
                                </label>
                                <div className="password-input-wrapper">
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        className="form-input"
                                        placeholder="••••••••"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                className="btn btn-primary btn-full"
                                disabled={loading}
                            >
                                {loading ? (
                                    <div className="spinner"></div>
                                ) : (
                                    'Se connecter'
                                )}
                            </button>
                        </form>

                        <div className="login-footer">
                            <a href="#" className="link-secondary">Mot de passe oublié ?</a>
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        .login-page {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
          position: relative;
        }

        .login-container {
          width: 100%;
          max-width: 800px;
          position: relative;
          z-index: 1;
        }

        .login-header {
          text-align: center;
          margin-bottom: var(--spacing-2xl);
        }

        .logo-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }

        .logo-circle {
          width: 60px;
          height: 60px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: var(--shadow-glow);
        }

        .login-header h1 {
          font-size: 2.5rem;
          margin: 0;
        }

        .login-header p {
          color: var(--text-secondary);
          font-size: 1.125rem;
        }

        /* Role Selection */
        .role-selection h2 {
          text-align: center;
          margin-bottom: var(--spacing-xl);
          color: var(--text-primary);
        }

        .roles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: var(--spacing-lg);
        }

        .role-card {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          cursor: pointer;
          transition: all var(--transition-base);
          text-align: center;
          animation: slideUp 0.5s ease-out;
          animation-fill-mode: both;
          position: relative;
          overflow: hidden;
        }

        .role-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: var(--role-color);
          opacity: 0;
          transition: opacity var(--transition-base);
        }

        .role-card:hover {
          transform: translateY(-8px);
          border-color: var(--role-color);
          box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3);
        }

        .role-card:hover::before {
          opacity: 0.1;
        }

        .role-icon {
          width: 70px;
          height: 70px;
          margin: 0 auto var(--spacing-md);
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          transition: all var(--transition-base);
        }

        .role-card:hover .role-icon {
          transform: scale(1.1);
          box-shadow: var(--shadow-glow);
        }

        .role-card h3 {
          font-size: 1.5rem;
          margin-bottom: var(--spacing-sm);
          color: var(--text-primary);
        }

        .role-card p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 0.9375rem;
        }

        /* Login Form */
        .login-form-container {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--spacing-2xl);
          box-shadow: var(--shadow-lg);
        }

        .back-btn {
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-size: 1rem;
          cursor: pointer;
          margin-bottom: var(--spacing-lg);
          transition: color var(--transition-fast);
        }

        .back-btn:hover {
          color: var(--noor-purple);
        }

        .selected-role-display {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-xl);
        }

        .role-icon-small {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .selected-role-display span {
          font-weight: 600;
          font-size: 1.125rem;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .password-input-wrapper {
          position: relative;
        }

        .password-toggle {
          position: absolute;
          right: 1rem;
          top: 50%;
          transform: translateY(-50%);
          background: transparent;
          border: none;
          color: var(--text-secondary);
          cursor: pointer;
          transition: color var(--transition-fast);
        }

        .password-toggle:hover {
          color: var(--noor-purple);
        }

        .btn-full {
          width: 100%;
          margin-top: var(--spacing-lg);
        }

        .login-footer {
          text-align: center;
          margin-top: var(--spacing-lg);
        }

        .link-secondary {
          color: var(--text-secondary);
          text-decoration: none;
          transition: color var(--transition-fast);
        }

        .link-secondary:hover {
          color: var(--noor-purple);
        }

        @media (max-width: 768px) {
          .logo-section {
            flex-direction: column;
          }

          .login-header h1 {
            font-size: 2rem;
          }

          .roles-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default Login;
