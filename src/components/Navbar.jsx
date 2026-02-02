import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';
import {
    GraduationCap,
    LayoutDashboard,
    BookOpen,
    Users,
    Settings,
    LogOut,
    Menu,
    X,
    Bell
} from 'lucide-react';
import { useState } from 'react';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { user, role, signOut } = useAuthStore();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const handleLogout = async () => {
        try {
            await signOut();
            navigate('/login');
        } catch (error) {
            console.error('Logout error:', error);
        }
    };

    // Navigation items based on role
    const getNavItems = () => {
        switch (role) {
            case 'admin':
                return [
                    { path: '/admin', icon: LayoutDashboard, label: 'Dashboard' },
                    { path: '/admin/students', icon: Users, label: 'Élèves' },
                    { path: '/admin/courses', icon: BookOpen, label: 'Cours' },
                    { path: '/admin/settings', icon: Settings, label: 'Paramètres' }
                ];
            case 'student':
                return [
                    { path: '/student', icon: LayoutDashboard, label: 'Dashboard' },
                    { path: '/student/courses', icon: BookOpen, label: 'Mes Cours' },
                    { path: '/student/progress', icon: TrendingUp, label: 'Progression' },
                    { path: '/student/profile', icon: Settings, label: 'Profil' }
                ];
            case 'parent':
                return [
                    { path: '/parent', icon: LayoutDashboard, label: 'Dashboard' },
                    { path: '/parent/children', icon: Users, label: 'Mes Enfants' },
                    { path: '/parent/messages', icon: Bell, label: 'Messages' },
                    { path: '/parent/settings', icon: Settings, label: 'Paramètres' }
                ];
            default:
                return [];
        }
    };

    const navItems = getNavItems();

    if (!user) return null;

    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    {/* Logo */}
                    <Link to="/" className="navbar-logo">
                        <div className="logo-icon">
                            <GraduationCap size={28} />
                        </div>
                        <span className="logo-text">Noor Education</span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="navbar-nav">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = location.pathname === item.path;
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`nav-link ${isActive ? 'active' : ''}`}
                                >
                                    <Icon size={20} />
                                    <span>{item.label}</span>
                                </Link>
                            );
                        })}
                    </div>

                    {/* Right Section */}
                    <div className="navbar-actions">
                        <button className="icon-button">
                            <Bell size={20} />
                            <span className="notification-badge">3</span>
                        </button>

                        <div className="user-menu">
                            <div className="user-avatar">
                                {user?.email?.charAt(0).toUpperCase()}
                            </div>
                        </div>

                        <button className="icon-button logout-btn" onClick={handleLogout}>
                            <LogOut size={20} />
                        </button>

                        {/* Mobile Menu Button */}
                        <button
                            className="mobile-menu-btn"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="mobile-menu">
                    {navItems.map((item) => {
                        const Icon = item.icon;
                        const isActive = location.pathname === item.path;
                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`mobile-nav-link ${isActive ? 'active' : ''}`}
                                onClick={() => setMobileMenuOpen(false)}
                            >
                                <Icon size={20} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                    <button
                        className="mobile-nav-link logout"
                        onClick={handleLogout}
                    >
                        <LogOut size={20} />
                        <span>Déconnexion</span>
                    </button>
                </div>
            )}

            <style jsx>{`
        .navbar {
          position: sticky;
          top: 0;
          z-index: 100;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          padding: var(--spacing-md) 0;
        }

        .navbar-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-xl);
        }

        .navbar-logo {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          text-decoration: none;
          color: var(--text-primary);
          font-weight: 700;
          font-size: 1.25rem;
          transition: all var(--transition-fast);
        }

        .navbar-logo:hover {
          color: var(--noor-purple);
        }

        .logo-icon {
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .navbar-nav {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          flex: 1;
        }

        .nav-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          transition: all var(--transition-base);
          position: relative;
        }

        .nav-link:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .nav-link.active {
          color: white;
          background: var(--gradient-primary);
        }

        .navbar-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .icon-button {
          position: relative;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .icon-button:hover {
          background: var(--bg-secondary);
          color: var(--noor-purple);
          border-color: var(--noor-purple);
        }

        .notification-badge {
          position: absolute;
          top: -4px;
          right: -4px;
          width: 18px;
          height: 18px;
          background: var(--noor-orange);
          color: white;
          font-size: 0.625rem;
          font-weight: 700;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .user-avatar {
          width: 40px;
          height: 40px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .user-avatar:hover {
          transform: scale(1.05);
          box-shadow: var(--shadow-glow);
        }

        .logout-btn:hover {
          color: var(--noor-orange);
          border-color: var(--noor-orange);
        }

        .mobile-menu-btn {
          display: none;
        }

        /* Mobile Menu */
        .mobile-menu {
          position: fixed;
          top: 73px;
          left: 0;
          right: 0;
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding: var(--spacing-md);
          z-index: 99;
          animation: slideDown 0.3s ease-out;
        }

        .mobile-nav-link {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--text-secondary);
          font-weight: 500;
          transition: all var(--transition-base);
          width: 100%;
          border: none;
          background: transparent;
          cursor: pointer;
          font-size: 1rem;
          font-family: 'Inter', sans-serif;
        }

        .mobile-nav-link:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .mobile-nav-link.active {
          background: var(--gradient-primary);
          color: white;
        }

        .mobile-nav-link.logout {
          color: var(--noor-orange);
          margin-top: var(--spacing-md);
          border-top: 1px solid rgba(255, 255, 255, 0.1);
          padding-top: var(--spacing-md);
        }

        @media (max-width: 768px) {
          .navbar-nav {
            display: none;
          }

          .icon-button:not(.logout-btn) {
            display: none;
          }

          .user-avatar {
            display: none;
          }

          .mobile-menu-btn {
            display: flex;
          }
        }

        @media (max-width: 500px) {
          .logo-text {
            display: none;
          }
        }
      `}</style>
        </>
    );
};

export default Navbar;
