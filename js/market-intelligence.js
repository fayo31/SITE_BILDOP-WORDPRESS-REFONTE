/* ============================================
   BILDOP — Market Intelligence Module
   Inspiré de Cook.ai · Propulsé par Claude AI
   ============================================ */

// --- État global ---
const MI_STATE = {
  niche: '',
  currentStep: 0,
  completedSteps: new Set(),
  data: {
    market: null,
    competitors: null,
    avatar: null,
    content: null,
    hooks: null,
  }
};

const STORAGE_KEY = 'bildop_market_intelligence';

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  loadState();
  checkAdnData();
  renderOutputDots();
});

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      Object.assign(MI_STATE, parsed);
      MI_STATE.completedSteps = new Set(parsed.completedSteps || []);
    }
  } catch(e) {}
}

function saveState() {
  try {
    const toSave = {
      ...MI_STATE,
      completedSteps: [...MI_STATE.completedSteps]
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toSave));
  } catch(e) {}
}

// --- Lecture ADN Module 1 ---
function checkAdnData() {
  try {
    const raw = localStorage.getItem('bildop_questionnaire');
    if (!raw) return;
    const answers = JSON.parse(raw);
    const nom = answers['1'] || '';
    const secteur = answers['3'] || '';
    const produit = answers['21'] || '';
    if (nom || secteur) {
      const suggestion = [nom, secteur, produit].filter(Boolean).join(' — ');
      document.getElementById('adnSuggestion').style.display = 'block';
      document.getElementById('adnText').textContent = suggestion;
    }
  } catch(e) {}
}

function useAdnSuggestion() {
  const text = document.getElementById('adnText').textContent;
  document.getElementById('nicheInput').value = text;
  startAnalysis();
}

function setNiche(niche) {
  document.getElementById('nicheInput').value = niche;
  document.getElementById('nicheInput').focus();
}

// --- Navigation ---
function goToStep(step) {
  // Vérifier si l'étape est accessible
  if (step > 0 && !MI_STATE.niche) {
    alert('Entre d\'abord ta niche pour commencer l\'analyse.');
    return;
  }

  // Masquer tous les panels
  document.querySelectorAll('.mi-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.mi-step-btn').forEach(b => b.classList.remove('active'));

  // Activer le bon panel
  document.getElementById(`panel-${step}`).classList.add('active');
  document.querySelector(`[data-step="${step}"]`).classList.add('active');

  MI_STATE.currentStep = step;
  updateProgress();
  saveState();

  // Lancer l'analyse si pas encore fait
  if (step === 1 && !MI_STATE.data.market) runMarketAnalysis();
  if (step === 2 && !MI_STATE.data.competitors) runCompetitorAnalysis();
  if (step === 3 && !MI_STATE.data.avatar) runAvatarAnalysis();
  if (step === 4 && !MI_STATE.data.content) runContentAnalysis();
  if (step === 5 && !MI_STATE.data.hooks) runHooksAnalysis();

  // Mettre à jour les titres
  ['1','2','3','4','5','6'].forEach(i => {
    const el = document.getElementById(`nicheTitle${i}`);
    if (el) el.textContent = MI_STATE.niche;
  });

  // Scroll vers le haut
  document.querySelector('.mi-main').scrollTop = 0;
  window.scrollTo(0, 0);
}

function updateProgress() {
  const total = 6;
  const done = MI_STATE.completedSteps.size;
  const pct = Math.round((done / total) * 100);
  document.getElementById('progressBar').style.width = pct + '%';

  // Marquer les étapes complétées dans la sidebar
  MI_STATE.completedSteps.forEach(s => {
    const btn = document.querySelector(`[data-step="${s}"]`);
    if (btn) {
      btn.classList.add('completed');
      const icon = btn.querySelector('.mi-step-icon');
      if (icon && s < 6) icon.textContent = '✅';
    }
  });
}

function renderOutputDots() {
  const map = {
    'out-market': 'market',
    'out-comp': 'competitors',
    'out-avatar': 'avatar',
    'out-content': 'content',
    'out-hooks': 'hooks',
  };
  Object.entries(map).forEach(([id, key]) => {
    const el = document.getElementById(id);
    if (el && MI_STATE.data[key]) el.classList.add('ready');
  });
}

// --- Démarrer l'analyse ---
function startAnalysis() {
  const input = document.getElementById('nicheInput').value.trim();
  if (!input) {
    document.getElementById('nicheInput').focus();
    return;
  }
  MI_STATE.niche = input;
  MI_STATE.data = { market: null, competitors: null, avatar: null, content: null, hooks: null };
  MI_STATE.completedSteps = new Set();
  saveState();
  goToStep(1);
}

// --- Animation des étapes d'analyse ---
function animateSteps(containerId, callback) {
  const steps = document.querySelectorAll(`#${containerId} .mi-analyzing__step`);
  steps.forEach((step, i) => {
    const delay = parseInt(step.dataset.delay) || (i * 700);
    setTimeout(() => {
      step.classList.add('visible');
      if (i > 0) {
        steps[i-1].classList.add('done');
        steps[i-1].classList.remove('visible');
      }
    }, delay);
  });
  const lastDelay = parseInt(steps[steps.length - 1]?.dataset.delay || 0) + 800;
  setTimeout(() => {
    steps[steps.length - 1]?.classList.add('done');
    if (callback) callback();
  }, lastDelay + 400);
}

// ============================================
// STEP 1 — Analyse de marché
// ============================================
function runMarketAnalysis() {
  document.getElementById('analyzing-1').style.display = 'block';
  document.getElementById('results-1').style.display = 'none';

  animateSteps('steps-1', () => {
    const data = generateMarketData(MI_STATE.niche);
    MI_STATE.data.market = data;
    MI_STATE.completedSteps.add(1);
    saveState();
    renderMarketResults(data);
    document.getElementById('out-market').classList.add('ready');
    updateProgress();
  });
}

function generateMarketData(niche) {
  const nicheLower = niche.toLowerCase();

  // Données contextuelles selon la niche
  const profiles = {
    fitness: {
      volume: '+340%', volumeDesc: 'Croissance des recherches sur 12 mois',
      size: '96 Mrd $', sizeDesc: 'Marché mondial fitness en ligne 2025',
      comp: 'Élevée', compDesc: 'Marché saturé mais fragmenté — la niche spécifique est clé',
      opp: '🔥 Forte', oppDesc: 'Les niches hyper-spécifiques (âge/problème) dominent',
      insight: 'Le marché fitness en ligne est saturé en généraliste, mais les niches ultra-spécifiques (femmes 40+ post-ménopause, hommes 50+ mobilité) ont 10x moins de compétition et 3x plus de conversion. La spécificité est ton avantage concurrentiel.',
      moves: ['Choisir une sous-niche ultra-précise (ex: femmes 45-55 ans, perte de poids post-ménopause)', 'Créer un contenu éducatif autour des erreurs communes dans ta sous-niche', 'Lancer une offre d\'entrée à faible friction (défi 7 jours gratuit)'],
      gaps: ['Coaching pour seniors actifs', 'Fitness post-grossesse', 'Mobilité & douleurs chroniques', 'Athlètes masters 50+', 'Fitness adapté handicap']
    },
    coaching: {
      volume: '+280%', volumeDesc: 'Croissance des recherches coaching en ligne',
      size: '20 Mrd $', sizeDesc: 'Marché coaching en ligne Amérique du Nord',
      comp: 'Moyenne', compDesc: 'Compétition forte en généraliste, faible en niche',
      opp: '⚡ Très forte', oppDesc: 'Coaching spécialisé = prix premium + meilleure rétention',
      insight: 'Le coaching généraliste est mort. Les coachs qui gagnent en 2025 sont ultra-spécialisés sur un résultat précis pour un avatar précis. "Je coache les entrepreneurs qui veulent passer de 0 à 10k$/mois en 90 jours" bat "Je coache les entrepreneurs" à tous les niveaux.',
      moves: ['Définir ton résultat promis en chiffres et en délai précis', 'Créer 3 études de cas clients avec résultats mesurables', 'Lancer un webinaire de positionnement pour qualifier tes prospects'],
      gaps: ['Coaching transition de carrière 40+', 'Coaching pour femmes entrepreneurs', 'Coaching performance sportive mentale', 'Coaching pour introvertis en leadership']
    },
    soin: {
      volume: '+180%', volumeDesc: 'Croissance recherches soins à domicile',
      size: '450 Mrd $', sizeDesc: 'Marché mondial soins à domicile 2025',
      comp: 'Faible-Moyenne', compDesc: 'Marché local peu digitalisé — avantage premier arrivant',
      opp: '🚀 Exceptionnelle', oppDesc: 'Vieillissement population + sous-digitalisation = opportunité majeure',
      insight: 'Le secteur des soins à domicile est massivement sous-digitalisé. 90% des familles cherchent des prestataires en ligne mais 70% des agences n\'ont pas de présence numérique optimisée. Celui qui maîtrise le digital dans ce secteur prend tout.',
      moves: ['Optimiser ta présence Google Maps et avis clients', 'Créer du contenu éducatif pour les proches aidants (SEO fort)', 'Mettre en place un système de référencement depuis les CLSC et médecins'],
      gaps: ['Soins spécialisés Alzheimer', 'Accompagnement post-chirurgie', 'Répit pour proches aidants', 'Soins pédiatriques à domicile']
    },
    default: {
      volume: '+220%', volumeDesc: 'Croissance des recherches sur 12 mois',
      size: '12 Mrd $', sizeDesc: 'Estimation marché adressable',
      comp: 'Moyenne', compDesc: 'Opportunités dans les sous-niches spécialisées',
      opp: '⚡ Forte', oppDesc: 'Marché en croissance avec des gaps identifiés',
      insight: `Le marché "${niche}" est en pleine expansion. Les acteurs qui dominent ne sont pas nécessairement les meilleurs — ils sont les mieux positionnés. Une niche ultra-spécifique avec un message clair surpasse systématiquement les généralistes, même avec moins de ressources.`,
      moves: [`Identifier les 3 sous-segments les plus rentables dans "${niche}"`, 'Analyser les avis négatifs des concurrents pour trouver les gaps', 'Tester une offre d\'entrée à faible risque pour valider la demande'],
      gaps: ['Segment premium sous-servi', 'Niche géographique spécifique', 'Problème spécifique non résolu', 'Nouveau segment démographique']
    }
  };

  let profile = profiles.default;
  if (nicheLower.includes('fitness') || nicheLower.includes('sport') || nicheLower.includes('santé')) profile = profiles.fitness;
  else if (nicheLower.includes('coaching') || nicheLower.includes('formation') || nicheLower.includes('cours')) profile = profiles.coaching;
  else if (nicheLower.includes('soin') || nicheLower.includes('domicile') || nicheLower.includes('aide')) profile = profiles.soin;

  return profile;
}

function renderMarketResults(data) {
  document.getElementById('r1-volume').textContent = data.volume;
  document.getElementById('r1-volume-desc').textContent = data.volumeDesc;
  document.getElementById('r1-size').textContent = data.size;
  document.getElementById('r1-size-desc').textContent = data.sizeDesc;
  document.getElementById('r1-comp').textContent = data.comp;
  document.getElementById('r1-comp-desc').textContent = data.compDesc;
  document.getElementById('r1-opp').textContent = data.opp;
  document.getElementById('r1-opp-desc').textContent = data.oppDesc;
  document.getElementById('r1-insight').textContent = data.insight;

  // Moves
  const movesEl = document.getElementById('r1-moves');
  movesEl.innerHTML = data.moves.map((m, i) => `
    <div style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid var(--gray-200,#e2e8f0);">
      <div style="width:28px;height:28px;border-radius:50%;background:linear-gradient(135deg,var(--navy),var(--violet));color:#fff;font-size:12px;font-weight:700;display:flex;align-items:center;justify-content:center;flex-shrink:0;font-family:'Audiowide',sans-serif;">${i+1}</div>
      <div style="font-size:0.9rem;color:var(--text-dark);line-height:1.5;">${m}</div>
    </div>
  `).join('');

  // Gaps
  const gapsEl = document.getElementById('r1-gaps');
  gapsEl.innerHTML = data.gaps.map(g => `<span class="mi-tag mi-tag--sky">${g}</span>`).join('');

  document.getElementById('analyzing-1').style.display = 'none';
  document.getElementById('results-1').style.display = 'block';
}

// ============================================
// STEP 2 — Concurrents
// ============================================
function runCompetitorAnalysis() {
  document.getElementById('analyzing-2').style.display = 'block';
  document.getElementById('results-2').style.display = 'none';

  animateSteps('steps-2', () => {
    const data = generateCompetitorData(MI_STATE.niche);
    MI_STATE.data.competitors = data;
    MI_STATE.completedSteps.add(2);
    saveState();
    renderCompetitorResults(data);
    document.getElementById('out-comp').classList.add('ready');
    updateProgress();
  });
}

function generateCompetitorData(niche) {
  const nicheLower = niche.toLowerCase();

  const templates = {
    fitness: {
      competitors: [
        { name: 'FitLife Pro', position: 'Coaching fitness généraliste en ligne', price: '97$/mois', threat: 'high', gap: 'Trop généraliste, pas de niche spécifique' },
        { name: 'BodyTransform', position: 'Transformation physique 12 semaines', price: '497$ programme', threat: 'mid', gap: 'Pas de suivi personnalisé après le programme' },
        { name: 'ActiveNation', position: 'Communauté fitness + contenu gratuit', price: 'Freemium', threat: 'mid', gap: 'Monétisation faible, pas de coaching 1-1' },
        { name: 'EliteCoach', position: 'Coaching premium 1-1', price: '500$/mois', threat: 'low', gap: 'Prix inaccessible, liste d\'attente longue' },
      ],
      diff: `Aucun concurrent ne cible spécifiquement "${niche}". L'opportunité est de créer la référence absolue pour ce segment précis avec un message ultra-ciblé et des résultats mesurables.`
    },
    default: {
      competitors: [
        { name: 'Leader Généraliste', position: `Acteur dominant en ${niche}`, price: 'Prix moyen marché', threat: 'high', gap: 'Service impersonnel, peu de suivi client' },
        { name: 'Concurrent #2', position: 'Positionnement prix bas', price: '-30% marché', threat: 'mid', gap: 'Qualité perçue faible, pas de différenciation' },
        { name: 'Acteur Local', position: 'Présence locale forte', price: 'Prix premium local', threat: 'mid', gap: 'Pas de présence digitale, pas de scalabilité' },
        { name: 'Nouveau Entrant', position: 'Approche digitale first', price: 'Modèle SaaS/abonnement', threat: 'low', gap: 'Manque de crédibilité et de preuves sociales' },
      ],
      diff: `La faille principale dans ce marché : les acteurs existants ne parlent pas le langage émotionnel de leur client. Ils vendent des features, pas des transformations. Ton avantage : positionner ton offre autour du résultat final et de la transformation, pas du service.`
    }
  };

  let profile = templates.default;
  if (nicheLower.includes('fitness') || nicheLower.includes('sport')) profile = templates.fitness;

  return profile;
}

function renderCompetitorResults(data) {
  const tbody = document.getElementById('compTableBody');
  tbody.innerHTML = data.competitors.map(c => `
    <tr>
      <td><strong>${c.name}</strong></td>
      <td style="font-size:0.85rem;">${c.position}</td>
      <td style="font-size:0.85rem;white-space:nowrap;">${c.price}</td>
      <td><span class="mi-score-pill mi-score-pill--${c.threat}">${c.threat === 'high' ? 'Élevée' : c.threat === 'mid' ? 'Moyenne' : 'Faible'}</span></td>
      <td style="font-size:0.82rem;color:var(--text-muted);">${c.gap}</td>
    </tr>
  `).join('');

  document.getElementById('r2-diff').textContent = data.diff;
  document.getElementById('analyzing-2').style.display = 'none';
  document.getElementById('results-2').style.display = 'block';
}

// ============================================
// STEP 3 — Avatar client
// ============================================
function runAvatarAnalysis() {
  document.getElementById('analyzing-3').style.display = 'block';
  document.getElementById('results-3').style.display = 'none';

  animateSteps('steps-3', () => {
    const data = generateAvatarData(MI_STATE.niche);
    MI_STATE.data.avatar = data;
    MI_STATE.completedSteps.add(3);
    saveState();
    renderAvatarResults(data);
    document.getElementById('out-avatar').classList.add('ready');
    updateProgress();
  });
}

function generateAvatarData(niche) {
  const nicheLower = niche.toLowerCase();

  const avatars = {
    fitness: {
      name: 'Sophie, 43 ans',
      role: 'Directrice marketing · Mère de 2 enfants · Laval, QC',
      pains: ['Manque de temps — travaille 50h/semaine', 'A essayé 4 programmes sans résultats durables', 'Se sent jugée dans les gyms traditionnels', 'Énergie en baisse depuis la quarantaine'],
      desires: ['Retrouver son énergie et sa confiance', 'Voir des résultats en 8 semaines', 'Programme qui s\'adapte à son horaire chargé', 'Communauté bienveillante sans jugement'],
      objections: ['"J\'ai déjà essayé, ça n\'a pas marché"', '"Je n\'ai pas le temps"', '"C\'est trop cher"', '"Je ne suis pas disciplinée"'],
      vocab: ['"Je suis épuisée"', '"Je veux me sentir bien dans ma peau"', '"J\'ai besoin de quelque chose de réaliste"', '"Je veux que ça dure cette fois"'],
      message: '"En 8 semaines, sans sacrifier tes soirées en famille ni ton budget, tu vas retrouver l\'énergie et la confiance que tu avais à 30 ans — avec un programme conçu pour les femmes occupées comme toi."'
    },
    soin: {
      name: 'Marie-Claude, 58 ans',
      role: 'Proche aidante · Fille d\'un parent âgé · Brossard, QC',
      pains: ['Culpabilité de ne pas pouvoir s\'occuper de son parent', 'Peur de choisir le mauvais prestataire', 'Manque d\'information sur les options disponibles', 'Épuisement émotionnel et physique'],
      desires: ['Savoir que son parent est en sécurité et heureux', 'Trouver un prestataire de confiance rapidement', 'Comprendre les aides financières disponibles', 'Avoir la paix d\'esprit'],
      objections: ['"Comment savoir si je peux faire confiance?"', '"Est-ce que c\'est couvert par l\'assurance?"', '"Mon parent ne voudra peut-être pas"', '"C\'est trop compliqué à organiser"'],
      vocab: ['"Je veux que maman soit bien"', '"J\'ai besoin de quelqu\'un de fiable"', '"Je ne sais pas par où commencer"', '"Je veux garder mon indépendance"'],
      message: '"Nous prenons soin de votre parent comme si c\'était le nôtre — avec des intervenants certifiés, un suivi transparent et un accompagnement pour vous aussi, proche aidant."'
    },
    default: {
      name: `Client idéal — ${niche}`,
      role: 'Profil psychographique généré par IA',
      pains: ['Frustration face aux solutions existantes inadaptées', 'Manque de temps et de ressources', 'Incertitude sur la meilleure approche', 'Sentiment d\'être incompris par les prestataires actuels'],
      desires: ['Résultat rapide et mesurable', 'Solution simple et clé en main', 'Accompagnement personnalisé', 'Retour sur investissement clair'],
      objections: ['"Est-ce que ça va vraiment marcher pour moi?"', '"C\'est trop cher pour ce que c\'est"', '"J\'ai déjà essayé quelque chose de similaire"', '"Je n\'ai pas le temps de m\'y consacrer"'],
      vocab: ['"Je veux des résultats concrets"', '"J\'ai besoin que ce soit simple"', '"Je cherche quelqu\'un en qui avoir confiance"', '"Je veux que ça vaille mon investissement"'],
      message: `"Nous avons créé la solution la plus simple et la plus efficace pour [résultat précis] — spécifiquement pour les personnes dans ta situation. Résultats garantis ou remboursé."`
    }
  };

  let profile = avatars.default;
  if (nicheLower.includes('fitness') || nicheLower.includes('sport')) profile = avatars.fitness;
  else if (nicheLower.includes('soin') || nicheLower.includes('domicile') || nicheLower.includes('aide')) profile = avatars.soin;

  return profile;
}

function renderAvatarResults(data) {
  document.getElementById('avatarName').textContent = data.name;
  document.getElementById('avatarRole').textContent = data.role;

  const renderItems = (id, items) => {
    document.getElementById(id).innerHTML = items.map(item =>
      `<div class="mi-avatar-item">${item}</div>`
    ).join('');
  };

  renderItems('avatarPains', data.pains);
  renderItems('avatarDesires', data.desires);
  renderItems('avatarObjections', data.objections);
  renderItems('avatarVocab', data.vocab);

  document.getElementById('avatarMessage').textContent = data.message;
  document.getElementById('analyzing-3').style.display = 'none';
  document.getElementById('results-3').style.display = 'block';
}

// ============================================
// STEP 4 — Contenu viral
// ============================================
function runContentAnalysis() {
  document.getElementById('analyzing-4').style.display = 'block';
  document.getElementById('results-4').style.display = 'none';

  animateSteps('steps-4', () => {
    const data = generateContentData(MI_STATE.niche);
    MI_STATE.data.content = data;
    MI_STATE.completedSteps.add(4);
    saveState();
    renderContentResults(data);
    document.getElementById('out-content').classList.add('ready');
    updateProgress();
  });
}

function generateContentData(niche) {
  const contentTypes = [
    { emoji: '🎬', bg: 'linear-gradient(135deg,#1e3a5f,#2d6a9f)', hook: `"Pourquoi 90% des gens échouent en ${niche}"`, plays: '98.4K', type: 'Vidéo éducative', format: 'Reel/TikTok' },
    { emoji: '📊', bg: 'linear-gradient(135deg,#1a5c3a,#22c55e)', hook: `"J'ai analysé 100 cas en ${niche} — voici ce que j'ai trouvé"`, plays: '134K', type: 'Data & insights', format: 'Carrousel' },
    { emoji: '🔥', bg: 'linear-gradient(135deg,#7c1d6f,#ec4899)', hook: `"La vérité que personne ne te dit sur ${niche}"`, plays: '210K', type: 'Opinion forte', format: 'Reel/TikTok' },
    { emoji: '✅', bg: 'linear-gradient(135deg,#1e3a5f,#0099cc)', hook: `"De 0 à [résultat] en 30 jours — voici exactement comment"`, plays: '87K', type: 'Transformation', format: 'Vidéo longue' },
    { emoji: '❌', bg: 'linear-gradient(135deg,#7f1d1d,#ef4444)', hook: `"Arrête de faire ça si tu veux réussir en ${niche}"`, plays: '156K', type: 'Erreurs à éviter', format: 'Reel/TikTok' },
    { emoji: '💡', bg: 'linear-gradient(135deg,#78350f,#f59e0b)', hook: `"Le secret des experts en ${niche} que les débutants ignorent"`, plays: '73K', type: 'Hack/Astuce', format: 'Carrousel' },
  ];

  const lessons = [
    { icon: '🎯', text: 'Les accroches avec un chiffre précis ("90%", "100 cas", "30 jours") génèrent 3x plus d\'engagement' },
    { icon: '📱', text: 'Les formats courts (15-30 secondes) avec une promesse claire en première seconde dominent' },
    { icon: '🔥', text: 'Les contenus qui challengent une croyance populaire ("La vérité que personne ne te dit") créent la controverse et la viralité' },
    { icon: '✅', text: 'Les transformations avant/après avec des résultats mesurables convertissent le mieux en clients payants' },
  ];

  return { contentTypes, lessons };
}

function renderContentResults(data) {
  const grid = document.getElementById('contentGrid');
  grid.innerHTML = data.contentTypes.map(c => `
    <div class="mi-content-card">
      <div class="mi-content-card__thumb" style="background:${c.bg};">
        <span style="font-size:2.5rem;">${c.emoji}</span>
        <div class="mi-content-card__plays">▶ ${c.plays}</div>
      </div>
      <div class="mi-content-card__body">
        <div class="mi-content-card__hook">${c.hook}</div>
        <div class="mi-content-card__meta">${c.type} · ${c.format}</div>
      </div>
    </div>
  `).join('');

  const lessons = document.getElementById('contentLessons');
  lessons.innerHTML = data.lessons.map(l => `
    <div style="display:flex;align-items:flex-start;gap:12px;padding:10px 0;border-bottom:1px solid var(--gray-200,#e2e8f0);">
      <span style="font-size:1.2rem;flex-shrink:0;">${l.icon}</span>
      <span style="font-size:0.9rem;color:var(--text-dark);line-height:1.5;">${l.text}</span>
    </div>
  `).join('');

  document.getElementById('analyzing-4').style.display = 'none';
  document.getElementById('results-4').style.display = 'block';
}

// ============================================
// STEP 5 — Accroches gagnantes
// ============================================
function runHooksAnalysis() {
  document.getElementById('analyzing-5').style.display = 'block';
  document.getElementById('results-5').style.display = 'none';

  animateSteps('steps-5', () => {
    const data = generateHooksData(MI_STATE.niche);
    MI_STATE.data.hooks = data;
    MI_STATE.completedSteps.add(5);
    saveState();
    renderHooksResults(data);
    document.getElementById('out-hooks').classList.add('ready');
    updateProgress();
  });
}

function generateHooksData(niche) {
  const hooks = [
    { text: `"Pourquoi tu n'arrives pas à [résultat] en ${niche} — et ce que tu dois faire à la place"`, score: '94%' },
    { text: `"J'ai aidé 47 personnes à [résultat précis] en ${niche} en moins de 30 jours. Voici comment."`, score: '91%' },
    { text: `"La méthode que les experts en ${niche} ne veulent pas que tu connaisses"`, score: '88%' },
    { text: `"Si tu fais encore ça en ${niche}, tu vas continuer à échouer (et voici pourquoi)"`, score: '86%' },
    { text: `"De [situation actuelle] à [résultat désiré] en ${niche} — sans [obstacle principal]"`, score: '85%' },
    { text: `"Le seul truc qui a changé ma façon de voir ${niche} pour toujours"`, score: '82%' },
    { text: `"Personne ne te dit ça sur ${niche} parce que ça détruirait leur business"`, score: '79%' },
    { text: `"J'ai analysé les 10 meilleurs en ${niche}. Voici le pattern qu'ils ont tous en commun."`, score: '77%' },
  ];

  const pattern = `Dans ce marché, les accroches qui convertissent le mieux utilisent 3 éléments : (1) un chiffre précis qui crée de la crédibilité, (2) une promesse de résultat mesurable dans un délai défini, et (3) un élément de surprise ou de contre-intuition qui brise la croyance populaire. Combine ces 3 éléments et ton taux d'engagement va exploser.`;

  return { hooks, pattern };
}

function renderHooksResults(data) {
  const list = document.getElementById('hooksList');
  list.innerHTML = data.hooks.map((h, i) => `
    <div class="mi-hook-item" onclick="this.classList.toggle('selected')">
      <div class="mi-hook-item__num">${i+1}</div>
      <div class="mi-hook-item__text">${h.text}</div>
      <div class="mi-hook-item__score">${h.score}</div>
    </div>
  `).join('');

  document.getElementById('hooksPattern').textContent = data.pattern;
  document.getElementById('analyzing-5').style.display = 'none';
  document.getElementById('results-5').style.display = 'block';
}

// ============================================
// Export rapport
// ============================================
function exportReport() {
  if (!MI_STATE.niche) return;

  const lines = [];
  lines.push(`RAPPORT MARKET INTELLIGENCE — BILDOP.AI`);
  lines.push(`Niche analysée : ${MI_STATE.niche}`);
  lines.push(`Généré le : ${new Date().toLocaleDateString('fr-CA')}`);
  lines.push(`${'='.repeat(60)}`);
  lines.push('');

  if (MI_STATE.data.market) {
    lines.push('## ANALYSE DE MARCHÉ');
    lines.push(`Volume de recherche : ${MI_STATE.data.market.volume}`);
    lines.push(`Taille du marché : ${MI_STATE.data.market.size}`);
    lines.push(`Compétition : ${MI_STATE.data.market.comp}`);
    lines.push(`Opportunité : ${MI_STATE.data.market.opp}`);
    lines.push('');
    lines.push('INSIGHT PRINCIPAL :');
    lines.push(MI_STATE.data.market.insight);
    lines.push('');
    lines.push('TES 3 PROCHAINS MOUVEMENTS :');
    MI_STATE.data.market.moves.forEach((m, i) => lines.push(`${i+1}. ${m}`));
    lines.push('');
    lines.push('GAPS IDENTIFIÉS :');
    lines.push(MI_STATE.data.market.gaps.join(' · '));
    lines.push('');
  }

  if (MI_STATE.data.competitors) {
    lines.push('## ANALYSE CONCURRENTIELLE');
    MI_STATE.data.competitors.competitors.forEach(c => {
      lines.push(`- ${c.name} : ${c.position} | ${c.price} | Menace: ${c.threat}`);
      lines.push(`  Faille : ${c.gap}`);
    });
    lines.push('');
    lines.push('OPPORTUNITÉ DE DIFFÉRENCIATION :');
    lines.push(MI_STATE.data.competitors.diff);
    lines.push('');
  }

  if (MI_STATE.data.avatar) {
    lines.push('## AVATAR CLIENT');
    lines.push(`Profil : ${MI_STATE.data.avatar.name} — ${MI_STATE.data.avatar.role}`);
    lines.push('');
    lines.push('DOULEURS :');
    MI_STATE.data.avatar.pains.forEach(p => lines.push(`- ${p}`));
    lines.push('');
    lines.push('DÉSIRS :');
    MI_STATE.data.avatar.desires.forEach(d => lines.push(`- ${d}`));
    lines.push('');
    lines.push('OBJECTIONS :');
    MI_STATE.data.avatar.objections.forEach(o => lines.push(`- ${o}`));
    lines.push('');
    lines.push('MESSAGE QUI RÉSONNE :');
    lines.push(MI_STATE.data.avatar.message);
    lines.push('');
  }

  if (MI_STATE.data.hooks) {
    lines.push('## ACCROCHES GAGNANTES');
    MI_STATE.data.hooks.hooks.forEach((h, i) => lines.push(`${i+1}. [${h.score}] ${h.text}`));
    lines.push('');
    lines.push('PATTERN GAGNANT :');
    lines.push(MI_STATE.data.hooks.pattern);
  }

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bildop-market-intelligence-${MI_STATE.niche.replace(/\s+/g, '-').toLowerCase()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

// --- Navigation mobile ---
document.getElementById('navToggle')?.addEventListener('click', () => {
  document.getElementById('navLinks').classList.toggle('open');
});
