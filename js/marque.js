/* ============================================
   BILDOP — Module 4 : Architecture de Marque
   Audit (12 questions) + Builder interactif + Paywall
   ============================================ */

// --- Brand Dimensions ---
const brandDimensions = [
  { id: 'identite', name: 'Identité de marque', icon: '🎨', description: 'Ton nom, ton image, ta mission — est-ce que t\'as une marque ou juste un nom?' },
  { id: 'pi', name: 'Propriété intellectuelle', icon: '🛡️', description: 'Tes marques déposées, tes domaines, tes assets protégés' },
  { id: 'structure', name: 'Structure corporative', icon: '🏗️', description: 'Comment tu sépares tes entités : PI, produit, service' },
  { id: 'licensing', name: 'Potentiel de licensing', icon: '🌍', description: 'Est-ce que ta marque peut générer des revenus sans toi?' },
];

// --- 12 Audit Questions (3 per dimension) ---
const brandQuestions = [
  // Dimension 0: Identité de marque
  {
    id: "id-01", dimensionIdx: 0,
    question: "Est-ce que ton entreprise a un nom de marque distinct du nom légal?",
    options: [
      { text: "Non, c'est le même nom ou j'ai pas vraiment réfléchi à ça", score: 1 },
      { text: "Oui, j'ai un nom commercial mais pas de logo ni d'identité visuelle", score: 2 },
      { text: "Oui, j'ai un nom, un logo, des couleurs et un positionnement clair", score: 3 },
    ]
  },
  {
    id: "id-02", dimensionIdx: 0,
    question: "Est-ce que tu as une identité visuelle cohérente utilisée partout?",
    options: [
      { text: "Non, j'ai pas de logo professionnel ou c'est inconsistant", score: 1 },
      { text: "J'ai un logo mais mes couleurs et polices changent selon la plateforme", score: 2 },
      { text: "Oui, j'ai un guide de marque et tout est uniforme (site, réseaux, documents)", score: 3 },
    ]
  },
  {
    id: "id-03", dimensionIdx: 0,
    question: "Est-ce que ta mission et tes valeurs sont documentées et connues de ton équipe?",
    options: [
      { text: "Non, c'est dans ma tête mais pas écrit nulle part", score: 1 },
      { text: "C'est écrit quelque part mais mon équipe ne pourrait pas les réciter", score: 2 },
      { text: "Oui, c'est clair, documenté, et mon équipe les vit au quotidien", score: 3 },
    ]
  },

  // Dimension 1: Propriété intellectuelle
  {
    id: "pi-01", dimensionIdx: 1,
    question: "Est-ce que ton nom de marque est enregistré comme marque de commerce (OPIC)?",
    options: [
      { text: "Non, je savais même pas que ça se faisait", score: 1 },
      { text: "J'y ai pensé mais j'ai pas encore fait les démarches", score: 2 },
      { text: "Oui, ma marque est enregistrée et protégée au Canada (ou ailleurs aussi)", score: 3 },
    ]
  },
  {
    id: "pi-02", dimensionIdx: 1,
    question: "Est-ce que tu possèdes tes noms de domaine stratégiques (.com, .ca, .co)?",
    options: [
      { text: "J'ai juste un domaine de base ou c'est quelqu'un d'autre qui le détient", score: 1 },
      { text: "J'ai mon .com ou .ca principal mais pas les variantes", score: 2 },
      { text: "J'ai sécurisé mes domaines principaux + variantes + réseaux sociaux", score: 3 },
    ]
  },
  {
    id: "pi-03", dimensionIdx: 1,
    question: "Est-ce que tes processus, méthodologies ou contenus exclusifs sont documentés comme PI?",
    options: [
      { text: "Non, tout est dans la tête des gens ou improvisé", score: 1 },
      { text: "Certains processus sont écrits mais pas formellement protégés", score: 2 },
      { text: "Oui, j'ai des SOPs, des méthodologies propriétaires documentées et protégées", score: 3 },
    ]
  },

  // Dimension 2: Structure corporative
  {
    id: "st-01", dimensionIdx: 2,
    question: "Comment est structurée ton entreprise actuellement?",
    options: [
      { text: "Travailleur autonome ou entreprise individuelle — tout est mélangé", score: 1 },
      { text: "Incorporée (inc.) mais une seule entité pour tout", score: 2 },
      { text: "Plusieurs entités séparées (holding, opérations, PI)", score: 3 },
    ]
  },
  {
    id: "st-02", dimensionIdx: 2,
    question: "Est-ce que tes marques et ta PI sont détenues par une entité séparée de tes opérations?",
    options: [
      { text: "Non, tout appartient à la même compagnie (ou à moi personnellement)", score: 1 },
      { text: "J'ai commencé à y penser mais c'est pas encore fait", score: 2 },
      { text: "Oui, j'ai une entité dédiée qui détient mes marques et ma PI", score: 3 },
    ]
  },
  {
    id: "st-03", dimensionIdx: 2,
    question: "Est-ce que tu sépares tes activités de produit et de service?",
    options: [
      { text: "Non, tout passe par la même compagnie et le même compte", score: 1 },
      { text: "Je fais la distinction mentalement mais pas légalement", score: 2 },
      { text: "Oui, j'ai des entités ou des divisions distinctes pour produit et service", score: 3 },
    ]
  },

  // Dimension 3: Potentiel de licensing
  {
    id: "li-01", dimensionIdx: 3,
    question: "Est-ce que ton modèle d'affaires pourrait fonctionner dans un autre marché géographique?",
    options: [
      { text: "Non, c'est très local et dépend de ma présence physique", score: 1 },
      { text: "Possiblement, mais j'ai jamais exploré l'idée", score: 2 },
      { text: "Oui, mon modèle est reproductible et pourrait s'exporter facilement", score: 3 },
    ]
  },
  {
    id: "li-02", dimensionIdx: 3,
    question: "Est-ce que quelqu'un d'autre pourrait opérer ta marque sans toi demain matin?",
    options: [
      { text: "Impossible — sans moi, rien ne fonctionne", score: 1 },
      { text: "Partiellement, mais il y aurait beaucoup de trous à combler", score: 2 },
      { text: "Oui, mes processus sont documentés et ma marque fonctionne sans moi", score: 3 },
    ]
  },
  {
    id: "li-03", dimensionIdx: 3,
    question: "Est-ce que tu as déjà pensé à vendre, licencier ou franchiser une partie de ton entreprise?",
    options: [
      { text: "Non, j'ai jamais pensé à ça — je suis focus sur opérer", score: 1 },
      { text: "L'idée m'intéresse mais je sais pas comment structurer ça", score: 2 },
      { text: "Oui, j'ai une stratégie de sortie ou de licensing en tête", score: 3 },
    ]
  },
];

// --- Recommendations by dimension + zone ---
const recommendations = {
  identite: {
    rouge: "Ta marque n'existe pas encore — t'as un nom, mais pas une identité. C'est comme avoir une carte de visite sans visage. Commence par définir ton nom de marque, ta mission et crée un logo professionnel.",
    orange: "T'as les bases mais ta marque manque de cohérence. Un client qui voit ton site, tes réseaux et tes documents devrait reconnaître la même marque partout. Uniformise ton identité visuelle.",
    vert: "Ton identité de marque est solide. Tu as un positionnement clair et une image cohérente. Continue de renforcer ta présence et pense à documenter ton guide de marque."
  },
  pi: {
    rouge: "Tes assets ne sont pas protégés. N'importe qui pourrait utiliser ton nom, copier tes processus ou prendre tes domaines. C'est comme laisser la porte de ta maison ouverte. Enregistre ta marque à l'OPIC.",
    orange: "T'as commencé à protéger tes assets mais il reste des trous. Vérifie tes noms de domaine, sécurise tes variantes, et documente formellement tes processus comme propriété intellectuelle.",
    vert: "Ta PI est bien protégée. Tes marques sont enregistrées, tes domaines sécurisés et tes processus documentés. Tu construis un actif qui vaut quelque chose."
  },
  structure: {
    rouge: "Tout est mélangé dans une seule entité (ou pire, à ton nom personnel). Si quelqu'un te poursuit ou si tu veux vendre, tout est exposé. Sépare tes entités : PI, produit, service.",
    orange: "T'es incorporé mais tout est dans le même panier. Commence à réfléchir à séparer ta PI de tes opérations — c'est ce qui transforme une business en un actif vendable.",
    vert: "Ta structure est bien pensée. La séparation PI/produit/service te protège et te donne de la flexibilité pour vendre, licencier ou lever des fonds."
  },
  licensing: {
    rouge: "Ton business dépend de toi à 100%. Si tu pars, tout s'effondre. C'est un emploi, pas une entreprise. Pour que ta marque ait de la valeur, elle doit pouvoir fonctionner sans toi.",
    orange: "Le potentiel est là mais t'as pas encore structuré ta marque pour être reproductible. Documente tes processus, crée des SOPs, et pense à qui d'autre pourrait opérer sous ta marque.",
    vert: "Ta marque a un vrai potentiel de licensing. Tes processus sont documentés, ton modèle est reproductible, et tu pourrais licencier ta marque à d'autres opérateurs."
  }
};

// --- Builder: Structure types ---
const structureTypes = [
  {
    id: 'simple',
    name: 'Structure simple',
    icon: '🏠',
    description: 'Une seule entité qui fait tout — produit, service et PI ensemble.',
    pour: 'Entreprises en démarrage, revenus < 100k$',
    schema: ['Mon Entreprise Inc.'],
    risque: 'Élevé — aucune protection si poursuite ou vente'
  },
  {
    id: 'double',
    name: 'Structure double',
    icon: '🏢',
    description: 'Une holding détient la PI et les marques. Une entité opère le business.',
    pour: 'Entreprises établies qui veulent protéger leur PI',
    schema: ['Holding (PI + Marques)', 'Opérations Inc.'],
    risque: 'Modéré — bonne protection de base'
  },
  {
    id: 'triple',
    name: 'Structure triple',
    icon: '🏗️',
    description: 'Trois entités séparées : PI, produit et service. Maximum de protection et de flexibilité.',
    pour: 'Entreprises qui veulent vendre, licencier ou lever des fonds',
    schema: ['Holding PI Inc.', 'Produits Inc.', 'Services Inc.'],
    risque: 'Faible — protection maximale + flexibilité de sortie'
  },
];

// --- Licensing models ---
const licensingModels = [
  { id: 'franchise', name: 'Franchise', icon: '🏪', description: 'Le licencié opère sous ta marque avec tes processus complets. Tu contrôles tout.' },
  { id: 'licence-autorisee', name: 'Licence autorisée', icon: '📜', description: 'Le licencié utilise ta marque et tes méthodes, mais adapte à son marché local.' },
  { id: 'white-label', name: 'White-label', icon: '🏷️', description: 'Tu fournis le produit/service, le licencié met sa propre marque dessus.' },
  { id: 'aucun', name: 'Pas encore prêt', icon: '⏳', description: 'Mon entreprise n\'est pas encore structurée pour le licensing.' },
];

// --- Sub-brand categories ---
const sousMarqueCategories = [
  { id: 'produit', name: 'Produit', icon: '📦' },
  { id: 'service', name: 'Service', icon: '🤝' },
  { id: 'contenu', name: 'Contenu', icon: '📚' },
  { id: 'technologie', name: 'Technologie', icon: '💻' },
  { id: 'communaute', name: 'Communauté', icon: '👥' },
];

// --- State ---
let currentPhase = 'intro'; // intro | audit | results | builder | builder-results
let currentQuestion = 0;
let answers = {};
let dimensionScores = [0, 0, 0, 0];
let globalScore = 0;

// Builder state
let builderStep = 0; // 0-3
let brandData = {
  marqueMere: { nom: '', mission: '', vision: '', valeurs: [], positionnement: '', promesse: '' },
  sousMarques: [],
  structure: { type: '', entitePi: '', entiteProduit: '', entiteService: '' },
  licensing: { potentiel: '', marches: [], modele: '' },
};

const isPaid = localStorage.getItem('bildop_paid_marque') === 'true'
  || localStorage.getItem('bildop_subscription') === 'true';

// Try to load existing brand data
const savedBrand = localStorage.getItem('bildop_brand');
if (savedBrand) {
  try {
    const parsed = JSON.parse(savedBrand);
    if (parsed.brandData) brandData = parsed.brandData;
    if (parsed.dimensionScores) dimensionScores = parsed.dimensionScores;
    if (parsed.globalScore) globalScore = parsed.globalScore;
    if (parsed.answers) answers = parsed.answers;
  } catch(e) {}
}

// Try to load ADN from Module 1
const adnRaw = localStorage.getItem('bildop_questionnaire');
const adnData = adnRaw ? JSON.parse(adnRaw) : null;

// --- DOM ---
const appEl = document.getElementById('marqueApp');

// --- Zone helper ---
function getZone(score) {
  if (score >= 71) return { zone: 'VERT', color: '#27ae60', label: 'Solide', emoji: '🟢', bg: 'rgba(39,174,96,0.08)' };
  if (score >= 41) return { zone: 'ORANGE', color: '#f39c12', label: 'Fragile', emoji: '🟠', bg: 'rgba(243,156,18,0.08)' };
  return { zone: 'ROUGE', color: '#e74c3c', label: 'Critique', emoji: '🔴', bg: 'rgba(231,76,60,0.08)' };
}

function getZoneKey(score) {
  if (score >= 71) return 'vert';
  if (score >= 41) return 'orange';
  return 'rouge';
}

// --- Scoring ---
function calculateScores() {
  dimensionScores = [0, 0, 0, 0];
  const dimCounts = [0, 0, 0, 0];

  Object.entries(answers).forEach(([qId, optIdx]) => {
    const q = brandQuestions.find(bq => bq.id === qId);
    if (!q) return;
    dimensionScores[q.dimensionIdx] += q.options[optIdx].score;
    dimCounts[q.dimensionIdx]++;
  });

  // Normalize to 0-100
  dimensionScores = dimensionScores.map((s, i) => {
    if (dimCounts[i] === 0) return 0;
    return Math.round(((s / (dimCounts[i] * 3)) * 100));
  });

  globalScore = Math.round(dimensionScores.reduce((a, b) => a + b, 0) / 4);
}

// --- Save to localStorage ---
function saveData() {
  localStorage.setItem('bildop_brand', JSON.stringify({
    dimensionScores,
    globalScore,
    answers,
    brandData,
    timestamp: Date.now(),
  }));
}

// --- Render: Intro ---
function renderIntro() {
  currentPhase = 'intro';
  const hasExisting = savedBrand && globalScore > 0;

  appEl.innerHTML = `
    <div class="marque-intro">
      <div class="marque-intro__icon">🏗️</div>
      <h1>Architecture de Marque</h1>
      <p class="marque-intro__subtitle">Découvre si ta marque est un <strong>actif vendable</strong> ou juste un nom sur une carte de visite.</p>

      <div class="marque-intro__why">
        <h3>Pourquoi c'est important?</h3>
        <div class="marque-intro__cards">
          <div class="marque-intro__card">
            <span>💰</span>
            <p><strong>Ta marque vaut de l'argent</strong> — mais seulement si elle est bien structurée. Une marque protégée et reproductible, c'est un actif qui se vend.</p>
          </div>
          <div class="marque-intro__card">
            <span>🛡️</span>
            <p><strong>Sans protection, t'as rien</strong> — N'importe qui peut copier ton nom, tes processus, ton identité. Tu travailles fort pour enrichir les autres.</p>
          </div>
          <div class="marque-intro__card">
            <span>🌍</span>
            <p><strong>Licensing = revenus sans opérer</strong> — Les grandes marques ne font pas tout elles-mêmes. Elles licencient et encaissent. Tu peux faire pareil.</p>
          </div>
        </div>
      </div>

      <div class="marque-intro__steps">
        <div class="marque-intro__step">
          <div class="marque-intro__step-num">1</div>
          <div>
            <strong>Audit gratuit</strong>
            <p>12 questions → ton score de maturité branding</p>
          </div>
        </div>
        <div class="marque-intro__step">
          <div class="marque-intro__step-num">2</div>
          <div>
            <strong>Builder de marque</strong>
            <p>Construis ton architecture : marque-mère, sous-marques, structure, licensing</p>
          </div>
        </div>
      </div>

      ${hasExisting ? `
        <div class="marque-intro__existing">
          <p>📊 Tu as déjà un score de <strong>${globalScore}/100</strong>. Tu peux refaire l'audit ou aller directement au builder.</p>
          <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
            <button class="btn btn--primary" onclick="startAudit()">Refaire l'audit →</button>
            <button class="btn btn--secondary" onclick="showResults()">Voir mes résultats →</button>
          </div>
        </div>
      ` : `
        <button class="btn btn--primary btn--large" onclick="startAudit()">Commencer l'audit gratuit →</button>
        <p style="margin-top: 12px; font-size: 0.9rem; color: var(--text-muted);">12 questions · 3 minutes · 100% gratuit</p>
      `}
    </div>
  `;
}

// --- Render: Audit ---
function startAudit() {
  currentPhase = 'audit';
  currentQuestion = 0;
  answers = {};
  renderAuditQuestion();
}

function renderAuditQuestion() {
  const q = brandQuestions[currentQuestion];
  const dim = brandDimensions[q.dimensionIdx];
  const progress = ((currentQuestion + 1) / brandQuestions.length) * 100;
  const selectedIdx = answers[q.id] !== undefined ? answers[q.id] : null;

  // Dimension stepper
  const dimStepper = brandDimensions.map((d, i) => {
    const dimQuestions = brandQuestions.filter(bq => bq.dimensionIdx === i);
    const dimAnswered = dimQuestions.filter(bq => answers[bq.id] !== undefined).length;
    const isCurrent = q.dimensionIdx === i;
    const isComplete = dimAnswered === dimQuestions.length;
    return `<div class="marque-dim-step ${isCurrent ? 'active' : ''} ${isComplete ? 'completed' : ''}">
      <span class="marque-dim-step__icon">${d.icon}</span>
      <span class="marque-dim-step__name">${d.name}</span>
    </div>`;
  }).join('');

  appEl.innerHTML = `
    <div class="marque-audit">
      <div class="marque-audit__stepper">${dimStepper}</div>

      <div class="marque-audit__progress">
        <div class="marque-audit__progress-bar" style="width: ${progress}%"></div>
        <span class="marque-audit__progress-text">${currentQuestion + 1} / ${brandQuestions.length}</span>
      </div>

      <div class="marque-audit__dim-badge" style="margin-bottom: 8px;">
        ${dim.icon} ${dim.name}
      </div>

      <h2 class="marque-audit__question">${q.question}</h2>

      <div class="marque-audit__options">
        ${q.options.map((opt, i) => `
          <button class="marque-audit__option ${selectedIdx === i ? 'selected' : ''}" onclick="selectAnswer('${q.id}', ${i})">
            <span class="marque-audit__option-indicator">${selectedIdx === i ? '●' : '○'}</span>
            ${opt.text}
          </button>
        `).join('')}
      </div>

      <div class="marque-audit__nav">
        ${currentQuestion > 0 ? `<button class="btn btn--secondary" onclick="prevQuestion()">← Précédent</button>` : '<span></span>'}
        ${selectedIdx !== null ? (
          currentQuestion < brandQuestions.length - 1
            ? `<button class="btn btn--primary" onclick="nextQuestion()">Suivant →</button>`
            : `<button class="btn btn--primary" onclick="finishAudit()">Voir mes résultats →</button>`
        ) : '<span></span>'}
      </div>
    </div>
  `;
}

function selectAnswer(qId, optIdx) {
  answers[qId] = optIdx;
  renderAuditQuestion();
}

function nextQuestion() {
  if (currentQuestion < brandQuestions.length - 1) {
    currentQuestion++;
    renderAuditQuestion();
  }
}

function prevQuestion() {
  if (currentQuestion > 0) {
    currentQuestion--;
    renderAuditQuestion();
  }
}

function finishAudit() {
  calculateScores();
  saveData();
  showResults();
}

// --- Render: Results ---
function showResults() {
  currentPhase = 'results';
  calculateScores();
  const zone = getZone(globalScore);

  // SVG Radar chart
  const radarSvg = renderRadarChart(dimensionScores);

  const dimCards = brandDimensions.map((dim, i) => {
    const score = dimensionScores[i];
    const z = getZone(score);
    const zoneKey = getZoneKey(score);
    const rec = recommendations[dim.id][zoneKey];
    return `
      <div class="marque-result__dim" style="border-left: 4px solid ${z.color}">
        <div class="marque-result__dim-header">
          <span>${dim.icon} ${dim.name}</span>
          <span class="marque-result__dim-score" style="color: ${z.color}">${score}/100 ${z.emoji}</span>
        </div>
        <p class="marque-result__dim-rec">${rec}</p>
      </div>
    `;
  }).join('');

  appEl.innerHTML = `
    <div class="marque-results">
      <div class="marque-results__header">
        <div class="marque-results__score-circle" style="border-color: ${zone.color}">
          <span class="marque-results__score-value" style="color: ${zone.color}">${globalScore}</span>
          <span class="marque-results__score-label">/100</span>
        </div>
        <div>
          <h1>Ton score de maturité branding</h1>
          <p class="marque-results__zone" style="color: ${zone.color}">${zone.emoji} ${zone.label} — ${
            globalScore < 41 ? "T'as un nom, pas une marque"
            : globalScore < 71 ? "Ta marque existe mais ne te protège pas"
            : "Ta marque est un actif qui vaut quelque chose"
          }</p>
        </div>
      </div>

      <div class="marque-results__radar">
        ${radarSvg}
      </div>

      <div class="marque-results__dimensions">
        <h2>Analyse par dimension</h2>
        ${dimCards}
      </div>

      <div class="marque-results__cta">
        <h2>Prêt à construire ton architecture de marque?</h2>
        <p>L'audit t'a montré où tu en es. Le Builder te montre comment bâtir une marque vendable — marque-mère, sous-marques, structure corporative et potentiel de licensing.</p>
        ${isPaid ? `
          <button class="btn btn--primary btn--large" onclick="startBuilder()">Ouvrir le Builder de marque →</button>
        ` : `
          <div class="marque-paywall">
            <div class="marque-paywall__badge">🔒 Builder de marque</div>
            <p>Construis ton architecture complète : marque-mère, sous-marques, structure corporative, potentiel de licensing.</p>
            <div class="marque-paywall__includes">
              <span>🏗️ Builder interactif 4 étapes</span>
              <span>🌳 Arbre visuel de ta marque</span>
              <span>📋 Checklist légale complète</span>
              <span>📥 Templates téléchargeables</span>
            </div>
            <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 20px;">
              <button class="btn btn--primary btn--large" onclick="handleUnlock()">Débloquer le module →</button>
            </div>
            <p style="margin-top: 12px; font-size: 0.85rem; color: var(--text-muted);">Achat unique ou inclus dans l'abonnement mensuel</p>
          </div>
        `}
      </div>

      <div style="text-align: center; margin-top: 24px;">
        <button class="btn btn--secondary" onclick="startAudit()">Refaire l'audit</button>
      </div>
    </div>
  `;
}

// --- SVG Radar Chart ---
function renderRadarChart(scores) {
  const size = 280;
  const cx = size / 2;
  const cy = size / 2;
  const maxR = 110;
  const levels = 3; // 33%, 66%, 100%

  // 4 dimensions = 4 axes at 0°, 90°, 180°, 270°
  const angles = [270, 0, 90, 180].map(a => (a * Math.PI) / 180);

  function polarToXY(angle, radius) {
    return {
      x: cx + radius * Math.cos(angle),
      y: cy + radius * Math.sin(angle),
    };
  }

  // Grid lines
  let gridLines = '';
  for (let l = 1; l <= levels; l++) {
    const r = (maxR / levels) * l;
    const points = angles.map(a => {
      const p = polarToXY(a, r);
      return `${p.x},${p.y}`;
    }).join(' ');
    gridLines += `<polygon points="${points}" fill="none" stroke="#e0e0e0" stroke-width="1"/>`;
  }

  // Axis lines
  let axisLines = angles.map(a => {
    const p = polarToXY(a, maxR);
    return `<line x1="${cx}" y1="${cy}" x2="${p.x}" y2="${p.y}" stroke="#e0e0e0" stroke-width="1"/>`;
  }).join('');

  // Labels
  const labels = brandDimensions.map((dim, i) => {
    const p = polarToXY(angles[i], maxR + 30);
    const anchor = i === 0 ? 'middle' : i === 1 ? 'start' : i === 2 ? 'middle' : 'end';
    const dy = i === 0 ? '-5' : i === 2 ? '15' : '5';
    return `<text x="${p.x}" y="${p.y}" dy="${dy}" text-anchor="${anchor}" font-size="11" fill="#666">${dim.icon} ${dim.name}</text>`;
  }).join('');

  // Score labels on axes
  const scoreLabels = scores.map((s, i) => {
    const r = (s / 100) * maxR;
    const p = polarToXY(angles[i], r);
    const z = getZone(s);
    return `<text x="${p.x}" y="${p.y}" dy="-8" text-anchor="middle" font-size="12" font-weight="700" fill="${z.color}">${s}</text>`;
  }).join('');

  // Data polygon
  const dataPoints = scores.map((s, i) => {
    const r = (s / 100) * maxR;
    const p = polarToXY(angles[i], r);
    return `${p.x},${p.y}`;
  }).join(' ');

  const zone = getZone(globalScore);

  return `
    <svg viewBox="0 0 ${size} ${size}" class="marque-radar" style="max-width: ${size}px; margin: 0 auto; display: block;">
      ${gridLines}
      ${axisLines}
      <polygon points="${dataPoints}" fill="${zone.color}" fill-opacity="0.15" stroke="${zone.color}" stroke-width="2"/>
      ${scores.map((s, i) => {
        const r = (s / 100) * maxR;
        const p = polarToXY(angles[i], r);
        return `<circle cx="${p.x}" cy="${p.y}" r="4" fill="${getZone(s).color}"/>`;
      }).join('')}
      ${labels}
      ${scoreLabels}
    </svg>
  `;
}

// --- Builder ---
function startBuilder() {
  currentPhase = 'builder';
  builderStep = 0;

  // Pre-fill from ADN if available and brandData is empty
  if (adnData && !brandData.marqueMere.nom) {
    if (adnData.companyName) brandData.marqueMere.nom = adnData.companyName;
    if (adnData.mission) brandData.marqueMere.mission = adnData.mission;
    if (adnData.vision) brandData.marqueMere.vision = adnData.vision;
  }

  renderBuilder();
}

function renderBuilder() {
  const steps = [
    { name: 'Marque-mère', icon: '👑' },
    { name: 'Sous-marques', icon: '🌳' },
    { name: 'Structure', icon: '🏗️' },
    { name: 'Licensing', icon: '🌍' },
  ];

  const stepper = steps.map((s, i) => `
    <div class="marque-builder__step ${i === builderStep ? 'active' : ''} ${i < builderStep ? 'completed' : ''}">
      <div class="marque-builder__step-num">${i < builderStep ? '✓' : i + 1}</div>
      <span>${s.icon} ${s.name}</span>
    </div>
  `).join('');

  let content = '';
  switch(builderStep) {
    case 0: content = renderBuilderMarqueMere(); break;
    case 1: content = renderBuilderSousMarques(); break;
    case 2: content = renderBuilderStructure(); break;
    case 3: content = renderBuilderLicensing(); break;
  }

  appEl.innerHTML = `
    <div class="marque-builder">
      <div class="marque-builder__stepper">${stepper}</div>
      <div class="marque-builder__content">${content}</div>
      <div class="marque-builder__nav">
        ${builderStep > 0 ? `<button class="btn btn--secondary" onclick="builderPrev()">← Précédent</button>` : `<button class="btn btn--secondary" onclick="showResults()">← Résultats</button>`}
        ${builderStep < 3
          ? `<button class="btn btn--primary" onclick="builderNext()">Suivant →</button>`
          : `<button class="btn btn--primary" onclick="finishBuilder()">Voir mon architecture →</button>`
        }
      </div>
    </div>
  `;
}

function builderNext() {
  saveBuilderStep();
  builderStep++;
  renderBuilder();
}

function builderPrev() {
  saveBuilderStep();
  builderStep--;
  renderBuilder();
}

function saveBuilderStep() {
  switch(builderStep) {
    case 0:
      brandData.marqueMere.nom = document.getElementById('mm-nom')?.value || '';
      brandData.marqueMere.mission = document.getElementById('mm-mission')?.value || '';
      brandData.marqueMere.vision = document.getElementById('mm-vision')?.value || '';
      brandData.marqueMere.positionnement = document.getElementById('mm-positionnement')?.value || '';
      brandData.marqueMere.promesse = document.getElementById('mm-promesse')?.value || '';
      // Valeurs
      const valeursEl = document.getElementById('mm-valeurs');
      if (valeursEl) {
        brandData.marqueMere.valeurs = valeursEl.value.split(',').map(v => v.trim()).filter(v => v);
      }
      break;
    case 2:
      const selected = document.querySelector('.marque-structure-option.selected');
      if (selected) brandData.structure.type = selected.dataset.type;
      brandData.structure.entitePi = document.getElementById('st-pi')?.value || '';
      brandData.structure.entiteProduit = document.getElementById('st-prod')?.value || '';
      brandData.structure.entiteService = document.getElementById('st-serv')?.value || '';
      break;
    case 3:
      const modelSelected = document.querySelector('.marque-licensing-option.selected');
      if (modelSelected) brandData.licensing.modele = modelSelected.dataset.model;
      const marchesEl = document.getElementById('li-marches');
      if (marchesEl) {
        brandData.licensing.marches = marchesEl.value.split(',').map(v => v.trim()).filter(v => v);
      }
      break;
  }
  saveData();
}

// --- Builder Step 1: Marque-mère ---
function renderBuilderMarqueMere() {
  const mm = brandData.marqueMere;
  return `
    <h2>👑 Ta marque-mère</h2>
    <p>C'est l'entité qui chapeaute tout. Le nom qui porte ta vision.</p>

    ${adnData && !mm.nom ? `
      <div class="marque-adn-prefill">
        <p>📄 On a trouvé ton plan d'affaires (Module 1). <button class="btn btn--secondary btn--small" onclick="prefillFromAdn()">Pré-remplir depuis l'ADN →</button></p>
      </div>
    ` : ''}

    <div class="marque-form">
      <div class="marque-form__field">
        <label for="mm-nom">Nom de ta marque-mère *</label>
        <input type="text" id="mm-nom" placeholder="Ex: Remèdes & Co, Bildop, Groupe REMES" value="${mm.nom}">
      </div>
      <div class="marque-form__field">
        <label for="mm-mission">Mission</label>
        <textarea id="mm-mission" rows="2" placeholder="Pourquoi ta marque existe? Quel problème elle résout?">${mm.mission}</textarea>
      </div>
      <div class="marque-form__field">
        <label for="mm-vision">Vision</label>
        <textarea id="mm-vision" rows="2" placeholder="Où tu veux être dans 5-10 ans?">${mm.vision}</textarea>
      </div>
      <div class="marque-form__field">
        <label for="mm-valeurs">Valeurs fondamentales (séparées par des virgules)</label>
        <input type="text" id="mm-valeurs" placeholder="Ex: Innovation, Autonomie, Qualité, Excellence" value="${mm.valeurs.join(', ')}">
      </div>
      <div class="marque-form__field">
        <label for="mm-positionnement">Positionnement — Qu'est-ce qui te rend unique?</label>
        <textarea id="mm-positionnement" rows="2" placeholder="Comment tu te distingues de la compétition?">${mm.positionnement}</textarea>
      </div>
      <div class="marque-form__field">
        <label for="mm-promesse">Promesse de marque</label>
        <textarea id="mm-promesse" rows="2" placeholder="Qu'est-ce que tes clients reçoivent toujours quand ils font affaire avec toi?">${mm.promesse}</textarea>
      </div>
    </div>
  `;
}

function prefillFromAdn() {
  if (!adnData) return;
  if (adnData.companyName) document.getElementById('mm-nom').value = adnData.companyName;
  if (adnData.mission) document.getElementById('mm-mission').value = adnData.mission;
  if (adnData.vision) document.getElementById('mm-vision').value = adnData.vision;
}

// --- Builder Step 2: Sous-marques ---
function renderBuilderSousMarques() {
  const tree = renderBrandTree();
  const list = brandData.sousMarques.map((sm, i) => `
    <div class="marque-sous-item">
      <div class="marque-sous-item__info">
        <strong>${sm.nom}</strong>
        <span class="marque-sous-item__cat">${sousMarqueCategories.find(c => c.id === sm.categorie)?.icon || '📦'} ${sm.categorie}</span>
      </div>
      <p>${sm.description}</p>
      <button class="marque-sous-item__remove" onclick="removeSousMarque(${i})">✕</button>
    </div>
  `).join('');

  return `
    <h2>🌳 Tes sous-marques & propriétés intellectuelles</h2>
    <p>Chaque sous-marque est une PI qui a sa propre valeur. Plus t'en as, plus ta marque-mère vaut cher.</p>

    ${tree}

    <div class="marque-sous-list">${list || '<p style="color: var(--text-muted); text-align: center; padding: 20px;">Aucune sous-marque ajoutée. Commence ci-dessous.</p>'}</div>

    <div class="marque-sous-add">
      <h3>Ajouter une sous-marque</h3>
      <div class="marque-form">
        <div class="marque-form__field">
          <label for="sm-nom">Nom de la sous-marque</label>
          <input type="text" id="sm-nom" placeholder="Ex: rem santé, bildop academy, ...">
        </div>
        <div class="marque-form__field">
          <label for="sm-cat">Catégorie</label>
          <select id="sm-cat">
            ${sousMarqueCategories.map(c => `<option value="${c.id}">${c.icon} ${c.name}</option>`).join('')}
          </select>
        </div>
        <div class="marque-form__field">
          <label for="sm-desc">Description courte</label>
          <input type="text" id="sm-desc" placeholder="En une phrase, qu'est-ce que cette sous-marque fait?">
        </div>
        <button class="btn btn--primary" onclick="addSousMarque()">+ Ajouter la sous-marque</button>
      </div>
    </div>
  `;
}

function addSousMarque() {
  const nom = document.getElementById('sm-nom').value.trim();
  const cat = document.getElementById('sm-cat').value;
  const desc = document.getElementById('sm-desc').value.trim();
  if (!nom) return;
  brandData.sousMarques.push({ nom, categorie: cat, description: desc });
  saveData();
  renderBuilder();
}

function removeSousMarque(idx) {
  brandData.sousMarques.splice(idx, 1);
  saveData();
  renderBuilder();
}

// --- Brand Tree Visualization ---
function renderBrandTree() {
  if (!brandData.marqueMere.nom && brandData.sousMarques.length === 0) {
    return '';
  }

  const mmName = brandData.marqueMere.nom || 'Ma Marque';
  const subs = brandData.sousMarques;

  if (subs.length === 0) {
    return `
      <div class="marque-tree">
        <div class="marque-tree__root">${mmName}</div>
        <div class="marque-tree__empty">Ajoute des sous-marques pour voir ton arbre grandir</div>
      </div>
    `;
  }

  const subNodes = subs.map(sm => {
    const cat = sousMarqueCategories.find(c => c.id === sm.categorie);
    return `<div class="marque-tree__leaf">
      <div class="marque-tree__leaf-name">${sm.nom}</div>
      <div class="marque-tree__leaf-cat">${cat?.icon || '📦'} ${cat?.name || sm.categorie}</div>
    </div>`;
  }).join('');

  return `
    <div class="marque-tree">
      <div class="marque-tree__root">${mmName}</div>
      <div class="marque-tree__connector"></div>
      <div class="marque-tree__branches">${subNodes}</div>
    </div>
  `;
}

// --- Builder Step 3: Structure ---
function renderBuilderStructure() {
  const cards = structureTypes.map(st => `
    <div class="marque-structure-option ${brandData.structure.type === st.id ? 'selected' : ''}" data-type="${st.id}" onclick="selectStructure('${st.id}')">
      <div class="marque-structure-option__header">
        <span class="marque-structure-option__icon">${st.icon}</span>
        <strong>${st.name}</strong>
      </div>
      <p>${st.description}</p>
      <div class="marque-structure-option__meta">
        <span>👤 ${st.pour}</span>
        <span>⚠️ Risque : ${st.risque}</span>
      </div>
      <div class="marque-structure-option__schema">
        ${st.schema.map(s => `<span class="marque-structure-option__entity">${s}</span>`).join('<span class="marque-structure-option__arrow">→</span>')}
      </div>
    </div>
  `).join('');

  const showNames = brandData.structure.type === 'double' || brandData.structure.type === 'triple';

  return `
    <h2>🏗️ Ta structure corporative</h2>
    <p>Comment tu sépares tes entités détermine ta protection et ta flexibilité de sortie.</p>

    <div class="marque-structure-options">${cards}</div>

    ${showNames ? `
      <div class="marque-form" style="margin-top: 24px;">
        <h3>Nomme tes entités</h3>
        <div class="marque-form__field">
          <label for="st-pi">Entité PI (détient les marques et la propriété intellectuelle)</label>
          <input type="text" id="st-pi" placeholder="Ex: Remèdes & Co IP Inc." value="${brandData.structure.entitePi}">
        </div>
        ${brandData.structure.type === 'triple' ? `
          <div class="marque-form__field">
            <label for="st-prod">Entité Produit (développe et vend les produits)</label>
            <input type="text" id="st-prod" placeholder="Ex: Remèdes & Co Produits Inc." value="${brandData.structure.entiteProduit}">
          </div>
          <div class="marque-form__field">
            <label for="st-serv">Entité Service (livre les services aux clients)</label>
            <input type="text" id="st-serv" placeholder="Ex: Remèdes & Co Services Inc." value="${brandData.structure.entiteService}">
          </div>
        ` : `
          <div class="marque-form__field">
            <label for="st-prod">Entité Opérations</label>
            <input type="text" id="st-prod" placeholder="Ex: Remèdes & Co Operations Inc." value="${brandData.structure.entiteProduit}">
          </div>
        `}
      </div>
    ` : ''}
  `;
}

function selectStructure(type) {
  brandData.structure.type = type;
  renderBuilder();
}

// --- Builder Step 4: Licensing ---
function renderBuilderLicensing() {
  const modelCards = licensingModels.map(lm => `
    <div class="marque-licensing-option ${brandData.licensing.modele === lm.id ? 'selected' : ''}" data-model="${lm.id}" onclick="selectLicensing('${lm.id}')">
      <span class="marque-licensing-option__icon">${lm.icon}</span>
      <strong>${lm.name}</strong>
      <p>${lm.description}</p>
    </div>
  `).join('');

  return `
    <h2>🌍 Ton potentiel de licensing</h2>
    <p>Le licensing, c'est quand quelqu'un d'autre opère sous ta marque — et toi, tu encaisses des redevances. C'est le modèle qui transforme une entreprise locale en empire.</p>

    <h3>Quel modèle te correspond?</h3>
    <div class="marque-licensing-options">${modelCards}</div>

    ${brandData.licensing.modele && brandData.licensing.modele !== 'aucun' ? `
      <div class="marque-form" style="margin-top: 24px;">
        <div class="marque-form__field">
          <label for="li-marches">Marchés potentiels (séparés par des virgules)</label>
          <input type="text" id="li-marches" placeholder="Ex: Canada, France, Belgique, Suisse, Afrique francophone" value="${brandData.licensing.marches.join(', ')}">
        </div>
      </div>
    ` : ''}
  `;
}

function selectLicensing(model) {
  brandData.licensing.modele = model;
  renderBuilder();
}

// --- Builder Results ---
function finishBuilder() {
  saveBuilderStep();
  currentPhase = 'builder-results';
  calculateScores();
  saveData();

  const tree = renderBrandTree();
  const zone = getZone(globalScore);

  const structureInfo = structureTypes.find(s => s.id === brandData.structure.type);
  const licensingInfo = licensingModels.find(l => l.id === brandData.licensing.modele);

  const actionPlan = [
    brandData.marqueMere.nom ? null : "Définis le nom de ta marque-mère",
    dimensionScores[1] < 41 ? "Enregistre ta marque de commerce à l'OPIC (priorité #1)" : null,
    dimensionScores[1] < 71 ? "Sécurise tes noms de domaine stratégiques (.com, .ca, .co)" : null,
    brandData.structure.type === 'simple' || !brandData.structure.type ? "Consulte un comptable pour évaluer la séparation de tes entités" : null,
    dimensionScores[3] < 41 ? "Documente tes processus clés (SOPs) — c'est la base du licensing" : null,
    brandData.sousMarques.length === 0 ? "Identifie tes premières sous-marques/propriétés intellectuelles" : null,
    brandData.licensing.modele === 'aucun' ? "Commence à structurer ton business pour qu'il fonctionne sans toi" : null,
    "Révise ton architecture de marque chaque trimestre",
  ].filter(Boolean);

  appEl.innerHTML = `
    <div class="marque-builder-results">
      <h1>🏗️ Ton architecture de marque</h1>

      ${tree}

      <div class="marque-builder-results__summary">
        <div class="marque-builder-results__card">
          <h3>👑 Marque-mère</h3>
          <p><strong>${brandData.marqueMere.nom || '—'}</strong></p>
          ${brandData.marqueMere.mission ? `<p><em>${brandData.marqueMere.mission}</em></p>` : ''}
          ${brandData.marqueMere.valeurs.length > 0 ? `<p>Valeurs : ${brandData.marqueMere.valeurs.join(' · ')}</p>` : ''}
        </div>

        <div class="marque-builder-results__card">
          <h3>🌳 Sous-marques (${brandData.sousMarques.length})</h3>
          ${brandData.sousMarques.length > 0
            ? brandData.sousMarques.map(sm => `<p>• <strong>${sm.nom}</strong> — ${sm.categorie}</p>`).join('')
            : '<p style="color: var(--text-muted)">Aucune sous-marque définie</p>'
          }
        </div>

        <div class="marque-builder-results__card">
          <h3>🏗️ Structure</h3>
          ${structureInfo ? `<p><strong>${structureInfo.name}</strong> — ${structureInfo.description}</p>` : '<p style="color: var(--text-muted)">Non définie</p>'}
          ${brandData.structure.entitePi ? `<p>PI : ${brandData.structure.entitePi}</p>` : ''}
          ${brandData.structure.entiteProduit ? `<p>Produit : ${brandData.structure.entiteProduit}</p>` : ''}
          ${brandData.structure.entiteService ? `<p>Service : ${brandData.structure.entiteService}</p>` : ''}
        </div>

        <div class="marque-builder-results__card">
          <h3>🌍 Licensing</h3>
          ${licensingInfo ? `<p><strong>${licensingInfo.name}</strong> — ${licensingInfo.description}</p>` : '<p style="color: var(--text-muted)">Non défini</p>'}
          ${brandData.licensing.marches.length > 0 ? `<p>Marchés : ${brandData.licensing.marches.join(', ')}</p>` : ''}
        </div>
      </div>

      <div class="marque-builder-results__actions">
        <h2>📋 Ton plan d'action</h2>
        <ol class="marque-action-list">
          ${actionPlan.map(a => `<li>${a}</li>`).join('')}
        </ol>
      </div>

      <div class="marque-builder-results__score">
        <p>Score de maturité branding : <strong style="color: ${zone.color}">${globalScore}/100 ${zone.emoji}</strong></p>
        <p style="font-size: 0.9rem; color: var(--text-muted);">Reviens compléter ton architecture au fur et à mesure que ton entreprise grandit.</p>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap; margin-top: 24px;">
        <button class="btn btn--secondary" onclick="startBuilder()">Modifier mon architecture</button>
        <button class="btn btn--secondary" onclick="showResults()">Voir l'audit détaillé</button>
        <a href="diagnostic.html" class="btn btn--primary">Faire mon diagnostic →</a>
      </div>
    </div>
  `;
}

// --- Unlock Handler ---
function handleUnlock() {
  console.log('Redirection vers le paiement — Module Architecture de Marque');
  alert('🚧 Le système de paiement sera connecté prochainement.\n\nDébloquer le Builder de marque te donne accès au builder interactif, aux templates légaux et au guide de licensing.');
}

// --- Nav toggle (inline since main.js only loads on index) ---
(function() {
  const navToggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (navToggle && navLinks) {
    navToggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      navToggle.classList.toggle('active');
    });
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        navToggle.classList.remove('active');
      });
    });
  }
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 50);
    });
  }
})();

// --- Init ---
function init() {
  renderIntro();
}

init();
