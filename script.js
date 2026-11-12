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
