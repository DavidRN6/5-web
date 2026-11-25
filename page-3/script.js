/* ======================
  table of contents
=========================
  1. Catalog data & gram pricing config
  2. Store (cart in grams, toast, fly animation & wishlist)
  3. Helpers & shared DOM refs
  4. Scroll listener & static links
  5. Cart badge & mobile drawer
  6. Best sellers carousel
  7. Special Offers Auto Slider + Add Offer To Cart
  8. Products catalog & filters (products.html)
  9. Single product & related products (product.html)
  10. Cart page & checkout in grams (cart.html)
  11. Wishlist drawer, language switcher, reels & contact form
  12. Preloader & Sale Popup
*/

/* =========================
   1. Catalog data & gram pricing config (All Categories + Subcategories)
========================= */
const GRAM_CONFIG = {
  baseGrams: 100,
  defaultGrams: 100,
  minGrams: 50,
  maxGrams: 5000,
  stepGrams: 50,
  presets: [100, 250, 500, 1000],
};

/* كل قسم رئيسي له أنواع فرعية خاصة به */
const CATEGORIES = [
  {
    id: "tea",
    name: "Tea",
    subCats: [
      { id: "black", name: "Black Tea" },
      { id: "green", name: "Green Tea" },
      { id: "oolong", name: "Oolong Tea" },
      { id: "matcha", name: "Matcha" },
    ],
  },
  {
    id: "herbs",
    name: "Herbs & Flowers",
    subCats: [
      { id: "calming", name: "Calming Herbs" },
      { id: "floral", name: "Dried Flowers" },
      { id: "mint", name: "Mint & Leaves" },
    ],
  },
  {
    id: "spices",
    name: "Spices & Seeds",
    subCats: [
      { id: "whole-spices", name: "Whole Spices" },
      { id: "seeds", name: "Aromatic Seeds" },
      { id: "pepper", name: "Pepper & Warmers" },
    ],
  },
  {
    id: "powders",
    name: "Powders & Extracts",
    subCats: [
      { id: "superfood", name: "Superfood Powders" },
      { id: "herbal-powder", name: "Ground Botanicals" },
    ],
  },
];

/* كل منتج يحدد cat (القسم الرئيسي) و subCat (النوع الفرعي داخل القسم) */
const PRODUCTS = [
  {
    id: "1",
    name: "Original Ceylon Tea",
    cat: "tea",
    subCat: "black",
    price: 120,
    defaultGrams: 100,
    image: "images/product/1 original tea.webp",
    desc: "Rich, full-bodied loose black tea leaves with a warm malty aroma.",
  },
  {
    id: "2",
    name: "Classic Green Tea",
    cat: "tea",
    subCat: "green",
    price: 140,
    defaultGrams: 100,
    image: "images/product/2 green tea.webp",
    desc: "Delicate unfermented green leaves packed with natural antioxidants.",
  },
  {
    id: "3",
    name: "Amber Leaf Tea",
    cat: "tea",
    subCat: "black",
    price: 125,
    defaultGrams: 100,
    image: "images/product/3 prlack tea.webp",
    desc: "Smooth signature blend crafted for daily morning and afternoon rituals.",
  },
  {
    id: "4",
    name: "Chamomile & Mint Blend",
    cat: "herbs",
    subCat: "calming",
    price: 145,
    defaultGrams: 100,
    image: "images/product/4 herbal tea.webp",
    desc: "Caffeine-free botanical infusion blended for calm and balance.",
  },
  {
    id: "5",
    name: "High Mountain Oolong",
    cat: "tea",
    subCat: "oolong",
    price: 180,
    defaultGrams: 100,
    image: "images/product/5 oolong tea.webp",
    desc: "Semi-oxidized whole leaves offering floral notes and a lingering finish.",
  },
  {
    id: "6",
    name: "Rose & Hibiscus Petals",
    cat: "herbs",
    subCat: "floral",
    price: 145,
    defaultGrams: 100,
    image: "images/product/6 floral tea.webp",
    desc: "Aromatic flower petals and gentle botanicals for a soothing infusion.",
  },
  {
    id: "7",
    name: "Rishi Black Blend",
    cat: "tea",
    subCat: "black",
    price: 162,
    defaultGrams: 100,
    image: "images/product/7 Rishi Tea.webp",
    desc: "Hand-selected tea leaves with deep character and aromatic warmth.",
  },
  {
    id: "8",
    name: "Ceremonial Matcha",
    cat: "tea",
    subCat: "matcha",
    price: 135,
    defaultGrams: 100,
    image: "images/product/8 Matcha.webp",
    desc: "Finely stone-milled green tea powder with vibrant color and umami.",
  },
  {
    id: "9",
    name: "Whole Cloves",
    cat: "spices",
    subCat: "whole-spices",
    price: 240,
    defaultGrams: 100,
    image: "images/product/9 clove.webp",
    desc: "Whole sun-dried clove buds with intense sweet-spicy fragrance.",
  },
  {
    id: "10",
    name: "Attara Spice Mix",
    cat: "spices",
    subCat: "whole-spices",
    price: 210,
    defaultGrams: 100,
    image: "images/product/10 spices.webp",
    desc: "Traditional whole spice blend freshly packed for rich flavor.",
  },
  {
    id: "11",
    name: "Coriander & Fennel Seeds",
    cat: "spices",
    subCat: "seeds",
    price: 170,
    defaultGrams: 100,
    image: "images/product/11 master seeds.webp",
    desc: "Pure aromatic seeds ideal for teas, infusions, and kitchen blends.",
  },
  {
    id: "12",
    name: "Star & Sweet Anise",
    cat: "herbs",
    subCat: "mint",
    price: 190,
    defaultGrams: 100,
    image: "images/product/12 anise.webp",
    desc: "Sweet licorice-scented botanicals prized in warm herbal brews.",
  },
  {
    id: "13",
    name: "Black Peppercorns",
    cat: "spices",
    subCat: "pepper",
    price: 120,
    defaultGrams: 100,
    image: "images/product/13 black paper.webp",
    desc: "Bold whole peppercorns harvested for sharp warmth and aroma.",
  },
  {
    id: "14",
    name: "Habbat Al Baraka (Black Seeds)",
    cat: "powders",
    subCat: "superfood",
    price: 110,
    defaultGrams: 100,
    image: "images/product/14 black seeds.webp",
    desc: "Traditional nigella / black seeds with crisp nutty depth.",
  },
];

/* =========================
   2. Store (cart in grams, toast, fly animation & wishlist)
========================= */
(() => {
  const KEY = "harvest_tea_cart";
  const byId = (id) => PRODUCTS.find((p) => String(p.id) === String(id));
  const money = (n) => Number(n || 0).toFixed(2) + " EGP";
  const catName = (id) =>
    (CATEGORIES.find((c) => c.id === id) || {}).name || "";

  const clampGrams = (g) => {
    const num = parseInt(g, 10);
    if (Number.isNaN(num)) return GRAM_CONFIG.defaultGrams;
    return Math.max(GRAM_CONFIG.minGrams, Math.min(GRAM_CONFIG.maxGrams, num));
  };

  const formatGrams = (g) => {
    const val = Number(g) || 0;
    return val >= 1000
      ? `${(val / 1000).toFixed(val % 1000 === 0 ? 0 : 2)} kg (${val}g)`
      : `${val}g`;
  };

  const priceForGrams = (product, grams) => {
    if (!product) return 0;
    return (product.price / GRAM_CONFIG.baseGrams) * Number(grams || 0);
  };

  const defaultGramsFor = (product) =>
    clampGrams(product?.defaultGrams ?? GRAM_CONFIG.defaultGrams);

  const productUrl = (id) => `product.html?id=${encodeURIComponent(id)}`;

  function get() {
    try {
      const raw = JSON.parse(localStorage.getItem(KEY)) || [];
      return raw.map((item) => ({
        id: String(item.id),
        offerId: item.offerId || null,
        offerLabel: item.offerLabel || null,
        customPrice:
          item.customPrice !== undefined && item.customPrice !== null
            ? Number(item.customPrice)
            : null,
        grams: clampGrams(
          item.grams !== undefined
            ? item.grams
            : (item.qty || 1) * GRAM_CONFIG.defaultGrams,
        ),
      }));
    } catch (e) {
      return [];
    }
  }

  function save(c) {
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch (e) {}
    window.dispatchEvent(new Event("cart:change"));
  }

  const totalGrams = () => get().reduce((s, i) => s + clampGrams(i.grams), 0);
  const count = () => get().length;

  function add(id, grams) {
    const p = byId(id);
    const addGrams = clampGrams(
      grams !== undefined ? grams : defaultGramsFor(p),
    );
    const c = get();
    const it = c.find((i) => String(i.id) === String(id) && !i.offerId);
    if (it) {
      it.grams = clampGrams(it.grams + addGrams);
    } else {
      c.push({ id: String(id), grams: addGrams });
    }
    save(c);
    return addGrams;
  }

  function addOffer(offer) {
    if (!offer) return 0;
    const prodId = String(offer.productId);
    const offerGrams = clampGrams(offer.grams);
    const offerPrice = Number(offer.offerPrice);
    const c = get();
    const existing = c.find(
      (item) => String(item.id) === prodId && item.offerId === offer.id,
    );

    if (existing) {
      existing.grams = clampGrams(existing.grams + offerGrams);
      existing.customPrice = Number(existing.customPrice || 0) + offerPrice;
      existing.offerLabel = offer.title || "Special Offer";
    } else {
      c.push({
        id: prodId,
        offerId: offer.id,
        offerLabel: offer.title || "Special Offer",
        grams: offerGrams,
        customPrice: offerPrice,
      });
    }
    save(c);
    return offerGrams;
  }

  function setGrams(id, grams, offerId = null) {
    const g = clampGrams(grams);
    const updated = get().map((i) => {
      const match = offerId
        ? i.offerId === offerId
        : String(i.id) === String(id) && !i.offerId;
      if (!match) return i;
      const next = { ...i, grams: g };
      if (next.customPrice !== null && next.customPrice !== undefined) {
        const p = byId(i.id);
        if (p) {
          next.customPrice = Number(priceForGrams(p, g).toFixed(2));
        }
      }
      return next;
    });
    save(updated);
  }

  const remove = (id, offerId = null) =>
    save(
      get().filter((i) =>
        offerId
          ? i.offerId !== offerId
          : !(String(i.id) === String(id) && !i.offerId),
      ),
    );

  const clear = () => save([]);

  /* ---------- Toast ---------- */
  let box;
  function toast(msg, opt = {}) {
    if (!box) {
      box = document.createElement("div");
      box.className = "toasts";
      box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }

    const t = document.createElement("div");
    t.className = "toast" + (opt.type === "error" ? " toast--error" : "");
    const visual = opt.img
      ? `<img class="toast__img" src="${opt.img}" alt="" />`
      : `<span class="toast__icon"><i class="fa-solid ${opt.type === "error" ? "fa-triangle-exclamation" : "fa-leaf"}"></i></span>`;

    t.innerHTML = `${visual}<div class="toast__text"><strong></strong>${
      opt.sub ? "<small></small>" : ""
    }</div>${
      opt.link
        ? `<a class="toast__link" href="${opt.link}">${opt.linkText || "View"}</a>`
        : ""
    }<span class="toast__bar"></span>`;

    t.querySelector("strong").textContent = msg;
    if (opt.sub) t.querySelector("small").textContent = opt.sub;
    box.appendChild(t);

    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 350);
    }, opt.time || 3200);
  }

  /* ---------- Fly to cart ---------- */
  function fly(imgEl) {
    const target = document.getElementById("cartBtn");
    if (
      !target ||
      !imgEl ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;

    const a = imgEl.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const size = Math.min(a.width, 110);
    const el = document.createElement("img");
    el.src = imgEl.currentSrc || imgEl.src;
    el.className = "fly-img";

    Object.assign(el.style, {
      left: a.left + a.width / 2 - size / 2 + "px",
      top: a.top + a.height / 2 - size / 2 + "px",
      width: size + "px",
      height: size + "px",
    });

    document.body.appendChild(el);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2);
    const dy = b.top + b.height / 2 - (a.top + a.height / 2);

    const anim = el.animate(
      [
        {
          transform: "translate(0,0) scale(1) rotate(0)",
          opacity: 1,
          borderRadius: "10px",
        },
        {
          transform: `translate(${dx * 0.45}px,${dy * 0.45 - 90}px) scale(.65) rotate(120deg)`,
          opacity: 0.95,
          borderRadius: "50%",
          offset: 0.5,
        },
        {
          transform: `translate(${dx}px,${dy}px) scale(.1) rotate(300deg)`,
          opacity: 0.3,
          borderRadius: "50%",
        },
      ],
      { duration: 900, easing: "cubic-bezier(.55,.05,.7,.35)" },
    );

    anim.onfinish = () => {
      el.remove();
      target.classList.remove("cart-bump");
      void target.offsetWidth;
      target.classList.add("cart-bump");
    };
  }

  /* ---------- Badge sync ---------- */
  function sync() {
    if (window.setCartCount) window.setCartCount(count(), totalGrams());
  }
  window.addEventListener("cart:change", sync);
  window.addEventListener("storage", sync);
  document.addEventListener("DOMContentLoaded", sync);

  /* ---------- Add to cart ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".product-card__add");
    if (!btn) return;
    const card = btn.closest(".product-card");
    const p = card && byId(card.dataset.id);
    if (!p) return;

    const addedGrams = add(p.id);
    fly(card.querySelector(".product-card__image"));
    toast(`${p.name} (${addedGrams}g) added to cart`, {
      img: p.image,
      sub: `Total weight in cart: ${formatGrams(totalGrams())}`,
      link: "cart.html",
      linkText: "View cart",
    });

    btn.classList.add("is-added");
    btn.textContent = `Added (${addedGrams}g)`;
    setTimeout(() => {
      btn.classList.remove("is-added");
      btn.textContent = `Add To Cart (${defaultGramsFor(p)}g)`;
    }, 1200);
  });

  /* ---------- Wishlist ---------- */
  const WKEY = "harvest_tea_wish";
  const wishGet = () => {
    try {
      return JSON.parse(localStorage.getItem(WKEY)) || [];
    } catch (e) {
      return [];
    }
  };

  function wishSave(l) {
    try {
      localStorage.setItem(WKEY, JSON.stringify(l));
    } catch (e) {}
    window.dispatchEvent(new Event("wish:change"));
  }

  function wishToggle(id) {
    const l = wishGet(),
      i = l.indexOf(String(id));
    i > -1 ? l.splice(i, 1) : l.push(String(id));
    wishSave(l);
    return i === -1;
  }

  function paintWish() {
    const l = wishGet();
    document.querySelectorAll(".product-card[data-id]").forEach((c) => {
      const w = c.querySelector(".product-card__wish");
      if (!w) return;
      const on = l.includes(String(c.dataset.id));
      w.classList.toggle("is-liked", on);
      w.setAttribute("aria-pressed", String(on));
      const icon = w.querySelector("i");
      if (icon) {
        icon.className = on ? "fa-solid fa-heart" : "fa-regular fa-heart";
      }
    });

    const badge = document.getElementById("wlBadge");
    if (badge) {
      badge.textContent = l.length;
      badge.hidden = l.length === 0;
    }
  }

  window.addEventListener("wish:change", paintWish);
  window.addEventListener("storage", paintWish);
  document.addEventListener("DOMContentLoaded", paintWish);

  document.addEventListener("click", (e) => {
    const w = e.target.closest(".product-card__wish");
    if (!w) return;
    const card = w.closest(".product-card"),
      p = card && byId(card.dataset.id);
    if (!p) return;

    const on = wishToggle(p.id);
    toast(
      on ? `${p.name} saved to wishlist` : `${p.name} removed from wishlist`,
      { img: p.image, sub: `${wishGet().length} item(s) in your wishlist` },
    );
  });

  window.Store = {
    config: GRAM_CONFIG,
    clampGrams,
    formatGrams,
    priceForGrams,
    defaultGramsFor,
    productUrl,
    totalGrams,
    fly,
    wishGet,
    wishToggle,
    paintWish,
    money,
    byId,
    catName,
    get,
    count,
    add,
    addOffer,
    setGrams,
    remove,
    clear,
    toast,
  };
})();

/* =========================
   3. Helpers & shared DOM refs
========================= */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

const renderProductCard = (p) => {
  const defGrams = Store.defaultGramsFor(p);
  const url = Store.productUrl(p.id);
  return `
    <article class="product-card" data-id="${p.id}">
      <button
        class="product-card__wish"
        type="button"
        aria-label="Add ${p.name} to wishlist"
        aria-pressed="false"
      >
        <i class="fa-regular fa-heart"></i>
      </button>

      <a href="${url}" class="product-card__image-wrap">
        <img
          class="product-card__image"
          src="${p.image}"
          alt="${p.name}"
          loading="lazy"
        />
      </a>

      <div class="product-card__body">
        <h3 class="product-card__name"><a href="${url}">${p.name}</a></h3>

        <p class="product-card__type">${Store.catName(p.cat)}</p>
        <p class="product-card__price">${p.price.toFixed(2)} EGP <small>/ ${Store.config.baseGrams}g</small></p>
      </div>

      <button class="btn btn--primary btn--sm product-card__add" type="button">
        Add To Cart (${defGrams}g)
      </button>
    </article>
  `;
};

/* =========================
   4. Scroll listener & static links
========================= */
(() => {
  const navbar = $("#navbar");

  const onScroll = () => {
    if (!navbar) return;
    navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');
    if (!link) return;
    e.preventDefault();

    if (link.matches(".navbar__link, .drawer__link")) {
      const group = link.closest("nav");
      $$(".navbar__link, .drawer__link", group).forEach((l) =>
        l.classList.toggle("active", l === link),
      );
    }
  });
})();

/* =========================
   5. Cart badge & mobile drawer
========================= */
(() => {
  const drawer = $("#drawer");
  const cartBadge = $("#cartBadge");
  const cartBtn = $("#cartBtn");
  let cartCount = 0;
  let cartGrams = 0;

  const renderCart = () => {
    if (!cartBadge) return;
    cartBadge.textContent = cartCount;

    cartBadge.classList.remove("pop");
    void cartBadge.offsetWidth;
    cartBadge.classList.add("pop");

    if (cartBtn) {
      cartBtn.setAttribute(
        "aria-label",
        `Shopping cart, ${cartCount} items (${Store.formatGrams(cartGrams)})`,
      );
      cartBtn.title = `${Store.formatGrams(cartGrams)} in cart`;
    }
  };

  window.setCartCount = (n, grams = Store.totalGrams()) => {
    cartCount = Number(n) || 0;
    cartGrams = Number(grams) || 0;
    renderCart();
  };

  renderCart();

  cartBtn?.addEventListener("click", () => {
    window.location.href = "cart.html";
  });

  const openMenu = () => {
    if (!drawer) return;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeMenu = () => {
    if (!drawer) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  $("#openMenu")?.addEventListener("click", openMenu);
  $$("[data-close-menu]").forEach((el) =>
    el.addEventListener("click", closeMenu),
  );
  $$(".drawer a").forEach((el) => el.addEventListener("click", closeMenu));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

/* =========================
   6. Best sellers carousel
========================= */
(() => {
  const grid = $("#bestSellersGrid");
  if (!grid) return;

  const BEST_SELLERS_LIMIT = 10; // غيّر الرقم ده لعدد المنتجات اللي تحب تظهر في index
  const visibleProducts = PRODUCTS.slice(0, BEST_SELLERS_LIMIT);

  grid.innerHTML = visibleProducts.map(renderProductCard).join("");
  Store.paintWish();
})();

/* =========================
   7. Special Offers Auto Slider + Add Offer To Cart
========================= */
(() => {
  const track = $("#offersTrack");
  const dotsWrap = $("#offersDots");
  const prevBtn = $("#offersPrev");
  const nextBtn = $("#offersNext");
  const sliderBox = $("#offersSlider");

  if (!track || !dotsWrap || typeof Store === "undefined") return;

  const SPECIAL_OFFERS = [
    {
      id: "offer-250g-1",
      productId: "1",
      badge: "Save 25%",
      title: "250g Bundle Deal",
      grams: 250,
      offerPrice: 250,
      originalPrice: 340,
      note: "Freshly weighed 250g pack — limited time special bundle.",
    },
    {
      id: "offer-250g-2",
      productId: "2",
      badge: "Hot Deal",
      title: "250g Morning Pack",
      grams: 250,
      offerPrice: 220,
      originalPrice: 300,
      note: "Rich aroma & full flavor in a 250g value pack.",
    },
    {
      id: "offer-500g-3",
      productId: "3",
      badge: "Best Value",
      title: "500g Family Pack",
      grams: 500,
      offerPrice: 390,
      originalPrice: 520,
      note: "Double portion 500g pack at a special bundle price.",
    },
    {
      id: "offer-250g-4",
      productId: "4",
      badge: "Bundle Offer",
      title: "250g Wellness Pack",
      grams: 250,
      offerPrice: 195,
      originalPrice: 260,
      note: "Soothing natural blend weighed fresh for your daily routine.",
    },
  ];

  const offers = SPECIAL_OFFERS.map((offer) => {
    const prod =
      (typeof Store.byId === "function" && Store.byId(offer.productId)) ||
      (typeof PRODUCTS !== "undefined" && PRODUCTS[0]) ||
      {};
    return {
      ...offer,
      productId: String(prod.id || offer.productId),
      name: prod.name || "Harvest Tea Blend",
      cat: prod.cat || "tea",
      image: prod.image || "images/product 1.jpg",
    };
  });

  if (!offers.length) return;

  const AUTOPLAY_MS = 4500;
  let activeIndex = 0;
  let timerId = null;

  const formatGramsLabel = (g) =>
    typeof Store.formatGrams === "function"
      ? Store.formatGrams(g)
      : g >= 1000
        ? `${g / 1000}kg`
        : `${g}g`;

  const formatMoney = (val) =>
    typeof Store.money === "function" ? Store.money(val) : `${val} EGP`;

  track.innerHTML = offers
    .map(
      (offer, idx) => `
      <article class="offer-slide" data-offer-index="${idx}">
        <div class="offer-slide__media">
          <span class="offer-slide__badge">${offer.badge}</span>
          <img
            src="${offer.image}"
            alt="${offer.name} — ${formatGramsLabel(offer.grams)}"
            loading="${idx === 0 ? "eager" : "lazy"}"
          />
        </div>

        <div class="offer-slide__body">
          <span class="offer-slide__eyebrow">${offer.title}</span>
          <h3 class="offer-slide__name">${offer.name}</h3>
          <p class="offer-slide__desc">${offer.note}</p>

          <div class="offer-slide__meta">
            <span class="offer-slide__weight">
              <i class="fa-solid fa-scale-balanced"></i>
              ${formatGramsLabel(offer.grams)}
            </span>

            <div class="offer-slide__prices">
              <strong class="offer-slide__price">${formatMoney(offer.offerPrice)}</strong>
              ${
                offer.originalPrice
                  ? `<del class="offer-slide__old">${formatMoney(offer.originalPrice)}</del>`
                  : ""
              }
            </div>
          </div>

          <div class="offer-slide__actions">
            <button
              type="button"
              class="btn btn--primary offer-slide__add"
              data-add-offer="${idx}"
            >
              Add Offer To Cart <i class="fa-solid fa-bag-shopping"></i>
            </button>
            <a
              href="product.html?id=${encodeURIComponent(offer.productId)}"
              class="btn btn--outline"
            >
              Details
            </a>
          </div>
        </div>
      </article>
    `,
    )
    .join("");

  dotsWrap.innerHTML = offers
    .map(
      (_, idx) => `
      <button
        type="button"
        class="offers-slider__dot${idx === 0 ? " is-active" : ""}"
        data-offer-dot="${idx}"
        aria-label="Go to offer ${idx + 1}"
        aria-selected="${idx === 0 ? "true" : "false"}"
        role="tab"
      ></button>
    `,
    )
    .join("");

  const dots = $$("[data-offer-dot]", dotsWrap);

  const goTo = (index, resetTimer = false) => {
    activeIndex = (index + offers.length) % offers.length;
    track.style.transform = `translate3d(-${activeIndex * 100}%, 0, 0)`;

    dots.forEach((dot, idx) => {
      const isCurrent = idx === activeIndex;
      dot.classList.toggle("is-active", isCurrent);
      dot.setAttribute("aria-selected", String(isCurrent));
    });

    if (resetTimer) restartAutoplay();
  };

  const stopAutoplay = () => {
    if (timerId !== null) {
      clearInterval(timerId);
      timerId = null;
    }
  };

  const startAutoplay = () => {
    stopAutoplay();
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    timerId = setInterval(() => {
      goTo(activeIndex + 1, false);
    }, AUTOPLAY_MS);
  };

  const restartAutoplay = () => {
    stopAutoplay();
    startAutoplay();
  };

  prevBtn?.addEventListener("click", () => goTo(activeIndex - 1, true));
  nextBtn?.addEventListener("click", () => goTo(activeIndex + 1, true));

  dotsWrap.addEventListener("click", (e) => {
    const dot = e.target.closest("[data-offer-dot]");
    if (!dot) return;
    goTo(+dot.dataset.offerDot, true);
  });

  track.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-add-offer]");
    if (!btn) return;

    const offer = offers[+btn.dataset.addOffer];
    if (!offer) return;

    const slideImg = btn.closest(".offer-slide")?.querySelector("img");
    if (typeof Store.fly === "function" && slideImg) {
      Store.fly(slideImg);
    }

    const addedGrams = Store.addOffer(offer);

    btn.classList.add("is-added");
    setTimeout(() => btn.classList.remove("is-added"), 650);

    if (typeof Store.toast === "function") {
      Store.toast(
        `${offer.name} (${formatGramsLabel(addedGrams)} — ${formatMoney(offer.offerPrice)}) added`,
        {
          img: offer.image,
          sub: `${offer.title} added to cart`,
          link: "cart.html",
          linkText: "View cart",
        },
      );
    }
  });

  sliderBox?.addEventListener("mouseenter", stopAutoplay);
  sliderBox?.addEventListener("mouseleave", startAutoplay);
  sliderBox?.addEventListener("focusin", stopAutoplay);
  sliderBox?.addEventListener("focusout", startAutoplay);

  let touchStartX = 0;
  track.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.touches[0].clientX;
      stopAutoplay();
    },
    { passive: true },
  );

  track.addEventListener(
    "touchend",
    (e) => {
      const diffX = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(diffX) > 45) {
        goTo(activeIndex + (diffX < 0 ? 1 : -1), false);
      }
      startAutoplay();
    },
    { passive: true },
  );

  goTo(0, false);
  startAutoplay();
})();

/* =========================
   8. Products catalog & filters (products.html)
========================= */
(() => {
  const grid = $("#grid");
  if (!grid) return;

  const catList = $("#catList");
  const q = $("#q");
  const sort = $("#sort");
  const price = $("#price");
  const priceOut = $("#priceOut");
  const count = $("#count");
  const empty = $("#empty");
  const filtersBox = $("#filters");
  const params = new URLSearchParams(location.search);

  const findCatById = (id) => CATEGORIES.find((c) => c.id === id) || null;
  const findCatBySubId = (subId) =>
    CATEGORIES.find((c) => (c.subCats || []).some((s) => s.id === subId)) ||
    null;

  // إنشاء حاوية الـ Subcategories داخل الفلاتر وتحديثها لأي قسم رئيسي نشط
  let subBox = $("#subCatBox");
  if (!subBox && filtersBox) {
    subBox = document.createElement("div");
    subBox.className = "fbox fbox--sub";
    subBox.id = "subCatBox";
    subBox.hidden = true;
    subBox.innerHTML = `
      <div class="fsub-head">
        <h2 class="fbox__title" id="subCatTitle">Subcategories</h2>
        <span class="fsub-badge" id="subCatParentName"></span>
      </div>
      <div class="fsubcats" id="subCatList"></div>
    `;
    const firstBox = $(".fbox", filtersBox);
    firstBox?.insertAdjacentElement("afterend", subBox);
  }
  const subCatList = $("#subCatList");
  const subCatParentName = $("#subCatParentName");

  const prices = PRODUCTS.map((p) => p.price);
  const MAX = Math.max(...prices);
  if (price) {
    price.min = Math.floor(Math.min(...prices) / 10) * 10;
    price.max = MAX;
    price.value = MAX;
  }

  // يدعم فتح ?cat=tea أو ?cat=black مباشرة
  const rawParam = (params.get("cat") || "").toLowerCase();
  const matchedMainCat = findCatById(rawParam);
  const matchedParentCat = !matchedMainCat ? findCatBySubId(rawParam) : null;

  const state = {
    cat: matchedMainCat
      ? matchedMainCat.id
      : matchedParentCat
        ? matchedParentCat.id
        : "all",
    subCat: matchedParentCat ? rawParam : "all",
    q: "",
    sort: "default",
    max: MAX,
  };

  function getFilteredList() {
    return PRODUCTS.filter((p) => {
      const matchCat = state.cat === "all" || p.cat === state.cat;
      const matchSub =
        state.cat === "all" ||
        state.subCat === "all" ||
        p.subCat === state.subCat;
      const matchPrice = p.price <= state.max;
      const matchSearch = p.name.toLowerCase().includes(state.q);
      return matchCat && matchSub && matchPrice && matchSearch;
    });
  }

  function renderCats() {
    if (!catList) return;
    const all = [{ id: "all", name: "All Attara", subCats: [] }, ...CATEGORIES];

    catList.innerHTML = all
      .map((c) => {
        const n =
          c.id === "all"
            ? PRODUCTS.length
            : PRODUCTS.filter((p) => p.cat === c.id).length;
        const subCount = (c.subCats || []).length;
        return `
          <button type="button" class="fcat${state.cat === c.id ? " active" : ""}" data-cat="${c.id}">
            <span class="fcat__label">
              <span>${c.name}</span>
              ${subCount ? `<em class="fcat__tag">${subCount} types</em>` : ""}
            </span>
            <small>${n}</small>
          </button>
        `;
      })
      .join("");

    const activeCategoryObj = findCatById(state.cat);
    const activeSubCats = activeCategoryObj?.subCats || [];

    if (subBox && subCatList) {
      const shouldShow = state.cat !== "all" && activeSubCats.length > 0;
      subBox.hidden = !shouldShow;

      if (shouldShow) {
        if (subCatParentName) {
          subCatParentName.textContent = activeCategoryObj.name;
        }

        const subOptions = [
          { id: "all", name: `All ${activeCategoryObj.name}` },
          ...activeSubCats,
        ];

        subCatList.innerHTML = subOptions
          .map((sub) => {
            const n =
              sub.id === "all"
                ? PRODUCTS.filter((p) => p.cat === state.cat).length
                : PRODUCTS.filter(
                    (p) => p.cat === state.cat && p.subCat === sub.id,
                  ).length;
            const isActive = state.subCat === sub.id;
            return `
              <button
                type="button"
                class="fsubcat${isActive ? " active" : ""}"
                data-subcat="${sub.id}"
                aria-pressed="${isActive}"
              >
                <span class="fsubcat__name">${sub.name}</span>
                <span class="fsubcat__count">${n}</span>
              </button>
            `;
          })
          .join("");
      }
    }
  }

  function render() {
    const list = getFilteredList();
    if (state.sort === "low") list.sort((a, b) => a.price - b.price);
    if (state.sort === "high") list.sort((a, b) => b.price - a.price);
    if (state.sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));

    grid.innerHTML = list.map(renderProductCard).join("");
    if (empty) empty.hidden = list.length > 0;
    if (count) {
      count.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    }
    if (priceOut) {
      priceOut.textContent = `Up to ${state.max} EGP / ${Store.config.baseGrams}g`;
    }

    const activeCatObj = findCatById(state.cat);
    let headingName = "All Attara";
    if (activeCatObj) {
      if (state.subCat === "all") {
        headingName = activeCatObj.name;
      } else {
        const subObj = (activeCatObj.subCats || []).find(
          (s) => s.id === state.subCat,
        );
        headingName = subObj
          ? `${activeCatObj.name} — ${subObj.name}`
          : activeCatObj.name;
      }
    }

    if ($("#pageTitle")) $("#pageTitle").textContent = headingName;
    if ($("#crumbCat")) $("#crumbCat").textContent = headingName;
    document.title = `${headingName} | Harvest`;

    renderCats();
    Store.paintWish();
  }

  catList?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    state.cat = b.dataset.cat;
    state.subCat = "all";

    const url = new URL(location.href);
    state.cat === "all"
      ? url.searchParams.delete("cat")
      : url.searchParams.set("cat", state.cat);
    history.replaceState(null, "", url);
    render();
  });

  subCatList?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-subcat]");
    if (!b) return;
    state.subCat = b.dataset.subcat;
    render();
  });

  q?.addEventListener("input", () => {
    state.q = q.value.trim().toLowerCase();
    render();
  });

  sort?.addEventListener("change", () => {
    state.sort = sort.value;
    render();
  });

  price?.addEventListener("input", () => {
    state.max = +price.value;
    render();
  });

  $("#resetFilters")?.addEventListener("click", () => {
    Object.assign(state, {
      cat: "all",
      subCat: "all",
      q: "",
      sort: "default",
      max: MAX,
    });
    if (q) q.value = "";
    if (sort) sort.value = "default";
    if (price) price.value = MAX;
    history.replaceState(null, "", location.pathname);
    render();
  });

  $("#filterBtn")?.addEventListener("click", () => {
    const filters = $("#filters");
    if (!filters) return;
    const open = filters.classList.toggle("open");
    $("#filterBtn").setAttribute("aria-expanded", open);
  });

  $("#resetFilters2")?.addEventListener("click", () =>
    $("#resetFilters")?.click(),
  );

  render();
})();

/* =========================
   9. Single product & related products (product.html)
========================= */
(() => {
  const detailWrap = $("#productDetail");
  if (!detailWrap) return;

  const params = new URLSearchParams(location.search);
  const product = Store.byId(params.get("id")) || PRODUCTS[0];
  if (!product) return;

  let selectedGrams = Store.defaultGramsFor(product);
  let selectedQty = 1;

  const clampQty = (q) => {
    const n = parseInt(q, 10);
    if (Number.isNaN(n)) return 1;
    return Math.max(1, Math.min(99, n));
  };

  const totalSelectionGrams = () => selectedGrams * selectedQty;
  const totalSelectionPrice = () =>
    Store.priceForGrams(product, selectedGrams) * selectedQty;

  const presetsHtml = Store.config.presets
    .map(
      (g) =>
        `<button type="button" class="gram-chip${selectedGrams === g ? " active" : ""}" data-grams="${g}">${g >= 1000 ? `${g / 1000}kg` : `${g}g`}</button>`,
    )
    .join("");

  document.title = `${product.name} | Harvest`;
  if ($("#pdTitle")) $("#pdTitle").textContent = product.name;
  if ($("#pdCrumbCat")) {
    $("#pdCrumbCat").textContent = Store.catName(product.cat);
    $("#pdCrumbCat").href =
      `products.html?cat=${encodeURIComponent(product.cat)}`;
  }
  if ($("#pdCrumbName")) $("#pdCrumbName").textContent = product.name;

  detailWrap.innerHTML = `
    <div class="pd__grid">
      <div class="pd__media">
        <img id="pdImg" src="${product.image}" alt="${product.name}" />
      </div>

      <div class="pd__info">
        <span class="pd__cat">${Store.catName(product.cat)}</span>
        <h2 class="pd__name">${product.name}</h2>
        <p class="pd__base-rate">Base price: <strong>${Store.money(product.price)}</strong> per ${Store.config.baseGrams}g</p>
        <p class="pd__desc">${product.desc || "Freshly sourced natural botanicals weighed to order."}</p>

        <div class="pd__grams-box">
          <div class="pd__field-group">
            <label for="pdGramsInput">Weight per pack (in grams)</label>
            <div class="pd__presets" id="pdPresets">${presetsHtml}</div>

            <div class="pd__stepper-row">
              <div class="qty qty--grams" role="group" aria-label="Weight in grams">
                <button type="button" id="pdDec" aria-label="Decrease grams">
                  <i class="fa-solid fa-minus"></i>
                </button>
                <input
                  type="number"
                  id="pdGramsInput"
                  min="${Store.config.minGrams}"
                  max="${Store.config.maxGrams}"
                  step="${Store.config.stepGrams}"
                  value="${selectedGrams}"
                />
                <span class="qty__unit">g</span>
                <button type="button" id="pdInc" aria-label="Increase grams">
                  <i class="fa-solid fa-plus"></i>
                </button>
              </div>

              <div class="pd__field-group pd__field-group--inline">
                <label for="pdQtyInput">Packs Qty</label>
                <div class="qty" role="group" aria-label="Number of packs">
                  <button type="button" id="pdQtyDec" aria-label="Decrease quantity">
                    <i class="fa-solid fa-minus"></i>
                  </button>
                  <input
                    type="number"
                    id="pdQtyInput"
                    min="1"
                    max="99"
                    value="${selectedQty}"
                  />
                  <button type="button" id="pdQtyInc" aria-label="Increase quantity">
                    <i class="fa-solid fa-plus"></i>
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div class="pd__summary-bar">
            <div class="pd__total-weight">
              <span>Total Weight</span>
              <strong id="pdTotalWeight">${Store.formatGrams(totalSelectionGrams())}</strong>
            </div>
            <div class="pd__calc-price">
              <span>Total Price</span>
              <strong id="pdCalcPrice">${Store.money(totalSelectionPrice())}</strong>
            </div>
          </div>
        </div>

        <div class="pd__actions">
          <button type="button" class="btn btn--primary" id="pdAddBtn">
            Add To Cart (${Store.formatGrams(totalSelectionGrams())}) <i class="fa-solid fa-bag-shopping"></i>
          </button>
          <button type="button" class="btn btn--outline pd__wish-btn" id="pdWishBtn" aria-pressed="false">
            <i class="fa-regular fa-heart"></i> <span>Save</span>
          </button>
        </div>
      </div>
    </div>
  `;

  const gramsInput = $("#pdGramsInput");
  const qtyInput = $("#pdQtyInput");
  const totalWeightEl = $("#pdTotalWeight");
  const calcPriceEl = $("#pdCalcPrice");
  const addBtn = $("#pdAddBtn");
  const wishBtn = $("#pdWishBtn");

  const syncSelectionUI = (g = selectedGrams, q = selectedQty) => {
    selectedGrams = Store.clampGrams(g);
    selectedQty = clampQty(q);

    if (gramsInput) gramsInput.value = selectedGrams;
    if (qtyInput) qtyInput.value = selectedQty;

    const fullGrams = totalSelectionGrams();
    if (totalWeightEl) {
      totalWeightEl.textContent = Store.formatGrams(fullGrams);
    }
    if (calcPriceEl) {
      calcPriceEl.textContent = Store.money(totalSelectionPrice());
    }
    if (addBtn) {
      addBtn.innerHTML = `Add To Cart (${Store.formatGrams(fullGrams)}) <i class="fa-solid fa-bag-shopping"></i>`;
    }
    $$("#pdPresets .gram-chip").forEach((chip) => {
      chip.classList.toggle("active", +chip.dataset.grams === selectedGrams);
    });
  };

  const syncSingleWish = () => {
    if (!wishBtn) return;
    const isLiked = Store.wishGet().includes(product.id);
    wishBtn.classList.toggle("is-liked", isLiked);
    wishBtn.setAttribute("aria-pressed", String(isLiked));
    const ic = wishBtn.querySelector("i");
    if (ic)
      ic.className = isLiked ? "fa-solid fa-heart" : "fa-regular fa-heart";
  };

  $("#pdPresets")?.addEventListener("click", (e) => {
    const chip = e.target.closest("[data-grams]");
    if (!chip) return;
    syncSelectionUI(+chip.dataset.grams, selectedQty);
  });

  $("#pdDec")?.addEventListener("click", () => {
    syncSelectionUI(selectedGrams - Store.config.stepGrams, selectedQty);
  });

  $("#pdInc")?.addEventListener("click", () => {
    syncSelectionUI(selectedGrams + Store.config.stepGrams, selectedQty);
  });

  gramsInput?.addEventListener("change", () => {
    syncSelectionUI(gramsInput.value, selectedQty);
  });

  $("#pdQtyDec")?.addEventListener("click", () => {
    syncSelectionUI(selectedGrams, selectedQty - 1);
  });

  $("#pdQtyInc")?.addEventListener("click", () => {
    syncSelectionUI(selectedGrams, selectedQty + 1);
  });

  qtyInput?.addEventListener("change", () => {
    syncSelectionUI(selectedGrams, qtyInput.value);
  });

  addBtn?.addEventListener("click", () => {
    const fullGrams = totalSelectionGrams();
    const added = Store.add(product.id, fullGrams);
    Store.fly($("#pdImg"));
    Store.toast(`${product.name} (${Store.formatGrams(added)}) added to cart`, {
      img: product.image,
      sub: `Total weight in cart: ${Store.formatGrams(Store.totalGrams())}`,
      link: "cart.html",
      linkText: "View cart",
    });
  });

  wishBtn?.addEventListener("click", () => {
    const on = Store.wishToggle(product.id);
    syncSingleWish();
    Store.toast(
      on
        ? `${product.name} saved to wishlist`
        : `${product.name} removed from wishlist`,
      { img: product.image },
    );
  });

  window.addEventListener("wish:change", syncSingleWish);
  syncSingleWish();

  /* ---------- Related Products ---------- */
  const relatedGrid = $("#relatedGrid");
  if (relatedGrid) {
    const sameCat = PRODUCTS.filter(
      (p) => p.id !== product.id && p.cat === product.cat,
    );
    const others = PRODUCTS.filter(
      (p) => p.id !== product.id && p.cat !== product.cat,
    );
    const relatedList = [...sameCat, ...others].slice(0, 6);

    relatedGrid.innerHTML = relatedList.map(renderProductCard).join("");
    Store.paintWish();
  }
})();

/* =========================
   10. Cart page & checkout in grams (cart.html)
========================= */
(() => {
  const cartList = $("#cartList");
  if (!cartList) return;

  const S = Store;
  const FREE_FROM = 500,
    SHIP_FEE = 40,
    COUPONS = { TEA10: 0.1 };

  let coupon = null;
  try {
    coupon = localStorage.getItem("harvest_tea_coupon");
  } catch (e) {}
  if (!COUPONS[coupon]) coupon = null;

  const saveCoupon = (c) => {
    try {
      c
        ? localStorage.setItem("harvest_tea_coupon", c)
        : localStorage.removeItem("harvest_tea_coupon");
    } catch (e) {}
  };

  function totals() {
    const items = S.get()
      .map((i) => {
        const prod = S.byId(i.id);
        if (!prod) return null;
        const grams = S.clampGrams(i.grams);
        const linePrice =
          i.customPrice !== null && i.customPrice !== undefined
            ? Number(i.customPrice)
            : S.priceForGrams(prod, grams);
        return {
          ...prod,
          id: String(prod.id),
          offerId: i.offerId || null,
          offerLabel: i.offerLabel || null,
          grams,
          linePrice,
        };
      })
      .filter(Boolean);

    const sub = items.reduce((s, i) => s + i.linePrice, 0);
    const gramsTotal = items.reduce((s, i) => s + i.grams, 0);
    const ship = sub === 0 || sub >= FREE_FROM ? 0 : SHIP_FEE;
    const disc = coupon ? sub * COUPONS[coupon] : 0;
    return {
      items,
      sub,
      count: items.length,
      gramsTotal,
      ship,
      disc,
      total: sub + ship - disc,
    };
  }

  function render() {
    const t = totals();
    document.body.classList.toggle("cart-is-empty", t.items.length === 0);

    cartList.innerHTML = t.items.length
      ? t.items
          .map(
            (p) => `
        <article class="ci" data-id="${p.id}" data-offer-id="${p.offerId || ""}">
          <a href="${S.productUrl(p.id)}" class="ci__img"><img src="${p.image}" alt="${p.name}" /></a>
          <div class="ci__info">
            <span class="ci__cat">${S.catName(p.cat)}${p.offerLabel ? ` • ${p.offerLabel}` : ""}</span>
            <h3><a href="${S.productUrl(p.id)}">${p.name}</a></h3>
            <span class="ci__unit">${
              p.offerLabel
                ? `Offer bundle (${p.grams}g)`
                : `${S.money(p.price)} per ${S.config.baseGrams}g`
            }</span>
          </div>
          <div class="qty qty--grams" role="group" aria-label="Weight in grams">
            <button type="button" data-act="dec" aria-label="Decrease grams"><i class="fa-solid fa-minus"></i></button>
            <input
              type="number"
              min="${S.config.minGrams}"
              max="${S.config.maxGrams}"
              step="${S.config.stepGrams}"
              value="${p.grams}"
              aria-label="Grams"
            />
            <span class="qty__unit">g</span>
            <button type="button" data-act="inc" aria-label="Increase grams"><i class="fa-solid fa-plus"></i></button>
          </div>
          <strong class="ci__total">${S.money(p.linePrice)}</strong>
          <button type="button" class="ci__rm" data-act="rm"><i class="fa-regular fa-trash-can"></i><span>Remove</span></button>
        </article>`,
          )
          .join("")
      : `<div class="cart-empty"><i class="fa-solid fa-mug-hot"></i><h3>Your cart is empty</h3>
         <p>Add something from our collection and it will show up here.</p>
         <a class="btn btn--primary" href="products.html">Shop Now</a></div>`;

    if ($("#sItems")) {
      $("#sItems").textContent = `${t.count} (${S.formatGrams(t.gramsTotal)})`;
    }
    if ($("#sSub")) $("#sSub").textContent = S.money(t.sub);
    if ($("#sShip"))
      $("#sShip").textContent = t.ship ? S.money(t.ship) : "Free";
    if ($("#sDisc"))
      $("#sDisc").textContent = (t.disc ? "- " : "") + S.money(t.disc);
    if ($("#sTotal")) $("#sTotal").textContent = S.money(t.total);
    if ($("#couponInput")) $("#couponInput").value = coupon || "";

    const left = FREE_FROM - t.sub;
    if ($("#shipBar")) {
      $("#shipBar").style.width =
        Math.min(100, (t.sub / FREE_FROM) * 100) + "%";
    }
    if ($("#shipMsg")) {
      $("#shipMsg").textContent =
        t.sub === 0
          ? `Free delivery on orders over ${FREE_FROM} EGP`
          : left > 0
            ? `Add ${S.money(left)} more for free delivery`
            : "You've unlocked free delivery!";
    }

    if ($("#recap")) {
      $("#recap").innerHTML = t.items
        .map(
          (p) => `
        <li><img src="${p.image}" alt="" /><span>${p.name} <small>(${p.grams}g)</small></span><b>${S.money(p.linePrice)}</b></li>`,
        )
        .join("");
    }
    if ($("#coTotal")) $("#coTotal").textContent = S.money(t.total);
  }

  cartList.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const id = b.closest(".ci").dataset.id,
      p = S.byId(id);
    const it = S.get().find((i) => i.id === id);
    const gone = () =>
      S.toast(`${p.name} removed`, {
        img: p.image,
        sub: "Removed from your cart",
      });

    if (b.dataset.act === "rm") {
      S.remove(id);
      gone();
    }
    if (b.dataset.act === "inc" && it) {
      S.setGrams(id, it.grams + S.config.stepGrams);
    }
    if (b.dataset.act === "dec" && it) {
      it.grams > S.config.minGrams
        ? S.setGrams(id, it.grams - S.config.stepGrams)
        : (S.remove(id), gone());
    }
  });

  cartList.addEventListener("change", (e) => {
    if (e.target.matches(".qty input")) {
      S.setGrams(e.target.closest(".ci").dataset.id, e.target.value);
    }
  });

  $("#clearCart")?.addEventListener("click", () => {
    if (!S.count()) return;
    S.clear();
    coupon = null;
    saveCoupon(null);
    S.toast("Cart cleared");
  });

  $("#couponForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const code = $("#couponInput").value.trim().toUpperCase();
    if (!COUPONS[code])
      return S.toast("Invalid coupon code", { type: "error" });
    coupon = code;
    saveCoupon(code);
    S.toast("Coupon applied", { sub: "10% off your order" });
    render();
  });

  $("#proceed")?.addEventListener("click", () => {
    if (!S.count())
      return S.toast("Your cart is empty", {
        type: "error",
        sub: "Add a product first",
      });
    $("#checkout")?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => $("#fullName")?.focus({ preventScroll: true }), 650);
  });

  $("#checkoutForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!S.count()) return S.toast("Your cart is empty", { type: "error" });
    const form = e.target;
    if (!form.checkValidity()) return form.reportValidity();
    const first = $("#fullName").value.trim().split(" ")[0];
    S.clear();
    coupon = null;
    saveCoupon(null);
    form.querySelector("button[type=submit]").disabled = true;
    S.toast(`Thank you, ${first}!`, {
      sub: "Your order has been placed successfully",
      time: 2400,
    });
    setTimeout(() => (location.href = "index.html"), 2400);
  });

  window.addEventListener("cart:change", render);
  render();
})();

/* =========================
   11. Wishlist drawer, language switcher, reels & contact form
========================= */
(() => {
  /* ---------- Wishlist panel ---------- */
  const wl = $("#wl"),
    wlList = $("#wlList"),
    wlCount = $("#wlCount");

  function renderWL() {
    if (!wlList) return;
    const items = Store.wishGet().map(Store.byId).filter(Boolean);
    if (wlCount) wlCount.textContent = items.length ? `(${items.length})` : "";

    wlList.innerHTML = items.length
      ? items
          .map(
            (p) => `
        <div class="wli" data-id="${p.id}">
          <a href="${Store.productUrl(p.id)}"><img src="${p.image}" alt="${p.name}" /></a>
          <div class="wli__info">
            <span>${Store.catName(p.cat)}</span>
            <h3><a href="${Store.productUrl(p.id)}">${p.name}</a></h3>
            <strong>${Store.money(p.price)} <small>/ ${Store.config.baseGrams}g</small></strong>
          </div>
          <button type="button" class="wli__rm" data-act="rm" aria-label="Remove ${p.name}"><i class="fa-regular fa-trash-can"></i></button>
          <button type="button" class="btn btn--primary btn--sm wli__add" data-act="add">Add To Cart (${Store.defaultGramsFor(p)}g)</button>
        </div>`,
          )
          .join("")
      : `<div class="wl__empty"><i class="fa-regular fa-heart"></i><p>Your wishlist is empty</p>
         <a class="btn btn--primary btn--sm" href="products.html">Browse Products</a></div>`;
  }

  function openWL() {
    if (!wl) return;
    renderWL();
    wl.classList.add("open");
    wl.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  }

  function closeWL() {
    if (!wl) return;
    wl.classList.remove("open");
    wl.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  }

  document.addEventListener("click", (e) => {
    if (e.target.closest("[data-open-wl]")) {
      e.preventDefault();
      openWL();
    } else if (e.target.closest("[data-close-wl]")) {
      closeWL();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeWL();
  });

  window.addEventListener("wish:change", () => {
    if (wl?.classList.contains("open")) renderWL();
  });

  wlList?.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const row = b.closest(".wli"),
      p = Store.byId(row.dataset.id);
    if (!p) return;

    if (b.dataset.act === "rm") {
      Store.wishToggle(p.id);
      Store.toast(`${p.name} removed from wishlist`, { img: p.image });
    } else {
      const addedGrams = Store.add(p.id);
      Store.fly(row.querySelector("img"));
      Store.toast(`${p.name} (${addedGrams}g) added to cart`, {
        img: p.image,
        sub: `Total weight in cart: ${Store.formatGrams(Store.totalGrams())}`,
        link: "cart.html",
        linkText: "View cart",
      });
    }
  });

  /* ---------- Language (شكل بس - من غير ترجمة) ---------- */
  const lang = $("#lang");
  if (lang) {
    const btn = $(".lang__btn", lang);
    btn?.addEventListener("click", (e) => {
      e.stopPropagation();
      const open = lang.classList.toggle("open");
      btn.setAttribute("aria-expanded", open);
    });

    document.addEventListener("click", () => {
      lang.classList.remove("open");
      btn?.setAttribute("aria-expanded", "false");
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

  /* ---------- Reels ---------- */
  const reels = $$(".reel-card");
  function setPlaying(target, play) {
    reels.forEach((card) => {
      const v = $("video", card),
        ic = $(".reel-play i", card);
      if (card === target && play) {
        card.classList.add("playing");
        if (ic) ic.className = "fa-solid fa-pause";
        v?.play().catch(() => {});
      } else {
        card.classList.remove("playing");
        if (ic) ic.className = "fa-solid fa-play";
        if (v && !v.paused) v.pause();
      }
    });
  }

  reels.forEach((card) => {
    const v = $("video", card);
    $(".reel-play", card)?.addEventListener("click", (e) => {
      e.stopPropagation();
      setPlaying(card, v?.paused);
    });
    v?.addEventListener("click", () => {
      if (!v.paused) setPlaying(card, false);
    });
  });

  /* ---------- Contact form ---------- */
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

/* =========================
   12. Preloader & Sale Popup
========================= */
(() => {
  const preloader = $("#preloader");
  const salePopup = $("#salePopup");
  const POPUP_DELAY_MS = 900;

  const hidePreloader = () => {
    if (!preloader) return;
    preloader.classList.add("is-hidden");
    setTimeout(() => {
      preloader.hidden = true;
    }, 450);
  };

  const openSalePopup = () => {
    if (!salePopup) return;
    salePopup.hidden = false;
    requestAnimationFrame(() => {
      salePopup.classList.add("is-open");
      document.body.classList.add("no-scroll");
    });
  };

  const closeSalePopup = () => {
    if (!salePopup || salePopup.hidden) return;
    salePopup.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
      salePopup.hidden = true;
    }, 320);
  };

  const onInitialReady = () => {
    hidePreloader();
    if (salePopup) {
      setTimeout(openSalePopup, POPUP_DELAY_MS);
    }
  };

  if (document.readyState === "complete") {
    onInitialReady();
  } else {
    window.addEventListener("load", onInitialReady, { once: true });
    setTimeout(onInitialReady, 2500);
  }

  $$("[data-close-sale]").forEach((el) => {
    el.addEventListener("click", closeSalePopup);
  });

  $("#saleShopNowBtn")?.addEventListener("click", closeSalePopup);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && salePopup && !salePopup.hidden) {
      closeSalePopup();
    }
  });

  $("#copySaleCodeBtn")?.addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const code = btn.dataset.code || "TEA10";
    try {
      await navigator.clipboard?.writeText(code);
    } catch (_) {}

    if (window.Store?.toast) {
      window.Store.toast(`Coupon "${code}" copied!`, {
        sub: "Apply it in the cart page for 10% off.",
      });
    }
  });
})();
