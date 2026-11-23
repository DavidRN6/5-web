/* ======================
  table of contents
=========================
  1. Helpers & state
  2. Scroll listener
  3. Static links (no navigation)
  4. Cart badge
  5. Search panel
  6. Mobile drawer
*/

(() => {
  //=======================
  // 1. Helpers & state
  //=======================
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];

  const navbar = $("#navbar");
  const drawer = $("#drawer");
  const searchPanel = $("#searchPanel");
  const searchInput = $("#searchInput");
  const cartBadge = $("#cartBadge");

  let searchOpen = false;
  let cartCount = 0; // نادى window.setCartCount(n) لتغييره

  //=======================
  // 2. Scroll listener
  //=======================
  const onScroll = () => {
    navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  //=======================
  // 3. Static links (no navigation)
  //=======================
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');
    if (!link) return;
    e.preventDefault();

    // active state شكلى بس للينكات الرئيسية
    if (link.matches(".navbar__link, .drawer__link")) {
      const group = link.closest("nav");
      $$(".navbar__link, .drawer__link", group).forEach((l) =>
        l.classList.toggle("active", l === link),
      );
    }
  });

  //=======================
  // 4. Cart badge
  //=======================
  const renderCart = () => {
    cartBadge.textContent = cartCount;

    cartBadge.classList.remove("pop");
    void cartBadge.offsetWidth;
    cartBadge.classList.add("pop");

    $("#cartBtn").setAttribute(
      "aria-label",
      `Shopping cart, ${cartCount} items`,
    );
  };

  window.setCartCount = (n) => {
    cartCount = Number(n) || 0;
    renderCart();
  };

  renderCart();

  // اربط الـ cart drawer بالـ event ده
  $("#cartBtn").addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  //=======================
  // 5. Mobile drawer
  //=======================
  const openMenu = () => {
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeMenu = () => {
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  $("#openMenu").addEventListener("click", openMenu);
  $$("[data-close-menu]").forEach((el) =>
    el.addEventListener("click", closeMenu),
  );

  // اقفل الدروار لما تضغط على أى لينك (غير عناوين الـ accordion)
  $$(".drawer a").forEach((el) => el.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeMenu();
    if (searchOpen) closeSearch();
  });
})();

(() => {
  //=======================
  // 7. Best sellers
  //=======================
  const products = PRODUCTS; // من data.js

  const grid = document.querySelector("#bestSellersGrid");
  if (!grid) return;

  const prevBtn = document.querySelector(".best-sellers__arrow--prev");
  const nextBtn = document.querySelector(".best-sellers__arrow--next");

  // 4.5 -> نجمة نص
  const renderStars = (rating) => {
    let html = "";
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) html += '<i class="fa-solid fa-star"></i>';
      else if (rating >= i - 0.5)
        html += '<i class="fa-solid fa-star-half-stroke"></i>';
      else html += '<i class="fa-regular fa-star"></i>';
    }
    return html;
  };

  const createCard = (p) => `
    <article class="product-card" data-id="${p.id}">
      <button
        class="product-card__wish"
        type="button"
        aria-label="Add ${p.name} to wishlist"
        aria-pressed="false"
      >
        <i class="fa-regular fa-heart"></i>
      </button>

      <a href="#" class="product-card__image-wrap">
        <img
          class="product-card__image"
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
        />
      </a>

      <div class="product-card__body">
        <h3 class="product-card__name"><a href="#">${p.name}</a></h3>

        <p class="product-card__type">${Store.catName(p.cat)}</p>
        <p class="product-card__price">${p.price.toFixed(2)}EGP</p>
      </div>

      <button class="btn btn--primary btn--sm product-card__add" type="button">
        Add To Cart
      </button>
    </article>
  `;

  grid.innerHTML = products.map(createCard).join("");
  Store.paintWish();

  // Arrows
  const updateArrows = () => {
    prevBtn.disabled = grid.scrollLeft <= 4;
    nextBtn.disabled =
      grid.scrollLeft + grid.clientWidth >= grid.scrollWidth - 4;
  };

  const scrollGrid = (direction) => {
    grid.scrollBy({
      left: direction * grid.clientWidth * 0.8,
      behavior: "smooth",
    });
  };

  prevBtn.addEventListener("click", () => scrollGrid(-1));
  nextBtn.addEventListener("click", () => scrollGrid(1));
  grid.addEventListener("scroll", updateArrows, { passive: true });
  window.addEventListener("resize", updateArrows);
  updateArrows();
})();
