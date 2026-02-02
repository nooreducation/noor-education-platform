import { useState } from 'react';
import {
  BookOpen,
  Play,
  Award,
  Clock,
  TrendingUp,
  Star,
  FileText,
  Video,
  CheckCircle2,
  LayoutDashboard,
  Bell,
  Users,
  Calendar,
  Target,
  ClipboardList,
  DollarSign,
  FileSearch
} from 'lucide-react';

const StudentDashboard = () => {
  // Original Mock Data
  const student = {
    name: 'Ahmed',
    avatar: 'https://i.pravatar.cc/150?u=ahmed',
    class: 'Niveau Terminale S'
  };

  const quickActions = [
    { id: 'courses', label: 'Mes Cours', icon: BookOpen, color: '#4834D4' },
    { id: 'schedule', label: 'Planning', icon: Calendar, color: '#38A169' },
    { id: 'results', label: 'Résultats', icon: Award, color: '#805AD5' },
    { id: 'homework', label: 'Devoirs', icon: ClipboardList, color: '#E53E3E' },
    { id: 'attendance', label: 'Présence', icon: FileSearch, color: '#3182CE' },
    { id: 'payments', label: 'Paiements', icon: DollarSign, color: '#D69E2E' },
    { id: 'exams', label: 'Examens', icon: FileText, color: '#D53F8C' },
    { id: 'notices', label: 'Annonces', icon: Bell, color: '#ED8936' },
    { id: 'resources', label: 'Ressources', icon: Video, color: '#4A5568' }
  ];

  const courses = [
    {
      id: 1,
      title: 'Mathématiques - Algèbre',
      teacher: 'Prof. Ahmed Hassan',
      progress: 75,
      lessons: 24,
      completed: 18,
      color: '#4834D4',
      emoji: '📐',
      nextLesson: 'Les équations du second degré'
    },
    {
      id: 2,
      title: 'Sciences Physiques',
      teacher: 'Prof. Samira Khalil',
      progress: 60,
      lessons: 20,
      completed: 12,
      color: '#00B894',
      emoji: '⚡',
      nextLesson: 'L\'électromagnétisme'
    },
    {
      id: 3,
      title: 'Français - Grammaire',
      teacher: 'Prof. Marie Dubois',
      progress: 85,
      lessons: 16,
      completed: 13,
      color: '#FF4D6D',
      emoji: '📚',
      nextLesson: 'Les propositions subordonnées'
    }
  ];

  const recentAchievements = [
    { id: 1, title: 'Première étoile', icon: '⭐', date: 'Il y a 2 jours' },
    { id: 2, title: 'Quiz parfait', icon: '🎯', date: 'Il y a 3 jours' },
    { id: 3, title: 'Cours complété', icon: '🏆', date: 'Il y a 5 jours' }
  ];

  return (
    <div className="stellar-dashboard">
      {/* Header avec courbure */}
      <div className="dashboard-header-stellar">
        <div className="header-info-box">
          <div className="profile-container">
            <img src={student.avatar} alt="Profile" className="profile-img" />
            <div className="online-indicator"></div>
          </div>
          <div className="header-text">
            <h1>Bonjour, <span className="text-highlight">{student.name}</span> 👋</h1>
            <p>{student.class} • École Noor</p>
          </div>
        </div>
      </div>

      <div className="dashboard-content-stellar">
        {/* Actions Grid (Les "Tuilles") */}
        <div className="actions-grid-box card slide-up">
          {quickActions.map(action => {
            const Icon = action.icon;
            return (
              <button key={action.id} className="action-item-stellar">
                <div className="action-icon-circle" style={{ background: action.color + '15', color: action.color }}>
                  <Icon size={24} />
                </div>
                <span>{action.label}</span>
              </button>
            );
          })}
        </div>

        <div className="dashboard-grid-flex">
          {/* Courses Section */}
          <div className="courses-section-stellar">
            <div className="section-header">
              <BookOpen size={22} color="var(--noor-secondary)" />
              <h2>Mes Cours en cours</h2>
            </div>
            <div className="courses-grid">
              {courses.map((course, index) => (
                <div key={course.id} className="course-card-stellar card slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="course-card-inner">
                    <div className="course-emoji-box" style={{ background: course.color + '10' }}>
                      <span className="emoji-large">{course.emoji}</span>
                    </div>
                    <div className="course-details">
                      <div className="course-meta">
                        <h4>{course.title}</h4>
                        <p>{course.teacher}</p>
                      </div>
                      <div className="course-progress">
                        <div className="progress-text">
                          <span>{course.progress}% complété</span>
                          <span>{course.completed}/{course.lessons} leçons</span>
                        </div>
                        <div className="progress-bar-container">
                          <div className="progress-bar-fill" style={{ width: `${course.progress}%`, background: course.color }}></div>
                        </div>
                      </div>
                      <div className="course-footer">
                        <div className="next-tip">
                          <Clock size={14} />
                          <span>Suivant: {course.nextLesson}</span>
                        </div>
                        <button className="continue-btn" style={{ background: course.color }}>
                          <Play size={16} fill="white" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="sidebar-stellar">
            {/* Achievements */}
            <div className="achievements-card card slide-right">
              <div className="card-header-stellar">
                <Award size={20} color="var(--noor-primary)" />
                <h3>Réalisations</h3>
              </div>
              <div className="achievements-list">
                {recentAchievements.map(ach => (
                  <div key={ach.id} className="achievement-item-stellar">
                    <div className="ach-icon">{ach.icon}</div>
                    <div className="ach-info">
                      <h4>{ach.title}</h4>
                      <span>{ach.date}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Summary */}
            <div className="activity-card card slide-right" style={{ animationDelay: '0.2s' }}>
              <div className="card-header-stellar">
                <TrendingUp size={20} color="var(--noor-secondary)" />
                <h3>Mon Activité</h3>
              </div>
              <div className="activity-dots">
                {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, i) => (
                  <div key={i} className="day-dot-box">
                    <div className={`dot ${i < 4 ? 'active' : ''}`}></div>
                    <span>{day}</span>
                  </div>
                ))}
              </div>
              <div className="streak-badge">
                <Star size={18} fill="#D69E2E" color="#D69E2E" />
                <span>Score : 7 jours 🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
                .stellar-dashboard {
                    background: var(--bg-primary);
                    min-height: 100vh;
                    padding-bottom: 50px;
                }

                .dashboard-header-stellar {
                    background: var(--gradient-header);
                    padding: 80px 40px 100px;
                    border-bottom-left-radius: 50px;
                    border-bottom-right-radius: 50px;
                    color: white;
                }

                .header-info-box {
                    display: flex;
                    align-items: center;
                    gap: 25px;
                    max-width: 1400px;
                    margin: 0 auto;
                }

                .profile-container {
                    position: relative;
                    width: 80px;
                    height: 80px;
                }

                .profile-img {
                    width: 100%;
                    height: 100%;
                    border-radius: 50%;
                    border: 4px solid rgba(255, 255, 255, 0.2);
                    object-fit: cover;
                }

                .online-indicator {
                    position: absolute;
                    bottom: 2px;
                    right: 2px;
                    width: 16px;
                    height: 16px;
                    background: #48BB78;
                    border: 3px solid #3C2BB7;
                    border-radius: 50%;
                }

                .text-highlight {
                    color: #FF85A1;
                }

                .header-text h1 {
                    font-size: 1.75rem;
                    margin: 0 0 5px;
                }

                .header-text p {
                    font-size: 1rem;
                    opacity: 0.8;
                    margin: 0;
                }

                .dashboard-content-stellar {
                    max-width: 1400px;
                    margin: -50px auto 0;
                    padding: 0 30px;
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                .actions-grid-box {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(130px, 1fr));
                    gap: 20px;
                    padding: 35px;
                }

                .action-item-stellar {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 12px;
                    background: transparent;
                    border: none;
                    cursor: pointer;
                    transition: var(--transition-base);
                }

                .action-item-stellar:hover {
                    transform: translateY(-5px);
                }

                .action-icon-circle {
                    width: 65px;
                    height: 65px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 8px 15px rgba(0,0,0,0.03);
                    transition: var(--transition-base);
                }

                .action-item-stellar span {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: var(--text-secondary);
                }

                .dashboard-grid-flex {
                    display: grid;
                    grid-template-columns: 1fr 350px;
                    gap: 30px;
                }

                .section-header {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .section-header h2 {
                    margin: 0;
                    font-size: 1.25rem;
                    color: var(--noor-secondary);
                }

                .courses-grid {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .course-card-stellar {
                    padding: 24px;
                }

                .course-card-inner {
                    display: flex;
                    gap: 20px;
                }

                .course-emoji-box {
                    width: 80px;
                    height: 80px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .emoji-large {
                    font-size: 2.5rem;
                }

                .course-details {
                    flex: 1;
                }

                .course-meta h4 {
                    margin: 0 0 4px;
                    font-size: 1.1rem;
                    color: var(--text-primary);
                }

                .course-meta p {
                    font-size: 0.9rem;
                    color: var(--text-secondary);
                    margin-bottom: 15px;
                }

                .course-progress {
                    margin-bottom: 20px;
                }

                .progress-text {
                    display: flex;
                    justify-content: space-between;
                    font-size: 0.85rem;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: var(--text-secondary);
                }

                .progress-bar-container {
                    height: 8px;
                    background: var(--bg-tertiary);
                    border-radius: 10px;
                    overflow: hidden;
                }

                .progress-bar-fill {
                    height: 100%;
                    border-radius: 10px;
                    transition: width 0.8s ease;
                }

                .course-footer {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                }

                .next-tip {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    font-size: 0.85rem;
                    color: var(--text-secondary);
                    background: var(--bg-tertiary);
                    padding: 6px 12px;
                    border-radius: 8px;
                }

                .continue-btn {
                    width: 38px;
                    height: 38px;
                    border: none;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    transition: var(--transition-base);
                    box-shadow: var(--shadow-sm);
                }

                .continue-btn:hover {
                    transform: scale(1.1);
                    filter: brightness(1.1);
                }

                /* Sidebar Styles */
                .sidebar-stellar {
                    display: flex;
                    flex-direction: column;
                    gap: 30px;
                }

                .card-header-stellar {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                    margin-bottom: 20px;
                }

                .card-header-stellar h3 {
                    margin: 0;
                    font-size: 1.1rem;
                    color: var(--noor-secondary);
                }

                .achievements-list {
                    display: flex;
                    flex-direction: column;
                    gap: 15px;
                }

                .achievement-item-stellar {
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    padding: 12px;
                    background: var(--bg-tertiary);
                    border-radius: 12px;
                }

                .ach-icon {
                    font-size: 1.5rem;
                }

                .ach-info h4 {
                    margin: 0;
                    font-size: 0.9rem;
                    color: var(--text-primary);
                }

                .ach-info span {
                    font-size: 0.75rem;
                    color: var(--text-muted);
                }

                .activity-dots {
                    display: flex;
                    justify-content: space-between;
                    margin-bottom: 20px;
                }

                .day-dot-box {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 8px;
                }

                .dot {
                    width: 24px;
                    height: 24px;
                    border-radius: 50%;
                    background: var(--bg-tertiary);
                }

                .dot.active {
                    background: var(--gradient-primary);
                    box-shadow: 0 0 10px rgba(72, 52, 212, 0.4);
                }

                .day-dot-box span {
                    font-size: 0.75rem;
                    font-weight: 700;
                    color: var(--text-muted);
                }

                .streak-badge {
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    padding: 12px;
                    background: rgba(214, 158, 46, 0.1);
                    border-radius: 12px;
                    color: #D69E2E;
                    font-weight: 700;
                    font-size: 0.9rem;
                }

                @media (max-width: 1024px) {
                    .dashboard-grid-flex {
                        grid-template-columns: 1fr;
                    }
                    .actions-grid-box {
                        grid-template-columns: repeat(3, 1fr);
                    }
                }
            `}</style>
    </div>
  );
};

export default StudentDashboard;
