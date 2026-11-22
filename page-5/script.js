(function () {
  const menu = document.getElementById("menu");
  const burger = document.getElementById("burger");
  const dds = document.querySelectorAll(".has-dd");
  const langOptions = document.querySelectorAll(".lang-dd [data-lang]");
  const langCurrents = document.querySelectorAll(".lang-current");

  function closeAll(except) {
    dds.forEach((li) => {
      if (li !== except) {
        li.classList.remove("open");
        const toggle = li.querySelector(".dd-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  function closeMenu() {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }

  dds.forEach((li) => {
    const btn = li.querySelector(".dd-toggle");
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = !li.classList.contains("open");
      closeAll(li);
      li.classList.toggle("open", open);
      btn.setAttribute("aria-expanded", open);
    });
  });

  langOptions.forEach((opt) => {
    opt.addEventListener("click", () => {
      const selected = opt.dataset.lang;
      langCurrents.forEach((el) => (el.textContent = selected));

      langOptions.forEach((btn) =>
        btn.classList.toggle("active", btn.dataset.lang === selected),
      );

      closeAll();
    });
  });

  burger.addEventListener("click", (e) => {
    e.stopPropagation();
    const open = menu.classList.toggle("open");
    burger.setAttribute("aria-expanded", open);
    if (!open) closeAll();
  });

  document.addEventListener("click", (e) => {
    if (!e.target.closest(".nav")) {
      closeAll();
      closeMenu();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeAll();
      closeMenu();
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 992) {
      closeMenu();
      closeAll();
    }
  });

  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => {
      closeAll();
      closeMenu();
    }),
  );

  const reelCards = document.querySelectorAll(".reel-card");

  function setReelPlaying(targetCard, playing) {
    reelCards.forEach((card) => {
      const video = card.querySelector("video");
      const icon = card.querySelector(".reel-play i");
      if (!video) return;

      if (card === targetCard && playing) {
        card.classList.add("playing");
        if (icon) icon.className = "fa-solid fa-pause";
        video.play().catch(() => {});
      } else {
        card.classList.remove("playing");
        if (icon) icon.className = "fa-solid fa-play";
        if (!video.paused) video.pause();
      }
    });
  }

  reelCards.forEach((card) => {
    const btn = card.querySelector(".reel-play");
    const video = card.querySelector("video");
    if (!btn || !video) return;

    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const shouldPlay = video.paused;
      setReelPlaying(card, shouldPlay);
    });

    video.addEventListener("click", () => {
      if (!video.paused) {
        setReelPlaying(card, false);
      }
    });

    video.addEventListener("ended", () => {
      setReelPlaying(card, false);
    });
  });

  const revTrack = document.getElementById("revTrack");
  const revPrev = document.getElementById("revPrev");
  const revNext = document.getElementById("revNext");

  if (revTrack && revPrev && revNext) {
    const cards = revTrack.querySelectorAll(".rev-card");
    let revIndex = 0;

    function getPerView() {
      if (window.innerWidth <= 600) return 1;
      if (window.innerWidth <= 991) return 2;
      return 3;
    }

    function updateSlider() {
      const perView = getPerView();
      const maxIndex = Math.max(0, cards.length - perView);
      if (revIndex > maxIndex) revIndex = 0;
      if (revIndex < 0) revIndex = maxIndex;

      const cardWidth = cards[0].getBoundingClientRect().width;
      const gap = parseFloat(getComputedStyle(revTrack).gap) || 0;
      const offset = revIndex * (cardWidth + gap);
      revTrack.style.transform = `translateX(-${offset}px)`;
    }

    revNext.addEventListener("click", () => {
      const perView = getPerView();
      const maxIndex = Math.max(0, cards.length - perView);
      revIndex = revIndex >= maxIndex ? 0 : revIndex + 1;
      updateSlider();
    });

    revPrev.addEventListener("click", () => {
      const perView = getPerView();
      const maxIndex = Math.max(0, cards.length - perView);
      revIndex = revIndex <= 0 ? maxIndex : revIndex - 1;
      updateSlider();
    });

    window.addEventListener("resize", updateSlider);
  }
})();
