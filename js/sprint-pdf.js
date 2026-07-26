/* BILDOP — export PDF imprimable du Sprint 90 jours */
(function () {
  'use strict';

  function escapeHtml(value) {
    return String(value ?? '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  function actionList(actions) {
    if (!Array.isArray(actions) || actions.length === 0) {
      return '<p>Aucune action générée.</p>';
    }

    return '<ol>' + actions.map(function (action) {
      return '<li><strong>' + escapeHtml(action.title) + '</strong><br><span>Responsable : ' +
        escapeHtml(action.resp) + ' · Échéance : ' + escapeHtml(action.delai) +
        ' · Impact : ' + escapeHtml(action.impact) + '</span></li>';
    }).join('') + '</ol>';
  }

  function phaseSection(title, phase) {
    if (!phase) return '';
    return '<section><h2>' + escapeHtml(title) + '</h2>' +
      '<p><strong>Jalon :</strong> ' + escapeHtml(phase.milestone) + '</p>' +
      actionList(phase.actions) + '</section>';
  }

  function okrSection(okrs) {
    if (!okrs || !Array.isArray(okrs.okrs)) return '';
    return '<section><h2>OKRs et KPIs</h2>' + okrs.okrs.map(function (okr) {
      return '<article><h3>' + escapeHtml(okr.num) + ' — ' + escapeHtml(okr.obj) + '</h3><ul>' +
        (okr.krs || []).map(function (kr) {
          return '<li>' + escapeHtml(kr.label) + ' : <strong>' + escapeHtml(kr.target) + '</strong></li>';
        }).join('') + '</ul></article>';
    }).join('') + '</section>';
  }

  window.exportPdf = function exportPdf() {
    if (!window.SP || !SP.data) {
      window.alert('Générez d’abord votre Sprint 90 jours avant de l’exporter.');
      return;
    }

    var printWindow = window.open('', '_blank', 'noopener,noreferrer');
    if (!printWindow) {
      window.alert('Votre navigateur a bloqué la fenêtre d’impression. Autorisez les fenêtres surgissantes puis réessayez.');
      return;
    }

    var businessName = escapeHtml(SP.businessName || 'Ton entreprise');
    var secteur = escapeHtml(SP.secteur || 'Secteur à définir');
    var generatedOn = new Intl.DateTimeFormat('fr-CA', { dateStyle: 'long' }).format(new Date());

    printWindow.document.write('<!doctype html><html lang="fr-CA"><head><meta charset="utf-8">' +
      '<meta name="viewport" content="width=device-width, initial-scale=1"><title>Sprint 90 jours — ' + businessName + '</title>' +
      '<style>@page{size:A4;margin:16mm}body{font-family:Arial,sans-serif;color:#172033;line-height:1.45;font-size:11pt}header{border-bottom:4px solid #00C1FF;padding-bottom:16px;margin-bottom:24px}h1{color:#00045C;margin:0 0 6px;font-size:24pt}h2{color:#00045C;font-size:16pt;margin:26px 0 10px;border-bottom:1px solid #dbe3ea;padding-bottom:6px}h3{font-size:12pt;margin:16px 0 6px}section{break-inside:avoid}ol,ul{padding-left:24px}li{margin:0 0 9px}li span,.meta,footer{color:#526070;font-size:9.5pt}.notice{background:#fff7e6;border-left:4px solid #f59e0b;padding:12px 14px;margin-top:22px}footer{border-top:1px solid #dbe3ea;margin-top:28px;padding-top:12px}@media print{body{font-size:10pt}h1{font-size:22pt}}</style></head><body>' +
      '<header><h1>Sprint 90 jours</h1><div><strong>' + businessName + '</strong> · ' + secteur + '</div><div class="meta">Généré le ' + generatedOn + ' · BILDOP</div></header>' +
      phaseSection('Phase 1 — Fondations (jours 1 à 30)', SP.data.phase1) +
      phaseSection('Phase 2 — Momentum (jours 31 à 60)', SP.data.phase2) +
      phaseSection('Phase 3 — Accélération (jours 61 à 90)', SP.data.phase3) +
      okrSection(SP.data.okrs) +
      '<div class="notice"><strong>À valider avant d’agir.</strong> Ce plan est généré à partir de données fournies dans l’outil et ne remplace pas l’avis d’un comptable, avocat ou conseiller financier.</div>' +
      '<footer>Généré par BILDOP · Fait au Québec</footer></body></html>');
    printWindow.document.close();
    printWindow.focus();
    printWindow.addEventListener('load', function () {
      printWindow.print();
    }, { once: true });
  };
}());
