import { useState } from 'react';
import {
    Users,
    TrendingUp,
    BookOpen,
    Award,
    Clock,
    AlertCircle,
    CheckCircle,
    Calendar,
    MessageSquare,
    Bell
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const ParentDashboard = () => {
    const [selectedChild, setSelectedChild] = useState(0);

    // Mock data
    const children = [
        {
            id: 1,
            name: 'Ahmed',
            grade: '5ème',
            avatar: 'A',
            overallProgress: 85,
            attendance: 95,
            averageScore: 88,
            courses: 8,
            completedCourses: 3
        },
        {
            id: 2,
            name: 'Leila',
            grade: '3ème',
            avatar: 'L',
            overallProgress: 72,
            attendance: 88,
            averageScore: 75,
            courses: 6,
            completedCourses: 2
        }
    ];

    const currentChild = children[selectedChild];

    const progressData = [
        { month: 'Jan', score: 75 },
        { month: 'Fév', score: 78 },
        { month: 'Mar', score: 82 },
        { month: 'Avr', score: 85 },
        { month: 'Mai', score: 87 },
        { month: 'Juin', score: 88 }
    ];

    const subjectPerformance = [
        { subject: 'Maths', score: 90 },
        { subject: 'Sciences', score: 85 },
        { subject: 'Français', score: 88 },
        { subject: 'Histoire', score: 82 },
        { subject: 'Anglais', score: 87 }
    ];

    const recentActivities = [
        {
            id: 1,
            type: 'completed',
            icon: CheckCircle,
            color: '#51CF66',
            title: 'Cours complété',
            description: 'Mathématiques - Chapitre 5',
            time: 'Il y a 2h'
        },
        {
            id: 2,
            type: 'quiz',
            icon: Award,
            color: '#FFE66D',
            title: 'Quiz réussi',
            description: 'Sciences Physiques - 92%',
            time: 'Il y a 5h'
        },
        {
            id: 3,
            type: 'assignment',
            icon: BookOpen,
            color: '#6C63FF',
            title: 'Devoir rendu',
            description: 'Français - Dissertation',
            time: 'Hier'
        }
    ];

    const upcomingEvents = [
        {
            id: 1,
            title: 'Quiz de Mathématiques',
            date: '15 Février 2026',
            time: '10:00',
            type: 'quiz'
        },
        {
            id: 2,
            title: 'Réunion Parent-Professeur',
            date: '20 Février 2026',
            time: '14:30',
            type: 'meeting'
        },
        {
            id: 3,
            title: 'Examen Final Sciences',
            date: '28 Février 2026',
            time: '09:00',
            type: 'exam'
        }
    ];

    const notifications = [
        {
            id: 1,
            type: 'success',
            message: 'Ahmed a obtenu 95% au quiz de mathématiques',
            time: 'Il y a 1h'
        },
        {
            id: 2,
            type: 'warning',
            message: 'Devoir de français à rendre dans 2 jours',
            time: 'Il y a 3h'
        }
    ];

    return (
        <div className="parent-dashboard">
            {/* Header */}
            <div className="parent-header slide-down">
                <div>
                    <h1>Espace Parents</h1>
                    <p>Suivez la progression de vos enfants</p>
                </div>
                <button className="btn btn-primary">
                    <MessageSquare size={20} />
                    Contacter un professeur
                </button>
            </div>

            {/* Children Selector */}
            <div className="children-selector fade-in">
                {children.map((child, index) => (
                    <button
                        key={child.id}
                        className={`child-card ${selectedChild === index ? 'active' : ''}`}
                        onClick={() => setSelectedChild(index)}
                    >
                        <div className="child-avatar" style={{
                            background: selectedChild === index ? 'var(--gradient-primary)' : 'var(--bg-tertiary)'
                        }}>
                            {child.avatar}
                        </div>
                        <div className="child-info">
                            <h3>{child.name}</h3>
                            <p>{child.grade}</p>
                        </div>
                        <div className="child-progress">
                            <div className="progress-circle">
                                <svg width="60" height="60">
                                    <circle
                                        cx="30"
                                        cy="30"
                                        r="25"
                                        fill="none"
                                        stroke="rgba(255,255,255,0.1)"
                                        strokeWidth="4"
                                    />
                                    <circle
                                        cx="30"
                                        cy="30"
                                        r="25"
                                        fill="none"
                                        stroke="#6C63FF"
                                        strokeWidth="4"
                                        strokeDasharray={`${child.overallProgress * 1.57} 157`}
                                        strokeLinecap="round"
                                        transform="rotate(-90 30 30)"
                                    />
                                </svg>
                                <span className="progress-text">{child.overallProgress}%</span>
                            </div>
                        </div>
                    </button>
                ))}
            </div>

            {/* Main Stats */}
            <div className="stats-grid scale-in">
                <div className="stat-card">
                    <div className="stat-header">
                        <TrendingUp size={24} color="#6C63FF" />
                        <h4>Progression Globale</h4>
                    </div>
                    <div className="stat-value">{currentChild.overallProgress}%</div>
                    <div className="stat-subtext">
                        {currentChild.completedCourses}/{currentChild.courses} cours complétés
                    </div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <Clock size={24} color="#4ECDC4" />
                        <h4>Assiduité</h4>
                    </div>
                    <div className="stat-value">{currentChild.attendance}%</div>
                    <div className="stat-subtext">Excellent taux de présence</div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <Award size={24} color="#51CF66" />
                        <h4>Moyenne Générale</h4>
                    </div>
                    <div className="stat-value">{currentChild.averageScore}%</div>
                    <div className="stat-subtext">+3% ce mois-ci</div>
                </div>

                <div className="stat-card">
                    <div className="stat-header">
                        <BookOpen size={24} color="#FFE66D" />
                        <h4>Cours Actifs</h4>
                    </div>
                    <div className="stat-value">{currentChild.courses}</div>
                    <div className="stat-subtext">Toutes les matières</div>
                </div>
            </div>

            <div className="dashboard-content">
                {/* Left Column */}
                <div className="main-content">
                    {/* Progress Chart */}
                    <div className="card">
                        <h3>Évolution des Performances</h3>
                        <ResponsiveContainer width="100%" height={300}>
                            <LineChart data={progressData}>
                                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                                <XAxis dataKey="month" stroke="#B4B8D0" />
                                <YAxis stroke="#B4B8D0" />
                                <Tooltip
                                    contentStyle={{
                                        background: '#1E2447',
                                        border: '1px solid rgba(255,255,255,0.1)',
                                        borderRadius: '8px'
                                    }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="score"
                                    stroke="#6C63FF"
                                    strokeWidth={3}
                                    dot={{ fill: '#6C63FF', r: 6 }}
                                    activeDot={{ r: 8 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Subject Performance */}
                    <div className="card">
                        <h3>Performance par Matière</h3>
                        <ResponsiveContainer width="100%" height={350}>
                            <RadarChart data={subjectPerformance}>
                                <PolarGrid stroke="rgba(255,255,255,0.1)" />
                                <PolarAngleAxis dataKey="subject" stroke="#B4B8D0" />
                                <PolarRadiusAxis stroke="#B4B8D0" />
                                <Radar
                                    name="Score"
                                    dataKey="score"
                                    stroke="#6C63FF"
                                    fill="#6C63FF"
                                    fillOpacity={0.3}
                                    strokeWidth={2}
                                />
                            </RadarChart>
                        </ResponsiveContainer>
                    </div>

                    {/* Recent Activities */}
                    <div className="card">
                        <h3>Activité Récente</h3>
                        <div className="activities-list">
                            {recentActivities.map(activity => {
                                const Icon = activity.icon;
                                return (
                                    <div key={activity.id} className="activity-item">
                                        <div className="activity-icon" style={{ background: activity.color }}>
                                            <Icon size={20} />
                                        </div>
                                        <div className="activity-content">
                                            <h4>{activity.title}</h4>
                                            <p>{activity.description}</p>
                                        </div>
                                        <div className="activity-time">
                                            {activity.time}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </div>

                {/* Right Sidebar */}
                <div className="sidebar">
                    {/* Notifications */}
                    <div className="card">
                        <div className="section-title">
                            <Bell size={20} />
                            <h3>Notifications</h3>
                        </div>
                        <div className="notifications-list">
                            {notifications.map(notif => (
                                <div key={notif.id} className={`notification-item ${notif.type}`}>
                                    <div className="notification-content">
                                        <p>{notif.message}</p>
                                        <span className="notification-time">{notif.time}</span>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Upcoming Events */}
                    <div className="card">
                        <div className="section-title">
                            <Calendar size={20} />
                            <h3>Événements à Venir</h3>
                        </div>
                        <div className="events-list">
                            {upcomingEvents.map(event => (
                                <div key={event.id} className="event-item">
                                    <div className="event-date">
                                        <div className="event-day">
                                            {event.date.split(' ')[0]}
                                        </div>
                                        <div className="event-month">
                                            {event.date.split(' ')[1]}
                                        </div>
                                    </div>
                                    <div className="event-info">
                                        <h4>{event.title}</h4>
                                        <p>
                                            <Clock size={14} />
                                            {event.time}
                                        </p>
                                    </div>
                                    <div className={`event-type ${event.type}`}></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="card">
                        <h3>Actions Rapides</h3>
                        <div className="quick-actions">
                            <button className="action-btn">
                                <MessageSquare size={20} />
                                <span>Messages</span>
                            </button>
                            <button className="action-btn">
                                <Calendar size={20} />
                                <span>Calendrier</span>
                            </button>
                            <button className="action-btn">
                                <BookOpen size={20} />
                                <span>Rapports</span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
        .parent-dashboard {
          padding: var(--spacing-xl);
          max-width: 1400px;
          margin: 0 auto;
        }

        .parent-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-2xl);
        }

        .parent-header h1 {
          font-size: 2rem;
          margin-bottom: var(--spacing-sm);
        }

        .parent-header p {
          color: var(--text-secondary);
          margin: 0;
        }

        /* Children Selector */
        .children-selector {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-2xl);
        }

        .child-card {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          background: var(--bg-card);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--spacing-lg);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .child-card:hover {
          transform: translateY(-2px);
          box-shadow: var(--shadow-lg);
        }

        .child-card.active {
          border-color: var(--noor-purple);
          box-shadow: 0 0 0 3px rgba(108, 99, 255, 0.2);
        }

        .child-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: 700;
          color: white;
        }

        .child-info {
          flex: 1;
        }

        .child-info h3 {
          margin: 0 0 var(--spacing-xs) 0;
          font-size: 1.25rem;
        }

        .child-info p {
          margin: 0;
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .progress-circle {
          position: relative;
          width: 60px;
          height: 60px;
        }

        .progress-text {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          font-size: 0.875rem;
          font-weight: 700;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-2xl);
        }

        .stat-card {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          transition: all var(--transition-base);
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .stat-header {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-md);
        }

        .stat-header h4 {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
          font-weight: 600;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 700;
          color: var(--text-primary);
          margin-bottom: var(--spacing-sm);
        }

        .stat-subtext {
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        /* Dashboard Content */
        .dashboard-content {
          display: grid;
          grid-template-columns: 1fr 380px;
          gap: var(--spacing-xl);
        }

        .main-content {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .sidebar {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-lg);
        }

        .section-title {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          margin-bottom: var(--spacing-lg);
        }

        .section-title h3 {
          margin: 0;
          font-size: 1.125rem;
        }

        .card h3 {
          margin-bottom: var(--spacing-lg);
        }

        /* Activities */
        .activities-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .activity-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          transition: all var(--transition-base);
        }

        .activity-item:hover {
          background: var(--bg-secondary);
          transform: translateX(4px);
        }

        .activity-icon {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .activity-content {
          flex: 1;
        }

        .activity-content h4 {
          margin: 0 0 var(--spacing-xs) 0;
          font-size: 0.9375rem;
        }

        .activity-content p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .activity-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Notifications */
        .notifications-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }

        .notification-item {
          padding: var(--spacing-md);
          border-radius: var(--radius-md);
          border-left: 3px solid;
        }

        .notification-item.success {
          background: rgba(81, 207, 102, 0.1);
          border-color: var(--noor-green);
        }

        .notification-item.warning {
          background: rgba(255, 230, 109, 0.1);
          border-color: var(--noor-yellow);
        }

        .notification-content p {
          margin: 0 0 var(--spacing-xs) 0;
          font-size: 0.875rem;
        }

        .notification-time {
          font-size: 0.75rem;
          color: var(--text-muted);
        }

        /* Events */
        .events-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .event-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          position: relative;
          overflow: hidden;
        }

        .event-date {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          width: 50px;
          height: 50px;
          background: var(--gradient-primary);
          border-radius: var(--radius-md);
          color: white;
          flex-shrink: 0;
        }

        .event-day {
          font-size: 1.25rem;
          font-weight: 700;
          line-height: 1;
        }

        .event-month {
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .event-info {
          flex: 1;
        }

        .event-info h4 {
          margin: 0 0 var(--spacing-xs) 0;
          font-size: 0.9375rem;
        }

        .event-info p {
          margin: 0;
          font-size: 0.75rem;
          color: var(--text-secondary);
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }

        .event-type {
          width: 4px;
          height: 100%;
          position: absolute;
          right: 0;
          top: 0;
        }

        .event-type.quiz { background: var(--noor-purple); }
        .event-type.meeting { background: var(--noor-blue); }
        .event-type.exam { background: var(--noor-orange); }

        /* Quick Actions */
        .quick-actions {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: var(--spacing-sm);
        }

        .action-btn {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: var(--spacing-sm);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-md);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .action-btn:hover {
          background: var(--bg-secondary);
          color: var(--noor-purple);
          border-color: var(--noor-purple);
        }

        .action-btn span {
          font-size: 0.75rem;
        }

        @media (max-width: 1024px) {
          .dashboard-content {
            grid-template-columns: 1fr;
          }

          .sidebar {
            grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
            display: grid;
          }
        }

        @media (max-width: 768px) {
          .parent-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-md);
          }

          .children-selector {
            grid-template-columns: 1fr;
          }

          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
        </div>
    );
};

export default ParentDashboard;
