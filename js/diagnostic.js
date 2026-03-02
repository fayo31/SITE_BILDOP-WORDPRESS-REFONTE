/* ============================================
   BILDOP — Module Diagnostic
   5 Flux Métiers × 27 Questions × Scoring × Résultats
   ============================================ */

// --- Flux (Categories) ---
const flux = [
  { name: 'Acquisition Client', icon: '🎯', description: 'Comment tu attires et convertis tes clients' },
  { name: 'Production & Livraison', icon: '⚙️', description: 'Comment tu livres ton service ou produit' },
  { name: 'Finances & Trésorerie', icon: '💰', description: 'Comment tu gères ton argent' },
  { name: 'Rétention & Satisfaction', icon: '❤️', description: 'Comment tu gardes tes clients' },
  { name: 'Pilotage & Décision', icon: '🧭', description: 'Comment tu pilotes ton entreprise' },
];

// --- Questions ---
// Each question has scored options: value 3 = vert, 2 = orange, 1 = rouge
const questions = [
  // === FLUX 1 : ACQUISITION CLIENT (6) ===
  {
    id: 1, fluxIdx: 0,
    question: "Combien de nouveaux clients as-tu signé le mois dernier?",
    hint: "Pense à ton objectif mensuel.",
    options: [
      { text: "J'ai atteint ou dépassé mon objectif", score: 3 },
      { text: "J'ai atteint environ 50-99% de mon objectif", score: 2 },
      { text: "Moins de 50% de mon objectif, ou je n'ai pas d'objectif", score: 1 },
    ]
  },
  {
    id: 2, fluxIdx: 0,
    question: "Sais-tu exactement d'où viennent tes clients?",
    hint: "Par quel canal ils te trouvent : réseaux sociaux, Google, bouche-à-oreille, etc.",
    options: [
      { text: "Oui, je track chaque canal précisément", score: 3 },
      { text: "J'ai une idée générale mais rien de précis", score: 2 },
      { text: "Aucune idée", score: 1 },
    ]
  },
  {
    id: 3, fluxIdx: 0,
    question: "Combien de temps ça prend entre le premier contact et la vente?",
    hint: "Le délai moyen pour convertir un prospect en client.",
    options: [
      { text: "Je connais mon délai et je l'optimise", score: 3 },
      { text: "J'ai une idée approximative", score: 2 },
      { text: "Je n'ai aucune idée", score: 1 },
    ]
  },
  {
    id: 4, fluxIdx: 0,
    question: "Quel pourcentage de tes prospects deviennent clients?",
    hint: "Ton taux de conversion.",
    options: [
      { text: "Je le mesure et il est bon (>20% en service, >2% en e-com)", score: 3 },
      { text: "Je le mesure mais il pourrait être meilleur", score: 2 },
      { text: "Je ne le mesure pas ou il est en chute", score: 1 },
    ]
  },
  {
    id: 5, fluxIdx: 0,
    question: "As-tu un processus écrit pour le premier contact avec un prospect?",
    hint: "Un script, une procédure, un template de réponse.",
    options: [
      { text: "Oui, j'ai un script ou une SOP", score: 3 },
      { text: "J'ai des lignes directrices mais rien de formel", score: 2 },
      { text: "Non, j'improvise à chaque fois", score: 1 },
    ]
  },
  {
    id: 6, fluxIdx: 0,
    question: "Qui fait le suivi des prospects qui n'ont pas acheté?",
    hint: "Les gens qui ont montré de l'intérêt mais n'ont pas signé.",
    options: [
      { text: "J'ai un processus de relance défini (J+1, J+3, J+7)", score: 3 },
      { text: "Je fais des relances quand j'y pense", score: 2 },
      { text: "Personne — les prospects tombent dans l'oubli", score: 1 },
    ]
  },

  // === FLUX 2 : PRODUCTION & LIVRAISON (5) ===
  {
    id: 7, fluxIdx: 1,
    question: "As-tu une procédure écrite pour livrer ton service principal?",
    hint: "Une SOP, un guide étape par étape que n'importe qui pourrait suivre.",
    options: [
      { text: "Oui, documentée et suivie par l'équipe", score: 3 },
      { text: "Partiellement — certaines étapes sont documentées", score: 2 },
      { text: "Non, chacun fait à sa façon", score: 1 },
    ]
  },
  {
    id: 8, fluxIdx: 1,
    question: "Quel pourcentage de tes livraisons respecte le délai promis?",
    hint: "Ce que tu promets au client vs ce que tu livres réellement.",
    options: [
      { text: "Plus de 90%", score: 3 },
      { text: "Entre 70% et 90%", score: 2 },
      { text: "Moins de 70% ou je ne mesure pas", score: 1 },
    ]
  },
  {
    id: 9, fluxIdx: 1,
    question: "Reçois-tu des plaintes récurrentes sur les mêmes problèmes?",
    hint: "Les mêmes insatisfactions qui reviennent.",
    options: [
      { text: "Rares et documentées quand ça arrive", score: 3 },
      { text: "Quelques-unes, pas toujours traitées", score: 2 },
      { text: "Fréquentes et non traitées", score: 1 },
    ]
  },
  {
    id: 10, fluxIdx: 1,
    question: "Ta qualité de service dépend-elle d'une seule personne clé?",
    hint: "Si cette personne part, est-ce que tout s'effondre?",
    options: [
      { text: "Non, n'importe qui dans l'équipe peut livrer", score: 3 },
      { text: "Partiellement — certaines tâches dépendent d'une personne", score: 2 },
      { text: "Oui, tout repose sur 1-2 personnes", score: 1 },
    ]
  },
  {
    id: 11, fluxIdx: 1,
    question: "Combien de temps pour former un nouvel employé à livrer ton service?",
    hint: "De l'embauche à l'autonomie.",
    options: [
      { text: "Moins de 2 semaines grâce à mes SOPs", score: 3 },
      { text: "2 à 4 semaines", score: 2 },
      { text: "Plus d'un mois ou pas de formation structurée", score: 1 },
    ]
  },

  // === FLUX 3 : FINANCES & TRÉSORERIE (6) ===
  {
    id: 12, fluxIdx: 2,
    question: "Connais-tu ta marge nette réelle?",
    hint: "Après TOUTES les dépenses — pas juste le chiffre d'affaires.",
    options: [
      { text: "Oui, calculée chaque mois", score: 3 },
      { text: "J'ai une approximation", score: 2 },
      { text: "Non, je ne la connais pas vraiment", score: 1 },
    ]
  },
  {
    id: 13, fluxIdx: 2,
    question: "Combien de temps entre ta facturation et l'encaissement?",
    hint: "Le délai moyen avant que l'argent arrive dans ton compte.",
    options: [
      { text: "Moins de 30 jours", score: 3 },
      { text: "30 à 60 jours", score: 2 },
      { text: "Plus de 60 jours ou je ne mesure pas", score: 1 },
    ]
  },
  {
    id: 14, fluxIdx: 2,
    question: "Fais-tu une conciliation bancaire chaque mois?",
    hint: "Rapprocher tes relevés bancaires avec ta comptabilité.",
    options: [
      { text: "Systématiquement, avant le 10 du mois", score: 3 },
      { text: "Oui mais en retard ou irrégulièrement", score: 2 },
      { text: "Jamais ou rarement", score: 1 },
    ]
  },
  {
    id: 15, fluxIdx: 2,
    question: "As-tu une visibilité sur ton cash-flow des 3 prochains mois?",
    hint: "Une projection de ce qui rentre et sort.",
    options: [
      { text: "Oui, projection mise à jour régulièrement", score: 3 },
      { text: "J'ai une idée générale", score: 2 },
      { text: "Aucune visibilité", score: 1 },
    ]
  },
  {
    id: 16, fluxIdx: 2,
    question: "Combien de factures en souffrance (>60 jours) as-tu?",
    hint: "L'argent qu'on te doit depuis plus de 2 mois.",
    options: [
      { text: "Moins de 5% de mon chiffre d'affaires", score: 3 },
      { text: "Entre 5% et 15%", score: 2 },
      { text: "Plus de 15% ou je ne sais pas", score: 1 },
    ]
  },
  {
    id: 17, fluxIdx: 2,
    question: "Sépares-tu l'argent de l'entreprise et tes finances personnelles?",
    hint: "Comptes bancaires, cartes de crédit, dépenses.",
    options: [
      { text: "Comptes complètement séparés, zéro mélange", score: 3 },
      { text: "Principalement séparés mais quelques exceptions", score: 2 },
      { text: "Mélangés", score: 1 },
    ]
  },

  // === FLUX 4 : RÉTENTION & SATISFACTION CLIENT (5) ===
  {
    id: 18, fluxIdx: 3,
    question: "Connais-tu ton taux de churn (clients perdus vs actifs)?",
    hint: "Combien de clients tu perds chaque mois.",
    options: [
      { text: "Oui, mesuré mensuellement", score: 3 },
      { text: "J'ai une idée approximative", score: 2 },
      { text: "Pas mesuré", score: 1 },
    ]
  },
  {
    id: 19, fluxIdx: 3,
    question: "Fais-tu un suivi de satisfaction après une vente?",
    hint: "Un appel, un email, un sondage dans les jours qui suivent.",
    options: [
      { text: "Systématiquement, dans les 7 jours", score: 3 },
      { text: "Parfois, quand j'y pense", score: 2 },
      { text: "Jamais", score: 1 },
    ]
  },
  {
    id: 20, fluxIdx: 3,
    question: "As-tu un processus pour détecter un client à risque de départ?",
    hint: "Des signaux d'alerte : baisse de commandes, plainte, retard de paiement.",
    options: [
      { text: "Oui, signaux définis et actions automatiques", score: 3 },
      { text: "Je réagis quand je vois des signes", score: 2 },
      { text: "Non, je le découvre quand ils partent", score: 1 },
    ]
  },
  {
    id: 21, fluxIdx: 3,
    question: "As-tu une stratégie de vente additionnelle aux clients existants?",
    hint: "Upsell, cross-sell, offres complémentaires.",
    options: [
      { text: "Oui, processus défini avec déclencheurs", score: 3 },
      { text: "J'y pense mais rien de formel", score: 2 },
      { text: "Aucune stratégie", score: 1 },
    ]
  },
  {
    id: 22, fluxIdx: 3,
    question: "Comment gères-tu les plaintes et insatisfactions?",
    hint: "Quand un client est mécontent, que se passe-t-il?",
    options: [
      { text: "SOP + suivi + résolution en moins de 48h", score: 3 },
      { text: "Je gère au cas par cas", score: 2 },
      { text: "Pas de processus — parfois ignoré", score: 1 },
    ]
  },

  // === FLUX 5 : PILOTAGE & PRISE DE DÉCISION (5) ===
  {
    id: 23, fluxIdx: 4,
    question: "Reçois-tu un rapport de gestion mensuel structuré?",
    hint: "Un document qui résume la performance de ton entreprise.",
    options: [
      { text: "Oui, avant le 10 du mois", score: 3 },
      { text: "Oui mais en retard ou irrégulier", score: 2 },
      { text: "Non", score: 1 },
    ]
  },
  {
    id: 24, fluxIdx: 4,
    question: "Combien d'indicateurs clés (KPIs) suis-tu activement?",
    hint: "Revenus, clients, satisfaction, délais, marge...",
    options: [
      { text: "8 ou plus", score: 3 },
      { text: "3 à 7", score: 2 },
      { text: "Moins de 3 ou aucun", score: 1 },
    ]
  },
  {
    id: 25, fluxIdx: 4,
    question: "Peux-tu voir les tendances sur 3-6 mois de tes indicateurs?",
    hint: "Un dashboard, un graphique, un rapport visuel.",
    options: [
      { text: "Oui, dashboard ou rapport visuel", score: 3 },
      { text: "J'ai quelques données mais pas de vue d'ensemble", score: 2 },
      { text: "Aucune visibilité historique", score: 1 },
    ]
  },
  {
    id: 26, fluxIdx: 4,
    question: "Qui analyse tes chiffres et recommande des actions?",
    hint: "Toi, un comptable, un conseiller, une équipe.",
    options: [
      { text: "Processus défini avec analyse et actions", score: 3 },
      { text: "Je regarde les chiffres quand j'ai le temps", score: 2 },
      { text: "Personne", score: 1 },
    ]
  },
  {
    id: 27, fluxIdx: 4,
    question: "Combien de temps te faut-il pour savoir si le mois dernier a été bon ou mauvais?",
    hint: "De « je vérifie vite » à « j'attends le comptable ».",
    options: [
      { text: "Moins d'une heure", score: 3 },
      { text: "1 à 3 jours", score: 2 },
      { text: "Plus d'une semaine ou je ne sais jamais vraiment", score: 1 },
    ]
  },
];

// --- Remedies per flux ---
const remedies = [
  // Flux 1: Acquisition
  [
    { name: "Cartographie d'acquisition", desc: "Identification de tes 3 canaux principaux + tracking + tableau de bord hebdomadaire", delai: "1 semaine" },
    { name: "Script premier contact", desc: "Procédure écrite pour qualifier un prospect en moins de 10 minutes", delai: "48h" },
    { name: "Séquence de relance", desc: "Automatisation : relance J+1, J+3, J+7 pour tout prospect non converti", delai: "1 semaine" },
    { name: "Rapport acquisition hebdo", desc: "Rapport automatisé : leads / conversions / CAC / source / tendance", delai: "1 semaine" },
  ],
  // Flux 2: Production
  [
    { name: "SOP du service principal", desc: "Procédure étape par étape pour livrer ton service de manière reproductible", delai: "1 semaine" },
    { name: "Checklist qualité", desc: "Vérification en 5 points avant chaque livraison + processus de validation", delai: "48h" },
    { name: "Plan de formation accélérée", desc: "Programme de formation structuré en 5-10 jours basé sur les SOPs", delai: "2 semaines" },
    { name: "Tableau de bord qualité", desc: "Suivi hebdo : délais, plaintes, satisfaction, taux de reprise", delai: "1 semaine" },
  ],
  // Flux 3: Finances
  [
    { name: "Tableau de bord financier", desc: "Rapport mensuel automatisé : revenus, dépenses, marge, cash-flow, créances", delai: "1 semaine" },
    { name: "Séquence relance paiements", desc: "Automatisation : relance J+30, J+45, J+60 avec escalade", delai: "1 semaine" },
    { name: "Modèle projection cash-flow", desc: "Projection simple sur 90 jours, mise à jour mensuellement", delai: "48h" },
    { name: "Procédure de conciliation", desc: "Checklist de conciliation bancaire mensuelle en 10 étapes", delai: "48h" },
  ],
  // Flux 4: Rétention
  [
    { name: "Séquence suivi post-vente", desc: "Automatisation : email/appel J+1, J+7, J+30 après chaque vente", delai: "1 semaine" },
    { name: "Système détection churn", desc: "Grille de signaux d'alerte + actions automatiques", delai: "1 semaine" },
    { name: "Processus gestion plaintes", desc: "SOP : réception, accusation, résolution, suivi, amélioration", delai: "48h" },
    { name: "Programme vente additionnelle", desc: "Offres complémentaires + déclencheurs + scripts", delai: "2 semaines" },
  ],
  // Flux 5: Pilotage
  [
    { name: "Rapport mensuel automatisé", desc: "Consolidation des 4 flux en un rapport unique avec scores + recommandations", delai: "2 semaines" },
    { name: "Dashboard en temps réel", desc: "Tableau de bord visuel avec KPIs live, tendances, alertes", delai: "3 semaines" },
    { name: "Alertes proactives", desc: "Notifications automatiques si un KPI passe en zone rouge", delai: "1 semaine" },
    { name: "Session de revue mensuelle", desc: "Template de rencontre : quoi regarder, quoi décider, quoi documenter", delai: "48h" },
  ],
];


// --- State ---
let currentQuestion = 0;
let maxReachedFluxIdx = 0;
const answers = {};

// --- DOM Elements ---
const diagnosticIntro = document.getElementById('diagnosticIntro');
const diagnosticQuiz = document.getElementById('diagnosticQuiz');
const diagnosticResults = document.getElementById('diagnosticResults');
const questionCard = document.getElementById('questionCard');
const progressFill = document.getElementById('progressFill');
const categoryName = document.getElementById('categoryName');
const questionProgress = document.getElementById('questionProgress');
const categoryStepper = document.getElementById('categoryStepper');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

// --- Start ---
document.getElementById('btnStartDiag').addEventListener('click', () => {
  diagnosticIntro.style.display = 'none';
  diagnosticQuiz.style.display = 'block';
  init();
});

function init() {
  renderCategoryStepper();
  renderQuestion();
  bindNavigation();
}

// --- Category Stepper ---
function renderCategoryStepper() {
  categoryStepper.innerHTML = flux.map((f, i) =>
    `<span class="category-step" data-index="${i}">${f.icon} ${f.name}</span>`
  ).join('');

  document.querySelectorAll('.category-step').forEach(step => {
    step.addEventListener('click', () => {
      const targetIdx = parseInt(step.dataset.index);
      if (targetIdx <= maxReachedFluxIdx) {
        saveCurrentAnswer();
        const firstQ = questions.findIndex(q => q.fluxIdx === targetIdx);
        if (firstQ !== -1) {
          currentQuestion = firstQ;
          renderQuestion();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  });
}

function updateCategoryStepper() {
  const currentFluxIdx = questions[currentQuestion].fluxIdx;
  if (currentFluxIdx > maxReachedFluxIdx) maxReachedFluxIdx = currentFluxIdx;

  document.querySelectorAll('.category-step').forEach((step, i) => {
    step.classList.remove('active', 'completed', 'locked');
    if (i < currentFluxIdx) {
      step.classList.add('completed');
    } else if (i === currentFluxIdx) {
      step.classList.add('active');
    } else if (i <= maxReachedFluxIdx) {
      step.classList.add('completed');
    } else {
      step.classList.add('locked');
    }
  });
}

// --- Render Question ---
function renderQuestion() {
  const q = questions[currentQuestion];
  const f = flux[q.fluxIdx];
  const saved = answers[q.id];

  const fluxQuestions = questions.filter(qq => qq.fluxIdx === q.fluxIdx);
  const posInFlux = fluxQuestions.indexOf(q) + 1;

  questionCard.innerHTML = `
    <div class="question-card__category">${f.icon} ${f.name} — ${posInFlux} de ${fluxQuestions.length}</div>
    <h2>${q.question}</h2>
    ${q.hint ? `<p class="question-card__hint">${q.hint}</p>` : ''}
    <div class="option-group" id="answer">
      ${q.options.map((opt, i) => `
        <label class="option-item ${saved === i ? 'selected' : ''}">
          <input type="radio" name="q${q.id}" value="${i}" ${saved === i ? 'checked' : ''}>
          <span>${opt.text}</span>
        </label>
      `).join('')}
    </div>
  `;

  // Bind radio clicks
  document.querySelectorAll('.option-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
      item.classList.add('selected');
      item.querySelector('input').checked = true;
    });
  });

  // Progress
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
  categoryName.textContent = f.name;
  questionProgress.textContent = `Flux ${q.fluxIdx + 1} de ${flux.length}`;

  // Buttons
  btnPrev.disabled = currentQuestion === 0;
  btnNext.textContent = currentQuestion === questions.length - 1 ? 'Voir mes résultats →' : 'Continuer →';

  updateCategoryStepper();
}

// --- Save / Validate ---
function saveCurrentAnswer() {
  const q = questions[currentQuestion];
  const checked = questionCard.querySelector('input[type="radio"]:checked');
  if (checked) answers[q.id] = parseInt(checked.value);
  return checked ? parseInt(checked.value) : null;
}

function validateCurrent() {
  const val = saveCurrentAnswer();
  if (val === null) {
    questionCard.style.animation = 'shake 0.4s ease';
    setTimeout(() => { questionCard.style.animation = ''; }, 400);
    return false;
  }
  return true;
}

// --- Navigation ---
function bindNavigation() {
  btnNext.addEventListener('click', () => {
    if (!validateCurrent()) return;
    saveCurrentAnswer();
    if (currentQuestion < questions.length - 1) {
      currentQuestion++;
      renderQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      showResults();
    }
  });

  btnPrev.addEventListener('click', () => {
    saveCurrentAnswer();
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      btnNext.click();
    }
  });
}

// --- Scoring ---
function calculateScores() {
  const fluxScores = flux.map((f, fluxIdx) => {
    const fluxQs = questions.filter(q => q.fluxIdx === fluxIdx);
    let total = 0;
    let count = 0;
    fluxQs.forEach(q => {
      if (answers[q.id] !== undefined) {
        total += q.options[answers[q.id]].score;
        count++;
      }
    });
    // Normalize to 0-100
    const maxScore = count * 3;
    const raw = count > 0 ? (total / maxScore) * 100 : 0;
    return Math.round(raw);
  });

  const globalScore = Math.round(fluxScores.reduce((a, b) => a + b, 0) / fluxScores.length);
  return { fluxScores, globalScore };
}

function getZone(score) {
  if (score >= 80) return { zone: 'VERT', color: '#27ae60', label: 'Sain', emoji: '🟢', bg: 'rgba(39,174,96,0.08)' };
  if (score >= 50) return { zone: 'ORANGE', color: '#f39c12', label: 'Fragile', emoji: '🟠', bg: 'rgba(243,156,18,0.08)' };
  return { zone: 'ROUGE', color: '#e74c3c', label: 'Critique', emoji: '🔴', bg: 'rgba(231,76,60,0.08)' };
}

// --- Results ---
function showResults() {
  saveCurrentAnswer();
  const { fluxScores, globalScore } = calculateScores();
  const globalZone = getZone(globalScore);

  // Save diagnostic data for Module 3 (Remèdes)
  localStorage.setItem('bildop_diagnostic', JSON.stringify({
    fluxScores,
    globalScore,
    timestamp: Date.now(),
  }));

  diagnosticQuiz.style.display = 'none';
  diagnosticResults.style.display = 'block';

  // Count zones
  const redCount = fluxScores.filter(s => s < 50).length;
  const orangeCount = fluxScores.filter(s => s >= 50 && s < 80).length;
  const greenCount = fluxScores.filter(s => s >= 80).length;

  diagnosticResults.innerHTML = `
    <div class="diag-results">

      <!-- Global Score -->
      <div class="diag-results__header">
        <h1>Ton diagnostic est prêt</h1>
        <p class="diag-results__subtitle">Voici la santé de ton entreprise, flux par flux.</p>
      </div>

      <div class="diag-score-global" style="border-color: ${globalZone.color}">
        <div class="diag-score-global__number" style="color: ${globalZone.color}">${globalScore}</div>
        <div class="diag-score-global__label">Score de santé global</div>
        <div class="diag-score-global__zone" style="color: ${globalZone.color}">${globalZone.emoji} Zone ${globalZone.zone} — ${globalZone.label}</div>
      </div>

      <div class="diag-zone-summary">
        ${redCount > 0 ? `<span class="diag-zone-chip diag-zone-chip--red">🔴 ${redCount} flux critique${redCount > 1 ? 's' : ''}</span>` : ''}
        ${orangeCount > 0 ? `<span class="diag-zone-chip diag-zone-chip--orange">🟠 ${orangeCount} flux fragile${orangeCount > 1 ? 's' : ''}</span>` : ''}
        ${greenCount > 0 ? `<span class="diag-zone-chip diag-zone-chip--green">🟢 ${greenCount} flux sain${greenCount > 1 ? 's' : ''}</span>` : ''}
      </div>

      <!-- Per-flux breakdown -->
      <div class="diag-flux-list">
        ${flux.map((f, i) => {
          const score = fluxScores[i];
          const zone = getZone(score);
          const fluxRemedies = remedies[i];
          const showRemedies = score < 80;
          return `
            <div class="diag-flux-card" style="border-left: 4px solid ${zone.color}">
              <div class="diag-flux-card__header">
                <div>
                  <h3>${f.icon} ${f.name}</h3>
                  <p class="diag-flux-card__desc">${f.description}</p>
                </div>
                <div class="diag-flux-card__score" style="color: ${zone.color}">${score}<small>/100</small></div>
              </div>

              <div class="diag-flux-card__bar">
                <div class="diag-flux-card__bar-fill" style="width: ${score}%; background: ${zone.color}"></div>
              </div>

              <div class="diag-flux-card__zone" style="background: ${zone.bg}; color: ${zone.color}">
                ${zone.emoji} ${zone.zone} — ${zone.label}
              </div>

              ${showRemedies ? `
                <div class="diag-flux-card__remedies">
                  <h4>💊 Remèdes prescrits</h4>
                  ${fluxRemedies.map(r => `
                    <div class="diag-remedy">
                      <strong>${r.name}</strong>
                      <p>${r.desc}</p>
                      <span class="diag-remedy__delai">⏱ ${r.delai}</span>
                    </div>
                  `).join('')}
                </div>
              ` : `
                <div class="diag-flux-card__healthy">
                  <p>✅ Ce flux est sain. Continue comme ça!</p>
                </div>
              `}
            </div>
          `;
        }).join('')}
      </div>

      <!-- CTA -->
      <div class="diag-results__cta">
        <h2>Prêt à guérir ce qui saigne?</h2>
        <p>On a identifié ce qui fragilise ton entreprise. Maintenant, découvre les remèdes concrets — quoi faire, qui, quand — et passe à l'action.</p>
        <div class="diag-results__cta-buttons">
          <a href="remedes.html" class="btn btn--primary btn--large">Voir mes remèdes prescrits →</a>
          <a href="questionnaire.html" class="btn btn--secondary btn--large">Créer mon plan d'affaires →</a>
          <button class="btn btn--secondary" onclick="window.print()">📄 Imprimer</button>
        </div>
        <p style="margin-top: 16px; font-size: 0.85rem; color: var(--text-muted);">
          Ton diagnostic alimente directement tes remèdes et ton plan d'affaires Bildop.
        </p>
      </div>

    </div>
  `;

  window.scrollTo({ top: 0, behavior: 'smooth' });
}

// --- Shake Animation ---
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
`;
document.head.appendChild(style);
