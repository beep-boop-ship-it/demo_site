// ========================================
// MAKHANA BUZZ INTERACTIONS
// ========================================

document.addEventListener("DOMContentLoaded", () => {

  // ----------------------------
  // REVEAL ON SCROLL
  // ----------------------------

  const revealElements = document.querySelectorAll(`
    section,
    .card,
    .gallery-card,
    .way-card,
    .nutrient,
    .stat-item
  `);

  revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(40px)";
    el.style.transition =
      "opacity .7s ease, transform .7s cubic-bezier(.22,.61,.36,1)";
  });

  const revealObserver = new IntersectionObserver(
    entries => {
      entries.forEach(entry => {

        if (entry.isIntersecting) {

          entry.target.style.opacity = "1";
          entry.target.style.transform = "translateY(0)";

          revealObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12
    }
  );

  revealElements.forEach(el => revealObserver.observe(el));



  // ----------------------------
  // ACTIVE NAV LINK
  // ----------------------------

  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-links a");

  window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

      const top = section.offsetTop - 150;
      const height = section.offsetHeight;

      if (window.scrollY >= top) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach(link => {

      link.classList.remove("active");

      if (
        link.getAttribute("href") === `#${current}`
      ) {
        link.classList.add("active");
      }
    });
  });



  // ----------------------------
  // HERO IMAGE PARALLAX
  // ----------------------------

  const heroImage = document.querySelector(".hero-image img");

  if (heroImage) {

    window.addEventListener("scroll", () => {

      const scrollY = window.scrollY;

      heroImage.style.transform =
        `translateY(${scrollY * 0.08}px)`;
    });
  }



  // ----------------------------
  // COUNTER ANIMATION
  // ----------------------------

  const numberElements = document.querySelectorAll(
    ".stat-item span, .nutrient h3"
  );

  const animateCounter = element => {

    const text = element.textContent;

    const match = text.match(/[\d.]+/);

    if (!match) return;

    const target = parseFloat(match[0]);

    const suffix = text.replace(match[0], "");

    let current = 0;

    const duration = 1400;

    const increment = target / (duration / 16);

    const update = () => {

      current += increment;

      if (current >= target) {

        element.textContent = text;
        return;
      }

      if (target % 1 !== 0) {
        element.textContent =
          current.toFixed(1) + suffix;
      } else {
        element.textContent =
          Math.floor(current) + suffix;
      }

      requestAnimationFrame(update);
    };

    update();
  };

  const counterObserver = new IntersectionObserver(
    entries => {

      entries.forEach(entry => {

        if (entry.isIntersecting) {

          animateCounter(entry.target);

          counterObserver.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.5
    }
  );

  numberElements.forEach(el =>
    counterObserver.observe(el)
  );



  // ----------------------------
  // CARD HOVER DEPTH
  // ----------------------------

  const cards = document.querySelectorAll(
    ".card, .gallery-card, .way-card, .nutrient"
  );

  cards.forEach(card => {

    card.addEventListener("mouseenter", () => {

      card.style.transition =
        "transform .25s ease";

      card.style.transform =
        "translateY(-8px)";
    });

    card.addEventListener("mouseleave", () => {

      card.style.transform =
        "translateY(0)";
    });
  });



  // ----------------------------
  // MAGNETIC BUTTONS
  // ----------------------------

  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary"
  );

  buttons.forEach(button => {

    button.addEventListener("mousemove", e => {

      const rect =
        button.getBoundingClientRect();

      const x =
        e.clientX - rect.left - rect.width / 2;

      const y =
        e.clientY - rect.top - rect.height / 2;

      button.style.transform =
        `translate(${x * 0.12}px, ${y * 0.12}px)`;
    });

    button.addEventListener("mouseleave", () => {

      button.style.transform =
        "translate(0,0)";
    });
  });



  // ----------------------------
  // BRAND STRIP PAUSE ON HOVER
  // ----------------------------

  const brandTrack =
    document.querySelector(".brand-track");

  if (brandTrack) {

    brandTrack.addEventListener(
      "mouseenter",
      () => {
        brandTrack.style.animationPlayState =
          "paused";
      }
    );

    brandTrack.addEventListener(
      "mouseleave",
      () => {
        brandTrack.style.animationPlayState =
          "running";
      }
    );
  }

});
