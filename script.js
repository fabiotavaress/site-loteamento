/* ---------- ao atualizar a página, volta direto para onde estava (sem mostrar a capa antes) ---------- */
(function () {
  var KEY = "scrollY:" + location.pathname;
  try {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
  } catch (e) {}
  var save = function () {
    try { sessionStorage.setItem(KEY, String(Math.round(window.scrollY))); } catch (e) {}
  };
  window.addEventListener("pagehide", save);
  window.addEventListener("beforeunload", save);

  var y = 0;
  try { y = parseInt(sessionStorage.getItem(KEY), 10) || 0; } catch (e) {}
  var nav = performance.getEntriesByType && performance.getEntriesByType("navigation")[0];
  var isReload = nav ? nav.type === "reload" || nav.type === "back_forward" : true;
  if (!y || !isReload) return;

  var root = document.documentElement;
  var jump = function () {
    var prev = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, y);
    root.style.scrollBehavior = prev;
  };
  jump();
  // se algo mudar de altura enquanto carrega, corrige uma vez (só se a pessoa ainda não rolou)
  var moved = false;
  var onUser = function () { moved = true; };
  window.addEventListener("wheel", onUser, { passive: true, once: true });
  window.addEventListener("touchstart", onUser, { passive: true, once: true });
  window.addEventListener("load", function () {
    if (!moved && Math.abs(window.scrollY - y) > 2) jump();
  });
})();

/* ---------- mapa interativo das chácaras ---------- */
(function () {
  "use strict";

  var svg = document.getElementById("mapaLotes");
  if (!svg) return;

  var VENDIDAS = ["09", "10", "11", "12", "13"];
  var WHATSAPP_NUMBER = "5531990762890";

  var panel = document.getElementById("lotPanel");
  var panelClose = document.getElementById("lotPanelClose");
  var panelId = document.getElementById("lotPanelId");
  var panelWhatsapp = document.getElementById("lotPanelWhatsapp");
  var selected = null;

  function closePanel() {
    panel.classList.remove("is-open");
    panel.setAttribute("aria-hidden", "true");
    if (selected) {
      selected.classList.remove("selecionado");
      selected.setAttribute("aria-pressed", "false");
      selected = null;
    }
  }

  function openPanel(g, n) {
    if (selected) {
      selected.classList.remove("selecionado");
      selected.setAttribute("aria-pressed", "false");
    }
    g.classList.add("selecionado");
    g.setAttribute("aria-pressed", "true");
    selected = g;

    panelId.textContent = n;
    var msg = "Olá! Vi o site do Recanto da Lagoa e tenho interesse na chácara " + n + ".";
    panelWhatsapp.href = "https://wa.me/" + WHATSAPP_NUMBER + "?text=" + encodeURIComponent(msg);
    panel.classList.add("is-open");
    panel.setAttribute("aria-hidden", "false");
  }

  function toggleLote(g, n) {
    if (selected === g) {
      closePanel();
    } else {
      openPanel(g, n);
    }
  }

  svg.querySelectorAll(".lote-g").forEach(function (g) {
    var n = g.getAttribute("data-lote");
    var vendida = VENDIDAS.indexOf(n) !== -1;
    g.classList.add(vendida ? "vendida" : "disponivel");
    g.querySelector(".st").textContent = vendida ? "VENDIDA" : "DISPONÍVEL";
    if (!vendida) {
      g.setAttribute("tabindex", "0");
      g.setAttribute("role", "button");
      g.setAttribute("aria-pressed", "false");
      g.setAttribute("aria-label", "Chácara " + n + " — disponível, ver detalhes");
      g.addEventListener("click", function () { toggleLote(g, n); });
      g.addEventListener("keydown", function (e) {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          toggleLote(g, n);
        }
      });
    }
  });

  panelClose.addEventListener("click", closePanel);
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && panel.classList.contains("is-open")) closePanel();
  });
})();

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
  var themeMeta = document.getElementById("themeColor");
  // phones: the cover has BLEED px of extra photo on top and the page rests scrolled by that amount,
  // so iOS Safari shows that strip of the photo behind the clock (it shows the page there only when
  // the page is scrolled and nothing pinned covers the top edge)
  var BLEED = window.matchMedia("(max-width: 900px)").matches ? 64 : 0;
  var root = document.documentElement;
  var updateNav = function () {
    var y = window.scrollY;
    var scrolled = y > BLEED + 40;
    nav.classList.toggle("is-scrolled", scrolled);
    root.classList.toggle("at-top", !scrolled);
    // only when pulled above the bleed is there no photo behind the clock: use the sky colour instead
    root.classList.toggle("above-bleed", BLEED > 0 && y < BLEED - 1);
    if (themeMeta) themeMeta.setAttribute("content", scrolled ? "#f8f6ef" : "#251e20");
    updateEdge(scrolled);
  };
  // phones: iOS 26 Safari tints the frosted strip at the bottom of the screen with the body colour,
  // so the body takes the colour of whatever section is at the bottom edge (no visible seam)
  function updateEdge(scrolled) {
    if (!BLEED) return;
    var body = document.body;
    if (!scrolled) { body.style.backgroundColor = ""; root.style.backgroundColor = ""; return; }
    var el = document.elementFromPoint(12, window.innerHeight - 2);
    var sec = el && el.closest("[data-edge], section, .footer-bottom, footer");
    if (!sec) return;
    var color = sec.getAttribute("data-edge") || getComputedStyle(sec).backgroundColor;
    if (color && color !== "rgba(0, 0, 0, 0)" && color !== "transparent") {
      body.style.backgroundColor = color;
      // html too: past the end of the page Safari shows the root colour (was a light line under the footer)
      root.style.backgroundColor = color;
    }
  }
  // if the page is pulled above the resting position (photo behind the clock), glide back to it
  // as soon as the finger is lifted and the scroll settles
  if (BLEED) {
    var touching = false, snapT = null;
    var snapBack = function () {
      clearTimeout(snapT);
      snapT = setTimeout(function () {
        if (!touching && window.scrollY < BLEED) window.scrollTo({ top: BLEED, left: 0, behavior: "smooth" });
      }, 120);
    };
    window.addEventListener("touchstart", function () { touching = true; clearTimeout(snapT); }, { passive: true });
    window.addEventListener("touchend", function () { touching = false; snapBack(); }, { passive: true });
    window.addEventListener("touchcancel", function () { touching = false; snapBack(); }, { passive: true });
    window.addEventListener("scroll", function () { if (window.scrollY < BLEED) snapBack(); }, { passive: true });
  }
  if (BLEED && window.scrollY < BLEED && !location.hash) {
    var prevSB = root.style.scrollBehavior;
    root.style.scrollBehavior = "auto";
    window.scrollTo(0, BLEED);
    root.style.scrollBehavior = prevSB;
  }
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  // mobile menu
  var burger = document.getElementById("navBurger");
  var links = document.getElementById("navLinks");
  var setMenu = function (open) {
    links.classList.toggle("open", open);
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open ? "true" : "false");
    burger.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
  };
  document.addEventListener("click", function (e) {
    if (links.classList.contains("open") && !e.target.closest(".nav")) setMenu(false);
  });
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

/* ---------- botão flutuante do WhatsApp some no topo da página ---------- */
(function () {
  "use strict";

  var fab = document.querySelector(".whatsapp-float");
  if (!fab) return;

  function toggle() {
    fab.classList.toggle("is-visible", window.scrollY > 80);
  }
  toggle();
  window.addEventListener("scroll", toggle, { passive: true });
})();
