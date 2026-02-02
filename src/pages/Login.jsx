import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from '../components/AnimatedLogo';
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
          <div className="login-logo-container">
            <AnimatedLogo size={180} />
          </div>
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

                <div className="demo-separator">
                  <span>ou explorer</span>
                </div>

                <button
                  type="button"
                  className="stellar-btn-secondary"
                  onClick={() => {
                    toast.success('Accès Démo activé');
                    const paths = { student: '/student', parent: '/parent', admin: '/admin' };
                    navigate(paths[selectedRole] || '/');
                  }}
                  style={{
                    width: '100%',
                    padding: '14px',
                    borderRadius: '16px',
                    border: '2px dashed var(--noor-purple)',
                    background: 'transparent',
                    color: 'var(--noor-purple)',
                    fontWeight: '700',
                    cursor: 'pointer',
                    marginTop: '10px'
                  }}
                >
                  Mode Démo (Aperçu)
                </button>
              </form>

              <div className="forgot-pass">
                <a href="#">Mot de passe oublié ?</a>
              </div>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default Login;
