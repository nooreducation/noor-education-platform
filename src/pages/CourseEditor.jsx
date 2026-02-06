import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Plus,
    Save,
    Play,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Download,
    Upload,
    Settings,
    Layout,
    Image as ImageIcon,
    Type,
    Link as LinkIcon,
    CheckCircle2,
    FileCode,
    AlertTriangle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import JSZip from 'jszip';

// Types of slides supported by the ModernCourse player
const SLIDE_TYPES = [
    { id: 'SPLASH', label: 'Ecou d\'accueil', icon: ImageIcon },
    { id: 'STORY', label: 'Histoire/Lien', icon: LinkIcon },
    { id: 'MATCHING_PAIRS', label: 'Paires à relier', icon: Layout },
    { id: 'DRAG_IMAGE', label: 'Identification Image', icon: CheckCircle2 },
    { id: 'GAP_FILL', label: 'Texte à trous', icon: Type },
    { id: 'LABEL_IMAGE', label: 'Étiquettes sur Image', icon: ImageIcon },
    { id: 'REPORT', label: 'Bilan Final', icon: CheckCircle2 },
];

const CourseEditor = () => {
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [course, setCourse] = useState({
        id: 'new-course',
        title: 'Nouveau Cours Interactif',
        level: 'Niveau 1',
        slides: [
            {
                id: 'slide-0',
                type: 'SPLASH',
                title: 'Bienvenue !',
                description: 'Description du cours...',
                image: ''
            }
        ]
    });

    const [activeSlideIndex, setActiveSlideIndex] = useState(0);
    const [isImporting, setIsImporting] = useState(false);

    const activeSlide = course.slides[activeSlideIndex];

    // --- Actions ---

    const addSlide = () => {
        const newSlide = {
            id: `slide-${Date.now()}`,
            type: 'SPLASH',
            title: 'Nouvelle Diapositives',
            description: '',
            image: ''
        };
        const newSlides = [...course.slides];
        newSlides.splice(activeSlideIndex + 1, 0, newSlide);
        setCourse({ ...course, slides: newSlides });
        setActiveSlideIndex(activeSlideIndex + 1);
    };

    const deleteSlide = (index) => {
        if (course.slides.length <= 1) return;
        const newSlides = course.slides.filter((_, i) => i !== index);
        setCourse({ ...course, slides: newSlides });
        setActiveSlideIndex(Math.max(0, activeSlideIndex - 1));
    };

    const updateSlide = (updatedFields) => {
        const newSlides = [...course.slides];
        newSlides[activeSlideIndex] = { ...activeSlide, ...updatedFields };
        setCourse({ ...course, slides: newSlides });
    };

    const handleImportSCORM = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsImporting(true);
        const toastId = toast.loading('Conversion du SCORM en cours...');

        try {
            const zip = await JSZip.loadAsync(file);

            // 1. Find main manifest
            const manifestFile = zip.file('imsmanifest.xml');
            if (!manifestFile) throw new Error('Fichier imsmanifest.xml non trouvé.');

            // 2. We look for mAuthor main.xml specifically as requested/seen in current codebase
            const mainXmlFile = zip.file('pages/main.xml');
            if (!mainXmlFile) throw new Error('Structure mAuthor (pages/main.xml) non trouvée.');

            const mainXmlText = await mainXmlFile.async('string');
            const parser = new DOMParser();
            const mainDoc = parser.parseFromString(mainXmlText, 'text/xml');

            // 3. Extract slides from <pages> tag
            const pageNodes = mainDoc.querySelectorAll('page[href]');
            const newSlides = [];

            for (const [index, pageNode] of Array.from(pageNodes).entries()) {
                const href = pageNode.getAttribute('href');
                const name = pageNode.getAttribute('name');
                const pageXmlFile = zip.file(`pages/${href}`);

                if (pageXmlFile) {
                    const pageXmlText = await pageXmlFile.async('string');
                    const pageDoc = parser.parseFromString(pageXmlText, 'text/xml');

                    // Basic heuristic to determine slide type
                    const youtubeAddon = pageDoc.querySelector('addonModule[addonId="YouTube_Addon"]');
                    const connectionAddon = pageDoc.querySelector('addonModule[addonId="Connection"]');
                    const textModules = pageDoc.querySelectorAll('textModule');

                    if (youtubeAddon) {
                        const urlProperty = youtubeAddon.querySelector('property[name="URL"]');
                        newSlides.push({
                            id: `scorm-${index}`,
                            type: 'STORY',
                            title: name || 'Vidéo',
                            url: urlProperty?.getAttribute('value') || ''
                        });
                    } else if (connectionAddon) {
                        // Placeholder for matching pairs
                        newSlides.push({
                            id: `scorm-${index}`,
                            type: 'MATCHING_PAIRS',
                            title: name || 'Exercice',
                            instruction: 'Reliez les éléments correspondants.',
                            pairs: [{ en: 'Exemple A', fr: 'Exemple B' }]
                        });
                    } else {
                        // Default to STORY or SPLASH based on content
                        newSlides.push({
                            id: `scorm-${index}`,
                            type: 'SPLASH',
                            title: name || 'Page',
                            description: 'Contenu importé depuis SCORM',
                            image: ''
                        });
                    }
                }
            }

            if (newSlides.length > 0) {
                setCourse({
                    ...course,
                    title: mainDoc.querySelector('interactiveContent')?.getAttribute('name') || course.title,
                    slides: newSlides
                });
                setActiveSlideIndex(0);
                toast.success('SCORM importé avec succès !', { id: toastId });
            } else {
                throw new Error('Aucune page compatible trouvée.');
            }

        } catch (error) {
            console.error(error);
            toast.error(`Erreur d'import : ${error.message}`, { id: toastId });
        } finally {
            setIsImporting(false);
            event.target.value = ''; // Reset input
        }
    };

    const handleSave = () => {
        // Here logic to save to Supabase
        console.log('Saving course:', course);
        toast.success('Cours enregistré !');
    };

    // --- Render Helpers ---

    const renderSlideEditor = () => {
        switch (activeSlide.type) {
            case 'SPLASH':
                return (
                    <div className="space-y-6">
                        <div className="input-group">
                            <label>Titre de l'écran</label>
                            <input
                                type="text"
                                value={activeSlide.title}
                                onChange={(e) => updateSlide({ title: e.target.value })}
                                className="editor-input"
                            />
                        </div>
                        <div className="input-group">
                            <label>Description</label>
                            <textarea
                                value={activeSlide.description}
                                onChange={(e) => updateSlide({ description: e.target.value })}
                                className="editor-textarea"
                                rows={4}
                            />
                        </div>
                        <div className="input-group">
                            <label>Image de fond (URL)</label>
                            <input
                                type="text"
                                value={activeSlide.image}
                                onChange={(e) => updateSlide({ image: e.target.value })}
                                className="editor-input"
                                placeholder="/course-assets/image.png"
                            />
                        </div>
                    </div>
                );

            case 'STORY':
                return (
                    <div className="space-y-6">
                        <div className="input-group">
                            <label>Titre</label>
                            <input
                                type="text"
                                value={activeSlide.title}
                                onChange={(e) => updateSlide({ title: e.target.value })}
                                className="editor-input"
                            />
                        </div>
                        <div className="input-group">
                            <label>URL du contenu externe (H5P, YouTube, HTML)</label>
                            <input
                                type="text"
                                value={activeSlide.url}
                                onChange={(e) => updateSlide({ url: e.target.value })}
                                className="editor-input"
                                placeholder="https://..."
                            />
                        </div>
                    </div>
                );

            case 'MATCHING_PAIRS':
                return (
                    <div className="space-y-6">
                        <div className="input-group">
                            <label>Consigne</label>
                            <input
                                type="text"
                                value={activeSlide.instruction}
                                onChange={(e) => updateSlide({ instruction: e.target.value })}
                                className="editor-input"
                            />
                        </div>
                        <div className="space-y-3">
                            <label>Paires (A ↔ B)</label>
                            {(activeSlide.pairs || []).map((pair, idx) => (
                                <div key={idx} className="flex gap-2">
                                    <input
                                        type="text"
                                        value={pair.en}
                                        onChange={(e) => {
                                            const newPairs = [...activeSlide.pairs];
                                            newPairs[idx].en = e.target.value;
                                            updateSlide({ pairs: newPairs });
                                        }}
                                        className="editor-input flex-1"
                                    />
                                    <input
                                        type="text"
                                        value={pair.fr}
                                        onChange={(e) => {
                                            const newPairs = [...activeSlide.pairs];
                                            newPairs[idx].fr = e.target.value;
                                            updateSlide({ pairs: newPairs });
                                        }}
                                        className="editor-input flex-1"
                                    />
                                    <button
                                        onClick={() => {
                                            const newPairs = activeSlide.pairs.filter((_, i) => i !== idx);
                                            updateSlide({ pairs: newPairs });
                                        }}
                                        className="p-2 text-red-400 hover:bg-red-400/10 rounded-lg"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => updateSlide({ pairs: [...(activeSlide.pairs || []), { en: '', fr: '' }] })}
                                className="flex items-center gap-2 text-primary-400 hover:text-primary-300 transition-colors"
                            >
                                <Plus size={18} /> Ajouter une paire
                            </button>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                        <AlertTriangle size={48} className="mb-4 opacity-50" />
                        <p>Cet éditeur pour le type <strong>{activeSlide.type}</strong> est en cours de développement.</p>
                    </div>
                );
        }
    };

    return (
        <div className="editor-container">
            {/* Top Navigation */}
            <header className="editor-header">
                <div className="flex items-center gap-4">
                    <button onClick={() => navigate('/admin')} className="header-icon-btn">
                        <ChevronLeft size={20} />
                    </button>
                    <div>
                        <input
                            type="text"
                            value={course.title}
                            onChange={(e) => setCourse({ ...course, title: e.target.value })}
                            className="header-title-input"
                        />
                        <p className="text-xs text-gray-400 px-1 opacity-70">ID: {course.id} • {course.slides.length} diapositives</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <input
                        type="file"
                        ref={fileInputRef}
                        onChange={handleImportSCORM}
                        accept=".zip"
                        className="hidden"
                    />
                    <button
                        onClick={() => fileInputRef.current.click()}
                        className="btn-editor-secondary"
                        disabled={isImporting}
                    >
                        <Upload size={18} />
                        {isImporting ? 'Chargement...' : 'Importer SCORM'}
                    </button>

                    <button className="btn-editor-secondary">
                        <Play size={18} />
                        Aperçu
                    </button>

                    <button onClick={handleSave} className="btn-editor-primary">
                        <Save size={18} />
                        Enregistrer
                    </button>
                </div>
            </header>

            <div className="editor-layout">
                {/* Sidebar - Slide List */}
                <aside className="editor-sidebar">
                    <div className="sidebar-header">
                        <span className="text-sm font-semibold uppercase tracking-wider text-gray-400">Diapositives</span>
                        <button onClick={addSlide} className="add-slide-btn">
                            <Plus size={20} />
                        </button>
                    </div>

                    <div className="slide-list scrollbar-hide">
                        {course.slides.map((slide, idx) => (
                            <div
                                key={slide.id}
                                className={`slide-item ${idx === activeSlideIndex ? 'active' : ''}`}
                                onClick={() => setActiveSlideIndex(idx)}
                            >
                                <div className="slide-index">{idx + 1}</div>
                                <div className="slide-content">
                                    <div className="slide-title">{slide.title || 'Sans titre'}</div>
                                    <div className="slide-type-badge">
                                        {SLIDE_TYPES.find(t => t.id === slide.type)?.label || slide.type}
                                    </div>
                                </div>
                                {idx === activeSlideIndex && course.slides.length > 1 && (
                                    <button
                                        onClick={(e) => { e.stopPropagation(); deleteSlide(idx); }}
                                        className="delete-slide-btn"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Canvas */}
                <main className="editor-canvas">
                    <div className="canvas-header">
                        <div className="flex gap-2 p-1 bg-white/5 rounded-xl border border-white/10">
                            {SLIDE_TYPES.map((type) => {
                                const Icon = type.icon;
                                return (
                                    <button
                                        key={type.id}
                                        onClick={() => updateSlide({ type: type.id })}
                                        className={`type-toggle-btn ${activeSlide.type === type.id ? 'active' : ''}`}
                                        title={type.label}
                                    >
                                        <Icon size={18} />
                                        <span className="text-xs font-medium">{type.label}</span>
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <div className="canvas-body scrollbar-hide">
                        <motion.div
                            key={activeSlideIndex}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="editor-form-card"
                        >
                            {renderSlideEditor()}
                        </motion.div>
                    </div>

                    <div className="canvas-footer">
                        <div className="flex gap-4 text-xs text-gray-400">
                            <span className="flex items-center gap-1"><Layout size={12} /> Responsive auto</span>
                            <span className="flex items-center gap-1"><Settings size={12} /> Format: Standard 4:3 / 16:9</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <button
                                disabled={activeSlideIndex === 0}
                                onClick={() => setActiveSlideIndex(activeSlideIndex - 1)}
                                className="nav-page-btn"
                            >
                                <ChevronLeft size={16} /> Précédent
                            </button>
                            <span className="text-sm font-medium">{activeSlideIndex + 1} / {course.slides.length}</span>
                            <button
                                disabled={activeSlideIndex === course.slides.length - 1}
                                onClick={() => setActiveSlideIndex(activeSlideIndex + 1)}
                                className="nav-page-btn"
                            >
                                Suivant <ChevronRight size={16} />
                            </button>
                        </div>
                    </div>
                </main>

                {/* Right Sidebar - Slide Properties / AI Helper? */}
                <aside className="editor-properties">
                    <div className="p-6 space-y-6">
                        <section>
                            <h3 className="text-sm font-bold text-gray-300 mb-4 flex items-center gap-2">
                                <Settings size={16} /> Propriétés du cours
                            </h3>
                            <div className="space-y-4">
                                <div className="input-group">
                                    <label>Niveau</label>
                                    <select
                                        className="editor-select"
                                        value={course.level}
                                        onChange={(e) => setCourse({ ...course, level: e.target.value })}
                                    >
                                        <option>Niveau 1</option>
                                        <option>Niveau 2</option>
                                        <option>Niveau 3</option>
                                    </select>
                                </div>
                                <div className="input-group">
                                    <label>Thème visuel</label>
                                    <div className="grid grid-cols-4 gap-2">
                                        {['#5C67FF', '#E91E63', '#4CAF50', '#FF9800'].map(color => (
                                            <button
                                                key={color}
                                                className="w-full aspect-square rounded-lg border-2 border-white/10"
                                                style={{ backgroundColor: color }}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <section className="p-4 bg-primary-500/10 rounded-2xl border border-primary-500/20">
                            <h4 className="text-xs font-bold text-primary-400 uppercase tracking-widest mb-2 flex items-center gap-1">
                                <FileCode size={14} /> Aide à l'import
                            </h4>
                            <p className="text-[11px] leading-relaxed text-gray-400">
                                Vous pouvez importer des dossiers SCORM 2004 zippés. L'éditeur détectera automatiquement les modules interactifs et les convertira dans notre format moderne.
                            </p>
                        </section>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default CourseEditor;
