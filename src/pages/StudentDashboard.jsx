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
    CheckCircle2
} from 'lucide-react';

const StudentDashboard = () => {
    const [selectedCourse, setSelectedCourse] = useState(null);

    // Mock data
    const studentStats = {
        coursesEnrolled: 8,
        coursesCompleted: 3,
        totalProgress: 68,
        totalPoints: 1420,
        currentStreak: 7
    };

    const courses = [
        {
            id: 1,
            title: 'Mathématiques - Algèbre',
            teacher: 'Prof. Ahmed Hassan',
            progress: 75,
            lessons: 24,
            completed: 18,
            color: '#6C63FF',
            thumbnail: '📐',
            nextLesson: 'Les équations du second degré'
        },
        {
            id: 2,
            title: 'Sciences Physiques',
            teacher: 'Prof. Samira Khalil',
            progress: 60,
            lessons: 20,
            completed: 12,
            color: '#4ECDC4',
            thumbnail: '⚡',
            nextLesson: 'L\'électromagnétisme'
        },
        {
            id: 3,
            title: 'Français - Grammaire',
            teacher: 'Prof. Marie Dubois',
            progress: 85,
            lessons: 16,
            completed: 13,
            color: '#FF6B6B',
            thumbnail: '📚',
            nextLesson: 'Les propositions subordonnées'
        },
        {
            id: 4,
            title: 'Histoire Moderne',
            teacher: 'Prof. Karim Mansour',
            progress: 45,
            lessons: 18,
            completed: 8,
            color: '#FFE66D',
            thumbnail: '🏛️',
            nextLesson: 'La révolution industrielle'
        }
    ];

    const recentAchievements = [
        { id: 1, title: 'Première étoile', icon: '⭐', date: 'Il y a 2 jours' },
        { id: 2, title: 'Quiz parfait', icon: '🎯', date: 'Il y a 3 jours' },
        { id: 3, title: 'Cours complété', icon: '🏆', date: 'Il y a 5 jours' }
    ];

    return (
        <div className="student-dashboard">
            {/* Header avec statistiques */}
            <div className="student-header slide-down">
                <div className="welcome-section">
                    <h1>Bonjour, <span className="text-gradient">Ahmed</span> 👋</h1>
                    <p>Continuons ton apprentissage aujourd'hui !</p>
                </div>

                <div className="quick-stats">
                    <div className="quick-stat">
                        <div className="stat-icon" style={{ background: '#6C63FF' }}>
                            <BookOpen size={20} />
                        </div>
                        <div>
                            <div className="stat-number">{studentStats.coursesEnrolled}</div>
                            <div className="stat-label">Cours actifs</div>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <div className="stat-icon" style={{ background: '#51CF66' }}>
                            <Award size={20} />
                        </div>
                        <div>
                            <div className="stat-number">{studentStats.totalPoints}</div>
                            <div className="stat-label">Points</div>
                        </div>
                    </div>
                    <div className="quick-stat">
                        <div className="stat-icon" style={{ background: '#FFE66D', color: '#0A0E27' }}>
                            <Star size={20} />
                        </div>
                        <div>
                            <div className="stat-number">{studentStats.currentStreak}</div>
                            <div className="stat-label">Jours consécutifs</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Progression globale */}
            <div className="overall-progress card fade-in">
                <div className="progress-header">
                    <div>
                        <h3>Ta Progression Globale</h3>
                        <p>{studentStats.coursesCompleted}/{studentStats.coursesEnrolled} cours complétés</p>
                    </div>
                    <div className="progress-percentage">
                        <TrendingUp size={24} />
                        <span>{studentStats.totalProgress}%</span>
                    </div>
                </div>
                <div className="progress-bar large">
                    <div
                        className="progress-fill animated"
                        style={{ width: `${studentStats.totalProgress}%` }}
                    ></div>
                </div>
            </div>

            <div className="dashboard-grid">
                {/* Mes Cours */}
                <div className="courses-section">
                    <div className="section-title">
                        <BookOpen size={24} />
                        <h2>Mes Cours</h2>
                    </div>

                    <div className="courses-list">
                        {courses.map((course, index) => (
                            <div
                                key={course.id}
                                className="course-card-student card"
                                style={{ animationDelay: `${index * 0.1}s` }}
                            >
                                <div className="course-thumbnail" style={{ background: course.color }}>
                                    <span className="course-emoji">{course.thumbnail}</span>
                                </div>

                                <div className="course-content">
                                    <div className="course-header-student">
                                        <div>
                                            <h4>{course.title}</h4>
                                            <p className="course-teacher">{course.teacher}</p>
                                        </div>
                                        <div className="course-progress-badge" style={{ color: course.color }}>
                                            {course.progress}%
                                        </div>
                                    </div>

                                    <div className="course-stats-student">
                                        <div className="course-stat-item">
                                            <FileText size={16} />
                                            <span>{course.completed}/{course.lessons} leçons</span>
                                        </div>
                                    </div>

                                    <div className="course-progress-bar">
                                        <div className="progress-bar">
                                            <div
                                                className="progress-fill"
                                                style={{
                                                    width: `${course.progress}%`,
                                                    background: course.color
                                                }}
                                            ></div>
                                        </div>
                                    </div>

                                    <div className="course-footer-student">
                                        <div className="next-lesson">
                                            <Clock size={14} />
                                            <span>Prochaine leçon: {course.nextLesson}</span>
                                        </div>
                                        <button className="btn btn-primary btn-sm">
                                            <Play size={16} />
                                            Continuer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Sidebar */}
                <div className="sidebar-section">
                    {/* Réalisations récentes */}
                    <div className="achievements-card card scale-in">
                        <div className="section-title">
                            <Award size={20} />
                            <h3>Réalisations Récentes</h3>
                        </div>

                        <div className="achievements-list">
                            {recentAchievements.map(achievement => (
                                <div key={achievement.id} className="achievement-item">
                                    <div className="achievement-icon">
                                        {achievement.icon}
                                    </div>
                                    <div className="achievement-info">
                                        <h4>{achievement.title}</h4>
                                        <p>{achievement.date}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <button className="btn btn-secondary btn-full">
                            Voir toutes les réalisations
                        </button>
                    </div>

                    {/* Calendrier d'activité */}
                    <div className="activity-card card scale-in">
                        <div className="section-title">
                            <Clock size={20} />
                            <h3>Activité Cette Semaine</h3>
                        </div>

                        <div className="activity-calendar">
                            {['L', 'M', 'M', 'J', 'V', 'S', 'D'].map((day, index) => (
                                <div
                                    key={index}
                                    className={`activity-day ${index < 5 ? 'active' : ''}`}
                                >
                                    <div className="day-label">{day}</div>
                                    <div className="day-indicator"></div>
                                </div>
                            ))}
                        </div>

                        <div className="streak-display">
                            <Star size={20} />
                            <span className="streak-text">
                                {studentStats.currentStreak} jours consécutifs ! Continue ! 🔥
                            </span>
                        </div>
                    </div>

                    {/* Prochains quiz */}
                    <div className="upcoming-card card scale-in">
                        <div className="section-title">
                            <CheckCircle2 size={20} />
                            <h3>Prochains Quiz</h3>
                        </div>

                        <div className="upcoming-list">
                            <div className="upcoming-item">
                                <div className="upcoming-subject" style={{ background: '#6C63FF' }}>
                                    📐
                                </div>
                                <div className="upcoming-info">
                                    <h4>Quiz Algèbre</h4>
                                    <p>Dans 2 jours</p>
                                </div>
                            </div>
                            <div className="upcoming-item">
                                <div className="upcoming-subject" style={{ background: '#4ECDC4' }}>
                                    ⚡
                                </div>
                                <div className="upcoming-info">
                                    <h4>Test Physique</h4>
                                    <p>Dans 5 jours</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .student-dashboard {
          padding: var(--spacing-xl);
          max-width: 1400px;
          margin: 0 auto;
        }

        .student-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-2xl);
          flex-wrap: wrap;
          gap: var(--spacing-lg);
        }

        .welcome-section h1 {
          font-size: 2rem;
          margin-bottom: var(--spacing-sm);
        }

        .welcome-section p {
          color: var(--text-secondary);
          margin: 0;
          font-size: 1.125rem;
        }

        .quick-stats {
          display: flex;
          gap: var(--spacing-lg);
        }

        .quick-stat {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          background: var(--bg-card);
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .stat-icon {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
        }

        .stat-number {
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--text-primary);
          line-height: 1;
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        /* Overall Progress */
        .overall-progress {
          margin-bottom: var(--spacing-2xl);
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-lg);
        }

        .progress-header h3 {
          margin: 0 0 var(--spacing-sm) 0;
        }

        .progress-header p {
          margin: 0;
          color: var(--text-secondary);
        }

        .progress-percentage {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          font-size: 2rem;
          font-weight: 700;
          color: var(--noor-green);
        }

        .progress-bar.large {
          height: 12px;
        }

        .progress-fill.animated {
          transition: width 1s ease-out;
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: var(--spacing-xl);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
        }

        .section-title h2,
        .section-title h3 {
          margin: 0;
          font-size: 1.25rem;
        }

        /* Courses List */
        .courses-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .course-card-student {
          display: flex;
          gap: var(--spacing-lg);
          padding: var(--spacing-xl);
          animation: slideUp 0.5s ease-out;
          animation-fill-mode: both;
        }

        .course-thumbnail {
          width: 100px;
          height: 100px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .course-emoji {
          font-size: 3rem;
        }

        .course-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .course-header-student {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
        }

        .course-header-student h4 {
          margin: 0 0 var(--spacing-xs) 0;
          color: var(--text-primary);
        }

        .course-teacher {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .course-progress-badge {
          font-size: 1.5rem;
          font-weight: 700;
        }

        .course-stats-student {
          display: flex;
          gap: var(--spacing-lg);
        }

        .course-stat-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .course-footer-student {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: auto;
        }

        .next-lesson {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* Sidebar */
        .sidebar-section {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        /* Achievements */
        .achievements-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }

        .achievement-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          transition: all var(--transition-base);
        }

        .achievement-item:hover {
          background: var(--bg-secondary);
          transform: translateX(4px);
        }

        .achievement-icon {
          width: 48px;
          height: 48px;
          background: var(--gradient-primary);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .achievement-info h4 {
          margin: 0;
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .achievement-info p {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        /* Activity Calendar */
        .activity-calendar {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }

        .activity-day {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .day-label {
          font-size: 0.75rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .day-indicator {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          transition: all var(--transition-base);
        }

        .activity-day.active .day-indicator {
          background: var(--gradient-primary);
          box-shadow: var(--shadow-glow);
        }

        .streak-display {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: var(--gradient-card);
          border-radius: var(--radius-md);
          border: 1px solid rgba(108, 99, 255, 0.2);
        }

        .streak-text {
          font-weight: 600;
          color: var(--text-primary);
          font-size: 0.9375rem;
        }

        /* Upcoming */
        .upcoming-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .upcoming-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
        }

        .upcoming-subject {
          width: 48px;
          height: 48px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        .upcoming-info h4 {
          margin: 0;
          font-size: 0.9375rem;
          color: var(--text-primary);
        }

        .upcoming-info p {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .btn-full {
          width: 100%;
        }

        @media (max-width: 1024px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
          }

          .sidebar-section {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            display: grid;
          }
        }

        @media (max-width: 768px) {
          .student-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .quick-stats {
            width: 100%;
            flex-direction: column;
          }

          .quick-stat {
            width: 100%;
          }

          .course-card-student {
            flex-direction: column;
          }

          .course-thumbnail {
            width: 100%;
            height: 120px;
          }
        }
      `}</style>
        </div>
    );
};

export default StudentDashboard;
