(function () {
  "use strict";

  var nav = document.getElementById("nav");
  var updateNav = function () {
    nav.classList.toggle("is-scrolled", window.scrollY > 40);
  };
  updateNav();
  window.addEventListener("scroll", updateNav, { passive: true });

  var burger = document.getElementById("navBurger");
  var links = document.querySelector(".nav-links");
  burger.addEventListener("click", function () {
    var open = links.classList.toggle("open");
    document.body.classList.toggle("menu-open", open);
    burger.setAttribute("aria-expanded", open);
  });
  links.querySelectorAll("a").forEach(function (a) {
    a.addEventListener("click", function () {
      links.classList.remove("open");
      document.body.classList.remove("menu-open");
    });
  });
})();
