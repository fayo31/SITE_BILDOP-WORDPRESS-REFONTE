# Bildop — Site Web (Refonte)

## Qu'est-ce que Bildop?

Bildop est une plateforme SaaS québécoise qui aide les entrepreneurs à passer de l'idée au plan d'affaires complet grâce à l'intelligence artificielle. L'utilisateur répond à des questions sous forme de conversation guidée, et l'IA génère un plan d'affaires de 52 pages avec projections financières et stratégie personnalisée.

## Vision produit

Le **Module 1 (Plan d'affaires)** est gratuit et sert d'**ADN** — toutes les données entrées par l'utilisateur alimentent les modules suivants. L'objectif est de créer un écosystème où l'entrepreneur revient chaque mois pour approfondir sa stratégie.

### Modèle de prix (style Adobe CC / Apple One)
- **Module 1** : Gratuit (le hook — crée l'ADN)
- **Modules individuels** : Achat à vie
- **Abonnement mensuel** : Accès à tout + mises à jour
- **Bundles** : 2 modules, 3 modules, pack complet

## Modules

| # | Module | Statut | Couleur | Description |
|---|--------|--------|---------|-------------|
| 1 | **Plan d'affaires** | ✅ Complet | Navy/Blue | Générateur IA — questionnaire conversationnel → plan 52 pages |
| 2 | **Diagnostic** | ✅ Complet | Teal/Sky | 25 questions → score de santé d'entreprise + rapport PDF |
| 3 | **Remèdes** | ✅ Complet | Green | Catalogue de 45 remèdes basés sur le diagnostic (freemium) |
| 4 | **Architecture de Marque** | ✅ Complet | Purple | Audit de maturité branding + builder interactif (freemium) |
| IS | **IdeaScore Pro** | ✅ Complet | Orange/Red | Score de viabilité d'idée — 42 industries, 8 facteurs, projections 12 mois |
| 5 | **Simulateur financier** | ✅ Complet | — | Projections détaillées, scénarios, breakeven |
| 6 | Plan d'exécution 90 jours | 📋 Planifié | — | Sprint planning pour entrepreneurs |
| 7 | Tableau de bord fondateur | 📋 Planifié | — | KPIs, suivi, alertes |

### IdeaScore Pro (outil gratuit — lead magnet)
Score de viabilité d'idée d'affaires en 2 minutes. 42 industries avec benchmarks réels, classification par mots-clés avec détection live, scoring sur 8 facteurs, projections financières 12 mois, graphiques Chart.js.

**Deux versions :**
- `ideascore.html` — intégré au site avec navigation Bildop
- `ideascore-pro.html` — standalone landing page pour acquisition (email gate avant le dashboard)

**Flow :** Idée → Détection industrie (live) → Questions universelles + spécifiques → Sliders d'ajustement (budget, COGS, prix, loyer) → Animation calcul → Dashboard avec score, radar, projections, recommandations.

### Intelligence compétitive (intégrée)
Fonctionnalité intégrée (pas un module séparé) — l'utilisateur entre un URL ou nom de compagnie et reçoit une analyse compétitive automatique via API (n8n / Supabase Edge Functions).

## Architecture technique

```
bildop-redesign/
├── index.html              # Landing page (modules + pricing + FAQ)
├── questionnaire.html      # Module 1 — Plan d'affaires (gratuit)
├── diagnostic.html         # Module 2 — Diagnostic (gratuit)
├── remedes.html            # Module 3 — Remèdes (freemium)
├── marque.html             # Module 4 — Architecture de marque (freemium)
├── financier.html          # Module 5 — Simulateur financier
├── ideascore.html          # IdeaScore Pro — intégré au site (avec nav)
├── ideascore-pro.html      # IdeaScore Pro — standalone landing page (lead magnet)
├── css/
│   └── style.css           # Styles globaux (~4700 lignes)
├── js/
│   ├── main.js             # Navigation, animations, scroll
│   ├── questionnaire.js    # Module 1 — logique quiz + localStorage
│   ├── diagnostic.js       # Module 2 — 25 questions, scoring, radar
│   ├── remedes.js          # Module 3 — catalogue remèdes, paywall
│   ├── marque.js           # Module 4 — audit branding, builder, paywall
│   └── ideascore.js        # IdeaScore Pro — 42 catégories, classification, scoring 8 facteurs
└── images/                 # Assets visuels
```

### Stack
- **Frontend** : HTML/CSS/JS vanilla (aucun framework, aucun build tool)
- **CSS** : BEM-like naming, responsive mobile-first
- **Data** : localStorage pour persistance cross-module
- **Charts** : Chart.js (IdeaScore) + SVG pur (radar charts diagnostic)
- **Backend** : À venir (n8n workflows + Supabase Edge Functions)

### Flow de données inter-modules
```
Module 1 (ADN) → localStorage('bildop_questionnaire')
                    ↓
Module 2 (Diagnostic) → localStorage('bildop_diagnostic')
                    ↓
Module 3 (Remèdes) → lit diagnostic pour personnaliser
                    ↓
Module 4 (Marque) → localStorage('bildop_brand')
                    ↓ lit ADN pour pré-remplir
Modules 5-7 → liront ADN + diagnostic + brand
```

### Paywall pattern
- Phase gratuite → Phase payante
- Vérification : `localStorage('bildop_paid_[module]')` OU `localStorage('bildop_subscription')`
- UI : blur/overlay avec CTA d'achat

## Audience cible

Entrepreneurs québécois qui :
- Ne savent pas par où commencer
- Ont peur des projections financières
- Ont un plan dans un tiroir mais n'exécutent pas
- Pensent que ça prend trop de temps / coûte trop cher

## Principes marketing
- Jamais mentionner le nombre de questions (reframer comme "conversation")
- Minimiser l'effort perçu, maximiser la valeur perçue
- Langage de désir, pas de features
- Transformation : confus/bloqué → clair/financé/lancé
- Français québécois, tutoyement, direct mais chaleureux

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

## Propriétaire

**Ralph St-Louis** — Président, Groupe REMES
Saint-Hubert/Longueuil, Québec

---

*Fait au Québec avec ❤️ et de l'IA*
