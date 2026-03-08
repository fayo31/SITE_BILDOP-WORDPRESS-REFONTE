# Bildop — Site Web (Refonte)

> **Dernière mise à jour :** 7 mars 2026 — Architecture complète décidée
> **Commit actuel :** `841cb03` — Audit + plan M7/M8

---

## Qu'est-ce que Bildop?

Bildop est une plateforme SaaS québécoise qui aide les entrepreneurs à passer de l'idée au plan d'affaires complet grâce à l'intelligence artificielle. L'utilisateur répond à des questions sous forme de conversation guidée, et l'IA génère un plan d'affaires de 52 pages avec projections financières et stratégie personnalisée.

---

## Architecture complète — Modules + Produits

### 🔧 MODULES (site Bildop — cap à 8)

| # | Module | Fichier | Statut | Notes |
|---|--------|---------|--------|-------|
| IS | **IdeaScore Pro** | `ideascore.html` + `ideascore-pro.html` | ✅ Livré | Lead magnet gratuit — 42 industries, scoring 8 facteurs |
| 1 | **Plan d'affaires IA** | `questionnaire.html` | ✅ Livré | Questionnaire conversationnel → plan 52 pages |
| 2 | **Diagnostic Santé** | `diagnostic.html` | ✅ Livré | 25 questions, score 0-100, 5 flux métiers |
| 3 | **Remèdes** | `remedes.html` | ✅ Livré | 45 remèdes, freemium, plan d'action 99$ |
| 4 | **Architecture de Marque** | `marque.html` | ✅ Livré | Audit maturité, builder interactif, PI |
| 5 | **Simulateur Financier** | `financier.html` | ✅ Livré | 17 modèles industrie, projections 5 ans, scénarios |
| — | **Veille Compétitive** | `veille.html` | ✅ Livré | Standalone — analyse URL/nom compétiteur |
| 6 | **Market Intelligence** | `market-intelligence.html` | ✅ Livré* | Inspiré Cook.ai — marché, concurrents, avatar, contenu, accroches |
| 7 | **Étude de marché temps réel** | `marche-reel.html` | 📋 Planifié | Stats Canada, REQ, Google Trends, SerpAPI, Claude API |
| 8 | **Sprint 90 jours** | `sprint.html` | 📋 Planifié | OKRs, KPIs, templates SOPs, export PDF — Academy intégrée |

> *M6 : frontend complet, données simulées (mock). API live = prochaine étape.
> Academy/Formation = intégrée dans M8 (SOPs + templates d'exécution), évoluera en produit séparé si la demande le justifie.

---

### 📦 PRODUITS SÉPARÉS (écosystème Bildop — hors site)

**P1 — Catalogue 600+ Concepts**
Portail dédié (pas un module). Bibliothèque de concepts business pré-analysés — chaque fiche : idée + marché + investissement requis + modèle de revenus. Base Notion existante à transformer en interface web.
- Modèle : achat unitaire (9–29$ CAD) ou abonnement mensuel
- Modèle 50/50 reprenariat ou vente complète du plan
- Statut : Base Notion existante → à structurer pour accès client

**P2 — Communauté Entrepreneurs QC** *(inspiré Nas.io)*
Plateforme communautaire : forums, events live, challenges 30 jours, sessions de pitch, hackathons.
- Démarrage : Nas.io Pro (29 USD/mois) dès 20 membres — aucun dev requis
- Migration vers stack custom après 200 membres
- Modèle signature : challenges 30 jours (3x plus de revenus que cours passifs — données Nas.io)
- Revenus : abonnement mensuel communauté

**P3 — Licence / White Label**
Vendre la technologie Bildop en B2B aux CLD, SADC, Futurpreneur, Desjardins, incubateurs, universités.
- Modèle QuickBooks ProAdvisor : licences en lot pour leur clientèle
- Deux niveaux : licence organisme (accès limité) + white label complet (branding custom)
- Revenus : licence annuelle par organisme — revenu B2B récurrent sans clients individuels
- Statut : modèle conceptualisé depuis avril 2025 → à structurer en offre commerciale Q3 2026

---

### ⏸ EN ATTENTE — Q3 2026

**AI Diagnostic & Acquisition** *(exclusif REMES)*
L'outil que PERSONNE n'a. Connexion états financiers réels (bilan, P&L) → l'IA génère : valeur estimée, risques, plan de redressement, prix maximum d'achat. Lié au REMES Acquisition OS (7 blocs).
- Fondation déjà posée : M2 (Diagnostic) + M3 (Remèdes) + M8 (Sprint) sont la base
- Différence vs modules existants : traitement des états financiers réels + logique d'acquisition
- Produit REMES interne — pas encore pour le grand public
- Revenus : pay-per-diagnostic ou intégré Pro/Enterprise

---

## Modèle de prix (style Adobe CC / Apple One)

- **IdeaScore Pro** : Gratuit (lead magnet — entry point)
- **Modules 1-2** : Gratuits (hooks — créent l'ADN)
- **Modules individuels** : Achat à vie
- **Abonnement mensuel** : Accès à tout + mises à jour
- **Bundles** : 2 modules, 3 modules, pack complet

---

## Architecture technique

```
bildop-redesign/
├── index.html                  # Landing page (modules + pricing + FAQ)
├── questionnaire.html          # Module 1 — Plan d'affaires (gratuit)
├── diagnostic.html             # Module 2 — Diagnostic (gratuit)
├── remedes.html                # Module 3 — Remèdes (freemium)
├── marque.html                 # Module 4 — Architecture de marque (freemium)
├── financier.html              # Module 5 — Simulateur financier
├── veille.html                 # Veille Compétitive (standalone)
├── market-intelligence.html    # Module 6 — Market Intelligence (Cook.ai-inspired)
├── ideascore.html              # IdeaScore Pro — intégré au site (avec nav)
├── ideascore-pro.html          # IdeaScore Pro — standalone landing page (lead magnet)
├── [À créer] marche-reel.html  # Module 7 — Étude de marché temps réel
├── [À créer] sprint.html       # Module 8 — Plan d'action 90 jours
├── css/
│   └── style.css               # Styles globaux (~4900 lignes)
├── js/
│   ├── main.js                 # Navigation, animations, scroll
│   ├── questionnaire.js        # Module 1 — logique quiz + localStorage
│   ├── diagnostic.js           # Module 2 — 25 questions, scoring, radar
│   ├── remedes.js              # Module 3 — catalogue remèdes, paywall
│   ├── marque.js               # Module 4 — audit branding, builder, paywall
│   ├── financier.js            # Module 5 — projections, scénarios, charts
│   ├── veille.js               # Veille compétitive — analyse URL/nom
│   ├── market-intelligence.js  # Module 6 — 6 étapes d'intelligence marché
│   └── ideascore.js            # IdeaScore Pro — 42 catégories, scoring
└── images/                     # Assets visuels
```

### Stack
- **Frontend** : HTML/CSS/JS vanilla (aucun framework, aucun build tool)
- **CSS** : BEM-like naming, responsive mobile-first (~4 900 lignes)
- **Data** : localStorage pour persistance cross-module (ADN pattern)
- **Charts** : Chart.js (IdeaScore, Financier) + SVG pur (radar diagnostic)
- **Backend** : À venir — n8n workflows + Supabase Edge Functions + Claude API

---

## Flow de données inter-modules (ADN pattern)

```
IdeaScore Pro → valide l'idée avant d'investir
       ↓
Module 1 (ADN) → localStorage('bildop_questionnaire')
       ↓
Module 2 (Diagnostic) → localStorage('bildop_diagnostic')
       ↓
Module 3 (Remèdes) → lit diagnostic pour personnaliser
       ↓
Module 4 (Marque) → localStorage('bildop_brand') + lit ADN
       ↓
Module 5 (Financier) → lit ADN pour pré-remplir modèle industrie
       ↓
Module 6 (Market Intelligence) → lit ADN pour pré-remplir la niche
       ↓
Module 7 (Marché temps réel) → lit niche + ADN + données Module 6
       ↓
Module 8 (Sprint 90 jours) → consolide TOUT pour générer le plan d'action
```

### Paywall pattern
- Phase gratuite → Phase payante
- Vérification : `localStorage('bildop_paid_[module]')` OU `localStorage('bildop_subscription')`
- UI : blur/overlay avec CTA d'achat

---

## Audit Module 6 — Market Intelligence

### Ce qui fonctionne bien
- **UX solide** : 6 étapes progressives avec sidebar de navigation, barre de progression, dots d'état
- **Intégration ADN** : lit `localStorage('bildop_questionnaire')` pour pré-remplir la niche
- **Export rapport** : génère un .txt structuré téléchargeable
- **Animations** : étapes d'analyse animées (perception de vitesse = confiance utilisateur)
- **6 sections complètes** : marché, concurrents, avatar, contenu viral, accroches, rapport

### Ce qui manque / points d'amélioration
- **Données simulées** : toutes les analyses sont des templates statiques (3 profils : fitness, coaching, soins). Pas d'appel API réel.
- **Discrimination limitée** : si la niche ne correspond pas à fitness/coaching/soins, elle tombe dans le profil "default" générique.
- **Pas de Step 6 "Rapport"** côté UI — l'export existe mais n'est pas une étape dédiée dans la sidebar
- **Veille Compétitive** (veille.html) coexiste avec Module 6 sans intégration claire — risque de confusion UX
- **README était désynchronisé** : décrivait Module 6 comme "Plan d'exécution 90 jours" alors que c'est Market Intelligence

### Prochaine étape naturelle pour Module 6
Connecter les 6 étapes à de vraies APIs :
- Étape 1 (marché) → SerpAPI / Google Trends / Semrush API
- Étape 2 (concurrents) → n8n workflow + Supabase
- Étape 3 (avatar) → Claude API (prompt enrichi avec l'ADN utilisateur)
- Étape 4-5 (contenu + accroches) → Claude API

---

## Plan — Module 7 : Étude de marché temps réel

### Concept
Module 6 donne une intelligence *marketing* (avatar, accroches, contenu). Module 7 donne une intelligence *business* (données réelles de marché pour valider les projections financières).

C'est le module qui répond à : **"Mon marché est-il assez grand pour que ça marche?"**

### Ce que fait le module
1. **Taille du marché QC/CA** — données Stats Canada, REQ, CNESST par secteur SCIAN
2. **Volume de recherche** — mots-clés prioritaires, tendances 12 mois, saisonnalité
3. **Benchmark sectoriel** — prix moyen marché, marges typiques, seuil de rentabilité moyen
4. **Signaux de demande** — offres d'emploi, levées de fonds, ouvertures de businesses similaires
5. **Carte de compétition locale** — nombre d'acteurs par région, saturation
6. **Rapport exportable** — synthèse PDF/CSV prête pour présentation banque/investisseur

### Pourquoi c'est différent de Module 6
| Module 6 (Marketing Intelligence) | Module 7 (Marché temps réel) |
|---|---|
| Qui est ton client ? | Combien sont-ils ? |
| Comment leur parler ? | Combien paient-ils ? |
| Quels contenus créer ? | Le marché est-il en croissance ? |
| Qui sont tes concurrents ? | À quelle vitesse le marché évolue-t-il ? |

### Intégrations APIs envisagées
- **Stats Canada** (API publique gratuite) — données sectorielles
- **REQ** (Registre des entreprises) — densité concurrentielle locale
- **Google Trends** (via n8n) — courbe de demande
- **SerpAPI** ou **DataForSEO** — volume de recherche par mot-clé
- **Claude API** — synthèse et recommandations

### Fichiers à créer
```
marche-reel.html
js/marche-reel.js
```

---

## Plan — Module 8 : Plan d'action / Sprint 90 jours

### Concept
C'est le module de **fermeture du cycle**. L'utilisateur a validé son idée (IS), créé son plan (M1), diagnostiqué son entreprise (M2), trouvé les remèdes (M3), défini sa marque (M4), modélisé ses finances (M5), analysé son marché (M6-M7) — maintenant il passe à l'action.

C'est le module qui répond à : **"Par où je commence lundi matin?"**

### Ce que fait le module
1. **Lecture ADN complet** — consolide toutes les données localStorage des modules précédents
2. **Génération du Sprint 90 jours** — 3 phases de 30 jours avec objectifs SMART
3. **OKRs personnalisés** — 3 objectifs clés + KPIs de suivi par objectif
4. **Tableau de bord fondateur** — métriques hebdomadaires à surveiller (issus du Diagnostic)
5. **Priorisation des remèdes** — les remèdes du Module 3 classés par impact/effort
6. **Templates d'exécution** — SOPs simplifiées pour les 5 premières actions
7. **Export PDF** — plan d'action complet + checklist semaine 1

### Structure du Sprint 90 jours

```
SEMAINE 1-4 (Fondations)
→ Actions critiques tirées du Diagnostic (flux le plus faible)
→ Mise en place des KPIs de base
→ Livrable : 1er revenu ou 1ère validation client

SEMAINE 5-8 (Momentum)
→ Exécution du plan marketing (tiré de Module 1 + 6)
→ Optimisation financière (tiré de Module 5)
→ Livrable : 10 clients ou pipeline défini

SEMAINE 9-12 (Accélération)
→ Scaling des actions qui ont fonctionné
→ Revue et ajustement du plan d'affaires
→ Livrable : Bilan 90 jours + plan trimestre suivant
```

### Connexion avec les autres modules

```
Module 2 (Diagnostic) → identifie le flux le plus faible = priorité #1 du Sprint
Module 3 (Remèdes) → les remèdes prioritaires = actions semaines 1-4
Module 5 (Financier) → seuil de rentabilité = objectif financier du Sprint
Module 6 (Market Intelligence) → accroches + avatar = plan de contenu 90 jours
Module 7 (Marché temps réel) → validation des hypothèses de croissance
```

### Modèle de revenus
- Gratuit : Sprint 90 jours basique (texte, sans templates)
- **99$ CAD** : Plan d'action complet PDF + 5 templates SOPs
- **199$ CAD** : Plan complet + coaching 1h avec stratège Bildop
- Inclus dans abonnement mensuel Bildop Pro

### Fichiers à créer
```
sprint.html
js/sprint.js
```

---

## Principes marketing

- Jamais mentionner le nombre de questions (reframer comme "conversation")
- Minimiser l'effort perçu, maximiser la valeur perçue
- Langage de désir, pas de features
- Transformation : confus/bloqué → clair/financé/lancé
- Français québécois, tutoyement, direct mais chaleureux

---

## Développement

Site statique — ouvrir `index.html` dans un navigateur.

```bash
# Cloner
git clone https://github.com/fayo31/SITE_BILDOP-WORDPRESS-REFONTE.git
cd SITE_BILDOP-WORDPRESS-REFONTE

# Serveur local (optionnel)
python3 -m http.server 8000
# → http://localhost:8000
```

---

## Équipe projet

| Personne | Rôle | Contact |
|----------|------|---------|
| Ralph St-Louis | Fondateur / Président | rstlouis@teamremes.ca |
| Daniel Ringuet | Développeur principal (Ephrem L'agence) | daniel@ephreminteractive.ca |
| Daniel Delisle | Partenaire / Contenu / DNS | nextstrom@gmail.com |

---

## Propriétaire

**Ralph St-Louis** — Président, Groupe REMES
Saint-Hubert/Longueuil, Québec

---

*Fait au Québec avec ❤️ et de l'IA*
