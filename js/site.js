(function () {
  var year = document.getElementById("copyright-year");
  if (year) year.textContent = String(new Date().getFullYear());

  var toggle = document.querySelector(".nav-toggle");
  var nav = document.getElementById("site-nav");
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      var open = nav.classList.toggle("open");
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  document.querySelectorAll(".sub-toggle").forEach(function (button) {
    button.addEventListener("click", function () {
      var item = button.closest(".has-sub");
      if (!item) return;
      var open = item.classList.toggle("open");
      button.setAttribute("aria-expanded", open ? "true" : "false");
    });
  });

  document.querySelectorAll("[data-hero]").forEach(function (hero) {
    var slides = hero.querySelectorAll(".hero-slide");
    var dots = hero.querySelectorAll(".dots button");
    var index = 0;
    var timer = null;

    function show(next) {
      index = (next + slides.length) % slides.length;
      slides.forEach(function (slide, i) {
        slide.classList.toggle("is-active", i === index);
      });
      dots.forEach(function (dot, i) {
        if (i === index) dot.setAttribute("aria-current", "true");
        else dot.removeAttribute("aria-current");
      });
    }

    function start() {
      stop();
      timer = setInterval(function () { show(index + 1); }, 5000);
    }

    function stop() {
      if (timer) clearInterval(timer);
      timer = null;
    }

    hero.querySelector(".hero-arrow.prev").addEventListener("click", function () {
      show(index - 1);
      start();
    });
    hero.querySelector(".hero-arrow.next").addEventListener("click", function () {
      show(index + 1);
      start();
    });
    dots.forEach(function (dot, i) {
      dot.addEventListener("click", function () {
        show(i);
        start();
      });
    });
    hero.addEventListener("mouseenter", stop);
    hero.addEventListener("mouseleave", start);
    start();
  });

  document.querySelectorAll("[data-carousel]").forEach(function (carousel) {
    var track = carousel.querySelector(".car-track");
    var cards = track.children;
    var dotsBox = carousel.querySelector(".car-dots");
    var index = 0;

    function perView() {
      if (window.innerWidth <= 700) return 1;
      if (window.innerWidth <= 980) return 2;
      return 3;
    }

    function pages() {
      return Math.max(1, cards.length - perView() + 1);
    }

    function renderDots() {
      dotsBox.innerHTML = "";
      for (var i = 0; i < pages(); i++) {
        var button = document.createElement("button");
        button.type = "button";
        button.setAttribute("aria-label", "Go to slide " + (i + 1));
        if (i === index) button.setAttribute("aria-current", "true");
        button.addEventListener("click", function (event) {
          var label = event.currentTarget.getAttribute("aria-label");
          index = parseInt(label.replace("Go to slide ", ""), 10) - 1;
          move();
        });
        dotsBox.appendChild(button);
      }
    }

    function move() {
      var view = perView();
      var gap = 16;
      var viewport = carousel.querySelector(".car-viewport").getBoundingClientRect().width;
      var cardWidth = (viewport - gap * (view - 1)) / view;
      Array.prototype.forEach.call(cards, function (card) {
        card.style.flex = "0 0 " + cardWidth + "px";
      });
      if (index > cards.length - view) index = Math.max(0, cards.length - view);
      if (index < 0) index = 0;
      track.style.transform = "translateX(" + (-index * (cardWidth + gap)) + "px)";
      renderDots();
    }

    carousel.querySelector(".car-arrow.prev").addEventListener("click", function () {
      index -= 1;
      if (index < 0) index = pages() - 1;
      move();
    });
    carousel.querySelector(".car-arrow.next").addEventListener("click", function () {
      index += 1;
      if (index >= pages()) index = 0;
      move();
    });
    window.addEventListener("resize", function () {
      index = Math.min(index, pages() - 1);
      move();
    });
    move();
  });

  document.querySelectorAll(".flip").forEach(function (card) {
    card.addEventListener("click", function (event) {
      if (window.matchMedia("(hover: none)").matches) {
        if (!card.classList.contains("is-flipped")) {
          event.preventDefault();
          card.classList.add("is-flipped");
        }
      }
    });
  });

  document.querySelectorAll(".accordion").forEach(function (box) {
    box.addEventListener("click", function (event) {
      var button = event.target.closest(".acc-btn");
      if (!button) return;
    var item = button.closest(".item");
    var willOpen = !item.classList.contains("open");
    box.querySelectorAll(".item.open").forEach(function (other) {
      if (other === item) return;
      other.classList.remove("open");
      var otherButton = other.querySelector(".acc-btn");
      if (otherButton) otherButton.setAttribute("aria-expanded", "false");
    });
    item.classList.toggle("open", willOpen);
    button.setAttribute("aria-expanded", willOpen ? "true" : "false");
    });
  });

  document.querySelectorAll(".filters").forEach(function (bar) {
    var gallery = bar.nextElementSibling;
    if (!gallery) return;
    bar.addEventListener("click", function (event) {
      var button = event.target.closest("button");
      if (!button) return;
      bar.querySelectorAll("button").forEach(function (item) {
        item.classList.toggle("active", item === button);
      });
      var filter = button.getAttribute("data-filter");
      gallery.querySelectorAll("a.gallery-link").forEach(function (link) {
        link.hidden = filter !== "all" && link.getAttribute("data-tag") !== filter;
      });
    });
  });

  var box = document.createElement("div");
  box.className = "lightbox";
  box.innerHTML = '<button type="button" class="lb-close" aria-label="Close">&times;</button><button type="button" class="lb-prev" aria-label="Previous">&#8249;</button><img alt=""><button type="button" class="lb-next" aria-label="Next">&#8250;</button>';
  document.body.appendChild(box);
  var img = box.querySelector("img");
  var links = [];
  var index = 0;

  function show(i) {
    if (!links.length) return;
    index = (i + links.length) % links.length;
    img.src = links[index].getAttribute("href");
    var thumb = links[index].querySelector("img");
    img.alt = thumb ? thumb.alt : "";
  }

  function close() {
    box.classList.remove("open");
    img.removeAttribute("src");
  }

  document.addEventListener("click", function (event) {
    var link = event.target.closest && event.target.closest("a.gallery-link");
    if (link) {
      event.preventDefault();
      var gallery = link.closest(".gallery");
      var all = gallery ? gallery.querySelectorAll("a.gallery-link") : [link];
      links = Array.prototype.filter.call(all, function (item) { return !item.hidden; });
      show(links.indexOf(link));
      box.classList.add("open");
      return;
    }
    if (event.target.classList.contains("lb-close") || event.target === box) close();
    if (event.target.classList.contains("lb-prev")) show(index - 1);
    if (event.target.classList.contains("lb-next")) show(index + 1);
  });

  document.addEventListener("keydown", function (event) {
    if (!box.classList.contains("open")) return;
    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") show(index - 1);
    if (event.key === "ArrowRight") show(index + 1);
  });
})();
