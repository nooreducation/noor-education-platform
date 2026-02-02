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

    </div>
  );
};

export default StudentDashboard;
