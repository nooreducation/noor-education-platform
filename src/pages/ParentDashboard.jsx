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
        <div className="sidebar-parent">
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
                  <div className={`event-type-bar ${event.type}`}></div>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="card">
            <h3>Actions Rapides</h3>
            <div className="quick-actions">
              <button className="action-btn-quick">
                <MessageSquare size={20} />
                <span>Messages</span>
              </button>
              <button className="action-btn-quick">
                <Calendar size={20} />
                <span>Calendrier</span>
              </button>
              <button className="action-btn-quick">
                <BookOpen size={20} />
                <span>Rapports</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
