import { useState, useEffect } from 'react';
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Search,
  Plus,
  MoreVertical,
  Edit,
  Trash2,
  Eye
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // Mock data - À remplacer par des vraies données Supabase
  const stats = [
    { title: 'Total Élèves', value: '1,247', icon: Users, color: '#6C63FF', change: '+12%' },
    { title: 'Cours Actifs', value: '48', icon: BookOpen, color: '#4ECDC4', change: '+5%' },
    { title: 'Taux de Réussite', value: '87%', icon: Award, color: '#51CF66', change: '+3%' },
    { title: 'Progression Moy.', value: '76%', icon: TrendingUp, color: '#FFE66D', change: '+8%' }
  ];

  const chartData = [
    { name: 'Jan', students: 400, completion: 65 },
    { name: 'Fév', students: 520, completion: 70 },
    { name: 'Mar', students: 680, completion: 75 },
    { name: 'Avr', students: 890, completion: 78 },
    { name: 'Mai', students: 1050, completion: 82 },
    { name: 'Juin', students: 1247, completion: 87 }
  ];

  const recentStudents = [
    { id: 1, name: 'Ahmed Ben Ali', email: 'ahmed@example.com', grade: '5ème', status: 'active', progress: 85 },
    { id: 2, name: 'Fatima Zahra', email: 'fatima@example.com', grade: '4ème', status: 'active', progress: 92 },
    { id: 3, name: 'Mohamed Selim', email: 'mohamed@example.com', grade: '6ème', status: 'active', progress: 78 },
    { id: 4, name: 'Sarah Mansour', email: 'sarah@example.com', grade: '3ème', status: 'inactive', progress: 45 }
  ];

  const courses = [
    { id: 1, title: 'Mathématiques - Algèbre', students: 234, completion: 78, status: 'active' },
    { id: 2, title: 'Sciences Physiques', students: 189, completion: 82, status: 'active' },
    { id: 3, title: 'Français - Grammaire', students: 298, completion: 71, status: 'active' },
    { id: 4, title: 'Histoire - Antiquité', students: 156, completion: 85, status: 'draft' }
  ];

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header slide-down">
        <div>
          <h1>Tableau de Bord Admin</h1>
          <p>Vue d'ensemble de la plateforme Noor Education</p>
        </div>
        <button className="btn btn-primary">
          <Plus size={20} />
          Nouveau Cours
        </button>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid fade-in">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="stat-card"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="stat-icon" style={{ background: stat.color }}>
                <Icon size={24} />
              </div>
              <div className="stat-content">
                <p className="stat-label">{stat.title}</p>
                <div className="stat-value-row">
                  <h3 className="stat-value">{stat.value}</h3>
                  <span className="stat-change positive">{stat.change}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Navigation Tabs */}
      <div className="tabs-container">
        <div className="tabs">
          <button
            className={`tab ${activeTab === 'overview' ? 'active' : ''}`}
            onClick={() => setActiveTab('overview')}
          >
            Vue d'ensemble
          </button>
          <button
            className={`tab ${activeTab === 'students' ? 'active' : ''}`}
            onClick={() => setActiveTab('students')}
          >
            Élèves
          </button>
          <button
            className={`tab ${activeTab === 'courses' ? 'active' : ''}`}
            onClick={() => setActiveTab('courses')}
          >
            Cours
          </button>
        </div>
      </div>

      {/* Content Area */}
      <div className="dashboard-content">
        {activeTab === 'overview' && (
          <div className="overview-section scale-in">
            <div className="chart-card card">
              <h3>Croissance des Inscriptions</h3>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={chartData}>
                  <defs>
                    <linearGradient id="colorStudents" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6C63FF" stopOpacity={0.3} />
                      <stop offset="95%" stopColor="#6C63FF" stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                  <XAxis dataKey="name" stroke="#B4B8D0" />
                  <YAxis stroke="#B4B8D0" />
                  <Tooltip
                    contentStyle={{
                      background: '#1E2447',
                      border: '1px solid rgba(255,255,255,0.1)',
                      borderRadius: '8px'
                    }}
                  />
                  <Area
                    type="monotone"
                    dataKey="students"
                    stroke="#6C63FF"
                    fillOpacity={1}
                    fill="url(#colorStudents)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>

            <div className="recent-activity card">
              <h3>Élèves Récents</h3>
              <div className="students-list">
                {recentStudents.map(student => (
                  <div key={student.id} className="student-item">
                    <div className="student-avatar">
                      {student.name.charAt(0)}
                    </div>
                    <div className="student-info">
                      <h4>{student.name}</h4>
                      <p>{student.email}</p>
                    </div>
                    <div className="student-grade">
                      <span className="badge badge-info">{student.grade}</span>
                    </div>
                    <div className="student-progress">
                      <div className="progress-bar">
                        <div
                          className="progress-fill"
                          style={{ width: `${student.progress}%` }}
                        ></div>
                      </div>
                      <span>{student.progress}%</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'students' && (
          <div className="students-section scale-in">
            <div className="section-header-admin card">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un élève..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn btn-primary">
                <Plus size={20} />
                Nouvel Élève
              </button>
            </div>

            <div className="card">
              <table className="data-table">
                <thead>
                  <tr>
                    <th>Élève</th>
                    <th>Email</th>
                    <th>Classe</th>
                    <th>Progression</th>
                    <th>Statut</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {recentStudents.map(student => (
                    <tr key={student.id}>
                      <td>
                        <div className="table-user">
                          <div className="student-avatar-sm">
                            {student.name.charAt(0)}
                          </div>
                          <span>{student.name}</span>
                        </div>
                      </td>
                      <td>{student.email}</td>
                      <td><span className="badge badge-info">{student.grade}</span></td>
                      <td>
                        <div className="progress-cell">
                          <div className="progress-bar">
                            <div
                              className="progress-fill"
                              style={{ width: `${student.progress}%` }}
                            ></div>
                          </div>
                          <span>{student.progress}%</span>
                        </div>
                      </td>
                      <td>
                        <span className={`badge ${student.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                          {student.status === 'active' ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button className="icon-btn">
                            <Eye size={16} />
                          </button>
                          <button className="icon-btn">
                            <Edit size={16} />
                          </button>
                          <button className="icon-btn danger">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'courses' && (
          <div className="courses-section scale-in">
            <div className="section-header-admin card">
              <div className="search-box">
                <Search size={20} />
                <input
                  type="text"
                  placeholder="Rechercher un cours..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="btn btn-primary">
                <Plus size={20} />
                Nouveau Cours
              </button>
            </div>
            {/* ... rest of courses view */}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
