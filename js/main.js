(function () {
  "use strict";

  var WHATSAPP_NUMBER = "5531971267200";

  /* ---------- lots grid ---------- */
  var lotsGrid = document.getElementById("lotsGrid");
  var loteSelect = document.querySelector('select[name="lote"]');
  var totalLotes = 8;

  var hues = [148, 165, 182, 132, 200, 118, 172, 190];

  for (var i = 1; i <= totalLotes; i++) {
    var hue = hues[i - 1];
    var card = document.createElement("div");
    card.className = "lot-card";

    var number = String(i).padStart(2, "0");
    var waMsg = encodeURIComponent(
      "Olá, tenho interesse no Lote " + number + " da Chácaras Recanto da Lagoa."
    );

    card.innerHTML =
      '<div class="lot-visual" style="background:linear-gradient(135deg, hsl(' +
      hue +
      ',38%,28%), hsl(' +
      (hue + 14) +
      ',40%,18%))">' +
      '<svg class="deco" viewBox="0 0 200 150" preserveAspectRatio="none"><path d="M0 110 C40 90 70 130 100 100 C130 70 160 110 200 90 L200 150 L0 150 Z" fill="rgba(255,255,255,0.12)"/></svg>' +
      '<span class="lot-number">Lote ' +
      number +
      "</span>" +
      '<span class="lot-illustrative" data-pt="Imagem ilustrativa" data-en="Illustrative image">Imagem ilustrativa</span>' +
      "</div>" +
      '<div class="lot-body">' +
      '<h3 data-pt="Lote ' +
      number +
      '" data-en="Lot ' +
      number +
      '">Lote ' +
      number +
      "</h3>" +
      '<p data-pt="Metragem e valor sob consulta." data-en="Size and price available on request.">Metragem e valor sob consulta.</p>' +
      '<a class="lot-cta" target="_blank" rel="noopener" href="https://wa.me/' +
      WHATSAPP_NUMBER +
      "?text=" +
      waMsg +
      '"><span data-pt="Consultar no WhatsApp" data-en="Ask on WhatsApp">Consultar no WhatsApp</span> →</a>' +
      "</div>";

    lotsGrid.appendChild(card);

    if (loteSelect) {
      var opt = document.createElement("option");
      opt.value = "Lote " + number;
      opt.textContent = "Lote " + number;
      loteSelect.appendChild(opt);
    }
  }

  /* ---------- mobile nav ---------- */
  var burger = document.getElementById("navBurger");
  burger.addEventListener("click", function () {
    var open = document.body.classList.toggle("menu-open");
    burger.setAttribute("aria-expanded", open);
  });
  document.querySelectorAll("#mainNav a").forEach(function (link) {
    link.addEventListener("click", function () {
      document.body.classList.remove("menu-open");
    });
  });

  /* ---------- language toggle (PT / EN) ---------- */
  var langToggle = document.getElementById("langToggle");
  var currentLang = "pt";

  function applyLang(lang) {
    currentLang = lang;
    document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
    document.querySelectorAll("[data-" + lang + "]").forEach(function (el) {
      el.textContent = el.getAttribute("data-" + lang);
    });
    langToggle.textContent = lang === "pt" ? "EN" : "PT";
  }

  langToggle.addEventListener("click", function () {
    applyLang(currentLang === "pt" ? "en" : "pt");
  });

  /* ---------- contact form -> WhatsApp ---------- */
  var form = document.getElementById("contactForm");
  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var nome = form.nome.value.trim();
    var lote = form.lote.value;
    var mensagem = form.mensagem.value.trim();

    var texto =
      "Olá, me chamo " +
      nome +
      "." +
      (lote ? " Tenho interesse no " + lote + "." : "") +
      " " +
      mensagem;

    window.open(
      "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(texto),
      "_blank"
    );
  });
})();
