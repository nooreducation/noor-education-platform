import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import {
    ChevronLeft,
    ChevronRight,
    CheckCircle2,
    Star,
    Volume2,
    ArrowRight,
    Trophy,
    RotateCcw
} from 'lucide-react';
import toast from 'react-hot-toast';
// --- COURSE REGISTRY ---
// Dans une vraie application, ceci viendrait d'une API ou d'un import dynamique
import { COURSE_CONTENT as DATA_THE_LAST_PHOTO } from '../data/course-the-last-photo';

const COURSE_REGISTRY = {
    'the-last-photo': DATA_THE_LAST_PHOTO,
    // 'autre-cours-id': DATA_AUTRE_COURS
};

import { useAuthStore } from '../stores/authStore';
import { supabase } from '../lib/supabase';

// --- COMPOSANTS DE SLIDES ---

const SlashSlide = ({ onNext, onExit, data }) => (
    <div className="slide-splash fade-in">
        <button className="btn-exit-top" onClick={onExit} title="Quitter le cours">
            <ChevronLeft size={20} /> Retour
        </button>
        <h1 className="splash-title">{data.title}</h1>
        <div className="splash-card">
            <img src={data.image} alt="Course Cover" className="splash-img" onError={(e) => e.target.src = 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=400'} />
            <p className="splash-desc">{data.description}</p>
            <button className="btn-start pulse" onClick={onNext}>
                Commencer l'aventure <ChevronRight />
            </button>
        </div>
    </div>
);

const StorySlide = ({ data }) => (
    <div className="slide-iframe fade-in">
        <iframe
            src={data.url}
            title="Course Story"
            className="story-frame"
            allowFullScreen
        ></iframe>
    </div>
);

const MatchingPairsSlide = ({ data, onScore }) => {
    const [selectedEng, setSelectedEng] = useState(null);
    const [matches, setMatches] = useState({});
    const [shuffledFr, setShuffledFr] = useState([]);

    useEffect(() => {
        setShuffledFr([...data.pairs].sort(() => Math.random() - 0.5));
    }, [data]); // Re-shuffle if data changes (next slide)

    const handleMatch = (frWord) => {
        if (!selectedEng) return;
        const correctFr = data.pairs.find(p => p.en === selectedEng).fr;

        if (correctFr === frWord) {
            const newMatches = { ...matches, [selectedEng]: frWord };
            setMatches(newMatches);
            setSelectedEng(null);

            if (Object.keys(newMatches).length === data.pairs.length) {
                onScore(100);
                toast.success("Parfait !");
            }
        } else {
            toast.error("Essaie encore !");
            setSelectedEng(null);
        }
    };

    return (
        <div className="game-grid matching-grid fade-in">
            <div className="col">
                {data.pairs.map(p => (
                    <button
                        key={p.en}
                        className={`word-card ${selectedEng === p.en ? 'selected' : ''} ${matches[p.en] ? 'matched' : ''}`}
                        onClick={() => !matches[p.en] && setSelectedEng(p.en)}
                        disabled={matches[p.en]}
                    >
                        {p.en} {matches[p.en] && <CheckCircle2 size={16} />}
                    </button>
                ))}
            </div>
            <div className="col">
                {shuffledFr.map(p => (
                    <button
                        key={p.fr}
                        className={`word-card fr ${Object.values(matches).includes(p.fr) ? 'matched' : ''}`}
                        onClick={() => !Object.values(matches).includes(p.fr) && handleMatch(p.fr)}
                        disabled={Object.values(matches).includes(p.fr)}
                    >
                        {p.fr}
                    </button>
                ))}
            </div>
        </div>
    );
};

const DragImageSlide = ({ data, onScore }) => {
    const [answers, setAnswers] = useState({});

    const handleSelect = (itemId, option) => {
        const newAnswers = { ...answers, [itemId]: option };
        setAnswers(newAnswers);

        let correct = 0;
        data.items.forEach(i => {
            const userAns = (i.id === itemId) ? option : answers[i.id];
            if (userAns === i.correct) correct++;
        });

        if (Object.keys(newAnswers).length === data.items.length) {
            onScore(Math.round((correct / data.items.length) * 100));
        }
    };

    return (
        <div className="image-grid fade-in">
            {data.items.map(item => {
                const isCorrect = answers[item.id] === item.correct;

                return (
                    <div key={item.id} className={`image-card ${isCorrect ? 'correct' : ''}`}>
                        <div className="img-wrapper">
                            <img src={item.image} alt="Identify" />
                            {isCorrect && <div className="overlay-check"><CheckCircle2 size={32} /></div>}
                        </div>
                        <div className="options-row">
                            {item.options.map(opt => (
                                <button
                                    key={opt}
                                    className={`opt-btn ${answers[item.id] === opt ? (opt === item.correct ? 'btn-success' : 'btn-error') : ''}`}
                                    onClick={() => handleSelect(item.id, opt)}
                                    disabled={isCorrect}
                                >
                                    {opt}
                                </button>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const GapFillSlide = ({ data, onScore }) => {
    const [filled, setFilled] = useState({});

    const handleFill = (word, bankWord) => {
        const newFilled = { ...filled, [word]: bankWord };
        setFilled(newFilled);

        let correct = 0;
        data.pairs.forEach(p => {
            const userAns = (p.word === word) ? bankWord : filled[p.word];
            if (userAns === p.opposite) correct++;
        });
        onScore(Math.round((correct / data.pairs.length) * 100));
    };

    return (
        <div className="gap-fill-container fade-in">
            <div className="pairs-list">
                {data.pairs.map(p => (
                    <div key={p.word} className="gap-row">
                        <span className="static-word">{p.word}</span>
                        <ArrowRight size={16} />
                        <div className="gap-slot">
                            {filled[p.word] ? (
                                <span className={`filled-word ${filled[p.word] === p.opposite ? 'correct' : 'wrong'}`}>
                                    {filled[p.word]}
                                </span>
                            ) : (
                                <span className="placeholder">???</span>
                            )}
                        </div>
                    </div>
                ))}
            </div>

            <div className="word-bank">
                <h4>Banque de mots :</h4>
                <div className="bank-items">
                    {data.bank.map(w => (
                        <button
                            key={w}
                            className="bank-btn"
                            onClick={() => {
                                const nextEmpty = data.pairs.find(p => !filled[p.word]);
                                if (nextEmpty) handleFill(nextEmpty.word, w);
                            }}
                        >
                            {w}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

const LabelInfoSlide = ({ data, onScore }) => (
    <div className="label-slide fade-in">
        <div style={{ position: 'relative', display: 'inline-block' }}>
            <img src={data.image} alt="Labeling" style={{ maxWidth: '100%', borderRadius: '15px' }} />
            {/* Simulation of labels for non-coordinate system */}
        </div>
        <div className="label-actions">
            {data.labels.map(l => (
                <div key={l.id} className="label-tag">{l.text}</div>
            ))}
        </div>
        <button className="btn-validation" onClick={() => { onScore(100); toast.success('Correct !'); }}>Valider</button>
    </div>
);

const ReportSlide = ({ scores, onExit }) => {
    const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) / Math.max(1, Object.keys(scores).length);

    return (
        <div className="report-card scale-in">
            <Trophy size={64} className="trophy-icon" color="#FFD700" />
            <h2>Leçon Terminée !</h2>
            <div className="final-score">
                <span className="score-lbl">Score Global</span>
                <span className="score-val">{Math.round(totalScore)}%</span>
            </div>
            <div className="details-list">
                {Object.entries(scores).map(([slideId, score]) => (
                    <div key={slideId} className="detail-item">
                        <span>{slideId}</span>
                        <strong>{score}%</strong>
                    </div>
                ))}
            </div>
            <button className="btn-exit" onClick={onExit}>Retour au Dashboard</button>
        </div>
    );
};

// --- MAIN CONTAINER ---

const ModernCourse = () => {
    const navigate = useNavigate();
    const { courseId } = useParams(); // Récupère l'ID depuis l'URL (ex: 'the-last-photo')
    const { user } = useAuthStore();

    // CHARGEMENT DU CONTENU DU COURS
    const courseData = COURSE_REGISTRY[courseId];

    const [currentSlideIdx, setCurrentSlideIdx] = useState(0);
    const [scores, setScores] = useState({});
    const [isLoading, setIsLoading] = useState(true);

    // Si le cours n'existe pas
    if (!courseData) {
        return (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100vh', flexDirection: 'column', gap: '20px' }}>
                <h2>Cours introuvable</h2>
                <p>L'identifiant "{courseId}" ne correspond à aucun cours.</p>
                <button onClick={() => navigate('/student')} style={{ padding: '10px 20px', background: '#6C63FF', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
                    Retour au Dashboard
                </button>
            </div>
        );
    }

    const currentSlide = courseData.slides[currentSlideIdx];
    const isFirst = currentSlideIdx === 0;
    const isLast = currentSlideIdx === courseData.slides.length - 1;

    // Load Progress
    useEffect(() => {
        const loadProgress = async () => {
            if (!user) return setIsLoading(false);

            const { data, error } = await supabase
                .from('student_course_progress')
                .select('*')
                .eq('student_id', user.id)
                .eq('course_slug', courseId)
                .single();

            if (data) {
                setScores(data.scores || {});
                // Optional: Resume where left off
                // setCurrentSlideIdx(data.current_slide_index || 0);
            }
            setIsLoading(false);
        };
        loadProgress();
    }, [user, courseId]);

    const saveProgress = async (newScores, idx) => {
        if (!user) return;

        // Mock fallback if DB table missing
        try {
            const completedSlides = Object.keys(newScores);
            await supabase
                .from('student_course_progress')
                .upsert({
                    student_id: user.id,
                    course_slug: courseId,
                    completed_slides: completedSlides,
                    scores: newScores,
                    current_slide_index: idx,
                    last_updated: new Date()
                }, { onConflict: 'student_id, course_slug' });
        } catch (e) {
            console.log('DB Save skipped');
        }
    };

    const nextSlide = () => {
        if (currentSlideIdx < courseData.slides.length - 1) {
            const nextIdx = currentSlideIdx + 1;
            setCurrentSlideIdx(nextIdx);
            saveProgress(scores, nextIdx);
        }
    };

    const prevSlide = () => {
        if (currentSlideIdx > 0) {
            setCurrentSlideIdx(prev => prev - 1);
        }
    };

    const handleScore = (score) => {
        const newScores = { ...scores, [currentSlide.id]: score };
        setScores(newScores);
        saveProgress(newScores, currentSlideIdx);
    };

    const finishCourse = () => {
        toast.success("Cours terminé !");
        navigate('/student');
    };

    if (isLoading) return <div className="loading">Chargement...</div>;

    // Render content based on type
    const renderContent = () => {
        switch (currentSlide.type) {
            case 'SPLASH': return <SlashSlide onNext={nextSlide} onExit={() => navigate(-1)} data={currentSlide} />;
            case 'STORY': return <StorySlide data={currentSlide} />;
            case 'MATCHING_PAIRS': return <MatchingPairsSlide data={currentSlide} onScore={handleScore} />;
            case 'DRAG_IMAGE': return <DragImageSlide data={currentSlide} onScore={handleScore} />;
            case 'GAP_FILL': return <GapFillSlide data={currentSlide} onScore={handleScore} />;
            case 'LABEL_IMAGE': return <LabelInfoSlide data={currentSlide} onScore={handleScore} />;
            case 'REPORT': return <ReportSlide scores={scores} onExit={() => navigate(-1)} />;
            default: return <div>Unknown Slide Type</div>;
        }
    };

    return (
        <div className="modern-course-viewer">
            {/* Top Bar */}
            {currentSlide.type !== 'SPLASH' && currentSlide.type !== 'REPORT' && (
                <header className="viewer-header">
                    <button className="icon-btn" onClick={() => navigate(-1)}>
                        <ChevronLeft />
                    </button>
                    <div className="progress-track">
                        <div className="track-info">
                            <span>{currentSlide.title}</span>
                            <span className="step-count">{currentSlideIdx + 1}/{courseData.slides.length}</span>
                        </div>
                        <div className="progress-line">
                            <div
                                className="progress-fill-main"
                                style={{ width: `${((currentSlideIdx) / (courseData.slides.length - 1)) * 100}%` }}
                            ></div>
                        </div>
                    </div>
                    <div className="score-badge">
                        <Star size={16} fill="#FFD700" stroke="#FFD700" />
                        <span>{scores[currentSlide.id] || 0}%</span>
                    </div>
                </header>
            )}

            <main className="viewer-content">
                {currentSlide.instruction && (
                    <div className="instruction-banner">
                        <Volume2 size={20} />
                        <p>{currentSlide.instruction}</p>
                    </div>
                )}
                {renderContent()}
            </main>

            {/* Navigation Footer */}
            {currentSlide.type !== 'SPLASH' && currentSlide.type !== 'REPORT' && (
                <footer className="viewer-footer">
                    <button className="nav-btn prev" onClick={prevSlide} disabled={isFirst}>
                        <ChevronLeft /> Précédent
                    </button>
                    <button className="nav-btn next" onClick={nextSlide}>
                        {isLast ? 'Terminer' : 'Suivant'} <ChevronRight />
                    </button>
                </footer>
            )}

            <style>{`
                .modern-course-viewer {
                    min-height: 100vh;
                    background: #F7FAFC;
                    display: flex;
                    flex-direction: column;
                    font-family: 'Outfit', sans-serif;
                }

                .viewer-header {
                    background: white;
                    padding: 15px 20px;
                    display: flex;
                    align-items: center;
                    gap: 20px;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.05);
                    z-index: 10;
                }

                .progress-track { flex: 1; }
                .track-info { display: flex; justify-content: space-between; font-size: 0.875rem; color: #718096; margin-bottom: 5px; }
                .track-info span:first-child { font-weight: 700; color: #2D3748; }
                .progress-line { height: 6px; background: #EDF2F7; border-radius: 3px; overflow: hidden; }
                .progress-fill-main { height: 100%; background: #6C63FF; transition: width 0.3s ease; }

                .score-badge {
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    background: #FFFBEB;
                    padding: 5px 10px;
                    border-radius: 12px;
                    color: #B7791F;
                    font-weight: 700;
                }

                .viewer-content {
                    flex: 1;
                    padding: 20px;
                    max-width: 1000px;
                    width: 100%;
                    margin: 0 auto;
                    display: flex;
                    flex-direction: column;
                }

                .instruction-banner {
                    background: #EBF8FF;
                    color: #2B6CB0;
                    padding: 15px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    gap: 10px;
                    margin-bottom: 20px;
                    font-weight: 500;
                    border: 1px solid #BEE3F8;
                }

                .viewer-footer {
                    background: white;
                    padding: 15px 20px;
                    display: flex;
                    justify-content: space-between;
                    border-top: 1px solid #E2E8F0;
                }

                .nav-btn {
                    display: flex;
                    align-items: center;
                    gap: 8px;
                    padding: 10px 20px;
                    border-radius: 8px;
                    border: none;
                    cursor: pointer;
                    font-weight: 600;
                    transition: all 0.2s;
                }
                .nav-btn.prev { background: #EDF2F7; color: #4A5568; }
                .nav-btn.next { background: #6C63FF; color: white; }
                .nav-btn:disabled { opacity: 0.5; cursor: not-allowed; }

                /* --- SPLASH STYLES --- */
                .slide-splash {
                    flex: 1;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    justify-content: center;
                    text-align: center;
                    min-height: 80vh;
                    position: relative; /* Crucial pour le bouton absolu */
                    width: 100%;
                }
                .splash-title { font-size: 2.5rem; color: #2D3748; margin-bottom: 30px; }
                .btn-exit-top {
                    position: absolute;
                    top: 0;
                    left: 0;
                    background: white;
                    border: 1px solid #E2E8F0;
                    padding: 8px 15px;
                    border-radius: 20px;
                    display: flex;
                    align-items: center;
                    gap: 5px;
                    color: #4A5568;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                    box-shadow: 0 2px 10px rgba(0,0,0,0.1);
                    z-index: 100; /* Toujours au dessus */
                }
                .btn-exit-top:hover { background: #F7FAFC; transform: translateX(-3px); }
                .splash-card {
                    background: white;
                    padding: 20px;
                    border-radius: 20px;
                    box-shadow: 0 20px 40px rgba(0,0,0,0.1);
                    max-width: 400px;
                }
                .splash-img { width: 100%; height: 250px; object-fit: cover; border-radius: 15px; margin-bottom: 20px; }
                .splash-desc { color: #718096; margin-bottom: 25px; }
                .btn-start {
                    width: 100%;
                    background: #48BB78;
                    color: white;
                    border: none;
                    padding: 15px;
                    border-radius: 12px;
                    font-size: 1.25rem;
                    font-weight: 700;
                    cursor: pointer;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    gap: 10px;
                }

                /* --- CONTENT STYLES --- */
                .story-frame { width: 100%; height: 600px; border: none; border-radius: 15px; box-shadow: 0 4px 15px rgba(0,0,0,0.05); background: white; }

                .matching-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; }
                .word-card {
                    width: 100%;
                    padding: 15px;
                    margin-bottom: 15px;
                    background: white;
                    border: 2px solid #E2E8F0;
                    border-radius: 10px;
                    text-align: left;
                    font-size: 1.1rem;
                    cursor: pointer;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    transition: all 0.2s;
                }
                .word-card:hover:not(:disabled) { border-color: #6C63FF; transform: translateX(5px); }
                .word-card.selected { border-color: #6C63FF; background: #F3F0FF; }
                .word-card.matched { background: #F0FFF4; border-color: #48BB78; color: #48BB78; cursor: default; }

                .image-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 20px; }
                .image-card { background: white; padding: 15px; border-radius: 15px; box-shadow: 0 4px 6px rgba(0,0,0,0.02); }
                .img-wrapper { position: relative; height: 180px; margin-bottom: 15px; border-radius: 10px; overflow: hidden; background: #EDF2F7; }
                .img-wrapper img { width: 100%; height: 100%; object-fit: contain; }
                .options-row { display: flex; flex-wrap: wrap; gap: 10px; }
                .opt-btn { flex: 1; padding: 8px; border: 1px solid #CBD5E0; background: white; border-radius: 6px; cursor: pointer; font-size: 0.9rem; }
                .opt-btn.btn-success { background: #48BB78; color: white; border-color: #48BB78; }
                .opt-btn.btn-error { background: #F56565; color: white; border-color: #F56565; }

                .gap-row { display: flex; align-items: center; gap: 20px; background: white; padding: 15px; margin-bottom: 15px; border-radius: 10px; }
                .static-word { font-weight: 700; width: 100px; text-align: right; }
                .gap-slot { flex: 1; height: 40px; background: #EDF2F7; border-radius: 8px; border: 2px dashed #CBD5E0; display: flex; align-items: center; padding: 0 15px; }
                .filled-word { font-weight: 600; color: #2D3748; }
                .filled-word.correct { color: #48BB78; }
                .bank-items { display: flex; gap: 10px; flex-wrap: wrap; margin-top: 20px; }
                .bank-btn { padding: 10px 20px; background: white; border: 1px solid #CBD5E0; border-radius: 20px; cursor: grab; box-shadow: 0 2px 4px rgba(0,0,0,0.05); }
                
                .label-tag { background: #EBF8FF; color: #2B6CB0; padding: 5px 10px; border-radius: 5px; margin: 5px; display: inline-block; }
                .btn-validation { width: 100%; margin-top: 20px; padding: 12px; background: #48BB78; color: white; border:none; border-radius:8px; cursor:pointer;}

                /* Report */
                .report-card { text-align: center; background: white; padding: 40px; border-radius: 20px; max-width: 500px; margin: 40px auto; box-shadow: 0 10px 30px rgba(0,0,0,0.1); }
                .final-score { font-size: 3rem; font-weight: 800; color: #6C63FF; margin: 20px 0; }
                .details-list { margin: 30px 0; border-top: 1px solid #E2E8F0; padding-top: 20px; }
                .detail-item { display: flex; align-items: center; justify-content: space-between; margin-bottom: 10px; font-size: 0.9rem; }
                .micro-bar { width: 100px; height: 6px; background: #EDF2F7; border-radius: 3px; overflow: hidden; margin: 0 10px; }
                .micro-fill { height: 100%; }
                .btn-exit { width: 100%; padding: 15px; background: #6C63FF; color: white; border: none; border-radius: 12px; font-weight: 700; cursor: pointer; }

                .fade-in { animation: fadeIn 0.5s ease-out; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }

                /* --- RESPONSIVE DESIGN --- */
                @media (max-width: 768px) {
                    .viewer-header {
                        padding: 10px 15px;
                        gap: 15px;
                    }
                    .track-info span { font-size: 0.8rem; }
                    .score-badge span { display: none; } /* Show only star on small screens */
                    
                    .viewer-content {
                        padding: 15px;
                    }

                    .splash-title { font-size: 1.8rem; }
                    .splash-img { height: 200px; }

                    .matching-grid {
                        grid-template-columns: 1fr; /* Stack columns */
                        gap: 15px;
                    }

                    .image-grid {
                        grid-template-columns: 1fr; /* 1 column for images on mobile */
                    }
                    .img-wrapper { height: 160px; }
                    
                    .story-frame {
                        height: 50vh; /* Adjust height for mobile */
                    }

                    .word-card {
                        padding: 12px;
                        font-size: 1rem;
                    }

                    .viewer-footer {
                        padding: 10px 15px;
                    }
                    .nav-btn {
                        padding: 8px 15px;
                        font-size: 0.9rem;
                    }
                }
            `}</style>
        </div>
    );
};

export default ModernCourse;
