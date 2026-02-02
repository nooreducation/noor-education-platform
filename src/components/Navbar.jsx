import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import { useThemeStore } from '../stores/themeStore';
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
            <div className="brand-icon-box">
              <GraduationCap size={24} color="white" strokeWidth={2.5} />
            </div>
            <span className="brand-text">Noor Education</span>
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

      <style jsx>{`
        .navbar-stellar {
          position: sticky;
          top: 0;
          z-index: 1000;
          background: var(--bg-secondary);
          height: 80px;
          display: flex;
          align-items: center;
          box-shadow: var(--shadow-sm);
          border-bottom: 1px solid var(--border-color);
          transition: background var(--transition-base);
        }

        .nav-container-stellar {
          width: 100%;
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 30px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
        }

        .brand-stellar {
          display: flex;
          align-items: center;
          gap: 15px;
          text-decoration: none;
          min-width: fit-content;
        }

        .brand-icon-box {
          width: 42px;
          height: 42px;
          background: var(--gradient-primary);
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: var(--shadow-primary);
        }

        .brand-text {
          font-family: 'Poppins', sans-serif;
          font-weight: 700;
          font-size: 1.25rem;
          color: var(--noor-secondary);
        }

        .nav-links-stellar {
          display: flex;
          align-items: center;
          gap: 10px;
          flex: 1;
        }

        .stellar-nav-link {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 10px 18px;
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.95rem;
          transition: var(--transition-base);
        }

        .stellar-nav-link:hover {
          color: var(--noor-secondary);
          background: var(--bg-tertiary);
        }

        .stellar-nav-link.active {
          color: var(--noor-secondary);
          background: var(--bg-tertiary);
        }

        .nav-actions-stellar {
          display: flex;
          align-items: center;
          gap: 15px;
        }

        .nav-search-box {
           width: 40px;
           height: 40px;
           display: flex;
           align-items: center;
           justify-content: center;
           background: var(--bg-tertiary);
           border-radius: 10px;
           cursor: pointer;
        }

        .nav-action-btn {
          position: relative;
          width: 40px;
          height: 40px;
          background: var(--bg-tertiary);
          border: none;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--text-secondary);
          cursor: pointer;
          transition: var(--transition-base);
        }

        .nav-action-btn:hover {
          background: var(--border-color);
          color: var(--noor-secondary);
        }

        .nav-badge {
          position: absolute;
          top: 10px;
          right: 10px;
          width: 8px;
          height: 8px;
          background: var(--noor-primary);
          border-radius: 50%;
          border: 2px solid var(--bg-secondary);
        }

        .nav-avatar {
          width: 42px;
          height: 42px;
          background: var(--gradient-header);
          color: white;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 700;
          box-shadow: var(--shadow-sm);
        }

        .nav-logout-btn {
          width: 40px;
          height: 40px;
          background: rgba(255, 77, 109, 0.1);
          border: none;
          border-radius: 10px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--noor-primary);
          cursor: pointer;
          transition: var(--transition-base);
        }

        .nav-logout-btn:hover {
          background: var(--noor-primary);
          color: white;
          box-shadow: var(--shadow-accent);
        }

        .stellar-mobile-toggle {
          display: none;
          background: transparent;
          border: none;
          color: var(--noor-secondary);
          cursor: pointer;
        }

        /* Mobile Menu */
        .stellar-mobile-menu {
          position: fixed;
          top: 80px;
          left: 0;
          right: 0;
          background: var(--bg-secondary);
          padding: 20px;
          box-shadow: var(--shadow-lg);
          z-index: 999;
          display: flex;
          flex-direction: column;
          gap: 10px;
          animation: slideDown 0.3s ease-out;
          border-top: 1px solid var(--border-color);
        }

        .stellar-mobile-link {
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 15px;
          border-radius: 12px;
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 600;
          transition: var(--transition-base);
          background: transparent;
          border: none;
          width: 100%;
          cursor: pointer;
          font-size: 1rem;
        }

        .stellar-mobile-link.active {
          background: var(--bg-tertiary);
          color: var(--noor-secondary);
        }

        .stellar-mobile-link.logout {
          color: var(--noor-primary);
          background: rgba(255, 77, 109, 0.05);
          margin-top: 10px;
        }

        @media (max-width: 1024px) {
          .nav-links-stellar {
            display: none;
          }
          .nav-search-box {
            display: none;
          }
          .stellar-mobile-toggle {
            display: flex;
          }
          .brand-text {
            display: none;
          }
        }
      `}</style>
    </>
  );
};

export default Navbar;


