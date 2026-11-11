(function () {
  "use strict";

  var params = new URLSearchParams(window.location.search);
  var id = Number(params.get("id"));
  var chacara = getChacara(id);

  var root = document.getElementById("chacaraRoot");
  var notFound = document.getElementById("chacaraNotFound");

  if (!chacara) {
    if (root) root.style.display = "none";
    if (notFound) notFound.style.display = "block";
    return;
  }

  var numero = chacaraNumero(chacara.id);
  var isSold = chacara.status === "vendida";

  document.title = "Chácara " + numero + " — Recanto da Lagoa";

  document.querySelectorAll("[data-chacara='numero']").forEach(function (el) { el.textContent = numero; });
  document.querySelectorAll("[data-chacara='area']").forEach(function (el) { el.textContent = EMPREENDIMENTO.areaCada; });

  var statusEls = document.querySelectorAll("[data-chacara='status']");
  statusEls.forEach(function (el) {
    el.textContent = isSold ? "Vendida" : "Disponível";
    el.classList.add(isSold ? "status-vendida" : "status-disponivel");
  });

  var precoEl = document.getElementById("chacaraPreco");
  if (precoEl) {
    precoEl.textContent = isSold
      ? "Esta chácara já foi vendida"
      : "A partir de " + formatPreco(EMPREENDIMENTO.precoAPartir);
  }

  var waMsg = "Olá, tenho interesse na Chácara " + numero + " do Recanto da Lagoa.";
  document.querySelectorAll("[data-whatsapp-link]").forEach(function (a) {
    a.href = whatsappLink(waMsg);
  });

  var soldNotice = document.getElementById("soldNotice");
  if (soldNotice) soldNotice.style.display = isSold ? "block" : "none";

  var ctaBuy = document.getElementById("ctaComprar");
  if (ctaBuy) ctaBuy.style.display = isSold ? "none" : "inline-flex";

  var miniMap = document.getElementById("miniMap");
  if (miniMap) renderPlotMap(miniMap, { interactive: false, highlightId: chacara.id });

  /* outras chácaras disponíveis (sugestão quando vendida) */
  var outrasWrap = document.getElementById("outrasDisponiveis");
  if (outrasWrap && isSold) {
    var disponiveis = CHACARAS.filter(function (c) { return c.status === "disponivel"; });
    outrasWrap.innerHTML = disponiveis.map(function (c) {
      return '<a class="chip" href="chacara.html?id=' + c.id + '">Chácara ' + chacaraNumero(c.id) + '</a>';
    }).join("");
  }
})();
