import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
import AnimatedLogo from './AnimatedLogo';
import {
  GraduationCap,
  LayoutDashboard,
  BookOpen,
  Users,
  Settings,
  LogOut,
  Menu,
  X,
  Bell,
  TrendingUp,
  Search,
  Moon,
  Sun
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, role, signOut } = useAuthStore();
  const { theme, toggleTheme } = useThemeStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await signOut();
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const getNavItems = () => {
    switch (role) {
      case 'admin':
        return [
          { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
          { path: '/admin/students', icon: Users, label: 'Élèves' },
          { path: '/admin/courses', icon: BookOpen, label: 'Cours' },
          { path: '/admin/settings', icon: Settings, label: 'Settings' }
        ];
      case 'student':
        return [
          { path: '/student', icon: LayoutDashboard, label: 'Dashboard' },
          { path: '/student/courses', icon: BookOpen, label: 'Mes Cours' },
          { path: '/student/progress', icon: TrendingUp, label: 'Progrès' },
          { path: '/student/profile', icon: Settings, label: 'Profil' }
        ];
      case 'parent':
        return [
          { path: '/parent', icon: LayoutDashboard, label: 'Dashboard' },
          { path: '/parent/children', icon: Users, label: 'Enfants' },
          { path: '/parent/messages', icon: Bell, label: 'Messages' },
          { path: '/parent/settings', icon: Settings, label: 'Settings' }
        ];
      default:
        return [];
    }
  };

  const navItems = getNavItems();

  if (!user) return null;

  return (
    <>
      <nav className="navbar-stellar">
        <div className="nav-container-stellar">
          {/* Brand */}
          <Link to="/" className="brand-stellar">
            <div className="brand-logo-wrapper">
              <AnimatedLogo size={100} />
            </div>
            <span className="brand-text">Noor</span>
          </Link>

          {/* Nav Links */}
          <div className="nav-links-stellar">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`stellar-nav-link ${isActive ? 'active' : ''}`}
                >
                  <Icon size={18} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Right Actions */}
          <div className="nav-actions-stellar">
            <button className="nav-action-btn theme-toggle" onClick={toggleTheme}>
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>

            <div className="nav-search-box">
              <Search size={18} color="#A0AEC0" />
            </div>

            <button className="nav-action-btn">
              <Bell size={20} />
              <div className="nav-badge"></div>
            </button>

            <div className="nav-user-profile">
              <div className="nav-avatar">
                {user?.email?.charAt(0).toUpperCase()}
              </div>
            </div>

            <button className="nav-logout-btn" onClick={handleLogout} title="Déconnexion">
              <LogOut size={20} />
            </button>

            <button
              className="stellar-mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="stellar-mobile-menu">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`stellar-mobile-link ${isActive ? 'active' : ''}`}
                onClick={() => setMobileMenuOpen(false)}
              >
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <button className="theme-toggle-mobile stellar-mobile-link" onClick={toggleTheme}>
            {theme === 'light' ? <><Moon size={20} /> Mode Sombre</> : <><Sun size={20} /> Mode Clair</>}
          </button>
          <button className="stellar-mobile-link logout" onClick={handleLogout}>
            <LogOut size={20} />
            <span>Déconnexion</span>
          </button>
        </div>
      )}

    </>
  );
};

export default Navbar;


