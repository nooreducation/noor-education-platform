# 🏗️ Architecture - Noor Education Platform

## Vue d'Ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                    NOOR EDUCATION PLATFORM                   │
│                                                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │    ADMIN     │  │   STUDENT    │  │    PARENT    │     │
│  │  Dashboard   │  │  Dashboard   │  │  Dashboard   │     │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘     │
│         │                 │                  │              │
│         └─────────────────┼──────────────────┘              │
│                           │                                 │
│                    ┌──────▼──────┐                          │
│                    │   ROUTER    │                          │
│                    │ (Protected) │                          │
│                    └──────┬──────┘                          │
│                           │                                 │
│         ┌─────────────────┼─────────────────┐               │
│         │                 │                 │               │
│    ┌────▼────┐      ┌────▼────┐      ┌────▼────┐          │
│    │  AUTH   │      │  STATE  │      │   API   │          │
│    │  Store  │      │  Mgmt   │      │ Client  │          │
│    │(Zustand)│      │(Zustand)│      │(Supabase)│         │
│    └────┬────┘      └────┬────┘      └────┬────┘          │
│         │                │                 │               │
│         └────────────────┼─────────────────┘               │
│                          │                                 │
│                   ┌──────▼──────┐                          │
│                   │  SUPABASE   │                          │
│                   │   Backend   │                          │
│                   └─────────────┘                          │
└─────────────────────────────────────────────────────────────┘
```

---

## 🎯 Architecture en Couches

### 1️⃣ **Couche Présentation** (UI Layer)

**Responsabilité** : Afficher l'interface utilisateur

```
src/pages/
├── Login.jsx              # Point d'entrée
├── AdminDashboard.jsx     # Interface admin
├── StudentDashboard.jsx   # Interface élève
└── ParentDashboard.jsx    # Interface parent

src/components/
├── Navbar.jsx             # Navigation
└── LoadingSpinner.jsx     # Loading states
```

**Caractéristiques** :
- Composants React fonctionnels
- Hooks personnalisés
- Styled avec CSS-in-JS (style jsx)
- Responsive design

---

### 2️⃣ **Couche Routage** (Routing Layer)

**Responsabilité** : Navigation et protection des routes

```javascript
// App.jsx
<Routes>
  <Route path="/login" element={<Login />} />
  
  <Route path="/admin" element={
    <ProtectedRoute allowedRoles={['admin']}>
      <AdminDashboard />
    </ProtectedRoute>
  } />
  
  <Route path="/student" element={
    <ProtectedRoute allowedRoles={['student']}>
      <StudentDashboard />
    </ProtectedRoute>
  } />
  
  <Route path="/parent" element={
    <ProtectedRoute allowedRoles={['parent']}>
      <ParentDashboard />
    </ProtectedRoute>
  } />
</Routes>
```

**Fonctionnalités** :
- Protection par rôle
- Redirections automatiques
- Gestion 404
- Navigation programmatique

---

### 3️⃣ **Couche État** (State Layer)

**Responsabilité** : Gestion de l'état global

```javascript
// stores/authStore.js
useAuthStore = create((set, get) => ({
  user: null,
  profile: null,
  role: null,
  loading: true,
  
  // Actions
  initialize: async () => { ... },
  signIn: async (email, password) => { ... },
  signOut: async () => { ... },
}))
```

**Technologies** :
- Zustand (state management)
- React Context (si nécessaire)
- Local state (useState)

**Stores** :
- `authStore` - Authentication & user
- Future: `courseStore`, `notificationStore`, etc.

---

### 4️⃣ **Couche Service** (Service Layer)

**Responsabilité** : Communication avec le backend

```javascript
// lib/supabase.js
export const supabase = createClient(
  SUPABASE_URL,
  SUPABASE_ANON_KEY
)

// Exemple d'utilisation
const { data, error } = await supabase
  .from('courses')
  .select('*')
  .eq('status', 'active')
```

**Services** :
- Supabase Client
- TanStack Query (data fetching)
- API helpers (futures)

---

### 5️⃣ **Couche Données** (Data Layer)

**Responsabilité** : Base de données et persistence

```
SUPABASE POSTGRES DATABASE
├── auth.users           # Authentification
├── profiles             # Profils utilisateurs
├── students             # Données élèves
├── courses              # Catalogue cours
├── lessons              # Contenu leçons
├── enrollments          # Inscriptions
├── lesson_progress      # Progression
├── quizzes              # Évaluations
├── achievements         # Réalisations
├── notifications        # Notifications
└── RLS Policies         # Sécurité
```

---

## 🔄 Flux de Données

### Flux d'Authentification

```
1. User entre email/password
   ↓
2. Login.jsx → authStore.signIn()
   ↓
3. authStore → supabase.auth.signInWithPassword()
   ↓
4. Supabase Auth vérifie credentials
   ↓
5. Si OK → Session créée
   ↓
6. authStore.loadUserProfile()
   ↓
7. Supabase → SELECT * FROM profiles
   ↓
8. Store mis à jour (user, profile, role)
   ↓
9. Router → Redirection basée sur role
   ↓
10. Dashboard approprié chargé
```

### Flux de Récupération de Données

```
Component (StudentDashboard)
    ↓
useEffect / onMount
    ↓
TanStack Query / Direct Supabase
    ↓
supabase.from('enrollments').select()
    ↓
Row Level Security Check
    ↓
Data returned
    ↓
State updated
    ↓
UI Re-rendered
```

---

## 🔒 Sécurité Multi-Couches

### 1. Frontend (React)
```javascript
// Protection des routes
<ProtectedRoute allowedRoles={['admin']}>
  <AdminDashboard />
</ProtectedRoute>
```

### 2. État (Store)
```javascript
// Vérification du rôle
if (!user || role !== 'admin') {
  navigate('/login')
}
```

### 3. Backend (Supabase)
```sql
-- Row Level Security
CREATE POLICY "Admins can view all students"
  ON students FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role = 'admin'
    )
  );
```

### 4. Environnement
```bash
# Variables sécurisées
VITE_SUPABASE_URL=***
VITE_SUPABASE_ANON_KEY=***
# Jamais dans Git (.gitignore)
```

---

## 📱 Architecture Responsive

```
┌──────────────────────────────────┐
│         DESIGN SYSTEM            │
│                                  │
│  CSS Variables                   │
│  ├── Colors                      │
│  ├── Spacing                     │
│  ├── Typography                  │
│  ├── Breakpoints                 │
│  └── Animations                  │
│                                  │
│  Components                      │
│  ├── Desktop Layout              │
│  ├── Tablet Layout               │
│  └── Mobile Layout               │
│      └── Hamburger Menu          │
└──────────────────────────────────┘

Breakpoints:
- Mobile:  < 768px
- Tablet:  768px - 1024px
- Desktop: > 1024px
```

---

## 🎨 Design System Architecture

```
index.css (Root Styles)
├── :root (CSS Variables)
│   ├── Colors
│   ├── Spacing
│   ├── Typography
│   ├── Shadows
│   └── Transitions
│
├── Base Styles
│   ├── Reset
│   ├── Typography
│   └── Layout
│
├── Components
│   ├── Buttons
│   ├── Cards
│   ├── Forms
│   ├── Badges
│   └── Animations
│
└── Utilities
    ├── Flexbox
    ├── Grid
    └── Spacing
```

---

## 🔄 State Management Flow

```
Component
    ↓
useAuthStore()  ← Zustand Store
    ↓
{
  user,
  profile,
  role,
  loading,
  signIn(),
  signOut()
}
    ↓
Automatic Re-render on Change
```

**Avantages Zustand** :
- ✅ Simple et léger
- ✅ Pas de boilerplate
- ✅ DevTools intégré
- ✅ TypeScript ready

---

## 📊 Data Fetching Strategy

### Option 1: Direct Supabase (Actuel)
```javascript
const { data, error } = await supabase
  .from('courses')
  .select('*')
```

### Option 2: TanStack Query (Recommandé)
```javascript
const { data, isLoading } = useQuery({
  queryKey: ['courses'],
  queryFn: () => supabase.from('courses').select('*')
})
```

**Avantages TanStack Query** :
- Cache automatique
- Refetch automatique
- Loading states
- Error handling
- Optimistic updates

---

## 🚀 Build & Deployment Architecture

```
Local Development
    ↓
git push origin main
    ↓
GitHub Repository
    ↓
Vercel Auto-Deploy
    ↓
Build Process (Vite)
    ├── Bundle optimization
    ├── Code splitting
    ├── Asset optimization
    └── Environment variables
    ↓
Production Deployment
    ├── CDN distribution
    ├── Automatic HTTPS
    └── Serverless functions
```

---

## 🔧 Configuration Files

```
.
├── vite.config.js         # Vite configuration
├── vercel.json            # Vercel deployment
├── package.json           # Dependencies
├── .env                   # Environment variables
├── .gitignore             # Git ignore rules
└── eslint.config.js       # Code quality
```

---

## 📈 Scalability Architecture

### Horizontal Scaling
```
More Users → Supabase Auto-Scales
More Requests → Vercel Edge Network
More Data → Postgres Optimization
```

### Vertical Scaling
```
Add Features
    ↓
New Components
    ↓
New Stores (Zustand)
    ↓
New Tables (Supabase)
    ↓
Deploy (Vercel)
```

---

## 🎯 Future Architecture Enhancements

### Phase 1: Performance
- [ ] Image optimization (Next.js Image)
- [ ] Route-based code splitting
- [ ] Service Worker (PWA)
- [ ] Cached queries (TanStack Query)

### Phase 2: Features
- [ ] Real-time subscriptions (Supabase)
- [ ] File uploads (Supabase Storage)
- [ ] WebRTC (video calls)
- [ ] WebSocket (chat)

### Phase 3: Scale
- [ ] Multi-tenant architecture
- [ ] CDN for media
- [ ] Database sharding
- [ ] Microservices (if needed)

---

## 📊 Performance Metrics

**Target Metrics** :
- ⚡ First Contentful Paint: < 1.5s
- ⚡ Time to Interactive: < 3s
- ⚡ Lighthouse Score: > 90
- ⚡ Bundle Size: < 500KB

**Current Optimizations** :
- ✅ Vite (fast builds)
- ✅ Code splitting
- ✅ Lazy loading
- ✅ CSS optimization

---

## 🛠️ Development Workflow

```
1. Feature Branch
   ↓
2. Development (npm run dev)
   ↓
3. Testing
   ↓
4. Commit (conventional commits)
   ↓
5. Push to GitHub
   ↓
6. Pull Request
   ↓
7. Code Review
   ↓
8. Merge to main
   ↓
9. Auto-Deploy (Vercel)
   ↓
10. Production ✅
```

---

**Architecture Version** : 1.0.0  
**Last Updated** : 2 Février 2026  
**Maintainer** : Noor Education Team
