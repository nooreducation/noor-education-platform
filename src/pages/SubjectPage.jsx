import { useNavigate, useParams } from 'react-router-dom';
import { ChevronLeft, Play, Clock, Star, BookOpen } from 'lucide-react';

const SUBJECT_DATA = {
    'anglais': {
        title: 'Anglais',
        description: 'Langue et littérature anglaise',
        color: '#E84393',
        courses: [
            {
                id: 'the-last-photo',
                title: 'The Last Photo',
                description: 'Story 6 : Billy and the Queen',
                thumbnail: '/course-assets/cover.png',
                duration: '15 min',
                progress: 10,
                stars: 0
            },
            {
                id: 'grammar-basics',
                title: 'Grammar Basics',
                description: 'Les bases de la grammaire anglaise (Coming Soon)',
                thumbnail: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400',
                duration: '20 min',
                progress: 0,
                stars: 0,
                locked: true
            }
        ]
    },
    'maths': {
        title: 'Mathématiques',
        description: 'Algèbre, Géométrie et Analyse',
        color: '#4834D4',
        courses: [
            {
                id: 'algebre-eq',
                title: 'Les Équations',
                description: 'Résolution d\'équations du premier et second degré.',
                thumbnail: 'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=400',
                duration: '45 min',
                progress: 0,
                stars: 0,
                locked: true
            }
        ]
    },
    'physique': {
        title: 'Sciences Physiques',
        description: 'Étude de la matière et de l\'énergie',
        color: '#00B894',
        courses: [
            {
                id: 'elec-mag',
                title: 'Électromagnétisme',
                description: 'Champs magnétiques et courants électriques.',
                thumbnail: 'https://images.unsplash.com/photo-1636466497217-26a8cbeaf0aa?w=400',
                duration: '40 min',
                progress: 0,
                stars: 0,
                locked: true
            }
        ]
    },
    'francais': {
        title: 'Français',
        description: 'Grammaire, Conjugaison et Littérature',
        color: '#FF4D6D',
        courses: [
            {
                id: 'grammaire-sub',
                title: 'Les Subordonnées',
                description: 'Maîtrisez les propositions subordonnées complexes.',
                thumbnail: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400',
                duration: '30 min',
                progress: 0,
                stars: 0,
                locked: true
            }
        ]
    }
    // ... add other subjects as needed
};

const SubjectPage = () => {
    const navigate = useNavigate();
    const { subjectId } = useParams();

    // Fallback if subject not found
    const subject = SUBJECT_DATA[subjectId] || {
        title: 'Matière Inconnue',
        description: '',
        color: '#888',
        courses: []
    };

    return (
        <div className="subject-page">
            {/* Header */}
            <div className="subject-header" style={{ background: `linear-gradient(135deg, ${subject.color}, ${subject.color}dd)` }}>
                <button className="back-btn" onClick={() => navigate('/student')}>
                    <ChevronLeft size={24} color="white" />
                </button>
                <div className="header-content">
                    <h1>{subject.title}</h1>
                    <p>{subject.description}</p>
                </div>
                <div className="subject-icon-large">
                    <BookOpen size={80} color="white" opacity={0.2} />
                </div>
            </div>

            {/* Courses Grid */}
            <div className="courses-container">
                <h2>Modules disponibles</h2>

                {subject.courses.length === 0 ? (
                    <div className="empty-state">
                        <p>Aucun cours disponible pour le moment.</p>
                    </div>
                ) : (
                    <div className="subject-courses-grid">
                        {subject.courses.map(course => (
                            <div key={course.id} className={`course-card-modern ${course.locked ? 'locked' : ''}`}>
                                <div className="card-thumb">
                                    <img src={course.thumbnail} alt={course.title} onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=400'} />
                                    {course.locked && <div className="locked-overlay">Bientôt disponible</div>}
                                </div>
                                <div className="card-body">
                                    <h3>{course.title}</h3>
                                    <p>{course.description}</p>

                                    <div className="card-meta">
                                        <div className="meta-item">
                                            <Clock size={14} /> {course.duration}
                                        </div>
                                        {course.progress > 0 && (
                                            <div className="meta-item">
                                                <div className="progress-ring" style={{ '--p': course.progress }}></div>
                                                {course.progress}%
                                            </div>
                                        )}
                                    </div>

                                    <button
                                        className="btn-start-course"
                                        style={{ background: subject.color }}
                                        onClick={() => !course.locked && navigate(`/student/course/${course.id}`)}
                                        disabled={course.locked}
                                    >
                                        {course.progress > 0 ? 'Reprendre' : 'Commencer'} <Play size={16} fill="white" />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

        </div>
    );
};

export default SubjectPage;
