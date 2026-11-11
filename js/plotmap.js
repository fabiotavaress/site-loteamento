/* Gera o croqui esquemático das 14 chácaras ao longo de uma via de acesso,
   colorido por status. Uso: renderPlotMap(container, { interactive, highlightId }) */
function renderPlotMap(container, options) {
  options = options || {};
  var interactive = options.interactive !== false;
  var highlightId = options.highlightId || null;

  var W = 900, H = 640;
  var A = { x: 760, y: 600 }; // entrada / acesso
  var B = { x: 170, y: 70 };  // em direção à lagoa
  var n = CHACARAS.length;
  var gap = 0.18;             // espaço entre lotes (fração do segmento)
  var halfWidth = 72;

  var dx = B.x - A.x, dy = B.y - A.y;
  var len = Math.sqrt(dx * dx + dy * dy);
  var ux = dx / len, uy = dy / len;     // vetor unitário ao longo da via
  var px = -uy, py = ux;                 // vetor perpendicular

  function pointAt(t) {
    return { x: A.x + dx * t, y: A.y + dy * t };
  }

  var parts = [];

  parts.push(
    '<rect width="' + W + '" height="' + H + '" fill="var(--map-bg,#f7f5ef)"/>'
  );

  // lagoa esquemática perto do ponto B
  parts.push(
    '<path d="M 40 10 C 10 70, 30 150, 90 160 C 160 175, 170 90, 130 40 C 105 10, 65 0, 40 10 Z" ' +
    'fill="var(--map-water,#7fa8a0)" opacity="0.55"></path>' +
    '<text x="60" y="95" class="map-water-label">Lagoa Tiririca</text>'
  );

  // via de acesso
  parts.push(
    '<line x1="' + A.x + '" y1="' + A.y + '" x2="' + B.x + '" y2="' + B.y +
    '" stroke="var(--map-road,#b9ad92)" stroke-width="10" stroke-linecap="round" stroke-dasharray="2 14"></line>'
  );
  parts.push(
    '<circle cx="' + A.x + '" cy="' + A.y + '" r="14" fill="var(--map-road,#b9ad92)"></circle>' +
    '<text x="' + (A.x + 22) + '" y="' + (A.y + 5) + '" class="map-gate-label">Acesso</text>'
  );

  for (var i = 0; i < n; i++) {
    var chacara = CHACARAS[i];
    var t0 = i / n + gap / n;
    var t1 = (i + 1) / n - gap / n;
    var p0 = pointAt(t0);
    var p1 = pointAt(t1);

    var side = i % 2 === 0 ? 1 : 0.86; // leve variação orgânica
    var hw = halfWidth * side;

    var c1x = p0.x + px * hw, c1y = p0.y + py * hw;
    var c2x = p1.x + px * hw, c2y = p1.y + py * hw;
    var c3x = p1.x - px * hw, c3y = p1.y - py * hw;
    var c4x = p0.x - px * hw, c4y = p0.y - py * hw;

    var mid = pointAt((t0 + t1) / 2);
    var isSold = chacara.status === "vendida";
    var isHighlight = highlightId && Number(highlightId) === chacara.id;

    var cls = "plot " + (isSold ? "plot-vendida" : "plot-disponivel") + (isHighlight ? " plot-highlight" : "");

    var polygon =
      '<polygon class="' + cls + '" points="' +
      c1x.toFixed(1) + ',' + c1y.toFixed(1) + ' ' +
      c2x.toFixed(1) + ',' + c2y.toFixed(1) + ' ' +
      c3x.toFixed(1) + ',' + c3y.toFixed(1) + ' ' +
      c4x.toFixed(1) + ',' + c4y.toFixed(1) + '">' +
      '<title>Chácara ' + chacaraNumero(chacara.id) + ' — ' + (isSold ? 'Vendida' : 'Disponível') + '</title>' +
      '</polygon>';

    var label =
      '<text x="' + mid.x.toFixed(1) + '" y="' + (mid.y - 4).toFixed(1) + '" class="plot-number">' +
      chacaraNumero(chacara.id) + '</text>' +
      '<text x="' + mid.x.toFixed(1) + '" y="' + (mid.y + 12).toFixed(1) + '" class="plot-status">' +
      (isSold ? 'VENDIDA' : 'DISPONÍVEL') + '</text>';

    if (interactive) {
      parts.push(
        '<a href="chacara.html?id=' + chacara.id + '" class="plot-link">' + polygon + label + '</a>'
      );
    } else {
      parts.push(polygon + label);
    }
  }

  container.innerHTML =
    '<svg viewBox="0 0 ' + W + ' ' + H + '" width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">' +
    parts.join("") +
    '</svg>';
}
