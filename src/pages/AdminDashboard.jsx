import { useState } from 'react';
import {
  Users,
  BookOpen,
  TrendingUp,
  Award,
  Search,
  Plus,
  Edit,
  Trash2,
  Eye,
  UploadCloud,
  FileCode,
  CheckCircle,
  AlertCircle
} from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [searchTerm, setSearchTerm] = useState('');

  // -- IMPORT LOGIC --
  const [importStatus, setImportStatus] = useState('idle'); // idle, parsing, success, error
  const [manifestContent, setManifestContent] = useState('');
  const [importedCourse, setImportedCourse] = useState(null);

  const handleScormImport = () => {
    if (!manifestContent.trim()) {
      toast.error("Veuillez coller le contenu du fichier imsmanifest.xml");
      return;
    }

    setImportStatus('parsing');

    // Simulation of basic parsing logic
    setTimeout(() => {
      try {
        // Basic regex to find title
        const titleMatch = manifestContent.match(/<title>(.*?)<\/title>/);
        const title = titleMatch ? titleMatch[1] : "Nouveau Cours SCORM";

        // Basic regex to count potential items/slides
        const itemsCount = (manifestContent.match(/<item /g) || []).length;

        setImportedCourse({
          title: title,
          modulesCount: itemsCount,
          id: 'scorm-' + Date.now()
        });
        setImportStatus('success');
        toast.success("Structure du cours détectée !");
      } catch (e) {
        setImportStatus('error');
        toast.error("Erreur lors de l'analyse du fichier.");
      }
    }, 1000);
  };

  const finalizeImport = () => {
    toast.success("Cours importé et converti avec succès !");
    setImportStatus('idle');
    setManifestContent('');
    setImportedCourse(null);
    // Here you would typically save to Supabase
  };

  // Mock data
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

  return (
    <div className="admin-dashboard">
      <div className="dashboard-header slide-down">
        <div>
          <h1>Tableau de Bord Admin</h1>
          <p>Vue d'ensemble de la plateforme Noor Education</p>
        </div>
        <button className="btn btn-primary" onClick={() => setActiveTab('import')}>
          <UploadCloud size={20} />
          Importer SCORM
        </button>
      </div>

      {/* Stats Cards */}
      {activeTab === 'overview' && (
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
      )}

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
          <button
            className={`tab ${activeTab === 'import' ? 'active' : ''}`}
            onClick={() => setActiveTab('import')}
          >
            Import / Conversion
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

        {/* --- STUDENTS TAB --- */}
        {activeTab === 'students' && (
          <div className="students-section scale-in">
            {/* Same as before... simplified for brevity if needed, but keeping core */}
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
            {/* ... Table would be here ... */}
            <div className="card empty-state">
              <p>Liste des élèves (simulée)...</p>
            </div>
          </div>
        )}

        {/* --- IMPORT TAB --- */}
        {activeTab === 'import' && (
          <div className="import-section scale-in">
            <div className="card">
              <div className="import-header">
                <FileCode size={32} color="#6C63FF" />
                <div>
                  <h2>Convertisseur SCORM (Beta)</h2>
                  <p>Copiez le contenu de votre fichier <code>imsmanifest.xml</code> ci-dessous pour générer la structure du cours.</p>
                </div>
              </div>

              <div className="import-area">
                <textarea
                  className="manifest-input"
                  placeholder="<manifest>...</manifest>"
                  value={manifestContent}
                  onChange={(e) => setManifestContent(e.target.value)}
                  disabled={importStatus === 'success'}
                />
              </div>

              {importStatus === 'idle' && (
                <div className="import-actions">
                  <button className="btn btn-primary" onClick={handleScormImport}>
                    Analyser la structure
                  </button>
                </div>
              )}

              {importStatus === 'parsing' && (
                <div className="loading-indicator">
                  <div className="spinner"></div> Analyse en cours...
                </div>
              )}

              {importStatus === 'success' && importedCourse && (
                <div className="import-result fade-in">
                  <div className="result-card">
                    <h3><CheckCircle size={20} color="#48BB78" /> Nouveau Cours Détecté</h3>
                    <div className="course-preview">
                      <div className="info-row">
                        <span className="label">Titre :</span>
                        <strong>{importedCourse.title}</strong>
                      </div>
                      <div className="info-row">
                        <span className="label">Modules :</span>
                        <strong>{importedCourse.modulesCount} éléments détectés</strong>
                      </div>
                      <div className="info-row">
                        <span className="label">Compatibilité :</span>
                        <span className="badge badge-success">SCORM 2004</span>
                      </div>
                    </div>
                    <div className="result-actions">
                      <button className="btn btn-secondary" onClick={() => { setImportStatus('idle'); setManifestContent(''); }}>Annuler</button>
                      <button className="btn btn-primary" onClick={finalizeImport}>
                        <UploadCloud size={18} /> Convertir & Sauvegarder
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {importStatus === 'error' && (
                <div className="error-msg fade-in">
                  <AlertCircle size={20} /> Impossible de lire le fichier. Assurez-vous qu'il s'agit d'un XML valide.
                </div>
              )}
            </div>

            <style>{`
                    .import-header { display: flex; gap: 20px; align-items: center; margin-bottom: 20px; }
                    .manifest-input {
                        width: 100%;
                        height: 200px;
                        background: #F7FAFC;
                        border: 2px dashed #CBD5E0;
                        border-radius: 10px;
                        padding: 15px;
                        font-family: monospace;
                        font-size: 0.9rem;
                        resize: vertical;
                    }
                    .manifest-input:focus { border-color: #6C63FF; outline: none; }
                    .import-actions { margin-top: 20px; text-align: right; }
                    
                    .result-card { background: #F0FFF4; border: 1px solid #C6F6D5; padding: 20px; border-radius: 10px; margin-top: 20px; }
                    .course-preview { margin: 15px 0; background: white; padding: 15px; border-radius: 8px; }
                    .info-row { display: flex; justify-content: space-between; margin-bottom: 10px; border-bottom: 1px solid #EDF2F7; padding-bottom: 5px; }
                    .result-actions { display: flex; justify-content: flex-end; gap: 10px; margin-top: 15px; }
                    
                    .loading-indicator { display: flex; align-items: center; gap: 10px; color: #6C63FF; font-weight: 600; margin-top: 20px; }
                    .error-msg { background: #FFF5F5; color: #E53E3E; padding: 15px; border-radius: 8px; display: flex; align-items: center; gap: 10px; margin-top: 20px; }
                `}</style>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
