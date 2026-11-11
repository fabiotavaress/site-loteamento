(function () {
  "use strict";

  var burger = document.getElementById("navBurger");
  if (burger) {
    burger.addEventListener("click", function () {
      var open = document.body.classList.toggle("menu-open");
      burger.setAttribute("aria-expanded", open);
    });
    document.querySelectorAll("#mainNav a").forEach(function (link) {
      link.addEventListener("click", function () {
        document.body.classList.remove("menu-open");
      });
    });
  }

  var langToggle = document.getElementById("langToggle");
  if (langToggle) {
    var currentLang = "pt";
    var applyLang = function (lang) {
      currentLang = lang;
      document.documentElement.lang = lang === "pt" ? "pt-BR" : "en";
      document.querySelectorAll("[data-" + lang + "]").forEach(function (el) {
        el.textContent = el.getAttribute("data-" + lang);
      });
      langToggle.textContent = lang === "pt" ? "EN" : "PT";
    };
    langToggle.addEventListener("click", function () {
      applyLang(currentLang === "pt" ? "en" : "pt");
    });
  }
})();
