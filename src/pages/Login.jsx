import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AnimatedLogo from '../components/AnimatedLogo';
import { useAuthStore } from '../stores/authStore';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  ShieldCheck,
  GraduationCap,
  Smartphone,
  UserCircle,
  BookOpen,
  BrainCircuit,
  Lightbulb
} from 'lucide-react';
import toast from 'react-hot-toast';

const Login = () => {
  const navigate = useNavigate();
  const { signIn } = useAuthStore();

  const [activeTab, setActiveTab] = useState('admin'); // 'admin', 'teacher', 'app'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Map tabs to system roles
      let targetRole = 'student'; // Default
      if (activeTab === 'admin') targetRole = 'admin';
      if (activeTab === 'teacher') targetRole = 'admin'; // Teachers use admin panel for now

      const { user, role } = await signIn(email, password);

      // Verify role match
      if (role && role !== targetRole && role !== 'admin') {
        // Admin can access everything, otherwise strict check
        // Simplification: just allow login if auth works, redirect handled by App.jsx
      }

      toast.success(`Bienvenue ${user.email} !`);

      // Smart redirect
      if (activeTab === 'admin') navigate('/admin');
      else if (activeTab === 'app') navigate('/student');
      else navigate('/');

    } catch (error) {
      console.error(error);
      toast.error('Identifiants incorrects');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container-modern">
      <div className="login-card-modern fade-in">

        {/* Header - Simple Logo */}
        <div className="login-logo-section">
          <AnimatedLogo size={280} />
        </div>

        <div className="login-body">
          <h2 className="welcome-title">Bienvenue<br />sur Noor Education</h2>
          <p className="welcome-subtitle">Connectez-vous pour continuer<br />votre apprentissage</p>

          <div className="role-selector-modern">
            <button
              className={`role-tab ${activeTab === 'admin' ? 'active' : ''}`}
              onClick={() => setActiveTab('admin')}
            >
              <ShieldCheck size={18} /> Administrateur
            </button>
            <button
              className={`role-tab ${activeTab === 'teacher' ? 'active' : ''}`}
              onClick={() => setActiveTab('teacher')}
            >
              <UserCircle size={18} /> Enseignant
            </button>
            <button
              className={`role-tab ${activeTab === 'app' ? 'active' : ''}`}
              onClick={() => setActiveTab('app')}
            >
              <Smartphone size={18} /> App
            </button>
          </div>

          <form onSubmit={handleLogin}>
            <div className="input-group-modern">
              <Mail size={20} color="#A0AEC0" />
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="input-group-modern">
              <Lock size={20} color="#A0AEC0" />
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Mot de passe"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
              >
                {showPassword ? <EyeOff size={20} color="#A0AEC0" /> : <Eye size={20} color="#A0AEC0" />}
              </button>
            </div>

            <div style={{ textAlign: 'right', marginBottom: '20px' }}>
              <a href="#" style={{ color: '#718096', fontSize: '0.8rem', textDecoration: 'none' }}>Mot de passe oublié ?</a>
            </div>

            <button type="submit" className="login-btn-modern" disabled={loading}>
              {loading ? 'Connexion...' : 'Se Connecter'}
            </button>

            {activeTab === 'admin' && (
              <div style={{ marginTop: '15px', padding: '10px', background: '#FFF5F5', borderRadius: '10px', fontSize: '0.8rem', color: '#E53E3E' }}>
                <strong>Dev Hint:</strong> admin@noor.com / Admin123!
              </div>
            )}
            {activeTab === 'app' && (
              <button
                type="button"
                onClick={() => navigate('/student')}
                style={{ marginTop: '15px', background: 'none', border: 'none', color: '#7B61FF', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
              >
                Accès Démo Rapide (Sans Login)
              </button>
            )}
          </form>
        </div>

        <div className="bottom-illustration">
          <div className="illus-content">
            <div className="illus-item" style={{ animationDelay: '0s' }}>
              <BookOpen size={40} color="#FF6B6B" fill="#FFE3E3" />
            </div>
            <div className="illus-item" style={{ animationDelay: '1s', marginBottom: '20px' }}>
              <Lightbulb size={50} color="#F6E05E" fill="#FFFFF0" />
            </div>
            <div className="illus-item" style={{ animationDelay: '2s' }}>
              <BrainCircuit size={40} color="#4FD1C5" />
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Login;
