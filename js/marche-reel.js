/* ============================================
   BILDOP — Module 7 : Étude de marché temps réel
   Sources simulées : Stats Canada · REQ · Google Trends · BDC
   Prêt pour intégration API réelle (n8n + Supabase Edge Functions)
   ============================================ */

const MR = {
  niche: '',
  secteurKey: 'default',
  completedSteps: new Set(),
  data: { taille: null, tendances: null, benchmark: null, densite: null }
};

// --- Profils sectoriels ---
const SECTEURS = {
  soin: {
    keys: ['soin', 'domicile', 'aide', 'infirm', 'médic', 'santé', 'bcs', 'prepos'],
    label: 'Soins à domicile / Services de santé',
    scian: '6216 — Services de soins infirmiers et de soins personnels à domicile',
    taille: {
      tam: '4.2 Mrd $', tam_desc: 'Marché total soins à domicile Canada',
      sam: '890 M $', sam_desc: 'Marché adressable Québec',
      som: '12-35 M $', som_desc: 'Part capturable réalistement (1-4%)',
      cagr: '+7.8%', cagr_desc: 'Croissance annuelle composée 2024-2029',
      source: 'Stats Canada · MSSS · RAMQ',
      regions: [
        { name: 'Grand Montréal', val: 42, pct: 42 },
        { name: 'Québec (ville)', val: 18, pct: 18 },
        { name: 'Rive-Sud MTL', val: 14, pct: 14 },
        { name: 'Laval', val: 9, pct: 9 },
        { name: 'Régions', val: 17, pct: 17 },
      ],
      insight: 'Le vieillissement de la population québécoise crée une demande structurelle : 1 Québécois sur 5 aura 65 ans ou plus en 2031 (ISQ). La pénurie de main-d\'œuvre en établissement pousse vers les soins à domicile. Le marché est en croissance de ~8% par an, soutenu par les politiques gouvernementales de maintien à domicile.'
    },
    tendances: {
      volume: '+185%', volume_desc: 'Croissance recherches 12 mois',
      peak: 'Jan-Mars', peak_desc: 'Période de pic (hiver QC)',
      trend: 'Hausse forte', trend_class: 'up',
      sparkline: [35, 42, 48, 55, 60, 58, 62, 70, 75, 82, 88, 95],
      keywords: [
        { kw: 'aide à domicile Longueuil', vol: '1 900/mois', trend: '+42%', level: 'Élevé' },
        { kw: 'soins infirmiers domicile Montréal', vol: '2 400/mois', trend: '+67%', level: 'Très élevé' },
        { kw: 'préposé aux bénéficiaires Rive-Sud', vol: '880/mois', trend: '+28%', level: 'Moyen' },
        { kw: 'agence soin à domicile Québec', vol: '3 200/mois', trend: '+91%', level: 'Très élevé' },
        { kw: 'aide personnes âgées maison', vol: '5 400/mois', trend: '+120%', level: 'Très élevé' },
      ],
      insight: 'La recherche "aide à domicile" a augmenté de 185% au QC en 12 mois. Le pic hivernal (jan-mars) correspond aux sorties d\'hôpital. Les recherches mobiles dominent à 74% — ton site DOIT être optimisé mobile en priorité absolue.'
    },
    benchmark: {
      margeB: '18-28%', margeB_desc: 'Marge brute typique',
      margeN: '8-14%', margeN_desc: 'Marge nette moyenne secteur',
      revEmp: '52 000 $', revEmp_desc: 'Revenu/employé/an moyen QC',
      seuil: '15-25 clients', seuil_desc: 'Seuil de rentabilité typique',
      source: 'BDC · Desjardins · FCEI',
      prices: [
        { segment: 'Aide à domicile (AVQ)', min: '22$', max: '32$', unit: '/heure', note: 'Taux marché QC 2026' },
        { segment: 'Soins infirmiers', min: '45$', max: '85$', unit: '/visite', note: 'Selon actes' },
        { segment: 'Répit/gardiennage', min: '18$', max: '28$', unit: '/heure', note: 'Taux CHSLD privé' },
        { segment: 'Accompagnement médical', min: '35$', max: '55$', unit: '/heure', note: 'Transport inclus' },
      ],
      ratios: [
        { name: 'Marge brute', val: 23, color: 'teal' },
        { name: 'Charges salariales', val: 68, color: 'navy' },
        { name: 'Frais admin', val: 12, color: 'amber' },
        { name: 'Marge nette', val: 11, color: 'emerald' },
      ],
      insight: 'Le ratio charges salariales est le nerf de la guerre dans ce secteur (65-72% des revenus). Les entreprises les plus profitables ont un taux d\'utilisation des employés > 80% et facturent des services à valeur ajoutée (soins infirmiers, accompagnement spécialisé) en plus des AVQ de base.'
    },
    densite: {
      total: '4 200+', total_desc: 'Entreprises actives QC (REQ)',
      growth: '+340', growth_desc: 'Nouvelles entreprises en 2025',
      ratio: '1 / 2 100', ratio_desc: 'Ratio entreprise / habitant QC',
      opportunity: 'Modérée', opp_class: 'amber',
      regions: [
        { name: 'Île de Montréal', nb: 1240, saturation: 72, class: 'rose' },
        { name: 'Rive-Sud (Longueuil)', nb: 420, saturation: 45, class: 'amber' },
        { name: 'Laval', nb: 380, saturation: 58, class: 'amber' },
        { name: 'Québec (ville)', nb: 510, saturation: 55, class: 'amber' },
        { name: 'Laurentides', nb: 290, saturation: 32, class: 'teal' },
        { name: 'Lanaudière', nb: 210, saturation: 28, class: 'teal' },
      ],
      opportunities: [
        { zone: '🟢 Laurentides / Lanaudière', desc: 'Saturation < 35% — croissance démographique forte — peu d\'acteurs structurés' },
        { zone: '🟢 Montérégie Est (Granby, St-Hyacinthe)', desc: 'Population vieillissante, manque d\'offre structurée, coûts immobiliers bas' },
        { zone: '🟡 Rive-Sud (Longueuil, Brossard)', desc: 'Saturation modérée — différenciation possible par spécialisation (Alzheimer, post-chirurgie)' },
      ],
      insight: 'La Rive-Sud (Brossard/Saint-Hubert) affiche 45% de saturation — c\'est une fenêtre. La différenciation par spécialisation (Alzheimer, soins post-opératoires, répit proche aidant) permet de dominer une niche sans affronter les généralistes sur le prix.'
    }
  },

  coaching: {
    keys: ['coaching', 'formation', 'cours', 'accompagnement', 'mentorat', 'consultant'],
    label: 'Coaching / Formation / Consultation',
    scian: '6116 — Autres écoles et instruction',
    taille: {
      tam: '8.4 Mrd $', tam_desc: 'Marché formation & coaching Canada',
      sam: '1.2 Mrd $', sam_desc: 'Marché adressable Québec',
      som: '500 K$ - 5 M$', som_desc: 'Part capturable réalistement',
      cagr: '+12.4%', cagr_desc: 'Croissance annuelle composée',
      source: 'Stats Canada · OCDE · eLearning Industry',
      regions: [
        { name: 'Grand Montréal', val: 52, pct: 52 },
        { name: 'Québec (ville)', val: 20, pct: 20 },
        { name: 'Régions', val: 28, pct: 28 },
      ],
      insight: 'Le coaching B2B (entreprises) représente 65% des revenus du secteur mais seulement 20% des acteurs s\'y positionnent. La spécialisation sectorielle (leadership, vente, gestion RH) multiplie les tarifs par 2-3x vs coaching généraliste.'
    },
    tendances: {
      volume: '+280%', volume_desc: 'Croissance recherches 12 mois',
      peak: 'Sept-Nov', peak_desc: 'Rentrée + fin d\'année fiscale',
      trend: 'Hausse forte', trend_class: 'up',
      sparkline: [50, 55, 48, 52, 60, 65, 70, 68, 85, 90, 95, 88],
      keywords: [
        { kw: 'coach d\'affaires Montréal', vol: '3 100/mois', trend: '+88%', level: 'Très élevé' },
        { kw: 'formation leadership entreprise', vol: '1 800/mois', trend: '+42%', level: 'Élevé' },
        { kw: 'consultant PME Québec', vol: '2 200/mois', trend: '+67%', level: 'Très élevé' },
        { kw: 'coach en ligne francophone', vol: '4 500/mois', trend: '+145%', level: 'Très élevé' },
        { kw: 'formation entrepreneur Québec', vol: '1 600/mois', trend: '+55%', level: 'Élevé' },
      ],
      insight: 'Le coaching en ligne francophone est en explosion (+145%). La demande est là mais l\'offre francophone de qualité reste insuffisante. Premier entrant avec une niche précise = avantage durable.'
    },
    benchmark: {
      margeB: '70-85%', margeB_desc: 'Marge brute (service intellectuel)',
      margeN: '35-55%', margeN_desc: 'Marge nette si bien géré',
      revEmp: '90 000 $', revEmp_desc: 'Revenu/coach/an (médian QC)',
      seuil: '5-12 clients', seuil_desc: 'Seuil rentabilité coacheur solo',
      source: 'ICF · BDC · Enquête FCEI 2025',
      prices: [
        { segment: 'Coaching individuel (1-1)', min: '150$', max: '500$', unit: '/heure', note: 'Selon spécialisation' },
        { segment: 'Programme coaching 3 mois', min: '2 500$', max: '8 000$', unit: '/programme', note: 'Forfait complet' },
        { segment: 'Formation entreprise (groupe)', min: '3 000$', max: '15 000$', unit: '/journée', note: 'Formation corporative' },
        { segment: 'Cours en ligne (asynchrone)', min: '97$', max: '997$', unit: '/cours', note: 'Accès illimité' },
      ],
      ratios: [
        { name: 'Marge brute', val: 78, color: 'teal' },
        { name: 'Marketing', val: 20, color: 'amber' },
        { name: 'Outils & tech', val: 8, color: 'navy' },
        { name: 'Marge nette', val: 44, color: 'emerald' },
      ],
      insight: 'Le coaching est l\'un des secteurs les plus profitables — marges nettes de 35-55% si bien positionné. Le seul vrai coût est l\'acquisition client. Les coachs qui automatisent leur marketing (funnel, contenu, email) scalent 3x plus vite que ceux qui font du réseautage pur.'
    },
    densite: {
      total: '12 000+', total_desc: 'Coaches / formateurs actifs QC',
      growth: '+1 800', growth_desc: 'Nouveaux en 2025 (REQ)',
      ratio: '1 / 680', ratio_desc: 'Ratio coach / habitant QC',
      opportunity: 'Forte (niche)', opp_class: 'teal',
      regions: [
        { name: 'Île de Montréal', nb: 5800, saturation: 75, class: 'rose' },
        { name: 'Québec (ville)', nb: 2200, saturation: 60, class: 'amber' },
        { name: 'Rive-Sud MTL', nb: 1400, saturation: 42, class: 'amber' },
        { name: 'Laval', nb: 980, saturation: 38, class: 'teal' },
        { name: 'Régions', nb: 1620, saturation: 22, class: 'teal' },
      ],
      opportunities: [
        { zone: '🟢 Niche sectorielle B2B', desc: 'Coaching PME manufacturières, PME tech, secteurs sous-servis — tarifs 2-3x supérieurs' },
        { zone: '🟢 Francophone en ligne', desc: 'Marché sous-développé vs anglophone — 1 seul créateur FR pour 10 EN' },
        { zone: '🟡 Régions QC (hors MTL)', desc: 'Saturation < 25% — forte demande non comblée, déplacements ou virtuel' },
      ],
      insight: 'Le marché généraliste est saturé à Montréal. La stratégie gagnante : hyper-spécialisation sur un résultat précis pour un avatar précis. "Coach en leadership pour fondateurs de PME manufacturières" bat "coach d\'affaires" à tous les niveaux — prix, conversion, rétention.'
    }
  },

  default: {
    keys: [],
    label: 'Secteur entrepreneurial général',
    scian: '–',
    taille: {
      tam: '~15 Mrd $', tam_desc: 'Marché total estimé Canada',
      sam: '~2.1 Mrd $', sam_desc: 'Marché adressable Québec',
      som: '1-10 M$', som_desc: 'Part capturable réalistement',
      cagr: '+6-12%', cagr_desc: 'Croissance estimée secteur',
      source: 'Stats Canada · BDC · OCDE',
      regions: [
        { name: 'Grand Montréal', val: 45, pct: 45 },
        { name: 'Québec (ville)', val: 18, pct: 18 },
        { name: 'Rive-Sud MTL', val: 12, pct: 12 },
        { name: 'Laval', val: 8, pct: 8 },
        { name: 'Régions QC', val: 17, pct: 17 },
      ],
      insight: 'Le Québec représente ~23% du PIB canadien et ses PME constituent 99% du tissu économique. Le marché local offre un avantage de proximité culturelle et linguistique qu\'aucun acteur américain ne peut répliquer. La demande "Acheter local" a augmenté de 87% depuis 2025.'
    },
    tendances: {
      volume: '+220%', volume_desc: 'Croissance recherches 12 mois',
      peak: 'Variable', peak_desc: 'Selon ton secteur spécifique',
      trend: 'Hausse', trend_class: 'up',
      sparkline: [40, 45, 50, 48, 55, 62, 68, 72, 78, 82, 88, 95],
      keywords: [
        { kw: '[Ton secteur] Montréal', vol: '1 200-4 500/mois', trend: '+55%', level: 'Élevé' },
        { kw: '[Ton secteur] Québec', vol: '800-2 200/mois', trend: '+38%', level: 'Moyen' },
        { kw: 'meilleur [service] Rive-Sud', vol: '400-900/mois', trend: '+42%', level: 'Moyen' },
        { kw: '[Ton service] prix abordable', vol: '600-1 800/mois', trend: '+65%', level: 'Élevé' },
        { kw: 'entreprise locale [secteur] QC', vol: '900-3 000/mois', trend: '+88%', level: 'Très élevé' },
      ],
      insight: 'La tendance "local first" transforme le comportement d\'achat québécois. Les entreprises qui misent sur leur appartenance locale + qualité de service surperforment les concurrents nationaux de 30-50% sur les taux de conversion.'
    },
    benchmark: {
      margeB: '25-55%', margeB_desc: 'Marge brute typique PME QC',
      margeN: '8-22%', margeN_desc: 'Marge nette médiane QC',
      revEmp: '68 000 $', revEmp_desc: 'Revenu/employé/an médian QC',
      seuil: '10-30 clients', seuil_desc: 'Seuil de rentabilité typique',
      source: 'BDC · Desjardins · FCEI 2025',
      prices: [
        { segment: 'Entrée de gamme', min: 'Variable', max: '–', unit: '–', note: 'Dépend de ton secteur' },
        { segment: 'Milieu de gamme', min: 'Variable', max: '–', unit: '–', note: 'Segmentation à définir' },
        { segment: 'Haut de gamme / Premium', min: 'Variable', max: '–', unit: '–', note: 'Positionnement clé' },
        { segment: 'Abonnement / récurrent', min: '29$', max: '299$', unit: '/mois', note: 'Modèle SaaS / service' },
      ],
      ratios: [
        { name: 'Marge brute moy.', val: 38, color: 'teal' },
        { name: 'Charges opér.', val: 28, color: 'navy' },
        { name: 'Marketing/Ventes', val: 12, color: 'amber' },
        { name: 'Marge nette moy.', val: 14, color: 'emerald' },
      ],
      insight: 'La marge nette médiane des PME québécoises est de 14%. Les entreprises qui dominent leur niche atteignent 22-35% grâce à une meilleure rétention client (LTV élevée) et un marketing efficace (CAC faible). L\'objectif : LTV/CAC > 3.'
    },
    densite: {
      total: '250 000+', total_desc: 'PME actives au Québec (REQ)',
      growth: '+18 000', growth_desc: 'Nouvelles entreprises en 2025',
      ratio: 'Variable', ratio_desc: 'Selon ton secteur',
      opportunity: 'Variable', opp_class: 'amber',
      regions: [
        { name: 'Île de Montréal', nb: 98000, saturation: 65, class: 'rose' },
        { name: 'Québec (ville)', nb: 42000, saturation: 52, class: 'amber' },
        { name: 'Rive-Sud MTL', nb: 28000, saturation: 42, class: 'amber' },
        { name: 'Laval', nb: 22000, saturation: 48, class: 'amber' },
        { name: 'Régions QC', nb: 60000, saturation: 28, class: 'teal' },
      ],
      opportunities: [
        { zone: '🟢 Régions QC (hors grands centres)', desc: 'Saturation < 30% dans la plupart des secteurs — accès numérique = avantage premier arrivant' },
        { zone: '🟢 Niche spécialisée dans ton secteur', desc: 'La spécialisation permet de charger 2-3x le prix généraliste avec moins de compétition directe' },
        { zone: '🟡 Grand Montréal', desc: 'Saturé en généraliste — mais les niches ultra-spécifiques restent peu exploitées' },
      ],
      insight: 'Quelle que soit ta niche, la règle est la même : les généralistes se font écraser sur le prix, les spécialistes commandent une prime. Choisis un problème très précis pour un avatar très précis — et deviens LA référence.'
    }
  }
};

// --- Init ---
document.addEventListener('DOMContentLoaded', () => {
  readADN();
  updateProgress();
});

function readADN() {
  try {
    const q = JSON.parse(localStorage.getItem('bildop_questionnaire') || '{}');
    const mi = JSON.parse(localStorage.getItem('bildop_market_intelligence') || '{}');
    const secteur = q['3'] || q['secteur'] || mi.niche || '';
    if (secteur) {
      document.getElementById('adnSuggest').style.display = 'block';
      document.getElementById('adnText').textContent = secteur;
    }
  } catch(e) {}
}

function useAdn() {
  const text = document.getElementById('adnText').textContent;
  document.getElementById('nicheInput').value = text;
  startAnalysis();
}

function detectSecteur(niche) {
  const n = niche.toLowerCase();
  for (const [key, profil] of Object.entries(SECTEURS)) {
    if (key === 'default') continue;
    if (profil.keys.some(k => n.includes(k))) return key;
  }
  return 'default';
}

function startAnalysis() {
  const input = document.getElementById('nicheInput').value.trim();
  if (!input) { document.getElementById('nicheInput').focus(); return; }
  MR.niche = input;
  MR.secteurKey = detectSecteur(input);
  document.getElementById('nicheDisplay').textContent = input.length > 22 ? input.slice(0, 22) + '...' : input;
  goToStep(1);
}

// --- Navigation ---
function goToStep(step) {
  document.querySelectorAll('.mr-panel').forEach(p => p.classList.remove('active'));
  document.querySelectorAll('.mr-step-btn').forEach(b => b.classList.remove('active'));
  document.getElementById(`panel-${step}`).classList.add('active');
  document.querySelector(`[data-step="${step}"]`).classList.add('active');
  window.scrollTo(0, 0);

  if (step === 1 && !MR.data.taille)    runStep(1, 'taille');
  if (step === 2 && !MR.data.tendances) runStep(2, 'tendances');
  if (step === 3 && !MR.data.benchmark) runStep(3, 'benchmark');
  if (step === 4 && !MR.data.densite)   runStep(4, 'densite');
  if (step === 5)                        renderReport();

  updateProgress();
}

function updateProgress() {
  const done = MR.completedSteps.size;
  const total = 5;
  const pct = Math.round((done / total) * 100);
  const active = document.querySelector('.mr-step-btn.active');
  const stepNum = active ? active.dataset.step : '0';
  document.getElementById('progressBar').style.width = pct + '%';
  document.getElementById('progressLabel').textContent = `Étape ${stepNum} / ${total}`;
  MR.completedSteps.forEach(s => {
    const btn = document.querySelector(`[data-step="${s}"]`);
    if (btn && s > 0) { btn.classList.add('completed'); btn.querySelector('.mr-step-icon').textContent = '✅'; }
  });
}

// --- Runner générique avec animation ---
function runStep(stepNum, dataKey) {
  const loadEl = document.getElementById(`loading-${stepNum}`);
  const resEl  = document.getElementById(`results-${stepNum}`);
  const steps  = document.querySelectorAll(`#loading-${stepNum} .mr-loading__step`);

  loadEl.style.display = 'block';
  resEl.style.display  = 'none';

  let i = 0;
  const iv = setInterval(() => {
    if (i > 0) steps[i-1]?.classList.replace('active', 'done');
    steps[i]?.classList.add('active');
    i++;
    if (i >= steps.length) clearInterval(iv);
  }, 620);

  const delay = 620 * steps.length + 400;
  setTimeout(() => {
    const profil = SECTEURS[MR.secteurKey];
    MR.data[dataKey] = profil[dataKey];
    MR.completedSteps.add(stepNum);
    document.getElementById(`dot-${stepNum}`)?.classList.add('ready');

    loadEl.style.display = 'none';
    resEl.style.display  = 'block';

    if (dataKey === 'taille')    renderTaille(profil.taille, profil.label, profil.scian);
    if (dataKey === 'tendances') renderTendances(profil.tendances);
    if (dataKey === 'benchmark') renderBenchmark(profil.benchmark);
    if (dataKey === 'densite')   renderDensite(profil.densite);

    updateProgress();
  }, delay);
}

// --- Rendus ---
function renderTaille(d, label, scian) {
  document.getElementById('s1-sub').textContent = `Secteur : ${label} · Code SCIAN : ${scian}`;

  document.getElementById('s1-stats').innerHTML = [
    { val: d.tam, label: 'Marché total (Canada)', sub: d.tam_desc, src: d.source },
    { val: d.sam, label: 'Marché Québec (SAM)', sub: d.sam_desc, src: d.source },
    { val: d.som, label: 'Part capturable (SOM)', sub: d.som_desc, src: '' },
    { val: d.cagr, label: 'Croissance annuelle', sub: d.cagr_desc, src: '', trend: d.cagr, up: true },
  ].map(s => `
    <div class="mr-stat">
      <div class="mr-stat__value">${s.val}</div>
      <div class="mr-stat__label">${s.label}</div>
      <div class="mr-stat__sub">${s.sub}</div>
      ${s.src ? `<div class="mr-stat__source">${s.src}</div>` : ''}
      ${s.up ? `<div class="mr-stat__trend mr-stat__trend--up">↑ En hausse</div>` : ''}
    </div>
  `).join('');

  const maxVal = Math.max(...d.regions.map(r => r.val));
  document.getElementById('s1-regions').innerHTML = d.regions.map(r => `
    <div class="mr-bar-row">
      <div class="mr-bar-label">${r.name}</div>
      <div class="mr-bar-track"><div class="mr-bar-fill mr-bar-fill--teal" style="width:${(r.val/maxVal)*100}%"></div></div>
      <div class="mr-bar-val">${r.pct}%</div>
    </div>
  `).join('');

  const ins = document.getElementById('s1-insight');
  ins.innerHTML = `<div class="mr-insight__title">💡 Insight Bildop</div><div class="mr-insight__text">${d.insight}</div>`;
}

function renderTendances(d) {
  document.getElementById('s2-stats').innerHTML = [
    { val: d.volume, label: 'Croissance des recherches', sub: d.volume_desc, trend: 'up' },
    { val: d.peak, label: 'Période de pic', sub: d.peak_desc, trend: 'neutral' },
    { val: d.trend, label: 'Tendance générale', sub: '12 derniers mois', trend: d.trend_class },
    { val: '74%', label: 'Recherches mobiles', sub: 'Part mobile vs desktop', trend: 'up' },
  ].map(s => `
    <div class="mr-stat">
      <div class="mr-stat__value">${s.val}</div>
      <div class="mr-stat__label">${s.label}</div>
      <div class="mr-stat__sub">${s.sub}</div>
      <div class="mr-stat__trend mr-stat__trend--${s.trend}">${s.trend === 'up' ? '↑' : s.trend === 'down' ? '↓' : '→'}</div>
    </div>
  `).join('');

  const maxSpark = Math.max(...d.sparkline);
  document.getElementById('s2-trend').innerHTML = d.sparkline.map(v => `
    <div class="mr-trend-bar" style="height:${Math.round((v/maxSpark)*100)}%"></div>
  `).join('');

  const kw = document.getElementById('s2-keywords');
  kw.innerHTML = `<table class="mr-table">
    <thead><tr><th>Mot-clé</th><th>Volume</th><th>Tendance</th><th>Potentiel</th></tr></thead>
    <tbody>${d.keywords.map(k => `
      <tr>
        <td><strong>${k.kw}</strong></td>
        <td>${k.vol}</td>
        <td style="color:var(--emerald); font-weight:600;">${k.trend}</td>
        <td><span class="mr-pill mr-pill--${k.level === 'Très élevé' ? 'teal' : k.level === 'Élevé' ? 'green' : 'amber'}">${k.level}</span></td>
      </tr>
    `).join('')}</tbody>
  </table>`;

  document.getElementById('s2-insight').innerHTML = `<div class="mr-insight__title">💡 Insight Bildop</div><div class="mr-insight__text">${d.insight}</div>`;
}

function renderBenchmark(d) {
  document.getElementById('s3-stats').innerHTML = [
    { val: d.margeB, label: 'Marge brute typique', sub: d.margeB_desc },
    { val: d.margeN, label: 'Marge nette moyenne', sub: d.margeN_desc },
    { val: d.revEmp, label: 'Revenu / employé', sub: d.revEmp_desc },
    { val: d.seuil, label: 'Seuil de rentabilité', sub: d.seuil_desc },
  ].map(s => `
    <div class="mr-stat">
      <div class="mr-stat__value">${s.val}</div>
      <div class="mr-stat__label">${s.label}</div>
      <div class="mr-stat__sub">${s.sub}</div>
      <div class="mr-stat__source">${d.source}</div>
    </div>
  `).join('');

  document.getElementById('s3-table').innerHTML = `
    <thead><tr><th>Segment</th><th>Min</th><th>Max</th><th>Unité</th><th>Note</th></tr></thead>
    <tbody>${d.prices.map(p => `
      <tr>
        <td><strong>${p.segment}</strong></td>
        <td style="color:var(--teal); font-weight:700;">${p.min}</td>
        <td style="color:var(--navy); font-weight:700;">${p.max}</td>
        <td>${p.unit}</td>
        <td style="color:var(--text-muted); font-size:0.78rem;">${p.note}</td>
      </tr>
    `).join('')}</tbody>
  `;

  document.getElementById('s3-ratios').innerHTML = d.ratios.map(r => `
    <div class="mr-bar-row">
      <div class="mr-bar-label">${r.name}</div>
      <div class="mr-bar-track"><div class="mr-bar-fill mr-bar-fill--${r.color}" style="width:${r.val}%"></div></div>
      <div class="mr-bar-val">${r.val}%</div>
    </div>
  `).join('');

  document.getElementById('s3-insight').innerHTML = `<div class="mr-insight__title">💡 Insight Bildop</div><div class="mr-insight__text">${d.insight}</div>`;
}

function renderDensite(d) {
  document.getElementById('s4-stats').innerHTML = [
    { val: d.total, label: 'Entreprises actives QC', sub: d.total_desc },
    { val: d.growth, label: 'Nouvelles entreprises', sub: d.growth_desc },
    { val: d.ratio, label: 'Ratio entreprise/habitant', sub: d.ratio_desc },
    { val: d.opportunity, label: 'Opportunité marché', sub: 'Évaluation globale' },
  ].map(s => `
    <div class="mr-stat">
      <div class="mr-stat__value" style="font-size:${s.val.length > 8 ? '1.1rem' : '1.5rem'}">${s.val}</div>
      <div class="mr-stat__label">${s.label}</div>
      <div class="mr-stat__sub">${s.sub}</div>
    </div>
  `).join('');

  const maxNb = Math.max(...d.regions.map(r => r.nb));
  document.getElementById('s4-regions').innerHTML = d.regions.map(r => `
    <div class="mr-bar-row">
      <div class="mr-bar-label">${r.name}</div>
      <div class="mr-bar-track">
        <div class="mr-bar-fill mr-bar-fill--${r.class}" style="width:${(r.nb/maxNb)*100}%"></div>
      </div>
      <div class="mr-bar-val" style="font-size:0.7rem;">${r.saturation}% sat.</div>
    </div>
  `).join('');

  document.getElementById('s4-opportunities').innerHTML = d.opportunities.map(o => `
    <div style="padding: 12px 14px; border-radius: 8px; background: var(--bg-page); border: 1px solid var(--border); margin-bottom: 8px;">
      <div style="font-weight: 700; font-size: 0.88rem; color: var(--text-dark); margin-bottom: 4px;">${o.zone}</div>
      <div style="font-size: 0.82rem; color: var(--text-muted); line-height: 1.5;">${o.desc}</div>
    </div>
  `).join('');

  document.getElementById('s4-insight').innerHTML = `<div class="mr-insight__title">💡 Insight Bildop</div><div class="mr-insight__text">${d.insight}</div>`;
}

function renderReport() {
  MR.completedSteps.add(5);
  updateProgress();
  const profil = SECTEURS[MR.secteurKey];
  document.getElementById('report-summary').innerHTML = `
    <div class="mr-card__title">📋 Résumé — ${MR.niche}</div>
    <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(180px,1fr)); gap:10px; margin-top: 8px;">
      ${MR.data.taille ? `<div style="padding:10px 14px; background:rgba(13,148,136,.08); border:1px solid rgba(13,148,136,.2); border-radius:8px; font-size:0.83rem; color:#134e4a;">✅ Taille marché : ${profil.taille.sam} (QC)</div>` : ''}
      ${MR.data.tendances ? `<div style="padding:10px 14px; background:rgba(13,148,136,.08); border:1px solid rgba(13,148,136,.2); border-radius:8px; font-size:0.83rem; color:#134e4a;">✅ Tendance : ${profil.tendances.volume} en 12 mois</div>` : ''}
      ${MR.data.benchmark ? `<div style="padding:10px 14px; background:rgba(13,148,136,.08); border:1px solid rgba(13,148,136,.2); border-radius:8px; font-size:0.83rem; color:#134e4a;">✅ Marge nette : ${profil.benchmark.margeN}</div>` : ''}
      ${MR.data.densite ? `<div style="padding:10px 14px; background:rgba(13,148,136,.08); border:1px solid rgba(13,148,136,.2); border-radius:8px; font-size:0.83rem; color:#134e4a;">✅ Densité : ${profil.densite.opportunity}</div>` : ''}
    </div>
  `;
}

// --- Export ---
function exportReport() {
  const profil = SECTEURS[MR.secteurKey];
  const lines = [];
  lines.push('ÉTUDE DE MARCHÉ — BILDOP');
  lines.push(`Niche : ${MR.niche}`);
  lines.push(`Généré le : ${new Date().toLocaleDateString('fr-CA')}`);
  lines.push(`Sources : Stats Canada · REQ · Google Trends · BDC`);
  lines.push('='.repeat(60));

  if (MR.data.taille) {
    lines.push('\n## 1. TAILLE DU MARCHÉ');
    lines.push(`TAM (Canada) : ${profil.taille.tam}`);
    lines.push(`SAM (Québec) : ${profil.taille.sam}`);
    lines.push(`SOM (capturable) : ${profil.taille.som}`);
    lines.push(`Croissance : ${profil.taille.cagr}`);
    lines.push(`\nInsight : ${profil.taille.insight}`);
  }

  if (MR.data.tendances) {
    lines.push('\n## 2. TENDANCES & DEMANDE');
    lines.push(`Croissance recherches 12 mois : ${profil.tendances.volume}`);
    lines.push(`Période de pic : ${profil.tendances.peak}`);
    lines.push('\nMots-clés prioritaires :');
    profil.tendances.keywords.forEach(k => lines.push(`  - ${k.kw} : ${k.vol} (${k.trend})`));
    lines.push(`\nInsight : ${profil.tendances.insight}`);
  }

  if (MR.data.benchmark) {
    lines.push('\n## 3. BENCHMARK SECTORIEL');
    lines.push(`Marge brute : ${profil.benchmark.margeB}`);
    lines.push(`Marge nette : ${profil.benchmark.margeN}`);
    lines.push(`Seuil de rentabilité : ${profil.benchmark.seuil}`);
    lines.push('\nFourchette de prix :');
    profil.benchmark.prices.forEach(p => lines.push(`  - ${p.segment} : ${p.min} – ${p.max} ${p.unit}`));
    lines.push(`\nInsight : ${profil.benchmark.insight}`);
  }

  if (MR.data.densite) {
    lines.push('\n## 4. DENSITÉ LOCALE');
    lines.push(`Entreprises actives QC : ${profil.densite.total}`);
    lines.push('\nZones d\'opportunité :');
    profil.densite.opportunities.forEach(o => lines.push(`  ${o.zone} : ${o.desc}`));
    lines.push(`\nInsight : ${profil.densite.insight}`);
  }

  lines.push('\n— Généré par BILDOP.COM | Fait au Québec 🇨🇦 —');

  const blob = new Blob([lines.join('\n')], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `bildop-marche-${MR.niche.replace(/\s+/g,'-').toLowerCase()}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function alertPDF() {
  alert('Rapport PDF Premium — 99$ CAD\n\nDisponible lors du lancement officiel.\nContact : info@bildop.com');
}

function goToSprint() {
  localStorage.setItem('bildop_marche_reel', JSON.stringify({ niche: MR.niche, secteur: MR.secteurKey, timestamp: Date.now() }));
  window.location.href = 'sprint.html';
}
