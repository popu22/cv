# plan.md

## 1. Objectives
- Transformer le CV HTML existant en CV web **plus fluide, interactif, responsive** tout en gardant l’identité visuelle actuelle.
- Ajouter un **switch multilingue** (FR/DE/IT/EN) sans dupliquer les pages.
- Améliorer la navigation: **menu fixe**, ancres, **smooth scroll**, mise en évidence de la section active.
- Ajouter des **animations modernes** (scroll reveal, hover/gradients, transitions), une **timeline interactive** (expérience/formation), et un **bouton “retour en haut”**.
- Garantir un **téléchargement PDF** fiable du CV.

## 2. Implementation Steps

### Phase 1 — POC “core UX” (navigation + i18n) 
**User stories (POC)**
1. En tant qu’utilisateur, je veux changer de langue (FR/DE/IT/EN) et voir tout le contenu se mettre à jour instantanément.
2. En tant qu’utilisateur, je veux une navigation fixe avec ancres pour accéder rapidement à une section.
3. En tant qu’utilisateur, je veux un scroll fluide vers les sections, sans saut brutal.
4. En tant qu’utilisateur, je veux que la section active soit mise en évidence dans le menu pendant le scroll.
5. En tant qu’utilisateur, je veux que mon choix de langue soit mémorisé (localStorage) lors de ma prochaine visite.

**Steps**
- Web search rapide: meilleures pratiques **React i18n sans lib** (Context), **IntersectionObserver** pour section active, et scroll behavior.
- Initialiser frontend React (Vite) et intégrer les assets existants (CSS/JS/images) de manière non destructive.
- Implémenter un **LanguageProvider (React Context)** + dictionnaires JSON (FR/DE/IT/EN) + persistance localStorage.
- Construire une page POC minimale avec 3 sections (À propos / Expérience / Formation) + menu fixe.
- Implémenter smooth scroll (native `scrollIntoView({behavior:'smooth'})`) + IntersectionObserver pour “active section”.
- Valider: switch langue, navigation, persistance, pas de régression style.

**Exit criteria (POC)**
- Le switch langue couvre 100% du texte affiché dans le POC.
- Le menu fixe + scroll fluide + highlight section active fonctionnent sur desktop et mobile.

---

### Phase 2 — V1 App Development (CV complet + animations + responsive)
**User stories (V1)**
1. En tant qu’utilisateur, je veux parcourir le CV sur mobile avec une mise en page lisible et sans éléments coupés.
2. En tant qu’utilisateur, je veux voir des animations discrètes au scroll pour mieux comprendre la structure (révélation progressive).
3. En tant qu’utilisateur, je veux une timeline claire et interactive pour l’expérience et la formation.
4. En tant qu’utilisateur, je veux un bouton “retour en haut” visible après un certain scroll.
5. En tant qu’utilisateur, je veux télécharger le CV PDF en 1 clic, quel que soit l’appareil.

**Steps**
- Migrer/recoder le contenu complet du CV HTML vers composants React (sections + données structurées).
- Timeline interactive:
  - Expérience/Éducation en données (array) + rendu timeline (expand/collapse, focus au clic, animation).
- Animations:
  - Scroll reveal via IntersectionObserver + classes CSS (fade/slide).
  - Hover effects/gradients sur cards/boutons (cohérent avec le thème existant).
- Navigation:
  - Menu fixe responsive (desktop: barre latérale/haut; mobile: drawer/hamburger).
  - Ajout “skip to content” + focus states clavier.
- Bouton “Back to top” + apparition/disparition au scroll.
- PDF download:
  - Placer `cv.pdf` dans `/public` (frontend) et lien direct.
- Backend FastAPI minimal (si requis pour servir en prod) sinon build statique (Vite).
- 1 round de test end-to-end (agent): navigation, i18n, responsive, timeline, pdf.

**Exit criteria (V1)**
- Toutes sections présentes (bio, compétences, expérience, formation, références) en 4 langues.
- Performance correcte (pas d’animations saccadées) + responsive validé.

---

### Phase 3 — Durcissement + polish (accessibilité, SEO, robustesse)
**User stories (Polish)**
1. En tant qu’utilisateur, je veux que la page soit accessible au clavier (tab/focus) et lisible (contraste).
2. En tant qu’utilisateur, je veux partager un lien vers une section spécifique (URL hash) et arriver au bon endroit.
3. En tant qu’utilisateur, je veux une expérience cohérente même si certaines polices/assets chargent lentement.
4. En tant qu’utilisateur, je veux une version imprimable propre (print stylesheet) en cas de besoin.
5. En tant qu’utilisateur, je veux que le site se charge vite (assets optimisés, lazy loading images).

**Steps**
- Accessibilité: aria-labels, focus ring, navigation clavier, prefers-reduced-motion.
- Deep linking: synchroniser hash ↔ section active + scroll à l’ouverture.
- SEO basique: meta tags par langue, title/description dynamiques, OpenGraph.
- Optimisations: lazy-load images, preconnect fonts déjà présent, minification build.
- CSS print minimal + vérification PDF/print.
- 1 round de test end-to-end (agent) + fix regressions.

---

### Phase 4 — Options (après validation) 
**User stories (Options)**
1. En tant qu’utilisateur, je veux un toggle clair/sombre si je préfère un autre contraste.
2. En tant qu’utilisateur, je veux filtrer l’expérience (ex: management vs technique).
3. En tant qu’utilisateur, je veux un mini-portfolio (certificats, photos, projets) accessible depuis le CV.
4. En tant qu’utilisateur, je veux un formulaire de contact simple (anti-spam).
5. En tant qu’utilisateur, je veux un mode “présentation” plein écran.

**Steps**
- Implémenter seulement les options confirmées (checkpoint humain avant ajout).

## 3. Next Actions
1. Confirmer le périmètre de traduction: **traduction pro fournie** par vous ou traduction initiale auto (à valider/éditer).
2. Récupérer/valider les assets existants (CSS/JS/images/pdf) et la structure de dossiers.
3. Démarrer Phase 1 POC: React + Context i18n + menu fixe + smooth scroll + active section.

## 4. Success Criteria
- Navigation: menu fixe, ancres, smooth scroll, section active, UX mobile ok.
- i18n: FR/DE/IT/EN complet, persistant, sans rechargement.
- Interactions: scroll reveal + timeline interactive + back-to-top.
- Responsive + accessibilité: lisible sur mobile, clavier ok, reduced-motion respecté.
- PDF: téléchargement fiable (lien public) + option print propre.
