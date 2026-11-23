(function () {
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ================= Wishlist panel ================= */
  const wl = $("#wl"),
    wlList = $("#wlList"),
    wlCount = $("#wlCount");

  function renderWL() {
    const items = Store.wishGet().map(Store.byId).filter(Boolean);
    wlCount.textContent = items.length ? `(${items.length})` : "";
    wlList.innerHTML = items.length
      ? items
          .map(
            (p) => `
        <div class="wli" data-id="${p.id}">
          <img src="${p.image}" alt="${p.name}" />
          <div class="wli__info">
            <span>${Store.catName(p.cat)}</span>
            <h3>${p.name}</h3>
            <strong>${Store.money(p.price)}</strong>
          </div>
          <button type="button" class="wli__rm" data-act="rm" aria-label="Remove ${p.name}"><i class="fa-regular fa-trash-can"></i></button>
          <button type="button" class="btn btn--primary btn--sm wli__add" data-act="add">Add To Cart</button>
        </div>`,
          )
          .join("")
      : `<div class="wl__empty"><i class="fa-regular fa-heart"></i><p>Your wishlist is empty</p>
         <a class="btn btn--primary btn--sm" href="products.html">Browse Products</a></div>`;
  }

  function openWL() {
    renderWL();
    wl.classList.add("open");
    wl.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }
  function closeWL() {
    wl.classList.remove("open");
    wl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-wl]")) {
      e.preventDefault();
      openWL();
    } else if (e.target.closest("[data-close-wl]")) closeWL();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeWL();
  });
  window.addEventListener("wish:change", () => {
    if (wl.classList.contains("open")) renderWL();
  });

  wlList.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const row = b.closest(".wli"),
      p = Store.byId(row.dataset.id);
    if (b.dataset.act === "rm") {
      Store.wishToggle(p.id);
      Store.toast(`${p.name} removed from wishlist`, { img: p.image });
    } else {
      Store.fly(row.querySelector("img"));
      Store.add(p.id);
      Store.toast(`${p.name} added to cart`, {
        img: p.image,
        sub: `${Store.count()} item(s) in your cart`,
        link: "cart.html",
        linkText: "View cart",
      });
    }
  });

  /* ================= Language (شكل بس - من غير ترجمة) ================= */
  const lang = $("#lang");
  if (lang) {
    const btn = $(".lang__btn", lang);
    btn.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = lang.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });
    document.addEventListener("click", () => {
      lang.classList.remove("open");
      btn.setAttribute("aria-expanded", "false");
    });
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") lang.classList.remove("open");
    });
  }
  $$(".lang__opt").forEach((opt) =>
    opt.addEventListener("click", () => {
      const v = opt.dataset.lang;
      $$(".lang__cur").forEach((el) => (el.textContent = v));
      $$(".lang__opt").forEach((o) =>
        o.classList.toggle("active", o.dataset.lang === v),
      );
      if (lang) lang.classList.remove("open");
    }),
  );

  /* ================= Reels ================= */
  const reels = $$(".reel-card");
  function setPlaying(target, play) {
    reels.forEach((card) => {
      const v = $("video", card),
        ic = $(".reel-play i", card);
      if (card === target && play) {
        card.classList.add("playing");
        ic.className = "fa-solid fa-pause";
        v.play().catch(() => {});
      } else {
        card.classList.remove("playing");
        ic.className = "fa-solid fa-play";
        if (!v.paused) v.pause();
      }
    });
  }
  reels.forEach((card) => {
    const v = $("video", card);
    $(".reel-play", card).addEventListener("click", (e) => {
      e.stopPropagation();
      setPlaying(card, v.paused);
    });
    v.addEventListener("click", () => {
      if (!v.paused) setPlaying(card, false);
    });
  });

  /* ================= Contact form ================= */
  const cf = $("#contactForm");
  if (cf) {
    cf.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!cf.checkValidity()) return cf.reportValidity();
      const first = cf.elements.name.value.trim().split(" ")[0];
      Store.toast(`Thank you, ${first}!`, {
        sub: "Your message has been sent. We will reply soon.",
      });
      cf.reset();
    });
  }
})();
