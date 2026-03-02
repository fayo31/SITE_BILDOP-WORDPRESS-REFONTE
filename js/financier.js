// =====================================================
// MODULE 5 — SIMULATEUR FINANCIER INTERACTIF
// Bildop — Groupe REMES
// 17 modèles corrigés + moteur de calcul + dashboard
// =====================================================

// --- 17 MODÈLES FINANCIERS CORRIGÉS ---
const FINANCIAL_MODELS = [
  {
    id: 1, name: "Commerce électronique", icon: "🛒",
    cogs: 0.50,
    opex: { salaires: 0.12, marketing: 0.10, loyer: 0.02, ga: 0.03, amortissement: 0.02, services: 0.03, autres: 0.02 },
    margeEbit: 0.16, margeNette: 0.12,
    growth: [0.45, 0.30, 0.25, 0.20, 0.15],
    curve: "ecommerce"
  },
  {
    id: 2, name: "Services / Consultation", icon: "💼",
    cogs: 0.05,
    opex: { salaires: 0.40, marketing: 0.07, loyer: 0.06, ga: 0.05, amortissement: 0.02, services: 0.03, autres: 0.02 },
    margeEbit: 0.30, margeNette: 0.225,
    growth: [0.30, 0.25, 0.20, 0.15, 0.10],
    curve: "services"
  },
  {
    id: 3, name: "Restaurant / Alimentation", icon: "🍽️",
    cogs: 0.32,
    opex: { salaires: 0.28, marketing: 0.03, loyer: 0.08, ga: 0.03, amortissement: 0.03, services: 0.03, autres: 0.02 },
    margeEbit: 0.18, margeNette: 0.135,
    growth: [0.20, 0.18, 0.15, 0.12, 0.10],
    curve: "restaurant"
  },
  {
    id: 4, name: "SaaS / Technologies", icon: "💻",
    cogs: 0.20,
    opex: { salaires: 0.30, marketing: 0.20, loyer: 0.02, ga: 0.03, amortissement: 0.03, services: 0.02, autres: 0.02 },
    margeEbit: 0.18, margeNette: 0.135,
    growth: [0.50, 0.30, 0.25, 0.20, 0.15],
    curve: "saas"
  },
  {
    id: 5, name: "Construction", icon: "🏗️",
    cogs: 0.55,
    opex: { salaires: 0.18, marketing: 0.02, loyer: 0.03, ga: 0.04, amortissement: 0.04, services: 0.02, autres: 0.02 },
    margeEbit: 0.10, margeNette: 0.075,
    growth: [0.10, 0.08, 0.06, 0.05, 0.05],
    curve: "construction"
  },
  {
    id: 6, name: "Magasin physique (Retail)", icon: "🏪",
    cogs: 0.55,
    opex: { salaires: 0.15, marketing: 0.03, loyer: 0.07, ga: 0.03, amortissement: 0.02, services: 0.02, autres: 0.02 },
    margeEbit: 0.11, margeNette: 0.082,
    growth: [0.15, 0.12, 0.10, 0.08, 0.05],
    curve: "retail"
  },
  {
    id: 7, name: "Fabrication / Production", icon: "🏭",
    cogs: 0.60,
    opex: { salaires: 0.10, marketing: 0.02, loyer: 0.04, ga: 0.04, amortissement: 0.05, services: 0.02, autres: 0.02 },
    margeEbit: 0.11, margeNette: 0.082,
    growth: [0.15, 0.12, 0.10, 0.08, 0.05],
    curve: "steady"
  },
  {
    id: 8, name: "Distribution / Grossiste", icon: "📦",
    cogs: 0.72,
    opex: { salaires: 0.07, marketing: 0.02, loyer: 0.03, ga: 0.03, amortissement: 0.02, services: 0.02, autres: 0.01 },
    margeEbit: 0.08, margeNette: 0.06,
    growth: [0.15, 0.12, 0.10, 0.08, 0.05],
    curve: "steady"
  },
  {
    id: 9, name: "Franchise / Licence", icon: "🔑",
    cogs: 0.10,
    opex: { salaires: 0.15, marketing: 0.08, loyer: 0.05, ga: 0.05, amortissement: 0.05, services: 0.05, autres: 0.05 },
    margeEbit: 0.42, margeNette: 0.315,
    growth: [0.35, 0.30, 0.20, 0.15, 0.10],
    curve: "services"
  },
  {
    id: 10, name: "Immobilier", icon: "🏠",
    cogs: 0.25,
    opex: { salaires: 0.10, marketing: 0.05, loyer: 0.05, ga: 0.05, amortissement: 0.05, services: 0.05, autres: 0.05 },
    margeEbit: 0.35, margeNette: 0.262,
    growth: [0.10, 0.08, 0.07, 0.06, 0.05],
    curve: "steady"
  },
  {
    id: 11, name: "Contenu / Médias", icon: "🎬",
    cogs: 0.15,
    opex: { salaires: 0.28, marketing: 0.12, loyer: 0.04, ga: 0.04, amortissement: 0.02, services: 0.02, autres: 0.02 },
    margeEbit: 0.31, margeNette: 0.232,
    growth: [0.25, 0.22, 0.20, 0.18, 0.15],
    curve: "saas"
  },
  {
    id: 12, name: "Plateforme / Marketplace", icon: "🌐",
    cogs: 0.22,
    opex: { salaires: 0.28, marketing: 0.18, loyer: 0.02, ga: 0.04, amortissement: 0.03, services: 0.02, autres: 0.02 },
    margeEbit: 0.19, margeNette: 0.142,
    growth: [0.20, 0.18, 0.15, 0.10, 0.05],
    curve: "saas"
  },
  {
    id: 13, name: "Éducation / Formation", icon: "🎓",
    cogs: 0.12,
    opex: { salaires: 0.40, marketing: 0.08, loyer: 0.05, ga: 0.04, amortissement: 0.04, services: 0.02, autres: 0.03 },
    margeEbit: 0.22, margeNette: 0.165,
    growth: [0.15, 0.12, 0.10, 0.08, 0.05],
    curve: "services"
  },
  {
    id: 14, name: "Santé / Bien-être", icon: "🏥",
    cogs: 0.22,
    opex: { salaires: 0.35, marketing: 0.05, loyer: 0.06, ga: 0.03, amortissement: 0.04, services: 0.02, autres: 0.03 },
    margeEbit: 0.20, margeNette: 0.15,
    growth: [0.12, 0.12, 0.10, 0.08, 0.05],
    curve: "services"
  },
  {
    id: 15, name: "Économie de partage", icon: "🤝",
    cogs: 0.25,
    opex: { salaires: 0.25, marketing: 0.15, loyer: 0.02, ga: 0.04, amortissement: 0.04, services: 0.02, autres: 0.03 },
    margeEbit: 0.20, margeNette: 0.15,
    growth: [0.15, 0.12, 0.10, 0.08, 0.05],
    curve: "saas"
  },
  {
    id: 16, name: "Abonnement physique (Box)", icon: "📬",
    cogs: 0.45,
    opex: { salaires: 0.12, marketing: 0.07, loyer: 0.10, ga: 0.03, amortissement: 0.04, services: 0.02, autres: 0.02 },
    margeEbit: 0.15, margeNette: 0.112,
    growth: [0.15, 0.12, 0.10, 0.08, 0.05],
    curve: "ecommerce"
  },
  {
    id: 17, name: "Générique (autre)", icon: "📊",
    cogs: 0.38,
    opex: { salaires: 0.20, marketing: 0.08, loyer: 0.04, ga: 0.04, amortissement: 0.04, services: 0.02, autres: 0.03 },
    margeEbit: 0.17, margeNette: 0.128,
    growth: [0.15, 0.12, 0.10, 0.08, 0.05],
    curve: "steady"
  }
];

// --- COURBES DE DISTRIBUTION MENSUELLE ---
// Chaque courbe = 12 poids qui totalisent 1.0
// Règle 2 : Ne jamais diviser par 12
const MONTHLY_CURVES = {
  saas:         [0.04, 0.05, 0.06, 0.06, 0.07, 0.08, 0.09, 0.09, 0.10, 0.11, 0.12, 0.13],
  ecommerce:    [0.05, 0.05, 0.06, 0.07, 0.07, 0.08, 0.08, 0.08, 0.09, 0.10, 0.12, 0.15],
  restaurant:   [0.06, 0.06, 0.07, 0.08, 0.09, 0.10, 0.10, 0.10, 0.09, 0.09, 0.08, 0.08],
  services:     [0.05, 0.06, 0.07, 0.08, 0.08, 0.09, 0.09, 0.09, 0.09, 0.10, 0.10, 0.10],
  construction: [0.04, 0.05, 0.08, 0.10, 0.11, 0.12, 0.12, 0.11, 0.10, 0.08, 0.05, 0.04],
  retail:       [0.06, 0.06, 0.07, 0.07, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.10, 0.14],
  steady:       [0.07, 0.07, 0.08, 0.08, 0.08, 0.08, 0.09, 0.09, 0.09, 0.09, 0.09, 0.09]
};

const MONTH_NAMES = ['Jan', 'Fév', 'Mar', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sep', 'Oct', 'Nov', 'Déc'];

const OPEX_LABELS = {
  salaires: 'Salaires',
  marketing: 'Marketing',
  loyer: 'Loyer',
  ga: 'Frais généraux (G&A)',
  amortissement: 'Amortissement',
  services: 'Services & utilities',
  autres: 'Autres dépenses'
};

const TAUX_IMPOT = 0.25;

// --- ÉTAT ---
let state = {
  phase: 'select',       // 'select' | 'inputs' | 'dashboard'
  modelId: null,
  model: null,
  adnData: null,
  params: {
    revenuAnnuel: 200000,
    investissement: 50000,
    pret: 0,
    tauxInteret: 0.06,
    scenarioAjust: 0       // -0.25 pessimiste, 0 réaliste, +0.25 optimiste
  },
  overrides: {},           // Client overrides (Règle 5)
  results: null,
  charts: {}
};

// --- LOCALSTORAGE ---
// Mapping IdeaScore 27 catégories → Financier 17 modèles
const IDEASCORE_TO_FINANCIER = {
  // Alimentation & Boissons → 3 (Restaurant / Alimentation)
  food_bakery: 3,
  restaurant_quick_service: 3,
  restaurant_full_service: 3,
  bar_brewery: 3,
  food_truck_catering: 3,
  // Services professionnels → 2 (Services / Consultation)
  consulting: 2,
  coaching: 2,
  accounting_bookkeeping: 2,
  events_wedding: 2,
  pet_services: 2,
  // Beauté & Bien-être → 14 (Santé / Bien-être)
  beauty_salon: 14,
  massage_spa: 14,
  personal_training: 14,
  // Santé & Éducation
  health_wellness_clinic: 14,
  chiropractic: 14,
  dental_clinic: 14,
  home_care: 14,
  daycare: 14,
  tutoring_center: 13,
  swimming_lessons: 13,
  online_courses: 13,
  // Commerce & Production
  ecommerce_general: 1,
  ecommerce_dropshipping: 1,
  retail_physical: 6,
  agriculture_farm: 7,
  artisan_manufacturing: 7,
  // Tech & Numérique
  saas: 4,
  digital_products: 4,
  // Création & Médias
  photography: 2,
  graphic_design_freelance: 2,
  design_agency: 11,
  // Construction, Auto & Métiers
  construction_general: 5,
  construction_specialty: 5,
  auto_repair: 17,
  transport_logistics: 8,
  landscaping: 5,
  cleaning_services: 2,
  // Immobilier, Tourisme & Loisirs
  real_estate: 10,
  accommodation_rental: 10,
  tourism_adventure: 17,
  hot_air_balloon: 17,
  gym_fitness: 14,
};

function getAdnData() {
  // Source 1 : Module 1 (questionnaire)
  try {
    const raw = localStorage.getItem('bildop_questionnaire');
    if (raw) {
      const answers = JSON.parse(raw);
      const get = (id) => {
        const a = answers[id];
        if (!a) return null;
        return typeof a === 'object' ? (a.text || a.value || JSON.stringify(a)) : String(a);
      };
      return {
        source: 'questionnaire',
        nom: get('q-company-name') || get('q-nom-entreprise'),
        description: get('q-description') || get('q-idee-affaires'),
        secteur: get('q-secteur') || get('q-industrie'),
        revenu: get('q-revenu-an1') || get('q-revenue-goal'),
        investissement: get('q-investissement') || get('q-startup-cost'),
        coutsMensuels: get('q-couts-fixes') || get('q-monthly-costs'),
        prixVente: get('q-prix-vente') || get('q-price'),
        financement: get('q-financement') || get('q-funding-method'),
        montantFinancement: get('q-montant-financement') || get('q-funding-amount'),
        seuilRentabilite: get('q-seuil-rentabilite') || get('q-breakeven'),
      };
    }
  } catch {}

  // Source 2 : IdeaScore Pro (fallback)
  try {
    const raw = localStorage.getItem('bildop_ideascore');
    if (raw) {
      const is = JSON.parse(raw);
      const financierModelId = is.categoryId ? IDEASCORE_TO_FINANCIER[is.categoryId] : null;
      return {
        source: 'ideascore',
        nom: null,
        description: is.ideaText || null,
        secteur: is.categoryName || null,
        revenu: is.projections?.year1Revenue ? String(is.projections.year1Revenue) : null,
        investissement: is.projections?.investment ? String(is.projections.investment) : null,
        coutsMensuels: null,
        prixVente: null,
        financement: null,
        montantFinancement: null,
        seuilRentabilite: null,
        financierModelId,
        score: is.score || null,
      };
    }
  } catch {}

  return null;
}

function saveState() {
  const data = {
    modelId: state.modelId,
    params: state.params,
    overrides: state.overrides,
    results: state.results ? {
      globalScore: state.results.globalScore,
      breakEvenMonth: state.results.breakEvenMonth,
      margeEbit: state.results.annuel[0]?.margeEbit
    } : null,
    timestamp: Date.now()
  };
  localStorage.setItem('bildop_financier', JSON.stringify(data));
}

function loadSavedState() {
  try {
    const raw = localStorage.getItem('bildop_financier');
    if (!raw) return false;
    const data = JSON.parse(raw);
    if (data.modelId) {
      state.modelId = data.modelId;
      state.model = FINANCIAL_MODELS.find(m => m.id === data.modelId);
      if (data.params) Object.assign(state.params, data.params);
      if (data.overrides) state.overrides = data.overrides;
      return true;
    }
  } catch {}
  return false;
}

// --- MOTEUR DE CALCUL ---

// Règle 1 : Somme 12 mois = Année 1 exactement
// Règle 2 : Progression réaliste (courbes)
// Règle 3 : Intérêts = montant fixe (prêt × taux / 12)
// Règle 4 : Impôt seulement si profit > 0
// Règle 9 : Total ratios < 92%

function getEffectiveRatios(model) {
  const ratios = {
    cogs: state.overrides.cogs ?? model.cogs,
    opex: {}
  };
  for (const key in model.opex) {
    ratios.opex[key] = state.overrides[key] ?? model.opex[key];
  }
  // Règle 9 : vérifier total < 92%
  const totalOpex = Object.values(ratios.opex).reduce((s, v) => s + v, 0);
  const total = ratios.cogs + totalOpex;
  if (total > 0.92) {
    const scale = 0.90 / total; // ramener à 90% max
    ratios.cogs *= scale;
    for (const key in ratios.opex) ratios.opex[key] *= scale;
  }
  return ratios;
}

function calculateMonthlyPL(model, params) {
  const curve = MONTHLY_CURVES[model.curve] || MONTHLY_CURVES.steady;
  const ratios = getEffectiveRatios(model);
  const rev = params.revenuAnnuel;
  const interetMensuel = params.pret > 0 ? (params.pret * params.tauxInteret / 12) : 0;

  const months = [];
  let cumulProfit = -params.investissement;

  for (let i = 0; i < 12; i++) {
    const revenu = Math.round(rev * curve[i]);
    const cogs = Math.round(revenu * ratios.cogs);
    const margeBrute = revenu - cogs;

    const opex = {};
    let totalOpex = 0;
    for (const key in ratios.opex) {
      opex[key] = Math.round(revenu * ratios.opex[key]);
      totalOpex += opex[key];
    }

    const ebit = margeBrute - totalOpex;
    const interets = Math.round(interetMensuel);
    const beneficeAvantImpot = ebit - interets;
    // Règle 4 : impôt seulement si profit
    const impot = beneficeAvantImpot > 0 ? Math.round(beneficeAvantImpot * TAUX_IMPOT) : 0;
    const beneficeNet = beneficeAvantImpot - impot;
    cumulProfit += beneficeNet;

    months.push({
      mois: MONTH_NAMES[i],
      revenu, cogs, margeBrute,
      opex, totalOpex,
      ebit, interets,
      beneficeAvantImpot, impot, beneficeNet,
      cumulProfit,
      margeEbit: revenu > 0 ? ebit / revenu : 0,
      margeNette: revenu > 0 ? beneficeNet / revenu : 0
    });
  }

  return months;
}

function calculateAnnualPL(model, params) {
  const ratios = getEffectiveRatios(model);
  const years = [];
  let rev = params.revenuAnnuel;

  for (let y = 0; y < 5; y++) {
    if (y > 0) rev = Math.round(rev * (1 + model.growth[y]));
    const cogs = Math.round(rev * ratios.cogs);
    const margeBrute = rev - cogs;

    const opex = {};
    let totalOpex = 0;
    for (const key in ratios.opex) {
      opex[key] = Math.round(rev * ratios.opex[key]);
      totalOpex += opex[key];
    }

    const ebit = margeBrute - totalOpex;
    const interets = params.pret > 0 ? Math.round(params.pret * params.tauxInteret) : 0;
    const beneficeAvantImpot = ebit - interets;
    const impot = beneficeAvantImpot > 0 ? Math.round(beneficeAvantImpot * TAUX_IMPOT) : 0;
    const beneficeNet = beneficeAvantImpot - impot;

    years.push({
      annee: `An ${y + 1}`,
      revenu: rev, cogs, margeBrute,
      opex, totalOpex,
      ebit, interets,
      beneficeAvantImpot, impot, beneficeNet,
      margeEbit: rev > 0 ? ebit / rev : 0,
      margeNette: rev > 0 ? beneficeNet / rev : 0,
      margeBruteRatio: rev > 0 ? margeBrute / rev : 0
    });
  }

  return years;
}

function calculateBreakEven(monthly, investissement) {
  for (let i = 0; i < monthly.length; i++) {
    if (monthly[i].cumulProfit >= 0) return i + 1; // mois 1-12
  }
  // Si pas atteint en An 1, estimer
  const lastProfit = monthly[11].cumulProfit;
  const avgMonthlyProfit = monthly.slice(6).reduce((s, m) => s + m.beneficeNet, 0) / 6;
  if (avgMonthlyProfit > 0) {
    const moisRestants = Math.ceil(-lastProfit / avgMonthlyProfit);
    return 12 + moisRestants;
  }
  return null; // jamais rentable avec ces paramètres
}

function calculateScenarios(model, params) {
  const scenarios = [
    { nom: 'Pessimiste', ajust: -0.25, color: '#ef4444', icon: '⚠️' },
    { nom: 'Réaliste', ajust: 0, color: '#f59e0b', icon: '📊' },
    { nom: 'Optimiste', ajust: 0.25, color: '#22c55e', icon: '🚀' }
  ];

  return scenarios.map(s => {
    const adjustedParams = {
      ...params,
      revenuAnnuel: Math.round(params.revenuAnnuel * (1 + s.ajust))
    };
    const monthly = calculateMonthlyPL(model, adjustedParams);
    const annual = calculateAnnualPL(model, adjustedParams);
    const breakEven = calculateBreakEven(monthly, adjustedParams.investissement);

    return {
      ...s,
      revenuAn1: adjustedParams.revenuAnnuel,
      revenuAn5: annual[4].revenu,
      profitAn1: annual[0].beneficeNet,
      profitAn5: annual[4].beneficeNet,
      margeAn1: annual[0].margeNette,
      breakEven,
      monthly,
      annual
    };
  });
}

function calculateAll() {
  const { model, params } = state;
  if (!model) return;

  const monthly = calculateMonthlyPL(model, params);
  const annuel = calculateAnnualPL(model, params);
  const breakEvenMonth = calculateBreakEven(monthly, params.investissement);
  const scenarios = calculateScenarios(model, params);

  // Score de santé financière (0-100)
  const margeScore = Math.min(annuel[0].margeEbit / 0.30 * 40, 40);
  const breakEvenScore = breakEvenMonth ? Math.max(0, (24 - breakEvenMonth) / 24 * 30) : 0;
  const growthScore = Math.min((annuel[4].revenu / annuel[0].revenu - 1) / 2 * 30, 30);
  const globalScore = Math.round(margeScore + breakEvenScore + growthScore);

  state.results = { monthly, annuel, breakEvenMonth, scenarios, globalScore };
  saveState();
  return state.results;
}

// --- FORMATAGE ---
function fmt(n) {
  if (n == null) return '—';
  const abs = Math.abs(Math.round(n));
  const formatted = abs.toLocaleString('fr-CA');
  return n < 0 ? `-${formatted} $` : `${formatted} $`;
}

function fmtPct(n) {
  if (n == null) return '—';
  return `${(n * 100).toFixed(1)}%`;
}

function scoreColor(score) {
  if (score >= 71) return '#22c55e';
  if (score >= 41) return '#f59e0b';
  return '#ef4444';
}

function scoreLabel(score) {
  if (score >= 71) return 'Ton modèle financier est solide';
  if (score >= 41) return 'Viable mais fragile — optimise tes marges';
  return 'Attention — ce modèle nécessite des ajustements';
}

// --- RENDU UI ---
const app = () => document.getElementById('financierApp');

function render() {
  switch (state.phase) {
    case 'select': renderModelSelector(); break;
    case 'inputs': renderInputForm(); break;
    case 'dashboard': renderDashboard(); break;
  }
}

function renderModelSelector() {
  state.adnData = getAdnData();

  const adnBanner = state.adnData ? (state.adnData.source === 'ideascore' ? `
    <div class="fin-adn-banner fin-adn-banner--found">
      <span class="fin-adn-banner__icon">🎯</span>
      <div>
        <strong>IdeaScore détecté — ${state.adnData.secteur || 'Ton idée'}</strong>
        <p>Ton score de ${state.adnData.score || '—'}/100 et tes projections pré-remplissent le simulateur.${state.adnData.financierModelId ? ' <strong>Industrie recommandée en surbrillance.</strong>' : ''}</p>
      </div>
    </div>
  ` : `
    <div class="fin-adn-banner fin-adn-banner--found">
      <span class="fin-adn-banner__icon">🧬</span>
      <div>
        <strong>ADN détecté — ${state.adnData.nom || 'Ton entreprise'}</strong>
        <p>Les données de ton plan d'affaires seront utilisées pour pré-remplir le simulateur.</p>
      </div>
    </div>
  `) : `
    <div class="fin-adn-banner fin-adn-banner--empty">
      <span class="fin-adn-banner__icon">💡</span>
      <div>
        <strong>Aucun outil complété</strong>
        <p><a href="ideascore.html">Teste ton idée avec IdeaScore</a> ou <a href="questionnaire.html">remplis le Module 1</a> pour pré-remplir le simulateur.</p>
      </div>
    </div>
  `;

  app().innerHTML = `
    <div class="fin-intro">
      <div class="fin-hero">
        <h1>💰 Simulateur Financier</h1>
        <p class="fin-hero__sub">Visualise tes projections, teste des scénarios et valide ton modèle avant d'aller voir ta banque.</p>
      </div>

      ${adnBanner}

      <h2 class="fin-section-title">Sélectionne ton industrie</h2>
      <p class="fin-section-desc">Chaque industrie a ses propres ratios financiers. On utilise des données validées pour 17 secteurs.</p>

      <div class="fin-models-grid">
        ${FINANCIAL_MODELS.map(m => {
          const recommended = state.adnData?.financierModelId === m.id;
          return `
          <button class="fin-model-card${recommended ? ' fin-model-card--recommended' : ''}" data-id="${m.id}">
            ${recommended ? '<span class="fin-model-card__badge">Recommandé</span>' : ''}
            <span class="fin-model-card__icon">${m.icon}</span>
            <span class="fin-model-card__name">${m.name}</span>
            <span class="fin-model-card__margin">Marge EBIT: ${fmtPct(m.margeEbit)}</span>
          </button>`;
        }).join('')}
      </div>
    </div>
  `;

  app().querySelectorAll('.fin-model-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = parseInt(btn.dataset.id);
      state.modelId = id;
      state.model = FINANCIAL_MODELS.find(m => m.id === id);
      state.phase = 'inputs';
      render();
    });
  });
}

function renderInputForm() {
  const m = state.model;
  const adn = state.adnData || {};

  // Pré-remplir depuis Module 1 si disponible
  if (adn.revenu) {
    const rev = parseInt(String(adn.revenu).replace(/\D/g, ''));
    if (rev > 0) state.params.revenuAnnuel = rev;
  }
  if (adn.investissement) {
    const inv = parseInt(String(adn.investissement).replace(/\D/g, ''));
    if (inv > 0) state.params.investissement = inv;
  }
  if (adn.montantFinancement) {
    const fin = parseInt(String(adn.montantFinancement).replace(/\D/g, ''));
    if (fin > 0) state.params.pret = fin;
  }

  app().innerHTML = `
    <div class="fin-inputs">
      <button class="fin-back-btn" id="backToSelect">← Changer d'industrie</button>

      <div class="fin-inputs__header">
        <span class="fin-inputs__icon">${m.icon}</span>
        <div>
          <h2>${m.name}</h2>
          <p>Marge EBIT moyenne : <strong>${fmtPct(m.margeEbit)}</strong> · Marge nette : <strong>${fmtPct(m.margeNette)}</strong></p>
        </div>
      </div>

      <div class="fin-inputs__form">
        <div class="fin-input-group">
          <label for="revenu">Revenu annuel visé (An 1)</label>
          <div class="fin-input-wrap">
            <input type="number" id="revenu" value="${state.params.revenuAnnuel}" min="10000" step="10000">
            <span class="fin-input-suffix">$</span>
          </div>
          <small>Combien tu penses générer en première année?</small>
        </div>

        <div class="fin-input-group">
          <label for="investissement">Investissement initial</label>
          <div class="fin-input-wrap">
            <input type="number" id="investissement" value="${state.params.investissement}" min="0" step="5000">
            <span class="fin-input-suffix">$</span>
          </div>
          <small>Tout ce que tu mets avant de lancer (équipement, inventaire, etc.)</small>
        </div>

        <div class="fin-input-group">
          <label for="pret">Montant du prêt (si applicable)</label>
          <div class="fin-input-wrap">
            <input type="number" id="pret" value="${state.params.pret}" min="0" step="5000">
            <span class="fin-input-suffix">$</span>
          </div>
          <small>Laisse à 0 si pas de prêt</small>
        </div>

        <div class="fin-input-group">
          <label for="tauxInteret">Taux d'intérêt annuel</label>
          <div class="fin-input-wrap">
            <input type="number" id="tauxInteret" value="${(state.params.tauxInteret * 100).toFixed(1)}" min="0" max="30" step="0.5">
            <span class="fin-input-suffix">%</span>
          </div>
        </div>

        <button class="btn btn--primary fin-generate-btn" id="generateBtn">
          Générer mon tableau de bord financier →
        </button>
      </div>
    </div>
  `;

  document.getElementById('backToSelect').addEventListener('click', () => {
    state.phase = 'select';
    render();
  });

  document.getElementById('generateBtn').addEventListener('click', () => {
    state.params.revenuAnnuel = parseInt(document.getElementById('revenu').value) || 200000;
    state.params.investissement = parseInt(document.getElementById('investissement').value) || 50000;
    state.params.pret = parseInt(document.getElementById('pret').value) || 0;
    state.params.tauxInteret = parseFloat(document.getElementById('tauxInteret').value) / 100 || 0.06;
    calculateAll();
    state.phase = 'dashboard';
    render();
  });
}

function renderDashboard() {
  const r = state.results;
  if (!r) { calculateAll(); return renderDashboard(); }
  const m = state.model;

  app().innerHTML = `
    <div class="fin-dashboard">
      <button class="fin-back-btn" id="backToInputs">← Modifier mes paramètres</button>

      <!-- Score global -->
      <div class="fin-score-card">
        <div class="fin-score-card__header">
          <span>${m.icon}</span>
          <h2>${m.name}</h2>
        </div>
        <div class="fin-score-card__score">
          <div class="fin-score-ring" style="--score: ${r.globalScore}; --color: ${scoreColor(r.globalScore)}">
            <span class="fin-score-ring__value">${r.globalScore}</span>
            <span class="fin-score-ring__label">/100</span>
          </div>
          <p class="fin-score-card__verdict">${scoreLabel(r.globalScore)}</p>
        </div>
        <div class="fin-score-card__kpis">
          <div class="fin-kpi">
            <span class="fin-kpi__value">${fmt(r.annuel[0].revenu)}</span>
            <span class="fin-kpi__label">Revenu An 1</span>
          </div>
          <div class="fin-kpi">
            <span class="fin-kpi__value">${fmt(r.annuel[0].beneficeNet)}</span>
            <span class="fin-kpi__label">Profit net An 1</span>
          </div>
          <div class="fin-kpi">
            <span class="fin-kpi__value">${r.breakEvenMonth ? `Mois ${r.breakEvenMonth}` : 'Non atteint'}</span>
            <span class="fin-kpi__label">Seuil de rentabilité</span>
          </div>
          <div class="fin-kpi">
            <span class="fin-kpi__value">${fmt(r.annuel[4].revenu)}</span>
            <span class="fin-kpi__label">Revenu An 5</span>
          </div>
        </div>
      </div>

      <!-- Sliders interactifs -->
      <div class="fin-sliders">
        <h3>Ajuste tes hypothèses</h3>
        <div class="fin-sliders__grid">
          <div class="fin-slider-item">
            <label>Revenu An 1 : <strong id="sliderRevLabel">${fmt(state.params.revenuAnnuel)}</strong></label>
            <input type="range" id="sliderRev" min="50000" max="2000000" step="10000" value="${state.params.revenuAnnuel}">
          </div>
          <div class="fin-slider-item">
            <label>Investissement : <strong id="sliderInvLabel">${fmt(state.params.investissement)}</strong></label>
            <input type="range" id="sliderInv" min="0" max="500000" step="5000" value="${state.params.investissement}">
          </div>
          <div class="fin-slider-item">
            <label>COGS : <strong id="sliderCogsLabel">${fmtPct(state.overrides.cogs ?? m.cogs)}</strong></label>
            <input type="range" id="sliderCogs" min="0" max="85" step="1" value="${Math.round((state.overrides.cogs ?? m.cogs) * 100)}">
          </div>
          <div class="fin-slider-item">
            <label>Masse salariale : <strong id="sliderSalLabel">${fmtPct(state.overrides.salaires ?? m.opex.salaires)}</strong></label>
            <input type="range" id="sliderSal" min="0" max="60" step="1" value="${Math.round((state.overrides.salaires ?? m.opex.salaires) * 100)}">
          </div>
        </div>
      </div>

      <!-- Tabs du dashboard -->
      <div class="fin-tabs">
        <button class="fin-tabs__tab fin-tabs__tab--active" data-tab="pl">État des résultats</button>
        <button class="fin-tabs__tab" data-tab="scenarios">Scénarios</button>
        <button class="fin-tabs__tab" data-tab="breakeven">Point mort</button>
        <button class="fin-tabs__tab" data-tab="ratios">Ratios</button>
        <button class="fin-tabs__tab" data-tab="invest">Investissement</button>
      </div>

      <div class="fin-tab-content" id="tabContent"></div>

      <!-- Hypothèses (Règle F) -->
      <div class="fin-hypotheses">
        <h4>Hypothèses et notes</h4>
        <ul>
          <li>Modèle de ratio utilisé : <strong>Modèle #${m.id} — ${m.name}</strong></li>
          <li>Taux d'imposition : ${fmtPct(TAUX_IMPOT)}</li>
          ${state.params.pret > 0 ? `<li>Prêt : ${fmt(state.params.pret)} à ${fmtPct(state.params.tauxInteret)}/an</li>` : ''}
          <li>Les ratios sont des moyennes sectorielles et peuvent varier selon votre situation spécifique.</li>
          <li><em>Ces projections constituent des estimations, non des garanties de performance.</em></li>
        </ul>
      </div>
    </div>
  `;

  // Bind events
  document.getElementById('backToInputs').addEventListener('click', () => {
    state.phase = 'inputs';
    render();
  });

  // Sliders
  const bindSlider = (id, labelId, handler) => {
    const slider = document.getElementById(id);
    const label = document.getElementById(labelId);
    slider.addEventListener('input', () => {
      handler(slider, label);
      calculateAll();
      renderActiveTab();
      updateKpis();
    });
  };

  bindSlider('sliderRev', 'sliderRevLabel', (s, l) => {
    state.params.revenuAnnuel = parseInt(s.value);
    l.textContent = fmt(state.params.revenuAnnuel);
  });
  bindSlider('sliderInv', 'sliderInvLabel', (s, l) => {
    state.params.investissement = parseInt(s.value);
    l.textContent = fmt(state.params.investissement);
  });
  bindSlider('sliderCogs', 'sliderCogsLabel', (s, l) => {
    state.overrides.cogs = parseInt(s.value) / 100;
    l.textContent = fmtPct(state.overrides.cogs);
  });
  bindSlider('sliderSal', 'sliderSalLabel', (s, l) => {
    state.overrides.salaires = parseInt(s.value) / 100;
    l.textContent = fmtPct(state.overrides.salaires);
  });

  // Tabs
  document.querySelectorAll('.fin-tabs__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.fin-tabs__tab').forEach(t => t.classList.remove('fin-tabs__tab--active'));
      tab.classList.add('fin-tabs__tab--active');
      renderActiveTab();
    });
  });

  renderActiveTab();
}

function updateKpis() {
  const r = state.results;
  const kpis = document.querySelectorAll('.fin-kpi__value');
  if (kpis.length >= 4) {
    kpis[0].textContent = fmt(r.annuel[0].revenu);
    kpis[1].textContent = fmt(r.annuel[0].beneficeNet);
    kpis[2].textContent = r.breakEvenMonth ? `Mois ${r.breakEvenMonth}` : 'Non atteint';
    kpis[3].textContent = fmt(r.annuel[4].revenu);
  }
  const ring = document.querySelector('.fin-score-ring');
  if (ring) {
    ring.style.setProperty('--score', r.globalScore);
    ring.style.setProperty('--color', scoreColor(r.globalScore));
    ring.querySelector('.fin-score-ring__value').textContent = r.globalScore;
  }
  const verdict = document.querySelector('.fin-score-card__verdict');
  if (verdict) verdict.textContent = scoreLabel(r.globalScore);
}

function getActiveTab() {
  const active = document.querySelector('.fin-tabs__tab--active');
  return active ? active.dataset.tab : 'pl';
}

function renderActiveTab() {
  const container = document.getElementById('tabContent');
  if (!container) return;

  // Détruire les charts existants
  Object.values(state.charts).forEach(c => { try { c.destroy(); } catch {} });
  state.charts = {};

  switch (getActiveTab()) {
    case 'pl': renderPLTab(container); break;
    case 'scenarios': renderScenariosTab(container); break;
    case 'breakeven': renderBreakEvenTab(container); break;
    case 'ratios': renderRatiosTab(container); break;
    case 'invest': renderInvestTab(container); break;
  }
}

// --- TAB : ÉTAT DES RÉSULTATS ---
function renderPLTab(container) {
  const r = state.results;

  // Tableau mensuel An 1
  const monthlyRows = [
    { label: 'Revenus', key: 'revenu', bold: true },
    { label: 'COGS', key: 'cogs' },
    { label: 'Marge brute', key: 'margeBrute', bold: true },
    ...Object.keys(OPEX_LABELS).map(k => ({ label: OPEX_LABELS[k], key: `opex.${k}` })),
    { label: 'EBIT', key: 'ebit', bold: true },
    { label: 'Intérêts', key: 'interets' },
    { label: 'Impôts', key: 'impot' },
    { label: 'Bénéfice net', key: 'beneficeNet', bold: true, highlight: true }
  ];

  const getVal = (month, key) => {
    if (key.startsWith('opex.')) return month.opex[key.split('.')[1]];
    return month[key];
  };

  container.innerHTML = `
    <div class="fin-pl">
      <h3>État des résultats — Année 1 (mensuel)</h3>
      <div class="fin-table-scroll">
        <table class="fin-table">
          <thead>
            <tr>
              <th></th>
              ${r.monthly.map(m => `<th>${m.mois}</th>`).join('')}
              <th class="fin-table__total">Total</th>
            </tr>
          </thead>
          <tbody>
            ${monthlyRows.map(row => {
              const values = r.monthly.map(m => getVal(m, row.key));
              const total = values.reduce((s, v) => s + v, 0);
              return `<tr class="${row.bold ? 'fin-table__bold' : ''} ${row.highlight ? 'fin-table__highlight' : ''}">
                <td>${row.label}</td>
                ${values.map(v => `<td>${fmt(v)}</td>`).join('')}
                <td class="fin-table__total">${fmt(total)}</td>
              </tr>`;
            }).join('')}
          </tbody>
        </table>
      </div>

      <h3 style="margin-top:32px">Projections 5 ans</h3>
      <div class="fin-table-scroll">
        <table class="fin-table fin-table--annual">
          <thead>
            <tr>
              <th></th>
              ${r.annuel.map(a => `<th>${a.annee}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            <tr class="fin-table__bold"><td>Revenus</td>${r.annuel.map(a => `<td>${fmt(a.revenu)}</td>`).join('')}</tr>
            <tr><td>COGS</td>${r.annuel.map(a => `<td>${fmt(a.cogs)}</td>`).join('')}</tr>
            <tr class="fin-table__bold"><td>Marge brute</td>${r.annuel.map(a => `<td>${fmt(a.margeBrute)}</td>`).join('')}</tr>
            ${Object.keys(OPEX_LABELS).map(k => `
              <tr><td>${OPEX_LABELS[k]}</td>${r.annuel.map(a => `<td>${fmt(a.opex[k])}</td>`).join('')}</tr>
            `).join('')}
            <tr class="fin-table__bold"><td>EBIT</td>${r.annuel.map(a => `<td>${fmt(a.ebit)}</td>`).join('')}</tr>
            <tr><td>Intérêts</td>${r.annuel.map(a => `<td>${fmt(a.interets)}</td>`).join('')}</tr>
            <tr><td>Impôts</td>${r.annuel.map(a => `<td>${fmt(a.impot)}</td>`).join('')}</tr>
            <tr class="fin-table__bold fin-table__highlight"><td>Bénéfice net</td>${r.annuel.map(a => `<td>${fmt(a.beneficeNet)}</td>`).join('')}</tr>
            <tr><td>Marge EBIT</td>${r.annuel.map(a => `<td>${fmtPct(a.margeEbit)}</td>`).join('')}</tr>
            <tr><td>Marge nette</td>${r.annuel.map(a => `<td>${fmtPct(a.margeNette)}</td>`).join('')}</tr>
          </tbody>
        </table>
      </div>

      <div class="fin-chart-container">
        <canvas id="chartPL5ans"></canvas>
      </div>
    </div>
  `;

  // Chart 5 ans
  if (typeof Chart !== 'undefined') {
    state.charts.pl5 = new Chart(document.getElementById('chartPL5ans'), {
      type: 'bar',
      data: {
        labels: r.annuel.map(a => a.annee),
        datasets: [
          {
            label: 'Revenus',
            data: r.annuel.map(a => a.revenu),
            backgroundColor: 'rgba(245, 158, 11, 0.7)',
            borderColor: '#f59e0b',
            borderWidth: 1
          },
          {
            label: 'Bénéfice net',
            data: r.annuel.map(a => a.beneficeNet),
            backgroundColor: 'rgba(34, 197, 94, 0.7)',
            borderColor: '#22c55e',
            borderWidth: 1
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: {
          y: {
            ticks: { callback: v => fmt(v) }
          }
        }
      }
    });
  }
}

// --- TAB : SCÉNARIOS ---
function renderScenariosTab(container) {
  const scenarios = state.results.scenarios;

  container.innerHTML = `
    <div class="fin-scenarios">
      <h3>3 scénarios — Et si...?</h3>
      <div class="fin-scenarios__grid">
        ${scenarios.map(s => `
          <div class="fin-scenario-card" style="border-top: 4px solid ${s.color}">
            <div class="fin-scenario-card__header">
              <span>${s.icon}</span>
              <h4>${s.nom}</h4>
              <small>${s.ajust > 0 ? '+' : ''}${Math.round(s.ajust * 100)}% de revenu</small>
            </div>
            <div class="fin-scenario-card__metrics">
              <div><span>Revenu An 1</span><strong>${fmt(s.revenuAn1)}</strong></div>
              <div><span>Profit An 1</span><strong style="color: ${s.profitAn1 >= 0 ? '#22c55e' : '#ef4444'}">${fmt(s.profitAn1)}</strong></div>
              <div><span>Revenu An 5</span><strong>${fmt(s.revenuAn5)}</strong></div>
              <div><span>Profit An 5</span><strong style="color: ${s.profitAn5 >= 0 ? '#22c55e' : '#ef4444'}">${fmt(s.profitAn5)}</strong></div>
              <div><span>Marge nette An 1</span><strong>${fmtPct(s.margeAn1)}</strong></div>
              <div><span>Point mort</span><strong>${s.breakEven ? `Mois ${s.breakEven}` : 'Non atteint'}</strong></div>
            </div>
          </div>
        `).join('')}
      </div>

      <div class="fin-chart-container">
        <canvas id="chartScenarios"></canvas>
      </div>
    </div>
  `;

  if (typeof Chart !== 'undefined') {
    state.charts.scenarios = new Chart(document.getElementById('chartScenarios'), {
      type: 'line',
      data: {
        labels: ['An 1', 'An 2', 'An 3', 'An 4', 'An 5'],
        datasets: scenarios.map(s => ({
          label: s.nom,
          data: s.annual.map(a => a.beneficeNet),
          borderColor: s.color,
          backgroundColor: s.color + '20',
          fill: true,
          tension: 0.3
        }))
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' }, title: { display: true, text: 'Bénéfice net — 3 scénarios sur 5 ans' } },
        scales: { y: { ticks: { callback: v => fmt(v) } } }
      }
    });
  }
}

// --- TAB : POINT MORT ---
function renderBreakEvenTab(container) {
  const r = state.results;
  const be = r.breakEvenMonth;

  container.innerHTML = `
    <div class="fin-breakeven">
      <h3>Analyse du point mort</h3>

      <div class="fin-breakeven__hero">
        <div class="fin-breakeven__icon">${be && be <= 12 ? '✅' : be ? '⏳' : '⚠️'}</div>
        <div class="fin-breakeven__text">
          ${be && be <= 12
            ? `<h4>Point mort atteint au mois ${be}</h4><p>Ton investissement initial de ${fmt(state.params.investissement)} sera récupéré en ${be} mois.</p>`
            : be
              ? `<h4>Point mort estimé au mois ${be}</h4><p>Ça prendra plus d'un an pour récupérer ton investissement de ${fmt(state.params.investissement)}. Considère réduire tes coûts ou augmenter tes prix.</p>`
              : `<h4>Point mort non atteint</h4><p>Avec ces paramètres, ton modèle ne devient pas rentable. Ajuste tes hypothèses avec les sliders.</p>`
          }
        </div>
      </div>

      <div class="fin-breakeven__timeline">
        ${r.monthly.map((m, i) => `
          <div class="fin-breakeven__month ${m.cumulProfit >= 0 ? 'fin-breakeven__month--positive' : 'fin-breakeven__month--negative'}">
            <div class="fin-breakeven__bar" style="height: ${Math.min(100, Math.abs(m.cumulProfit) / (state.params.investissement || 1) * 100)}%"></div>
            <span class="fin-breakeven__label">${m.mois}</span>
            <span class="fin-breakeven__amount">${fmt(m.cumulProfit)}</span>
          </div>
        `).join('')}
      </div>

      <div class="fin-chart-container">
        <canvas id="chartBreakEven"></canvas>
      </div>
    </div>
  `;

  if (typeof Chart !== 'undefined') {
    state.charts.breakeven = new Chart(document.getElementById('chartBreakEven'), {
      type: 'line',
      data: {
        labels: r.monthly.map(m => m.mois),
        datasets: [
          {
            label: 'Profit cumulatif',
            data: r.monthly.map(m => m.cumulProfit),
            borderColor: '#f59e0b',
            backgroundColor: r.monthly.map(m => m.cumulProfit >= 0 ? 'rgba(34,197,94,0.3)' : 'rgba(239,68,68,0.3)'),
            fill: true,
            tension: 0.3
          },
          {
            label: 'Seuil (0$)',
            data: Array(12).fill(0),
            borderColor: '#94a3b8',
            borderDash: [5, 5],
            pointRadius: 0
          }
        ]
      },
      options: {
        responsive: true,
        plugins: { legend: { position: 'top' } },
        scales: { y: { ticks: { callback: v => fmt(v) } } }
      }
    });
  }
}

// --- TAB : RATIOS ---
function renderRatiosTab(container) {
  const a = state.results.annuel[0];
  const m = state.model;

  const ratios = [
    { label: 'Marge brute', value: a.margeBruteRatio, industrie: 1 - m.cogs, format: fmtPct },
    { label: 'Marge EBIT (opérationnelle)', value: a.margeEbit, industrie: m.margeEbit, format: fmtPct },
    { label: 'Marge nette', value: a.margeNette, industrie: m.margeNette, format: fmtPct },
    { label: 'Ratio COGS', value: a.revenu > 0 ? a.cogs / a.revenu : 0, industrie: m.cogs, format: fmtPct, inverse: true },
    { label: 'Ratio masse salariale', value: a.revenu > 0 ? a.opex.salaires / a.revenu : 0, industrie: m.opex.salaires, format: fmtPct, inverse: true },
  ];

  container.innerHTML = `
    <div class="fin-ratios">
      <h3>Ratios financiers — Ton entreprise vs industrie</h3>
      <div class="fin-ratios__grid">
        ${ratios.map(r => {
          const pct = Math.min(100, (r.value || 0) * 100 / (r.inverse ? 1 : 0.5));
          const indPct = Math.min(100, (r.industrie || 0) * 100 / (r.inverse ? 1 : 0.5));
          const better = r.inverse ? r.value <= r.industrie : r.value >= r.industrie;
          return `
            <div class="fin-ratio-item">
              <div class="fin-ratio-item__header">
                <span>${r.label}</span>
                <span class="fin-ratio-item__badge ${better ? 'fin-ratio-item__badge--good' : 'fin-ratio-item__badge--warn'}">
                  ${better ? '✓ Bon' : '⚠ À surveiller'}
                </span>
              </div>
              <div class="fin-ratio-item__bars">
                <div class="fin-ratio-item__bar">
                  <span>Toi</span>
                  <div class="fin-ratio-item__track">
                    <div class="fin-ratio-item__fill fin-ratio-item__fill--you" style="width: ${pct}%"></div>
                  </div>
                  <strong>${r.format(r.value)}</strong>
                </div>
                <div class="fin-ratio-item__bar">
                  <span>Industrie</span>
                  <div class="fin-ratio-item__track">
                    <div class="fin-ratio-item__fill fin-ratio-item__fill--ind" style="width: ${indPct}%"></div>
                  </div>
                  <strong>${r.format(r.industrie)}</strong>
                </div>
              </div>
            </div>
          `;
        }).join('')}
      </div>

      <div class="fin-chart-container">
        <canvas id="chartRadar"></canvas>
      </div>
    </div>
  `;

  if (typeof Chart !== 'undefined') {
    state.charts.radar = new Chart(document.getElementById('chartRadar'), {
      type: 'radar',
      data: {
        labels: ['Marge brute', 'Marge EBIT', 'Marge nette', 'Contrôle COGS', 'Contrôle salaires'],
        datasets: [
          {
            label: 'Ton entreprise',
            data: [
              a.margeBruteRatio * 100,
              a.margeEbit * 100,
              a.margeNette * 100,
              (1 - (a.revenu > 0 ? a.cogs / a.revenu : 0)) * 100,
              (1 - (a.revenu > 0 ? a.opex.salaires / a.revenu : 0)) * 100
            ],
            borderColor: '#f59e0b',
            backgroundColor: 'rgba(245, 158, 11, 0.2)'
          },
          {
            label: 'Moyenne industrie',
            data: [
              (1 - m.cogs) * 100,
              m.margeEbit * 100,
              m.margeNette * 100,
              (1 - m.cogs) * 100,
              (1 - m.opex.salaires) * 100
            ],
            borderColor: '#6366f1',
            backgroundColor: 'rgba(99, 102, 241, 0.2)'
          }
        ]
      },
      options: {
        responsive: true,
        scales: { r: { min: 0, max: 100 } },
        plugins: { legend: { position: 'top' } }
      }
    });
  }
}

// --- TAB : INVESTISSEMENT ---
function renderInvestTab(container) {
  const m = state.model;
  const ratios = getEffectiveRatios(m);
  const totalOpexPct = Object.values(ratios.opex).reduce((s, v) => s + v, 0);

  container.innerHTML = `
    <div class="fin-invest">
      <h3>Ventilation de l'investissement & structure de coûts</h3>

      <div class="fin-invest__cards">
        <div class="fin-invest__card">
          <h4>Investissement initial</h4>
          <div class="fin-invest__amount">${fmt(state.params.investissement)}</div>
          ${state.params.pret > 0 ? `
            <div class="fin-invest__detail">
              <span>Financement :</span> <strong>${fmt(state.params.pret)}</strong>
            </div>
            <div class="fin-invest__detail">
              <span>Intérêts An 1 :</span> <strong>${fmt(Math.round(state.params.pret * state.params.tauxInteret))}</strong>
            </div>
            <div class="fin-invest__detail">
              <span>Mise de fonds :</span> <strong>${fmt(state.params.investissement - state.params.pret)}</strong>
            </div>
          ` : '<p>Autofinancement complet</p>'}
        </div>

        <div class="fin-invest__card">
          <h4>Répartition des coûts</h4>
          <div class="fin-invest__breakdown">
            <div class="fin-invest__row">
              <span>COGS</span>
              <div class="fin-invest__bar-track">
                <div class="fin-invest__bar-fill" style="width: ${ratios.cogs * 100}%; background: #ef4444;"></div>
              </div>
              <strong>${fmtPct(ratios.cogs)}</strong>
            </div>
            ${Object.keys(ratios.opex).map(k => `
              <div class="fin-invest__row">
                <span>${OPEX_LABELS[k]}</span>
                <div class="fin-invest__bar-track">
                  <div class="fin-invest__bar-fill" style="width: ${ratios.opex[k] * 100}%; background: #f59e0b;"></div>
                </div>
                <strong>${fmtPct(ratios.opex[k])}</strong>
              </div>
            `).join('')}
            <div class="fin-invest__row fin-invest__row--total">
              <span>Total coûts</span>
              <div></div>
              <strong>${fmtPct(ratios.cogs + totalOpexPct)}</strong>
            </div>
            <div class="fin-invest__row fin-invest__row--margin">
              <span>Marge disponible</span>
              <div></div>
              <strong style="color: #22c55e">${fmtPct(1 - ratios.cogs - totalOpexPct)}</strong>
            </div>
          </div>
        </div>
      </div>

      <div class="fin-chart-container">
        <canvas id="chartDonut"></canvas>
      </div>
    </div>
  `;

  if (typeof Chart !== 'undefined') {
    const labels = ['COGS', ...Object.values(OPEX_LABELS), 'Marge EBIT'];
    const data = [ratios.cogs * 100, ...Object.values(ratios.opex).map(v => v * 100), (1 - ratios.cogs - totalOpexPct) * 100];
    const colors = ['#ef4444', '#f97316', '#f59e0b', '#eab308', '#84cc16', '#22c55e', '#14b8a6', '#06b6d4', '#22c55e'];

    state.charts.donut = new Chart(document.getElementById('chartDonut'), {
      type: 'doughnut',
      data: {
        labels,
        datasets: [{ data, backgroundColor: colors.slice(0, labels.length), borderWidth: 2 }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: { position: 'right' },
          title: { display: true, text: 'Répartition de chaque dollar de revenu' }
        }
      }
    });
  }
}

// --- INIT ---
function init() {
  state.adnData = getAdnData();

  if (loadSavedState() && state.model) {
    calculateAll();
    state.phase = 'dashboard';
  }

  render();
}

document.addEventListener('DOMContentLoaded', init);
