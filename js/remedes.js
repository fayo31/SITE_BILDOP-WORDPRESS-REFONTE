/* ============================================
   BILDOP — Module 3 : Remèdes
   20 remèdes × 5W × Freemium wall × Diagnostic integration
   ============================================ */

// --- Flux Metadata (shared with diagnostic) ---
const flux = [
  { name: 'Acquisition Client', icon: '🎯', description: 'Comment tu attires et convertis tes clients' },
  { name: 'Production & Livraison', icon: '⚙️', description: 'Comment tu livres ton service ou produit' },
  { name: 'Finances & Trésorerie', icon: '💰', description: 'Comment tu gères ton argent' },
  { name: 'Rétention & Satisfaction', icon: '❤️', description: 'Comment tu gardes tes clients' },
  { name: 'Pilotage & Décision', icon: '🧭', description: 'Comment tu pilotes ton entreprise' },
];

// --- 20 Remèdes (5W model) ---
const remedesData = [
  // ===== FLUX 0 : ACQUISITION CLIENT (4 remèdes) =====
  [
    {
      id: "acq-01", name: "Cartographie d'acquisition", icon: "🗺️", fluxIdx: 0,
      quoi: "Identifier et documenter tes 3 canaux d'acquisition principaux, mettre en place un tracking simple, et créer un tableau de bord hebdomadaire pour savoir d'où viennent tes clients.",
      qui: "Le fondateur ou le responsable marketing",
      quand: "Dans les 7 prochains jours",
      pourquoi: "Tu perds des prospects parce que tu ne sais pas d'où viennent tes clients. Sans tracking, tu investis à l'aveugle — tu gaspilles du budget sur des canaux qui ne performent pas et tu ne peux pas doubler ceux qui marchent.",
      delai: "1 semaine", difficulte: "facile", format: "template",
      comment: {
        resume: "SOP complète en 8 étapes avec templates de tracking inclus",
        etapes: [
          "Lister tous tes points de contact actuels (site web, réseaux sociaux, bouche-à-oreille, pub, etc.)",
          "Installer des UTM sur chaque lien marketing sortant",
          "Configurer Google Analytics ou Plausible sur ton site",
          "Créer un spreadsheet de suivi hebdomadaire par canal",
          "Définir les 3 métriques clés par canal (visites, leads, conversions)",
          "Analyser les résultats chaque vendredi matin (15 min)",
          "Couper ou réduire les canaux qui ne convertissent pas",
          "Documenter le processus pour l'équipe"
        ],
        templates: [
          { nom: "Spreadsheet de tracking acquisition", format: "xlsx" },
          { nom: "Checklist UTM par canal", format: "pdf" }
        ],
        outils: ["Google Analytics", "Google Sheets", "UTM Builder"]
      }
    },
    {
      id: "acq-02", name: "Script premier contact", icon: "📞", fluxIdx: 0,
      quoi: "Créer une procédure écrite pour qualifier un prospect en moins de 10 minutes lors du premier contact, avec une grille de décision claire (qualifié / pas qualifié / à relancer).",
      qui: "Le fondateur ou la personne responsable des ventes",
      quand: "Dans les 48 prochaines heures",
      pourquoi: "Chaque premier contact est une occasion de vente. Sans script, tu improvises — tu oublies des questions clés, tu qualifies mal, et tu perds des clients qui auraient signé avec une approche structurée.",
      delai: "48h", difficulte: "facile", format: "template",
      comment: {
        resume: "Script de qualification en 5 étapes + grille de décision + exemples par secteur",
        etapes: [
          "Définir les 5 critères de qualification (budget, besoin, timing, décideur, urgence)",
          "Écrire le script d'ouverture (30 secondes max)",
          "Lister les 7 questions de qualification essentielles",
          "Créer la grille de décision : qualifié / tiède / non qualifié",
          "Écrire les réponses aux 5 objections les plus fréquentes",
          "Définir le prochain pas pour chaque catégorie de prospect",
          "Tester le script sur 5 vrais prospects et ajuster"
        ],
        templates: [
          { nom: "Script de qualification téléphonique", format: "pdf" },
          { nom: "Grille de scoring prospect", format: "xlsx" }
        ],
        outils: ["Google Docs", "CRM (HubSpot gratuit ou Pipedrive)"]
      }
    },
    {
      id: "acq-03", name: "Séquence de relance automatisée", icon: "🔄", fluxIdx: 0,
      quoi: "Mettre en place une séquence de relance automatique (J+1, J+3, J+7) pour chaque prospect non converti, avec des messages personnalisés par canal.",
      qui: "Le fondateur ou le responsable marketing/ventes",
      quand: "Dans les 7 prochains jours",
      pourquoi: "80% des ventes se font entre le 5e et le 12e contact. Si tu ne relances pas, tes prospects oublient — pas parce qu'ils ne sont pas intéressés, mais parce que la vie les rattrape. Chaque prospect non relancé, c'est de l'argent laissé sur la table.",
      delai: "1 semaine", difficulte: "moyen", format: "workflow",
      comment: {
        resume: "Workflow complet de relance en 3 touchpoints avec templates de messages",
        etapes: [
          "Catégoriser tes prospects : chaud / tiède / froid",
          "Écrire le message de relance J+1 (email + texto)",
          "Écrire le message de relance J+3 (ajout de valeur / contenu)",
          "Écrire le message de relance J+7 (dernière chance + offre)",
          "Configurer l'automatisation dans ton CRM ou email",
          "Définir les règles de sortie (a répondu, a acheté, désabonné)",
          "Tester la séquence avec 10 prospects réels",
          "Analyser les taux d'ouverture et de réponse après 2 semaines"
        ],
        templates: [
          { nom: "3 templates de relance email", format: "pdf" },
          { nom: "Workflow d'automatisation (schéma)", format: "pdf" }
        ],
        outils: ["Mailchimp", "HubSpot CRM", "Calendly"]
      }
    },
    {
      id: "acq-04", name: "Rapport d'acquisition hebdomadaire", icon: "📊", fluxIdx: 0,
      quoi: "Créer un rapport automatisé qui résume chaque semaine tes leads, conversions, coût d'acquisition (CAC), source et tendance — en un seul coup d'œil.",
      qui: "Le fondateur ou le responsable marketing",
      quand: "Dans les 7 prochains jours",
      pourquoi: "Sans rapport régulier, tu découvres les problèmes d'acquisition 1-2 mois trop tard. Un rapport hebdo de 5 minutes te permet de corriger le tir en temps réel — pas quand les dégâts sont faits.",
      delai: "1 semaine", difficulte: "moyen", format: "template",
      comment: {
        resume: "Template de rapport hebdo automatisé + tutoriel de configuration",
        etapes: [
          "Définir les 6 métriques clés : leads, conversions, CAC, source, taux, tendance",
          "Créer le template de rapport dans Google Sheets",
          "Connecter les sources de données (Analytics, CRM, réseaux sociaux)",
          "Configurer les formules de calcul automatique",
          "Ajouter les graphiques de tendance (4 semaines glissantes)",
          "Programmer l'envoi automatique chaque lundi matin",
          "Définir les seuils d'alerte (KPI en zone rouge = notification)"
        ],
        templates: [
          { nom: "Dashboard acquisition hebdomadaire", format: "xlsx" },
          { nom: "Guide de configuration pas à pas", format: "pdf" }
        ],
        outils: ["Google Sheets", "Google Analytics", "Zapier"]
      }
    },
  ],

  // ===== FLUX 1 : PRODUCTION & LIVRAISON (4 remèdes) =====
  [
    {
      id: "prod-01", name: "SOP du service principal", icon: "📝", fluxIdx: 1,
      quoi: "Écrire la procédure étape par étape pour livrer ton service principal de manière reproductible — du début à la fin, sans que ça dépende de la mémoire d'une seule personne.",
      qui: "Le fondateur + la personne qui livre le service le plus souvent",
      quand: "Dans les 7 prochains jours",
      pourquoi: "Sans SOP, ta qualité dépend de qui travaille ce jour-là. Un employé malade ou un départ = chaos. Chaque livraison incohérente abîme ta réputation et génère des plaintes qui coûtent cher à réparer.",
      delai: "1 semaine", difficulte: "moyen", format: "workflow",
      comment: {
        resume: "Méthode en 6 étapes pour documenter ton service + template SOP prêt à remplir",
        etapes: [
          "Filmer ou noter le processus complet en temps réel (une vraie livraison)",
          "Découper en étapes séquentielles (max 15 étapes)",
          "Pour chaque étape : action + durée + responsable + critère de qualité",
          "Identifier les points critiques (où les erreurs arrivent le plus souvent)",
          "Ajouter les photos, captures d'écran ou vidéos explicatives",
          "Faire tester la SOP par quelqu'un qui ne connaît PAS le processus",
          "Ajuster selon les retours et publier la version finale",
          "Planifier une révision trimestrielle"
        ],
        templates: [
          { nom: "Template SOP universel", format: "docx" },
          { nom: "Checklist de validation SOP", format: "pdf" }
        ],
        outils: ["Google Docs", "Loom (vidéo)", "Notion"]
      }
    },
    {
      id: "prod-02", name: "Checklist qualité pré-livraison", icon: "✅", fluxIdx: 1,
      quoi: "Créer une vérification en 5 points avant chaque livraison pour garantir que rien ne passe entre les mailles du filet.",
      qui: "Toute personne qui livre le service ou le produit",
      quand: "Dans les 48 prochaines heures",
      pourquoi: "Les plaintes récurrentes viennent presque toujours du même type d'oubli. Une checklist de 2 minutes avant livraison élimine 80% des erreurs évitables — et les coûts de reprise qui viennent avec.",
      delai: "48h", difficulte: "facile", format: "template",
      comment: {
        resume: "Checklist en 5 points + processus de validation + formulaire de non-conformité",
        etapes: [
          "Lister les 10 plaintes ou erreurs les plus fréquentes des 6 derniers mois",
          "Regrouper en 5 catégories de vérification",
          "Formuler chaque point en question oui/non vérifiable",
          "Créer le formulaire de checklist (papier ou numérique)",
          "Définir le processus si un point échoue (qui décide, quoi faire)",
          "Former l'équipe en 15 minutes",
          "Analyser les résultats après 30 jours et ajuster"
        ],
        templates: [
          { nom: "Checklist qualité 5 points", format: "pdf" },
          { nom: "Formulaire de non-conformité", format: "pdf" }
        ],
        outils: ["Google Forms", "Imprimante (version papier)"]
      }
    },
    {
      id: "prod-03", name: "Plan de formation accélérée", icon: "🎓", fluxIdx: 1,
      quoi: "Créer un programme de formation structuré en 5-10 jours pour que tout nouvel employé soit autonome rapidement, basé sur tes SOPs existantes.",
      qui: "Le fondateur ou le responsable RH/opérations",
      quand: "Dans les 14 prochains jours",
      pourquoi: "Chaque semaine qu'un nouvel employé passe à « apprendre sur le tas » te coûte en productivité, en erreurs et en supervision. Un plan de formation structuré divise le temps d'intégration par 2 — et réduit les départs en période d'essai.",
      delai: "2 semaines", difficulte: "moyen", format: "template",
      comment: {
        resume: "Programme de formation en 5 jours + guide du formateur + évaluation des compétences",
        etapes: [
          "Lister les compétences essentielles pour être autonome (max 10)",
          "Séquencer les apprentissages du plus simple au plus complexe",
          "Créer un calendrier jour par jour (Jour 1: observation, Jour 2: pratique guidée...)",
          "Associer chaque journée à la SOP correspondante",
          "Préparer les exercices pratiques et cas réels",
          "Définir les critères de validation pour chaque compétence",
          "Créer le formulaire d'évaluation de fin de formation",
          "Prévoir un suivi à J+30 pour valider l'autonomie"
        ],
        templates: [
          { nom: "Plan de formation 5 jours", format: "docx" },
          { nom: "Grille d'évaluation des compétences", format: "xlsx" }
        ],
        outils: ["Google Docs", "Loom", "Notion"]
      }
    },
    {
      id: "prod-04", name: "Tableau de bord qualité", icon: "📋", fluxIdx: 1,
      quoi: "Mettre en place un suivi hebdomadaire : délais de livraison, plaintes, satisfaction client et taux de reprise — pour voir les tendances avant qu'elles deviennent des problèmes.",
      qui: "Le fondateur ou le responsable des opérations",
      quand: "Dans les 7 prochains jours",
      pourquoi: "Sans mesure, tu découvres les problèmes de qualité quand les clients partent. Un tableau de bord hebdo te montre la tendance — tu peux réagir en une semaine au lieu de 3 mois.",
      delai: "1 semaine", difficulte: "moyen", format: "template",
      comment: {
        resume: "Dashboard qualité automatisé + guide de lecture + processus d'escalade",
        etapes: [
          "Définir les 5 métriques qualité : délais, plaintes, satisfaction, reprises, NPS",
          "Créer le spreadsheet avec formules automatiques",
          "Mettre en place la collecte de données (formulaire post-livraison)",
          "Configurer les graphiques de tendance (8 semaines glissantes)",
          "Définir les seuils d'alerte par métrique",
          "Programmer un email de rapport chaque vendredi",
          "Créer le processus d'escalade si un seuil est franchi"
        ],
        templates: [
          { nom: "Dashboard qualité hebdomadaire", format: "xlsx" },
          { nom: "Formulaire satisfaction post-livraison", format: "pdf" }
        ],
        outils: ["Google Sheets", "Google Forms", "Zapier"]
      }
    },
  ],

  // ===== FLUX 2 : FINANCES & TRÉSORERIE (4 remèdes) =====
  [
    {
      id: "fin-01", name: "Tableau de bord financier mensuel", icon: "💹", fluxIdx: 2,
      quoi: "Créer un rapport mensuel automatisé qui résume tes revenus, dépenses, marge nette, cash-flow et créances — pour savoir si tu fais vraiment de l'argent.",
      qui: "Le fondateur (avec son comptable/teneur de livres)",
      quand: "Dans les 7 prochains jours",
      pourquoi: "90% des PME ne connaissent pas leur marge nette réelle. Tu penses faire de l'argent, mais après toutes les dépenses, il reste peut-être rien — ou pire, tu perds de l'argent sans le savoir. Chaque mois sans visibilité, c'est un mois de décisions à l'aveugle.",
      delai: "1 semaine", difficulte: "moyen", format: "template",
      comment: {
        resume: "Dashboard financier automatisé + guide de lecture pour non-comptables",
        etapes: [
          "Collecter tes 3 derniers relevés bancaires et factures",
          "Catégoriser les dépenses (fixes vs variables)",
          "Calculer ta marge brute et nette réelle",
          "Créer le tableau de bord dans Google Sheets",
          "Configurer les formules de calcul automatique",
          "Ajouter la projection de cash-flow 90 jours",
          "Définir les seuils d'alerte (marge < 10%, créances > 15%)",
          "Planifier la mise à jour le 5 de chaque mois"
        ],
        templates: [
          { nom: "Dashboard financier mensuel", format: "xlsx" },
          { nom: "Guide de lecture (non-comptable)", format: "pdf" }
        ],
        outils: ["Google Sheets", "Wave (comptabilité gratuite)", "QBO"]
      }
    },
    {
      id: "fin-02", name: "Séquence de relance paiements", icon: "💸", fluxIdx: 2,
      quoi: "Automatiser les relances pour les factures impayées : J+30, J+45, J+60 avec escalade progressive — pour que l'argent qu'on te doit rentre vraiment.",
      qui: "Le fondateur ou la personne responsable de la facturation",
      quand: "Dans les 7 prochains jours",
      pourquoi: "Chaque facture en souffrance > 60 jours, c'est du cash qui manque dans ta trésorerie. Beaucoup de clients ne paient pas par mauvaise foi — ils oublient. Une relance systématique récupère 60-80% des retards sans conflit.",
      delai: "1 semaine", difficulte: "facile", format: "workflow",
      comment: {
        resume: "Workflow de relance en 3 paliers + templates de messages + processus d'escalade",
        etapes: [
          "Lister toutes les factures en souffrance actuelles",
          "Écrire le message de relance amical J+30",
          "Écrire le message de relance ferme J+45",
          "Écrire le message d'escalade J+60 (mise en demeure)",
          "Configurer l'automatisation dans ton logiciel de facturation",
          "Définir le processus d'escalade (agence de recouvrement, petites créances)",
          "Tester sur les factures en cours"
        ],
        templates: [
          { nom: "3 templates de relance paiement", format: "pdf" },
          { nom: "Modèle de mise en demeure", format: "docx" }
        ],
        outils: ["Wave", "QuickBooks", "FreshBooks"]
      }
    },
    {
      id: "fin-03", name: "Projection de cash-flow 90 jours", icon: "📈", fluxIdx: 2,
      quoi: "Créer un modèle simple de projection sur 90 jours pour voir ce qui rentre et sort — et anticiper les manques de liquidité avant qu'ils arrivent.",
      qui: "Le fondateur",
      quand: "Dans les 48 prochaines heures",
      pourquoi: "La première cause de faillite des PME, c'est pas le manque de ventes — c'est le manque de cash au mauvais moment. Une projection 90 jours te montre les trous AVANT qu'ils arrivent. Tu peux agir — pas réagir.",
      delai: "48h", difficulte: "facile", format: "template",
      comment: {
        resume: "Modèle de projection cash-flow + guide d'utilisation + scénarios",
        etapes: [
          "Lister tous les revenus prévus des 90 prochains jours",
          "Lister toutes les dépenses fixes mensuelles",
          "Estimer les dépenses variables par mois",
          "Calculer le solde net par semaine",
          "Identifier les semaines à risque (solde négatif)",
          "Préparer un plan B pour chaque semaine à risque",
          "Mettre à jour chaque lundi matin (10 min)"
        ],
        templates: [
          { nom: "Projection cash-flow 90 jours", format: "xlsx" },
          { nom: "Scénarios optimiste/réaliste/pessimiste", format: "xlsx" }
        ],
        outils: ["Google Sheets", "Excel"]
      }
    },
    {
      id: "fin-04", name: "Procédure de conciliation bancaire", icon: "🏦", fluxIdx: 2,
      quoi: "Mettre en place une checklist de conciliation bancaire mensuelle en 10 étapes — pour que tes livres matchent avec ta banque, chaque mois, sans surprise.",
      qui: "Le fondateur ou le teneur de livres",
      quand: "Dans les 48 prochaines heures",
      pourquoi: "Sans conciliation, tu ne sais pas si tes chiffres sont vrais. Des transactions manquées, des doublons, des frais bancaires oubliés — tout ça s'accumule. C'est comme conduire avec un compteur de vitesse cassé.",
      delai: "48h", difficulte: "facile", format: "template",
      comment: {
        resume: "Checklist de conciliation en 10 étapes + calendrier mensuel",
        etapes: [
          "Télécharger le relevé bancaire du mois",
          "Ouvrir le grand livre comptable",
          "Pointer chaque transaction banque vs livres",
          "Identifier les transactions non pointées",
          "Vérifier les chèques en circulation",
          "Vérifier les dépôts en transit",
          "Calculer le solde ajusté banque",
          "Calculer le solde ajusté livres",
          "Comparer les deux soldes (doivent être égaux)",
          "Documenter et archiver la conciliation"
        ],
        templates: [
          { nom: "Checklist conciliation bancaire", format: "pdf" },
          { nom: "Feuille de conciliation mensuelle", format: "xlsx" }
        ],
        outils: ["Google Sheets", "Wave", "QuickBooks"]
      }
    },
  ],

  // ===== FLUX 3 : RÉTENTION & SATISFACTION CLIENT (4 remèdes) =====
  [
    {
      id: "ret-01", name: "Séquence suivi post-vente", icon: "📬", fluxIdx: 3,
      quoi: "Automatiser un suivi systématique après chaque vente : email/appel à J+1, J+7 et J+30 — pour montrer à tes clients qu'ils comptent et détecter les problèmes tôt.",
      qui: "Le fondateur ou le responsable du service client",
      quand: "Dans les 7 prochains jours",
      pourquoi: "Un client qui se sent ignoré après l'achat ne revient pas — et il en parle. 68% des clients partent parce qu'ils sentent que l'entreprise ne se soucie pas d'eux. Un simple suivi post-vente peut réduire ton churn de 25%.",
      delai: "1 semaine", difficulte: "facile", format: "workflow",
      comment: {
        resume: "Séquence automatisée en 3 touchpoints + templates + déclencheurs",
        etapes: [
          "Définir le déclencheur (vente confirmée, livraison complétée)",
          "Écrire le message J+1 : remerciement + première impression",
          "Écrire le message J+7 : satisfaction + besoin d'aide?",
          "Écrire le message J+30 : feedback + offre complémentaire",
          "Configurer l'automatisation (CRM ou email)",
          "Définir les actions si réponse négative (escalade au fondateur)",
          "Analyser les retours après 1 mois"
        ],
        templates: [
          { nom: "3 templates suivi post-vente", format: "pdf" },
          { nom: "Sondage satisfaction client", format: "pdf" }
        ],
        outils: ["Mailchimp", "HubSpot CRM", "Google Forms"]
      }
    },
    {
      id: "ret-02", name: "Système de détection du churn", icon: "🚨", fluxIdx: 3,
      quoi: "Mettre en place une grille de signaux d'alerte (baisse de commandes, plainte, retard de paiement) avec des actions automatiques pour chaque signal — avant que le client parte.",
      qui: "Le fondateur ou le responsable client",
      quand: "Dans les 7 prochains jours",
      pourquoi: "Quand un client annonce qu'il part, c'est trop tard — la décision est prise depuis des semaines. Les signaux de départ existent toujours : il commande moins, il répond plus lentement, il paie en retard. Détecte-les tôt et tu peux encore agir.",
      delai: "1 semaine", difficulte: "moyen", format: "template",
      comment: {
        resume: "Grille de 8 signaux d'alerte + actions préventives + dashboard de suivi",
        etapes: [
          "Lister les 5 derniers clients perdus et identifier les signaux précurseurs",
          "Créer la grille de 8 signaux d'alerte universels",
          "Attribuer un score de risque à chaque signal (1 à 5)",
          "Définir le seuil de déclenchement (score total > X = intervention)",
          "Écrire le protocole d'intervention pour chaque niveau de risque",
          "Configurer les alertes automatiques dans ton CRM",
          "Former l'équipe au processus (15 min)",
          "Analyser les résultats après 60 jours"
        ],
        templates: [
          { nom: "Grille de signaux d'alerte churn", format: "xlsx" },
          { nom: "Protocole d'intervention client à risque", format: "pdf" }
        ],
        outils: ["HubSpot CRM", "Google Sheets", "Slack (alertes)"]
      }
    },
    {
      id: "ret-03", name: "Processus de gestion des plaintes", icon: "🛠️", fluxIdx: 3,
      quoi: "Créer une SOP pour gérer chaque plainte : réception, accusé, résolution en < 48h, suivi et amélioration continue.",
      qui: "Toute personne en contact avec les clients",
      quand: "Dans les 48 prochaines heures",
      pourquoi: "Une plainte bien gérée transforme un client mécontent en ambassadeur. Une plainte ignorée coûte 5x plus cher qu'une résolution rapide — en perte de client, en bouche-à-oreille négatif et en remboursements forcés.",
      delai: "48h", difficulte: "facile", format: "template",
      comment: {
        resume: "SOP plaintes en 5 étapes + formulaire de suivi + template de réponse",
        etapes: [
          "Créer le formulaire de réception de plainte (canal unique)",
          "Écrire le template d'accusé de réception (< 2h)",
          "Définir les niveaux de gravité (mineur, modéré, critique)",
          "Écrire le processus de résolution par niveau (qui, quand, comment)",
          "Créer le template de suivi post-résolution (J+3)",
          "Mettre en place le registre des plaintes (pour identifier les patterns)",
          "Réviser les causes racines chaque mois"
        ],
        templates: [
          { nom: "SOP gestion des plaintes", format: "pdf" },
          { nom: "Registre et suivi des plaintes", format: "xlsx" }
        ],
        outils: ["Google Forms", "Google Sheets", "Email"]
      }
    },
    {
      id: "ret-04", name: "Programme de vente additionnelle", icon: "🎁", fluxIdx: 3,
      quoi: "Identifier tes offres complémentaires, définir les déclencheurs de vente additionnelle (upsell/cross-sell), et créer les scripts pour les proposer naturellement.",
      qui: "Le fondateur ou le responsable des ventes",
      quand: "Dans les 14 prochains jours",
      pourquoi: "Vendre à un client existant coûte 5x moins cher que d'en acquérir un nouveau. Si tu ne proposes rien après la première vente, tu laisses 30-50% de revenus sur la table — avec des clients qui seraient prêts à acheter plus.",
      delai: "2 semaines", difficulte: "moyen", format: "workflow",
      comment: {
        resume: "Playbook upsell/cross-sell avec déclencheurs, scripts et séquences",
        etapes: [
          "Lister tous tes produits/services actuels et potentiels",
          "Créer la matrice de complémentarité (quoi va avec quoi)",
          "Définir les 5 déclencheurs naturels (timing, comportement, besoin)",
          "Écrire les scripts de proposition pour chaque combo",
          "Créer les offres groupées (bundles) avec tarification",
          "Former l'équipe aux techniques de proposition naturelle",
          "Configurer les rappels automatiques dans le CRM",
          "Mesurer le taux de conversion upsell après 30 jours"
        ],
        templates: [
          { nom: "Matrice de vente complémentaire", format: "xlsx" },
          { nom: "Scripts d'upsell par situation", format: "pdf" }
        ],
        outils: ["CRM", "Google Sheets", "Stripe (bundles)"]
      }
    },
  ],

  // ===== FLUX 4 : PILOTAGE & PRISE DE DÉCISION (4 remèdes) =====
  [
    {
      id: "pil-01", name: "Rapport mensuel automatisé", icon: "📑", fluxIdx: 4,
      quoi: "Consolider les 4 flux en un rapport mensuel unique : scores, KPIs, tendances et recommandations — pour piloter ton entreprise avec des chiffres, pas des impressions.",
      qui: "Le fondateur (avec l'aide de Bildop)",
      quand: "Dans les 14 prochains jours",
      pourquoi: "Sans rapport consolidé, tu regardes des morceaux d'information éparpillés — tu ne vois pas la photo complète. C'est comme conduire en ne regardant que le rétroviseur gauche. Le rapport mensuel te donne le tableau de bord complet.",
      delai: "2 semaines", difficulte: "avancé", format: "template",
      comment: {
        resume: "Template de rapport mensuel consolidé + processus de production automatisé",
        etapes: [
          "Définir les 12 KPIs clés (2-3 par flux)",
          "Créer le template de rapport avec sections standardisées",
          "Connecter les sources de données (comptabilité, CRM, marketing)",
          "Configurer les calculs et graphiques automatiques",
          "Ajouter la section « Actions recommandées » par flux",
          "Programmer la génération automatique le 5 de chaque mois",
          "Définir le processus de lecture et d'action (rencontre mensuelle)",
          "Itérer sur le contenu après 3 mois"
        ],
        templates: [
          { nom: "Rapport mensuel consolidé", format: "xlsx" },
          { nom: "Template de rencontre mensuelle", format: "pdf" }
        ],
        outils: ["Google Sheets", "Google Data Studio", "Zapier"]
      }
    },
    {
      id: "pil-02", name: "Dashboard en temps réel", icon: "📺", fluxIdx: 4,
      quoi: "Créer un tableau de bord visuel avec tes KPIs live, tendances et alertes — accessible en un clic, sans fouiller dans 5 outils différents.",
      qui: "Le fondateur ou le directeur des opérations",
      quand: "Dans les 21 prochains jours",
      pourquoi: "Tu perds des heures chaque mois à collecter des chiffres de 5 sources différentes. Pendant ce temps, tu ne pilotes pas — tu compiles. Un dashboard en temps réel te redonne ces heures pour prendre des décisions, pas faire de la saisie.",
      delai: "3 semaines", difficulte: "avancé", format: "workflow",
      comment: {
        resume: "Guide de création de dashboard + connexion des sources + alertes automatiques",
        etapes: [
          "Choisir l'outil de dashboard (Google Data Studio, Metabase, ou Bildop)",
          "Lister les KPIs à afficher par flux (max 15 total)",
          "Connecter la source comptabilité (API ou CSV mensuel)",
          "Connecter la source CRM/ventes",
          "Connecter la source marketing (Analytics, réseaux sociaux)",
          "Créer les visualisations par section (graphiques, jauges, tableaux)",
          "Configurer les alertes automatiques par seuil",
          "Former l'équipe à lire le dashboard (30 min)",
          "Réviser et ajuster après 30 jours"
        ],
        templates: [
          { nom: "Cahier des charges dashboard", format: "pdf" },
          { nom: "Maquette de dashboard type", format: "pdf" }
        ],
        outils: ["Google Data Studio", "Metabase", "Zapier"]
      }
    },
    {
      id: "pil-03", name: "Alertes proactives", icon: "🔔", fluxIdx: 4,
      quoi: "Configurer des notifications automatiques quand un KPI passe en zone rouge — AVANT la fin du mois, pour réagir pendant qu'il est encore temps.",
      qui: "Le fondateur ou le responsable des opérations",
      quand: "Dans les 7 prochains jours",
      pourquoi: "Découvrir un problème à la fin du mois, c'est découvrir un incendie quand la maison a déjà brûlé. Les alertes proactives te préviennent quand la fumée commence — tu as encore le temps d'éteindre avant les dégâts.",
      delai: "1 semaine", difficulte: "moyen", format: "workflow",
      comment: {
        resume: "Configuration d'alertes sur 8 KPIs critiques + processus de réponse",
        etapes: [
          "Identifier les 8 KPIs les plus critiques (2 par flux)",
          "Définir les seuils d'alerte pour chaque KPI (zone orange et rouge)",
          "Choisir les canaux de notification (email, SMS, Slack)",
          "Configurer les règles d'alerte dans ton outil (Zapier, CRM, Sheets)",
          "Écrire le protocole de réponse pour chaque type d'alerte",
          "Tester chaque alerte manuellement",
          "Former l'équipe au processus de réponse",
          "Ajuster les seuils après 30 jours (trop sensible? pas assez?)"
        ],
        templates: [
          { nom: "Matrice KPIs et seuils d'alerte", format: "xlsx" },
          { nom: "Protocole de réponse aux alertes", format: "pdf" }
        ],
        outils: ["Zapier", "Google Sheets", "Slack"]
      }
    },
    {
      id: "pil-04", name: "Session de revue mensuelle", icon: "🗓️", fluxIdx: 4,
      quoi: "Mettre en place un template de rencontre mensuelle structurée : quoi regarder, quoi décider, quoi documenter — pour que chaque mois compte.",
      qui: "Le fondateur (et les associés/gestionnaires s'il y en a)",
      quand: "Dans les 48 prochaines heures",
      pourquoi: "Sans revue structurée, les mois passent et rien ne change. Les mêmes problèmes reviennent. Les décisions sont repoussées. Une revue mensuelle de 90 minutes te force à confronter les chiffres, prendre des décisions et documenter les actions.",
      delai: "48h", difficulte: "facile", format: "template",
      comment: {
        resume: "Template de revue mensuelle + checklist de préparation + gabarit de compte-rendu",
        etapes: [
          "Bloquer une plage de 90 minutes le même jour chaque mois",
          "Préparer l'ordre du jour standard (15 min avant)",
          "Section 1 : Revue des KPIs vs objectifs (20 min)",
          "Section 2 : Analyse des écarts et causes racines (20 min)",
          "Section 3 : Décisions et actions correctives (20 min)",
          "Section 4 : Objectifs du mois prochain (15 min)",
          "Documenter les décisions et les responsables",
          "Envoyer le compte-rendu dans les 24h"
        ],
        templates: [
          { nom: "Template revue mensuelle", format: "docx" },
          { nom: "Checklist de préparation", format: "pdf" }
        ],
        outils: ["Google Docs", "Google Calendar", "Notion"]
      }
    },
  ],
];

// --- Zone helper (reused from diagnostic) ---
function getZone(score) {
  if (score >= 80) return { zone: 'VERT', color: '#27ae60', label: 'Sain', emoji: '🟢', bg: 'rgba(39,174,96,0.08)' };
  if (score >= 50) return { zone: 'ORANGE', color: '#f39c12', label: 'Fragile', emoji: '🟠', bg: 'rgba(243,156,18,0.08)' };
  return { zone: 'ROUGE', color: '#e74c3c', label: 'Critique', emoji: '🔴', bg: 'rgba(231,76,60,0.08)' };
}

// --- State ---
const isPaid = localStorage.getItem('bildop_paid') === 'true';
const diagnosticRaw = localStorage.getItem('bildop_diagnostic');
const diagnosticData = diagnosticRaw ? JSON.parse(diagnosticRaw) : null;
const hasDiagnostic = diagnosticData && (Date.now() - diagnosticData.timestamp < 7 * 24 * 60 * 60 * 1000);

let activeFluxFilter = 'all';

// --- DOM ---
const heroEl = document.getElementById('remedesHero');
const prescribedEl = document.getElementById('remedesPrescribed');
const separatorEl = document.getElementById('remedesSeparator');
const catalogEl = document.getElementById('remedesCatalog');
const unlockEl = document.getElementById('remedesUnlock');

// --- Init ---
function init() {
  renderHero();
  if (hasDiagnostic) renderPrescribed();
  renderCatalog();
  renderUnlockCTA();
}

// --- Hero ---
function renderHero() {
  if (hasDiagnostic) {
    const globalScore = diagnosticData.globalScore;
    const zone = getZone(globalScore);
    const redCount = diagnosticData.fluxScores.filter(s => s < 50).length;
    const orangeCount = diagnosticData.fluxScores.filter(s => s >= 50 && s < 80).length;
    const totalRemedies = diagnosticData.fluxScores.filter(s => s < 80).length * 4;

    heroEl.innerHTML = `
      <div class="remedes-hero remedes-hero--prescribed">
        <div class="remedes-hero__score" style="border-color: ${zone.color}">
          <span style="color: ${zone.color}">${globalScore}</span>/100
        </div>
        <div>
          <h1>Tes remèdes prescrits</h1>
          <p>Basé sur ton diagnostic, on a identifié <strong>${totalRemedies} remèdes</strong> pour améliorer la santé de ton entreprise.</p>
          <div class="remedes-hero__chips">
            ${redCount > 0 ? `<span class="diag-zone-chip diag-zone-chip--red">🔴 ${redCount} flux critique${redCount > 1 ? 's' : ''}</span>` : ''}
            ${orangeCount > 0 ? `<span class="diag-zone-chip diag-zone-chip--orange">🟠 ${orangeCount} flux fragile${orangeCount > 1 ? 's' : ''}</span>` : ''}
          </div>
        </div>
      </div>
    `;
  } else {
    heroEl.innerHTML = `
      <div class="remedes-hero remedes-hero--catalog">
        <div class="remedes-hero__icon">💊</div>
        <h1>Remèdes Bildop</h1>
        <p>20 solutions concrètes pour les 5 flux métiers de ton entreprise. Chaque remède te donne <strong>le plan de match, le responsable, le délai et l'impact</strong> — gratuitement.</p>
        <a href="diagnostic.html" class="btn btn--secondary" style="margin-top: 16px;">Fais ton diagnostic pour des remèdes personnalisés →</a>
      </div>
    `;
  }
}

// --- Prescribed Remedies ---
function renderPrescribed() {
  const prescribed = [];
  diagnosticData.fluxScores.forEach((score, fluxIdx) => {
    if (score < 80) {
      remedesData[fluxIdx].forEach(r => {
        prescribed.push({ ...r, fluxScore: score });
      });
    }
  });
  prescribed.sort((a, b) => a.fluxScore - b.fluxScore);

  if (prescribed.length === 0) {
    prescribedEl.innerHTML = `
      <div class="remedes-section">
        <div style="text-align:center; padding: 40px; background: rgba(39,174,96,0.06); border-radius: 16px;">
          <p style="font-size: 1.1rem; color: #27ae60; font-weight: 600;">🎉 Tous tes flux sont en zone verte! Explore le catalogue pour optimiser davantage.</p>
        </div>
      </div>
    `;
    return;
  }

  prescribedEl.innerHTML = `
    <div class="remedes-section">
      <h2 class="remedes-section__title">🩺 Prescrits pour toi</h2>
      <p class="remedes-section__subtitle">Ces remèdes sont classés par urgence — les flux les plus critiques en premier.</p>
      <div class="remedes-list">
        ${prescribed.map(r => renderRemedyCard(r, r.fluxScore)).join('')}
      </div>
    </div>
  `;

  separatorEl.innerHTML = `
    <div class="remedes-separator">
      <span>Explore tous les remèdes ↓</span>
    </div>
  `;
}

// --- Catalog ---
function renderCatalog() {
  catalogEl.innerHTML = `
    <div class="remedes-section">
      <h2 class="remedes-section__title">📚 Catalogue complet</h2>
      <p class="remedes-section__subtitle">20 remèdes répartis sur les 5 flux métiers de ton entreprise.</p>

      <div class="remedes-tabs" id="remedesTabs">
        <button class="remedes-tab active" data-flux="all">Tous (20)</button>
        ${flux.map((f, i) => {
          const scoreChip = hasDiagnostic
            ? ` <span class="remedes-tab__score" style="color:${getZone(diagnosticData.fluxScores[i]).color}">${diagnosticData.fluxScores[i]}</span>`
            : '';
          return `<button class="remedes-tab" data-flux="${i}">${f.icon} ${f.name}${scoreChip}</button>`;
        }).join('')}
      </div>

      <div class="remedes-list" id="remedesList">
        ${renderFilteredRemedies('all')}
      </div>
    </div>
  `;

  // Bind tab clicks
  document.querySelectorAll('.remedes-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.remedes-tab').forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      const filter = tab.dataset.flux;
      document.getElementById('remedesList').innerHTML = renderFilteredRemedies(filter);
    });
  });
}

function renderFilteredRemedies(filter) {
  if (filter === 'all') {
    return remedesData.flatMap((fluxRemedies, fluxIdx) => {
      const score = hasDiagnostic ? diagnosticData.fluxScores[fluxIdx] : null;
      return fluxRemedies.map(r => renderRemedyCard(r, score));
    }).join('');
  }
  const fluxIdx = parseInt(filter);
  const score = hasDiagnostic ? diagnosticData.fluxScores[fluxIdx] : null;
  return remedesData[fluxIdx].map(r => renderRemedyCard(r, score)).join('');
}

// --- Remedy Card ---
function renderRemedyCard(remedy, fluxScore) {
  const f = flux[remedy.fluxIdx];
  const zone = fluxScore !== null ? getZone(fluxScore) : null;

  const diffBadge = {
    facile: { label: 'Facile', cls: 'facile' },
    moyen: { label: 'Moyen', cls: 'moyen' },
    'avancé': { label: 'Avancé', cls: 'avance' },
    avance: { label: 'Avancé', cls: 'avance' },
  }[remedy.difficulte] || { label: remedy.difficulte, cls: '' };

  const formatLabel = remedy.format === 'template' ? '📥 Template' : '🔄 Workflow interactif';

  return `
    <div class="remede-card" style="border-left-color: ${zone ? zone.color : 'var(--sky)'}">
      <!-- Header -->
      <div class="remede-card__header">
        <div class="remede-card__badges">
          <span class="remede-card__flux-badge">${f.icon} ${f.name}</span>
          ${zone ? `<span class="remede-card__zone-badge" style="background:${zone.bg}; color:${zone.color}">${zone.emoji} ${zone.zone}</span>` : ''}
        </div>
        <div class="remede-card__tags">
          <span class="remede-card__diff remede-card__diff--${diffBadge.cls}">${diffBadge.label}</span>
          <span class="remede-card__format">${formatLabel}</span>
        </div>
      </div>

      <!-- Title -->
      <h3>${remedy.icon} ${remedy.name}</h3>

      <!-- Le remède -->
      <div class="remede-card__field">
        <div class="remede-card__label">💡 Le remède</div>
        <p>${remedy.quoi}</p>
      </div>

      <!-- Responsable + Délai -->
      <div class="remede-card__meta">
        <div class="remede-card__meta-item">
          <span class="remede-card__meta-icon">👤</span>
          <div><strong>Responsable</strong><br>${remedy.qui}</div>
        </div>
        <div class="remede-card__meta-item">
          <span class="remede-card__meta-icon">⏱</span>
          <div><strong>Passe à l'action</strong><br>${remedy.quand}</div>
        </div>
      </div>

      <!-- Ce que ça te coûte de ne rien faire -->
      <div class="remede-card__field remede-card__field--pourquoi" style="border-left-color: ${zone ? zone.color : '#f39c12'}">
        <div class="remede-card__label">🚨 Ce que ça te coûte de ne rien faire</div>
        <p>${remedy.pourquoi}</p>
      </div>

      <!-- Plan d'action — LOCKED -->
      <div class="remede-card__comment ${isPaid ? 'remede-card__comment--unlocked' : 'remede-card__comment--locked'}">
        <div class="remede-card__label">🗂 Le plan d'action complet</div>
        <div class="remede-card__comment-content">
          <p class="remede-card__comment-resume"><strong>${remedy.comment.resume}</strong></p>
          <ol class="remede-card__etapes">
            ${remedy.comment.etapes.map(e => `<li>${e}</li>`).join('')}
          </ol>
          ${remedy.comment.templates ? `
            <div class="remede-card__templates">
              <strong>📎 Templates inclus :</strong>
              ${remedy.comment.templates.map(t => `<span class="remede-card__template-chip">${t.nom} (.${t.format})</span>`).join('')}
            </div>
          ` : ''}
          ${remedy.comment.outils ? `
            <div class="remede-card__outils">
              <strong>🛠 Outils recommandés :</strong> ${remedy.comment.outils.join(', ')}
            </div>
          ` : ''}
        </div>
        ${!isPaid ? `
          <div class="remede-card__comment-overlay">
            <span class="lock-icon">🔒</span>
            <p><strong>Tu veux le plan d'action complet?</strong></p>
            <p class="remede-card__overlay-sub">SOPs prêtes, templates téléchargeables, étape par étape</p>
            <button class="btn btn--primary" onclick="handleUnlockCTA()">Débloquer tout — 99$ →</button>
          </div>
        ` : ''}
      </div>
    </div>
  `;
}

// --- Unlock CTA ---
function renderUnlockCTA() {
  if (isPaid) {
    unlockEl.innerHTML = '';
    return;
  }

  unlockEl.innerHTML = `
    <div class="remedes-unlock">
      <h2>Tu sais ce qui fait mal. On a le plan d'action.</h2>
      <p>Le rapport complet débloque les SOPs, templates et workflows pour chacun des 20 remèdes. Tout ce qu'il faut pour passer à l'action — sans chercher, sans improviser.</p>
      <div class="remedes-unlock__includes">
        <div class="remedes-unlock__item">📝 SOPs complètes étape par étape</div>
        <div class="remedes-unlock__item">📥 Templates téléchargeables (PDF, XLSX, DOCX)</div>
        <div class="remedes-unlock__item">🔄 Workflows interactifs guidés</div>
        <div class="remedes-unlock__item">🛠 Outils recommandés par remède</div>
      </div>
      <button class="btn btn--white btn--large" onclick="handleUnlockCTA()">Débloquer le rapport complet — 99$ →</button>
      <p style="margin-top: 12px; font-size: 0.85rem; opacity: 0.7;">Paiement unique. Accès permanent. Satisfait ou remboursé.</p>
    </div>
  `;
}

// --- Unlock Handler (placeholder) ---
function handleUnlockCTA() {
  console.log('Redirection vers le paiement — 99$ rapport complet');
  // TODO: Intégrer Stripe / WooCommerce
  alert('🚧 Le système de paiement sera connecté prochainement.\n\nLe rapport complet (99$) débloquera toutes les SOPs, templates et workflows.');
}

// --- Start ---
init();
