# 🎓 Noor Education Platform

Une plateforme d'apprentissage interactive moderne avec React.js, Supabase, et déploiement sur Vercel.

![Noor Education](https://img.shields.io/badge/Education-Platform-6C63FF?style=for-the-badge)
![React](https://img.shields.io/badge/React-19.2-61DAFB?style=for-the-badge&logo=react)
![Supabase](https://img.shields.io/badge/Supabase-Database-3ECF8E?style=for-the-badge&logo=supabase)
![Vercel](https://img.shields.io/badge/Vercel-Deploy-000000?style=for-the-badge&logo=vercel)

## 📋 Description

Noor Education est une plateforme éducative complète avec trois interfaces distinctes :

### 👨‍💼 Interface Administrateur
- Gestion des comptes utilisateurs (élèves, parents, professeurs)
- Création et organisation des cours
- Insertion de contenu pédagogique
- Suivi de la progression des élèves
- Tableaux de bord et statistiques

### 👨‍🎓 Interface Élève
- Accès aux cours interactifs
- Vidéos, quiz et exercices
- Suivi de progression personnelle
- Système de points et réalisations
- Calendrier d'activités

### 👨‍👩‍👧 Interface Parent
- Suivi de la progression des enfants
- Notifications et alertes
- Rapports détaillés
- Communication avec l'administration

## 🚀 Technologies Utilisées

- **Frontend**: React 19.2 avec Vite
- **Routing**: React Router DOM
- **State Management**: Zustand
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **Data Fetching**: TanStack Query
- **UI/UX**: 
  - CSS moderne avec animations
  - Design system personnalisé
  - Responsive design
- **Charts**: Recharts
- **Icons**: Lucide React
- **Notifications**: React Hot Toast

## 📦 Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm ou yarn
- Compte Supabase
- Compte GitHub
- Compte Vercel

### Étapes d'installation

1. **Cloner le dépôt**
```bash
git clone https://github.com/votre-username/noor-education-platform.git
cd noor-education-platform
```

2. **Installer les dépendances**
```bash
npm install
```

3. **Configurer Supabase**

   a. Créez un projet sur [Supabase](https://supabase.com)
   
   b. Copiez l'URL et la clé API anonyme de votre projet
   
   c. Créez un fichier `.env` à la racine du projet :
   ```env
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_cle_anon_key_ici
   ```

4. **Configurer la base de données**

   a. Allez dans l'éditeur SQL de Supabase
   
   b. Copiez et exécutez le contenu du fichier `supabase/schema.sql`
   
   c. Vérifiez que toutes les tables ont été créées

5. **Lancer l'application en développement**
```bash
npm run dev
```

L'application sera accessible sur `http://localhost:5173`

## 🗄️ Structure de la Base de Données

### Tables Principales

- **profiles**: Profils utilisateurs (admin, student, parent, teacher)
- **students**: Informations détaillées des élèves
- **courses**: Catalogue de cours
- **lessons**: Leçons par cours
- **enrollments**: Inscriptions cours-élèves
- **lesson_progress**: Progression dans les leçons
- **quizzes**: Quiz et évaluations
- **quiz_attempts**: Tentatives de quiz
- **achievements**: Réalisations disponibles
- **student_achievements**: Réalisations obtenues
- **notifications**: Système de notifications

### Sécurité

- Row Level Security (RLS) activé sur toutes les tables
- Policies pour chaque rôle (admin, student, parent)
- Authentification Supabase intégrée

## 🎨 Design System

### Couleurs Principales

- **Primary Purple**: `#6C63FF`
- **Teal Blue**: `#4ECDC4`
- **Coral Red**: `#FF6B6B`
- **Sunny Yellow**: `#FFE66D`
- **Success Green**: `#51CF66`

### Caractéristiques du Design

- Dark mode moderne
- Animations fluides et micro-interactions
- Glassmorphism effects
- Design responsive (mobile, tablet, desktop)
- Typography premium (Inter, Poppins)

## 🔐 Authentification

### Rôles Utilisateurs

1. **Admin**: Accès complet à la plateforme
2. **Student**: Accès aux cours et progression
3. **Parent**: Suivi des enfants
4. **Teacher**: Création de cours (futur)

### Routes Protégées

- `/admin/*` - Administrateurs uniquement
- `/student/*` - Élèves uniquement
- `/parent/*` - Parents uniquement

## 📱 Responsive Design

L'application est entièrement responsive avec des breakpoints à :
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚢 Déploiement

### Sur Vercel

1. **Push sur GitHub**
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/votre-username/noor-education-platform.git
git push -u origin main
```

2. **Connecter à Vercel**

   a. Allez sur [Vercel](https://vercel.com)
   
   b. Cliquez sur "New Project"
   
   c. Importez votre dépôt GitHub
   
   d. Configurez les variables d'environnement :
   ```
   VITE_SUPABASE_URL=https://votre-projet.supabase.co
   VITE_SUPABASE_ANON_KEY=votre_cle_anon_key_ici
   ```
   
   e. Cliquez sur "Deploy"

3. **Configuration Automatique**

   Vercel détectera automatiquement Vite et configurera :
   - Build Command: `npm run build`
   - Output Directory: `dist`
   - Install Command: `npm install`

## 🧪 Comptes de Test

Après avoir configuré Supabase, créez des comptes de test via l'interface admin :

```
Admin:
Email: admin@noor-education.com
Password: [à créer]

Student:
Email: student@noor-education.com
Password: [à créer]

Parent:
Email: parent@noor-education.com
Password: [à créer]
```

## 📚 Fonctionnalités Futures

- [ ] Système de messagerie intégré
- [ ] Vidéoconférences en direct
- [ ] Éditeur de cours WYSIWYG
- [ ] Application mobile (React Native)
- [ ] Système de notation et commentaires
- [ ] Calendrier intégré
- [ ] Rapports PDF exportables
- [ ] Multi-langue (FR, EN, AR)
- [ ] Mode hors ligne
- [ ] Gamification avancée

## 🤝 Contribution

Les contributions sont les bienvenues ! Pour contribuer :

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit vos changements (`git commit -m 'Add some AmazingFeature'`)
4. Push vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📝 License

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## 👥 Auteurs

- **Votre Nom** - *Développement initial* - [VotreGitHub](https://github.com/votre-username)

## 🙏 Remerciements

- Design inspiré par les meilleures plateformes éducatives modernes
- Icônes par Lucide
- Fonts par Google Fonts

## 📞 Support

Pour toute question ou support :
- Email: support@noor-education.com
- Issues GitHub: [Créer un ticket](https://github.com/votre-username/noor-education-platform/issues)

---

**Fait avec ❤️ pour Noor Education**
