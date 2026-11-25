/* =====================================================================
   TABLE OF CONTENTS
   =====================================================================
   01. Store Data (Categories & Products)
   02. Shared Store State, Toast, Badge & Add-to-Cart
   03. Navigation, Dropdowns, Mobile Menu & Language Switcher
   04. Reels Video Controls
   05. Reviews Slider Controls
   06. Products Catalog Filtering, Search & Sorting
   07. Cart Page, Coupons & Checkout Form
   ===================================================================== */

/* =====================================================================
   01. Store Data (Categories & Products)
   ===================================================================== */
const imageUrl = (id) =>
  `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=700&q=80`;

const CATEGORIES = [
  { id: "cakes", name: "Artisan Cakes" },
  { id: "croissants", name: "Croissants" },
  { id: "donuts", name: "Glazed Donuts" },
  { id: "cookies", name: "Soft Cookies" },
];

const PRODUCTS = [
  {
    id: "p1",
    name: "Berry Velvet Tart",
    cat: "cakes",
    price: 45,
    weight: "1 pc",
    tag: "Best Seller",
    img: imageUrl("1565958011703-44f9829ba187"),
  },
  {
    id: "p2",
    name: "Classic Layer Cake",
    cat: "cakes",
    price: 450,
    weight: "1 kg",
    img: imageUrl("1578985545062-69928b1d9587"),
  },
  {
    id: "p3",
    name: "Almond Butter Croissant",
    cat: "croissants",
    price: 16,
    weight: "120 g",
    img: imageUrl("1530610476181-d83430b64dcd"),
  },
  {
    id: "p4",
    name: "Plain Butter Croissant",
    cat: "croissants",
    price: 18,
    weight: "100 g",
    img: imageUrl("1555507036-ab1f4038808a"),
  },
  {
    id: "p5",
    name: "Rose Glazed Donut",
    cat: "donuts",
    price: 20,
    weight: "1 pc",
    tag: "New",
    img: imageUrl("1514517220017-8ce97a34a7b6"),
  },
  {
    id: "p6",
    name: "Vanilla Sprinkle Donut",
    cat: "donuts",
    price: 25,
    weight: "1 pc",
    img: imageUrl("1551024601-bec78aea704b"),
  },
  {
    id: "p7",
    name: "Dark Choco Chunk",
    cat: "cookies",
    price: 25,
    weight: "80 g",
    img: imageUrl("1558961363-fa8fdf82db35"),
  },
  {
    id: "p8",
    name: "Brown Butter Cookie",
    cat: "cookies",
    price: 30,
    weight: "80 g",
    img: imageUrl("1499636136210-6f4ee915583e"),
  },
];

/* =====================================================================
   02. Shared Store State, Toast, Badge & Add-to-Cart
   ===================================================================== */
(function () {
  const CART_STORAGE_KEY = "harvest_cart";
  let toastContainer = null;

  /**
   * البحث عن منتج حسب المعرف (ID)
   */
  function findProductById(id) {
    return PRODUCTS.find((p) => p.id === id);
  }

  /**
   * تنسيق القيمة المالية بالدولار
   */
  function formatMoney(amount) {
    return "$" + Number(amount || 0).toFixed(2);
  }

  /**
   * قراءة عناصر السلة من localStorage
   */
  function getCartItems() {
    try {
      return JSON.parse(localStorage.getItem(CART_STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  /**
   * حفظ عناصر السلة وإطلاق حدث التحديث العام
   */
  function saveCartItems(items) {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
    } catch (e) {}
    window.dispatchEvent(new Event("cart:change"));
  }

  /**
   * حساب إجمالي عدد القطع في السلة
   */
  function getCartCount() {
    return getCartItems().reduce((sum, item) => sum + item.qty, 0);
  }

  /**
   * إضافة منتج إلى السلة أو زيادة كميته
   */
  function addToCart(productId, qty = 1) {
    const items = getCartItems();
    const existing = items.find((item) => item.id === productId);
    if (existing) {
      existing.qty = Math.min(99, existing.qty + qty);
    } else {
      items.push({ id: productId, qty });
    }
    saveCartItems(items);
  }

  /**
   * تحديث كمية منتج محدد في السلة
   */
  function setCartItemQty(productId, qty) {
    const validQty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    const updated = getCartItems().map((item) =>
      item.id === productId ? { ...item, qty: validQty } : item,
    );
    saveCartItems(updated);
  }

  /**
   * حذف منتج من السلة
   */
  function removeFromCart(productId) {
    const filtered = getCartItems().filter((item) => item.id !== productId);
    saveCartItems(filtered);
  }

  /**
   * إفراغ السلة بالكامل
   */
  function clearCartItems() {
    saveCartItems([]);
  }

  /**
   * إظهار إشعار منبثق (Toast) للنجاح أو الخطأ
   */
  function showToast(message, type = "success") {
    if (!toastContainer) {
      toastContainer = document.createElement("div");
      toastContainer.className = "toasts";
      toastContainer.setAttribute("aria-live", "polite");
      document.body.appendChild(toastContainer);
    }

    const toastEl = document.createElement("div");
    toastEl.className = "toast toast--" + type;
    const iconClass =
      type === "error" ? "fa-circle-exclamation" : "fa-circle-check";

    toastEl.innerHTML = `<i class="fa-solid ${iconClass}" aria-hidden="true"></i><span></span>`;
    toastEl.querySelector("span").textContent = message;
    toastContainer.appendChild(toastEl);

    requestAnimationFrame(() => toastEl.classList.add("show"));
    setTimeout(() => {
      toastEl.classList.remove("show");
      setTimeout(() => toastEl.remove(), 300);
    }, 3000);
  }

  /**
   * تحديث عداد السلة في شريط التنقل
   */
  function updateCartBadge() {
    const totalCount = getCartCount();
    document.querySelectorAll(".cart-count").forEach((badge) => {
      badge.textContent = totalCount;
      badge.hidden = totalCount === 0;
    });
  }

  /**
   * ربط أحداث أزرار الإضافة للسلة (.add-btn[data-id])
   */
  function bindAddToCartButtons() {
    document.addEventListener("click", (e) => {
      const btn = e.target.closest(".add-btn[data-id]");
      if (!btn) return;

      const product = findProductById(btn.dataset.id);
      if (!product) return;

      addToCart(product.id);
      showToast(`${product.name} added to cart`);

      const label = btn.querySelector("span");
      btn.classList.add("added");
      if (label) label.textContent = "Added";

      setTimeout(() => {
        btn.classList.remove("added");
        if (label) label.textContent = "Add";
      }, 1200);
    });
  }

  /**
   * تهيئة وحدة المتجر المشتركة
   */
  function initStore() {
    window.addEventListener("cart:change", updateCartBadge);
    window.addEventListener("storage", updateCartBadge);
    document.addEventListener("DOMContentLoaded", updateCartBadge);
    updateCartBadge();
    bindAddToCartButtons();
  }

  window.Store = {
    money: formatMoney,
    byId: findProductById,
    get: getCartItems,
    count: getCartCount,
    add: addToCart,
    setQty: setCartItemQty,
    remove: removeFromCart,
    clear: clearCartItems,
    toast: showToast,
  };

  initStore();
})();

/* =====================================================================
   03. Navigation, Dropdowns, Mobile Menu & Language Switcher
   ===================================================================== */
(function () {
  const menu = document.getElementById("menu");
  const burger = document.getElementById("burger");
  const dropdowns = document.querySelectorAll(".has-dd");
  const langOptions = document.querySelectorAll(".lang-dd [data-lang]");
  const langCurrents = document.querySelectorAll(".lang-current");

  if (!menu || !burger) return;

  /**
   * إغلاق جميع القوائم المنسدلة باستثناء عنصر محدد
   */
  function closeAllDropdowns(exceptItem) {
    dropdowns.forEach((item) => {
      if (item !== exceptItem) {
        item.classList.remove("open");
        const toggle = item.querySelector(".dd-toggle");
        if (toggle) toggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /**
   * إغلاق قائمة الموبايل
   */
  function closeMobileMenu() {
    menu.classList.remove("open");
    burger.setAttribute("aria-expanded", "false");
  }

  /**
   * تفعيل أزرار فتح وإغلاق القوائم المنسدلة
   */
  function initDropdowns() {
    dropdowns.forEach((item) => {
      const btn = item.querySelector(".dd-toggle");
      if (!btn) return;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        const isOpen = !item.classList.contains("open");
        closeAllDropdowns(item);
        item.classList.toggle("open", isOpen);
        btn.setAttribute("aria-expanded", String(isOpen));
      });
    });
  }

  /**
   * تفعيل خيارات اختيار اللغة في القائمة
   */
  function initLanguageSwitcher() {
    langOptions.forEach((option) => {
      option.addEventListener("click", () => {
        const selectedLang = option.dataset.lang;
        langCurrents.forEach((el) => {
          el.textContent = selectedLang;
        });

        langOptions.forEach((btn) => {
          btn.classList.toggle("active", btn.dataset.lang === selectedLang);
        });

        closeAllDropdowns();
      });
    });
  }

  /**
   * تفعيل زر الهامبرغر وإغلاق القوائم عند النقر خارجها أو الضغط على Escape
   */
  function initMobileMenuEvents() {
    burger.addEventListener("click", (e) => {
      e.stopPropagation();
      const isOpen = menu.classList.toggle("open");
      burger.setAttribute("aria-expanded", String(isOpen));
      if (!isOpen) closeAllDropdowns();
    });

    document.addEventListener("click", (e) => {
      if (!e.target.closest(".nav")) {
        closeAllDropdowns();
        closeMobileMenu();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        closeAllDropdowns();
        closeMobileMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth >= 992) {
        closeMobileMenu();
        closeAllDropdowns();
      }
    });

    menu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        closeAllDropdowns();
        closeMobileMenu();
      });
    });
  }

  initDropdowns();
  initLanguageSwitcher();
  initMobileMenuEvents();
})();

/* =====================================================================
   04. Reels Video Controls
   ===================================================================== */
(function () {
  const reelCards = document.querySelectorAll(".reel-card");
  if (!reelCards.length) return;

  /**
   * تشغيل فيديو Reel محدد وإيقاف باقي الفيديوهات
   */
  function setReelPlaying(targetCard, isPlaying) {
    reelCards.forEach((card) => {
      const video = card.querySelector("video");
      const icon = card.querySelector(".reel-play i");
      if (!video) return;

      if (card === targetCard && isPlaying) {
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

  /**
   * ربط أحداث التشغيل والإيقاف والانتهاء لكروت Reels
   */
  function initReels() {
    reelCards.forEach((card) => {
      const btn = card.querySelector(".reel-play");
      const video = card.querySelector("video");
      if (!btn || !video) return;

      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        setReelPlaying(card, video.paused);
      });

      video.addEventListener("click", () => {
        if (!video.paused) setReelPlaying(card, false);
      });

      video.addEventListener("ended", () => {
        setReelPlaying(card, false);
      });
    });
  }

  initReels();
})();

/* =====================================================================
   05. Reviews Slider Controls
   ===================================================================== */
(function () {
  const track = document.getElementById("revTrack");
  const prevBtn = document.getElementById("revPrev");
  const nextBtn = document.getElementById("revNext");

  if (!track || !prevBtn || !nextBtn) return;

  const cards = track.querySelectorAll(".rev-card");
  if (!cards.length) return;

  let currentIndex = 0;

  /**
   * تحديد عدد الكروت الظاهرة حسب عرض الشاشة
   */
  function getCardsPerView() {
    if (window.innerWidth <= 600) return 1;
    if (window.innerWidth <= 991) return 2;
    return 3;
  }

  /**
   * تحريك مسار التقييمات إلى الموضع الحالي
   */
  function updateReviewsSlider() {
    const perView = getCardsPerView();
    const maxIndex = Math.max(0, cards.length - perView);

    if (currentIndex > maxIndex) currentIndex = 0;
    if (currentIndex < 0) currentIndex = maxIndex;

    const cardWidth = cards[0].getBoundingClientRect().width;
    const gap = parseFloat(getComputedStyle(track).gap) || 0;
    const offset = currentIndex * (cardWidth + gap);

    track.style.transform = `translateX(-${offset}px)`;
  }

  /**
   * تفعيل أزرار السابق والتالي وتجاوب الشاشة
   */
  function initReviewsSlider() {
    nextBtn.addEventListener("click", () => {
      const perView = getCardsPerView();
      const maxIndex = Math.max(0, cards.length - perView);
      currentIndex = currentIndex >= maxIndex ? 0 : currentIndex + 1;
      updateReviewsSlider();
    });

    prevBtn.addEventListener("click", () => {
      const perView = getCardsPerView();
      const maxIndex = Math.max(0, cards.length - perView);
      currentIndex = currentIndex <= 0 ? maxIndex : currentIndex - 1;
      updateReviewsSlider();
    });

    window.addEventListener("resize", updateReviewsSlider);
    updateReviewsSlider();
  }

  initReviewsSlider();
})();

/* =====================================================================
   06. Products Catalog Filtering, Search & Sorting
   ===================================================================== */
(function () {
  const grid = document.getElementById("grid");
  const chips = document.getElementById("chips");
  const qInput = document.getElementById("q");
  const sortSel = document.getElementById("sort");
  const countEl = document.getElementById("count");
  const emptyEl = document.getElementById("empty");
  const resetBtn = document.getElementById("resetFilters");

  if (!grid || !chips) return;

  const params = new URLSearchParams(location.search);
  const state = {
    cat: CATEGORIES.some((c) => c.id === params.get("cat"))
      ? params.get("cat")
      : "all",
    q: "",
    sort: "default",
  };

  /**
   * رسم أزرار التصنيفات مع عدد المنتجات في كل قسم
   */
  function renderCategoryChips() {
    const allCategories = [{ id: "all", name: "All" }, ...CATEGORIES];
    chips.innerHTML = allCategories
      .map((cat) => {
        const itemCount =
          cat.id === "all"
            ? PRODUCTS.length
            : PRODUCTS.filter((p) => p.cat === cat.id).length;
        const activeClass = state.cat === cat.id ? " active" : "";

        return `<button type="button" class="chip${activeClass}" data-cat="${cat.id}">${cat.name} <small>${itemCount}</small></button>`;
      })
      .join("");
  }

  /**
   * بناء HTML لكارت منتج واحد
   */
  function createProductCard(product) {
    const categoryObj = CATEGORIES.find((c) => c.id === product.cat);
    const categoryName = categoryObj ? categoryObj.name : product.cat;

    return `<article class="prod-card">
      <div class="prod-card__img">
        ${product.tag ? `<span class="prod-tag">${product.tag}</span>` : ""}
        <img src="${product.img}" alt="${product.name}" loading="lazy" />
      </div>
      <div class="prod-card__body">
        <span class="prod-cat">${categoryName}</span>
        <h3>${product.name}</h3>
        <div class="prod-card__foot">
          <strong class="prod-price">${product.price} EGP</strong>
          <button type="button" class="add-btn" data-id="${product.id}" aria-label="Add ${product.name} to cart">
            <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i><span>Add</span>
          </button>
        </div>
      </div>
    </article>`;
  }

  /**
   * تصفية وترتيب وعرض المنتجات في الكتالوج
   */
  function renderCatalog() {
    let filteredList = PRODUCTS.filter(
      (p) =>
        (state.cat === "all" || p.cat === state.cat) &&
        p.name.toLowerCase().includes(state.q),
    );

    if (state.sort === "low") {
      filteredList.sort((a, b) => a.price - b.price);
    } else if (state.sort === "high") {
      filteredList.sort((a, b) => b.price - a.price);
    } else if (state.sort === "az") {
      filteredList.sort((a, b) => a.name.localeCompare(b.name));
    }

    grid.innerHTML = filteredList.map(createProductCard).join("");
    if (emptyEl) emptyEl.hidden = filteredList.length > 0;
    if (countEl) {
      countEl.textContent = `${filteredList.length} product${filteredList.length === 1 ? "" : "s"}`;
    }

    renderCategoryChips();
  }

  /**
   * تحديث بارامتر التصنيف في رابط الصفحة (URL)
   */
  function updateCategoryUrl(catId) {
    const url = new URL(location.href);
    if (catId === "all") {
      url.searchParams.delete("cat");
    } else {
      url.searchParams.set("cat", catId);
    }
    history.replaceState(null, "", url);
  }

  /**
   * إعادة تعيين جميع فلاتر البحث والترتيب والتصنيف
   */
  function resetAllFilters() {
    state.cat = "all";
    state.q = "";
    state.sort = "default";
    if (qInput) qInput.value = "";
    if (sortSel) sortSel.value = "default";
    history.replaceState(null, "", location.pathname);
    renderCatalog();
  }

  /**
   * ربط أحداث الكتالوج
   */
  function initCatalog() {
    chips.addEventListener("click", (e) => {
      const chipBtn = e.target.closest("[data-cat]");
      if (!chipBtn) return;
      state.cat = chipBtn.dataset.cat;
      updateCategoryUrl(state.cat);
      renderCatalog();
    });

    qInput?.addEventListener("input", () => {
      state.q = qInput.value.trim().toLowerCase();
      renderCatalog();
    });

    sortSel?.addEventListener("change", () => {
      state.sort = sortSel.value;
      renderCatalog();
    });

    resetBtn?.addEventListener("click", resetAllFilters);

    renderCatalog();
  }

  initCatalog();
})();

/* =====================================================================
   07. Cart Page, Coupons & Checkout Form
   ===================================================================== */
(function () {
  const rows = document.getElementById("cartRows");
  const cartMain = document.querySelector(".cart-main");
  if (!rows || !window.Store) return;

  const S = window.Store;
  const COUPONS = { SWEET10: 0.1 };
  const COUPON_STORAGE_KEY = "harvest_coupon";

  let activeCoupon = null;
  try {
    const savedCoupon = localStorage.getItem(COUPON_STORAGE_KEY);
    if (savedCoupon && COUPONS[savedCoupon]) {
      activeCoupon = savedCoupon;
    }
  } catch (e) {}

  /**
   * حفظ أو مسح كوبون الخصم من localStorage
   */
  function persistCoupon(code) {
    try {
      if (code) {
        localStorage.setItem(COUPON_STORAGE_KEY, code);
      } else {
        localStorage.removeItem(COUPON_STORAGE_KEY);
      }
    } catch (e) {}
  }

  /**
   * حساب المجموع الفرعي والشحن والخصم والإجمالي النهائي
   */
  function calculateCartTotals() {
    const items = S.get()
      .map((item) => ({ ...S.byId(item.id), qty: item.qty }))
      .filter((item) => item.id);

    const sub = items.reduce((sum, item) => sum + item.price * item.qty, 0);
    const count = items.reduce((sum, item) => sum + item.qty, 0);
    const ship = sub === 0 || sub >= 50 ? 0 : 5;
    const disc = activeCoupon ? sub * COUPONS[activeCoupon] : 0;
    const total = sub + ship - disc;

    return { items, sub, count, ship, disc, total };
  }

  /**
   * بناء HTML لصف واحد داخل جدول السلة
   */
  function createCartRow(product) {
    return `
      <div class="cart-row" data-id="${product.id}">
        <button class="rm" data-act="rm" aria-label="Remove ${product.name}">
          <i class="fa-solid fa-xmark"></i>
        </button>
        <div class="cart-prod">
          <img src="${product.img}" alt="${product.name}" />
          <div>
            <strong>${product.name}</strong>
            <span>${product.weight}</span>
          </div>
        </div>
        <div class="c-price" data-label="Price">${S.money(product.price)}</div>
        <div class="qty">
          <button data-act="dec" aria-label="Decrease">
            <i class="fa-solid fa-minus"></i>
          </button>
          <input type="number" min="1" max="99" value="${product.qty}" aria-label="Quantity" />
          <button data-act="inc" aria-label="Increase">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
        <div class="c-sub" data-label="Subtotal">${S.money(product.price * product.qty)}</div>
      </div>`;
  }

  /**
   * إعادة رسم جدول السلة وملخص الحسابات
   */
  function renderCartPage() {
    const totals = calculateCartTotals();

    if (cartMain) {
      cartMain.classList.toggle("is-empty", totals.items.length === 0);
    }

    rows.innerHTML = totals.items.length
      ? totals.items.map(createCartRow).join("")
      : `<div class="cart-empty">
          <i class="fa-solid fa-bag-shopping"></i>
          <p>Your cart is empty.</p>
          <a class="btn-primary" href="products.html">Browse Products</a>
        </div>`;

    const sItems = document.getElementById("sItems");
    const sSub = document.getElementById("sSub");
    const sShip = document.getElementById("sShip");
    const sDisc = document.getElementById("sDisc");
    const sTotal = document.getElementById("sTotal");
    const coTotal = document.getElementById("coTotal");
    const couponInput = document.getElementById("couponInput");

    if (sItems) sItems.textContent = totals.count;
    if (sSub) sSub.textContent = S.money(totals.sub);
    if (sShip) sShip.textContent = totals.ship ? S.money(totals.ship) : "Free";
    if (sDisc)
      sDisc.textContent = (totals.disc ? "-" : "") + S.money(totals.disc);
    if (sTotal) sTotal.textContent = S.money(totals.total);
    if (coTotal) coTotal.textContent = S.money(totals.total);
    if (couponInput) couponInput.value = activeCoupon || "";
  }

  /**
   * معالجة أزرار الحذف والزيادة والنقصان وإدخال الكمية مباشرة
   */
  function handleRowActions() {
    rows.addEventListener("click", (e) => {
      const actionBtn = e.target.closest("[data-act]");
      if (!actionBtn) return;

      const row = actionBtn.closest(".cart-row");
      if (!row) return;

      const id = row.dataset.id;
      const item = S.get().find((i) => i.id === id);
      const product = S.byId(id);
      const act = actionBtn.dataset.act;

      if (act === "rm") {
        S.remove(id);
        if (product) S.toast(`${product.name} removed`);
      } else if (act === "inc" && item) {
        S.setQty(id, item.qty + 1);
      } else if (act === "dec" && item) {
        if (item.qty > 1) {
          S.setQty(id, item.qty - 1);
        } else {
          S.remove(id);
          if (product) S.toast(`${product.name} removed`);
        }
      }
    });

    rows.addEventListener("change", (e) => {
      if (!e.target.matches(".qty input")) return;
      const row = e.target.closest(".cart-row");
      if (!row) return;
      S.setQty(row.dataset.id, e.target.value);
    });
  }

  /**
   * معالجة إفراغ السلة وكوبون الخصم والانتقال للدفع وإتمام الطلب
   */
  function handleCartControls() {
    const clearBtn = document.getElementById("clearCart");
    const couponForm = document.getElementById("couponForm");
    const proceedBtn = document.getElementById("proceed");
    const checkoutForm = document.getElementById("checkoutForm");

    clearBtn?.addEventListener("click", () => {
      if (!S.count()) return;
      S.clear();
      activeCoupon = null;
      persistCoupon(null);
      S.toast("Cart cleared");
    });

    couponForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      const input = document.getElementById("couponInput");
      const code = (input ? input.value : "").trim().toUpperCase();

      if (!COUPONS[code]) {
        return S.toast("Invalid coupon code", "error");
      }

      activeCoupon = code;
      persistCoupon(code);
      S.toast("Coupon applied: 10% off");
      renderCartPage();
    });

    proceedBtn?.addEventListener("click", () => {
      if (!S.count()) return S.toast("Your cart is empty", "error");
      const checkoutSec = document.getElementById("checkout");
      const nameInput = document.getElementById("fullName");

      checkoutSec?.scrollIntoView({ behavior: "smooth" });
      setTimeout(() => nameInput?.focus({ preventScroll: true }), 600);
    });

    checkoutForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!S.count()) return S.toast("Your cart is empty", "error");

      if (!checkoutForm.checkValidity()) {
        return checkoutForm.reportValidity();
      }

      const nameInput = document.getElementById("fullName");
      const firstName = (nameInput ? nameInput.value : "").trim().split(" ")[0];

      S.clear();
      activeCoupon = null;
      persistCoupon(null);

      const submitBtn = checkoutForm.querySelector("button[type=submit]");
      if (submitBtn) submitBtn.disabled = true;

      S.toast(`Thank you ${firstName}! Your order has been placed.`);
      setTimeout(() => {
        location.href = "index.html";
      }, 2000);
    });
  }

  /**
   * تهيئة صفحة السلة
   */
  function initCartPage() {
    handleRowActions();
    handleCartControls();
    window.addEventListener("cart:change", renderCartPage);
    renderCartPage();
  }

  initCartPage();
})();
