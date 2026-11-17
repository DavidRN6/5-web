/* ======================
  table of contents
=========================
  1. Helpers & state
  2. Navbar state (glass -> solid)
  3. Static links (no navigation)
  4. Cart badge
  5. Mobile drawer
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
  const hero = $("#hero");
  const drawer = $("#drawer");
  const cartBadge = $("#cartBadge");

  let cartCount = 0; // نادى window.setCartCount(n) لتغييره

  //=======================
  // 2. Navbar state
  //=======================
  // الـ pill زجاجى فوق الصورة، ويتحول لكريمى لما نخرج من الهيرو
  const onScroll = () => {
    const limit = hero.offsetHeight - 110;
    navbar.classList.toggle("is-solid", window.scrollY > limit);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  onScroll();

  //=======================
  // 3. Static links (no navigation)
  //=======================
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');
    if (link) e.preventDefault();
  });

  //=======================
  // 4. Cart badge
  //=======================
  const renderCart = () => {
    cartBadge.textContent = cartCount;
    cartBadge.hidden = cartCount <= 0;
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
    document.dispatchEvent(new CustomEvent("cart:open"));
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
  $$(".drawer__link").forEach((el) => el.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

(() => {
  //=======================
  // 6. Data
  //=======================
  // بدّل النصوص والصور بتاعتك
  const collections = [
    {
      title: "Purify & Balance",
      text: "Clarify and refresh your skin with botanical actives.",
      cta: "Shop Cleansers",
      image: "images/1.jpg",
    },
    {
      title: "Botanical Cleansing Soap",
      text: "Gently cleanse and refresh your skin with botanical.",
      cta: "Shop Cleansers",
      image: "images/3-2.jpg",
    },
    {
      title: "Balancing Botanical Serum",
      text: "Nourish and balance your skin with a lightweight.",
      cta: "Shop Serums",
      image: "images/9-2.jpg",
    },
    {
      title: "Botanical Moisturizing Cream",
      text: "Hydrate and soften your skin with a daily cream.",
      cta: "Shop Moisturizers",
      image: "images/8-3.jpg",
    },
  ];

  const ingredients = [
    {
      name: "Aloe Vera",
      text: "Soothes & hydrates",
      image: "images/ingredients/aloe-vera.jpg",
    },
    {
      name: "Green Tea",
      text: "Antioxidant protection",
      image: "images/ingredients/green-tea.jpg",
    },
    {
      name: "Jojoba Oil",
      text: "Balances & nourishes",
      image: "images/ingredients/jojoba-oil.jpg",
    },
    {
      name: "Chamomile",
      text: "Calms & comforts",
      image: "images/ingredients/chamomile.jpg",
    },
    {
      name: "Shea Butter",
      text: "Deeply moisturizes",
      image: "images/ingredients/shea-butter.jpg",
    },
  ];

  //=======================
  // Render: collection cards
  //=======================
  const waveSvg = `
    <svg class="collection-card__wave" viewBox="0 0 400 28"
         preserveAspectRatio="none" aria-hidden="true">
      <path d="M0,16 C70,0 130,30 210,16 S340,2 400,14 V28 H0 Z" />
    </svg>`;

  const collectionGrid = document.querySelector("#collectionGrid");

  if (collectionGrid) {
    collectionGrid.innerHTML = collections
      .map(
        (c) => `
        <article class="collection-card">
          <a href="#" class="collection-card__media" tabindex="-1" aria-hidden="true">
            <img src="${c.image}" alt="" loading="lazy" />
          </a>

          <div class="collection-card__body">
            ${waveSvg}
            <h3 class="collection-card__title">${c.title}</h3>
            <p class="collection-card__text">${c.text}</p>
            <a href="#" class="link-arrow">
              ${c.cta} <i class="fa-solid fa-arrow-right"></i>
            </a>
          </div>
        </article>`,
      )
      .join("");
  }

  //=======================
  // Render: ingredients
  //=======================
  const ingredientList = document.querySelector("#ingredientList");

  if (ingredientList) {
    ingredientList.innerHTML = ingredients
      .map(
        (item) => `
        <li class="ingredient">
          <span class="ingredient__img">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </span>
          <h3 class="ingredient__name">${item.name}</h3>
          <p class="ingredient__text">${item.text}</p>
        </li>`,
      )
      .join("");
  }
})();
