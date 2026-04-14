// Vercel Serverless Function — Bildop Business Plan Generator
// Generates a complete business plan from questionnaire answers using Claude API

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { answers, questions } = req.body;
  if (!answers || !questions) return res.status(400).json({ error: 'Missing data' });

  // Build Q&A context
  const qaContext = questions.map(q => {
    const answer = answers[q.id];
    if (!answer) return null;
    return `Q: ${q.question}\nR: ${answer}`;
  }).filter(Boolean).join('\n\n');

  const businessName = answers[1] || 'Mon entreprise';

  const systemPrompt = `Tu es un redacteur de plans d'affaires professionnel au Quebec. Tu rediges des plans d'affaires complets, realistes et prets a presenter a un banquier ou investisseur.

REGLES ABSOLUES:
- ANTI-COMPLAISANCE: Si les reponses sont vagues ou faibles, le plan doit le signaler honnement. Ne jamais embellir.
- Ecrire en francais quebecois professionnel (pas de France)
- Chiffres et projections REALISTES bases sur le secteur au Quebec
- Citer des sources quand pertinent (Statistique Canada, ISQ, industrie)
- Format: sections HTML avec balises h2, h3, p, ul, li, table
- Ne PAS inclure de balises html, head, body — seulement le contenu des sections
- Chaque section doit etre substantielle (minimum 3-4 paragraphes)`;

  const userPrompt = `Genere un plan d'affaires COMPLET pour "${businessName}" base sur les reponses suivantes du fondateur:

${qaContext}

GENERE LES SECTIONS SUIVANTES en HTML (h2 pour les titres, h3 pour sous-titres, p pour texte, ul/li pour listes, table pour donnees):

1. SOMMAIRE EXECUTIF — Resume du projet, proposition de valeur, objectifs cles
2. DESCRIPTION DE L'ENTREPRISE — Mission, vision, structure juridique, historique
3. ETUDE DE MARCHE — Marche cible, taille, tendances, comportement clients
4. ANALYSE DE LA CONCURRENCE — Concurrents identifies, positionnement, avantages competitifs
5. PRODUITS ET SERVICES — Offre detaillee, prix, differentiation
6. STRATEGIE MARKETING ET VENTES — Canaux, budget, conversion, positionnement prix
7. PLAN OPERATIONNEL — Operations, fournisseurs, technologie, processus
8. EQUIPE DE DIRECTION — Fondateurs, competences, embauches prevues
9. PROJECTIONS FINANCIERES — Revenus an 1-3, couts fixes/variables, seuil de rentabilite, P&L simplifie
10. ANALYSE DES RISQUES — Risques identifies, plan de mitigation, plan B
11. PLAN D'ACTION 90 JOURS — Actions concretes, priorites, jalons

IMPORTANT pour la section financiere:
- Inclure un tableau HTML avec P&L simplifie sur 12 mois (an 1)
- Projections annuelles sur 3 ans
- Seuil de rentabilite en mois
- Si les donnees sont insuffisantes, indiquer clairement ce qui manque

A la fin, ajoute une section "AVERTISSEMENTS ET LIMITES" qui liste honnetement:
- Les faiblesses du plan basees sur les reponses fournies
- Les informations manquantes qui affaiblissent le document
- Les hypotheses qui doivent etre validees`;

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 8000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Claude API error:', err);
      return res.status(500).json({ error: 'Plan generation failed' });
    }

    const data = await response.json();
    const planHTML = data.content?.[0]?.text || '';

    return res.status(200).json({
      html: planHTML,
      businessName,
      generatedAt: new Date().toISOString(),
    });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
