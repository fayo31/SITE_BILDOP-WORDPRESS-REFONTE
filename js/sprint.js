/* ============================================
   BILDOP — Module 8 : Sprint 90 jours
   Lit l'ADN de tous les modules (localStorage)
   Génère un plan d'action 90 jours personnalisé
   ============================================ */

// --- État global ---
const SP = {
  adn: {
    questionnaire: null,   // Module 1
    diagnostic: null,      // Module 2
    brand: null,           // Module 4
    financier: null,       // Module 5
    marketIntel: null,     // Module 6
  },
  businessName: 'Ton entreprise',
  secteur: '',
  completedSteps: new Set(),
  data: {
    phase1: null,
    phase2: null,
    phase3: null,
    okrs: null,
    templates: null,
  }
};

// Noms des flux (Module 2)
const FLUX_NAMES = ['Acquisition', 'Production', 'Finances', 'Rétention', 'Pilotage'];
const FLUX_ICONS = ['🎯', '⚙️', '💰', '❤️', '🧭'];

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  loadADN();
  renderWelcome();
  updateProgress();
});

// --- Lecture ADN ---
function loadADN() {
  try {
    const q = localStorage.getItem('bildop_questionnaire');
    if (q) SP.adn.questionnaire = JSON.parse(q);
  } catch(e) {}

  try {
    const d = localStorage.getItem('bildop_diagnostic');
    if (d) SP.adn.diagnostic = JSON.parse(d);
  } catch(e) {}

  try {
    const b = localStorage.getItem('bildop_brand');
    if (b) SP.adn.brand = JSON.parse(b);
  } catch(e) {}

  try {
    const f = localStorage.getItem('bildop_financier');
    if (f) SP.adn.financier = JSON.parse(f);
  } catch(e) {}

  try {
    const mi = localStorage.getItem('bildop_market_intelligence');
    if (mi) SP.adn.marketIntel = JSON.parse(mi);
  } catch(e) {}

  // Extraire nom + secteur
  if (SP.adn.questionnaire) {
    SP.businessName = SP.adn.questionnaire['1'] || SP.adn.questionnaire['nom'] || 'Ton entreprise';
    SP.secteur = SP.adn.questionnaire['3'] || SP.adn.questionnaire['secteur'] || '';
  }
  if (SP.adn.marketIntel && SP.adn.marketIntel.niche) {
    SP.secteur = SP.secteur || SP.adn.marketIntel.niche;
  }

  // Mettre à jour la sidebar
  document.getElementById('adnEntreprise').textContent = SP.businessName;
  document.getElementById('adnSecteur').textContent = SP.secteur || 'Secteur à définir';
}

// --- Rendu page d'accueil ---
function renderWelcome() {
  // Module status chips
  const modules = [
    { key: 'questionnaire', label: 'Plan d\'affaires', icon: '📄' },
    { key: 'diagnostic', label: 'Diagnostic', icon: '🩺' },
    { key: 'brand', label: 'Marque', icon: '🏗️' },
    { key: 'financier', label: 'Financier', icon: '💰' },
    { key: 'marketIntel', label: 'Market Intel', icon: '🔬' },
  ];

  const statusEl = document.getElementById('moduleStatus');
  statusEl.innerHTML = modules.map(m => {
    const done = SP.adn[m.key] !== null;
    return `<div class="sp-module-chip sp-module-chip--${done ? 'done' : 'missing'}">
      ${done ? '✅' : '○'} ${m.icon} ${m.label}
    </div>`;
  }).join('');

  // Diagnostic summary
  if (SP.adn.diagnostic && SP.adn.diagnostic.fluxScores) {
    document.getElementById('diagSummaryCard').style.display = 'block';
    renderFluxGrid(SP.adn.diagnostic.fluxScores);

    // Identifier flux critique
    const scores = SP.adn.diagnostic.fluxScores;
    const minScore = Math.min(...scores);
    const minIdx = scores.indexOf(minScore);
    if (minScore < 80) {
      const critEl = document.getElementById('criticalFlux');
      critEl.style.display = 'block';
      critEl.innerHTML = `<strong style="color:#e74c3c;">🔴 Flux critique :</strong> ${FLUX_ICONS[minIdx]} ${FLUX_NAMES[minIdx]} (${minScore}/100) — La Phase 1 de ton sprint sera axée sur ce flux.`;
    }
  }
}

function renderFluxGrid(scores) {
  const grid = document.getElementById('fluxGrid');
  grid.innerHTML = scores.map((score, i) => {
    let cls = 'sp-flux-pill--gray';
    if (score >= 80) cls = 'sp-flux-pill--green';
    else if (score >= 50) cls = 'sp-flux-pill--orange';
    else if (score > 0) cls = 'sp-flux-pill--red';
    return `<div class="sp-flux-pill ${cls}">
      <span class="sp-flux-pill__score">${score > 0 ? score : '–'}</span>
      <span class="sp-flux-pill__name">${FLUX_ICONS[i]} ${FLUX_NAMES[i]}</span>
    </div>`;
  }).join('');
}

// --- Navigation ---
function goToStep(step) {
  document.querySelectorAll('.sp-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.sp-step-btn').forEach(b => b.classList.remove('active'));

  document.getElementById(`panel-${step}`).classList.add('active');
  document.querySelector(`[data-step="${step}"]`).classList.add('active');

  window.scrollTo(0, 0);
  document.querySelector('.sp-main').scrollTop = 0;

  // Déclencher la génération si pas encore fait
  if (step === 1 && !SP.data.phase1) generatePhase1();
  if (step === 2 && !SP.data.phase2) generatePhase2();
  if (step === 3 && !SP.data.phase3) generatePhase3();
  if (step === 4 && !SP.data.okrs) generateOKRs();
  if (step === 5 && !SP.data.templates) generateTemplates();
  if (step === 6) renderExport();

  updateProgress();
}

function updateProgress() {
  const total = 6;
  const done = SP.completedSteps.size;
  const pct = Math.round((done / total) * 100);
  const currentStep = [...document.querySelectorAll('.sp-step-btn.active')].map(b => b.dataset.step)[0] || '0';

  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = `Étape ${currentStep} / ${total}`;

  SP.completedSteps.forEach(s => {
    const btn = document.querySelector(`[data-step="${s}"]`);
    if (btn) {
      btn.classList.add('completed');
      const icon = btn.querySelector('.sp-step-icon');
      if (icon && s > 0) icon.textContent = '✅';
    }
  });
}

// --- Générer tout le sprint depuis la page d'accueil ---
function generateSprint() {
  // Show disclaimer first if not yet accepted this session
  if (!sessionStorage.getItem('bildop_disclaimer_sp')) {
    document.getElementById('disclaimerOverlay').style.display = 'flex';
    return;
  }
  _doGenerateSprint();
}

function acceptDisclaimer() {
  sessionStorage.setItem('bildop_disclaimer_sp', 'accepted');
  document.getElementById('disclaimerOverlay').style.display = 'none';
  _doGenerateSprint();
}

function _doGenerateSprint() {
  goToStep(1);
}

// ============================================
// PHASE 1 — FONDATIONS (Jours 1-30)
// ============================================
function generatePhase1() {
  document.getElementById('loading-1').style.display = 'block';
  document.getElementById('results-1').style.display = 'none';

  const steps = [
    '📊 Analyse de ton diagnostic...',
    '🔴 Identification du flux critique...',
    '📋 Génération des 7 actions prioritaires...',
    '✅ Phase 1 prête!',
  ];
  let i = 0;
  const interval = setInterval(() => {
    document.getElementById('loadStep1').textContent = steps[i] || steps[steps.length - 1];
    i++;
    if (i >= steps.length) clearInterval(interval);
  }, 600);

  setTimeout(() => {
    const data = buildPhase1();
    SP.data.phase1 = data;
    SP.completedSteps.add(1);
    document.getElementById('dot-phase1').classList.add('ready');
    renderPhase1(data);
    updateProgress();
  }, 2800);
}

function buildPhase1() {
  const scores = SP.adn.diagnostic?.fluxScores || [0, 0, 0, 0, 0];
  const minScore = Math.min(...scores);
  const minIdx = scores.indexOf(minScore);

  // Flux critique → priorité Phase 1
  const fluxFocus = FLUX_NAMES[minIdx];
  const fluxIcon = FLUX_ICONS[minIdx];
  const hasData = SP.adn.diagnostic !== null;

  // Actions selon le flux critique
  const actionsByFlux = {
    0: [ // Acquisition
      { title: 'Définir ton ICP (Ideal Customer Profile) par écrit', resp: 'Toi', delai: 'Jour 1', impact: 'Critique', type: '1' },
      { title: 'Créer 3 scripts de premier contact (téléphone, courriel, LinkedIn)', resp: 'Toi', delai: 'Jours 2-3', impact: 'Critique', type: '1' },
      { title: 'Identifier 50 prospects qualifiés et les consigner dans un CRM', resp: 'Toi', delai: 'Jours 3-7', impact: 'Élevé', type: '1' },
      { title: 'Lancer une séquence de 5 courriels de prospection automatisée', resp: 'Toi / Daniel', delai: 'Semaine 2', impact: 'Élevé', type: '1' },
      { title: 'Mettre en place un processus de relance J+1, J+3, J+7', resp: 'Toi', delai: 'Semaine 2', impact: 'Élevé', type: '1' },
      { title: 'Obtenir 3 appels découverte avec des prospects qualifiés', resp: 'Toi', delai: 'Semaine 3', impact: 'Critique', type: '1' },
      { title: 'Analyser les objections et affiner ton offre en conséquence', resp: 'Toi', delai: 'Fin du mois', impact: 'Moyen', type: '1' },
    ],
    1: [ // Production
      { title: 'Documenter ton processus de livraison de A à Z en SOP', resp: 'Toi', delai: 'Jours 1-3', impact: 'Critique', type: '1' },
      { title: 'Identifier les 3 goulots d\'étranglement dans ta livraison', resp: 'Toi', delai: 'Jour 3', impact: 'Critique', type: '1' },
      { title: 'Créer un template de onboarding client (checklist)', resp: 'Toi', delai: 'Semaine 1', impact: 'Élevé', type: '1' },
      { title: 'Mettre en place un système de suivi qualité hebdomadaire', resp: 'Toi', delai: 'Semaine 2', impact: 'Élevé', type: '1' },
      { title: 'Automatiser les communications récurrentes (rappels, confirmations)', resp: 'Toi / Dev', delai: 'Semaine 2-3', impact: 'Moyen', type: '1' },
      { title: 'Recueillir 5 témoignages clients avec processus structuré', resp: 'Toi', delai: 'Semaine 3', impact: 'Élevé', type: '1' },
      { title: 'Mesurer le temps moyen de livraison et définir l\'objectif cible', resp: 'Toi', delai: 'Fin du mois', impact: 'Moyen', type: '1' },
    ],
    2: [ // Finances
      { title: 'Ouvrir un compte bancaire d\'entreprise dédié si ce n\'est pas fait', resp: 'Toi', delai: 'Jour 1', impact: 'Critique', type: '1' },
      { title: 'Lister toutes les dépenses mensuelles et calculer ton seuil de survie', resp: 'Toi', delai: 'Jours 2-3', impact: 'Critique', type: '1' },
      { title: 'Mettre en place un tableau de suivi de trésorerie (hebdomadaire)', resp: 'Toi', delai: 'Semaine 1', impact: 'Critique', type: '1' },
      { title: 'Définir et activer ton processus de facturation + relance impayés', resp: 'Toi', delai: 'Semaine 1', impact: 'Critique', type: '1' },
      { title: 'Calculer ton prix de revient réel et valider tes marges', resp: 'Toi / Comptable', delai: 'Semaine 2', impact: 'Élevé', type: '1' },
      { title: 'Identifier les 3 postes de dépenses à couper immédiatement', resp: 'Toi', delai: 'Semaine 2', impact: 'Élevé', type: '1' },
      { title: 'Créer un tableau de bord financier simple (revenus / dépenses / marge)', resp: 'Toi', delai: 'Fin du mois', impact: 'Moyen', type: '1' },
    ],
    3: [ // Rétention
      { title: 'Mettre en place un NPS mensuel (1 question : recommanderais-tu?)', resp: 'Toi', delai: 'Jour 1', impact: 'Critique', type: '1' },
      { title: 'Identifier les 3 raisons principales pour lesquelles les clients partent', resp: 'Toi', delai: 'Jours 2-5', impact: 'Critique', type: '1' },
      { title: 'Créer un processus de suivi post-achat (J+7, J+30, J+90)', resp: 'Toi', delai: 'Semaine 1', impact: 'Élevé', type: '1' },
      { title: 'Appeler 5 anciens clients inactifs — comprendre pourquoi', resp: 'Toi', delai: 'Semaine 2', impact: 'Élevé', type: '1' },
      { title: 'Lancer un programme de fidélité simple (rabais anniversaire, référence)', resp: 'Toi', delai: 'Semaine 3', impact: 'Moyen', type: '1' },
      { title: 'Créer un contenu éducatif hebdomadaire pour garder le lien (infolettre)', resp: 'Toi / Marketing', delai: 'Semaine 3', impact: 'Moyen', type: '1' },
      { title: 'Mesurer le taux de rétention mensuel et définir la cible 90 jours', resp: 'Toi', delai: 'Fin du mois', impact: 'Moyen', type: '1' },
    ],
    4: [ // Pilotage
      { title: 'Définir 5 KPIs clés à suivre chaque semaine (max 15 minutes)', resp: 'Toi', delai: 'Jour 1', impact: 'Critique', type: '1' },
      { title: 'Créer un tableau de bord hebdomadaire (Google Sheets suffit)', resp: 'Toi', delai: 'Jours 2-3', impact: 'Critique', type: '1' },
      { title: 'Instaurer un meeting hebdo de 30 minutes avec toi-même (bilan)', resp: 'Toi', delai: 'Dès Semaine 1', impact: 'Critique', type: '1' },
      { title: 'Documenter tes décisions importantes (un simple journal suffit)', resp: 'Toi', delai: 'Semaine 1', impact: 'Élevé', type: '1' },
      { title: 'Définir tes priorités hebdomadaires chaque dimanche soir (top 3)', resp: 'Toi', delai: 'Hebdomadaire', impact: 'Élevé', type: '1' },
      { title: 'Identifier et éliminer 3 tâches chronophages non essentielles', resp: 'Toi', delai: 'Semaine 2', impact: 'Élevé', type: '1' },
      { title: 'Créer un rituel de revue mensuelle (30 min, chiffres + décisions)', resp: 'Toi', delai: 'Fin du mois', impact: 'Moyen', type: '1' },
    ]
  };

  const actions = actionsByFlux[minIdx] || actionsByFlux[0];
  const milestones = {
    0: '🎯 Jalon : Premier prospect converti en client',
    1: '🎯 Jalon : SOP de livraison documentée + 0 retard',
    2: '🎯 Jalon : Trésorerie positive + seuil de survie connu',
    3: '🎯 Jalon : NPS > 7 + 0 départ non expliqué',
    4: '🎯 Jalon : Dashboard hebdo actif + rituel de pilotage établi',
  };

  const whys = {
    0: `⚠️ Mise en garde : Ton flux Acquisition semble faible selon le diagnostic. Sans nouveaux clients, rien d'autre n'a d'importance. Mais attention : ces recommandations sont basées sur des données simulées. Valide chaque action avec ta réalité terrain avant d'investir du temps ou de l'argent. Les 30 premiers jours, tout l'effort va là — si et seulement si ton diagnostic est exact.`,
    1: `⚠️ Attention : Ton flux Production semble limiter ta capacité à livrer. Des clients frustrés ne reviennent pas. Mais ces priorités sont basées sur un diagnostic simulé — valide les goulots réels avec ton équipe avant de tout réorganiser.`,
    2: `⚠️ Mise en garde : Sans visibilité financière, tu pilotes à l'aveugle. Ces recommandations sont un point de départ, pas un plan financier validé. Consulte ton comptable pour confirmer tes chiffres réels avant de prendre des décisions structurantes.`,
    3: `⚠️ Attention : Le ratio 5-7x (acquisition vs rétention) est une moyenne sectorielle, pas une certitude pour ton entreprise. Valide tes propres données de churn avant de réorienter ta stratégie. Commence par colmater le seau — mais vérifie d'abord qu'il fuit vraiment.`,
    4: `⚠️ Mise en garde : "Tu ne peux pas gérer ce que tu ne mesures pas" — c'est vrai, mais attention à ne pas mesurer les mauvaises choses. Ces KPIs suggérés sont génériques. Adapte-les à ta réalité avant de les suivre religieusement.`,
  };

  return {
    fluxFocus: `${fluxIcon} ${fluxFocus}`,
    fluxScore: hasData ? minScore : null,
    why: whys[minIdx] || whys[0],
    actions,
    milestone: milestones[minIdx] || milestones[0],
    metrics: [
      { value: '30', label: 'Jours', sub: 'Phase 1' },
      { value: '7', label: 'Actions', sub: 'Prioritaires' },
      { value: hasData ? `${minScore}%` : '–', label: 'Score actuel', sub: fluxFocus },
      { value: '80%', label: 'Cible', sub: 'En 30 jours' },
    ]
  };
}

function renderPhase1(data) {
  document.getElementById('p1-focus').textContent = data.fluxFocus;
  document.getElementById('p1-why').textContent = data.why;
  document.getElementById('p1-milestone').textContent = data.milestone;

  document.getElementById('p1-metrics').innerHTML = data.metrics.map(m => `
    <div class="sp-metric">
      <div class="sp-metric__value">${m.value}</div>
      <div class="sp-metric__label">${m.label}</div>
      <div class="sp-metric__sub">${m.sub}</div>
    </div>
  `).join('');

  document.getElementById('p1-actions').innerHTML = data.actions.map((a, i) => `
    <div class="sp-action">
      <div class="sp-action__num sp-action__num--1">${i + 1}</div>
      <div class="sp-action__content">
        <div class="sp-action__title">${a.title}</div>
        <div class="sp-action__meta">
          <span class="sp-tag sp-tag--blue">👤 ${a.resp}</span>
          <span class="sp-tag sp-tag--gold">📅 ${a.delai}</span>
          <span class="sp-tag ${a.impact === 'Critique' ? 'sp-tag--green' : 'sp-tag'}">⚡ Impact ${a.impact}</span>
        </div>
      </div>
    </div>
  `).join('');

  document.getElementById('loading-1').style.display = 'none';
  document.getElementById('results-1').style.display = 'block';
}

// ============================================
// PHASE 2 — MOMENTUM (Jours 31-60)
// ============================================
function generatePhase2() {
  document.getElementById('loading-2').style.display = 'block';
  document.getElementById('results-2').style.display = 'none';

  setTimeout(() => {
    const data = buildPhase2();
    SP.data.phase2 = data;
    SP.completedSteps.add(2);
    document.getElementById('dot-phase2').classList.add('ready');
    renderPhase2(data);
    updateProgress();
  }, 2200);
}

function buildPhase2() {
  const niche = SP.adn.marketIntel?.niche || SP.secteur || 'ton marché';
  const hasMarketing = SP.adn.marketIntel !== null;
  const hasFinancier = SP.adn.financier !== null;

  const actions = [
    { title: `Lancer ta présence de contenu sur 1 plateforme (LinkedIn, Instagram ou Facebook) — 3 posts/semaine`, resp: 'Toi / Marketing', delai: 'Jours 31-35', impact: 'Critique', type: '2' },
    { title: hasMarketing ? `Utiliser les accroches générées par Market Intelligence pour tes posts` : 'Créer 10 accroches de contenu basées sur les douleurs de ton client idéal', resp: 'Toi', delai: 'Jours 31-37', impact: 'Élevé', type: '2' },
    { title: 'Activer un programme de référencement client (5-10% de rabais ou cadeau)', resp: 'Toi', delai: 'Semaine 5', impact: 'Élevé', type: '2' },
    { title: hasFinancier ? 'Réviser ton pricing selon les données du Simulateur Financier' : 'Valider ton pricing avec 3 clients potentiels — test de résistance', resp: 'Toi', delai: 'Semaine 5-6', impact: 'Élevé', type: '2' },
    { title: 'Lancer une offre d\'entrée à faible friction (découverte, démo, audit gratuit)', resp: 'Toi', delai: 'Semaine 6', impact: 'Critique', type: '2' },
    { title: 'Atteindre 10 conversations actives avec des prospects qualifiés', resp: 'Toi', delai: 'Fin Phase 2', impact: 'Critique', type: '2' },
  ];

  return {
    actions,
    milestone: '🚀 Jalon : 3 premiers clients payants ou 10 prospects en pipeline actif — ⚠️ Cible ambitieuse. Si non atteinte, réévaluer la stratégie avec honnêteté.',
    metrics: [
      { value: '30', label: 'Jours', sub: 'Phase 2' },
      { value: '6', label: 'Actions', sub: 'Marketing + Ventes' },
      { value: '3', label: 'Clients', sub: 'Objectif fin P2' },
      { value: '3x', label: 'Posts/sem', sub: 'Contenu cible' },
    ]
  };
}

function renderPhase2(data) {
  document.getElementById('p2-milestone').textContent = data.milestone;
  document.getElementById('p2-metrics').innerHTML = data.metrics.map(m => `
    <div class="sp-metric">
      <div class="sp-metric__value">${m.value}</div>
      <div class="sp-metric__label">${m.label}</div>
      <div class="sp-metric__sub">${m.sub}</div>
    </div>
  `).join('');

  document.getElementById('p2-actions').innerHTML = data.actions.map((a, i) => `
    <div class="sp-action">
      <div class="sp-action__num sp-action__num--2">${i + 1}</div>
      <div class="sp-action__content">
        <div class="sp-action__title">${a.title}</div>
        <div class="sp-action__meta">
          <span class="sp-tag sp-tag--blue">👤 ${a.resp}</span>
          <span class="sp-tag sp-tag--gold">📅 ${a.delai}</span>
          <span class="sp-tag ${a.impact === 'Critique' ? 'sp-tag--green' : 'sp-tag'}">⚡ Impact ${a.impact}</span>
        </div>
      </div>
    </div>
  `).join('');

  document.getElementById('loading-2').style.display = 'none';
  document.getElementById('results-2').style.display = 'block';
}

// ============================================
// PHASE 3 — ACCÉLÉRATION (Jours 61-90)
// ============================================
function generatePhase3() {
  document.getElementById('loading-3').style.display = 'block';
  document.getElementById('results-3').style.display = 'none';

  setTimeout(() => {
    const data = buildPhase3();
    SP.data.phase3 = data;
    SP.completedSteps.add(3);
    document.getElementById('dot-phase3').classList.add('ready');
    renderPhase3(data);
    updateProgress();
  }, 2000);
}

function buildPhase3() {
  const actions = [
    { title: 'Identifier les 2-3 actions de la Phase 2 qui ont le mieux fonctionné — les doubler', resp: 'Toi', delai: 'Jour 61-63', impact: 'Critique', type: '3' },
    { title: 'Couper les 2-3 actions qui n\'ont pas donné de résultat — libérer du temps', resp: 'Toi', delai: 'Jour 61-65', impact: 'Élevé', type: '3' },
    { title: 'Embaucher ou déléguer une tâche chronophage (admin, support, contenu)', resp: 'Toi', delai: 'Semaine 9-10', impact: 'Élevé', type: '3' },
    { title: 'Mettre en place une offre d\'upsell pour tes clients existants', resp: 'Toi', delai: 'Semaine 9-11', impact: 'Élevé', type: '3' },
    { title: 'Préparer le bilan des 90 jours + plan du prochain trimestre', resp: 'Toi', delai: 'Semaine 12-13', impact: 'Critique', type: '3' },
  ];

  return {
    actions,
    milestone: '⚡ Jalon : Chiffre d\'affaires 30j en hausse vs Phase 1 + Plan Q2 écrit — ⚠️ Doubler le CA en 60 jours n\'est pas garanti. Soyez réaliste.',
    metrics: [
      { value: '30', label: 'Jours', sub: 'Phase 3' },
      { value: '5', label: 'Actions', sub: 'Scaling' },
      { value: '2x', label: 'Objectif', sub: 'Revenus vs Phase 1' },
      { value: 'Q2', label: 'Plan', sub: 'Prêt au Jour 90' },
    ]
  };
}

function renderPhase3(data) {
  document.getElementById('p3-milestone').textContent = data.milestone;
  document.getElementById('p3-metrics').innerHTML = data.metrics.map(m => `
    <div class="sp-metric">
      <div class="sp-metric__value">${m.value}</div>
      <div class="sp-metric__label">${m.label}</div>
      <div class="sp-metric__sub">${m.sub}</div>
    </div>
  `).join('');

  document.getElementById('p3-actions').innerHTML = data.actions.map((a, i) => `
    <div class="sp-action">
      <div class="sp-action__num sp-action__num--3">${i + 1}</div>
      <div class="sp-action__content">
        <div class="sp-action__title">${a.title}</div>
        <div class="sp-action__meta">
          <span class="sp-tag sp-tag--blue">👤 ${a.resp}</span>
          <span class="sp-tag sp-tag--gold">📅 ${a.delai}</span>
          <span class="sp-tag ${a.impact === 'Critique' ? 'sp-tag--green' : 'sp-tag'}">⚡ Impact ${a.impact}</span>
        </div>
      </div>
    </div>
  `).join('');

  document.getElementById('loading-3').style.display = 'none';
  document.getElementById('results-3').style.display = 'block';
}

// ============================================
// OKRs & KPIs
// ============================================
function generateOKRs() {
  document.getElementById('loading-4').style.display = 'block';
  document.getElementById('results-4').style.display = 'none';

  setTimeout(() => {
    const data = buildOKRs();
    SP.data.okrs = data;
    SP.completedSteps.add(4);
    document.getElementById('dot-okr').classList.add('ready');
    renderOKRs(data);
    updateProgress();
  }, 1800);
}

function buildOKRs() {
  const scores = SP.adn.diagnostic?.fluxScores || [0, 0, 0, 0, 0];
  const minIdx = scores.indexOf(Math.min(...scores));
  const fluxLabel = FLUX_NAMES[minIdx];

  const okrs = [
    {
      num: 'OKR 1',
      obj: `Stabiliser ${fluxLabel === 'Acquisition' ? 'l\'acquisition client' : 'le flux ' + fluxLabel.toLowerCase()} d'ici le Jour 30`,
      krs: [
        { icon: '📊', label: fluxLabel === 'Acquisition' ? 'Taux de conversion prospect → client' : `Score Diagnostic ${fluxLabel}`, target: '> 20%' },
        { icon: '📋', label: 'SOPs documentées pour ce flux', target: '3 SOPs actives' },
        { icon: '⏱', label: 'Revue hebdomadaire du flux réalisée', target: '4 / 4 semaines' },
      ]
    },
    {
      num: 'OKR 2',
      obj: 'Générer les 3 premiers clients payants d\'ici le Jour 60',
      krs: [
        { icon: '💰', label: 'Clients payants cumulatifs', target: '3 clients' },
        { icon: '🎯', label: 'Prospects qualifiés en pipeline', target: '10+ actifs' },
        { icon: '📣', label: 'Posts de contenu publiés', target: '24 posts (3/sem)' },
      ]
    },
    {
      num: 'OKR 3',
      obj: 'Doubler le chiffre d\'affaires mensuel de la Phase 1 à la Phase 3 (cible ambitieuse — à valider avec votre comptable)',
      krs: [
        { icon: '📈', label: 'Revenus mensuels Jour 90 vs Jour 30', target: '2x minimum' },
        { icon: '❤️', label: 'Taux de satisfaction client (NPS)', target: '> 8 / 10' },
        { icon: '🔄', label: 'Taux de rétention clients actifs', target: '> 80%' },
      ]
    }
  ];

  const weeklyDash = [
    { icon: '💰', label: 'Revenus semaine', target: 'Objectif hebdo défini' },
    { icon: '🎯', label: 'Prospects contactés', target: '10 / semaine' },
    { icon: '📞', label: 'Conversations actives', target: '3+ en cours' },
    { icon: '⭐', label: 'Score client (NPS)', target: 'Mesuré 1x/mois' },
    { icon: '⚡', label: 'Actions sprint complétées', target: '3 actions / semaine' },
    { icon: '📊', label: 'Taux de conversion', target: 'Mesuré chaque lundi' },
  ];

  return { okrs, weeklyDash };
}

function renderOKRs(data) {
  document.getElementById('okr-list').innerHTML = data.okrs.map(o => `
    <div class="sp-okr">
      <div class="sp-okr__header">
        <div class="sp-okr__num">${o.num}</div>
        <div class="sp-okr__obj">${o.obj}</div>
      </div>
      <div class="sp-okr__krs">
        ${o.krs.map(kr => `
          <div class="sp-kr">
            <span class="sp-kr__icon">${kr.icon}</span>
            <span class="sp-kr__label">${kr.label}</span>
            <span class="sp-kr__target">${kr.target}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `).join('');

  document.getElementById('weekly-dashboard').innerHTML = data.weeklyDash.map(w => `
    <div class="sp-kr" style="flex-direction:column; align-items:flex-start; gap:4px;">
      <div style="display:flex; align-items:center; gap:8px; width:100%;">
        <span style="font-size:1.1rem;">${w.icon}</span>
        <span style="font-size:0.82rem; font-weight:600; color:var(--text-dark); flex:1;">${w.label}</span>
      </div>
      <span style="font-size:0.75rem; color:var(--text-muted); padding-left: 28px;">${w.target}</span>
    </div>
  `).join('');

  document.getElementById('loading-4').style.display = 'none';
  document.getElementById('results-4').style.display = 'block';
}

// ============================================
// TEMPLATES SEMAINE 1 (Academy)
// ============================================
function generateTemplates() {
  document.getElementById('loading-5').style.display = 'block';
  document.getElementById('results-5').style.display = 'none';

  setTimeout(() => {
    const data = buildTemplates();
    SP.data.templates = data;
    SP.completedSteps.add(5);
    document.getElementById('dot-templates').classList.add('ready');
    renderTemplates(data);
    updateProgress();
  }, 1600);
}

function buildTemplates() {
  // Adapter le vocabulaire selon le secteur détecté dans l'ADN
  const sec = (SP.secteur || '').toLowerCase();
  const isSoin = /soin|domicile|aide|infirm|médic|santé|bcs|prepos/.test(sec);
  const isCoach = /coach|format|consult|mentor|accomp/.test(sec);

  const vocab = isSoin ? {
    prospect: 'famille ou proche aidant',
    client: 'bénéficiaire',
    service: 'les soins à domicile',
    decideur: 'la personne qui décide pour les soins',
    urgence: 'quand souhaitez-vous que les services débutent?',
    budget: 'Saviez-vous qu\'un crédit d\'impot de 35-40% s\'applique? Je vous explique avant d\'aller plus loin.',
    proposition: 'tarif net après crédit d\'impot (jamais le prix brut)',
    closing: 'On commence avec 3 visites par semaine ou 5?',
    objPrix: 'Avez-vous calculé avec le crédit d\'impot? Votre coût réel est [montant net].',
    objPenser: 'Votre [proche] est seul(e) pendant ce temps. Si on commence aujourd\'hui, j\'ai quelqu\'un d\'ici [délai].',
  } : isCoach ? {
    prospect: 'client potentiel ou organisation',
    client: 'participant',
    service: 'ton programme de coaching',
    decideur: 'la personne qui approuve les budgets de formation',
    urgence: 'pour quel trimestre planifiez-vous votre développement?',
    budget: 'Le programme est éligible aux crédits de formation (Loi 90 au QC). Je vous explique comment ça fonctionne.',
    proposition: 'investissement net après subvention de formation',
    closing: 'Tu préfères qu\'on démarre en individuel ou en groupe?',
    objPrix: 'Avez-vous vérifié votre admissibilité aux subventions de formation? Le coût net peut être réduit de 50%.',
    objPenser: 'Chaque mois sans structure coûte en productivité perdue. Qu\'est-ce qui te fait hésiter exactement?',
  } : {
    prospect: 'client potentiel',
    client: 'client',
    service: 'ta solution',
    decideur: 'la personne qui prend la décision finale',
    urgence: 'pour quand souhaitez-vous résoudre ce problème?',
    budget: 'Quel budget avez-vous alloué pour régler ce problème? (Pas de chiffre = pas de closing.)',
    proposition: 'prix transparent avec valeur justifiée',
    closing: 'Tu préfères qu\'on démarre cette semaine ou la semaine prochaine?',
    objPrix: 'Comparé au coût du problème non réglé, cet investissement se rembourse en [délai]. Voici comment.',
    objPenser: 'Qu\'est-ce qui te fait hésiter exactement? Le prix, la qualité, ou autre chose? Je préfère qu\'on en parle maintenant.',
  };

  return [
    {
      title: 'SOP #1 — Processus de vente H2H — 6 étapes',
      icon: '🤝',
      free: true,
      preview: `La méthode Human-to-Human adaptée à ton secteur. Le client achète la personne avant ${vocab.service}. 6 étapes répétables pour fermer plus vite.`,
      steps: [
        `Étape 1 — Prospection : identifier 10 ${vocab.prospect}s qualifiés par semaine. Source = référence, réseautage, appel sortant. Rappel en moins de 30 minutes à tout lead entrant.`,
        `Étape 2 — Préqualification (5 min max) : Zone géographique → ${vocab.decideur} → ${vocab.urgence} → ${vocab.budget} → besoins spécifiques. Si non qualifié → fermer proprement.`,
        `Étape 3 — Connexion H2H : "Parlez-moi de votre situation." Écouter SANS interrompre. Reformuler avec ses mots : "Si je comprends bien, vous cherchez... c'est bien ça?" Utiliser le prénom du ${vocab.client}.`,
        `Étape 4 — Proposition claire : Résumé des besoins en ses mots → services recommandés → ${vocab.proposition} → aucun engagement à long terme (éliminer la peur).`,
        `Étape 5 — Closing on-the-spot : "${vocab.closing}" JAMAIS "je vais y penser" sans date de rappel dans les 48h. OUI ou NON clair avant de raccrocher.`,
        `Étape 6 — Auto-évaluation post-appel (3 min) : Ai-je posé les 5 questions? Laissé parler en premier? Présenté le ${vocab.proposition}? Utilisé le closing alternatif? 1 phrase : qu'est-ce que j'aurais fait différemment?`,
      ]
    },
    {
      title: 'SOP #2 — Onboarding client (Semaine 1)',
      icon: '🚀',
      free: true,
      preview: `Le processus pour démarrer chaque nouveau ${vocab.client} du bon pied. Réduit les malentendus, augmente la satisfaction et la rétention.`,
      steps: [
        `Courriel de bienvenue dans les 2h : confirmer la décision, exprimer l'enthousiasme, envoyer les prochaines étapes`,
        `Appel kick-off dans les 48h : réviser les attentes, clarifier les livrables, établir le rythme de communication`,
        `Créer le dossier ${vocab.client} (numérique) : contrat, coordonnées, besoins documentés, historique`,
        `Configurer les outils partagés : accès, plateformes, canaux de communication préférés`,
        `Livrable Jour 7 : premier rapport ou point de progression — montrer que ça avance dès la première semaine`,
        `Sondage de satisfaction à J+14 : 3 questions max. Identifier les ajustements avant que ça devienne un problème`,
      ]
    },
    {
      title: 'SOP #3 — Revue hebdomadaire (15 min)',
      icon: '📊',
      free: false,
      preview: 'Ton rituel hebdomadaire de pilotage. Chaque lundi matin, 15 minutes qui décident du reste de la semaine.',
      steps: [
        'Vérifier tes 5 KPIs clés (revenus, prospects, conversions, rétention, NPS)',
        'Comparer vs semaine précédente et vs objectif mensuel',
        'Identifier le 1 blocage prioritaire à régler cette semaine',
        'Définir les 3 actions prioritaires de la semaine',
        'Ajuster le plan si nécessaire',
      ]
    },
    {
      title: 'SOP #4 — Relance prospects froids',
      icon: '🔄',
      free: false,
      preview: '80% des ventes se font après le 5e contact. Ce template structure tes relances pour ne jamais laisser un prospect mourir.',
      steps: [
        'J+1 : Courriel de suivi avec une ressource utile (pas de pitch)',
        'J+3 : Message LinkedIn personnel et bref',
        'J+7 : Courriel avec témoignage ou étude de cas',
        'J+14 : Offre de valeur (guide gratuit, diagnostic, démo)',
        'J+30 : Dernier contact — respect de la décision',
      ]
    },
    {
      title: 'SOP #5 — Bilan mensuel (30 min)',
      icon: '📈',
      free: false,
      preview: 'Le rituel mensuel pour prendre du recul, mesurer les progrès réels et ajuster la stratégie.',
      steps: [
        'Compiler les chiffres du mois (revenus, dépenses, marge, clients)',
        'Comparer aux objectifs du plan d\'affaires',
        'Analyser les 3 meilleures décisions du mois',
        'Analyser les 3 décisions à corriger',
        'Ajuster le plan pour le mois suivant',
        'Documenter dans ton journal de décisions',
      ]
    },
    {
      title: 'SOP #6 — Script H2H complet + 4 objections + grille auto-évaluation',
      icon: '🎯',
      free: false,
      preview: `Les scripts mot-à-mot pour chaque étape H2H, adaptés à ton secteur. Les 4 objections les plus fréquentes avec les réponses exactes. La grille de 8 critères à remplir après chaque appel.`,
      steps: [
        `Script préqualification : "Dans quelle zone géographique êtes-vous?" / "Êtes-vous ${vocab.decideur}?" / "${vocab.urgence}" / "${vocab.budget}" / "Quel type d'aide recherchez-vous?"`,
        `Script H2H connexion : "Parlez-moi de votre situation — qu'est-ce qui vous a amené à nous appeler?" → écouter → "Si je comprends bien, [reformulation avec ses mots]. C'est bien ça?"`,
        `Script proposition : "Basé sur ce que vous m'avez dit, je recommande [services] à une fréquence de [X]. Le ${vocab.proposition} est de [montant]. Aucun contrat à long terme."`,
        `Objection PRIX → "${vocab.objPrix}"`,
        `Objection "JE VAIS Y PENSER" → "${vocab.objPenser}" | Objection "J'EN PARLE À MON/MA..." → "Peut-on les appeler ensemble maintenant ou demain?"`,
        `Grille auto-éval post-appel (3 min) : 5 questions de préqualif posées? / Laissé parler en premier? / Prix net présenté? / Closing alternatif utilisé? / Résultat OUI/NON/Rappel (date)? / Objection principale / Ce que j'aurais fait différemment`,
        `Règle absolue du pipeline : JAMAIS "en réflexion" sans date de rappel dans les 48h. Fermer proprement chaque dossier — OUI ou NON. Taux de closing < 40% = session coaching obligatoire.`,
      ]
    },
  ];
}

function renderTemplates(templates) {
  document.getElementById('templates-list').innerHTML = templates.map((t, i) => {
    const isFree = t.free;
    const stepsHTML = t.steps.map(s => `<li>${s}</li>`).join('');

    return `
      <div class="sp-template">
        <div class="sp-template__header" onclick="toggleTemplate(${i})">
          <div class="sp-template__title">
            ${t.icon} ${t.title}
            <span class="sp-template__badge sp-template__badge--${isFree ? 'free' : 'paid'}">${isFree ? 'Gratuit' : 'Premium'}</span>
          </div>
          <span style="color:var(--text-muted); font-size: 0.8rem;" id="toggle-icon-${i}">▼</span>
        </div>
        <div class="sp-template__body" id="template-body-${i}" style="display:none;">
          ${isFree ? `
            <div class="sp-template__preview">${t.preview}</div>
            <ol class="sp-template__steps">${stepsHTML}</ol>
          ` : `
            <div class="sp-template__preview">${t.preview}</div>
            <div class="sp-blur-wrap">
              <ol class="sp-template__steps sp-blur-content">${stepsHTML}</ol>
              <div class="sp-paywall">
                <div class="sp-paywall__inner">
                  <div class="sp-paywall__icon">🔒</div>
                  <div class="sp-paywall__title">Template Premium</div>
                  <div class="sp-paywall__price">99 $ CAD</div>
                  <button class="sp-btn sp-btn--gold" onclick="alertPDF()">Obtenir les 5 templates complets →</button>
                </div>
              </div>
            </div>
          `}
        </div>
      </div>
    `;
  }).join('');
}

function toggleTemplate(i) {
  const body = document.getElementById(`template-body-${i}`);
  const icon = document.getElementById(`toggle-icon-${i}`);
  const isOpen = body.style.display !== 'none';
  body.style.display = isOpen ? 'none' : 'block';
  icon.textContent = isOpen ? '▼' : '▲';
}

// ============================================
// EXPORT
// ============================================
function renderExport() {
  SP.completedSteps.add(6);
  updateProgress();
}

function exportTxt() {
  const lines = [];
  lines.push('SPRINT 90 JOURS — BILDOP');
  lines.push(`Entreprise : ${SP.businessName}`);
  lines.push(`Secteur : ${SP.secteur || '–'}`);
  lines.push(`Généré le : ${new Date().toLocaleDateString('fr-CA')}`);
  lines.push('='.repeat(60));
  lines.push('');

  if (SP.data.phase1) {
    lines.push('## PHASE 1 — FONDATIONS (Jours 1-30)');
    lines.push(`Focus : ${SP.data.phase1.fluxFocus}`);
    lines.push(`Jalon : ${SP.data.phase1.milestone}`);
    lines.push('');
    lines.push('ACTIONS :');
    SP.data.phase1.actions.forEach((a, i) => {
      lines.push(`${i+1}. ${a.title} | Responsable: ${a.resp} | Délai: ${a.delai} | Impact: ${a.impact}`);
    });
    lines.push('');
  }

  if (SP.data.phase2) {
    lines.push('## PHASE 2 — MOMENTUM (Jours 31-60)');
    lines.push(`Jalon : ${SP.data.phase2.milestone}`);
    lines.push('');
    lines.push('ACTIONS :');
    SP.data.phase2.actions.forEach((a, i) => {
      lines.push(`${i+1}. ${a.title} | Responsable: ${a.resp} | Délai: ${a.delai}`);
    });
    lines.push('');
  }

  if (SP.data.phase3) {
    lines.push('## PHASE 3 — ACCÉLÉRATION (Jours 61-90)');
    lines.push(`Jalon : ${SP.data.phase3.milestone}`);
    lines.push('');
    lines.push('ACTIONS :');
    SP.data.phase3.actions.forEach((a, i) => {
      lines.push(`${i+1}. ${a.title} | Responsable: ${a.resp} | Délai: ${a.delai}`);
    });
    lines.push('');
  }

  if (SP.data.okrs) {
    lines.push('## OKRs 90 JOURS');
    SP.data.okrs.okrs.forEach(o => {
      lines.push(`${o.num} : ${o.obj}`);
      o.krs.forEach(kr => lines.push(`  → ${kr.label} : ${kr.target}`));
      lines.push('');
    });
  }

  lines.push('## CHECKLIST SEMAINE 1');
  lines.push('□ Ouvrir ce document le lundi matin');
  lines.push('□ Identifier l\'action #1 et la compléter avant midi');
  lines.push('□ Faire le point sur les KPIs le vendredi');
  lines.push('□ Préparer les 3 priorités de la semaine suivante');
  lines.push('');
  lines.push('');
  lines.push('⚠️ AVERTISSEMENT : Ce plan est généré à partir de données simulées et d\'un diagnostic automatisé.');
  lines.push('Il ne remplace pas l\'avis d\'un comptable, d\'un conseiller financier ou d\'un mentor d\'affaires.');
  lines.push('Validez chaque recommandation avec votre réalité terrain avant d\'investir.');
  lines.push('');
  lines.push('— Généré par BILDOP.COM | Fait au Québec 🇨🇦 —');

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bildop-sprint-90-jours-${SP.businessName.replace(/\s+/g, '-').toLowerCase()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function alertPDF() {
  alert('Export PDF Premium — 99$ CAD\n\nCette fonctionnalité sera disponible lors du lancement officiel de Bildop.\n\nPour y avoir accès en avant-première, contacte-nous : info@bildop.com');
}

function alertCoaching() {
  alert('Coaching stratégique — 199$ CAD\n\nUne session d\'1h avec un stratège Bildop pour valider ton plan.\n\nPour prendre rendez-vous : info@bildop.com');
}

// --- Nav mobile ---
document.getElementById('navToggle')?.addEventListener('click', () => {
  document.getElementById('navLinks')?.classList.toggle('open');
});
