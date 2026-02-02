import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { GraduationCap, Shield, Users, Mail, Lock, Eye, EyeOff, ChevronLeft } from 'lucide-react';
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
      color: '#FF4D6D',
      description: 'Accédez à vos cours'
    },
    {
      id: 'parent',
      title: 'Parent',
      icon: Users,
      color: '#7B61FF',
      description: 'Suivez vos enfants'
    },
    {
      id: 'admin',
      title: 'Administrateur',
      icon: Shield,
      color: '#4834D4',
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
      toast.success('Bienvenue sur Noor Education !');
      const paths = { student: '/student', parent: '/parent', admin: '/admin' };
      navigate(paths[selectedRole] || '/');
    } catch (error) {
      toast.error(error.message || 'Erreur de connexion');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="animated-bg"></div>

      <div className="stellar-login-card">
        <div className="stellar-login-header">
          <div className="logo-box">
            <GraduationCap size={44} color="white" strokeWidth={2.5} />
          </div>
          <h1>Noor Education</h1>
          <p>Plateforme d'apprentissage interactive</p>
        </div>

        <div className="login-content">
          {!selectedRole ? (
            <div className="role-selection slide-up">
              <h2>Choisissez votre profil</h2>
              <div className="roles-list">
                {roles.map((role) => {
                  const Icon = role.icon;
                  return (
                    <button
                      key={role.id}
                      className="stellar-role-item"
                      onClick={() => setSelectedRole(role.id)}
                    >
                      <div className="role-icon-circle" style={{ background: role.color + '20', color: role.color }}>
                        <Icon size={24} />
                      </div>
                      <div className="role-text-box">
                        <h3>{role.title}</h3>
                        <p>{role.description}</p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            <div className="login-form-box fade-in">
              <button className="stellar-back-btn" onClick={() => setSelectedRole(null)}>
                <ChevronLeft size={20} />
                <span>Changer de rôle</span>
              </button>

              <div className="sign-in-label">
                <h2>Connexion</h2>
                <p>En tant qu'<strong>{roles.find(r => r.id === selectedRole).title}</strong></p>
              </div>

              <form onSubmit={handleSubmit} className="stellar-form">
                <div className="stellar-input-group">
                  <Mail className="input-icon" size={20} />
                  <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="stellar-input-group">
                  <Lock className="input-icon" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    className="stellar-eye-toggle"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>

                <button type="submit" className="stellar-btn-primary" disabled={loading}>
                  {loading ? 'Connexion en cours...' : 'Se connecter'}
                </button>
              </form>

              <div className="forgot-pass">
                <a href="#">Mot de passe oublié ?</a>
              </div>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
                .login-page {
                    min-height: 100vh;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: var(--spacing-md);
                }

                .stellar-login-card {
                    width: 100%;
                    max-width: 450px;
                    background: white;
                    border-radius: var(--radius-xl);
                    box-shadow: var(--shadow-lg);
                    overflow: hidden;
                }

                .stellar-login-header {
                    background: var(--gradient-header);
                    padding: 50px 20px 60px;
                    color: white;
                    text-align: center;
                    border-bottom-left-radius: 40px;
                    border-bottom-right-radius: 40px;
                }

                .logo-box {
                    width: 80px;
                    height: 80px;
                    background: rgba(255, 255, 255, 0.15);
                    backdrop-filter: blur(10px);
                    border: 2px solid rgba(255, 255, 255, 0.2);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    margin: 0 auto 20px;
                    box-shadow: 0 10px 20px rgba(0,0,0,0.1);
                }

                .stellar-login-header h1 {
                    font-size: 1.8rem;
                    margin: 0;
                    margin-bottom: 8px;
                }

                .stellar-login-header p {
                    font-size: 0.9rem;
                    opacity: 0.8;
                    margin: 0;
                }

                .login-content {
                    padding: 40px 35px;
                }

                .role-selection h2 {
                    font-size: 1.25rem;
                    color: var(--text-primary);
                    margin-bottom: 25px;
                    text-align: center;
                }

                .roles-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .stellar-role-item {
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    width: 100%;
                    padding: 20px;
                    background: #F8F9FF;
                    border: 1px solid transparent;
                    border-radius: var(--radius-lg);
                    text-align: left;
                    cursor: pointer;
                    transition: var(--transition-base);
                }

                .stellar-role-item:hover {
                    background: white;
                    border-color: var(--noor-primary);
                    box-shadow: var(--shadow-sm);
                    transform: translateX(5px);
                }

                .role-icon-circle {
                    width: 50px;
                    height: 50px;
                    border-radius: 15px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                .role-text-box h3 {
                    font-size: 1.05rem;
                    font-weight: 600;
                    margin-bottom: 4px;
                }

                .role-text-box p {
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    margin: 0;
                }

                .sign-in-label {
                    margin-bottom: 30px;
                }

                .sign-in-label h2 {
                    font-size: 1.5rem;
                    color: var(--noor-secondary);
                    margin-bottom: 5px;
                }

                .sign-in-label p {
                    font-size: 0.95rem;
                    color: var(--text-secondary);
                }

                .stellar-back-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    background: transparent;
                    border: none;
                    color: var(--noor-secondary);
                    font-weight: 600;
                    cursor: pointer;
                    margin-bottom: 25px;
                    padding: 0;
                }

                .stellar-form {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .stellar-input-group {
                    position: relative;
                    width: 100%;
                }

                .input-icon {
                    position: absolute;
                    left: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    color: #A0AEC0;
                }

                .stellar-input-group input {
                    width: 100%;
                    padding: 16px 20px 16px 50px;
                    border: 2px solid #EDF2F7;
                    border-radius: var(--radius-md);
                    font-size: 1rem;
                    transition: var(--transition-base);
                    background: #F7FAFC;
                    font-family: inherit;
                }

                .stellar-input-group input:focus {
                    outline: none;
                    border-color: var(--noor-primary);
                    background: white;
                    box-shadow: 0 0 0 4px rgba(255, 77, 109, 0.1);
                }

                .stellar-eye-toggle {
                    position: absolute;
                    right: 18px;
                    top: 50%;
                    transform: translateY(-50%);
                    background: transparent;
                    border: none;
                    color: #A0AEC0;
                    cursor: pointer;
                }

                .stellar-btn-primary {
                    background: var(--gradient-accent);
                    color: white;
                    border: none;
                    padding: 18px;
                    border-radius: var(--radius-md);
                    font-weight: 700;
                    font-size: 1rem;
                    cursor: pointer;
                    box-shadow: var(--shadow-accent);
                    margin-top: 15px;
                    transition: var(--transition-base);
                    text-transform: uppercase;
                    letter-spacing: 1px;
                }

                .stellar-btn-primary:active {
                    transform: scale(0.98);
                }

                .forgot-pass {
                    margin-top: 25px;
                    text-align: center;
                }

                .forgot-pass a {
                    color: var(--text-secondary);
                    text-decoration: none;
                    font-size: 0.9rem;
                    font-weight: 500;
                }

                .forgot-pass a:hover {
                    color: var(--noor-primary);
                }
            `}</style>
    </div>
  );
};

export default Login;

