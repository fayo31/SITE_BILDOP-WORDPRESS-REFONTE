// Vercel Serverless Function — Bildop AI Suggest
// Proxy pour Claude API, protege la cle API cote serveur

export default async function handler(req, res) {
  // CORS
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });

  const { question, hint, previousAnswers, questionId, mode } = req.body;

  if (!question) return res.status(400).json({ error: 'Missing question' });

  // Build context from previous answers
  const contextLines = [];
  if (previousAnswers && typeof previousAnswers === 'object') {
    for (const [qId, data] of Object.entries(previousAnswers)) {
      if (data.answer && data.answer.trim()) {
        contextLines.push(`Q: ${data.questionText}\nR: ${data.answer}`);
      }
    }
  }

  const contextBlock = contextLines.length > 0
    ? `\n\nVoici ce que l'entrepreneur a deja repondu:\n${contextLines.join('\n\n')}`
    : '';

  const userDraft = req.body.currentDraft || '';

  let systemPrompt, userPrompt;

  if (mode === 'refresh') {
    // Mode rafraichir — ameliorer la reponse existante
    systemPrompt = `Tu es un conseiller d'affaires experimente au Quebec. Tu aides un entrepreneur a ameliorer ses reponses pour un plan d'affaires.
Ton role:
- Ameliorer la reponse existante en la rendant plus precise, professionnelle et complete
- Utiliser le contexte des reponses precedentes pour enrichir
- Garder le ton de l'entrepreneur mais le rendre "banker-ready"
- Ecrire en francais quebecois professionnel
- Etre ANTI-COMPLAISANCE: si la reponse est faible ou vague, ameliore-la significativement
- Maximum 3-4 phrases. Concis et percutant.`;

    userPrompt = `Question: "${question}"${hint ? `\nIndice: ${hint}` : ''}${contextBlock}

La reponse actuelle de l'entrepreneur: "${userDraft}"

Ameliore cette reponse pour qu'elle soit plus solide, precise et credible. Garde l'essence mais rends-la professionnelle.`;

  } else {
    // Mode suggestion — generer un premier jet
    systemPrompt = `Tu es un conseiller d'affaires experimente au Quebec. Tu aides un entrepreneur a remplir son plan d'affaires en lui suggerant des reponses intelligentes.
Ton role:
- Generer une suggestion de reponse basee sur le contexte des reponses precedentes
- Si pas assez de contexte, donner un exemple realiste et pertinent au secteur
- Ecrire en francais quebecois professionnel
- Etre ANTI-COMPLAISANCE: proposer des reponses realistes, pas optimistes
- Maximum 3-4 phrases. Concis et percutant.
- Ne PAS mettre de guillemets autour de ta reponse.`;

    userPrompt = `Question: "${question}"${hint ? `\nIndice: ${hint}` : ''}${contextBlock}

Genere une suggestion de reponse pertinente et realiste pour cette question. Base-toi sur le contexte des reponses precedentes si disponible.`;
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': process.env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 300,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    });

    if (!response.ok) {
      const err = await response.text();
      console.error('Claude API error:', err);
      return res.status(500).json({ error: 'AI generation failed' });
    }

    const data = await response.json();
    const suggestion = data.content?.[0]?.text || '';

    return res.status(200).json({ suggestion });
  } catch (err) {
    console.error('Error:', err);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
