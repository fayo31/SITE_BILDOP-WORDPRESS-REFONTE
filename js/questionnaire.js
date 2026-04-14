/* ============================================
   BILDOP — Questionnaire Engine v2.0
   Conversation guidée, 9 catégories, wizard UI
   + AI Assist (Aide Bildop + Rafraîchir)
   ============================================ */

// --- AI Assist Configuration ---
const AI_API_URL = '/api/ai-suggest';
let aiLoading = false;

// --- Question Data ---
// Each question: { id, category, categoryIndex, question, hint, type, options?, required }
// Types: text, textarea, select, radio, number, email, url

const categories = [
  { name: 'Informations générales', icon: '📋', count: 10 },
  { name: 'Marché et clients', icon: '🎯', count: 10 },
  { name: 'Produit / Service', icon: '💡', count: 10 },
  { name: 'Modèle d\'affaires', icon: '💰', count: 10 },
  { name: 'Marketing et ventes', icon: '📣', count: 10 },
  { name: 'Opérations', icon: '⚙️', count: 10 },
  { name: 'Finances', icon: '📊', count: 10 },
  { name: 'Équipe', icon: '👥', count: 8 },
  { name: 'Risques et stratégie', icon: '🛡️', count: 7 },
];

const questions = [
  // === CATÉGORIE 1 : INFORMATIONS GÉNÉRALES (10) ===
  { id: 1, catIdx: 0, question: "Quel est le nom de ton entreprise (ou ton nom de projet)?", hint: "Si tu n'as pas encore de nom, écris ton idée de nom ou \"à définir\".", type: "text", required: true },
  { id: 2, catIdx: 0, question: "Décris ton projet en une phrase.", hint: "Exemple : « Un service de traiteur végane pour événements corporatifs à Montréal ».", type: "text", required: true },
  { id: 3, catIdx: 0, question: "Quel est le secteur d'activité principal?", hint: "", type: "select", options: ["Restauration / Alimentation", "Services professionnels", "Commerce de détail", "Technologie / SaaS", "Santé / Bien-être", "Construction / Rénovation", "Éducation / Formation", "Arts / Culture / Divertissement", "Transport / Logistique", "Immobilier", "Agriculture", "Autre"], required: true },
  { id: 4, catIdx: 0, question: "Où sera située ton entreprise?", hint: "Ville, région, ou \"en ligne\" si c'est un business 100% numérique.", type: "text", required: true },
  { id: 5, catIdx: 0, question: "Quelle est la structure juridique envisagée?", hint: "", type: "radio", options: ["Entreprise individuelle (travailleur autonome)", "Société par actions (Inc.)", "Société en nom collectif (SENC)", "Coopérative", "OBNL", "Je ne sais pas encore"], required: true },
  { id: 6, catIdx: 0, question: "Est-ce que ton entreprise existe déjà ou c'est un nouveau projet?", hint: "", type: "radio", options: ["Nouveau projet (pas encore lancé)", "Entreprise existante (moins de 2 ans)", "Entreprise existante (plus de 2 ans)", "Reprise / acquisition d'une entreprise existante"], required: true },
  { id: 7, catIdx: 0, question: "Quelle est ta date de lancement prévue (ou réelle)?", hint: "Approximatif, c'est correct.", type: "text", required: false },
  { id: 8, catIdx: 0, question: "Pourquoi veux-tu lancer cette entreprise?", hint: "Ta motivation personnelle. Qu'est-ce qui te drive?", type: "textarea", required: true },
  { id: 9, catIdx: 0, question: "Quelle est ta mission en une phrase?", hint: "Exemple : « Rendre l'alimentation végane accessible et délicieuse pour les entreprises québécoises ».", type: "text", required: false },
  { id: 10, catIdx: 0, question: "Quelle est ta vision à 5 ans?", hint: "Où vois-tu ton entreprise dans 5 ans? Taille, revenus, impact.", type: "textarea", required: false },

  // === CATÉGORIE 2 : MARCHÉ ET CLIENTS (10) ===
  { id: 11, catIdx: 1, question: "Qui est ton client idéal?", hint: "Décris ton client type : âge, revenu, localisation, comportement, besoins.", type: "textarea", required: true },
  { id: 12, catIdx: 1, question: "Quel problème principal résous-tu pour tes clients?", hint: "Quelle douleur, frustration ou besoin non comblé adresses-tu?", type: "textarea", required: true },
  { id: 13, catIdx: 1, question: "Qui sont tes 3 principaux concurrents?", hint: "Noms d'entreprises ou types de solutions que tes clients utilisent présentement.", type: "textarea", required: true },
  { id: 14, catIdx: 1, question: "Qu'est-ce qui te différencie de la concurrence?", hint: "Ton avantage unique. Pourquoi un client choisirait-il toi plutôt qu'un autre?", type: "textarea", required: true },
  { id: 15, catIdx: 1, question: "Quelle est la taille estimée de ton marché?", hint: "Nombre de clients potentiels, dépenses moyennes dans ton secteur, ou \"je ne sais pas\".", type: "textarea", required: false },
  { id: 16, catIdx: 1, question: "Est-ce que ton marché est en croissance, stable ou en déclin?", hint: "", type: "radio", options: ["En forte croissance", "En croissance modérée", "Stable", "En déclin", "Je ne sais pas"], required: true },
  { id: 17, catIdx: 1, question: "Quelles sont les tendances importantes dans ton secteur?", hint: "Nouvelles technologies, changements de comportement, réglementation, etc.", type: "textarea", required: false },
  { id: 18, catIdx: 1, question: "Comment tes clients découvrent-ils des produits/services comme le tien?", hint: "Réseaux sociaux, bouche-à-oreille, Google, événements, etc.", type: "textarea", required: true },
  { id: 19, catIdx: 1, question: "Quel est le budget moyen de tes clients pour ce type de produit/service?", hint: "Montant approximatif ou fourchette.", type: "text", required: false },
  { id: 20, catIdx: 1, question: "As-tu déjà parlé à des clients potentiels? Qu'ont-ils dit?", hint: "Retours, intérêt, objections, suggestions.", type: "textarea", required: false },

  // === CATÉGORIE 3 : PRODUIT / SERVICE (10) ===
  { id: 21, catIdx: 2, question: "Décris ton produit ou service principal.", hint: "En détail : qu'est-ce que tu offres concrètement?", type: "textarea", required: true },
  { id: 22, catIdx: 2, question: "As-tu des produits/services secondaires?", hint: "Offres complémentaires, upsells, add-ons.", type: "textarea", required: false },
  { id: 23, catIdx: 2, question: "À quel stade en est ton produit/service?", hint: "", type: "radio", options: ["Juste une idée", "Prototype / MVP en développement", "Version beta / tests", "Prêt à lancer", "Déjà sur le marché"], required: true },
  { id: 24, catIdx: 2, question: "Quel est ton prix de vente prévu?", hint: "Prix unitaire, forfait mensuel, taux horaire — selon ton modèle.", type: "text", required: true },
  { id: 25, catIdx: 2, question: "Comment livres-tu ton produit/service?", hint: "En personne, en ligne, livraison, téléchargement, SaaS, etc.", type: "text", required: true },
  { id: 26, catIdx: 2, question: "As-tu de la propriété intellectuelle à protéger?", hint: "Marque, brevet, recette, algorithme, méthodologie unique.", type: "textarea", required: false },
  { id: 27, catIdx: 2, question: "Quelles sont les limites actuelles de ton offre?", hint: "Ce que tu ne fais PAS (encore). Limitations connues.", type: "textarea", required: false },
  { id: 28, catIdx: 2, question: "Quels outils ou technologies utilises-tu?", hint: "Logiciels, plateformes, équipements spécialisés.", type: "textarea", required: false },
  { id: 29, catIdx: 2, question: "Comment vas-tu assurer la qualité?", hint: "Contrôle qualité, normes, certifications, retours clients.", type: "textarea", required: false },
  { id: 30, catIdx: 2, question: "Quelle est ton plan d'évolution du produit sur 12 mois?", hint: "Nouvelles fonctionnalités, nouveaux produits, améliorations prévues.", type: "textarea", required: false },

  // === CATÉGORIE 4 : MODÈLE D'AFFAIRES (10) ===
  { id: 31, catIdx: 3, question: "Comment gagnes-tu de l'argent?", hint: "Vente directe, abonnement, commission, licence, publicité, etc.", type: "textarea", required: true },
  { id: 32, catIdx: 3, question: "Combien de sources de revenus différentes as-tu?", hint: "", type: "radio", options: ["1 source principale", "2-3 sources", "4+ sources", "Pas encore défini"], required: true },
  { id: 33, catIdx: 3, question: "Quel est ton revenu moyen par client?", hint: "Panier moyen, valeur à vie (LTV), ou estimation.", type: "text", required: true },
  { id: 34, catIdx: 3, question: "Quelle est ta marge brute estimée?", hint: "% de profit après les coûts directs. Ex : si tu vends 100$ et ça te coûte 40$ = marge 60%.", type: "text", required: false },
  { id: 35, catIdx: 3, question: "Combien de clients as-tu besoin par mois pour être rentable?", hint: "Si tu ne sais pas, fais une estimation.", type: "text", required: false },
  { id: 36, catIdx: 3, question: "Comment fidélises-tu tes clients?", hint: "Programme de fidélité, contrats récurrents, excellent service, communauté.", type: "textarea", required: false },
  { id: 37, catIdx: 3, question: "Quels sont tes partenaires clés?", hint: "Fournisseurs, distributeurs, partenaires stratégiques, affiliés.", type: "textarea", required: false },
  { id: 38, catIdx: 3, question: "Quelles sont tes activités clés au quotidien?", hint: "Les 3-5 activités essentielles pour que ton business fonctionne.", type: "textarea", required: true },
  { id: 39, catIdx: 3, question: "Quelles ressources clés as-tu besoin?", hint: "Humaines, technologiques, financières, physiques.", type: "textarea", required: false },
  { id: 40, catIdx: 3, question: "As-tu un avantage de coût ou d'efficacité par rapport à tes concurrents?", hint: "", type: "textarea", required: false },

  // === CATÉGORIE 5 : MARKETING ET VENTES (10) ===
  { id: 41, catIdx: 4, question: "Quels canaux vas-tu utiliser pour rejoindre tes clients?", hint: "", type: "textarea", required: true },
  { id: 42, catIdx: 4, question: "Quel est ton budget marketing mensuel estimé?", hint: "Même approximatif.", type: "text", required: false },
  { id: 43, catIdx: 4, question: "As-tu déjà une présence en ligne?", hint: "", type: "radio", options: ["Oui — site web + réseaux sociaux", "Oui — réseaux sociaux seulement", "Oui — site web seulement", "Non, rien encore"], required: true },
  { id: 44, catIdx: 4, question: "Quelle est ta stratégie de contenu?", hint: "Blogue, vidéos, podcasts, newsletters, posts sociaux.", type: "textarea", required: false },
  { id: 45, catIdx: 4, question: "Comment vas-tu convertir les prospects en clients?", hint: "Processus de vente : essai gratuit, démo, appel découverte, rabais lancement.", type: "textarea", required: true },
  { id: 46, catIdx: 4, question: "As-tu un message clé ou slogan?", hint: "Ta phrase d'accroche principale.", type: "text", required: false },
  { id: 47, catIdx: 4, question: "Comptes-tu offrir des promotions au lancement?", hint: "Rabais, essai gratuit, offre early bird, etc.", type: "textarea", required: false },
  { id: 48, catIdx: 4, question: "Comment vas-tu mesurer le succès de ton marketing?", hint: "KPI : nombre de leads, taux de conversion, coût d'acquisition, etc.", type: "textarea", required: false },
  { id: 49, catIdx: 4, question: "Prévois-tu des partenariats pour la distribution?", hint: "Revendeurs, affiliés, influenceurs, distributeurs.", type: "textarea", required: false },
  { id: 50, catIdx: 4, question: "Quel est ton positionnement prix par rapport à la concurrence?", hint: "", type: "radio", options: ["Plus bas que la concurrence (entrée de gamme)", "Au même niveau (compétitif)", "Plus haut (premium / différencié)", "Pas encore défini"], required: true },

  // === CATÉGORIE 6 : OPÉRATIONS (10) ===
  { id: 51, catIdx: 5, question: "As-tu besoin d'un local ou bureau?", hint: "", type: "radio", options: ["Oui — déjà trouvé", "Oui — en recherche", "Non — 100% à domicile", "Non — 100% en ligne", "Pas encore décidé"], required: true },
  { id: 52, catIdx: 5, question: "Quels sont tes principaux fournisseurs?", hint: "Matières premières, logiciels, services sous-traités.", type: "textarea", required: false },
  { id: 53, catIdx: 5, question: "As-tu besoin d'équipement spécialisé?", hint: "Machines, véhicules, outils, serveurs, etc. Et coût estimé.", type: "textarea", required: false },
  { id: 54, catIdx: 5, question: "Quel est ton processus de livraison / prestation?", hint: "De la commande client jusqu'à la livraison — les grandes étapes.", type: "textarea", required: true },
  { id: 55, catIdx: 5, question: "As-tu besoin de permis, licences ou certifications?", hint: "RBQ, permis d'alcool, certifications professionnelles, etc.", type: "textarea", required: false },
  { id: 56, catIdx: 5, question: "Comment gères-tu l'inventaire (si applicable)?", hint: "Stock, juste-à-temps, dropshipping, pas applicable.", type: "text", required: false },
  { id: 57, catIdx: 5, question: "Quels logiciels/outils vas-tu utiliser au quotidien?", hint: "Comptabilité, CRM, gestion de projets, POS, etc.", type: "textarea", required: false },
  { id: 58, catIdx: 5, question: "As-tu un plan pour gérer les pics de demande?", hint: "Saisonnalité, gros contrats, croissance rapide.", type: "textarea", required: false },
  { id: 59, catIdx: 5, question: "Quelles sont tes heures d'opération prévues?", hint: "Lun-ven 9-5, 7j/7, sur rendez-vous, etc.", type: "text", required: false },
  { id: 60, catIdx: 5, question: "As-tu des obligations environnementales ou réglementaires?", hint: "Normes environnementales, CNESST, règlements municipaux.", type: "textarea", required: false },

  // === CATÉGORIE 7 : FINANCES (10) ===
  { id: 61, catIdx: 6, question: "Quel est ton investissement initial estimé?", hint: "Tout ce dont tu as besoin pour partir : équipement, local, inventaire, frais juridiques, etc.", type: "text", required: true },
  { id: 62, catIdx: 6, question: "Comment finances-tu le démarrage?", hint: "", type: "textarea", required: true },
  { id: 63, catIdx: 6, question: "Quel est ton objectif de revenus pour l'année 1?", hint: "Estimation réaliste.", type: "text", required: true },
  { id: 64, catIdx: 6, question: "Quels sont tes coûts fixes mensuels estimés?", hint: "Loyer, salaires, assurances, abonnements logiciels, téléphone, etc.", type: "textarea", required: true },
  { id: 65, catIdx: 6, question: "Quels sont tes coûts variables par vente?", hint: "Matières premières, commissions, frais de livraison, etc.", type: "textarea", required: true },
  { id: 66, catIdx: 6, question: "As-tu déjà un comptable ou conseiller financier?", hint: "", type: "radio", options: ["Oui", "Non, mais j'en cherche un", "Non, pas pour le moment"], required: false },
  { id: 67, catIdx: 6, question: "Cherches-tu du financement externe?", hint: "", type: "radio", options: ["Oui — prêt bancaire", "Oui — subventions gouvernementales", "Oui — investisseurs / anges", "Oui — plusieurs sources", "Non — autofinancement"], required: true },
  { id: 68, catIdx: 6, question: "Quel montant de financement recherches-tu?", hint: "Si applicable.", type: "text", required: false },
  { id: 69, catIdx: 6, question: "Quel est ton seuil de rentabilité estimé?", hint: "Nombre de mois avant d'être rentable, ou \"je ne sais pas\".", type: "text", required: false },
  { id: 70, catIdx: 6, question: "As-tu un fonds d'urgence / réserve de trésorerie?", hint: "Combien de mois de dépenses peux-tu couvrir sans revenus?", type: "text", required: false },

  // === CATÉGORIE 8 : ÉQUIPE (8) ===
  { id: 71, catIdx: 7, question: "Combien de fondateurs/associés êtes-vous?", hint: "", type: "radio", options: ["Je suis seul(e)", "2 associés", "3+ associés"], required: true },
  { id: 72, catIdx: 7, question: "Quelle est ton expérience dans ce domaine?", hint: "Années d'expérience, formations pertinentes, réalisations.", type: "textarea", required: true },
  { id: 73, catIdx: 7, question: "Quelles compétences t'apportes au projet?", hint: "Tes forces principales : vente, technique, gestion, créativité, réseau.", type: "textarea", required: true },
  { id: 74, catIdx: 7, question: "Quelles compétences te manquent?", hint: "Ce que tu devras sous-traiter ou embaucher.", type: "textarea", required: false },
  { id: 75, catIdx: 7, question: "Prévois-tu embaucher dans la première année?", hint: "", type: "radio", options: ["Oui — 1 à 2 employés", "Oui — 3 à 5 employés", "Oui — 6+ employés", "Non — je travaille seul(e) / avec des sous-traitants", "Pas encore décidé"], required: true },
  { id: 76, catIdx: 7, question: "Quels rôles seraient les premières embauches?", hint: "Si applicable.", type: "textarea", required: false },
  { id: 77, catIdx: 7, question: "As-tu un mentor ou conseiller d'affaires?", hint: "", type: "radio", options: ["Oui", "Non, mais j'en cherche un", "Non"], required: false },
  { id: 78, catIdx: 7, question: "As-tu un réseau professionnel dans ton secteur?", hint: "Associations, chambres de commerce, groupes, contacts clés.", type: "textarea", required: false },

  // === CATÉGORIE 9 : RISQUES ET STRATÉGIE (7) ===
  { id: 79, catIdx: 8, question: "Quels sont les 3 plus gros risques pour ton projet?", hint: "Risques de marché, financiers, opérationnels, concurrentiels, personnels.", type: "textarea", required: true },
  { id: 80, catIdx: 8, question: "Que fais-tu si les ventes sont plus lentes que prévu?", hint: "Plan B. Comment tu t'ajustes?", type: "textarea", required: true },
  { id: 81, catIdx: 8, question: "Qu'est-ce qui pourrait tuer ton projet?", hint: "Sois honnête. Un concurrent géant, une réglementation, le manque de cash?", type: "textarea", required: false },
  { id: 82, catIdx: 8, question: "As-tu des assurances prévues?", hint: "Responsabilité civile, professionnelle, biens, etc.", type: "textarea", required: false },
  { id: 83, catIdx: 8, question: "Comment vas-tu t'adapter si le marché change?", hint: "Flexibilité, pivots possibles, diversification.", type: "textarea", required: false },
  { id: 84, catIdx: 8, question: "Quel est ton objectif #1 pour les 90 prochains jours?", hint: "L'action la plus importante pour avancer.", type: "text", required: true },
  { id: 85, catIdx: 8, question: "Y a-t-il autre chose qu'on devrait savoir sur ton projet?", hint: "Tout ce qui n'a pas été couvert. Informations supplémentaires, contexte, détails importants.", type: "textarea", required: false },
];


// --- State ---
let currentQuestion = 0;
let maxReachedCatIdx = 0; // Highest category the user has reached
const answers = {};

// Restore saved answers if any
try {
  const saved = localStorage.getItem('bildop_questionnaire');
  if (saved) Object.assign(answers, JSON.parse(saved));
} catch(e) {}

// Restore progress: find the highest category with answers + resume at last answered question
if (Object.keys(answers).length > 0) {
  let lastAnsweredIdx = 0;
  for (const [id, val] of Object.entries(answers)) {
    if (val) {
      const qIdx = questions.findIndex(q => String(q.id) === String(id));
      if (qIdx > lastAnsweredIdx) lastAnsweredIdx = qIdx;
    }
  }
  // Unlock all categories up to and including the last answered question's category
  maxReachedCatIdx = questions[lastAnsweredIdx].catIdx;
  // Resume at the next unanswered question (or last if all answered)
  const nextUnanswered = questions.findIndex((q, i) => i > lastAnsweredIdx && !answers[q.id]);
  currentQuestion = nextUnanswered !== -1 ? nextUnanswered : lastAnsweredIdx;
}

// Pre-fill from IdeaScore Pro if available
try {
  const isData = localStorage.getItem('bildop_ideascore');
  if (isData) {
    const is = JSON.parse(isData);
    // Pre-fill idea description if q-description or q-idee-affaires is empty
    if (is.ideaText && !answers['q-description'] && !answers['q-idee-affaires'] && !answers[2]) {
      answers['q-idee-affaires'] = is.ideaText;
      answers[2] = is.ideaText;
    }
    // Pre-fill sector from category name
    if (is.categoryName && !answers['q-secteur'] && !answers['q-industrie'] && !answers[3]) {
      answers['q-secteur'] = is.categoryName;
      answers[3] = is.categoryName;
    }
    // Pre-fill revenue goal from projections
    if (is.projections?.year1Revenue && !answers['q-revenu-an1'] && !answers['q-revenue-goal']) {
      answers['q-revenu-an1'] = String(is.projections.year1Revenue);
    }
  }
} catch(e) {}

// --- DOM Elements ---
const questionCard = document.getElementById('questionCard');
const progressFill = document.getElementById('progressFill');
const categoryName = document.getElementById('categoryName');
const questionProgress = document.getElementById('questionProgress');
const categoryStepper = document.getElementById('categoryStepper');
const btnPrev = document.getElementById('btnPrev');
const btnNext = document.getElementById('btnNext');

// --- Initialize ---
function init() {
  renderCategoryStepper();
  renderQuestion();
  bindNavigation();
  bindReset();
  bindSave();
  bindMyPlans();
  updateSaveLabel();
}

// --- Save / Load Plans ---
function getSavedPlans() {
  try {
    const data = localStorage.getItem('bildop_plans');
    return data ? JSON.parse(data) : [];
  } catch(e) { return []; }
}

function savePlans(plans) {
  localStorage.setItem('bildop_plans', JSON.stringify(plans));
}

function getBusinessName() {
  return answers[1] ? answers[1].trim() : '';
}

function updateSaveLabel() {
  const name = getBusinessName();
  const btnSave = document.getElementById('btnSave');
  if (btnSave) {
    btnSave.textContent = name ? `Sauvegarder "${name}"` : 'Sauvegarder';
  }
}

function showToast(message, type) {
  const toast = document.createElement('div');
  const bg = type === 'error' ? '#ff4757' : type === 'warning' ? '#ffa502' : '#00c1ff';
  toast.style.cssText = `position:fixed;top:20px;left:50%;transform:translateX(-50%);background:${bg};color:white;padding:12px 24px;border-radius:10px;font-size:0.9rem;font-weight:600;z-index:99999;box-shadow:0 4px 20px rgba(0,0,0,0.2);transition:opacity 0.3s;`;
  toast.textContent = message;
  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = '0'; setTimeout(() => toast.remove(), 300); }, 3000);
}

function bindSave() {
  const btnSave = document.getElementById('btnSave');
  if (!btnSave) return;

  btnSave.addEventListener('click', (e) => {
    e.preventDefault();
    saveCurrentAnswer();

    const name = getBusinessName();
    if (!name) {
      showToast('Donne un nom a ton entreprise d\'abord! (Question 1)', 'error');
      // Jump to question 1
      currentQuestion = 0;
      maxReachedCatIdx = Math.max(maxReachedCatIdx, 0);
      renderQuestion();
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const plans = getSavedPlans();
    const existing = plans.findIndex(p => p.name === name);
    const planData = {
      name: name,
      answers: { ...answers },
      lastQuestion: currentQuestion,
      maxCat: maxReachedCatIdx,
      updatedAt: new Date().toISOString(),
      questionsAnswered: Object.values(answers).filter(v => v && String(v).trim()).length,
      totalQuestions: questions.length,
    };

    if (existing !== -1) {
      plans[existing] = planData;
      showToast(`Plan "${name}" mis a jour!`, 'success');
    } else {
      plans.push(planData);
      showToast(`Plan "${name}" sauvegarde!`, 'success');
    }

    savePlans(plans);
  });
}

function bindMyPlans() {
  const btnMyPlans = document.getElementById('btnMyPlans');
  const modal = document.getElementById('plansModal');
  const closeBtn = document.getElementById('closeModal');
  if (!btnMyPlans || !modal) return;

  btnMyPlans.addEventListener('click', (e) => {
    e.preventDefault();
    renderPlansList();
    modal.style.display = 'flex';
  });

  closeBtn.addEventListener('click', () => { modal.style.display = 'none'; });
  modal.addEventListener('click', (e) => { if (e.target === modal) modal.style.display = 'none'; });
}

function renderPlansList() {
  const list = document.getElementById('plansList');
  const plans = getSavedPlans();

  if (plans.length === 0) {
    list.innerHTML = '<p style="text-align:center; color:#999; padding:20px;">Aucun plan sauvegarde.<br>Remplis le questionnaire et clique "Sauvegarder".</p>';
    return;
  }

  list.innerHTML = plans.map((plan, i) => {
    const date = new Date(plan.updatedAt);
    const dateStr = date.toLocaleDateString('fr-CA', { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
    const progress = Math.round((plan.questionsAnswered / plan.totalQuestions) * 100);
    return `
      <div style="border:1px solid #e0e0e0; border-radius:12px; padding:16px; margin-bottom:12px; cursor:pointer; transition:all 0.2s;"
           onmouseover="this.style.borderColor='#00c1ff'; this.style.boxShadow='0 2px 12px rgba(0,193,255,0.15)'"
           onmouseout="this.style.borderColor='#e0e0e0'; this.style.boxShadow='none'">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <strong style="font-size:1.05rem;">${plan.name}</strong>
          <button onclick="event.stopPropagation(); deletePlan(${i})" style="background:none; border:none; color:#ff4757; cursor:pointer; font-size:0.8rem;">Supprimer</button>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <span style="font-size:0.8rem; color:#666;">${dateStr}</span>
          <span style="font-size:0.8rem; color:#00c1ff; font-weight:600;">${progress}% complete</span>
        </div>
        <div style="background:#f0f0f0; border-radius:4px; height:6px; overflow:hidden;">
          <div style="background:linear-gradient(90deg,#00c1ff,#0066ff); height:100%; width:${progress}%; border-radius:4px;"></div>
        </div>
        <button onclick="loadPlan(${i})" style="margin-top:12px; width:100%; padding:10px; background:linear-gradient(135deg,#00c1ff,#0066ff); color:white; border:none; border-radius:8px; font-weight:600; cursor:pointer;">Ouvrir ce plan</button>
      </div>
    `;
  }).join('');
}

function loadPlan(index) {
  const plans = getSavedPlans();
  const plan = plans[index];
  if (!plan) return;

  // Clear current answers and load saved ones
  Object.keys(answers).forEach(k => delete answers[k]);
  Object.assign(answers, plan.answers);
  localStorage.setItem('bildop_questionnaire', JSON.stringify(answers));

  currentQuestion = plan.lastQuestion || 0;
  maxReachedCatIdx = plan.maxCat || 0;

  renderCategoryStepper();
  renderQuestion();
  updateSaveLabel();
  document.getElementById('plansModal').style.display = 'none';
  window.scrollTo({ top: 0, behavior: 'smooth' });
  showToast(`Plan "${plan.name}" charge!`, 'success');
}

function deletePlan(index) {
  const plans = getSavedPlans();
  const name = plans[index]?.name;
  if (confirm(`Supprimer le plan "${name}"?`)) {
    plans.splice(index, 1);
    savePlans(plans);
    renderPlansList();
    showToast(`Plan "${name}" supprime.`, 'warning');
  }
}

// --- Reset (Nouveau plan) ---
function bindReset() {
  const btnReset = document.getElementById('btnReset');
  if (btnReset) {
    btnReset.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Recommencer un nouveau plan d\'affaires?\n\nToutes tes reponses actuelles seront effacees.\n(Tes plans sauvegardes restent intacts)')) {
        localStorage.removeItem('bildop_questionnaire');
        Object.keys(answers).forEach(k => delete answers[k]);
        currentQuestion = 0;
        maxReachedCatIdx = 0;
        renderCategoryStepper();
        renderQuestion();
        updateSaveLabel();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    });
  }
}

// --- Render Category Stepper ---
function renderCategoryStepper() {
  categoryStepper.innerHTML = categories.map((cat, i) =>
    `<span class="category-step" data-index="${i}">${cat.icon} ${cat.name}</span>`
  ).join('');

  // Bind click events on stepper pills
  document.querySelectorAll('.category-step').forEach(step => {
    step.addEventListener('click', () => {
      const targetCatIdx = parseInt(step.dataset.index);
      // Only allow navigating to completed or current categories, not future
      if (targetCatIdx <= maxReachedCatIdx) {
        saveCurrentAnswer();
        // Jump to first question of that category
        const firstQIdx = questions.findIndex(q => q.catIdx === targetCatIdx);
        if (firstQIdx !== -1) {
          currentQuestion = firstQIdx;
          renderQuestion();
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      }
    });
  });
}

function updateCategoryStepper() {
  const q = questions[currentQuestion];
  const currentCatIdx = q.catIdx;

  // Update max reached category
  if (currentCatIdx > maxReachedCatIdx) {
    maxReachedCatIdx = currentCatIdx;
  }

  document.querySelectorAll('.category-step').forEach((step, i) => {
    step.classList.remove('active', 'completed', 'locked');
    if (i < currentCatIdx) {
      step.classList.add('completed');
    } else if (i === currentCatIdx) {
      step.classList.add('active');
    } else if (i <= maxReachedCatIdx) {
      // Previously visited but not current — show as completed (navigable)
      step.classList.add('completed');
    } else {
      // Future category — locked
      step.classList.add('locked');
    }
  });
}

// --- Render Question ---
function renderQuestion() {
  const q = questions[currentQuestion];
  const cat = categories[q.catIdx];
  const savedAnswer = answers[q.id] || '';

  let inputHTML = '';

  switch (q.type) {
    case 'text':
    case 'email':
    case 'url':
    case 'number':
      inputHTML = `
        <div class="input-group">
          <input type="${q.type}" id="answer" value="${savedAnswer}" placeholder="Ta réponse..." autocomplete="off">
        </div>`;
      break;

    case 'textarea':
      inputHTML = `
        <div class="input-group">
          <textarea id="answer" placeholder="Ta réponse..." rows="4">${savedAnswer}</textarea>
        </div>`;
      break;

    case 'select':
      inputHTML = `
        <div class="input-group">
          <select id="answer">
            <option value="">— Sélectionne une option —</option>
            ${q.options.map(opt => `<option value="${opt}" ${savedAnswer === opt ? 'selected' : ''}>${opt}</option>`).join('')}
          </select>
        </div>`;
      break;

    case 'radio':
      inputHTML = `
        <div class="option-group" id="answer">
          ${q.options.map((opt, i) => `
            <label class="option-item ${savedAnswer === opt ? 'selected' : ''}">
              <input type="radio" name="q${q.id}" value="${opt}" ${savedAnswer === opt ? 'checked' : ''}>
              <span>${opt}</span>
            </label>
          `).join('')}
        </div>`;
      break;
  }

  // Calculate position within current category
  const catQuestions = questions.filter(qq => qq.catIdx === q.catIdx);
  const posInCat = catQuestions.indexOf(q) + 1;

  // AI assist buttons — only for text/textarea (not select/radio)
  const showAiButtons = (q.type === 'text' || q.type === 'textarea');
  const aiButtonsHTML = showAiButtons ? `
    <div class="ai-assist" style="display: flex; gap: 8px; margin-top: 10px; flex-wrap: wrap;">
      <button type="button" class="btn-ai btn-ai--suggest" id="btnAiSuggest" title="L'IA genere une suggestion basee sur tes reponses precedentes">
        <span class="btn-ai__icon">&#9733;</span> Aide Bildop
      </button>
      <button type="button" class="btn-ai btn-ai--refresh" id="btnAiRefresh" title="Ameliore ta reponse avec l'IA" style="display: none;">
        <span class="btn-ai__icon">&#8635;</span> Rafraichir
      </button>
      <span id="aiStatus" style="font-size: 0.8rem; color: var(--text-muted); align-self: center;"></span>
    </div>
  ` : '';

  questionCard.innerHTML = `
    <div class="question-card__category">${cat.icon} ${cat.name} — ${posInCat} de ${catQuestions.length}</div>
    <h2>${q.question}</h2>
    ${q.hint ? `<p class="question-card__hint">${q.hint}</p>` : ''}
    ${!q.required ? '<p style="font-size: 0.8rem; color: var(--text-muted); margin-bottom: 12px;">Optionnelle — tu peux passer à la suite</p>' : ''}
    ${inputHTML}
    ${aiButtonsHTML}
  `;

  // Bind AI assist buttons
  if (showAiButtons) {
    const btnSuggest = document.getElementById('btnAiSuggest');
    const btnRefresh = document.getElementById('btnAiRefresh');
    if (btnSuggest) btnSuggest.addEventListener('click', () => requestAiSuggestion(q, 'suggest'));
    if (btnRefresh) btnRefresh.addEventListener('click', () => requestAiSuggestion(q, 'refresh'));
  }

  // Bind radio selection styling
  if (q.type === 'radio') {
    document.querySelectorAll('.option-item').forEach(item => {
      item.addEventListener('click', () => {
        document.querySelectorAll('.option-item').forEach(i => i.classList.remove('selected'));
        item.classList.add('selected');
        item.querySelector('input').checked = true;
      });
    });
  }

  // Update progress — show category progress, not total question count
  const progress = ((currentQuestion + 1) / questions.length) * 100;
  progressFill.style.width = `${progress}%`;
  categoryName.textContent = cat.name;
  questionProgress.textContent = `Étape ${q.catIdx + 1} de ${categories.length}`;

  // Update buttons
  btnPrev.disabled = currentQuestion === 0;
  btnNext.textContent = currentQuestion === questions.length - 1 ? 'Générer mon plan →' : 'Continuer →';

  // Update stepper + save label
  updateCategoryStepper();
  updateSaveLabel();

  // Focus input
  setTimeout(() => {
    const input = questionCard.querySelector('input[type="text"], input[type="email"], input[type="number"], input[type="url"], textarea');
    if (input) input.focus();
  }, 100);
}

// --- Save Answer ---
function saveCurrentAnswer() {
  const q = questions[currentQuestion];
  let value = '';

  if (q.type === 'radio') {
    const checked = questionCard.querySelector('input[type="radio"]:checked');
    value = checked ? checked.value : '';
  } else {
    const input = questionCard.querySelector('#answer');
    value = input ? input.value.trim() : '';
  }

  if (value) {
    answers[q.id] = value;
    // Persist to localStorage for cross-module data flow
    try { localStorage.setItem('bildop_questionnaire', JSON.stringify(answers)); } catch(e) {}
  }

  return value;
}

// --- Validate ---
function validateCurrent() {
  const q = questions[currentQuestion];
  const value = saveCurrentAnswer();

  if (q.required && !value) {
    // Shake animation
    questionCard.style.animation = 'shake 0.4s ease';
    setTimeout(() => { questionCard.style.animation = ''; }, 400);

    // Highlight input
    const input = questionCard.querySelector('#answer, input[type="text"], textarea, select');
    if (input) {
      input.style.borderColor = 'var(--danger)';
      setTimeout(() => { input.style.borderColor = ''; }, 2000);
    }
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
      showCompletion();
    }
  });

  btnPrev.addEventListener('click', () => {
    saveCurrentAnswer();
    if (currentQuestion > 0) {
      currentQuestion--;
      renderQuestion();
    }
  });

  // Keyboard navigation
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      const activeEl = document.activeElement;
      if (activeEl && activeEl.tagName === 'TEXTAREA') return; // Allow Enter in textarea
      e.preventDefault();
      btnNext.click();
    }
  });
}

// --- Completion Screen ---
function showCompletion() {
  saveCurrentAnswer();

  document.querySelector('.questionnaire__container').innerHTML = `
    <div class="question-card">
      <div class="completion-screen">
        <div class="completion-screen__icon">🎉</div>
        <h2>C'est tout! On a tout ce qu'il faut.</h2>
        <p>Notre IA va maintenant transformer ce que tu nous as partagé en un plan d'affaires complet et personnalisé.</p>

        <div style="background: rgba(0,193,255,0.08); border-radius: 12px; padding: 24px; margin: 32px 0; text-align: left;">
          <h3 style="margin-bottom: 12px;">📄 Ton plan va inclure :</h3>
          <ul style="list-style: none; line-height: 2;">
            <li>✅ Sommaire exécutif</li>
            <li>✅ Description de l'entreprise</li>
            <li>✅ Étude de marché personnalisée</li>
            <li>✅ Modèle d'affaires détaillé</li>
            <li>✅ Plan marketing</li>
            <li>✅ Projections financières 3 ans</li>
            <li>✅ Plan opérationnel</li>
            <li>✅ Analyse des risques</li>
          </ul>
        </div>

        <div style="margin-bottom: 32px;">
          <p style="color: var(--text-muted); font-size: 0.95rem;">⚡ Ton plan sera prêt <strong>en quelques secondes</strong></p>
        </div>

        <button class="btn btn--primary btn--large" onclick="submitQuestionnaire()">Générer mon plan d'affaires →</button>

        <p style="margin-top: 16px; font-size: 0.85rem; color: var(--text-muted);">
          En cliquant, tu seras redirigé vers le paiement sécurisé.
        </p>
      </div>
    </div>
  `;
}

// --- Submit → Generate Business Plan ---
function submitQuestionnaire() {
  // Save all answers to localStorage before redirecting
  try { localStorage.setItem('bildop_questionnaire', JSON.stringify(answers)); } catch(e) {}
  // Redirect to plan generation page
  window.location.href = 'plan-result.html';
}

// --- AI Suggestion ---
async function requestAiSuggestion(q, mode) {
  if (aiLoading) return;
  aiLoading = true;

  const statusEl = document.getElementById('aiStatus');
  const btnSuggest = document.getElementById('btnAiSuggest');
  const btnRefresh = document.getElementById('btnAiRefresh');
  const answerEl = questionCard.querySelector('#answer');

  if (!answerEl) { aiLoading = false; return; }

  // UI loading state
  if (statusEl) statusEl.textContent = 'Bildop reflechit...';
  if (btnSuggest) { btnSuggest.disabled = true; btnSuggest.style.opacity = '0.5'; }
  if (btnRefresh) { btnRefresh.disabled = true; btnRefresh.style.opacity = '0.5'; }

  // Build previous answers with question text for context
  const previousAnswers = {};
  for (const [id, answer] of Object.entries(answers)) {
    const matchQ = questions.find(qq => String(qq.id) === String(id));
    if (matchQ && answer) {
      previousAnswers[id] = {
        questionText: matchQ.question,
        answer: answer,
      };
    }
  }

  try {
    const response = await fetch(AI_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        question: q.question,
        hint: q.hint || '',
        questionId: q.id,
        previousAnswers,
        currentDraft: answerEl.value || answerEl.textContent || '',
        mode,
      }),
    });

    if (!response.ok) throw new Error('API error');

    const data = await response.json();
    if (data.suggestion) {
      // Insert suggestion into the field
      if (answerEl.tagName === 'TEXTAREA') {
        answerEl.value = data.suggestion;
        // Auto-resize textarea
        answerEl.style.height = 'auto';
        answerEl.style.height = answerEl.scrollHeight + 'px';
      } else {
        answerEl.value = data.suggestion;
      }

      // Save immediately
      answers[q.id] = data.suggestion;
      try { localStorage.setItem('bildop_questionnaire', JSON.stringify(answers)); } catch(e) {}

      // Show refresh button (user can now modify and refresh)
      if (btnRefresh) btnRefresh.style.display = 'inline-flex';
      if (statusEl) statusEl.textContent = 'Suggestion generee! Modifie-la a ta facon.';
      setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 4000);
    }
  } catch (err) {
    console.error('AI suggest error:', err);
    if (statusEl) statusEl.textContent = 'Erreur — reessaie dans un moment.';
    setTimeout(() => { if (statusEl) statusEl.textContent = ''; }, 3000);
  } finally {
    aiLoading = false;
    if (btnSuggest) { btnSuggest.disabled = false; btnSuggest.style.opacity = '1'; }
    if (btnRefresh) { btnRefresh.disabled = false; btnRefresh.style.opacity = '1'; }
  }
}

// --- Shake Animation + AI Button Styles ---
const style = document.createElement('style');
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-8px); }
    75% { transform: translateX(8px); }
  }
  .btn-ai {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    padding: 8px 16px;
    border: none;
    border-radius: 8px;
    font-size: 0.85rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s ease;
  }
  .btn-ai:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
  .btn-ai:active { transform: translateY(0); }
  .btn-ai:disabled { cursor: not-allowed; transform: none; }
  .btn-ai--suggest {
    background: linear-gradient(135deg, #00c1ff 0%, #0066ff 100%);
    color: white;
  }
  .btn-ai--refresh {
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
  }
  .btn-ai__icon { font-size: 1rem; }
`;
document.head.appendChild(style);

// --- Start ---
init();
