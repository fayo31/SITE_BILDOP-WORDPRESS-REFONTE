// =====================================================
// IDEASCORE PRO — Score de viabilité d'idées d'affaires
// Bildop — Groupe REMES
// 42 catégories · Classification AI · Scoring 8 facteurs
// =====================================================

const MONTH_LABELS = ['Jan','Fév','Mar','Avr','Mai','Juin','Juil','Août','Sep','Oct','Nov','Déc'];

// --- 42 CATÉGORIES AVEC BENCHMARKS ---
const CATEGORIES = [
  // ═══ ALIMENTATION ═══
  {
    id: 'food_bakery', name: 'Boulangerie / Pâtisserie', icon: '🥐', group: 'Alimentation & Boissons',
    keywords: ['boulangerie','patisserie','pain','gateau','cupcake','croissant','viennoiserie','bakery','bread','pastry','boulanger','patissier','dessert','confiserie'],
    cogs: 0.30, grossMargin: 0.70, netMargin: 0.08, cac: 25, medianInvestment: 100000, breakEvenMonths: 12,
    avgTicket: 18, ltv: 520, growth: [0.15, 0.12, 0.10, 0.08, 0.06],
    seasonality: [0.85, 0.80, 0.90, 0.95, 1.05, 1.10, 0.90, 0.85, 1.00, 1.10, 1.15, 1.35],
    marketSize: 'medium', barriers: 'low', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'As-tu une formation en pâtisserie ou boulangerie?', options:[
        {text:'Oui, formation professionnelle + expérience',score:10},
        {text:'Quelques cours ou autodidacte',score:6},
        {text:'Non, mais je suis passionné',score:3}
      ]},
      { id:'sq2', question:'Quel format de vente?', options:[
        {text:'Boutique avec pignon sur rue',score:7},
        {text:'En ligne + livraison locale',score:8},
        {text:'Marchés publics / pop-up',score:5}
      ]}
    ]
  },
  {
    id: 'restaurant_quick_service', name: 'Restauration rapide', icon: '🍔', group: 'Alimentation & Boissons',
    keywords: ['restauration rapide','fast food','cantine','comptoir','food truck','take-out','emporter','snack','quick service','resto rapide','poutine','sandwich','burger'],
    cogs: 0.33, grossMargin: 0.67, netMargin: 0.06, cac: 27, medianInvestment: 150000, breakEvenMonths: 24,
    avgTicket: 14, ltv: 380, growth: [0.18, 0.15, 0.12, 0.10, 0.08],
    seasonality: [0.85, 0.80, 0.90, 0.95, 1.05, 1.15, 1.15, 1.10, 1.00, 1.00, 0.95, 1.10],
    marketSize: 'large', barriers: 'medium', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel type de restauration rapide?', options:[
        {text:'Food truck / comptoir mobile',score:8},
        {text:'Petit local avec comptoir',score:7},
        {text:'Franchise existante',score:6}
      ]},
      { id:'sq2', question:'As-tu de l\'expérience en restauration?', options:[
        {text:'Oui, plus de 2 ans',score:9},
        {text:'Un peu',score:5},
        {text:'Pas du tout',score:2}
      ]}
    ]
  },
  {
    id: 'restaurant_full_service', name: 'Restaurant service complet', icon: '🍽️', group: 'Alimentation & Boissons',
    keywords: ['restaurant','bistro','brasserie','table','gastronomie','chef','cuisine','traiteur','salle a manger','fine dining','brunch'],
    cogs: 0.40, grossMargin: 0.60, netMargin: 0.05, cac: 100, medianInvestment: 275000, breakEvenMonths: 30,
    avgTicket: 45, ltv: 900, growth: [0.12, 0.10, 0.08, 0.06, 0.05],
    seasonality: [0.85, 0.80, 0.90, 0.95, 1.05, 1.15, 1.20, 1.15, 1.05, 1.00, 0.95, 0.95],
    marketSize: 'large', barriers: 'medium', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type de cuisine?', options:[
        {text:'Fine dining / gastronomique',score:5},
        {text:'Bistro / brasserie décontractée',score:8},
        {text:'Traiteur / événementiel',score:7}
      ]},
      { id:'sq2', question:'Combien de places assises?', options:[
        {text:'Moins de 30',score:7},
        {text:'30 à 60',score:6},
        {text:'Plus de 60',score:4}
      ]}
    ]
  },

  // ═══ SERVICES PROFESSIONNELS & BIEN-ÊTRE ═══
  {
    id: 'consulting', name: 'Consultation / Conseil', icon: '💼', group: 'Services professionnels',
    keywords: ['consultation','consultant','conseil','strategie','advisory','expert','accompagnement','management','gestion','affaires','business consultant','conseiller'],
    cogs: 0.10, grossMargin: 0.90, netMargin: 0.25, cac: 400, medianInvestment: 5000, breakEvenMonths: 3,
    avgTicket: 2000, ltv: 15000, growth: [0.30, 0.25, 0.20, 0.15, 0.10],
    seasonality: [0.90, 0.85, 1.00, 1.05, 1.05, 1.00, 0.80, 0.75, 1.10, 1.15, 1.15, 1.20],
    marketSize: 'large', barriers: 'low', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Dans quel domaine de consultation?', options:[
        {text:'Management / stratégie',score:8},
        {text:'Marketing / ventes',score:8},
        {text:'Technologie / IT',score:9}
      ]},
      { id:'sq2', question:'Cible B2B ou B2C?', options:[
        {text:'B2B (entreprises)',score:9},
        {text:'B2C (individus)',score:6},
        {text:'Les deux',score:7}
      ]}
    ]
  },
  {
    id: 'coaching', name: 'Coaching', icon: '🎯', group: 'Services professionnels',
    keywords: ['coaching','coach','mentorat','mentor','vie','carriere','leadership','developpement personnel','life coach','executive coach','transformation'],
    cogs: 0.07, grossMargin: 0.93, netMargin: 0.50, cac: 250, medianInvestment: 3000, breakEvenMonths: 4,
    avgTicket: 500, ltv: 5000, growth: [0.25, 0.20, 0.18, 0.15, 0.12],
    seasonality: [1.10, 1.05, 1.05, 1.00, 0.95, 0.85, 0.75, 0.75, 1.10, 1.10, 1.10, 1.20],
    marketSize: 'medium', barriers: 'low', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel type de coaching?', options:[
        {text:'Coaching de vie / personnel',score:7},
        {text:'Coaching d\'affaires / exécutif',score:9},
        {text:'Coaching sportif / performance',score:6}
      ]},
      { id:'sq2', question:'As-tu une certification?', options:[
        {text:'Oui, certifié ICF ou équivalent',score:10},
        {text:'En cours de certification',score:7},
        {text:'Pas encore',score:4}
      ]}
    ]
  },
  {
    id: 'beauty_salon', name: 'Salon de beauté', icon: '💇', group: 'Beauté & Bien-être',
    keywords: ['salon','beaute','coiffure','coiffeur','coiffeuse','esthetique','ongles','manucure','barbier','barber','cheveux','coloration','extensions'],
    cogs: 0.18, grossMargin: 0.82, netMargin: 0.10, cac: 30, medianInvestment: 75000, breakEvenMonths: 15,
    avgTicket: 65, ltv: 1800, growth: [0.12, 0.10, 0.08, 0.06, 0.05],
    seasonality: [0.90, 0.85, 0.95, 1.00, 1.10, 1.15, 1.10, 1.00, 1.05, 1.00, 1.05, 0.85],
    marketSize: 'large', barriers: 'low', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type de services?', options:[
        {text:'Coiffure seulement',score:6},
        {text:'Coiffure + esthétique',score:8},
        {text:'Barbier spécialisé',score:7}
      ]},
      { id:'sq2', question:'Location du salon?', options:[
        {text:'Local commercial dédié',score:7},
        {text:'À domicile / mobile',score:8},
        {text:'Location de chaise dans un salon existant',score:9}
      ]}
    ]
  },
  {
    id: 'massage_spa', name: 'Massage / Spa', icon: '💆', group: 'Beauté & Bien-être',
    keywords: ['massage','spa','massotherapie','massotherapeute','detente','relaxation','bien-etre','wellness','thermal','sauna','soins corporels'],
    cogs: 0.15, grossMargin: 0.85, netMargin: 0.15, cac: 40, medianInvestment: 75000, breakEvenMonths: 15,
    avgTicket: 85, ltv: 2400, growth: [0.15, 0.12, 0.10, 0.08, 0.06],
    seasonality: [1.10, 1.00, 1.00, 0.95, 0.90, 0.85, 0.80, 0.85, 1.00, 1.10, 1.15, 1.30],
    marketSize: 'medium', barriers: 'medium', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Es-tu un massothérapeute certifié?', options:[
        {text:'Oui, membre d\'un ordre professionnel',score:10},
        {text:'En formation',score:6},
        {text:'Non, j\'embaucherai des thérapeutes',score:5}
      ]},
      { id:'sq2', question:'Quel modèle?', options:[
        {text:'Spa / centre de bien-être complet',score:6},
        {text:'Clinique de massage ciblée',score:8},
        {text:'Service mobile / à domicile',score:9}
      ]}
    ]
  },
  {
    id: 'personal_training', name: 'Entraînement personnel', icon: '💪', group: 'Beauté & Bien-être',
    keywords: ['entrainement','entraineur','personal trainer','fitness','musculation','remise en forme','preparation physique','kinesiologie','kinesiologue'],
    cogs: 0.22, grossMargin: 0.78, netMargin: 0.30, cac: 80, medianInvestment: 10000, breakEvenMonths: 3,
    avgTicket: 75, ltv: 3600, growth: [0.20, 0.18, 0.15, 0.12, 0.10],
    seasonality: [1.30, 1.20, 1.10, 1.00, 0.90, 0.85, 0.80, 0.80, 1.00, 1.05, 1.00, 1.00],
    marketSize: 'medium', barriers: 'low', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Format principal?', options:[
        {text:'Entraînement privé 1-on-1',score:7},
        {text:'Cours de groupe / bootcamp',score:8},
        {text:'En ligne / app',score:9}
      ]},
      { id:'sq2', question:'As-tu une certification reconnue?', options:[
        {text:'Oui (CANFITPRO, NSCA, etc.)',score:10},
        {text:'En cours',score:6},
        {text:'Expérience seulement',score:3}
      ]}
    ]
  },

  // ═══ SANTÉ & ÉDUCATION ═══
  {
    id: 'health_wellness_clinic', name: 'Clinique santé / Bien-être', icon: '🏥', group: 'Santé & Éducation',
    keywords: ['clinique','sante','clinic','medical','naturopathe','naturopathie','acupuncture','osteopathe','osteopathie','physiotherapie','paramédical'],
    cogs: 0.25, grossMargin: 0.75, netMargin: 0.12, cac: 100, medianInvestment: 220000, breakEvenMonths: 27,
    avgTicket: 120, ltv: 4800, growth: [0.10, 0.10, 0.08, 0.06, 0.05],
    seasonality: [1.05, 1.00, 1.00, 1.00, 0.95, 0.90, 0.85, 0.85, 1.05, 1.10, 1.10, 1.15],
    marketSize: 'large', barriers: 'high', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type de clinique?', options:[
        {text:'Multidisciplinaire (plusieurs praticiens)',score:7},
        {text:'Solo (un seul praticien)',score:8},
        {text:'Télémédicine / en ligne',score:9}
      ]},
      { id:'sq2', question:'As-tu les licences requises?', options:[
        {text:'Oui, tout est en règle',score:10},
        {text:'En cours d\'obtention',score:5},
        {text:'Pas encore commencé',score:2}
      ]}
    ]
  },
  {
    id: 'chiropractic', name: 'Chiropratique', icon: '🦴', group: 'Santé & Éducation',
    keywords: ['chiropratique','chiropraticien','chiro','colonne','ajustement','spinal','vertebral'],
    cogs: 0.20, grossMargin: 0.80, netMargin: 0.15, cac: 120, medianInvestment: 250000, breakEvenMonths: 30,
    avgTicket: 75, ltv: 3600, growth: [0.08, 0.08, 0.06, 0.05, 0.04],
    seasonality: [1.05, 1.00, 1.00, 1.00, 0.95, 0.90, 0.85, 0.85, 1.05, 1.10, 1.10, 1.15],
    marketSize: 'medium', barriers: 'high', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'As-tu ton doctorat en chiropratique?', options:[
        {text:'Oui, membre de l\'Ordre',score:10},
        {text:'En résidence / stage',score:5},
        {text:'Je cherche un associé chiropraticien',score:3}
      ]}
    ]
  },
  {
    id: 'tutoring_center', name: 'Centre de tutorat / Soutien scolaire', icon: '📚', group: 'Santé & Éducation',
    keywords: ['tutorat','tuteur','soutien scolaire','aide aux devoirs','cours particulier','tutoring','education','academique','etude'],
    cogs: 0.45, grossMargin: 0.55, netMargin: 0.10, cac: 50, medianInvestment: 50000, breakEvenMonths: 18,
    avgTicket: 50, ltv: 1200, growth: [0.15, 0.12, 0.10, 0.08, 0.06],
    seasonality: [1.20, 1.20, 1.15, 1.10, 1.05, 0.55, 0.45, 0.55, 1.20, 1.30, 1.20, 1.05],
    marketSize: 'medium', barriers: 'low', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Format d\'enseignement?', options:[
        {text:'Centre physique avec local',score:6},
        {text:'En ligne seulement',score:9},
        {text:'Hybride (les deux)',score:8}
      ]},
      { id:'sq2', question:'Quelle clientèle cible?', options:[
        {text:'Primaire',score:7},
        {text:'Secondaire / cégep',score:8},
        {text:'Adultes / professionnel',score:6}
      ]}
    ]
  },
  {
    id: 'swimming_lessons', name: 'Cours de natation', icon: '🏊', group: 'Santé & Éducation',
    keywords: ['natation','piscine','cours de natation','swimming','aquatique','nager','swim','aqua','sauveteur','maitre nageur'],
    cogs: 0.28, grossMargin: 0.72, netMargin: 0.20, cac: 35, medianInvestment: 8000, breakEvenMonths: 3,
    avgTicket: 40, ltv: 960, growth: [0.20, 0.15, 0.12, 0.10, 0.08],
    seasonality: [0.60, 0.60, 0.70, 0.90, 1.20, 1.50, 1.60, 1.50, 1.00, 0.80, 0.60, 1.00],
    marketSize: 'medium', barriers: 'medium', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Accès à une piscine?', options:[
        {text:'Piscine privée / propre',score:8},
        {text:'Location d\'un bassin',score:7},
        {text:'Piscine municipale',score:6}
      ]},
      { id:'sq2', question:'Clientèle visée?', options:[
        {text:'Enfants 3-12 ans',score:8},
        {text:'Adultes',score:6},
        {text:'Tous âges',score:7}
      ]}
    ]
  },

  // ═══ COMMERCE ═══
  {
    id: 'ecommerce_general', name: 'E-commerce général', icon: '🛒', group: 'Commerce',
    keywords: ['ecommerce','e-commerce','boutique en ligne','shop','shopify','woocommerce','vente en ligne','magasin en ligne','commerce electronique','dropship'],
    cogs: 0.40, grossMargin: 0.60, netMargin: 0.10, cac: 75, medianInvestment: 29000, breakEvenMonths: 12,
    avgTicket: 55, ltv: 220, growth: [0.35, 0.25, 0.20, 0.15, 0.10],
    seasonality: [0.80, 0.75, 0.85, 0.90, 1.00, 1.00, 0.90, 0.90, 1.00, 1.05, 1.25, 1.60],
    marketSize: 'large', barriers: 'low', scalability: 'high',
    specificQuestions: [
      { id:'sq1', question:'Quel type de produits?', options:[
        {text:'Produits physiques que je fabrique',score:7},
        {text:'Revente / curated products',score:6},
        {text:'Print-on-demand / personnalisés',score:8}
      ]},
      { id:'sq2', question:'Plateforme prévue?', options:[
        {text:'Shopify',score:8},
        {text:'WooCommerce / WordPress',score:7},
        {text:'Marketplace (Amazon, Etsy)',score:6}
      ]}
    ]
  },
  {
    id: 'ecommerce_dropshipping', name: 'Dropshipping', icon: '📤', group: 'Commerce',
    keywords: ['dropshipping','drop shipping','drop ship','aliexpress','oberlo','sans inventaire','fulfillment'],
    cogs: 0.70, grossMargin: 0.30, netMargin: 0.08, cac: 50, medianInvestment: 3000, breakEvenMonths: 6,
    avgTicket: 35, ltv: 70, growth: [0.40, 0.20, 0.10, 0.05, 0.03],
    seasonality: [0.80, 0.75, 0.85, 0.90, 1.00, 1.00, 0.95, 0.95, 1.00, 1.05, 1.25, 1.50],
    marketSize: 'large', barriers: 'low', scalability: 'high',
    specificQuestions: [
      { id:'sq1', question:'As-tu déjà identifié des fournisseurs?', options:[
        {text:'Oui, testés et fiables',score:9},
        {text:'Quelques options en vue',score:6},
        {text:'Pas encore',score:3}
      ]}
    ]
  },
  {
    id: 'retail_physical', name: 'Commerce physique', icon: '🏪', group: 'Commerce',
    keywords: ['magasin','boutique','commerce','retail','detaillant','point de vente','brick and mortar','shop','comptoir','vitrine'],
    cogs: 0.58, grossMargin: 0.42, netMargin: 0.05, cac: 40, medianInvestment: 100000, breakEvenMonths: 18,
    avgTicket: 45, ltv: 540, growth: [0.12, 0.10, 0.08, 0.06, 0.05],
    seasonality: [0.85, 0.80, 0.90, 0.95, 1.00, 1.00, 0.95, 0.90, 1.00, 1.05, 1.15, 1.45],
    marketSize: 'large', barriers: 'medium', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type de produits?', options:[
        {text:'Mode / vêtements',score:6},
        {text:'Alimentation spécialisée',score:7},
        {text:'Cadeaux / décoration / niche',score:8}
      ]},
      { id:'sq2', question:'As-tu déjà un local en vue?', options:[
        {text:'Oui, bail signé ou en cours',score:8},
        {text:'Je cherche activement',score:6},
        {text:'Pas encore',score:4}
      ]}
    ]
  },

  // ═══ TECHNOLOGIE & NUMÉRIQUE ═══
  {
    id: 'saas', name: 'SaaS / Logiciel', icon: '💻', group: 'Tech & Numérique',
    keywords: ['saas','logiciel','software','application','app','plateforme','platform','abonnement','subscription','cloud','api','startup tech','intelligence artificielle','ia','ai'],
    cogs: 0.18, grossMargin: 0.82, netMargin: 0.15, cac: 400, medianInvestment: 100000, breakEvenMonths: 24,
    avgTicket: 50, ltv: 1800, growth: [0.50, 0.35, 0.25, 0.20, 0.15],
    seasonality: [0.95, 0.95, 1.00, 1.00, 1.00, 1.00, 0.95, 0.95, 1.05, 1.05, 1.05, 1.05],
    marketSize: 'large', barriers: 'medium', scalability: 'high',
    specificQuestions: [
      { id:'sq1', question:'As-tu un MVP ou prototype?', options:[
        {text:'Oui, déjà fonctionnel',score:10},
        {text:'En développement',score:7},
        {text:'Juste l\'idée pour l\'instant',score:3}
      ]},
      { id:'sq2', question:'Modèle de revenus?', options:[
        {text:'Abonnement mensuel/annuel',score:9},
        {text:'Freemium + premium',score:8},
        {text:'Pay-per-use / transactionnel',score:7}
      ]}
    ]
  },
  {
    id: 'digital_products', name: 'Produits numériques', icon: '📱', group: 'Tech & Numérique',
    keywords: ['produit numerique','digital','ebook','template','preset','plugin','theme','wordpress theme','canva','notion template','printable','digital product','telechargeable'],
    cogs: 0.08, grossMargin: 0.92, netMargin: 0.60, cac: 40, medianInvestment: 5000, breakEvenMonths: 3,
    avgTicket: 30, ltv: 90, growth: [0.40, 0.30, 0.20, 0.15, 0.10],
    seasonality: [1.10, 1.00, 1.00, 0.95, 0.95, 0.85, 0.80, 0.80, 1.05, 1.10, 1.15, 1.25],
    marketSize: 'large', barriers: 'low', scalability: 'high',
    specificQuestions: [
      { id:'sq1', question:'Quel type de produit digital?', options:[
        {text:'Templates / presets / outils',score:8},
        {text:'eBooks / guides PDF',score:7},
        {text:'Logiciel / plugin / app',score:9}
      ]}
    ]
  },
  {
    id: 'online_courses', name: 'Cours en ligne / Formation', icon: '🎓', group: 'Tech & Numérique',
    keywords: ['cours en ligne','formation en ligne','online course','e-learning','elearning','masterclass','webinaire','webinar','tutoriel','formation','teachable','udemy','kajabi'],
    cogs: 0.10, grossMargin: 0.90, netMargin: 0.55, cac: 80, medianInvestment: 5000, breakEvenMonths: 4,
    avgTicket: 200, ltv: 600, growth: [0.30, 0.25, 0.20, 0.15, 0.10],
    seasonality: [1.15, 1.10, 1.05, 1.00, 0.90, 0.80, 0.70, 0.70, 1.15, 1.15, 1.10, 1.20],
    marketSize: 'large', barriers: 'low', scalability: 'high',
    specificQuestions: [
      { id:'sq1', question:'Dans quel domaine?', options:[
        {text:'Business / marketing / finance',score:8},
        {text:'Technologie / programmation',score:9},
        {text:'Créatif / art / musique',score:6}
      ]},
      { id:'sq2', question:'As-tu déjà du contenu?', options:[
        {text:'Oui, prêt à publier',score:10},
        {text:'En partie, besoin de le structurer',score:7},
        {text:'Non, à créer de zéro',score:4}
      ]}
    ]
  },

  // ═══ CRÉATION & CONSTRUCTION ═══
  {
    id: 'photography', name: 'Photographie', icon: '📷', group: 'Création & Médias',
    keywords: ['photographie','photographe','photo','studio photo','mariage','portrait','evenementiel','shooting','videographe','videographie'],
    cogs: 0.22, grossMargin: 0.78, netMargin: 0.25, cac: 60, medianInvestment: 15000, breakEvenMonths: 6,
    avgTicket: 350, ltv: 1400, growth: [0.20, 0.15, 0.12, 0.10, 0.08],
    seasonality: [0.70, 0.70, 0.80, 0.90, 1.20, 1.40, 1.40, 1.30, 1.10, 0.90, 0.80, 0.80],
    marketSize: 'medium', barriers: 'low', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Spécialité principale?', options:[
        {text:'Mariages / événements',score:7},
        {text:'Corporate / commercial',score:9},
        {text:'Portrait / famille',score:6}
      ]}
    ]
  },
  {
    id: 'graphic_design_freelance', name: 'Design graphique (freelance)', icon: '🎨', group: 'Création & Médias',
    keywords: ['design graphique','graphiste','designer','logo','branding','identite visuelle','freelance design','illustrateur','illustration','ui','ux','web design'],
    cogs: 0.12, grossMargin: 0.88, netMargin: 0.40, cac: 50, medianInvestment: 5000, breakEvenMonths: 3,
    avgTicket: 800, ltv: 4800, growth: [0.25, 0.20, 0.15, 0.12, 0.10],
    seasonality: [1.05, 1.00, 1.05, 1.05, 1.00, 0.90, 0.80, 0.80, 1.05, 1.10, 1.10, 1.10],
    marketSize: 'large', barriers: 'low', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel type de design?', options:[
        {text:'Branding / identité visuelle',score:9},
        {text:'Web / UI/UX',score:9},
        {text:'Print / marketing',score:7}
      ]}
    ]
  },
  {
    id: 'design_agency', name: 'Agence de design / créative', icon: '🏢', group: 'Création & Médias',
    keywords: ['agence','agence creative','agence design','agence marketing','agence web','agence pub','publicite','branding agency','creative agency','digital agency'],
    cogs: 0.38, grossMargin: 0.62, netMargin: 0.12, cac: 500, medianInvestment: 50000, breakEvenMonths: 18,
    avgTicket: 5000, ltv: 30000, growth: [0.20, 0.18, 0.15, 0.12, 0.10],
    seasonality: [0.95, 0.90, 1.00, 1.05, 1.05, 1.00, 0.80, 0.80, 1.10, 1.10, 1.10, 1.15],
    marketSize: 'medium', barriers: 'medium', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Combien de personnes dans l\'équipe?', options:[
        {text:'Solo (freelance qui scale)',score:8},
        {text:'2-5 personnes',score:7},
        {text:'Plus de 5',score:5}
      ]},
      { id:'sq2', question:'Services principaux?', options:[
        {text:'Design + développement web',score:8},
        {text:'Branding + marketing',score:7},
        {text:'Full service (tout)',score:6}
      ]}
    ]
  },
  {
    id: 'construction_general', name: 'Construction générale', icon: '🏗️', group: 'Construction, Auto & Métiers',
    keywords: ['construction','entrepreneur general','batiment','renovation','contracteur','general contractor','chantier','maison','immeuble','reno'],
    cogs: 0.75, grossMargin: 0.25, netMargin: 0.05, cac: 200, medianInvestment: 50000, breakEvenMonths: 12,
    avgTicket: 25000, ltv: 75000, growth: [0.10, 0.08, 0.06, 0.05, 0.05],
    seasonality: [0.50, 0.55, 0.85, 1.15, 1.35, 1.45, 1.45, 1.35, 1.15, 0.95, 0.60, 0.65],
    marketSize: 'large', barriers: 'high', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type de projets?', options:[
        {text:'Résidentiel neuf',score:7},
        {text:'Rénovation',score:8},
        {text:'Commercial / institutionnel',score:6}
      ]},
      { id:'sq2', question:'As-tu ta licence RBQ?', options:[
        {text:'Oui',score:10},
        {text:'En cours d\'obtention',score:5},
        {text:'Pas encore',score:2}
      ]}
    ]
  },
  {
    id: 'construction_specialty', name: 'Métier spécialisé (HVAC, élec.)', icon: '🔧', group: 'Construction, Auto & Métiers',
    keywords: ['electricien','plombier','hvac','chauffage','climatisation','ventilation','plomberie','electricite','metier specialise','soudeur','menuisier','peintre','toiture'],
    cogs: 0.68, grossMargin: 0.32, netMargin: 0.08, cac: 100, medianInvestment: 75000, breakEvenMonths: 10,
    avgTicket: 2000, ltv: 8000, growth: [0.12, 0.10, 0.08, 0.06, 0.05],
    seasonality: [0.70, 0.70, 0.85, 1.15, 1.25, 1.35, 1.35, 1.25, 1.15, 0.95, 0.60, 0.70],
    marketSize: 'large', barriers: 'high', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel métier spécialisé?', options:[
        {text:'Électricien',score:8},
        {text:'Plombier',score:8},
        {text:'HVAC / climatisation',score:8}
      ]},
      { id:'sq2', question:'Carte de compétence?', options:[
        {text:'Oui, compagnon certifié',score:10},
        {text:'Apprenti',score:5},
        {text:'En obtention',score:3}
      ]}
    ]
  },

  // ═══ TOURISME & LOISIRS ═══
  {
    id: 'tourism_adventure', name: 'Excursions / Aventure', icon: '🏔️', group: 'Immobilier, Tourisme & Loisirs',
    keywords: ['excursion','aventure','tourisme','tour','guide','expedition','plein air','outdoor','kayak','randonnee','escalade','zipline','tyrolienne','parachute','rafting'],
    cogs: 0.50, grossMargin: 0.50, netMargin: 0.12, cac: 50, medianInvestment: 50000, breakEvenMonths: 18,
    avgTicket: 100, ltv: 300, growth: [0.18, 0.15, 0.12, 0.10, 0.08],
    seasonality: [0.40, 0.40, 0.60, 0.90, 1.35, 1.65, 1.70, 1.60, 1.25, 0.85, 0.50, 0.80],
    marketSize: 'medium', barriers: 'medium', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type d\'activité?', options:[
        {text:'Activité nautique (kayak, rafting...)',score:7},
        {text:'Activité terrestre (escalade, rando...)',score:7},
        {text:'Activité aérienne (parachute, zipline...)',score:6}
      ]},
      { id:'sq2', question:'Opération saisonnière ou à l\'année?', options:[
        {text:'À l\'année',score:9},
        {text:'Printemps-automne (6-8 mois)',score:6},
        {text:'Été seulement (3-4 mois)',score:3}
      ]}
    ]
  },
  {
    id: 'hot_air_balloon', name: 'Montgolfière', icon: '🎈', group: 'Immobilier, Tourisme & Loisirs',
    keywords: ['montgolfiere','hot air balloon','ballon','vol','survol','aerien','nacelle','air chaud'],
    cogs: 0.48, grossMargin: 0.52, netMargin: 0.10, cac: 60, medianInvestment: 300000, breakEvenMonths: 24,
    avgTicket: 275, ltv: 550, growth: [0.10, 0.08, 0.06, 0.05, 0.04],
    seasonality: [0.40, 0.40, 0.50, 0.70, 1.25, 1.55, 1.65, 1.65, 1.45, 1.05, 0.65, 0.75],
    marketSize: 'small', barriers: 'high', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'As-tu une licence de pilote?', options:[
        {text:'Oui, certifié',score:10},
        {text:'En formation',score:6},
        {text:'Je vais embaucher un pilote',score:4}
      ]},
      { id:'sq2', question:'Combien de ballons prévus?', options:[
        {text:'1 ballon pour commencer',score:8},
        {text:'2-3 ballons',score:6},
        {text:'Flotte de 4+',score:4}
      ]}
    ]
  },
  {
    id: 'gym_fitness', name: 'Gym / Studio fitness', icon: '🏋️', group: 'Immobilier, Tourisme & Loisirs',
    keywords: ['gym','gymnase','studio','fitness','crossfit','yoga','pilates','spinning','zumba','danse','salle de sport','centre fitness','classe','cours collectif'],
    cogs: 0.10, grossMargin: 0.90, netMargin: 0.15, cac: 90, medianInvestment: 150000, breakEvenMonths: 18,
    avgTicket: 80, ltv: 1440, growth: [0.15, 0.12, 0.10, 0.08, 0.06],
    seasonality: [1.30, 1.20, 1.10, 1.00, 0.95, 0.85, 0.80, 0.80, 1.00, 1.00, 1.00, 1.00],
    marketSize: 'large', barriers: 'medium', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel concept?', options:[
        {text:'Studio spécialisé (yoga, CrossFit, etc.)',score:8},
        {text:'Gym traditionnel (machines + poids)',score:6},
        {text:'Boutique fitness / premium',score:7}
      ]},
      { id:'sq2', question:'Taille du local prévu?', options:[
        {text:'Petit studio (< 2000 pi²)',score:8},
        {text:'Moyen (2000-5000 pi²)',score:7},
        {text:'Grand (5000+ pi²)',score:5}
      ]}
    ]
  },

  // ═══ NOUVELLES CATÉGORIES — ALIMENTATION & BOISSONS ═══
  {
    id: 'bar_brewery', name: 'Bar / Microbrasserie', icon: '🍺', group: 'Alimentation & Boissons',
    keywords: ['bar','microbrasserie','brasserie','pub','biere','craft beer','distillerie','cocktail','lounge','taverne','brewpub','alcool','vin','sommelier'],
    cogs: 0.28, grossMargin: 0.72, netMargin: 0.08, cac: 30, medianInvestment: 350000, breakEvenMonths: 24,
    avgTicket: 35, ltv: 840, growth: [0.18, 0.15, 0.12, 0.10, 0.08],
    seasonality: [0.80, 0.75, 0.85, 0.95, 1.10, 1.20, 1.25, 1.20, 1.05, 0.95, 0.90, 1.00],
    marketSize: 'large', barriers: 'high', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type d\'établissement?', options:[
        {text:'Microbrasserie avec salle de dégustation',score:8},
        {text:'Bar / pub traditionnel',score:6},
        {text:'Distillerie artisanale',score:7}
      ]},
      { id:'sq2', question:'As-tu ton permis d\'alcool?', options:[
        {text:'Oui, obtenu',score:10},
        {text:'Demande en cours',score:6},
        {text:'Pas encore commencé',score:3}
      ]}
    ]
  },
  {
    id: 'food_truck_catering', name: 'Food truck / Traiteur', icon: '🚚', group: 'Alimentation & Boissons',
    keywords: ['food truck','traiteur','catering','cuisine de rue','street food','camion','buffet','banquet','reception','service traiteur','chef prive','popote'],
    cogs: 0.35, grossMargin: 0.65, netMargin: 0.10, cac: 20, medianInvestment: 80000, breakEvenMonths: 12,
    avgTicket: 45, ltv: 540, growth: [0.20, 0.18, 0.15, 0.12, 0.10],
    seasonality: [0.50, 0.50, 0.80, 1.00, 1.30, 1.50, 1.50, 1.40, 1.20, 1.00, 0.70, 0.60],
    marketSize: 'medium', barriers: 'medium', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel format principal?', options:[
        {text:'Food truck / camion de rue',score:7},
        {text:'Traiteur événementiel',score:8},
        {text:'Les deux (hybride)',score:9}
      ]},
      { id:'sq2', question:'As-tu un véhicule ou local de production?', options:[
        {text:'Oui, prêt à opérer',score:9},
        {text:'En recherche',score:6},
        {text:'Je louerai une cuisine commerciale',score:7}
      ]}
    ]
  },

  // ═══ SERVICES PROFESSIONNELS ═══
  {
    id: 'accounting_bookkeeping', name: 'Comptabilité / Tenue de livres', icon: '📊', group: 'Services professionnels',
    keywords: ['comptabilite','comptable','tenue de livres','bookkeeping','impot','taxes','fiscal','cpa','paie','payroll','declaration','rapport financier','fiscaliste'],
    cogs: 0.08, grossMargin: 0.92, netMargin: 0.30, cac: 150, medianInvestment: 10000, breakEvenMonths: 4,
    avgTicket: 300, ltv: 14400, growth: [0.20, 0.18, 0.15, 0.12, 0.10],
    seasonality: [1.40, 1.30, 1.30, 1.40, 0.80, 0.70, 0.70, 0.80, 0.90, 0.90, 1.00, 0.80],
    marketSize: 'large', barriers: 'medium', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'As-tu un titre comptable (CPA)?', options:[
        {text:'Oui, CPA ou équivalent',score:10},
        {text:'Formation en comptabilité sans titre',score:7},
        {text:'Non, autodidacte avec logiciels',score:4}
      ]},
      { id:'sq2', question:'Clientèle cible?', options:[
        {text:'PME et travailleurs autonomes',score:8},
        {text:'Particuliers (impôts personnels)',score:6},
        {text:'Entreprises moyennes / grandes',score:7}
      ]}
    ]
  },
  {
    id: 'events_wedding', name: 'Événementiel / Mariages', icon: '🎪', group: 'Services professionnels',
    keywords: ['evenement','evenementiel','mariage','wedding','planner','organisateur','reception','fete','party','gala','conference','salon','congres','ceremonie'],
    cogs: 0.40, grossMargin: 0.60, netMargin: 0.15, cac: 100, medianInvestment: 20000, breakEvenMonths: 8,
    avgTicket: 3000, ltv: 6000, growth: [0.20, 0.15, 0.12, 0.10, 0.08],
    seasonality: [0.50, 0.50, 0.70, 0.90, 1.30, 1.50, 1.50, 1.40, 1.30, 1.00, 0.70, 0.70],
    marketSize: 'large', barriers: 'low', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel type d\'événements?', options:[
        {text:'Mariages',score:8},
        {text:'Événements corporatifs / congrès',score:7},
        {text:'Fêtes privées / tous types',score:6}
      ]},
      { id:'sq2', question:'As-tu un réseau de fournisseurs?', options:[
        {text:'Oui, fournisseurs établis',score:9},
        {text:'Quelques contacts',score:6},
        {text:'À bâtir de zéro',score:4}
      ]}
    ]
  },

  // ═══ SANTÉ & SOINS ═══
  {
    id: 'dental_clinic', name: 'Cabinet dentaire', icon: '🦷', group: 'Santé & Éducation',
    keywords: ['dentiste','dentaire','dental','orthodontie','hygieniste','blanchiment','implant','prothese','clinique dentaire','soins dentaires'],
    cogs: 0.30, grossMargin: 0.70, netMargin: 0.18, cac: 200, medianInvestment: 500000, breakEvenMonths: 36,
    avgTicket: 250, ltv: 8000, growth: [0.10, 0.08, 0.06, 0.05, 0.04],
    seasonality: [1.00, 0.95, 1.00, 1.05, 1.00, 0.90, 0.85, 0.85, 1.05, 1.10, 1.10, 1.15],
    marketSize: 'large', barriers: 'high', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Es-tu dentiste diplômé?', options:[
        {text:'Oui, membre de l\'Ordre des dentistes',score:10},
        {text:'Je m\'associe avec un dentiste',score:6},
        {text:'Je suis hygiéniste, je veux ouvrir',score:5}
      ]},
      { id:'sq2', question:'Type de clinique?', options:[
        {text:'Dentisterie générale',score:8},
        {text:'Spécialisée (orthodontie, implants)',score:7},
        {text:'Clinique esthétique dentaire',score:6}
      ]}
    ]
  },
  {
    id: 'home_care', name: 'Soins à domicile / Aide à la personne', icon: '🩺', group: 'Santé & Éducation',
    keywords: ['soins a domicile','aide a domicile','prepose','auxiliaire','aide menagere','personne agee','aines','home care','maintien a domicile','accompagnement','bien chez soi'],
    cogs: 0.15, grossMargin: 0.85, netMargin: 0.12, cac: 80, medianInvestment: 15000, breakEvenMonths: 8,
    avgTicket: 150, ltv: 7200, growth: [0.15, 0.12, 0.10, 0.08, 0.06],
    seasonality: [1.00, 1.00, 1.00, 1.00, 1.00, 0.95, 0.95, 0.95, 1.00, 1.05, 1.05, 1.05],
    marketSize: 'large', barriers: 'medium', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel type de soins?', options:[
        {text:'Aide domestique (ménage, courses, repas)',score:7},
        {text:'Soins personnels (hygiène, mobilité)',score:8},
        {text:'Accompagnement / compagnie',score:6}
      ]},
      { id:'sq2', question:'Clientèle principale?', options:[
        {text:'Personnes âgées',score:8},
        {text:'Personnes en convalescence',score:7},
        {text:'Familles / enfants avec besoins spéciaux',score:7}
      ]}
    ]
  },
  {
    id: 'daycare', name: 'Garderie / Service de garde', icon: '👶', group: 'Santé & Éducation',
    keywords: ['garderie','cpe','service de garde','petite enfance','creche','garde enfants','milieu familial','daycare','prescolaire','educatrice','bambin'],
    cogs: 0.10, grossMargin: 0.90, netMargin: 0.08, cac: 40, medianInvestment: 150000, breakEvenMonths: 24,
    avgTicket: 45, ltv: 12000, growth: [0.08, 0.06, 0.05, 0.04, 0.03],
    seasonality: [1.00, 1.00, 1.00, 1.00, 1.00, 0.80, 0.60, 0.80, 1.10, 1.10, 1.10, 1.50],
    marketSize: 'large', barriers: 'high', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type de service de garde?', options:[
        {text:'Garderie en installation (permis du MFA)',score:7},
        {text:'Milieu familial (à la maison)',score:8},
        {text:'Service de garde scolaire ou parascolaire',score:6}
      ]},
      { id:'sq2', question:'As-tu une formation en petite enfance?', options:[
        {text:'Oui, DEC ou AEC en éducation à l\'enfance',score:10},
        {text:'Formation en cours',score:6},
        {text:'Non, mais j\'ai de l\'expérience',score:4}
      ]}
    ]
  },

  // ═══ CONSTRUCTION, AUTO & MÉTIERS ═══
  {
    id: 'auto_repair', name: 'Garage automobile / Mécanique', icon: '🚗', group: 'Construction, Auto & Métiers',
    keywords: ['garage','mecanique','mecanicien','automobile','auto','reparation','carrosserie','peinture auto','lave-auto','car wash','pneu','alignement','vidange','huile','inspection','saaq'],
    cogs: 0.45, grossMargin: 0.55, netMargin: 0.10, cac: 50, medianInvestment: 100000, breakEvenMonths: 15,
    avgTicket: 350, ltv: 3500, growth: [0.10, 0.08, 0.06, 0.05, 0.04],
    seasonality: [1.00, 0.90, 1.00, 1.10, 1.05, 1.00, 0.90, 0.90, 1.00, 1.10, 1.15, 0.90],
    marketSize: 'large', barriers: 'medium', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type de services?', options:[
        {text:'Mécanique générale',score:8},
        {text:'Carrosserie / peinture',score:7},
        {text:'Spécialité (pneus, esthétique, véhicules électriques)',score:7}
      ]},
      { id:'sq2', question:'As-tu tes certifications?', options:[
        {text:'Oui, DEP en mécanique ou équivalent',score:10},
        {text:'Expérience pratique sans diplôme',score:6},
        {text:'Je vais embaucher des mécaniciens',score:5}
      ]}
    ]
  },
  {
    id: 'transport_logistics', name: 'Transport / Livraison / Déménagement', icon: '🚛', group: 'Construction, Auto & Métiers',
    keywords: ['transport','livraison','demenagement','camionnage','coursier','logistique','freight','shipping','delivery','camion','moving','mover','messagerie','routier'],
    cogs: 0.55, grossMargin: 0.45, netMargin: 0.08, cac: 60, medianInvestment: 80000, breakEvenMonths: 12,
    avgTicket: 500, ltv: 2000, growth: [0.12, 0.10, 0.08, 0.06, 0.05],
    seasonality: [0.80, 0.80, 0.90, 1.00, 1.10, 1.20, 1.30, 1.20, 1.00, 0.90, 0.90, 0.90],
    marketSize: 'large', barriers: 'medium', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel type de transport?', options:[
        {text:'Déménagement résidentiel',score:7},
        {text:'Livraison commerciale / courrier',score:8},
        {text:'Transport de marchandises (camionnage)',score:6}
      ]},
      { id:'sq2', question:'As-tu déjà un ou des véhicules?', options:[
        {text:'Oui, flotte prête',score:9},
        {text:'Un véhicule, je veux grandir',score:7},
        {text:'Pas encore, à acheter/louer',score:4}
      ]}
    ]
  },
  {
    id: 'landscaping', name: 'Aménagement paysager / Entretien extérieur', icon: '🌿', group: 'Construction, Auto & Métiers',
    keywords: ['amenagement paysager','landscaping','gazon','pelouse','tonte','deneigement','neige','entretien terrain','arbre','horticulture','pavage','terrassement','cloture'],
    cogs: 0.40, grossMargin: 0.60, netMargin: 0.12, cac: 40, medianInvestment: 30000, breakEvenMonths: 6,
    avgTicket: 200, ltv: 4800, growth: [0.15, 0.12, 0.10, 0.08, 0.06],
    seasonality: [0.30, 0.30, 0.60, 1.20, 1.50, 1.50, 1.50, 1.40, 1.20, 1.00, 0.70, 0.80],
    marketSize: 'large', barriers: 'low', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quels services principaux?', options:[
        {text:'Aménagement paysager / design',score:8},
        {text:'Entretien de pelouse / tonte',score:7},
        {text:'Déneigement + entretien 4 saisons',score:9}
      ]},
      { id:'sq2', question:'As-tu l\'équipement nécessaire?', options:[
        {text:'Oui, tout équipé',score:9},
        {text:'Équipement de base, besoin d\'investir',score:6},
        {text:'Rien encore',score:3}
      ]}
    ]
  },
  {
    id: 'cleaning_services', name: 'Nettoyage / Conciergerie', icon: '🧹', group: 'Construction, Auto & Métiers',
    keywords: ['nettoyage','conciergerie','menage','entretien menager','cleaning','janitorial','lavage','desinfection','tapis','vitres','commercial','residentiel'],
    cogs: 0.20, grossMargin: 0.80, netMargin: 0.15, cac: 30, medianInvestment: 10000, breakEvenMonths: 4,
    avgTicket: 150, ltv: 3600, growth: [0.20, 0.18, 0.15, 0.12, 0.10],
    seasonality: [1.05, 1.00, 1.10, 1.15, 1.05, 0.95, 0.85, 0.85, 1.00, 1.00, 1.00, 1.00],
    marketSize: 'large', barriers: 'low', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel type de nettoyage?', options:[
        {text:'Résidentiel (maisons / condos)',score:7},
        {text:'Commercial (bureaux / commerces)',score:8},
        {text:'Spécialisé (post-construction, sinistres)',score:9}
      ]},
      { id:'sq2', question:'Combien d\'employés prévus?', options:[
        {text:'Solo pour commencer',score:7},
        {text:'2-5 employés',score:8},
        {text:'Équipe de 6+',score:6}
      ]}
    ]
  },

  // ═══ IMMOBILIER, TOURISME & LOISIRS ═══
  {
    id: 'real_estate', name: 'Courtage immobilier / Gestion', icon: '🏘️', group: 'Immobilier, Tourisme & Loisirs',
    keywords: ['immobilier','courtier','courtage','agent immobilier','gestion immobiliere','location','condo','maison','propriete','real estate','achat','vente','immeuble','oaciq'],
    cogs: 0.05, grossMargin: 0.95, netMargin: 0.20, cac: 500, medianInvestment: 15000, breakEvenMonths: 6,
    avgTicket: 8000, ltv: 24000, growth: [0.15, 0.12, 0.10, 0.08, 0.06],
    seasonality: [0.80, 0.85, 1.00, 1.15, 1.20, 1.25, 1.10, 1.05, 1.00, 0.90, 0.85, 0.85],
    marketSize: 'large', barriers: 'high', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel créneau immobilier?', options:[
        {text:'Courtage résidentiel (achat/vente)',score:7},
        {text:'Gestion de propriétés locatives',score:8},
        {text:'Commercial / industriel',score:6}
      ]},
      { id:'sq2', question:'As-tu ta licence (OACIQ)?', options:[
        {text:'Oui, courtier certifié',score:10},
        {text:'En formation',score:5},
        {text:'Gestion seulement (pas de courtage)',score:7}
      ]}
    ]
  },
  {
    id: 'accommodation_rental', name: 'Hébergement / Gîte / Airbnb', icon: '🛏️', group: 'Immobilier, Tourisme & Loisirs',
    keywords: ['hebergement','gite','airbnb','bed and breakfast','chalet','location courte duree','tourisme','auberge','cottage','villegiature','hotel','motel','nuitee'],
    cogs: 0.20, grossMargin: 0.80, netMargin: 0.15, cac: 30, medianInvestment: 200000, breakEvenMonths: 24,
    avgTicket: 150, ltv: 600, growth: [0.12, 0.10, 0.08, 0.06, 0.05],
    seasonality: [0.40, 0.40, 0.50, 0.70, 1.10, 1.60, 1.80, 1.70, 1.20, 0.80, 0.50, 1.30],
    marketSize: 'medium', barriers: 'medium', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type d\'hébergement?', options:[
        {text:'Chalet(s) locatif(s)',score:8},
        {text:'Gîte / B&B',score:7},
        {text:'Airbnb (propriété existante)',score:9}
      ]},
      { id:'sq2', question:'Combien d\'unités?', options:[
        {text:'1-2 unités',score:8},
        {text:'3-5 unités',score:7},
        {text:'6+ unités',score:5}
      ]}
    ]
  },

  // ═══ COMMERCE & PRODUCTION ═══
  {
    id: 'agriculture_farm', name: 'Agriculture / Ferme / Érablière', icon: '🌾', group: 'Commerce & Production',
    keywords: ['agriculture','ferme','fermier','erabliere','sirop','erable','maraicher','legume','fruit','bio','organique','elevage','poulailler','serre','agrotourisme','marche'],
    cogs: 0.50, grossMargin: 0.50, netMargin: 0.08, cac: 30, medianInvestment: 200000, breakEvenMonths: 36,
    avgTicket: 25, ltv: 300, growth: [0.08, 0.06, 0.05, 0.04, 0.03],
    seasonality: [0.40, 0.30, 1.40, 1.40, 1.20, 1.10, 1.10, 1.20, 1.30, 1.20, 0.70, 0.70],
    marketSize: 'medium', barriers: 'high', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel type de production?', options:[
        {text:'Maraîchage / légumes / fruits',score:7},
        {text:'Érablière / sirop d\'érable',score:8},
        {text:'Élevage / volaille',score:6}
      ]},
      { id:'sq2', question:'As-tu accès à une terre?', options:[
        {text:'Oui, propriétaire',score:10},
        {text:'En location / bail',score:7},
        {text:'En recherche',score:4}
      ]}
    ]
  },
  {
    id: 'artisan_manufacturing', name: 'Fabrication artisanale / Produits maison', icon: '🧴', group: 'Commerce & Production',
    keywords: ['artisan','artisanal','fabrication','handmade','savon','bougie','cosmetique','chandelle','bijoux','ceramique','poterie','couture','tricot','woodwork','bois'],
    cogs: 0.35, grossMargin: 0.65, netMargin: 0.18, cac: 35, medianInvestment: 15000, breakEvenMonths: 8,
    avgTicket: 30, ltv: 180, growth: [0.25, 0.20, 0.15, 0.12, 0.10],
    seasonality: [0.80, 0.75, 0.85, 0.90, 0.95, 0.90, 0.85, 0.85, 1.00, 1.10, 1.30, 1.75],
    marketSize: 'medium', barriers: 'low', scalability: 'medium',
    specificQuestions: [
      { id:'sq1', question:'Quel type de produits?', options:[
        {text:'Cosmétiques / soins (savons, crèmes)',score:8},
        {text:'Décoration / bougies / céramique',score:7},
        {text:'Bijoux / accessoires / vêtements',score:7}
      ]},
      { id:'sq2', question:'Canal de vente principal?', options:[
        {text:'En ligne (Etsy, Shopify)',score:8},
        {text:'Marchés publics / boutiques locales',score:7},
        {text:'Vente directe + réseaux sociaux',score:7}
      ]}
    ]
  },

  // ═══ SERVICES DE PROXIMITÉ ═══
  {
    id: 'pet_services', name: 'Services animaliers / Toilettage', icon: '🐾', group: 'Services professionnels',
    keywords: ['animal','animaux','chien','chat','toilettage','pension','promenade','dog','pet','grooming','pet sitting','gardiennage','veterinaire','animalerie','dressage'],
    cogs: 0.18, grossMargin: 0.82, netMargin: 0.15, cac: 30, medianInvestment: 25000, breakEvenMonths: 8,
    avgTicket: 60, ltv: 2160, growth: [0.18, 0.15, 0.12, 0.10, 0.08],
    seasonality: [1.05, 1.00, 1.00, 1.00, 1.05, 0.90, 0.85, 0.85, 1.00, 1.05, 1.10, 1.15],
    marketSize: 'large', barriers: 'low', scalability: 'low',
    specificQuestions: [
      { id:'sq1', question:'Quel service principal?', options:[
        {text:'Toilettage',score:8},
        {text:'Pension / gardiennage',score:7},
        {text:'Promenade / dog walking',score:6}
      ]},
      { id:'sq2', question:'As-tu un local ou c\'est mobile?', options:[
        {text:'Local dédié (salon)',score:7},
        {text:'Service mobile / à domicile',score:8},
        {text:'Chez moi (pension résidentielle)',score:7}
      ]}
    ]
  }
];

const CATEGORY_GROUPS = [
  { name: 'Alimentation & Boissons', ids: ['food_bakery','restaurant_quick_service','restaurant_full_service','bar_brewery','food_truck_catering'] },
  { name: 'Services professionnels', ids: ['consulting','coaching','accounting_bookkeeping','events_wedding','pet_services'] },
  { name: 'Beauté & Bien-être', ids: ['beauty_salon','massage_spa','personal_training'] },
  { name: 'Santé & Éducation', ids: ['health_wellness_clinic','chiropractic','dental_clinic','home_care','daycare','tutoring_center','swimming_lessons'] },
  { name: 'Commerce & Production', ids: ['ecommerce_general','ecommerce_dropshipping','retail_physical','agriculture_farm','artisan_manufacturing'] },
  { name: 'Tech & Numérique', ids: ['saas','digital_products','online_courses'] },
  { name: 'Création & Médias', ids: ['photography','graphic_design_freelance','design_agency'] },
  { name: 'Construction, Auto & Métiers', ids: ['construction_general','construction_specialty','auto_repair','transport_logistics','landscaping','cleaning_services'] },
  { name: 'Immobilier, Tourisme & Loisirs', ids: ['real_estate','accommodation_rental','tourism_adventure','hot_air_balloon','gym_fitness'] },
];

// --- QUESTIONS UNIVERSELLES ---
// Budget (uq2) et revenu (uq3) sont maintenant des sliders dans la phase ajustements
const UNIVERSAL_QUESTIONS = [
  {
    id: 'uq1', question: 'As-tu de l\'expérience dans ce domaine?',
    hint: 'Formation, emploi, ou expérience personnelle.',
    options: [
      { text: 'Oui, plus de 3 ans', score: 3 },
      { text: 'Un peu — 1 à 3 ans', score: 2 },
      { text: 'Non, c\'est nouveau pour moi', score: 1 }
    ]
  },
  {
    id: 'uq4', question: 'Où sera située ton entreprise?',
    options: [
      { text: 'Urbain (Montréal, Québec, etc.)', value: 'urban', score: 2 },
      { text: 'Banlieue / Périurbain', value: 'suburban', score: 2 },
      { text: 'Rural / Petite ville', value: 'rural', score: 2 },
      { text: '100% en ligne', value: 'online', score: 3 }
    ]
  },
  {
    id: 'uq5', question: 'As-tu déjà des clients ou prospects?',
    hint: 'Même informels — amis, famille, premiers contacts.',
    options: [
      { text: 'Oui, j\'ai déjà des clients payants', score: 3 },
      { text: 'Quelques prospects intéressés', score: 2 },
      { text: 'Pas encore', score: 1 }
    ]
  },
  {
    id: 'uq6', question: 'C\'est un projet à...',
    options: [
      { text: 'Temps plein', value: 'full', score: 2 },
      { text: 'Temps partiel / side-hustle', value: 'part', score: 1 }
    ]
  }
];

// --- SCORING WEIGHTS ---
const SCORING_WEIGHTS = {
  grossMargin: 0.15,
  investmentRatio: 0.15,
  breakEvenTime: 0.15,
  ltvCacRatio: 0.12,
  seasonalRisk: 0.12,
  marketSize: 0.10,
  barriers: 0.10,
  scalability: 0.11
};

// --- GEO ADJUSTMENTS ---
const GEO_ADJUSTMENTS = {
  urban:    { rent: 1.30, salary: 1.20, cac: 1.15, label: 'Urbain' },
  suburban: { rent: 1.00, salary: 1.00, cac: 1.00, label: 'Banlieue' },
  rural:    { rent: 0.70, salary: 0.90, cac: 0.85, label: 'Rural' },
  online:   { rent: 0.00, salary: 1.00, cac: 1.10, label: 'En ligne' }
};

// --- SCENARIOS ---
const SCENARIOS = {
  conservateur: { name: 'Conservateur', icon: '🛡️', color: '#ef4444', revMult: 0.60, cogsAdj: 0.05, priceMult: 0.85 },
  modere:       { name: 'Modéré',       icon: '📊', color: '#f59e0b', revMult: 1.00, cogsAdj: 0.00, priceMult: 1.00 },
  optimiste:    { name: 'Optimiste',     icon: '🚀', color: '#22c55e', revMult: 1.50, cogsAdj:-0.03, priceMult: 1.15 }
};

// --- STATE ---
let state = {
  phase: 'idea',  // idea | classification | questions | adjustments | calculating | dashboard
  ideaText: '',
  detectedCategory: null,
  selectedCategory: null,
  allQuestions: [],
  currentQuestion: 0,
  answers: {},
  adjustments: {}, // budget, cogs, avgPrice, rent from sliders
  score: null,
  subScores: null,
  projections: null,
  geo: 'suburban',
  tier: 'free', // free | pro
  charts: {}
};

// --- CLASSIFICATION ENGINE ---
function classifyIdea(text) {
  const normalized = text.toLowerCase()
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ');
  const words = normalized.split(/\s+/).filter(w => w.length > 2);

  const scores = CATEGORIES.map(cat => {
    let score = 0;
    const matched = [];
    for (const keyword of cat.keywords) {
      const kw = keyword.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
      if (words.includes(kw)) { score += 3; matched.push(kw); }
      else if (kw.includes(' ') && normalized.includes(kw)) { score += 2; matched.push(kw); }
      else if (normalized.includes(kw) && kw.length > 4) { score += 1; matched.push(kw + '~'); }
    }
    return { category: cat, score, matched };
  });

  scores.sort((a, b) => b.score - a.score);
  const top3 = scores.slice(0, 3).filter(s => s.score > 0);

  if (top3.length === 0) return { detected: null, confidence: 'none', suggestions: [] };
  if (top3[0].score >= 4 && (!top3[1] || top3[0].score > top3[1].score * 1.5)) {
    return { detected: top3[0].category, confidence: 'high', suggestions: top3 };
  }
  return { detected: top3[0].category, confidence: 'low', suggestions: top3 };
}

// --- SCORING ENGINE ---
function calculateSubScores(cat, inputs) {
  const scores = {};
  // 1. Marge brute
  scores.grossMargin = Math.min(100, (cat.grossMargin / 0.70) * 100);
  // 2. Ratio investissement / revenu An 1
  const inv = inputs.investment || cat.medianInvestment;
  const rev = inputs.expectedRevenue || (cat.avgTicket * 20 * 12);
  const ratio = inv / Math.max(1, rev);
  scores.investmentRatio = ratio <= 0.15 ? 95 : ratio <= 0.30 ? 80 : ratio <= 0.50 ? 65 : ratio <= 1.0 ? 40 : 20;
  // 3. Break-even
  scores.breakEvenTime = cat.breakEvenMonths <= 4 ? 95 : cat.breakEvenMonths <= 8 ? 80 : cat.breakEvenMonths <= 14 ? 65 : cat.breakEvenMonths <= 24 ? 40 : 20;
  // 4. LTV:CAC
  const ltvCac = cat.ltv / Math.max(1, cat.cac);
  scores.ltvCacRatio = ltvCac >= 6 ? 95 : ltvCac >= 4 ? 80 : ltvCac >= 2.5 ? 65 : ltvCac >= 1.5 ? 40 : 20;
  // 5. Risque saisonnier
  const variance = cat.seasonality.reduce((s, v) => s + Math.pow(v - 1.0, 2), 0) / 12;
  const stdDev = Math.sqrt(variance);
  scores.seasonalRisk = stdDev <= 0.05 ? 95 : stdDev <= 0.10 ? 80 : stdDev <= 0.20 ? 60 : stdDev <= 0.35 ? 40 : 20;
  // 6. Taille du marché
  scores.marketSize = { large: 90, medium: 65, small: 35 }[cat.marketSize] || 50;
  // 7. Barrières
  scores.barriers = { high: 55, medium: 85, low: 45 }[cat.barriers] || 50;
  // 8. Scalabilité
  scores.scalability = { high: 90, medium: 65, low: 30 }[cat.scalability] || 50;
  return scores;
}

function calculateFinalScore(subScores, bonusPoints) {
  let weighted = 0;
  for (const [key, weight] of Object.entries(SCORING_WEIGHTS)) {
    weighted += (subScores[key] || 50) * weight;
  }
  weighted += Math.min(10, bonusPoints || 0);
  return Math.min(100, Math.max(0, Math.round(weighted)));
}

function getVerdict(score) {
  if (score >= 85) return { text: 'Excellent — Fonce!', cls: 'is-verdict--excellent', color: '#22c55e', emoji: '🏆' };
  if (score >= 70) return { text: 'Bon — Viable avec bonne exécution', cls: 'is-verdict--good', color: '#00C1FF', emoji: '👍' };
  if (score >= 50) return { text: 'Moyen — Procède avec prudence', cls: 'is-verdict--moderate', color: '#f59e0b', emoji: '⚠️' };
  if (score >= 30) return { text: 'Risqué — À reconsidérer', cls: 'is-verdict--risky', color: '#ef4444', emoji: '🔴' };
  return { text: 'Non recommandé', cls: 'is-verdict--risky', color: '#ef4444', emoji: '❌' };
}

// --- PROJECTION ENGINE ---
function calculateProjections(cat, inputs, scenarioKey) {
  const s = SCENARIOS[scenarioKey];
  const g = GEO_ADJUSTMENTS[inputs.geo || 'suburban'];
  const annualRev = (inputs.expectedRevenue || cat.avgTicket * 20 * 12) * s.revMult * s.priceMult;
  const cogs = Math.min(0.90, cat.cogs + s.cogsAdj);
  const inv = inputs.investment || cat.medianInvestment;

  const months = [];
  let cumul = -inv;

  for (let m = 0; m < 12; m++) {
    const revenue = Math.round(annualRev * (cat.seasonality[m] / 12));
    const cogsAmt = Math.round(revenue * cogs);
    const gross = revenue - cogsAmt;
    const rent = Math.round(revenue * 0.06 * g.rent);
    const salary = Math.round(revenue * 0.20 * g.salary);
    const marketing = Math.round(revenue * 0.05);
    const other = Math.round(revenue * 0.04);
    const totalOpex = rent + salary + marketing + other;
    const net = gross - totalOpex;
    cumul += net;

    months.push({ month: MONTH_LABELS[m], revenue, cogsAmt, gross, rent, salary, marketing, other, totalOpex, net, cumul, seasonIndex: cat.seasonality[m] });
  }
  return months;
}

// --- LOCALSTORAGE ---
function saveResults() {
  const cat = state.selectedCategory;
  const data = {
    ideaText: state.ideaText,
    categoryId: cat.id,
    categoryName: cat.name,
    score: state.score,
    subScores: state.subScores,
    answers: state.answers,
    geo: state.geo,
    projections: state.projections ? {
      year1Revenue: state.projections.reduce((s, m) => s + m.revenue, 0),
      investment: state.adjustments.budget || cat.medianInvestment,
      breakEvenMonth: (state.projections.findIndex(m => m.cumul >= 0) + 1) || null
    } : null,
    timestamp: Date.now()
  };
  localStorage.setItem('bildop_ideascore', JSON.stringify(data));
}

// --- FORMAT ---
function fmt(n) {
  if (n == null) return '—';
  const abs = Math.abs(Math.round(n));
  return (n < 0 ? '-' : '') + abs.toLocaleString('fr-CA') + ' $';
}

// --- UI RENDERING ---
const app = () => document.getElementById('ideascoreApp');

function render() {
  Object.values(state.charts).forEach(c => { try { c.destroy(); } catch {} });
  state.charts = {};
  switch (state.phase) {
    case 'idea': renderIdea(); break;
    case 'classification': renderClassification(); break;
    case 'questions': renderQuestions(); break;
    case 'adjustments': renderAdjustments(); break;
    case 'calculating': renderCalculating(); break;
    case 'dashboard': renderDashboard(); break;
  }
}

// --- PHASE 1 : IDEA INPUT ---
function renderIdea() {
  app().innerHTML = `
    <div class="is-hero">
      <div class="is-hero__badge">Gratuit — 2 minutes</div>
      <h1>Ton idée a-t-elle du potentiel?</h1>
      <p class="is-hero__sub">Décris ton projet en 2-3 phrases. Notre IA analyse ton industrie et calcule un score de viabilité basé sur des données réelles de 42 secteurs.</p>

      <div class="is-idea-box">
        <textarea class="is-idea-input" id="ideaInput" rows="4" maxlength="500" placeholder="Ex: Je veux ouvrir une boulangerie artisanale bio dans Griffintown, spécialisée en gâteaux de mariage et viennoiseries...">${state.ideaText}</textarea>
        <div class="is-idea-counter"><span id="charCount">${state.ideaText.length}</span>/500</div>
      </div>

      <div class="is-detected-live" id="detectedLive" style="display:none">
        <div class="is-detected-live__label">Industrie détectée</div>
        <div class="is-detected-live__value" id="detectedValue"></div>
      </div>

      <p class="is-idea-examples">Essaie : boulangerie, SaaS, cours de natation, salon de coiffure, food truck, consultant marketing, boutique en ligne...</p>

      <button class="btn btn--primary is-analyze-btn" id="analyzeBtn" ${state.ideaText.length < 20 ? 'disabled' : ''}>
        Analyser mon idée →
      </button>
    </div>
  `;

  const input = document.getElementById('ideaInput');
  const btn = document.getElementById('analyzeBtn');
  const counter = document.getElementById('charCount');
  const detectedEl = document.getElementById('detectedLive');
  const detectedVal = document.getElementById('detectedValue');

  input.addEventListener('input', () => {
    state.ideaText = input.value;
    counter.textContent = input.value.length;
    btn.disabled = input.value.length < 20;

    // Live industry detection
    if (input.value.length >= 10) {
      const result = classifyIdea(input.value);
      if (result.detected) {
        detectedVal.textContent = result.detected.icon + ' ' + result.detected.name + ' — ' + result.detected.group;
        detectedEl.style.display = 'block';
      } else {
        detectedEl.style.display = 'none';
      }
    } else {
      detectedEl.style.display = 'none';
    }
  });

  btn.addEventListener('click', () => {
    if (state.ideaText.length >= 20) {
      state.phase = 'classification';
      render();
    }
  });

  input.focus();
}

// --- PHASE 2 : CLASSIFICATION ---
function renderClassification() {
  const result = classifyIdea(state.ideaText);

  // Show analyzing animation first
  app().innerHTML = `
    <div class="is-analyzing">
      <div class="is-analyzing__spinner"></div>
      <div class="is-analyzing__steps">
        <div class="is-analyzing__step" id="step1">Analyse du texte...</div>
        <div class="is-analyzing__step" id="step2">Détection de l'industrie...</div>
        <div class="is-analyzing__step" id="step3">Chargement des benchmarks...</div>
      </div>
    </div>
  `;

  setTimeout(() => document.getElementById('step1')?.classList.add('is-analyzing__step--done'), 500);
  setTimeout(() => document.getElementById('step2')?.classList.add('is-analyzing__step--done'), 1200);
  setTimeout(() => document.getElementById('step3')?.classList.add('is-analyzing__step--done'), 2000);

  setTimeout(() => {
    if (result.detected && result.confidence === 'high') {
      // Confiance élevée → on skip la confirmation, direct aux questions
      selectCategory(result.detected);
    } else if (result.detected) {
      // Confiance faible → on montre les suggestions
      renderCategoryConfirm(result);
    } else {
      // Rien détecté → grille complète
      renderCategoryGrid(null);
    }
  }, 2500);
}

function renderCategoryConfirm(result) {
  const cat = result.detected;
  const ltvCac = (cat.ltv / Math.max(1, cat.cac)).toFixed(1);
  const marginLevel = cat.grossMargin >= 0.70 ? 'excellente' : cat.grossMargin >= 0.50 ? 'bonne' : cat.grossMargin >= 0.35 ? 'moyenne' : 'faible';
  const beLevel = cat.breakEvenMonths <= 6 ? 'rapide' : cat.breakEvenMonths <= 12 ? 'raisonnable' : cat.breakEvenMonths <= 24 ? 'long' : 'très long';

  app().innerHTML = `
    <div class="is-category-confirm">
      <h2>On a détecté ton industrie</h2>

      <div class="is-detected-card">
        <span class="is-detected-card__icon">${cat.icon}</span>
        <div>
          <div class="is-detected-card__group">${cat.group}</div>
          <strong>${cat.name}</strong>
          <span class="is-detected-card__badge ${result.confidence === 'high' ? 'is-detected-card__badge--high' : 'is-detected-card__badge--low'}">
            ${result.confidence === 'high' ? 'Confiance élevée' : 'Meilleure correspondance'}
          </span>
        </div>
      </div>

      <div class="is-sector-context">
        <div class="is-sector-context__title">Ce que ça implique dans ton secteur :</div>
        <div class="is-sector-context__grid">
          <div class="is-sector-stat">
            <span class="is-sector-stat__value">${Math.round(cat.grossMargin * 100)}%</span>
            <span class="is-sector-stat__label">Marge brute ${marginLevel}</span>
          </div>
          <div class="is-sector-stat">
            <span class="is-sector-stat__value">${cat.medianInvestment.toLocaleString('fr-CA')} $</span>
            <span class="is-sector-stat__label">Investissement médian</span>
          </div>
          <div class="is-sector-stat">
            <span class="is-sector-stat__value">${cat.breakEvenMonths} mois</span>
            <span class="is-sector-stat__label">Break-even ${beLevel}</span>
          </div>
          <div class="is-sector-stat">
            <span class="is-sector-stat__value">${ltvCac}:1</span>
            <span class="is-sector-stat__label">Ratio LTV:CAC</span>
          </div>
        </div>
      </div>

      <button class="btn btn--primary is-confirm-btn" id="confirmBtn">C'est mon secteur →</button>

      ${result.suggestions.length > 1 ? `
        <p class="is-alternatives-label">Ou choisir :</p>
        <div class="is-alternatives">
          ${result.suggestions.slice(1, 3).map(s => `
            <button class="is-alt-pill" data-id="${s.category.id}">
              ${s.category.icon} ${s.category.name}
            </button>
          `).join('')}
        </div>
      ` : ''}

      <button class="is-link-btn" id="showAllBtn">Voir toutes les catégories →</button>
    </div>
  `;

  document.getElementById('confirmBtn').addEventListener('click', () => selectCategory(cat));

  document.querySelectorAll('.is-alt-pill').forEach(btn => {
    btn.addEventListener('click', () => {
      const c = CATEGORIES.find(c => c.id === btn.dataset.id);
      if (c) selectCategory(c);
    });
  });

  document.getElementById('showAllBtn').addEventListener('click', () => renderCategoryGrid(result));
}

function renderCategoryGrid(result) {
  app().innerHTML = `
    <div class="is-category-grid-page">
      <h2>Choisis ton industrie</h2>
      <p>42 catégories avec des benchmarks financiers réels.</p>

      ${CATEGORY_GROUPS.map(group => `
        <h3 class="is-group-title">${group.name}</h3>
        <div class="is-category-grid">
          ${group.ids.map(id => {
            const cat = CATEGORIES.find(c => c.id === id);
            return `
              <button class="is-category-card" data-id="${cat.id}">
                <span class="is-category-card__icon">${cat.icon}</span>
                <span class="is-category-card__name">${cat.name}</span>
              </button>
            `;
          }).join('')}
        </div>
      `).join('')}

      <button class="is-link-btn" id="backToIdea">← Modifier mon idée</button>
    </div>
  `;

  document.querySelectorAll('.is-category-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const cat = CATEGORIES.find(c => c.id === btn.dataset.id);
      if (cat) selectCategory(cat);
    });
  });

  document.getElementById('backToIdea')?.addEventListener('click', () => {
    state.phase = 'idea';
    render();
  });
}

function selectCategory(cat) {
  state.selectedCategory = cat;
  state.allQuestions = [...UNIVERSAL_QUESTIONS, ...cat.specificQuestions];
  state.currentQuestion = 0;
  state.answers = {};
  state.phase = 'questions';
  render();
}

// --- PHASE 3 : QUESTIONS ---
function renderQuestions() {
  const q = state.allQuestions[state.currentQuestion];
  const total = state.allQuestions.length;
  const progress = ((state.currentQuestion + 1) / total) * 100;
  const isUniversal = state.currentQuestion < UNIVERSAL_QUESTIONS.length;

  const cat = state.selectedCategory;
  const ltvCac = (cat.ltv / Math.max(1, cat.cac)).toFixed(1);

  app().innerHTML = `
    <div class="is-questions">
      <div class="is-sector-banner">
        <div class="is-sector-banner__info">
          <span class="is-sector-banner__icon">${cat.icon}</span>
          <div>
            <span class="is-sector-banner__group">${cat.group}</span>
            <strong>${cat.name}</strong>
          </div>
        </div>
        <div class="is-sector-banner__stats">
          <span>Marge ${Math.round(cat.grossMargin * 100)}%</span>
          <span>BE ${cat.breakEvenMonths} mois</span>
          <span>LTV:CAC ${ltvCac}</span>
        </div>
        <button class="is-sector-banner__change" id="changeSector">Changer</button>
      </div>
      <div class="is-questions__progress">
        <div class="is-questions__bar" style="width: ${progress}%"></div>
      </div>
      <div class="is-questions__meta">
        <span>${isUniversal ? '📋 Questions générales' : `${cat.icon} ${cat.name}`}</span>
        <span>${state.currentQuestion + 1} / ${total}</span>
      </div>

      <div class="is-question-card">
        <h3>${q.question}</h3>
        ${q.hint ? `<p class="is-question-card__hint">${q.hint}</p>` : ''}

        <div class="is-options">
          ${q.options.map((opt, i) => `
            <button class="is-option ${state.answers[q.id] === i ? 'is-option--selected' : ''}" data-idx="${i}">
              ${opt.text}
            </button>
          `).join('')}
        </div>
      </div>

      <div class="is-questions__nav">
        <button class="is-nav-btn" id="prevBtn" ${state.currentQuestion === 0 ? 'disabled' : ''}>← Précédent</button>
        <button class="btn btn--primary is-nav-btn" id="nextBtn" ${state.answers[q.id] == null ? 'disabled' : ''}>
          ${state.currentQuestion === total - 1 ? 'Voir mon score →' : 'Suivant →'}
        </button>
      </div>
    </div>
  `;

  document.querySelectorAll('.is-option').forEach(btn => {
    btn.addEventListener('click', () => {
      state.answers[q.id] = parseInt(btn.dataset.idx);
      render();
    });
  });

  document.getElementById('changeSector')?.addEventListener('click', () => {
    const result = classifyIdea(state.ideaText);
    renderCategoryGrid(result);
  });

  document.getElementById('prevBtn').addEventListener('click', () => {
    if (state.currentQuestion > 0) { state.currentQuestion--; render(); }
  });

  document.getElementById('nextBtn').addEventListener('click', () => {
    if (state.answers[q.id] == null) return;
    if (state.currentQuestion < total - 1) {
      state.currentQuestion++;
      render();
    } else {
      state.phase = 'adjustments';
      render();
    }
  });
}

// --- PHASE 3B : ADJUSTMENTS (sliders calibrés par industrie) ---
function renderAdjustments() {
  const cat = state.selectedCategory;
  const startupLow = Math.round(cat.medianInvestment * 0.3);
  const startupHigh = Math.round(cat.medianInvestment * 3);
  const budgetStep = Math.max(500, Math.round(startupLow / 10));
  const defaultBudget = state.adjustments.budget || cat.medianInvestment;
  const defaultCogs = state.adjustments.cogs != null ? state.adjustments.cogs : Math.round(cat.cogs * 100);
  const defaultPrice = state.adjustments.avgPrice || cat.avgTicket;
  const defaultRent = state.adjustments.rent || 0;

  app().innerHTML = `
    <div class="is-adjustments">
      <div class="is-adjustments__header">
        <div class="is-adjustments__icon">${cat.icon}</div>
        <h2>Ajuste tes paramètres</h2>
        <p>Benchmarks de <strong>${cat.name}</strong>. Si tu connais tes vrais chiffres, ajuste-les. Sinon, on utilise les moyennes de ton industrie.</p>
      </div>

      <div class="is-slider-group">
        <label>Budget initial disponible</label>
        <div class="is-slider-value" id="budgetVal">${defaultBudget.toLocaleString('fr-CA')} $</div>
        <input type="range" class="is-slider" id="sliderBudget" min="${startupLow}" max="${startupHigh}" value="${defaultBudget}" step="${budgetStep}">
        <div class="is-slider-hint">Investissement médian pour ${cat.name} : <strong>${cat.medianInvestment.toLocaleString('fr-CA')} $</strong></div>
      </div>

      <div class="is-slider-group">
        <label>Coût des marchandises (COGS)</label>
        <div class="is-slider-value" id="cogsVal">${defaultCogs}%</div>
        <input type="range" class="is-slider" id="sliderCogs" min="5" max="85" value="${defaultCogs}" step="1">
        <div class="is-slider-hint">Moyenne industrie : <strong>${Math.round(cat.cogs * 100)}%</strong> — Marge brute : <span id="marginPreview">${100 - defaultCogs}%</span></div>
      </div>

      <div class="is-slider-group">
        <label>Prix moyen par transaction</label>
        <div class="is-slider-value" id="priceVal">${defaultPrice.toLocaleString('fr-CA')} $</div>
        <input type="range" class="is-slider" id="sliderPrice" min="${Math.max(5, Math.round(cat.avgTicket * 0.3))}" max="${Math.round(cat.avgTicket * 5)}" value="${defaultPrice}" step="${Math.max(1, Math.round(cat.avgTicket * 0.05))}">
        <div class="is-slider-hint">Moyenne industrie : <strong>${cat.avgTicket.toLocaleString('fr-CA')} $</strong></div>
      </div>

      <div class="is-slider-group">
        <label>Loyer mensuel estimé</label>
        <div class="is-slider-value" id="rentVal">${defaultRent.toLocaleString('fr-CA')} $</div>
        <input type="range" class="is-slider" id="sliderRent" min="0" max="10000" value="${defaultRent}" step="100">
        <div class="is-slider-hint">0 $ si tu travailles de chez toi ou en ligne</div>
      </div>

      <div class="is-questions__nav">
        <button class="is-nav-btn" id="adjBack">← Questions</button>
        <button class="btn btn--primary is-nav-btn is-calc-btn" id="adjCalc">Calculer mon IdeaScore →</button>
      </div>
    </div>
  `;

  // Bind sliders
  const sliderBudget = document.getElementById('sliderBudget');
  const sliderCogs = document.getElementById('sliderCogs');
  const sliderPrice = document.getElementById('sliderPrice');
  const sliderRent = document.getElementById('sliderRent');

  sliderBudget.addEventListener('input', () => {
    document.getElementById('budgetVal').textContent = parseInt(sliderBudget.value).toLocaleString('fr-CA') + ' $';
  });
  sliderCogs.addEventListener('input', () => {
    const v = parseInt(sliderCogs.value);
    document.getElementById('cogsVal').textContent = v + '%';
    document.getElementById('marginPreview').textContent = (100 - v) + '%';
  });
  sliderPrice.addEventListener('input', () => {
    document.getElementById('priceVal').textContent = parseInt(sliderPrice.value).toLocaleString('fr-CA') + ' $';
  });
  sliderRent.addEventListener('input', () => {
    document.getElementById('rentVal').textContent = parseInt(sliderRent.value).toLocaleString('fr-CA') + ' $';
  });

  document.getElementById('adjBack').addEventListener('click', () => {
    // Save current slider values
    state.adjustments = {
      budget: parseInt(sliderBudget.value),
      cogs: parseInt(sliderCogs.value),
      avgPrice: parseInt(sliderPrice.value),
      rent: parseInt(sliderRent.value)
    };
    state.phase = 'questions';
    render();
  });

  document.getElementById('adjCalc').addEventListener('click', () => {
    state.adjustments = {
      budget: parseInt(sliderBudget.value),
      cogs: parseInt(sliderCogs.value),
      avgPrice: parseInt(sliderPrice.value),
      rent: parseInt(sliderRent.value)
    };
    state.phase = 'calculating';
    render();
  });
}

// --- PHASE 4 : CALCULATING ---
function renderCalculating() {
  // Calculate everything using slider adjustments
  const cat = state.selectedCategory;
  const adj = state.adjustments;
  const geoQ = UNIVERSAL_QUESTIONS.find(q => q.id === 'uq4');
  const geoIdx = state.answers.uq4;
  const inputs = {
    investment: adj.budget || cat.medianInvestment,
    expectedRevenue: (adj.avgPrice || cat.avgTicket) * 20 * 12,
    geo: geoIdx != null && geoQ ? geoQ.options[geoIdx].value : 'suburban',
    cogs: adj.cogs != null ? adj.cogs / 100 : cat.cogs,
    avgPrice: adj.avgPrice || cat.avgTicket,
    rent: adj.rent || 0
  };
  state.geo = inputs.geo;

  // Bonus points from answers
  let bonus = 0;
  state.allQuestions.forEach(q => {
    if (state.answers[q.id] != null) {
      const opt = q.options[state.answers[q.id]];
      if (opt.score) bonus += opt.score;
    }
  });
  // Normalize bonus: max possible ~50-60, we want max +10
  const maxPossible = state.allQuestions.reduce((s, q) => s + Math.max(...q.options.map(o => o.score || 0)), 0);
  bonus = Math.round((bonus / Math.max(1, maxPossible)) * 10);

  state.subScores = calculateSubScores(cat, inputs);
  state.score = calculateFinalScore(state.subScores, bonus);
  state.projections = calculateProjections(cat, inputs, 'modere');
  saveResults();

  // Show animated calculation steps, then score reveal
  const verdict = getVerdict(state.score);
  app().innerHTML = `
    <div class="is-calculating">
      <div class="is-calc-steps" id="calcSteps">
        <div class="is-analyzing__spinner"></div>
        <p class="is-calc-status">Analyse en cours...</p>
        <div class="is-calc-step-list">
          <div class="is-analyzing__step" id="cs1">Classification de l'industrie...</div>
          <div class="is-analyzing__step" id="cs2">Chargement des benchmarks ${cat.name}...</div>
          <div class="is-analyzing__step" id="cs3">Calcul des 8 facteurs de viabilité...</div>
          <div class="is-analyzing__step" id="cs4">Ajustement géographique et saisonnier...</div>
          <div class="is-analyzing__step" id="cs5">Génération du score final...</div>
        </div>
      </div>
      <div class="is-score-reveal" id="scoreReveal" style="display:none">
        <div class="is-score-gauge" style="--score: 0; --color: ${verdict.color}">
          <span class="is-score-gauge__value" id="scoreCounter">0</span>
          <span class="is-score-gauge__label">/100</span>
        </div>
        <p class="is-calculating__verdict" id="verdictText" style="opacity: 0">${verdict.emoji} ${verdict.text}</p>
        <button class="btn btn--primary is-reveal-btn" id="revealBtn" style="opacity: 0">Voir mon rapport complet →</button>
      </div>
    </div>
  `;

  // Progressive step animation
  setTimeout(() => document.getElementById('cs1')?.classList.add('is-analyzing__step--done'), 500);
  setTimeout(() => document.getElementById('cs2')?.classList.add('is-analyzing__step--done'), 1200);
  setTimeout(() => document.getElementById('cs3')?.classList.add('is-analyzing__step--done'), 2000);
  setTimeout(() => document.getElementById('cs4')?.classList.add('is-analyzing__step--done'), 2800);
  setTimeout(() => document.getElementById('cs5')?.classList.add('is-analyzing__step--done'), 3500);

  // Transition to score reveal
  setTimeout(() => {
    const steps = document.getElementById('calcSteps');
    const reveal = document.getElementById('scoreReveal');
    if (steps) steps.style.display = 'none';
    if (reveal) reveal.style.display = 'block';
  }, 4000);

  // Animate counter after steps complete
  setTimeout(() => {
    const counter = document.getElementById('scoreCounter');
    const gauge = document.querySelector('.is-score-gauge');
    if (!counter || !gauge) return;
    let current = 0;
    const step = Math.max(1, Math.floor(state.score / 30));
    const interval = setInterval(() => {
      current = Math.min(current + step, state.score);
      counter.textContent = current;
      gauge.style.setProperty('--score', current);
      if (current >= state.score) {
        clearInterval(interval);
        document.getElementById('verdictText').style.opacity = '1';
        setTimeout(() => {
          document.getElementById('revealBtn').style.opacity = '1';
        }, 400);
      }
    }, 40);
  }, 4200);

  document.getElementById('revealBtn').addEventListener('click', () => {
    state.phase = 'dashboard';
    render();
  });
}

// --- PHASE 5 : DASHBOARD ---
function renderDashboard() {
  const cat = state.selectedCategory;
  const v = getVerdict(state.score);
  const proj = state.projections;
  const yr1Rev = proj.reduce((s, m) => s + m.revenue, 0);
  const yr1Net = proj.reduce((s, m) => s + m.net, 0);
  const beMonth = proj.findIndex(m => m.cumul >= 0);

  // Summaries
  const summaries = [
    `Marge brute de ${Math.round(cat.grossMargin * 100)}% — ${cat.grossMargin >= 0.60 ? 'supérieure à la moyenne' : cat.grossMargin >= 0.40 ? 'dans la norme' : 'sous la moyenne'}`,
    `Break-even estimé à ${cat.breakEvenMonths} mois — ${cat.breakEvenMonths <= 6 ? 'excellent' : cat.breakEvenMonths <= 12 ? 'rapide' : cat.breakEvenMonths <= 18 ? 'dans la norme' : 'long'}`,
    `Ratio LTV:CAC de ${(cat.ltv / cat.cac).toFixed(1)} — ${(cat.ltv / cat.cac) >= 4 ? 'excellent' : (cat.ltv / cat.cac) >= 2.5 ? 'bon' : 'à surveiller'}`
  ];

  const factorLabels = {
    grossMargin: 'Marge brute',
    investmentRatio: 'Ratio investissement/revenu',
    breakEvenTime: 'Temps pour le break-even',
    ltvCacRatio: 'Ratio LTV:CAC',
    seasonalRisk: 'Risque saisonnier',
    marketSize: 'Taille du marché',
    barriers: 'Barrières à l\'entrée',
    scalability: 'Scalabilité'
  };

  app().innerHTML = `
    <div class="is-dashboard">
      <button class="is-link-btn" id="restartBtn">← Tester une autre idée</button>

      <!-- SCORE HEADER -->
      <div class="is-dash-header">
        <div class="is-score-gauge is-score-gauge--small" style="--score: ${state.score}; --color: ${v.color}">
          <span class="is-score-gauge__value">${state.score}</span>
          <span class="is-score-gauge__label">/100</span>
        </div>
        <div class="is-dash-header__text">
          <h2>${v.emoji} ${v.text}</h2>
          <div class="is-dash-header__category">${cat.icon} ${cat.name}</div>
          <p class="is-dash-header__idea">"${state.ideaText.substring(0, 100)}${state.ideaText.length > 100 ? '...' : ''}"</p>
        </div>
      </div>

      <!-- SUMMARY (gratuit) -->
      <div class="is-dash-summary">
        ${summaries.map(s => `<div class="is-dash-summary__item">✓ ${s}</div>`).join('')}
      </div>

      <!-- 8 FACTOR BARS (gratuit) -->
      <div class="is-dash-factors">
        <h3>Analyse détaillée — 8 facteurs</h3>
        ${Object.entries(state.subScores).map(([key, score]) => `
          <div class="is-factor-bar">
            <div class="is-factor-bar__header">
              <span>${factorLabels[key]}</span>
              <strong>${Math.round(score)}/100</strong>
            </div>
            <div class="is-factor-bar__track">
              <div class="is-factor-bar__fill" style="width: ${score}%; background: ${score >= 70 ? '#22c55e' : score >= 50 ? '#f59e0b' : '#ef4444'}"></div>
            </div>
          </div>
        `).join('')}
      </div>

      <!-- KPIs RAPIDES (gratuit) -->
      <div class="is-dash-kpis">
        <div class="is-kpi"><span class="is-kpi__value">${fmt(yr1Rev)}</span><span class="is-kpi__label">Revenu estimé An 1</span></div>
        <div class="is-kpi"><span class="is-kpi__value">${fmt(yr1Net)}</span><span class="is-kpi__label">Profit net estimé</span></div>
        <div class="is-kpi"><span class="is-kpi__value">${fmt(cat.medianInvestment)}</span><span class="is-kpi__label">Investissement médian</span></div>
        <div class="is-kpi"><span class="is-kpi__value">${cat.breakEvenMonths} mois</span><span class="is-kpi__label">Break-even typique</span></div>
      </div>

      <!-- CTA MODULES -->
      <div class="is-dash-cta">
        <h3>Prochaine étape</h3>
        <div class="is-dash-cta__grid">
          <a href="questionnaire.html" class="is-cta-card">
            <span>📄</span>
            <strong>Créer mon plan d'affaires</strong>
            <p>Transforme ton idée en un plan complet de 52 pages</p>
          </a>
          <a href="financier.html" class="is-cta-card">
            <span>💰</span>
            <strong>Simuler mes finances</strong>
            <p>Dashboard interactif avec projections sur 5 ans</p>
          </a>
        </div>
      </div>

      <!-- PRO SECTION (blurred for free) -->
      <div class="is-pro-section ${state.tier === 'free' ? 'is-pro--locked' : ''}">
        <h3>Projections financières — 12 mois</h3>
        <div class="is-chart-container"><canvas id="chartProjections"></canvas></div>

        <h3>Courbe de saisonnalité</h3>
        <div class="is-chart-container"><canvas id="chartSeason"></canvas></div>

        <h3>3 scénarios comparés</h3>
        <div class="is-scenarios-grid">
          ${Object.entries(SCENARIOS).map(([key, s]) => {
            const scenProj = calculateProjections(cat, {
              investment: state.adjustments.budget || cat.medianInvestment,
              expectedRevenue: (state.adjustments.avgPrice || cat.avgTicket) * 20 * 12,
              geo: state.geo
            }, key);
            const sRev = scenProj.reduce((sum, m) => sum + m.revenue, 0);
            const sNet = scenProj.reduce((sum, m) => sum + m.net, 0);
            return `
              <div class="is-scenario-card" style="border-top: 4px solid ${s.color}">
                <h4>${s.icon} ${s.name}</h4>
                <div><span>Revenu An 1</span><strong>${fmt(sRev)}</strong></div>
                <div><span>Profit net</span><strong style="color:${sNet >= 0 ? '#22c55e' : '#ef4444'}">${fmt(sNet)}</strong></div>
              </div>
            `;
          }).join('')}
        </div>
      </div>

      ${state.tier === 'free' ? `
        <div class="is-pro-overlay">
          <div class="is-pro-overlay__content">
            <h3>Débloquer le rapport complet</h3>
            <ul>
              <li>📊 Projections mensuelles détaillées</li>
              <li>🎯 3 scénarios financiers (conservateur, modéré, optimiste)</li>
              <li>📈 Courbe de saisonnalité de ton industrie</li>
              <li>📥 Export PDF</li>
            </ul>
            <button class="btn btn--primary is-unlock-btn" id="unlockBtn">Débloquer pour 29$ →</button>
            <p class="is-pro-overlay__or">ou <a href="#" id="unlockFreeBtn">débloquer gratuitement</a> (démo)</p>
          </div>
        </div>
      ` : ''}

      <!-- ACTIONS -->
      <div class="is-dash-actions">
        <button class="btn btn--secondary" id="restartBtn2">Scorer une autre idée</button>
        <button class="btn btn--secondary" id="shareBtn">Partager mon score</button>
      </div>

      <!-- NOTES -->
      <div class="is-notes">
        <p>Données basées sur les moyennes sectorielles (NYU Stern, BDC, Statistique Canada). Score calculé sur 8 facteurs pondérés. Les projections sont des estimations à des fins de planification — pas des garanties.</p>
      </div>
    </div>
  `;

  // Bind events
  document.getElementById('restartBtn').addEventListener('click', () => {
    state.phase = 'idea';
    state.ideaText = '';
    state.selectedCategory = null;
    state.answers = {};
    state.score = null;
    render();
  });

  document.getElementById('restartBtn2')?.addEventListener('click', () => {
    state.phase = 'idea';
    state.ideaText = '';
    state.selectedCategory = null;
    state.answers = {};
    state.adjustments = {};
    state.score = null;
    render();
  });

  document.getElementById('shareBtn')?.addEventListener('click', () => {
    const text = `Mon idée de business a obtenu un score de ${state.score}/100 sur IdeaScore Pro!\n${cat.icon} ${cat.name} — ${state.score >= 70 ? 'Viable!' : 'À travailler...'}\n\nScore ton idée gratuitement sur bildop.com`;
    if (navigator.share) {
      navigator.share({ title: 'Mon IdeaScore', text });
    } else {
      navigator.clipboard.writeText(text).then(() => {
        const btn = document.getElementById('shareBtn');
        if (btn) { btn.textContent = 'Copié!'; setTimeout(() => btn.textContent = 'Partager mon score', 2000); }
      });
    }
  });

  document.getElementById('unlockBtn')?.addEventListener('click', () => {
    // Future: payment integration
    state.tier = 'pro';
    render();
  });

  document.getElementById('unlockFreeBtn')?.addEventListener('click', (e) => {
    e.preventDefault();
    state.tier = 'pro';
    render();
  });

  // Charts (render even if blurred)
  if (typeof Chart !== 'undefined') {
    // Projections chart
    state.charts.proj = new Chart(document.getElementById('chartProjections'), {
      type: 'bar',
      data: {
        labels: proj.map(m => m.month),
        datasets: [
          { label: 'Revenus', data: proj.map(m => m.revenue), backgroundColor: 'rgba(245,158,11,0.7)', borderColor: '#f59e0b', borderWidth: 1 },
          { label: 'Profit net', data: proj.map(m => m.net), backgroundColor: proj.map(m => m.net >= 0 ? 'rgba(34,197,94,0.7)' : 'rgba(239,68,68,0.7)'), borderWidth: 1 }
        ]
      },
      options: { responsive: true, plugins: { legend: { position: 'top' } }, scales: { y: { ticks: { callback: v => fmt(v) } } } }
    });

    // Seasonality chart
    state.charts.season = new Chart(document.getElementById('chartSeason'), {
      type: 'line',
      data: {
        labels: MONTH_LABELS,
        datasets: [{
          label: 'Indice saisonnier',
          data: cat.seasonality,
          borderColor: '#f59e0b',
          backgroundColor: 'rgba(245,158,11,0.1)',
          fill: true, tension: 0.3
        }, {
          label: 'Moyenne (1.0)',
          data: Array(12).fill(1.0),
          borderColor: '#94a3b8',
          borderDash: [5, 5],
          pointRadius: 0
        }]
      },
      options: { responsive: true, scales: { y: { min: 0, max: 2 } } }
    });
  }
}

// --- INIT ---
function init() {
  // Check for existing IdeaScore data
  try {
    const saved = localStorage.getItem('bildop_ideascore');
    if (saved) {
      const data = JSON.parse(saved);
      if (data.categoryId && data.score) {
        state.selectedCategory = CATEGORIES.find(c => c.id === data.categoryId);
        state.score = data.score;
        state.subScores = data.subScores;
        state.ideaText = data.ideaText || '';
        state.answers = data.answers || {};
        state.geo = data.geo || 'suburban';
        if (state.selectedCategory) {
          const inputs = {
            investment: state.adjustments.budget || state.selectedCategory.medianInvestment,
            expectedRevenue: (state.adjustments.avgPrice || state.selectedCategory.avgTicket) * 20 * 12,
            geo: state.geo
          };
          state.projections = calculateProjections(state.selectedCategory, inputs, 'modere');
          state.phase = 'dashboard';
        }
      }
    }
  } catch {}

  // Check Module 1 for pre-fill
  try {
    const q = localStorage.getItem('bildop_questionnaire');
    if (q && !state.ideaText) {
      const answers = JSON.parse(q);
      const desc = answers['q-description'] || answers['q-idee-affaires'] || answers[2];
      if (desc) state.ideaText = typeof desc === 'string' ? desc : '';
    }
  } catch {}

  render();
}

document.addEventListener('DOMContentLoaded', init);
