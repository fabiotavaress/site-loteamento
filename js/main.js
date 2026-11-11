(function () {
  "use strict";

  var disponiveis = CHACARAS.filter(function (c) { return c.status === "disponivel"; });
  var vendidas = CHACARAS.filter(function (c) { return c.status === "vendida"; });

  /* ---------- stat card no hero ---------- */
  document.querySelectorAll("[data-stat='total']").forEach(function (el) { el.textContent = EMPREENDIMENTO.totalChacaras; });
  document.querySelectorAll("[data-stat='area']").forEach(function (el) { el.textContent = EMPREENDIMENTO.areaCada; });
  document.querySelectorAll("[data-stat='disponiveis']").forEach(function (el) { el.textContent = disponiveis.length; });
  document.querySelectorAll("[data-stat='preco']").forEach(function (el) { el.textContent = formatPreco(EMPREENDIMENTO.precoAPartir); });

  /* ---------- pills ---------- */
  var pillDisponiveis = document.getElementById("pillDisponiveis");
  var pillVendidas = document.getElementById("pillVendidas");
  if (pillDisponiveis) pillDisponiveis.textContent = "Disponíveis (" + disponiveis.length + ")";
  if (pillVendidas) pillVendidas.textContent = "Vendidas (" + vendidas.length + ")";

  /* ---------- legenda do mapa ---------- */
  var legendaDisponiveis = document.getElementById("legendaDisponiveis");
  var legendaVendidas = document.getElementById("legendaVendidas");
  if (legendaDisponiveis) {
    legendaDisponiveis.textContent = disponiveis.map(function (c) { return chacaraNumero(c.id); }).join(" · ");
  }
  if (legendaVendidas) {
    legendaVendidas.textContent = vendidas.map(function (c) { return chacaraNumero(c.id); }).join(" · ");
  }

  /* ---------- mapas (preview + interativo) ---------- */
  var mapPreview = document.getElementById("mapPreview");
  if (mapPreview) renderPlotMap(mapPreview, { interactive: true });

  var mapFull = document.getElementById("mapFull");
  if (mapFull) renderPlotMap(mapFull, { interactive: true });

  /* ---------- grid de chácaras ---------- */
  var grid = document.getElementById("chacarasGrid");
  if (grid) {
    CHACARAS.forEach(function (c) {
      var isSold = c.status === "vendida";
      var numero = chacaraNumero(c.id);
      var card = document.createElement("div");
      card.className = "chacara-card" + (isSold ? " is-sold" : "");

      var waMsg = "Olá, tenho interesse na Chácara " + numero + " do Recanto da Lagoa.";

      card.innerHTML =
        '<div class="chacara-visual">' +
          '<span class="chacara-number">' + numero + '</span>' +
          '<span class="status-pill ' + (isSold ? 'status-vendida' : 'status-disponivel') + '">' +
            (isSold ? 'Vendida' : 'Disponível') +
          '</span>' +
        '</div>' +
        '<div class="chacara-body">' +
          '<h3>Chácara ' + numero + '</h3>' +
          '<p>' + EMPREENDIMENTO.areaCada + '</p>' +
          '<p class="chacara-price">' + (isSold ? 'Indisponível' : 'A partir de ' + formatPreco(EMPREENDIMENTO.precoAPartir)) + '</p>' +
          '<div class="chacara-actions">' +
            '<a class="link-arrow" href="chacara.html?id=' + c.id + '">Ver detalhes →</a>' +
            (isSold ? '' : '<a class="link-arrow link-whatsapp" target="_blank" rel="noopener" href="' + whatsappLink(waMsg) + '">WhatsApp</a>') +
          '</div>' +
        '</div>';

      grid.appendChild(card);
    });
  }
})();
