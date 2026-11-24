/* ---------- alinhamento da galeria (coluna da direita acompanha a foto grande) ---------- */
(function () {
  "use strict";

  var hero = document.querySelector(".gallery-item--hero");
  var stack = document.querySelector(".gallery-stack");
  if (!hero || !stack) return;

  function sync() {
    if (window.innerWidth <= 760) {
      stack.style.height = "";
      return;
    }
    stack.style.height = hero.getBoundingClientRect().height + "px";
  }

  window.addEventListener("load", sync);
  window.addEventListener("resize", sync);
  sync();
})();

/* ---------- lightbox da galeria ---------- */
(function () {
  "use strict";

  var lightbox = document.getElementById("lightbox");
  var thumbs = Array.prototype.slice.call(document.querySelectorAll(".gallery-thumb"));
  if (!lightbox || !thumbs.length) return;

  var imgEl = document.getElementById("lightboxImg");
  var captionEl = document.getElementById("lightboxCaption");
  var closeBtn = document.getElementById("lightboxClose");
  var prevBtn = document.getElementById("lightboxPrev");
  var nextBtn = document.getElementById("lightboxNext");
  var current = 0;

  function show(index) {
    current = (index + thumbs.length) % thumbs.length;
    var thumb = thumbs[current];
    var caption = thumb.getAttribute("data-caption") || "";
    imgEl.src = thumb.getAttribute("data-full");
    imgEl.alt = caption;
    captionEl.textContent = caption;
  }

  function open(index) {
    show(index);
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("lb-lock");
  }

  function close() {
    lightbox.classList.remove("is-open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.classList.remove("lb-lock");
    imgEl.src = "";
  }

  thumbs.forEach(function (thumb, i) {
    thumb.addEventListener("click", function () { open(i); });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () { show(current - 1); });
  nextBtn.addEventListener("click", function () { show(current + 1); });

  lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) close();
  });

  document.addEventListener("keydown", function (e) {
    if (!lightbox.classList.contains("is-open")) return;
    if (e.key === "Escape") close();
    if (e.key === "ArrowLeft") show(current - 1);
    if (e.key === "ArrowRight") show(current + 1);
  });
})();

/* ---------- simulador de financiamento ---------- */
(function () {
  "use strict";

  var panel = document.querySelector(".sim-panel");
  if (!panel) return;

  var PRICE = 380000;
  var WHATSAPP_NUMBER = "5531990762890";

  var entradaButtons = Array.prototype.slice.call(document.querySelectorAll("#simEntrada .sim-option"));
  var selectPrazo = document.getElementById("simPrazo");
  var selectLote = document.getElementById("simLote");
  var ipcaInput = document.getElementById("simIpca");
  var ipcaOut = document.getElementById("simIpcaOut");
  var reajusteOut = document.getElementById("simReajuste");

  var outEntrada = document.getElementById("simOutEntrada");
  var outSaldo = document.getElementById("simOutSaldo");
  var outQtd = document.getElementById("simOutQtd");
  var outParcela = document.getElementById("simOutParcela");
  var outTotal = document.getElementById("simOutTotal");
  var tableBody = document.querySelector("#simTable tbody");
  var whatsappBtn = document.getElementById("simWhatsapp");

  var currentEntradaPct = 10;
  entradaButtons.forEach(function (btn) {
    if (parseInt(btn.getAttribute("data-value"), 10) === currentEntradaPct) {
      btn.classList.add("is-active");
    }
  });

  function formatBRL(v) {
    return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL", minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }

  function formatPct(v) {
    var s = v.toFixed(1);
    if (s.slice(-2) === ".0") s = s.slice(0, -2);
    return s;
  }

  function updateProjection(parcelaInicial, prazo) {
    var ipca = parseFloat(ipcaInput.value) || 0;
    var taxaAnual = (ipca / 100) + 0.06;
    ipcaOut.textContent = formatPct(ipca) + "% ao ano";
    reajusteOut.textContent = "Reajuste anual simulado: " + formatPct(taxaAnual * 100) + "% ao ano";

    var anos = Math.ceil(prazo / 12);
    var rows = [];
    var totalParcelas = 0;
    var valorAno = parcelaInicial;
    for (var i = 0; i < anos; i++) {
      var mesesNoAno = Math.min(12, prazo - i * 12);
      if (i > 0) valorAno = valorAno * (1 + taxaAnual);
      totalParcelas += valorAno * mesesNoAno;
      rows.push("<tr><td>" + (i + 1) + "º ano</td><td>" + formatBRL(valorAno) + "</td></tr>");
    }
    tableBody.innerHTML = rows.join("");

    var entrada = PRICE * (currentEntradaPct / 100);
    outTotal.textContent = formatBRL(entrada + totalParcelas);
  }

  function updateWhatsapp(entrada, prazo, parcela) {
    var loteVal = selectLote.value;
    var msg = "Olá! Simulei o financiamento do Recanto da Lagoa";
    msg += loteVal ? " para a chácara " + loteVal : "";
    msg += ". Entrada de " + currentEntradaPct + "% (" + formatBRL(entrada) + "), prazo de " + prazo +
      " meses e parcela inicial de " + formatBRL(parcela) + ". Gostaria de receber uma proposta.";
    whatsappBtn.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
  }

  function recalc() {
    var pct = currentEntradaPct / 100;
    var prazo = parseInt(selectPrazo.value, 10);
    var entrada = PRICE * pct;
    var saldo = PRICE - entrada;
    var parcela = saldo / prazo;

    outEntrada.textContent = formatBRL(entrada);
    outSaldo.textContent = formatBRL(saldo);
    outQtd.textContent = prazo + "x";
    outParcela.textContent = formatBRL(parcela);

    updateProjection(parcela, prazo);
    updateWhatsapp(entrada, prazo, parcela);
  }

  entradaButtons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      entradaButtons.forEach(function (b) {
        b.classList.remove("is-active");
        b.setAttribute("aria-checked", "false");
      });
      btn.classList.add("is-active");
      btn.setAttribute("aria-checked", "true");
      currentEntradaPct = parseInt(btn.getAttribute("data-value"), 10);
      recalc();
    });
  });
  selectPrazo.addEventListener("change", recalc);
  selectLote.addEventListener("change", recalc);
  ipcaInput.addEventListener("input", recalc);

  recalc();
})();

(function () {
  "use strict";

  // header: transparent over the cover, light bar after scrolling
  var nav = document.getElementById("nav");
  var updateNav = function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  // mobile menu
  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  var setMenu = function (open) {
    links.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
  };
  burger.addEventListener("click", function () {
    setMenu(!links.classList.contains("open"));
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () { setMenu(false); });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") setMenu(false);
  });

  // sections fade in as they enter the screen
  var items = document.querySelectorAll("[data-reveal]");
  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("is-visible"); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        io.unobserve(entry.target);
      }
    });
  }, { rootMargin: "0px 0px -8% 0px", threshold: 0.1 });
  items.forEach(function (el) { io.observe(el); });
})();
