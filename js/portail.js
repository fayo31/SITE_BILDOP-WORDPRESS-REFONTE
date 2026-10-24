/* ============================================
   BILDOP — Portail des concepts
   Sélection publique du catalogue. Chaque fiche
   est un point de départ, pas un plan bancable.
   ============================================ */

const PORTAIL_UNIVERS = [
  { id: 'tous', label: 'Tous' },
  { id: 'beaute', label: 'Beauté' },
  { id: 'finance', label: 'Finance' },
  { id: 'logistique', label: 'Logistique' },
  { id: 'tech', label: 'Techno' },
  { id: 'franchise', label: 'Franchise' },
  { id: 'talent', label: 'Talent' },
];

const PORTAIL_CONCEPTS = [
  {
    id: 'clinique-cheveu',
    nom: 'La Clinique du Cheveu',
    univers: 'beaute',
    type: 'Service médical',
    secteur: 'Santé / Bien-être',
    pitch: 'Une clinique du cuir chevelu qui traite la chute de cheveux avec un protocole clair, pas juste un shampoing.',
    douleur: 'Les gens qui perdent leurs cheveux se font renvoyer d’un salon à l’autre. Personne ne prend le problème au sérieux, et les solutions sérieuses sont difficiles à trouver.',
    client: 'Adultes qui veulent un suivi pour la chute de cheveux, l’alopécie ou un cuir chevelu qui ne répond plus aux produits de pharmacie.',
    offre: 'Évaluation, protocole de soins et suivi. Le salon classique ne fait pas ça. Ici, le rendez-vous a un début, un plan et un prochain pas.',
    modele: 'Rendez-vous à ticket élevé, puis soins récurrents. Le revenu vient du suivi, pas d’une visite unique.',
    ticket: 'Ordre de grandeur cité dans le pipeline : 2 000 $ et plus par protocole. À valider sur ton marché.',
    mise: 'Plus lourde — local, protocole et crédibilité clinique. Passe par le simulateur avant d’engager de l’argent.',
    featured: true,
  },
  {
    id: 'micro-trim',
    nom: 'Micro-Trim',
    univers: 'beaute',
    type: 'Service',
    secteur: 'Santé / Bien-être',
    pitch: 'Une coupe rapide, au même prix, dans un kiosque standardisé. Tu entres, tu ressors, c’est fait.',
    douleur: 'Prendre rendez-vous pour une coupe de 15 minutes, puis attendre. Les gens pressés abandonnent ou se coupent eux-mêmes.',
    client: 'Gens occupés, centres commerciaux, tours de bureaux, campus. Quelqu’un qui veut une coupe nette sans bloquer une heure.',
    offre: 'Menu court. Coupes répétables. Pas de coloration, pas de plomberie compliquée. Le kiosque est le produit.',
    modele: 'Volume. Petit ticket, beaucoup de passages, emplacement qui amène le trafic tout seul.',
    ticket: 'Ordre de grandeur cité dans le pipeline : 20 $ à 40 $ la visite. À valider localement.',
    mise: 'Légère pour un commerce de services — format kiosque, sans gros salon. Le loyer de l’emplacement reste le vrai risque.',
    featured: true,
  },
  {
    id: 'balayage-bar',
    nom: 'Balayage Bar',
    univers: 'beaute',
    type: 'Abonnement + service',
    secteur: 'Santé / Bien-être',
    pitch: 'Le balayage devient un rendez-vous régulier, pas un gros chèque deux fois par année.',
    douleur: 'Un balayage coûte cher, le résultat tient quelques mois, puis tout est à refaire. Les clientes espaçent… et décrochent.',
    client: 'Clientes qui veulent une couleur entretenue sans recommencer à zéro à chaque saison.',
    offre: 'Forfait d’entretien. Le premier rendez-vous installe la couleur. Les suivants la gardent.',
    modele: 'Prélèvement mensuel plus rendez-vous. Le revenu est récurrent si le résultat tient sa promesse.',
    ticket: 'Ordre de grandeur cité dans le pipeline : 150 $ à 300 $ par cycle. À valider.',
    mise: 'Moyenne — station de coloration, produit et une façon simple de facturer l’abonnement.',
    featured: true,
  },
  {
    id: 'clinique-mieux-etre',
    nom: 'Clinique du Mieux-Être',
    univers: 'beaute',
    type: 'Clinique',
    secteur: 'Santé / Bien-être',
    pitch: 'Santé et esthétique sous le même toit, pour que le client arrête de courir trois adresses.',
    douleur: 'Le suivi santé est d’un bord, le soin visible de l’autre. Personne ne relie les deux, et le client se perd.',
    client: 'Adultes qui veulent un lieu unique pour un soin du corps et un suivi plus sérieux que le salon du coin.',
    offre: 'Parcours combiné : évaluation, soin, prochain rendez-vous déjà posé. Plusieurs services, une seule fiche client.',
    modele: 'Plusieurs flux dans le même local : soins, forfaits, produits. Le local doit travailler plus qu’une chaise.',
    ticket: null,
    mise: 'Lourde — local, permis et équipe. Ce n’est pas un premier test à lancer avec une carte de crédit.',
  },
  {
    id: 'coiffeur-domicile',
    nom: 'Coiffeur à domicile',
    univers: 'beaute',
    type: 'Service',
    secteur: 'Santé / Bien-être',
    pitch: 'La coupe vient chez la personne qui ne peut pas, ou ne veut pas, se déplacer.',
    douleur: 'Parents coincés, personnes à mobilité réduite, gens qui refusent le salon. Le besoin est là. L’offre est éparpillée et inégale.',
    client: 'Familles, aînés, et clients qui paient pour le déplacement autant que pour la coupe.',
    offre: 'Rendez-vous à domicile, créneaux clairs, même standard de service d’un coiffeur à l’autre.',
    modele: 'Déplacement + service. Le prix couvre le temps de route, sinon le modèle ne tient pas.',
    ticket: null,
    mise: 'Légère en équipement. Le vrai travail est l’agenda, les zones desservies et la constance du service.',
  },
  {
    id: 'coiffure-express',
    nom: 'Coiffure Express',
    univers: 'beaute',
    type: 'Franchise',
    secteur: 'Santé / Bien-être',
    pitch: 'Le même kiosque de coupe rapide, répété. Pas un salon différent à chaque coin de rue.',
    douleur: 'Les chaînes de coupe rapide existent, mais la qualité bouge d’une succursale à l’autre. Le client ne sait jamais ce qu’il va avoir.',
    client: 'Même client que Micro-Trim, plus un opérateur qui veut un format déjà décidé.',
    offre: 'Manuel, menu court, aménagement identique. L’opérateur exécute. Il ne réinvente pas le salon.',
    modele: 'Redevance sur un format simple à copier. Ça ne marche que si le kiosque est vraiment standard.',
    ticket: null,
    mise: 'Moyenne par point de service. Le coût de mettre le format au point vient avant la première copie.',
  },
  {
    id: 'colorista-pro',
    nom: 'Colorista Pro',
    univers: 'beaute',
    type: 'Franchise',
    secteur: 'Santé / Bien-être',
    pitch: 'Une adresse qui ne fait que la couleur, et qui la réussit.',
    douleur: 'Une couleur ratée se voit. La cliente n’a pas envie de « réessayer ailleurs » après une mauvaise expérience.',
    client: 'Clientes qui paient pour un résultat de couleur précis, pas pour une coupe en bonus.',
    offre: 'Spécialiste couleur. Protocole, photos avant/après, correction si ça rate.',
    modele: 'Ticket plus haut que la coupe, récurrence quand la cliente fait confiance au résultat.',
    ticket: null,
    mise: 'Moyenne — formation couleur et produit. Le risque est la réputation, pas le loyer seul.',
  },
  {
    id: 'kids-kuts',
    nom: 'Kids’ Kuts',
    univers: 'beaute',
    type: 'Franchise',
    secteur: 'Santé / Bien-être',
    pitch: 'Un salon pensé pour les enfants, pour que la coupe ne soit plus une négociation.',
    douleur: 'L’enfant bouge, a peur, ou s’ennuie. Le salon d’adultes n’est pas fait pour ça. Les parents ressortent stressés.',
    client: 'Parents de jeunes enfants, dans des quartiers où la famille se déplace déjà pour d’autres services.',
    offre: 'Coupe courte, environnement fait pour les enfants, rendez-vous qui finit à l’heure.',
    modele: 'Visites régulières. L’enfant grandit, le parent revient, parfois avec le suivant.',
    ticket: null,
    mise: 'Moyenne — local adapté. Le concept tient si l’expérience enfant est le produit, pas un coin avec des crayons.',
  },
  {
    id: 'textured-haven',
    nom: 'Textured Haven',
    univers: 'beaute',
    type: 'Service',
    secteur: 'Santé / Bien-être',
    pitch: 'Un salon qui sait réellement travailler les cheveux texturés, bouclés et crépus.',
    douleur: 'Trop de gens se font « essayer » par un salon qui n’a pas la technique. Ils finissent par arrêter de sortir.',
    client: 'Clientèle aux cheveux texturés qui veut un résultat prévisible et quelqu’un qui connaît le cheveu.',
    offre: 'Services spécialisés, conseil produit, rendez-vous plus longs parce que le travail l’exige.',
    modele: 'Ticket plus élevé, fidélité forte quand le salon devient l’adresse de référence.',
    ticket: null,
    mise: 'Moyenne — compétence avant décor. Sans la technique, le local ne sert à rien.',
  },
  {
    id: 'silent-studio',
    nom: 'The Silent Studio',
    univers: 'beaute',
    type: 'Service',
    secteur: 'Santé / Bien-être',
    pitch: 'Un studio calme, à faible stimulation, pour les gens que le salon classique épuise.',
    douleur: 'Bruit, néons, conversations forcées, attentes. Pour certaines personnes, le salon est invivable. Elles se privent du service.',
    client: 'Personnes neurodivergentes, hypersensibles, ou simplement clients qui veulent un rendez-vous silencieux.',
    offre: 'Créneau au calme, consignes claires, option sans conversation. Le protocole est annoncé avant d’entrer.',
    modele: 'Créneaux limités, prix qui paie le temps calme. Ce n’est pas un salon à haut volume.',
    ticket: null,
    mise: 'Légère à moyenne. L’aménagement et la discipline du service comptent plus que l’équipement.',
  },
  {
    id: 'facto-rapide',
    nom: 'Facto-Rapide',
    univers: 'finance',
    type: 'Fintech',
    secteur: 'Services professionnels',
    pitch: 'Une PME transforme ses factures en cash sans attendre 45 jours.',
    douleur: 'Le client a payé en retard. La paie, elle, est vendredi. Le manque de cash tue des entreprises qui ont pourtant des ventes.',
    client: 'PME québécoises avec des factures B2B solides et un délai de paiement qui étouffe l’opération.',
    offre: 'Lecture des factures, avance d’une partie du montant, suivi du paiement. Le patron voit ce qui rentre et quand.',
    modele: 'Frais sur le montant avancé. Le volume de factures fait le revenu, pas un abonnement cosmétique.',
    ticket: null,
    mise: 'Lourde — capital pour avancer l’argent, conformité et partenaires. Ce n’est pas un side project du soir.',
    featured: true,
  },
  {
    id: 'cash-flow-pro',
    nom: 'Cash-Flow Pro',
    univers: 'finance',
    type: 'SaaS',
    secteur: 'Technologie / SaaS',
    pitch: 'Le patron voit son cash des 90 prochains jours avant que le trou arrive.',
    douleur: 'Le compte en banque dit le passé. Les décisions se prennent sur le futur. La plupart des PME n’ont pas cette vue-là.',
    client: 'Propriétaires de PME qui gèrent encore la trésorerie dans un chiffrier, ou pas du tout.',
    offre: 'Connexion aux comptes, projection, alertes. Une vue simple : ce qui entre, ce qui sort, ce qui manque.',
    modele: 'Abonnement mensuel. Le logiciel doit rester branché, sinon il ne vaut plus rien.',
    ticket: null,
    mise: 'Moyenne en produit. Légère pour un premier utilisateur qui s’en sert comme outil, lourde si tu veux le bâtir.',
  },
  {
    id: 'rem-pay',
    nom: 'REM-Pay',
    univers: 'finance',
    type: 'Fintech',
    secteur: 'Technologie / SaaS',
    pitch: 'Encaisser les paiements des commerces du réseau sans passer par trois fournisseurs.',
    douleur: 'Chaque clinique ou commerce a son terminal, ses frais, son relevé. Personne ne voit l’ensemble.',
    client: 'Commerces de services qui encaissent souvent et veulent un prélèvement ou un terminal cohérent.',
    offre: 'Encaissement, relevé clair, prélèvement pour les forfaits. Un seul endroit pour suivre l’argent reçu.',
    modele: 'Pourcentage sur les transactions. Le revenu suit le volume encaissé.',
    ticket: null,
    mise: 'Lourde — agrément, sécurité, partenaires bancaires. À traiter comme un projet financier, pas comme une feature.',
  },
  {
    id: 'pro-gestion',
    nom: 'Pro-Gestion',
    univers: 'finance',
    type: 'Service',
    secteur: 'Services professionnels',
    pitch: 'Un directeur financier à temps partiel, pour la PME qui n’a pas les moyens d’en engager un.',
    douleur: 'Le comptable produit les états. Personne ne dit au patron quoi faire avec. Les décisions se prennent au feeling.',
    client: 'PME de quelques employés à quelques dizaines, avec un propriétaire qui porte encore les chiffres.',
    offre: 'Revue mensuelle, cash, marges, et trois décisions. Pas un rapport de 40 pages.',
    modele: 'Forfait mensuel. Le client reste parce que la revue manque quand on l’enlève.',
    ticket: null,
    mise: 'Légère en équipement. Le plafond, c’est ton temps et la qualité du jugement.',
  },
  {
    id: 'supply-chain',
    nom: 'Tour de contrôle logistique',
    univers: 'logistique',
    type: 'SaaS',
    secteur: 'Transport / Logistique',
    pitch: 'Une vue unique sur les commandes, les retards et les stocks, au lieu de cinq fichiers.',
    douleur: 'Le stock dit une chose, le transporteur une autre, le client une troisième. L’équipe passe sa journée à réconcilier.',
    client: 'Distributeurs et e-commerçants qui ont déjà du volume et plus d’un entrepôt ou transporteur.',
    offre: 'Tableau de suivi : commande, expédition, exception. Alertes quand quelque chose dérape.',
    modele: 'Abonnement qui augmente avec le volume. Le client part difficilement une fois ses flux branchés.',
    ticket: null,
    mise: 'Moyenne à lourde si tu construis le logiciel. Le premier contrat paie l’intégration, pas le logo.',
  },
  {
    id: 'dernier-kilometre',
    nom: 'Le Dernier Kilomètre',
    univers: 'logistique',
    type: 'Service',
    secteur: 'Transport / Logistique',
    pitch: 'La livraison locale, organisée. Des tournées, pas une liste de textos.',
    douleur: 'Les commerces promettent la livraison et la gèrent avec le camion du cousin. Les retards deviennent la marque.',
    client: 'Commerces locaux et e-commerçants qui livrent dans une ville ou une région.',
    offre: 'Prise en charge, tournée, preuve de livraison. L’opérateur gère les chauffeurs. Le commerce voit le statut.',
    modele: 'Frais à la livraison ou à la tournée. La densité des adresses décide si c’est rentable.',
    ticket: null,
    mise: 'Moyenne — véhicules, assurance, dispatch. Sans densité, chaque livraison coûte trop cher.',
  },
  {
    id: 'logistique-inversee',
    nom: 'Logistique inversée',
    univers: 'logistique',
    type: 'Service',
    secteur: 'Transport / Logistique',
    pitch: 'Quelqu’un s’occupe des retours. Le commerçant arrête de les empiler dans l’arrière-boutique.',
    douleur: 'L’e-commerce sait expédier. Le retour, lui, traîne : étiquette, inspection, remise en stock, remboursement.',
    client: 'Boutiques en ligne avec un taux de retour qui mange la marge et le temps.',
    offre: 'Réception des retours, tri, remise en état ou rebut, statut renvoyé au commerçant.',
    modele: 'Forfait selon le volume de retours. Le besoin revient chaque semaine, pas une fois l’an.',
    ticket: null,
    mise: 'Moyenne — espace de tri et processus. Le local vide ne règle pas un retour mal inspecté.',
  },
  {
    id: 'ecom-fulfillment',
    nom: 'Fulfillment e-commerce',
    univers: 'logistique',
    type: 'Entrepôt',
    secteur: 'Transport / Logistique',
    pitch: 'Tu stockes, tu prépares, tu expédies pour des boutiques qui ont dépassé le sous-sol.',
    douleur: 'Le propriétaire emballe encore le soir. Les erreurs montent en même temps que les commandes.',
    client: 'Marques en ligne qui vendent assez pour justifier un entrepôt, pas assez pour le bâtir.',
    offre: 'Réception, stockage, préparation, expédition, rapport. La marque garde la relation client.',
    modele: 'Frais de stockage plus frais à la commande. Le revenu suit les ventes du client.',
    ticket: null,
    mise: 'Lourde — espace, équipement, assurance. À chiffrer dans le simulateur avant de signer un bail.',
  },
  {
    id: 'automatix',
    nom: 'Automatix',
    univers: 'tech',
    type: 'Service + playbooks',
    secteur: 'Technologie / SaaS',
    pitch: 'Les tâches répétitives d’une PME partent dans un scénario. Quelqu’un d’autre arrête de les faire à la main.',
    douleur: 'Copier des données d’un outil à l’autre, relancer les factures, aviser l’équipe. Ça brûle des heures qui ne se voient pas.',
    client: 'PME qui ont déjà des outils (courriel, facturation, CRM) et personne pour les relier.',
    offre: 'Diagnostic des tâches, mise en place des scénarios, documentation pour que ça survive au départ d’une personne.',
    modele: 'Projet d’installation, puis entretien mensuel. L’entretien est le revenu qui reste.',
    ticket: null,
    mise: 'Légère en capital. Le risque est de vendre du temps au lieu d’un scénario réutilisable.',
  },
  {
    id: 'nexus',
    nom: 'Nexus',
    univers: 'tech',
    type: 'Service',
    secteur: 'Technologie / SaaS',
    pitch: 'Brancher les systèmes d’une entreprise pour que les données arrêtent de vivre dans des silos.',
    douleur: 'Le CRM ne parle pas à la facturation. L’équipe réconcilie à la main et les chiffres ne matchent jamais.',
    client: 'Entreprises qui ont plusieurs logiciels et un volume qui rend les erreurs coûteuses.',
    offre: 'Intégrations, surveillance, correctifs. Un contrat clair sur ce qui est branché et ce qui ne l’est pas.',
    modele: 'Mandat plus rétention. Une intégration sans entretien casse au premier changement d’API.',
    ticket: null,
    mise: 'Légère en équipement, exigeante en compétence. Ne pas la vendre comme un forfait illimité.',
  },
  {
    id: 'due-diligence',
    nom: 'Due-Diligence Pro',
    univers: 'finance',
    type: 'Service',
    secteur: 'Services professionnels',
    pitch: 'Une grille pour regarder une entreprise à acheter avant de tomber en amour avec le chiffre d’affaires.',
    douleur: 'L’acheteur voit les ventes. Il voit trop tard les dettes, les clients concentrés et les contrats qui finissent.',
    client: 'Repreneurs, courtiers et conseillers qui analysent des dossiers d’acquisition.',
    offre: 'Liste de contrôles, lecture des états, risques classés, questions à poser au vendeur.',
    modele: 'Forfait au dossier. Le volume vient des professionnels qui en font plusieurs par année.',
    ticket: null,
    mise: 'Légère si tu vends l’analyse. Ce n’est pas un logiciel magique qui remplace la lecture des états.',
  },
  {
    id: 'devenir-franchiseur',
    nom: 'Devenir franchiseur',
    univers: 'franchise',
    type: 'Service',
    secteur: 'Services professionnels',
    pitch: 'Une PME qui marche veut se copier. On lui met la franchise en boîte avant qu’elle improvise.',
    douleur: 'Le propriétaire veut ouvrir un deuxième point, puis un troisième, sans manuel. Chaque succursale devient une autre entreprise.',
    client: 'PME avec un modèle déjà prouvé, qui veulent vendre un format au lieu d’ouvrir elles-mêmes partout.',
    offre: 'Manuel, économie de la redevance, recrutement du premier franchisé, ce qui ne se franchise pas.',
    modele: 'Projet forfaitaire. Ensuite, la redevance appartient au franchiseur, pas à toi, sauf entente claire.',
    ticket: null,
    mise: 'Légère en locaux. Le client paie le mandat. Ne promets pas qu’un concept non prouvé est franchisable.',
  },
  {
    id: 'franchise-resale',
    nom: 'Revente de franchises',
    univers: 'franchise',
    type: 'Place de marché',
    secteur: 'Services professionnels',
    pitch: 'Un endroit pour vendre ou acheter une franchise déjà en marche, avec un dossier lisible.',
    douleur: 'Les reprises se font par bouche-à-oreille. L’acheteur n’a pas les chiffres. Le vendeur ne sait pas comment présenter.',
    client: 'Franchisés qui veulent sortir, et acheteurs qui veulent un commerce déjà ouvert.',
    offre: 'Fiche du commerce, documents de base, mise en relation. Pas une promesse que le prix est le bon.',
    modele: 'Commission à la transaction, ou frais de dossier. Sans transactions, il n’y a pas de revenu.',
    ticket: null,
    mise: 'Légère pour publier des fiches. Le sérieux vient de la vérification des dossiers, pas du site.',
  },
  {
    id: 'recrute-ia',
    nom: 'RecrutIA',
    univers: 'talent',
    type: 'SaaS',
    secteur: 'Services professionnels',
    pitch: 'Un premier tri des candidatures, pour que l’humain parle aux personnes qui collent vraiment au poste.',
    douleur: 'Les PME reçoivent 80 CV pour un poste. Personne n’a le temps de tous les lire. Les bons passent à côté.',
    client: 'PME qui recrutent plusieurs fois par année et n’ont pas de département RH.',
    offre: 'Le poste est décrit une fois. Les candidatures sont classées. Un humain décide. L’outil ne « choisit » personne à ta place.',
    modele: 'Abonnement, ou forfait par poste ouvert. Ça se vend quand le recrutement est récurrent.',
    ticket: null,
    mise: 'Moyenne si tu construis le produit. Le risque légal (biais, données des candidats) est réel. Fais-le relire.',
  },
];

function portailUniversLabel(id) {
  const found = PORTAIL_UNIVERS.find((item) => item.id === id);
  return found ? found.label : id;
}

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function getConcept(id) {
  return PORTAIL_CONCEPTS.find((concept) => concept.id === id) || null;
}

function filterConcepts(query, univers) {
  const needle = query.trim().toLowerCase();
  return PORTAIL_CONCEPTS.filter((concept) => {
    if (univers !== 'tous' && concept.univers !== univers) return false;
    if (!needle) return true;
    const haystack = [
      concept.nom,
      concept.type,
      concept.pitch,
      concept.douleur,
      concept.client,
      portailUniversLabel(concept.univers),
    ].join(' ').toLowerCase();
    return haystack.includes(needle);
  });
}

function renderCard(concept) {
  return `
    <article class="portail-card" data-id="${escapeHtml(concept.id)}">
      <div class="portail-card__meta">
        <span class="portail-pill">${escapeHtml(portailUniversLabel(concept.univers))}</span>
        <span class="portail-card__type">${escapeHtml(concept.type)}</span>
      </div>
      <h3>${escapeHtml(concept.nom)}</h3>
      <p>${escapeHtml(concept.pitch)}</p>
      <button type="button" class="portail-card__open" data-open="${escapeHtml(concept.id)}">Voir la fiche</button>
    </article>
  `;
}

function renderFiche(concept) {
  const ticket = concept.ticket
    ? `<div class="portail-fiche__row"><span>Ticket client</span><p>${escapeHtml(concept.ticket)}</p></div>`
    : '';
  return `
    <div class="portail-fiche__head">
      <div>
        <span class="portail-pill">${escapeHtml(portailUniversLabel(concept.univers))}</span>
        <h2 id="portailFicheTitle">${escapeHtml(concept.nom)}</h2>
        <p class="portail-fiche__type">${escapeHtml(concept.type)}</p>
      </div>
      <button type="button" class="portail-fiche__close" data-close aria-label="Fermer la fiche">×</button>
    </div>
    <p class="portail-fiche__pitch">${escapeHtml(concept.pitch)}</p>
    <div class="portail-fiche__block">
      <h3>La douleur</h3>
      <p>${escapeHtml(concept.douleur)}</p>
    </div>
    <div class="portail-fiche__block">
      <h3>Le client</h3>
      <p>${escapeHtml(concept.client)}</p>
    </div>
    <div class="portail-fiche__block">
      <h3>L'offre</h3>
      <p>${escapeHtml(concept.offre)}</p>
    </div>
    <div class="portail-fiche__block">
      <h3>Comment ça fait de l'argent</h3>
      <p>${escapeHtml(concept.modele)}</p>
    </div>
    <div class="portail-fiche__facts">
      ${ticket}
      <div class="portail-fiche__row"><span>Mise de départ</span><p>${escapeHtml(concept.mise)}</p></div>
    </div>
    <p class="portail-fiche__note">Point de départ. Pas une évaluation, pas une offre de financement, pas une garantie que le concept marche dans ta ville. Les montants indiqués sont des ordres de grandeur à vérifier.</p>
    <div class="portail-fiche__actions">
      <button type="button" class="btn btn--primary" data-plan="${escapeHtml(concept.id)}">Bâtir le plan de ce concept →</button>
      <button type="button" class="btn btn--secondary" data-apply="${escapeHtml(concept.id)}">Je veux opérer celui-là</button>
    </div>
    <form class="portail-form" id="portailForm" hidden>
      <h3>Candidature — ${escapeHtml(concept.nom)}</h3>
      <p>On garde ta demande sur cet appareil et on t'affiche un courriel prêt à envoyer. Rien ne part tout seul.</p>
      <label>Ton nom<input name="nom" type="text" required autocomplete="name"></label>
      <label>Courriel<input name="courriel" type="email" required autocomplete="email"></label>
      <label>Ville<input name="ville" type="text" autocomplete="address-level2"></label>
      <label>Pourquoi ce concept<textarea name="pourquoi" rows="4" required></textarea></label>
      <p class="portail-form__error" id="portailFormError" hidden></p>
      <div class="portail-fiche__actions">
        <button type="submit" class="btn btn--primary">Préparer ma candidature</button>
      </div>
      <p class="portail-form__done" id="portailFormDone" hidden></p>
    </form>
  `;
}

function saveConceptForPlan(concept) {
  const payload = {
    id: concept.id,
    nom: concept.nom,
    pitch: concept.pitch,
    secteur: concept.secteur,
    client: concept.client,
    douleur: concept.douleur,
    offre: concept.offre,
    modele: concept.modele,
    savedAt: new Date().toISOString(),
  };
  localStorage.setItem('bildop_portail', JSON.stringify(payload));
}

function initPortail() {
  const grid = document.getElementById('portailGrid');
  const filters = document.getElementById('portailFilters');
  const search = document.getElementById('portailSearch');
  const count = document.getElementById('portailCount');
  const empty = document.getElementById('portailEmpty');
  const dialog = document.getElementById('portailDialog');
  const fiche = document.getElementById('portailFiche');
  if (!grid || !filters || !search || !dialog || !fiche) return;

  let univers = 'tous';
  let lastFocus = null;

  filters.innerHTML = PORTAIL_UNIVERS.map((item) =>
    `<button type="button" class="portail-chip${item.id === 'tous' ? ' is-active' : ''}" data-univers="${item.id}">${escapeHtml(item.label)}</button>`
  ).join('');

  function paint() {
    const list = filterConcepts(search.value, univers);
    grid.innerHTML = list.map(renderCard).join('');
    const total = PORTAIL_CONCEPTS.length;
    count.textContent = list.length === total
      ? `${total} concepts dans cette sélection`
      : `${list.length} concept${list.length > 1 ? 's' : ''} sur ${total}`;
    empty.hidden = list.length !== 0;
  }

  function closeFiche() {
    dialog.hidden = true;
    document.body.classList.remove('portail-lock');
    if (lastFocus && typeof lastFocus.focus === 'function') lastFocus.focus();
    if (location.hash) {
      history.replaceState(null, '', location.pathname + location.search);
    }
  }

  function openFiche(id) {
    const concept = getConcept(id);
    if (!concept) return;
    lastFocus = document.activeElement;
    fiche.innerHTML = renderFiche(concept);
    dialog.hidden = false;
    document.body.classList.add('portail-lock');
    const closeBtn = fiche.querySelector('[data-close]');
    if (closeBtn) closeBtn.focus();
    if (location.hash !== '#' + id) {
      history.replaceState(null, '', '#' + id);
    }
  }

  filters.addEventListener('click', (event) => {
    const button = event.target.closest('[data-univers]');
    if (!button) return;
    univers = button.dataset.univers;
    filters.querySelectorAll('.portail-chip').forEach((chip) => {
      chip.classList.toggle('is-active', chip === button);
    });
    paint();
  });

  search.addEventListener('input', paint);

  grid.addEventListener('click', (event) => {
    const opener = event.target.closest('[data-open], .portail-card');
    if (!opener) return;
    const id = opener.dataset.open || opener.dataset.id;
    if (id) openFiche(id);
  });

  dialog.addEventListener('click', (event) => {
    if (event.target === dialog) closeFiche();
  });

  fiche.addEventListener('click', (event) => {
    if (event.target.closest('[data-close]')) {
      closeFiche();
      return;
    }
    const plan = event.target.closest('[data-plan]');
    if (plan) {
      const concept = getConcept(plan.dataset.plan);
      if (!concept) return;
      saveConceptForPlan(concept);
      window.location.href = 'questionnaire.html';
      return;
    }
    const apply = event.target.closest('[data-apply]');
    if (apply) {
      const form = document.getElementById('portailForm');
      if (form) {
        form.hidden = false;
        const field = form.querySelector('input[name="nom"]');
        if (field) field.focus();
      }
    }
  });

  fiche.addEventListener('submit', (event) => {
    const form = event.target;
    if (!(form instanceof HTMLFormElement) || form.id !== 'portailForm') return;
    event.preventDefault();
    const error = document.getElementById('portailFormError');
    const done = document.getElementById('portailFormDone');
    const data = new FormData(form);
    const nom = String(data.get('nom') || '').trim();
    const courriel = String(data.get('courriel') || '').trim();
    const ville = String(data.get('ville') || '').trim();
    const pourquoi = String(data.get('pourquoi') || '').trim();
    const conceptId = (location.hash || '').replace('#', '');
    const concept = getConcept(conceptId);
    if (!nom || !courriel || !pourquoi || !courriel.includes('@')) {
      if (error) {
        error.hidden = false;
        error.textContent = 'Il manque ton nom, un courriel valide, ou la raison.';
      }
      return;
    }
    if (error) error.hidden = true;
    const entry = {
      conceptId,
      concept: concept ? concept.nom : conceptId,
      nom,
      courriel,
      ville,
      pourquoi,
      savedAt: new Date().toISOString(),
    };
    let existing = [];
    try {
      existing = JSON.parse(localStorage.getItem('bildop_portail_candidatures') || '[]');
      if (!Array.isArray(existing)) existing = [];
    } catch (e) {
      existing = [];
    }
    existing.push(entry);
    localStorage.setItem('bildop_portail_candidatures', JSON.stringify(existing));
    const subject = encodeURIComponent('Candidature portail Bildop — ' + entry.concept);
    const body = encodeURIComponent(
      'Nom : ' + nom + '\nVille : ' + (ville || '—') + '\nConcept : ' + entry.concept + '\n\n' + pourquoi
    );
    const href = 'mailto:info@bildop.com?subject=' + subject + '&body=' + body;
    if (done) {
      done.hidden = false;
      done.innerHTML = 'Candidature gardée sur cet appareil. <a href="' + href + '">Ouvre ton courriel pour l\'envoyer à Bildop</a>. Rien n\'est transmis tant que tu ne l\'envoies pas.';
    }
    form.querySelectorAll('input, textarea, button').forEach((el) => {
      el.disabled = true;
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !dialog.hidden) closeFiche();
  });

  paint();

  const fromHash = (location.hash || '').replace('#', '');
  if (fromHash && getConcept(fromHash)) openFiche(fromHash);
}

if (typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', initPortail);
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    PORTAIL_CONCEPTS,
    PORTAIL_UNIVERS,
    filterConcepts,
    getConcept,
  };
}
