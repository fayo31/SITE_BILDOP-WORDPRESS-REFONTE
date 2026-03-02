/* ============================================
   BILDOP — Veille Compétitive
   Frontend UI + API-ready structure
   Backend: n8n workflow ou Supabase Edge Function
   ============================================ */

// --- Configuration ---
const VEILLE_CONFIG = {
  // Change this to your n8n webhook or Supabase Edge Function URL
  apiEndpoint: null, // e.g. 'https://your-n8n.app/webhook/veille' or 'https://xyz.supabase.co/functions/v1/veille'
  storageKey: 'bildop_veille',
  maxHistory: 10,
};

// --- Analysis Sections ---
const analysisSections = [
  { id: 'overview', name: 'Vue d\'ensemble', icon: '🏢', description: 'Résumé de l\'entreprise, secteur, positionnement' },
  { id: 'techstack', name: 'Stack technologique', icon: '⚙️', description: 'Technologies utilisées sur le site web' },
  { id: 'swot', name: 'Forces & Faiblesses', icon: '🎯', description: 'Analyse SWOT : forces, faiblesses, opportunités, menaces' },
  { id: 'marketing', name: 'Stratégie marketing', icon: '📣', description: 'Canaux, messaging, positionnement, SEO' },
  { id: 'pricing', name: 'Modèle de prix', icon: '💰', description: 'Structure tarifaire, segments visés, comparaison' },
  { id: 'opportunities', name: 'Opportunités', icon: '💡', description: 'Failles à exploiter, différenciation, recommandations' },
];

// --- ADN Reader (Module 1 data) ---
function getAdnData() {
  try {
    const raw = localStorage.getItem('bildop_questionnaire');
    if (!raw) return null;
    const answers = JSON.parse(raw);
    // Need at least company name and description to be useful
    if (!answers['1'] && !answers['2']) return null;
    return {
      nom: answers['1'] || '',
      description: answers['2'] || '',
      secteur: answers['3'] || '',
      localisation: answers['4'] || '',
      structure: answers['5'] || '',
      stade: answers['6'] || '',
      motivation: answers['8'] || '',
      mission: answers['9'] || '',
      vision: answers['10'] || '',
      clientIdeal: answers['11'] || '',
      problemeResolu: answers['12'] || '',
      concurrents: answers['13'] || '',
      differenciation: answers['14'] || '',
      tailleMarche: answers['15'] || '',
      croissanceMarche: answers['16'] || '',
      produitPrincipal: answers['21'] || '',
      prixVente: answers['24'] || '',
      modelRevenu: answers['31'] || '',
      canauxMarketing: answers['41'] || '',
      positionnementPrix: answers['50'] || '',
      presenceEnLigne: answers['43'] || '',
      objectifRevenus: answers['63'] || '',
      risques: answers['79'] || '',
      slogan: answers['46'] || '',
    };
  } catch(e) {
    return null;
  }
}

// --- State ---
let state = {
  view: 'intro', // intro | loading | results | error | history
  query: '',
  queryType: 'url', // url | name
  currentAnalysis: null,
  history: [],
  adnData: null, // Module 1 data if available
};

// --- Init ---
function init() {
  state.adnData = getAdnData();
  loadHistory();
  render();
  setupNavToggle();
}

function setupNavToggle() {
  const toggle = document.getElementById('navToggle');
  const links = document.getElementById('navLinks');
  if (toggle && links) {
    toggle.addEventListener('click', () => {
      links.classList.toggle('nav__links--open');
      toggle.classList.toggle('nav__toggle--active');
    });
  }
}

function loadHistory() {
  try {
    const saved = localStorage.getItem(VEILLE_CONFIG.storageKey);
    if (saved) state.history = JSON.parse(saved);
  } catch(e) {}
}

function saveHistory() {
  try {
    localStorage.setItem(VEILLE_CONFIG.storageKey, JSON.stringify(state.history.slice(0, VEILLE_CONFIG.maxHistory)));
  } catch(e) {}
}

// --- Main Render ---
function render() {
  const app = document.getElementById('veilleApp');
  if (!app) return;

  switch(state.view) {
    case 'intro': app.innerHTML = renderIntro(); break;
    case 'loading': app.innerHTML = renderLoading(); break;
    case 'results': app.innerHTML = renderResults(); break;
    case 'error': app.innerHTML = renderError(); break;
    case 'history': app.innerHTML = renderHistory(); break;
  }

  attachEvents();
}

// --- Intro View ---
function renderIntro() {
  const hasHistory = state.history.length > 0;

  return `
    <div class="veille-intro">
      <div class="veille-intro__header">
        <div class="veille-intro__icon">🔍</div>
        <h1>Veille Compétitive</h1>
        <p>Entre le site web ou le nom d'un compétiteur.<br>Notre IA analyse tout en quelques secondes.</p>
      </div>

      <div class="veille-search">
        <div class="veille-search__tabs">
          <button class="veille-search__tab ${state.queryType === 'url' ? 'veille-search__tab--active' : ''}" data-type="url">🌐 Site web (URL)</button>
          <button class="veille-search__tab ${state.queryType === 'name' ? 'veille-search__tab--active' : ''}" data-type="name">🏢 Nom d'entreprise</button>
        </div>
        <div class="veille-search__input-wrap">
          <input
            type="${state.queryType === 'url' ? 'url' : 'text'}"
            id="veilleInput"
            class="veille-search__input"
            placeholder="${state.queryType === 'url' ? 'https://competiteur.com' : 'Nom de l\'entreprise'}"
            value="${state.query}"
            autocomplete="off"
          />
          <button class="veille-search__btn" id="veilleSubmit">
            Analyser →
          </button>
        </div>
        <p class="veille-search__hint">
          ${state.queryType === 'url'
            ? 'Entre l\'URL complète du site web de ton compétiteur'
            : 'Entre le nom de l\'entreprise — on va la trouver'}
        </p>
      </div>

      ${state.adnData ? `
        <div class="veille-adn-banner">
          <div class="veille-adn-banner__icon">🧬</div>
          <div>
            <strong>ADN détecté : ${escapeHtml(state.adnData.nom)}</strong>
            <p>Ton plan d'affaires est connecté. L'analyse va comparer ton projet avec le compétiteur — positionnement, prix, marché, différenciation.</p>
          </div>
        </div>
      ` : `
        <div class="veille-adn-banner veille-adn-banner--empty">
          <div class="veille-adn-banner__icon">💡</div>
          <div>
            <strong>Connecte ton ADN pour une analyse personnalisée</strong>
            <p><a href="questionnaire.html">Remplis le Module 1</a> et reviens ici — on comparera automatiquement ton projet avec la compétition.</p>
          </div>
        </div>
      `}

      <div class="veille-intro__features">
        ${analysisSections.map(s => `
          <div class="veille-feature-card">
            <span class="veille-feature-card__icon">${s.icon}</span>
            <div>
              <strong>${s.name}</strong>
              <p>${s.description}</p>
            </div>
          </div>
        `).join('')}
      </div>

      ${hasHistory ? `
        <div class="veille-intro__history-link">
          <button class="veille-link-btn" id="showHistory">📂 Voir mes analyses précédentes (${state.history.length})</button>
        </div>
      ` : ''}
    </div>
  `;
}

// --- Loading View ---
function renderLoading() {
  const steps = [
    { icon: '🌐', text: 'Connexion au site web...' },
    { icon: '⚙️', text: 'Détection des technologies...' },
    { icon: '📊', text: 'Analyse du positionnement...' },
    { icon: '🎯', text: 'Identification des forces/faiblesses...' },
    { icon: '💡', text: 'Génération des recommandations...' },
  ];

  return `
    <div class="veille-loading">
      <div class="veille-loading__header">
        <div class="veille-loading__spinner"></div>
        <h2>Analyse en cours...</h2>
        <p class="veille-loading__query">${escapeHtml(state.query)}</p>
      </div>
      <div class="veille-loading__steps">
        ${steps.map((s, i) => `
          <div class="veille-loading__step veille-loading__step--${i < 3 ? 'done' : i === 3 ? 'active' : 'pending'}">
            <span class="veille-loading__step-icon">${s.icon}</span>
            <span>${s.text}</span>
            <span class="veille-loading__step-status">${i < 3 ? '✅' : i === 3 ? '⏳' : '⏸'}</span>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

// --- Results View ---
function renderResults() {
  const a = state.currentAnalysis;
  if (!a) return '<p>Aucune analyse.</p>';

  return `
    <div class="veille-results">
      <div class="veille-results__header">
        <div>
          <h1>${escapeHtml(a.companyName)}</h1>
          <p class="veille-results__url">${a.url ? escapeHtml(a.url) : ''}</p>
          <p class="veille-results__date">Analysé le ${new Date(a.timestamp).toLocaleDateString('fr-CA')}</p>
        </div>
        <div class="veille-results__actions">
          <button class="btn btn--secondary veille-btn-small" id="newAnalysis">← Nouvelle analyse</button>
        </div>
      </div>

      <!-- Score global -->
      <div class="veille-score-bar">
        <div class="veille-score-bar__label">
          <span>Score compétitif</span>
          <strong>${a.globalScore}/100</strong>
        </div>
        <div class="veille-score-bar__track">
          <div class="veille-score-bar__fill" style="width: ${a.globalScore}%; background: ${getScoreColor(a.globalScore)};"></div>
        </div>
        <p class="veille-score-bar__verdict">${getScoreVerdict(a.globalScore)}</p>
      </div>

      <!-- ADN Comparison -->
      ${state.adnData ? renderAdnComparison(a) : ''}

      <!-- Sections tabs -->
      <div class="veille-tabs">
        ${analysisSections.map((s, i) => `
          <button class="veille-tabs__tab ${i === 0 ? 'veille-tabs__tab--active' : ''}" data-section="${s.id}">
            ${s.icon} ${s.name}
          </button>
        `).join('')}
      </div>

      <!-- Section contents -->
      <div class="veille-section-content" id="veilleSectionContent">
        ${renderSectionContent('overview', a)}
      </div>

      <!-- SWOT Visual (always visible) -->
      <div class="veille-swot">
        <h3>🎯 Analyse SWOT</h3>
        <div class="veille-swot__grid">
          <div class="veille-swot__card veille-swot__card--forces">
            <h4>Forces</h4>
            <ul>${a.swot.forces.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
          </div>
          <div class="veille-swot__card veille-swot__card--faiblesses">
            <h4>Faiblesses</h4>
            <ul>${a.swot.faiblesses.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
          </div>
          <div class="veille-swot__card veille-swot__card--opportunites">
            <h4>Opportunités</h4>
            <ul>${a.swot.opportunites.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
          </div>
          <div class="veille-swot__card veille-swot__card--menaces">
            <h4>Menaces</h4>
            <ul>${a.swot.menaces.map(f => `<li>${escapeHtml(f)}</li>`).join('')}</ul>
          </div>
        </div>
      </div>

      <!-- Recommendations -->
      <div class="veille-recommendations">
        <h3>💡 Recommandations stratégiques</h3>
        <div class="veille-recommendations__list">
          ${a.recommendations.map((r, i) => `
            <div class="veille-recommendation">
              <div class="veille-recommendation__number">${i + 1}</div>
              <div>
                <strong>${escapeHtml(r.title)}</strong>
                <p>${escapeHtml(r.description)}</p>
                <span class="veille-recommendation__priority veille-recommendation__priority--${r.priority}">${r.priority === 'haute' ? '🔴 Haute priorité' : r.priority === 'moyenne' ? '🟠 Moyenne' : '🟢 Quick win'}</span>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

// --- ADN vs Competitor Comparison ---
function renderAdnComparison(analysis) {
  const adn = state.adnData;
  if (!adn) return '';

  const comparisons = generateComparisons(adn, analysis);

  return `
    <div class="veille-comparison">
      <div class="veille-comparison__header">
        <h3>🧬 Ton ADN vs ${escapeHtml(analysis.companyName)}</h3>
        <p>Comparaison directe entre ton projet et ce compétiteur</p>
      </div>

      <!-- Side by side cards -->
      <div class="veille-comparison__versus">
        <div class="veille-comparison__card veille-comparison__card--adn">
          <div class="veille-comparison__card-badge">🧬 Ton projet</div>
          <h4>${escapeHtml(adn.nom || 'Mon projet')}</h4>
          <p>${escapeHtml(adn.description || '')}</p>
          <ul>
            <li><strong>Secteur :</strong> ${escapeHtml(adn.secteur || 'Non défini')}</li>
            <li><strong>Marché :</strong> ${escapeHtml(adn.localisation || 'Non défini')}</li>
            <li><strong>Client cible :</strong> ${escapeHtml(truncate(adn.clientIdeal, 80) || 'Non défini')}</li>
            <li><strong>Prix :</strong> ${escapeHtml(adn.prixVente || 'Non défini')}</li>
            <li><strong>Différenciation :</strong> ${escapeHtml(truncate(adn.differenciation, 80) || 'Non défini')}</li>
          </ul>
        </div>
        <div class="veille-comparison__vs">VS</div>
        <div class="veille-comparison__card veille-comparison__card--competitor">
          <div class="veille-comparison__card-badge">🏢 Compétiteur</div>
          <h4>${escapeHtml(analysis.companyName)}</h4>
          <p>${analysis.url ? escapeHtml(analysis.url) : 'Analyse en cours'}</p>
          <ul>
            <li><strong>Secteur :</strong> ${escapeHtml(analysis.sections.overview?.[1]?.value || 'N/A')}</li>
            <li><strong>Marché :</strong> ${escapeHtml(analysis.sections.overview?.[2]?.value || 'N/A')}</li>
            <li><strong>Client cible :</strong> ${escapeHtml(analysis.sections.pricing?.[5]?.value || 'N/A')}</li>
            <li><strong>Prix :</strong> ${escapeHtml(analysis.sections.pricing?.[1]?.value || 'N/A')} — ${escapeHtml(analysis.sections.pricing?.[3]?.value || 'N/A')}</li>
            <li><strong>Modèle :</strong> ${escapeHtml(analysis.sections.pricing?.[0]?.value || 'N/A')}</li>
          </ul>
        </div>
      </div>

      <!-- Strategic comparison grid -->
      <div class="veille-comparison__grid">
        ${comparisons.map(c => `
          <div class="veille-comparison__item veille-comparison__item--${c.verdict}">
            <div class="veille-comparison__item-icon">${c.icon}</div>
            <div class="veille-comparison__item-content">
              <strong>${escapeHtml(c.dimension)}</strong>
              <p>${escapeHtml(c.insight)}</p>
            </div>
            <div class="veille-comparison__item-verdict">
              ${c.verdict === 'avantage' ? '✅ Ton avantage' : c.verdict === 'attention' ? '⚠️ Attention' : '🔄 Similaire'}
            </div>
          </div>
        `).join('')}
      </div>

      <!-- CEO Suggestions -->
      <div class="veille-ceo">
        <h4>🎯 Insights CEO — Ce que ça veut dire pour toi</h4>
        <div class="veille-ceo__suggestions">
          ${generateCeoSuggestions(adn, analysis).map(s => `
            <div class="veille-ceo__suggestion">
              <div class="veille-ceo__suggestion-icon">${s.icon}</div>
              <div>
                <strong>${escapeHtml(s.title)}</strong>
                <p>${escapeHtml(s.text)}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </div>
    </div>
  `;
}

function generateComparisons(adn, analysis) {
  const items = [];

  // Market positioning
  const adnPrix = adn.positionnementPrix || '';
  items.push({
    icon: '💰',
    dimension: 'Positionnement prix',
    insight: adnPrix.includes('premium') || adnPrix.includes('Plus haut')
      ? `Tu vises le premium. Le compétiteur est sur ${analysis.sections.pricing?.[1]?.value || 'un modèle standard'}. Tu peux justifier ton prix par la valeur ajoutée.`
      : `Tu es positionné compétitif. Assure-toi que ta proposition de valeur est claire pour te différencier autrement que par le prix.`,
    verdict: adnPrix.includes('premium') || adnPrix.includes('Plus haut') ? 'avantage' : 'similaire',
  });

  // Market coverage
  items.push({
    icon: '🌍',
    dimension: 'Couverture marché',
    insight: adn.localisation
      ? `Ton marché : ${adn.localisation}. Le compétiteur cible "${analysis.sections.overview?.[2]?.value || 'un marché large'}". ${adn.localisation.toLowerCase().includes('ligne') ? 'Ton modèle en ligne te donne un avantage de scalabilité.' : 'Ta connaissance locale est un avantage.'}`
      : 'Définis ton marché cible pour mieux comparer.',
    verdict: adn.localisation ? 'avantage' : 'attention',
  });

  // Differentiation
  items.push({
    icon: '⚡',
    dimension: 'Différenciation',
    insight: adn.differenciation
      ? `Ta différenciation : "${truncate(adn.differenciation, 60)}". Vérifie que le compétiteur ne revendique pas la même chose.`
      : 'Tu n\'as pas encore défini ta différenciation. C\'est critique face à ce compétiteur.',
    verdict: adn.differenciation ? 'avantage' : 'attention',
  });

  // Digital presence
  const presence = adn.presenceEnLigne || '';
  items.push({
    icon: '🌐',
    dimension: 'Présence digitale',
    insight: presence.includes('site web + réseaux') || presence.includes('Oui —')
      ? `Tu as déjà une présence en ligne. Le compétiteur aussi. La bataille se joue sur le contenu et l'expérience.`
      : `Le compétiteur a une présence en ligne établie. Tu dois rattraper rapidement pour ne pas être invisible.`,
    verdict: presence.includes('site web') ? 'similaire' : 'attention',
  });

  // Client knowledge
  items.push({
    icon: '👥',
    dimension: 'Connaissance client',
    insight: adn.clientIdeal
      ? `Tu connais ton client idéal : "${truncate(adn.clientIdeal, 50)}". C'est un avantage — tu peux cibler plus précisément que le compétiteur.`
      : 'Tu n\'as pas défini ton client idéal. Le compétiteur cible déjà un segment précis.',
    verdict: adn.clientIdeal ? 'avantage' : 'attention',
  });

  // Revenue model
  items.push({
    icon: '💵',
    dimension: 'Modèle de revenus',
    insight: adn.modelRevenu
      ? `Ton modèle : "${truncate(adn.modelRevenu, 60)}". Compare avec le "${analysis.sections.pricing?.[0]?.value || 'modèle du compétiteur'}" pour voir si tu peux offrir plus de flexibilité.`
      : 'Définis ton modèle de revenus pour comparer ta stratégie de monétisation.',
    verdict: adn.modelRevenu ? 'similaire' : 'attention',
  });

  return items;
}

function generateCeoSuggestions(adn, analysis) {
  const suggestions = [];

  // Suggestion 1: Based on differentiation
  if (adn.differenciation) {
    suggestions.push({
      icon: '🎯',
      title: 'Double down sur ta différenciation',
      text: `"${truncate(adn.differenciation, 60)}" — c'est ton arme. Assure-toi que chaque point de contact client (site, pitch, réseaux) communique cet avantage clairement. Le compétiteur ne l'a pas.`,
    });
  } else {
    suggestions.push({
      icon: '🚨',
      title: 'Urgence : Définis ta différenciation',
      text: `Sans différenciation claire, tu te bats sur le prix — et le compétiteur a une longueur d'avance. Retourne dans ton plan d'affaires et cristallise ce qui te rend unique.`,
    });
  }

  // Suggestion 2: Based on market
  if (adn.localisation && !adn.localisation.toLowerCase().includes('ligne')) {
    suggestions.push({
      icon: '📍',
      title: 'Exploite ton ancrage local',
      text: `Tu es à ${adn.localisation}. Le compétiteur opère probablement de façon plus générique. Ton réseau local, ta compréhension du marché québécois et ta proximité client sont des avantages impossibles à copier.`,
    });
  }

  // Suggestion 3: Based on problem solved
  if (adn.problemeResolu) {
    suggestions.push({
      icon: '💡',
      title: 'Reformule ton problème en urgence',
      text: `Tu résous : "${truncate(adn.problemeResolu, 50)}". Si le compétiteur adresse le même problème, transforme ton message — passe de "on fait X" à "on élimine Y en Z temps". L'urgence vend mieux que la feature.`,
    });
  }

  // Suggestion 4: Pricing strategy
  suggestions.push({
    icon: '💰',
    title: 'Stratégie de prix offensive',
    text: `Le compétiteur charge ${analysis.sections.pricing?.[1]?.value || 'un prix standard'}. ${adn.prixVente ? `Toi, tu es à ${adn.prixVente}.` : ''} Considère un modèle freemium ou un essai gratuit pour voler ses clients insatisfaits.`,
  });

  // Suggestion 5: Weaknesses to exploit
  if (analysis.swot?.faiblesses?.length > 0) {
    suggestions.push({
      icon: '🏹',
      title: 'Attaque leurs faiblesses',
      text: `Leur plus grosse faiblesse : "${analysis.swot.faiblesses[0]}". Fais-en ton argument de vente #1. Montre aux clients ce que TOI tu fais mieux, concrètement.`,
    });
  }

  return suggestions;
}

function truncate(str, max) {
  if (!str) return '';
  return str.length > max ? str.substring(0, max) + '...' : str;
}

function renderSectionContent(sectionId, analysis) {
  const data = analysis.sections[sectionId];
  if (!data) return '<p>Section non disponible.</p>';

  return `
    <div class="veille-section">
      ${data.map(item => `
        <div class="veille-section__item">
          <div class="veille-section__item-label">${escapeHtml(item.label)}</div>
          <div class="veille-section__item-value">${escapeHtml(item.value)}</div>
        </div>
      `).join('')}
    </div>
  `;
}

// --- Error View ---
function renderError() {
  return `
    <div class="veille-error">
      <div class="veille-error__icon">⚠️</div>
      <h2>Impossible d'analyser</h2>
      <p>On n'a pas pu accéder au site ou trouver l'entreprise. Vérifie l'URL ou le nom et réessaie.</p>
      <button class="btn btn--primary" id="retryAnalysis">Réessayer →</button>
    </div>
  `;
}

// --- History View ---
function renderHistory() {
  return `
    <div class="veille-history">
      <div class="veille-history__header">
        <h2>📂 Mes analyses</h2>
        <button class="veille-link-btn" id="backToIntro">← Retour</button>
      </div>
      ${state.history.length === 0 ? '<p>Aucune analyse sauvegardée.</p>' : `
        <div class="veille-history__list">
          ${state.history.map((h, i) => `
            <div class="veille-history__item" data-index="${i}">
              <div class="veille-history__item-info">
                <strong>${escapeHtml(h.companyName)}</strong>
                <span>${h.url ? escapeHtml(h.url) : ''}</span>
                <span class="veille-history__date">${new Date(h.timestamp).toLocaleDateString('fr-CA')}</span>
              </div>
              <div class="veille-history__item-score">
                <span class="veille-score-badge" style="background: ${getScoreColor(h.globalScore)}">${h.globalScore}/100</span>
              </div>
            </div>
          `).join('')}
        </div>
      `}
    </div>
  `;
}

// --- Event Handlers ---
function attachEvents() {
  // Search tabs
  document.querySelectorAll('.veille-search__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.queryType = tab.dataset.type;
      render();
      document.getElementById('veilleInput')?.focus();
    });
  });

  // Submit
  const submitBtn = document.getElementById('veilleSubmit');
  const input = document.getElementById('veilleInput');
  if (submitBtn) {
    submitBtn.addEventListener('click', handleSubmit);
  }
  if (input) {
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleSubmit();
    });
    input.addEventListener('input', (e) => {
      state.query = e.target.value;
    });
  }

  // New analysis
  const newBtn = document.getElementById('newAnalysis');
  if (newBtn) newBtn.addEventListener('click', () => {
    state.view = 'intro';
    state.query = '';
    state.currentAnalysis = null;
    render();
  });

  // Retry
  const retryBtn = document.getElementById('retryAnalysis');
  if (retryBtn) retryBtn.addEventListener('click', () => {
    state.view = 'intro';
    render();
  });

  // History
  const historyBtn = document.getElementById('showHistory');
  if (historyBtn) historyBtn.addEventListener('click', () => {
    state.view = 'history';
    render();
  });

  const backBtn = document.getElementById('backToIntro');
  if (backBtn) backBtn.addEventListener('click', () => {
    state.view = 'intro';
    render();
  });

  // History items
  document.querySelectorAll('.veille-history__item').forEach(item => {
    item.addEventListener('click', () => {
      const idx = parseInt(item.dataset.index);
      state.currentAnalysis = state.history[idx];
      state.view = 'results';
      render();
    });
  });

  // Result tabs
  document.querySelectorAll('.veille-tabs__tab').forEach(tab => {
    tab.addEventListener('click', () => {
      document.querySelectorAll('.veille-tabs__tab').forEach(t => t.classList.remove('veille-tabs__tab--active'));
      tab.classList.add('veille-tabs__tab--active');
      const content = document.getElementById('veilleSectionContent');
      if (content && state.currentAnalysis) {
        content.innerHTML = renderSectionContent(tab.dataset.section, state.currentAnalysis);
      }
    });
  });
}

// --- Submit Handler ---
async function handleSubmit() {
  const input = document.getElementById('veilleInput');
  const query = (input?.value || '').trim();

  if (!query) {
    input?.focus();
    return;
  }

  state.query = query;
  state.view = 'loading';
  render();

  try {
    const analysis = await fetchAnalysis(query, state.queryType);
    state.currentAnalysis = analysis;

    // Save to history
    state.history.unshift(analysis);
    if (state.history.length > VEILLE_CONFIG.maxHistory) state.history.pop();
    saveHistory();

    state.view = 'results';
  } catch(err) {
    console.error('Veille analysis error:', err);
    state.view = 'error';
  }

  render();
}

// --- API Call ---
async function fetchAnalysis(query, type) {
  // If API endpoint is configured, use it
  if (VEILLE_CONFIG.apiEndpoint) {
    const resp = await fetch(VEILLE_CONFIG.apiEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ query, type }),
    });

    if (!resp.ok) throw new Error(`API error: ${resp.status}`);
    return await resp.json();
  }

  // Fallback: demo mode with simulated analysis
  return generateDemoAnalysis(query, type);
}

// --- Demo Analysis Generator ---
// This generates realistic-looking demo data.
// Replace with real API call when backend is ready.
function generateDemoAnalysis(query, type) {
  return new Promise((resolve) => {
    // Simulate API delay
    setTimeout(() => {
      const isUrl = type === 'url';
      const companyName = isUrl ? extractDomainName(query) : query;
      const url = isUrl ? query : null;

      resolve({
        companyName: companyName,
        url: url,
        globalScore: Math.floor(Math.random() * 40) + 45, // 45-85
        timestamp: Date.now(),
        sections: {
          overview: [
            { label: 'Entreprise', value: companyName },
            { label: 'Secteur', value: 'À déterminer par l\'analyse backend' },
            { label: 'Marché cible', value: 'PME et entrepreneurs' },
            { label: 'Présence en ligne', value: url || 'Non disponible' },
            { label: 'Réseaux sociaux', value: 'LinkedIn, Facebook, Instagram' },
            { label: 'Maturité digitale', value: 'Intermédiaire' },
          ],
          techstack: [
            { label: 'CMS / Framework', value: 'WordPress / Shopify / Custom' },
            { label: 'Hébergement', value: 'Cloudflare, AWS' },
            { label: 'Analytics', value: 'Google Analytics 4' },
            { label: 'CRM', value: 'HubSpot / Salesforce' },
            { label: 'Paiement', value: 'Stripe / Square' },
            { label: 'Email marketing', value: 'Mailchimp / Klaviyo' },
          ],
          marketing: [
            { label: 'Positionnement', value: 'Prix compétitif, service local' },
            { label: 'Message principal', value: 'À extraire du site web' },
            { label: 'SEO Score', value: 'Moyen — opportunités d\'amélioration' },
            { label: 'Publicité payante', value: 'Google Ads actif, Facebook Ads' },
            { label: 'Content marketing', value: 'Blog actif, 2-3 posts/mois' },
            { label: 'Réseaux sociaux', value: '2-5k followers, engagement moyen' },
          ],
          pricing: [
            { label: 'Modèle', value: 'Abonnement mensuel + achat unique' },
            { label: 'Entrée de gamme', value: '29$/mois' },
            { label: 'Milieu de gamme', value: '99$/mois' },
            { label: 'Premium', value: '299$/mois' },
            { label: 'Essai gratuit', value: 'Oui — 14 jours' },
            { label: 'Segment visé', value: 'PME et travailleurs autonomes' },
          ],
          opportunities: [
            { label: 'Faille #1', value: 'Expérience mobile faible — opportunité de différenciation' },
            { label: 'Faille #2', value: 'Pas de contenu francophone — marché québécois ouvert' },
            { label: 'Faille #3', value: 'Service client lent — 48h de délai moyen' },
            { label: 'Différenciation possible', value: 'IA intégrée, support en temps réel, bilingue' },
            { label: 'Marché non adressé', value: 'Solopreneurs et micro-entreprises' },
            { label: 'Partenariat potentiel', value: 'Chambres de commerce, incubateurs' },
          ],
        },
        swot: {
          forces: [
            'Marque établie et reconnue dans le marché',
            'Bon référencement SEO sur les mots-clés principaux',
            'Pricing compétitif avec essai gratuit',
            'Présence active sur les réseaux sociaux',
          ],
          faiblesses: [
            'Site web pas optimisé pour mobile',
            'Pas de contenu en français',
            'Service client lent (48h+ de délai)',
            'Pas d\'intégration IA visible',
          ],
          opportunites: [
            'Marché québécois francophone sous-exploité',
            'Demande croissante pour les outils IA',
            'Partenariats avec organismes de soutien aux entrepreneurs',
            'Segment solopreneurs en croissance',
          ],
          menaces: [
            'Nouveaux entrants avec financement VC',
            'Consolidation du marché (acquisitions)',
            'Évolution rapide des attentes technologiques',
            'Réglementation potentielle sur l\'IA',
          ],
        },
        recommendations: [
          {
            title: 'Exploite le marché francophone',
            description: 'Ton compétiteur n\'a pas de version française. Tu peux capturer tout le marché québécois en offrant une expérience native en français.',
            priority: 'haute',
          },
          {
            title: 'Mise sur l\'IA comme différenciateur',
            description: 'Aucun signe d\'IA dans leur produit. Ton avantage technologique est réel — mets-le de l\'avant dans ton marketing.',
            priority: 'haute',
          },
          {
            title: 'Offre un support plus rapide',
            description: 'Leur délai moyen est de 48h. Un chat en temps réel ou un délai de 2h te positionne comme le choix premium.',
            priority: 'moyenne',
          },
          {
            title: 'Cible les solopreneurs',
            description: 'Ils visent les PME de 10+ employés. Les solopreneurs et micro-entreprises sont un segment sous-exploité avec un fort volume.',
            priority: 'basse',
          },
          {
            title: 'Partenariats stratégiques',
            description: 'SADC, CLD, chambres de commerce — ces organismes réfèrent des entrepreneurs qui ont besoin exactement de ce que tu offres.',
            priority: 'moyenne',
          },
        ],
      });
    }, 3000); // 3 second simulated delay
  });
}

// --- Helpers ---
function extractDomainName(url) {
  try {
    const u = new URL(url.startsWith('http') ? url : 'https://' + url);
    let host = u.hostname.replace('www.', '');
    // Capitalize first letter of each part
    return host.split('.')[0].charAt(0).toUpperCase() + host.split('.')[0].slice(1);
  } catch {
    return url;
  }
}

function escapeHtml(str) {
  if (!str) return '';
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

function getScoreColor(score) {
  if (score >= 70) return '#28a745';
  if (score >= 40) return '#f4a261';
  return '#e63946';
}

function getScoreVerdict(score) {
  if (score >= 80) return '🟢 Compétiteur très fort — différenciation critique';
  if (score >= 60) return '🟠 Compétiteur solide — des failles à exploiter';
  if (score >= 40) return '🟡 Compétiteur moyen — plusieurs opportunités';
  return '🔴 Compétiteur faible — marché ouvert pour toi';
}

// --- Start ---
document.addEventListener('DOMContentLoaded', init);
