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
                        <div className="section-header card">
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
                        <div className="section-header card">
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

                        <div className="courses-grid">
                            {courses.map(course => (
                                <div key={course.id} className="course-card card">
                                    <div className="course-header">
                                        <h4>{course.title}</h4>
                                        <button className="icon-btn">
                                            <MoreVertical size={20} />
                                        </button>
                                    </div>
                                    <div className="course-stats">
                                        <div className="course-stat">
                                            <Users size={16} />
                                            <span>{course.students} élèves</span>
                                        </div>
                                        <div className="course-stat">
                                            <Award size={16} />
                                            <span>{course.completion}% réussite</span>
                                        </div>
                                    </div>
                                    <div className="course-progress">
                                        <div className="progress-bar large">
                                            <div
                                                className="progress-fill"
                                                style={{ width: `${course.completion}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                    <div className="course-footer">
                                        <span className={`badge ${course.status === 'active' ? 'badge-success' : 'badge-warning'}`}>
                                            {course.status === 'active' ? 'Publié' : 'Brouillon'}
                                        </span>
                                        <div className="course-actions">
                                            <button className="btn btn-secondary btn-sm">Modifier</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx>{`
        .admin-dashboard {
          padding: var(--spacing-xl);
          max-width: 1400px;
          margin: 0 auto;
        }

        .dashboard-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-2xl);
        }

        .dashboard-header h1 {
          font-size: 2rem;
          margin-bottom: var(--spacing-sm);
        }

        .dashboard-header p {
          color: var(--text-secondary);
          margin: 0;
        }

        /* Stats Grid */
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-2xl);
        }

        .stat-card {
          background: var(--bg-card);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-lg);
          padding: var(--spacing-xl);
          display: flex;
          gap: var(--spacing-md);
          transition: all var(--transition-base);
          animation: slideUp 0.5s ease-out;
          animation-fill-mode: both;
        }

        .stat-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--shadow-lg);
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          flex-shrink: 0;
        }

        .stat-content {
          flex: 1;
        }

        .stat-label {
          color: var(--text-secondary);
          font-size: 0.875rem;
          margin-bottom: var(--spacing-sm);
        }

        .stat-value-row {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 700;
          margin: 0;
        }

        .stat-change {
          padding: 0.25rem 0.75rem;
          border-radius: var(--radius-full);
          font-size: 0.875rem;
          font-weight: 600;
        }

        .stat-change.positive {
          background: rgba(81, 207, 102, 0.2);
          color: var(--noor-green);
        }

        /* Tabs */
        .tabs-container {
          margin-bottom: var(--spacing-xl);
        }

        .tabs {
          display: flex;
          gap: var(--spacing-sm);
          background: var(--bg-secondary);
          padding: var(--spacing-sm);
          border-radius: var(--radius-lg);
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .tab {
          flex: 1;
          padding: 0.875rem 1.5rem;
          background: transparent;
          border: none;
          color: var(--text-secondary);
          font-weight: 600;
          border-radius: var(--radius-md);
          cursor: pointer;
          transition: all var(--transition-base);
        }

        .tab:hover {
          color: var(--text-primary);
          background: rgba(255, 255, 255, 0.05);
        }

        .tab.active {
          background: var(--gradient-primary);
          color: white;
        }

        /* Overview Section */
        .overview-section {
          display: grid;
          gap: var(--spacing-lg);
        }

        .chart-card h3,
        .recent-activity h3 {
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
        }

        /* Students List */
        .students-list {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-md);
        }

        .student-item {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
          padding: var(--spacing-md);
          background: var(--bg-tertiary);
          border-radius: var(--radius-md);
          transition: all var(--transition-base);
        }

        .student-item:hover {
          background: var(--bg-secondary);
        }

        .student-avatar {
          width: 48px;
          height: 48px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
          font-size: 1.25rem;
        }

        .student-info {
          flex: 1;
        }

        .student-info h4 {
          margin: 0;
          font-size: 1rem;
          color: var(--text-primary);
        }

        .student-info p {
          margin: 0;
          font-size: 0.875rem;
          color: var(--text-secondary);
        }

        .student-progress {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          min-width: 150px;
        }

        .progress-bar {
          flex: 1;
          height: 8px;
          background: var(--bg-secondary);
          border-radius: var(--radius-full);
          overflow: hidden;
        }

        .progress-bar.large {
          height: 10px;
        }

        .progress-fill {
          height: 100%;
          background: var(--gradient-primary);
          border-radius: var(--radius-full);
          transition: width 0.5s ease;
        }

        .student-progress span {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
          min-width: 40px;
        }

        /* Search Box */
        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
          padding: var(--spacing-lg);
        }

        .search-box {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          background: var(--bg-tertiary);
          padding: 0.75rem 1.25rem;
          border-radius: var(--radius-full);
          border: 2px solid rgba(255, 255, 255, 0.1);
          min-width: 300px;
        }

        .search-box input {
          flex: 1;
          background: transparent;
          border: none;
          color: var(--text-primary);
          outline: none;
        }

        /* Data Table */
        .data-table {
          width: 100%;
          border-collapse: collapse;
        }

        .data-table th {
          text-align: left;
          padding: var(--spacing-md);
          color: var(--text-secondary);
          font-weight: 600;
          font-size: 0.875rem;
          text-transform: uppercase;
          letter-spacing: 0.5px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .data-table td {
          padding: var(--spacing-md);
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .data-table tr:hover {
          background: var(--bg-tertiary);
        }

        .table-user {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .student-avatar-sm {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: var(--gradient-primary);
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: 600;
        }

        .progress-cell {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
        }

        .action-buttons {
          display: flex;
          gap: var(--spacing-sm);
        }

        .icon-btn {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--bg-tertiary);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          cursor: pointer;
          transition: all var(--transition-fast);
        }

        .icon-btn:hover {
          background: var(--bg-secondary);
          color: var(--noor-purple);
          border-color: var(--noor-purple);
        }

        .icon-btn.danger:hover {
          color: var(--noor-orange);
          border-color: var(--noor-orange);
        }

        /* Courses Grid */
        .courses-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
          gap: var(--spacing-lg);
        }

        .course-card {
          padding: var(--spacing-xl);
        }

        .course-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: var(--spacing-md);
        }

        .course-header h4 {
          margin: 0;
          font-size: 1.125rem;
          color: var(--text-primary);
        }

        .course-stats {
          display: flex;
          gap: var(--spacing-lg);
          margin-bottom: var(--spacing-md);
        }

        .course-stat {
          display: flex;
          align-items: center;
          gap: var(--spacing-sm);
          color: var(--text-secondary);
          font-size: 0.875rem;
        }

        .course-progress {
          margin-bottom: var(--spacing-md);
        }

        .course-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .btn-sm {
          padding: 0.5rem 1rem;
          font-size: 0.875rem;
        }

        @media (max-width: 768px) {
          .dashboard-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-md);
          }

          .section-header {
            flex-direction: column;
            gap: var(--spacing-md);
          }

          .search-box {
            width: 100%;
          }

          .data-table {
            display: block;
            overflow-x: auto;
          }
        }
      `}</style>
        </div>
    );
};

export default AdminDashboard;
