-- =====================================================
-- DONNÉES DE TEST - NOOR EDUCATION PLATFORM
-- =====================================================
-- Ce fichier contient des données d'exemple pour tester la plateforme
-- Exécutez ce script APRÈS avoir exécuté schema.sql

-- =====================================================
-- IMPORTANT: Créer les utilisateurs d'abord via Supabase Auth UI
-- =====================================================
-- 1. Allez dans Supabase > Authentication > Users
-- 2. Créez les utilisateurs suivants :
--    - admin@noor.com (Admin123!)
--    - teacher@noor.com (Teacher123!)
--    - student1@noor.com (Student123!)
--    - student2@noor.com (Student123!)
--    - parent@noor.com (Parent123!)

-- 3. Notez leurs UUID (vous les trouverez dans la table auth.users)
-- 4. Remplacez les UUID ci-dessous par les vrais UUID

-- =====================================================
-- PROFILES - Mettre à jour les rôles
-- =====================================================

-- Admin
UPDATE profiles 
SET role = 'admin', full_name = 'Ahmed Administrator'
WHERE email = 'admin@noor.com';

-- Teacher
UPDATE profiles 
SET role = 'teacher', full_name = 'Prof. Sarah Mansour'
WHERE email = 'teacher@noor.com';

-- Students
UPDATE profiles 
SET role = 'student', full_name = 'Mohamed Élève'
WHERE email = 'student1@noor.com';

UPDATE profiles 
SET role = 'student', full_name = 'Leila Étudiante'
WHERE email = 'student2@noor.com';

-- Parent
UPDATE profiles 
SET role = 'parent', full_name = 'Parent Responsable'
WHERE email = 'parent@noor.com';

-- =====================================================
-- STUDENTS - Informations détaillées des élèves
-- =====================================================

-- Récupérer les IDs des profils (à adapter selon vos UUID)
DO $$
DECLARE
    student1_profile_id UUID;
    student2_profile_id UUID;
    parent_profile_id UUID;
BEGIN
    -- Récupérer les IDs
    SELECT id INTO student1_profile_id FROM profiles WHERE email = 'student1@noor.com';
    SELECT id INTO student2_profile_id FROM profiles WHERE email = 'student2@noor.com';
    SELECT id INTO parent_profile_id FROM profiles WHERE email = 'parent@noor.com';

    -- Insérer les données des élèves
    INSERT INTO students (user_id, grade, date_of_birth, parent_id, total_points, current_streak, status)
    VALUES 
        (student1_profile_id, '5ème', '2011-05-15', parent_profile_id, 1420, 7, 'active'),
        (student2_profile_id, '3ème', '2009-08-22', parent_profile_id, 890, 3, 'active');
END $$;

-- =====================================================
-- COURSES - Cours disponibles
-- =====================================================

-- Récupérer l'ID du professeur
DO $$
DECLARE
    teacher_id UUID;
    course1_id UUID;
    course2_id UUID;
    course3_id UUID;
    course4_id UUID;
BEGIN
    SELECT id INTO teacher_id FROM profiles WHERE email = 'teacher@noor.com';

    -- Créer les cours
    INSERT INTO courses (title, description, subject, grade_level, teacher_id, thumbnail, color, total_lessons, status)
    VALUES 
        (
            'Mathématiques - Algèbre',
            'Découvrez les bases de l''algèbre avec des exercices interactifs et des vidéos explicatives.',
            'Mathématiques',
            '5ème',
            teacher_id,
            '📐',
            '#6C63FF',
            24,
            'active'
        ),
        (
            'Sciences Physiques',
            'Explorez les lois de la physique à travers des expériences virtuelles.',
            'Sciences',
            '5ème',
            teacher_id,
            '⚡',
            '#4ECDC4',
            20,
            'active'
        ),
        (
            'Français - Grammaire',
            'Maîtrisez la grammaire française avec des leçons progressives.',
            'Français',
            '5ème',
            teacher_id,
            '📚',
            '#FF6B6B',
            16,
            'active'
        ),
        (
            'Histoire Moderne',
            'Voyage à travers l''histoire moderne et contemporaine.',
            'Histoire',
            '5ème',
            teacher_id,
            '🏛️',
            '#FFE66D',
            18,
            'active'
        )
    RETURNING id INTO course1_id;

    -- Récupérer les IDs des cours
    SELECT id INTO course1_id FROM courses WHERE title = 'Mathématiques - Algèbre';
    SELECT id INTO course2_id FROM courses WHERE title = 'Sciences Physiques';
    SELECT id INTO course3_id FROM courses WHERE title = 'Français - Grammaire';
    SELECT id INTO course4_id FROM courses WHERE title = 'Histoire Moderne';

    -- =====================================================
    -- LESSONS - Leçons pour chaque cours
    -- =====================================================

    -- Leçons Mathématiques
    INSERT INTO lessons (course_id, title, description, order_number, duration_minutes, is_published)
    VALUES 
        (course1_id, 'Introduction à l''algèbre', 'Découvrez les concepts de base', 1, 30, true),
        (course1_id, 'Les équations simples', 'Résoudre des équations du premier degré', 2, 45, true),
        (course1_id, 'Les équations du second degré', 'Méthodes de résolution avancées', 3, 60, true);

    -- Leçons Sciences Physiques
    INSERT INTO lessons (course_id, title, description, order_number, duration_minutes, is_published)
    VALUES 
        (course2_id, 'L''électricité', 'Les bases de l''électricité', 1, 40, true),
        (course2_id, 'Le magnétisme', 'Comprendre les aimants', 2, 35, true),
        (course2_id, 'L''électromagnétisme', 'La relation entre électricité et magnétisme', 3, 50, true);

    -- Leçons Français
    INSERT INTO lessons (course_id, title, description, order_number, duration_minutes, is_published)
    VALUES 
        (course3_id, 'Les classes grammaticales', 'Noms, verbes, adjectifs...', 1, 30, true),
        (course3_id, 'Les fonctions grammaticales', 'Sujet, COD, COI...', 2, 40, true),
        (course3_id, 'Les propositions subordonnées', 'Relatives, conjonctives...', 3, 45, true);

    -- =====================================================
    -- ENROLLMENTS - Inscriptions des élèves
    -- =====================================================

    DECLARE
        student1_id UUID;
        student2_id UUID;
    BEGIN
        SELECT id INTO student1_id FROM students WHERE user_id = (SELECT id FROM profiles WHERE email = 'student1@noor.com');
        SELECT id INTO student2_id FROM students WHERE user_id = (SELECT id FROM profiles WHERE email = 'student2@noor.com');

        -- Inscriptions élève 1
        INSERT INTO enrollments (student_id, course_id, progress, completed_lessons, status)
        VALUES 
            (student1_id, course1_id, 75.00, 18, 'active'),
            (student1_id, course2_id, 60.00, 12, 'active'),
            (student1_id, course3_id, 85.00, 13, 'active'),
            (student1_id, course4_id, 45.00, 8, 'active');

        -- Inscriptions élève 2
        INSERT INTO enrollments (student_id, course_id, progress, completed_lessons, status)
        VALUES 
            (student2_id, course1_id, 55.00, 13, 'active'),
            (student2_id, course2_id, 70.00, 14, 'active'),
            (student2_id, course3_id, 65.00, 10, 'active');
    END;
END $$;

-- =====================================================
-- NOTIFICATIONS - Notifications de test
-- =====================================================

DO $$
DECLARE
    parent_id UUID;
    student1_id UUID;
BEGIN
    SELECT id INTO parent_id FROM profiles WHERE email = 'parent@noor.com';
    SELECT user_id INTO student1_id FROM students WHERE user_id = (SELECT id FROM profiles WHERE email = 'student1@noor.com');

    -- Notifications pour le parent
    INSERT INTO notifications (user_id, title, message, type, read)
    VALUES 
        (parent_id, 'Excellent résultat !', 'Mohamed a obtenu 95% au quiz de mathématiques', 'success', false),
        (parent_id, 'Devoir à rendre', 'Devoir de français à rendre dans 2 jours', 'warning', false),
        (parent_id, 'Nouveau cours', 'Un nouveau cours d''histoire est disponible', 'info', true);

    -- Notifications pour l'élève
    INSERT INTO notifications (user_id, title, message, type, read)
    VALUES 
        (student1_id, 'Bravo !', 'Vous avez débloqué une nouvelle réalisation', 'success', false),
        (student1_id, 'Quiz disponible', 'Un nouveau quiz de sciences est disponible', 'info', false);
END $$;

-- =====================================================
-- STUDENT ACHIEVEMENTS - Réalisations obtenues
-- =====================================================

DO $$
DECLARE
    student1_id UUID;
    achievement1_id UUID;
    achievement2_id UUID;
    achievement3_id UUID;
BEGIN
    SELECT id INTO student1_id FROM students WHERE user_id = (SELECT id FROM profiles WHERE email = 'student1@noor.com');
    
    -- Récupérer les IDs des réalisations
    SELECT id INTO achievement1_id FROM achievements WHERE title = 'Première Étoile';
    SELECT id INTO achievement2_id FROM achievements WHERE title = 'Quiz Parfait';
    SELECT id INTO achievement3_id FROM achievements WHERE title = 'Cours Complété';

    -- Attribuer les réalisations
    INSERT INTO student_achievements (student_id, achievement_id)
    VALUES 
        (student1_id, achievement1_id),
        (student1_id, achievement2_id),
        (student1_id, achievement3_id);
END $$;

-- =====================================================
-- VÉRIFICATION
-- =====================================================

-- Vérifier que tout est bien créé
SELECT 'Profiles:', COUNT(*) FROM profiles;
SELECT 'Students:', COUNT(*) FROM students;
SELECT 'Courses:', COUNT(*) FROM courses;
SELECT 'Lessons:', COUNT(*) FROM lessons;
SELECT 'Enrollments:', COUNT(*) FROM enrollments;
SELECT 'Achievements:', COUNT(*) FROM achievements;
SELECT 'Student Achievements:', COUNT(*) FROM student_achievements;
SELECT 'Notifications:', COUNT(*) FROM notifications;

-- =====================================================
-- RÉSUMÉ DES COMPTES DE TEST
-- =====================================================

/*
COMPTES DE TEST CRÉÉS :

1. ADMINISTRATEUR
   Email: admin@noor.com
   Password: Admin123!
   Rôle: admin

2. PROFESSEUR
   Email: teacher@noor.com
   Password: Teacher123!
   Rôle: teacher

3. ÉLÈVE 1 (Mohamed)
   Email: student1@noor.com
   Password: Student123!
   Rôle: student
   Classe: 5ème
   Points: 1420
   Jours consécutifs: 7

4. ÉLÈVE 2 (Leila)
   Email: student2@noor.com
   Password: Student123!
   Rôle: student
   Classe: 3ème
   Points: 890
   Jours consécutifs: 3

5. PARENT
   Email: parent@noor.com
   Password: Parent123!
   Rôle: parent
   Enfants: Mohamed, Leila

COURS CRÉÉS :
- Mathématiques - Algèbre (24 leçons)
- Sciences Physiques (20 leçons)
- Français - Grammaire (16 leçons)
- Histoire Moderne (18 leçons)

Tous les élèves sont inscrits à plusieurs cours avec des progressions variées.
*/
