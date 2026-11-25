/* =====================================================================
   TABLE OF CONTENTS
   =====================================================================
   1. Helpers & Store Products Data (window.STORE_PRODUCTS)
   2. Shopping Cart Drawer, Checkout & Toast (window.StoreCart)
   3. Mobile Drawer & Static Links
   4. Hero Deals Slider & Theme Switcher (index.html)
   5. Home Products Grid, Filter & See More (index.html)
   6. Catalog Page Filtering, Brand Filter, Search & Sort (products.html)
   7. Preloader & Sale Popup Modal
===================================================================== */

/* =====================================================================
   1. Helpers & Store Products Data (window.STORE_PRODUCTS)
   ===================================================================== */
const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];

// تنسيق السعر بالجنيه المصري
const formatPrice = (n) => `${Number(n || 0).toLocaleString("en-US")} ج.م`;

window.STORE_PRODUCTS = [
  {
    id: 1,
    name: "نيسان GT-R نيسمو 2026",
    brand: "nissan",
    brandLabel: "Nissan",
    category: "سيارات رياضية",
    type: "cars",
    sub: "sports",
    rating: 4.9,
    price: 4250000,
    oldPrice: 4800000,
    badge: "عرض خاص",
    image: "images/nissan.png",
  },
  {
    id: 2,
    name: "طقم فرامل Brembo GT 6-Piston",
    brand: "brembo",
    brandLabel: "Brembo",
    category: "أنظمة الفرامل",
    type: "parts",
    sub: "brakes",
    rating: 4.8,
    price: 38500,
    oldPrice: 51000,
    badge: "-25%",
    image: "images/brembo-kit.png",
  },
  {
    id: 3,
    name: "طقم جنوط BBS Forged مقاس 20",
    brand: "bbs",
    brandLabel: "BBS",
    category: "الجنوط والإطارات",
    type: "wheels",
    sub: "rims",
    rating: 4.9,
    price: 64000,
    oldPrice: 78000,
    badge: "-18%",
    image: "images/forged wheels.png",
  },
  {
    id: 4,
    name: "شاحن تيربو Garrett G30-770",
    brand: "garrett",
    brandLabel: "Garrett",
    category: "الموتور والتيربو",
    type: "parts",
    sub: "engine",
    rating: 4.7,
    price: 52000,
    oldPrice: 65000,
    badge: "-20%",
    image: "images/turbo-kit.png",
  },
  {
    id: 5,
    name: "BMW M340i xDrive سبورت",
    brand: "bmw",
    brandLabel: "BMW",
    category: "سيدان فاخرة",
    type: "cars",
    sub: "sedan",
    rating: 4.9,
    price: 3650000,
    oldPrice: 3950000,
    badge: "جديد",
    image: "images/nissan.png",
  },
  {
    id: 6,
    name: "كيا سبورتاج GT-Line 2026",
    brand: "kia",
    brandLabel: "Kia",
    category: "دفع رباعي SUV",
    type: "cars",
    sub: "suv",
    rating: 4.8,
    price: 2150000,
    oldPrice: 2300000,
    badge: "-7%",
    image: "images/nissan.png",
  },
  {
    id: 7,
    name: "منظومة تبريد إنتركولر BMW M",
    brand: "bmw",
    brandLabel: "BMW",
    category: "الموتور والتيربو",
    type: "parts",
    sub: "engine",
    rating: 4.8,
    price: 24500,
    oldPrice: 29000,
    badge: "-15%",
    image: "images/turbo-kit.png",
  },
  {
    id: 8,
    name: "أقراص فرامل كربون سيراميك أمامية",
    brand: "brembo",
    brandLabel: "Brembo",
    category: "أنظمة الفرامل",
    type: "parts",
    sub: "brakes",
    rating: 5.0,
    price: 44000,
    oldPrice: 52000,
    badge: "الأكثر مبيعاً",
    image: "images/brembo-kit.png",
  },
  {
    id: 9,
    name: "جنوط سبور سوداء مطفية مقاس 19",
    brand: "bbs",
    brandLabel: "BBS",
    category: "الجنوط والإطارات",
    type: "wheels",
    sub: "rims",
    rating: 4.7,
    price: 49500,
    oldPrice: 57000,
    badge: "-13%",
    image: "images/forged wheels.png",
  },
  {
    id: 10,
    name: "كيا EV6 GT-Line كهربائية",
    brand: "kia",
    brandLabel: "Kia",
    category: "سيارات كهربائية",
    type: "cars",
    sub: "ev",
    rating: 4.9,
    price: 2890000,
    oldPrice: 3100000,
    badge: "-7%",
    image: "images/nissan.png",
  },
  {
    id: 11,
    name: "طقم فرامل خلفية 4-Piston رياضي",
    brand: "brembo",
    brandLabel: "Brembo",
    category: "أنظمة الفرامل",
    type: "parts",
    sub: "brakes",
    rating: 4.8,
    price: 27000,
    oldPrice: 31500,
    badge: "-14%",
    image: "images/brembo-kit.png",
  },
  {
    id: 12,
    name: "باقة تعديل وإكسسوارات أيروديناميك",
    brand: "garrett",
    brandLabel: "Garrett",
    category: "تعديل وإكسسوارات",
    type: "cars",
    sub: "tuning",
    rating: 4.9,
    price: 73000,
    oldPrice: 85000,
    badge: "عرض محدود",
    image: "images/nissan.png",
  },
];

/* =====================================================================
   2. Shopping Cart Drawer, Checkout & Toast (window.StoreCart)
   ===================================================================== */
(() => {
  const STORAGE_KEY = "apex_auto_cart_v1";

  // حقن واجهة السلة الجانبية ونموذج إتمام الطلب والإشعار تلقائياً
  const injectCartUI = () => {
    if (!document.getElementById("cartDrawer")) {
      document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="cart-drawer" id="cartDrawer" aria-hidden="true">
          <div class="cart-drawer__backdrop" data-close-cart></div>
          <aside class="cart-drawer__panel" aria-label="سلة المشتريات">
            <div class="cart-drawer__head">
              <div class="cart-drawer__title-wrap">
                <h2 class="cart-drawer__title" id="cartDrawerHeading">سلة المشتريات</h2>
                <span class="cart-drawer__count" id="cartDrawerCount">0 منتج</span>
              </div>
              <button class="navbar__icon" type="button" data-close-cart aria-label="إغلاق السلة">
                <i class="fa-solid fa-xmark"></i>
              </button>
            </div>

            <div class="cart-drawer__body" id="cartItemsList"></div>

            <form class="cart-checkout" id="cartCheckoutForm" hidden novalidate>
              <div class="cart-checkout__summary">
                <span>إجمالي الطلب</span>
                <strong id="cartCheckoutTotal">0 ج.م</strong>
              </div>

              <div class="cart-field">
                <label for="checkoutFullName">الاسم بالكامل (Full Name)</label>
                <input
                  type="text"
                  id="checkoutFullName"
                  name="fullName"
                  placeholder="مثال: أحمد محمود"
                  required
                />
              </div>

              <div class="cart-field">
                <label for="checkoutEmail">البريد الإلكتروني (Email)</label>
                <input
                  type="email"
                  id="checkoutEmail"
                  name="email"
                  placeholder="name@example.com"
                  required
                />
              </div>

              <div class="cart-field">
                <label for="checkoutPhone">رقم الهاتف (Phone Number)</label>
                <input
                  type="tel"
                  id="checkoutPhone"
                  name="phone"
                  placeholder="01000000000"
                  required
                />
              </div>

              <div class="cart-field">
                <label for="checkoutAddress">العنوان (Address)</label>
                <textarea
                  id="checkoutAddress"
                  name="address"
                  rows="2"
                  placeholder="المدينة، الحي، اسم الشارع، رقم العقار..."
                  required
                ></textarea>
              </div>

              <p class="cart-checkout__error" id="cartCheckoutError" hidden></p>

              <div class="cart-checkout__btns">
                <button class="cart-drawer__checkout" type="submit" id="cartSubmitOrderBtn">
                  <span>إرسال الطلب</span>
                  <i class="fa-solid fa-paper-plane"></i>
                </button>
                <button class="cart-checkout__back" type="button" id="cartBackBtn">
                  رجوع إلى السلة
                </button>
              </div>
            </form>

            <div class="cart-drawer__foot" id="cartDrawerFoot" hidden>
              <div class="cart-drawer__row">
                <span>الإجمالي الفرعي</span>
                <strong id="cartSubtotal">0 ج.م</strong>
              </div>
              <p class="cart-drawer__note">الشحن والتركيب يُحددان عند إتمام الطلب</p>
              <div class="cart-drawer__actions">
                <button class="cart-drawer__checkout" type="button" id="cartCheckoutBtn">
                  <span>إتمام الطلب</span>
                  <i class="fa-solid fa-arrow-left"></i>
                </button>
                <button class="cart-drawer__clear" type="button" id="cartClearBtn">
                  إفراغ السلة
                </button>
              </div>
            </div>
          </aside>
        </div>
        `,
      );
    }

    if (!document.getElementById("cartToast")) {
      document.body.insertAdjacentHTML(
        "beforeend",
        `
        <div class="cart-toast" id="cartToast" role="status" aria-live="polite" hidden>
          <span class="cart-toast__icon"><i class="fa-solid fa-check"></i></span>
          <div class="cart-toast__body">
            <strong class="cart-toast__title" id="cartToastTitle">تمت الإضافة إلى السلة</strong>
            <span class="cart-toast__desc" id="cartToastDesc"></span>
          </div>
          <button class="cart-toast__open" type="button" id="cartToastOpen">عرض السلة</button>
        </div>
        `,
      );
    }
  };

  injectCartUI();

  const cartDrawer = $("#cartDrawer");
  const cartHeadingEl = $("#cartDrawerHeading");
  const cartItemsList = $("#cartItemsList");
  const cartCountEl = $("#cartDrawerCount");
  const cartFootEl = $("#cartDrawerFoot");
  const cartSubtotalEl = $("#cartSubtotal");
  const cartBadgeEl = $("#cartBadge");

  const checkoutForm = $("#cartCheckoutForm");
  const checkoutTotalEl = $("#cartCheckoutTotal");
  const checkoutErrorEl = $("#cartCheckoutError");
  const fullNameInput = $("#checkoutFullName");
  const emailInput = $("#checkoutEmail");
  const phoneInput = $("#checkoutPhone");
  const addressInput = $("#checkoutAddress");

  const toastEl = $("#cartToast");
  const toastTitleEl = $("#cartToastTitle");
  const toastDescEl = $("#cartToastDesc");
  const toastOpenBtn = $("#cartToastOpen");

  let isCheckoutView = false;
  let toastTimer;

  // إظهار رسالة تنبيه سريعة (Toast)
  const showNotification = (
    desc,
    { title = "تمت الإضافة إلى السلة", showCartBtn = true } = {},
  ) => {
    if (!toastEl || !toastDescEl) return;
    if (toastTitleEl) toastTitleEl.textContent = title;
    toastDescEl.textContent = desc || "تم تنفيذ العملية بنجاح";
    if (toastOpenBtn) toastOpenBtn.hidden = !showCartBtn;

    toastEl.hidden = false;
    requestAnimationFrame(() => toastEl.classList.add("is-visible"));

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastEl.classList.remove("is-visible");
      setTimeout(() => {
        if (!toastEl.classList.contains("is-visible")) {
          toastEl.hidden = true;
        }
      }, 280);
    }, 3600);
  };

  // قراءة وحفظ بيانات السلة من localStorage
  const readCart = () => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  };

  let cart = readCart();

  const saveCart = () => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
    } catch {}
  };

  const getTotalCount = () =>
    cart.reduce((sum, item) => sum + (Number(item.qty) || 0), 0);

  const getSubtotal = () =>
    cart.reduce(
      (sum, item) => sum + (Number(item.price) || 0) * (Number(item.qty) || 0),
      0,
    );

  // التبديل بين عرض عناصر السلة ونموذج إتمام الطلب
  const setCheckoutMode = (active) => {
    isCheckoutView = Boolean(active) && cart.length > 0;
    if (cartHeadingEl) {
      cartHeadingEl.textContent = isCheckoutView
        ? "إتمام الطلب"
        : "سلة المشتريات";
    }
    if (cartItemsList) cartItemsList.hidden = isCheckoutView;
    if (cartFootEl) cartFootEl.hidden = isCheckoutView || cart.length === 0;
    if (checkoutForm) checkoutForm.hidden = !isCheckoutView;
    if (checkoutErrorEl) {
      checkoutErrorEl.hidden = true;
      checkoutErrorEl.textContent = "";
    }
    if (isCheckoutView && checkoutTotalEl) {
      checkoutTotalEl.textContent = formatPrice(getSubtotal());
    }
  };

  // إعادة رسم محتوى السلة والعداد
  const renderCart = () => {
    const totalCount = getTotalCount();

    if (cartBadgeEl) {
      cartBadgeEl.textContent = totalCount;
      cartBadgeEl.hidden = totalCount <= 0;
    }

    if (cartCountEl) {
      cartCountEl.textContent = `${totalCount} ${totalCount === 1 ? "منتج" : "منتجات"}`;
    }

    if (!cartItemsList || !cartFootEl) return;

    if (cart.length === 0) {
      setCheckoutMode(false);
      cartFootEl.hidden = true;
      cartItemsList.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-cart-shopping"></i>
          <h3>سلة المشتريات فارغة</h3>
          <p>أضف سيارات أو قطع غيار من المتجر وستظهر هنا فوراً.</p>
        </div>
      `;
      return;
    }

    if (cartSubtotalEl) cartSubtotalEl.textContent = formatPrice(getSubtotal());
    if (checkoutTotalEl) {
      checkoutTotalEl.textContent = formatPrice(getSubtotal());
    }

    cartItemsList.innerHTML = cart
      .map(
        (item) => `
        <div class="cart-item" data-cart-id="${item.id}">
          <img class="cart-item__img" src="${item.image}" alt="${item.name}" />
          <div class="cart-item__info">
            <span class="cart-item__cat">${item.category || ""}</span>
            <h4 class="cart-item__name">${item.name}</h4>
            <span class="cart-item__price">${formatPrice(item.price)}</span>
            <div class="cart-item__controls">
              <div class="cart-qty">
                <button type="button" data-qty-dec aria-label="تقليل الكمية">−</button>
                <span>${item.qty}</span>
                <button type="button" data-qty-inc aria-label="زيادة الكمية">+</button>
              </div>
              <button class="cart-item__remove" type="button" data-remove-item aria-label="حذف المنتج">
                <i class="fa-regular fa-trash-can"></i>
              </button>
            </div>
          </div>
        </div>
      `,
      )
      .join("");

    setCheckoutMode(isCheckoutView);
  };

  const openCart = () => {
    if (!cartDrawer) return;
    cartDrawer.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeCart = () => {
    if (!cartDrawer) return;
    cartDrawer.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    setCheckoutMode(false);
  };

  // عمليات إدارة عناصر السلة
  const addItem = (product, qty = 1, { notify = true } = {}) => {
    if (!product || product.id == null) return;
    const id = String(product.id);
    const existing = cart.find((item) => String(item.id) === id);

    if (existing) {
      existing.qty += qty;
    } else {
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category || "",
        price: Number(product.price) || 0,
        image: product.image || "",
        qty,
      });
    }

    saveCart();
    renderCart();
    if (notify) {
      showNotification(product.name, {
        title: "تمت الإضافة إلى السلة",
        showCartBtn: true,
      });
    }
  };

  const updateQty = (id, delta) => {
    const idx = cart.findIndex((item) => String(item.id) === String(id));
    if (idx === -1) return;
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    saveCart();
    renderCart();
  };

  const removeItem = (id) => {
    cart = cart.filter((item) => String(item.id) !== String(id));
    saveCart();
    renderCart();
  };

  const clearCart = () => {
    cart = [];
    saveCart();
    renderCart();
  };

  // أحداث السلة وإتمام الطلب
  $("#cartBtn")?.addEventListener("click", openCart);
  document.addEventListener("cart:open", openCart);

  $("#cartCheckoutBtn")?.addEventListener("click", () => {
    if (cart.length === 0) return;
    setCheckoutMode(true);
    setTimeout(() => fullNameInput?.focus(), 60);
  });

  $("#cartBackBtn")?.addEventListener("click", () => {
    setCheckoutMode(false);
  });

  checkoutForm?.addEventListener("submit", (e) => {
    e.preventDefault();

    const fullName = fullNameInput?.value.trim() || "";
    const email = emailInput?.value.trim() || "";
    const phone = phoneInput?.value.trim() || "";
    const address = addressInput?.value.trim() || "";

    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const phoneDigits = phone.replace(/[\s\-()]/g, "");
    const phoneValid = /^[+]?\d{7,15}$/.test(phoneDigits);

    const showCheckoutError = (msg, inputEl) => {
      if (checkoutErrorEl) {
        checkoutErrorEl.textContent = msg;
        checkoutErrorEl.hidden = false;
      }
      inputEl?.focus();
    };

    if (fullName.length < 2) {
      return showCheckoutError("من فضلك أدخل الاسم بالكامل.", fullNameInput);
    }
    if (!emailValid) {
      return showCheckoutError("من فضلك أدخل بريد إلكتروني صحيح.", emailInput);
    }
    if (!phoneValid) {
      return showCheckoutError("من فضلك أدخل رقم هاتف صحيح.", phoneInput);
    }
    if (address.length < 5) {
      return showCheckoutError("من فضلك أدخل العنوان بالتفصيل.", addressInput);
    }

    const totalPaid = formatPrice(getSubtotal());
    checkoutForm.reset();
    clearCart();
    closeCart();

    showNotification(
      `شكراً ${fullName}، تم استلام طلبك (${totalPaid}) وسيتم التوصيل إلى (${address}).`,
      {
        title: "تم إرسال طلبك بنجاح",
        showCartBtn: false,
      },
    );
  });

  toastOpenBtn?.addEventListener("click", () => {
    toastEl?.classList.remove("is-visible");
    if (toastEl) toastEl.hidden = true;
    openCart();
  });

  cartDrawer?.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-cart]")) closeCart();

    const row = e.target.closest("[data-cart-id]");
    if (!row) return;
    const id = row.dataset.cartId;

    if (e.target.closest("[data-qty-inc]")) updateQty(id, 1);
    if (e.target.closest("[data-qty-dec]")) updateQty(id, -1);
    if (e.target.closest("[data-remove-item]")) removeItem(id);
  });

  $("#cartClearBtn")?.addEventListener("click", clearCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && cartDrawer?.classList.contains("open")) {
      closeCart();
    }
  });

  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      cart = readCart();
      renderCart();
    }
  });

  window.StoreCart = {
    add: addItem,
    open: openCart,
    close: closeCart,
    clear: clearCart,
    count: getTotalCount,
    notify: showNotification,
  };

  renderCart();
})();

/* =====================================================================
   3. Mobile Drawer & Static Links
   ===================================================================== */
(() => {
  const drawer = $("#drawer");

  // منع السلوك الافتراضي للروابط الوهمية (#)
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');
    if (link) e.preventDefault();
  });

  const resetDrawerSubmenus = () => {
    if (!drawer) return;
    $$(".drawer__group.is-open", drawer).forEach((group) => {
      group.classList.remove("is-open");
      const btn = $(".drawer__trigger", group);
      if (btn) btn.setAttribute("aria-expanded", "false");
    });
  };

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
    resetDrawerSubmenus();
  };

  if (drawer) {
    // غلاف داخلي لحركة فتح/غلق القوائم الفرعية بسلاسة
    $$(".drawer__sublist", drawer).forEach((sublist) => {
      const inner = document.createElement("div");
      inner.className = "drawer__sublist-inner";
      while (sublist.firstChild) inner.appendChild(sublist.firstChild);
      sublist.appendChild(inner);
    });

    $$(".drawer__trigger", drawer).forEach((trigger) => {
      trigger.addEventListener("click", () => {
        const group = trigger.closest(".drawer__group");
        if (!group) return;
        const willOpen = !group.classList.contains("is-open");

        $$(".drawer__group.is-open", drawer).forEach((other) => {
          if (other !== group) {
            other.classList.remove("is-open");
            const otherBtn = $(".drawer__trigger", other);
            if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
          }
        });

        group.classList.toggle("is-open", willOpen);
        trigger.setAttribute("aria-expanded", String(willOpen));
      });
    });

    $$("[data-close-menu]").forEach((el) =>
      el.addEventListener("click", closeMenu),
    );
    $$(".drawer__links > .drawer__link, .drawer__sublink", drawer).forEach(
      (el) => el.addEventListener("click", closeMenu),
    );
  }

  $("#openMenu")?.addEventListener("click", openMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
})();

/* =====================================================================
   4. Hero Deals Slider & Theme Switcher (index.html)
   ===================================================================== */
(() => {
  const heroMedia = $("#heroMedia");
  const heroContent = $("#heroContent");
  const list = $("#dealList");
  const dotsWrap = $("#dots");
  const stage = $("#stage");

  if (!heroMedia || !heroContent || !list || !dotsWrap || !stage) return;

  // theme: carbon | racing-red | pearl | midnight-blue
  const deals = [
    {
      id: "gtr-nismo",
      category: "سيارات رياضية",
      cardName: "نيسان GT-R نيسمو",
      discountTag: "-12%",
      badge: "عرض خاص لفترة محدودة",
      watermark: "GT-R NISMO",
      title: "Nissan GT-R Nimso",
      desc: "قوة 600 حصان مع باقة صيانة مجانية لمدة 3 سنوات وترخيص مجاني لأول سنة.",
      price: 4250000,
      oldPrice: 4800000,
      ctaText: "احجز السيارة الآن",
      offerNote: "متبقي 3 سيارات فقط",
      theme: "carbon",
      image: "images/nissan.png",
    },
    {
      id: "brembo-kit",
      category: "قطع غيار رياضية",
      cardName: "طقم فرامل Brembo GT",
      discountTag: "-25%",
      badge: "خصم 25% على أنظمة الفرامل",
      watermark: "BREMBO GT",
      title: "طقم فرامل<br />Brembo 6-Piston",
      desc: "طنابير مهواة مع تيل سيراميك عالي التحمل لأقصر مسافة توقف في الظروف الشاقة.",
      price: 38500,
      oldPrice: 51000,
      ctaText: "اطلب الطقم الآن",
      offerNote: "شامل التركيب المجاني",
      theme: "racing-red",
      image: "images/brembo-kit.png",
    },
    {
      id: "forged-wheels",
      category: "جنوط وإطارات",
      cardName: "طقم جنوط BBS Forged",
      discountTag: "-18%",
      badge: "باقة التوفير الرباعية",
      watermark: "BBS FORGED",
      title: "جنوط BBS<br />مقاس 20 إنش",
      desc: "سبائك ألومنيوم خفيفة الوزن لثبات أعلى على السرعات العالية واستهلاك وقود أقل.",
      price: 64000,
      oldPrice: 78000,
      ctaText: "استفد بالعرض",
      offerNote: "ضمان 5 سنوات ضد الكسر",
      theme: "pearl",
      image: "images/forged wheels.png",
    },
    {
      id: "garrett-turbo",
      category: "تعديل المحركات",
      cardName: "شاحن تيربو Garrett G30",
      discountTag: "-20%",
      badge: "عرض الأداء الفائق",
      watermark: "TURBO G30",
      title: "تيربو Garrett<br />G30-770",
      desc: "استجابة فورية للمحرك وزيادة في القدرة الحصانية تصل إلى 750 حصان مع تبريد مزدوج.",
      price: 52000,
      oldPrice: 65000,
      ctaText: "اطلب القطعة الآن",
      offerNote: "متوفر توصيل سريع",
      theme: "midnight-blue",
      image: "images/turbo-kit.png",
    },
  ];

  const DEFAULT_THEME = "carbon";
  const heroWatermark = $("#heroWatermark");
  const heroBadge = $("#heroBadge span");
  const heroTitle = $("#heroTitle");
  const heroDesc = $("#heroDesc");
  const heroPrice = $("#heroPrice");
  const heroOldPrice = $("#heroOldPrice");
  const heroCtaText = $("#heroCtaText");
  const heroOfferNote = $("#heroOfferNote");

  let current = Math.max(
    0,
    deals.findIndex((d) => d.theme === DEFAULT_THEME),
  );
  let swapTimer;

  // رسم كروت العروض والنقاط
  list.innerHTML = deals
    .map(
      (d, i) => `
      <button class="deal-card" type="button" data-index="${i}" aria-pressed="false">
        <span class="deal-card__tag">${d.discountTag}</span>
        <img class="deal-card__img" src="${d.image}" alt="" loading="lazy" />
        <span class="deal-card__divider"></span>
        <span class="deal-card__info">
          <span class="deal-card__category">${d.category}</span>
          <span class="deal-card__name">${d.cardName}</span>
          <span class="deal-card__price">${formatPrice(d.price)}</span>
        </span>
      </button>`,
    )
    .join("");

  dotsWrap.innerHTML = deals
    .map(
      (d, i) =>
        `<button class="dot" type="button" role="tab" data-index="${i}" aria-label="${d.cardName}"></button>`,
    )
    .join("");

  const cards = $$(".deal-card", list);
  const dots = $$(".dot", dotsWrap);

  // تحميل صور العروض مسبقاً لتقليل التقطيع عند التبديل
  deals.forEach((d) => {
    const img = new Image();
    img.src = d.image;
  });

  const scrollCardIntoView = (card) => {
    const left = card.offsetLeft - (list.clientWidth - card.clientWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  };

  const updateHeroText = (deal) => {
    if (heroWatermark) heroWatermark.textContent = deal.watermark;
    if (heroBadge) heroBadge.textContent = deal.badge;
    if (heroTitle) heroTitle.innerHTML = deal.title;
    if (heroDesc) heroDesc.textContent = deal.desc;
    if (heroPrice) heroPrice.textContent = formatPrice(deal.price);
    if (heroOldPrice) heroOldPrice.textContent = formatPrice(deal.oldPrice);
    if (heroCtaText) heroCtaText.textContent = deal.ctaText;
    if (heroOfferNote) {
      heroOfferNote.innerHTML = `<i class="fa-regular fa-clock"></i> ${deal.offerNote}`;
    }
  };

  const setDeal = (index, { animate = true } = {}) => {
    current = (index + deals.length) % deals.length;
    const deal = deals[current];

    // 1) تغيير ثيم الصفحة بالكامل
    document.body.dataset.theme = deal.theme;

    // 2) تفعيل الكارت والنقطة المطابقة
    cards.forEach((card, i) => {
      const active = i === current;
      card.classList.toggle("is-active", active);
      card.setAttribute("aria-pressed", String(active));
    });

    dots.forEach((dot, i) => {
      const active = i === current;
      dot.classList.toggle("is-active", active);
      dot.setAttribute("aria-selected", String(active));
    });

    if (cards[current]) scrollCardIntoView(cards[current]);

    // 3) تحديث الصورة ومحتوى العرض في الـ Hero
    if (!animate) {
      heroMedia.src = deal.image;
      heroMedia.alt = deal.cardName;
      updateHeroText(deal);
      return;
    }

    clearTimeout(swapTimer);
    heroMedia.classList.add("is-out");
    heroContent.classList.add("is-swapping");

    swapTimer = setTimeout(() => {
      heroMedia.src = deal.image;
      heroMedia.alt = deal.cardName;
      updateHeroText(deal);

      heroMedia.classList.remove("is-out");
      heroContent.classList.remove("is-swapping");
    }, 260);
  };

  list.addEventListener("click", (e) => {
    const card = e.target.closest(".deal-card");
    if (card) setDeal(Number(card.dataset.index));
  });

  dotsWrap.addEventListener("click", (e) => {
    const dot = e.target.closest(".dot");
    if (dot) setDeal(Number(dot.dataset.index));
  });

  $("#prevDeal")?.addEventListener("click", () => setDeal(current - 1));
  $("#nextDeal")?.addEventListener("click", () => setDeal(current + 1));

  document.addEventListener("keydown", (e) => {
    if (e.key === "ArrowRight") setDeal(current - 1);
    if (e.key === "ArrowLeft") setDeal(current + 1);
  });

  // السحب باللمس على الموبايل
  let touchStartX = 0;

  stage.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].clientX;
    },
    { passive: true },
  );

  stage.addEventListener(
    "touchend",
    (e) => {
      const dx = e.changedTouches[0].clientX - touchStartX;
      if (Math.abs(dx) > 50) setDeal(current + (dx > 0 ? 1 : -1));
    },
    { passive: true },
  );

  $("#heroCta")?.addEventListener("click", (e) => {
    e.preventDefault();
    const deal = deals[current];
    if (deal && window.StoreCart) {
      window.StoreCart.add({
        id: deal.id,
        name: deal.cardName,
        category: deal.category,
        price: deal.price,
        image: deal.image,
      });
      window.StoreCart.open();
    }
  });

  setDeal(current, { animate: false });
})();

/* =====================================================================
   5. Home Products Grid, Filter & See More (index.html)
   ===================================================================== */
(() => {
  const homeProductsGrid = $("#productsGrid");
  if (!homeProductsGrid) return;

  const products = window.STORE_PRODUCTS || [];
  const homeFilterTabs = $("#productFilters");
  const seeMoreBtn = $("#seeMoreBtn");
  const seeMoreText = $("#seeMoreText");

  const INITIAL_VISIBLE = 8;
  let activeCategory = "all";
  let isExpanded = false;

  const renderHomeProducts = () => {
    const filtered =
      activeCategory === "all"
        ? products
        : products.filter((p) => p.type === activeCategory);

    const visibleItems = isExpanded
      ? filtered
      : filtered.slice(0, INITIAL_VISIBLE);

    homeProductsGrid.innerHTML = visibleItems
      .map(
        (item) => `
        <article class="product-card" data-id="${item.id}">
          ${item.badge ? `<span class="product-card__badge">${item.badge}</span>` : ""}
          <a href="product-details.html?id=${item.id}" class="product-card__media product-card__link">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </a>
          <div class="product-card__body">
            <div class="product-card__meta">
              <span>${item.category}${item.brandLabel ? ` • ${item.brandLabel}` : ""}</span>
              <span class="product-card__rating">
                <i class="fa-solid fa-star"></i> ${item.rating}
              </span>
            </div>
            <h3 class="product-card__title">
              <a href="product-details.html?id=${item.id}">${item.name}</a>
            </h3>
            <div class="product-card__footer">
              <div>
                <span class="product-card__price">${formatPrice(item.price)}</span>
                ${
                  item.oldPrice
                    ? `<span class="product-card__old">${formatPrice(item.oldPrice)}</span>`
                    : ""
                }
              </div>
              <button class="product-card__btn" type="button" data-add-cart aria-label="أضف ${item.name} إلى السلة">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </article>`,
      )
      .join("");

    if (seeMoreBtn && seeMoreText) {
      const hasMore = filtered.length > INITIAL_VISIBLE;
      seeMoreBtn.hidden = !hasMore;
      seeMoreBtn.classList.toggle("is-expanded", isExpanded);
      seeMoreText.textContent = isExpanded ? "عرض أقل" : "عرض المزيد";
    }
  };

  homeFilterTabs?.addEventListener("click", (e) => {
    const tab = e.target.closest(".filter-tab");
    if (!tab) return;

    activeCategory = tab.dataset.cat;
    isExpanded = false;

    $$(".filter-tab", homeFilterTabs).forEach((btn) =>
      btn.classList.toggle("is-active", btn === tab),
    );

    renderHomeProducts();
  });

  seeMoreBtn?.addEventListener("click", () => {
    isExpanded = !isExpanded;
    renderHomeProducts();
  });

  homeProductsGrid.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-cart]");
    if (!addBtn) return;
    const card = addBtn.closest(".product-card");
    const product = products.find((p) => String(p.id) === card?.dataset.id);
    if (product && window.StoreCart) {
      window.StoreCart.add(product);
      addBtn.classList.add("is-added");
      setTimeout(() => addBtn.classList.remove("is-added"), 450);
    }
  });

  renderHomeProducts();
})();

/* =====================================================================
   6. Catalog Page Filtering, Brand Filter, Search & Sort (products.html)
   ===================================================================== */
(() => {
  const catalogGrid = $("#catalogGrid");
  if (!catalogGrid) return;

  const products = window.STORE_PRODUCTS || [];
  const emptyState = $("#catalogEmpty");
  const countEl = $("#catalogCount");
  const titleEl = $("#catalogTitle");
  const breadcrumbEl = $("#breadcrumbCurrent");

  const catTabs = $("#catTabs");
  const brandFilter = $("#brandFilter");
  const subFilter = $("#subFilter");
  const searchInput = $("#searchInput");
  const sortSelect = $("#sortSelect");
  const resetBtn = $("#resetFiltersBtn");

  const TITLES = {
    all: "جميع السيارات وقطع الغيار",
    cars: "قسم السيارات",
    parts: "قسم قطع الغيار",
    wheels: "قسم الجنوط والإطارات",
    sports: "سيارات رياضية",
    suv: "دفع رباعي SUV",
    sedan: "سيدان فاخرة",
    ev: "سيارات كهربائية",
    engine: "الموتور والتيربو",
    brakes: "أنظمة الفرامل",
    suspension: "المساعدين والعفشة",
    rims: "جنوط سبور",
    tires: "إطارات أداء عالي",
    oils: "الزيوت والفلاتر",
    tuning: "تعديل وإكسسوارات",
  };

  const BRAND_LABELS = {
    all: "كل البراندات",
    bmw: "BMW",
    kia: "Kia",
    nissan: "Nissan",
    brembo: "Brembo",
    bbs: "BBS",
    garrett: "Garrett",
  };

  // قراءة الفلاتر من رابط الصفحة عند التحميل
  const params = new URLSearchParams(window.location.search);
  const state = {
    cat: params.get("cat") || "all",
    sub: params.get("sub") || "all",
    brand: params.get("brand") || "all",
    search: "",
    sort: "default",
  };

  const syncUIWithState = () => {
    if (catTabs) {
      $$(".filter-tab", catTabs).forEach((btn) =>
        btn.classList.toggle("is-active", btn.dataset.cat === state.cat),
      );
    }
    if (brandFilter) {
      $$(".brand-pill", brandFilter).forEach((btn) =>
        btn.classList.toggle("is-active", btn.dataset.brand === state.brand),
      );
    }
    if (subFilter) subFilter.value = state.sub;

    const catLabel =
      state.sub !== "all"
        ? TITLES[state.sub] || TITLES[state.cat]
        : TITLES[state.cat] || TITLES.all;

    const label =
      state.brand !== "all"
        ? `${catLabel} — ${BRAND_LABELS[state.brand] || state.brand.toUpperCase()}`
        : catLabel;

    if (titleEl) titleEl.textContent = label;
    if (breadcrumbEl) breadcrumbEl.textContent = label;
  };

  const syncURL = () => {
    const url = new URL(window.location.href);
    if (state.cat && state.cat !== "all") {
      url.searchParams.set("cat", state.cat);
    } else {
      url.searchParams.delete("cat");
    }

    if (state.sub && state.sub !== "all") {
      url.searchParams.set("sub", state.sub);
    } else {
      url.searchParams.delete("sub");
    }

    if (state.brand && state.brand !== "all") {
      url.searchParams.set("brand", state.brand);
    } else {
      url.searchParams.delete("brand");
    }

    window.history.replaceState({}, "", url);
  };

  const renderCatalog = () => {
    let list = [...products];

    if (state.cat !== "all") {
      list = list.filter((p) => p.type === state.cat);
    }

    if (state.sub !== "all") {
      list = list.filter((p) => p.sub === state.sub);
    }

    if (state.brand !== "all") {
      list = list.filter((p) => p.brand === state.brand);
    }

    if (state.search.trim()) {
      const q = state.search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q) ||
          (p.brandLabel || "").toLowerCase().includes(q) ||
          (p.brand || "").toLowerCase().includes(q),
      );
    }

    if (state.sort === "price-asc") {
      list.sort((a, b) => a.price - b.price);
    } else if (state.sort === "price-desc") {
      list.sort((a, b) => b.price - a.price);
    } else if (state.sort === "rating") {
      list.sort((a, b) => b.rating - a.rating);
    }

    if (countEl) countEl.textContent = `${list.length} منتج`;

    if (list.length === 0) {
      catalogGrid.innerHTML = "";
      if (emptyState) emptyState.hidden = false;
      return;
    }

    if (emptyState) emptyState.hidden = true;
    catalogGrid.innerHTML = list
      .map(
        (item) => `
        <article class="product-card" data-id="${item.id}">
          ${item.badge ? `<span class="product-card__badge">${item.badge}</span>` : ""}
          <a href="product-details.html?id=${item.id}" class="product-card__media product-card__link">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </a>
          <div class="product-card__body">
            <div class="product-card__meta">
              <span>${item.category}${item.brandLabel ? ` • ${item.brandLabel}` : ""}</span>
              <span class="product-card__rating">
                <i class="fa-solid fa-star"></i> ${item.rating.toFixed(1)}
              </span>
            </div>
            <h3 class="product-card__title">
              <a href="product-details.html?id=${item.id}">${item.name}</a>
            </h3>
            <div class="product-card__footer">
              <div>
                <span class="product-card__price">${formatPrice(item.price)}</span>
                ${
                  item.oldPrice
                    ? `<span class="product-card__old">${formatPrice(item.oldPrice)}</span>`
                    : ""
                }
              </div>
              <button class="product-card__btn" type="button" data-add-cart aria-label="أضف ${item.name} إلى السلة">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </article>`,
      )
      .join("");
  };

  catTabs?.addEventListener("click", (e) => {
    const tab = e.target.closest(".filter-tab");
    if (!tab) return;
    state.cat = tab.dataset.cat;
    state.sub = "all";
    syncUIWithState();
    syncURL();
    renderCatalog();
  });

  brandFilter?.addEventListener("click", (e) => {
    const pill = e.target.closest(".brand-pill");
    if (!pill) return;
    state.brand = pill.dataset.brand;
    syncUIWithState();
    syncURL();
    renderCatalog();
  });

  subFilter?.addEventListener("change", () => {
    state.sub = subFilter.value;
    syncUIWithState();
    syncURL();
    renderCatalog();
  });

  searchInput?.addEventListener("input", () => {
    state.search = searchInput.value;
    renderCatalog();
  });

  sortSelect?.addEventListener("change", () => {
    state.sort = sortSelect.value;
    renderCatalog();
  });

  resetBtn?.addEventListener("click", () => {
    state.cat = "all";
    state.sub = "all";
    state.brand = "all";
    state.search = "";
    state.sort = "default";
    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "default";
    syncUIWithState();
    syncURL();
    renderCatalog();
  });

  catalogGrid.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-cart]");
    if (!addBtn) return;
    const card = addBtn.closest(".product-card");
    const product = products.find((p) => String(p.id) === card?.dataset.id);
    if (product && window.StoreCart) {
      window.StoreCart.add(product);
      addBtn.classList.add("is-added");
      setTimeout(() => addBtn.classList.remove("is-added"), 450);
    }
  });

  syncUIWithState();
  renderCatalog();
})();

/* =====================================================================
   7. Preloader & Sale Popup Modal
   ===================================================================== */
(() => {
  const preloader = $("#preloader");
  const saleModal = $("#saleModal");
  const POPUP_DELAY_MS = 700;
  let popupTimer = null;

  const hidePreloader = () => {
    if (!preloader || preloader.hidden) return;
    preloader.classList.add("is-hidden");
    setTimeout(() => {
      preloader.hidden = true;
    }, 450);
  };

  const openSaleModal = () => {
    if (!saleModal) return;
    saleModal.removeAttribute("hidden");
    saleModal.hidden = false;
    document.body.classList.add("no-scroll");
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        saleModal.classList.add("is-open");
      });
    });
  };

  const closeSaleModal = () => {
    if (!saleModal || saleModal.hidden) return;
    if (popupTimer) {
      clearTimeout(popupTimer);
      popupTimer = null;
    }
    saleModal.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
      if (!saleModal.classList.contains("is-open")) {
        saleModal.hidden = true;
      }
    }, 320);
  };

  const scheduleSaleModal = () => {
    if (!saleModal || popupTimer) return;
    popupTimer = setTimeout(openSaleModal, POPUP_DELAY_MS);
  };

  const onPageReady = () => {
    hidePreloader();
    scheduleSaleModal();
  };

  if (document.readyState === "complete") {
    onPageReady();
  } else {
    window.addEventListener("load", onPageReady, { once: true });
    setTimeout(onPageReady, 2200);
  }

  $$("[data-close-sale]").forEach((el) => {
    el.addEventListener("click", closeSaleModal);
  });

  $("#saleExploreBtn")?.addEventListener("click", () => {
    if (popupTimer) {
      clearTimeout(popupTimer);
      popupTimer = null;
    }
    saleModal?.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    if (saleModal) saleModal.hidden = true;
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && saleModal && !saleModal.hidden) {
      closeSaleModal();
    }
  });

  $("#copySaleCode")?.addEventListener("click", async (e) => {
    const btn = e.currentTarget;
    const code = btn.dataset.code || "APEX25";
    try {
      await navigator.clipboard?.writeText(code);
    } catch {}

    window.StoreCart?.notify?.(`تم نسخ كود الخصم (${code}) بنجاح`, {
      title: "كوبون الخصم جاهز",
      showCartBtn: false,
    });
  });

  // لإعادة فتح نافذة العروض في أي وقت للاختبار
  window.openSaleModal = openSaleModal;
  window.closeSaleModal = closeSaleModal;
})();

/* =====================================================================
   8. Product Details & Related Products (product-details.html)
   ===================================================================== */
(() => {
  const detailsWrap = $("#productDetailsWrap");
  if (!detailsWrap) return;

  const products = window.STORE_PRODUCTS || [];
  const params = new URLSearchParams(window.location.search);
  const product =
    products.find((p) => String(p.id) === String(params.get("id"))) ||
    products[0];

  if (!product) return;

  // بيانات افتراضية ذكية للصور والألوان والفئات حسب نوع المنتج (سيارة أو قطعة غيار)
  const isCar = product.type === "cars";

  const galleryImages = product.images?.length
    ? product.images
    : isCar
      ? [
          product.image,
          "images/forged wheels.png",
          "images/brembo-kit.png",
          "images/turbo-kit.png",
        ]
      : [
          product.image,
          "images/brembo-kit.png",
          "images/turbo-kit.png",
          "images/forged wheels.png",
        ];

  const colorOptions = product.colors?.length
    ? product.colors
    : isCar
      ? [
          { name: "أسود كربوني", hex: "#18181b", imgIndex: 0 },
          { name: "أحمر سباقات", hex: "#dc2626", imgIndex: 0 },
          { name: "أبيض لؤلؤي", hex: "#f8fafc", imgIndex: 0 },
          { name: "أزرق ليلي", hex: "#1d4ed8", imgIndex: 0 },
        ]
      : [
          { name: "أسود مطفي", hex: "#18181b", imgIndex: 0 },
          { name: "أحمر رياضي", hex: "#dc2626", imgIndex: 0 },
          { name: "فضي معدني", hex: "#94a3b8", imgIndex: 0 },
        ];

  const trimOptions = product.trims?.length
    ? product.trims
    : isCar
      ? [
          { name: "Standard", subtitle: "التجهيز القياسي", extraPrice: 0 },
          {
            name: "Sport",
            subtitle: "باقة الأداء الرياضي",
            extraPrice: 180000,
          },
          {
            name: "Full Option / GT",
            subtitle: "أعلى فئة + ضمان 5 سنوات",
            extraPrice: 350000,
          },
        ]
      : [
          {
            name: "النسخة القياسية",
            subtitle: "مطابقة لمواصفات المصنع",
            extraPrice: 0,
          },
          {
            name: "نسخة الأداء العالي",
            subtitle: "تحمل حرارة وضغط مضاعف",
            extraPrice: 4500,
          },
        ];

  let activeImgIdx = 0;
  let selectedColor = colorOptions[0];
  let selectedTrim = trimOptions[0];
  let qty = 1;

  const currentPrice = () =>
    Number(product.price || 0) + Number(selectedTrim?.extraPrice || 0);

  // تحديث عنوان الصفحة ومسار التنقل
  document.title = `${product.name} — APEX AUTO`;
  if ($("#pdCrumbCat")) {
    $("#pdCrumbCat").textContent = product.category;
    $("#pdCrumbCat").href =
      `products.html?cat=${encodeURIComponent(product.type)}`;
  }
  if ($("#pdCrumbName")) {
    $("#pdCrumbName").textContent = product.name;
  }

  detailsWrap.innerHTML = `
    <!-- اليمين: التفاصيل واختيار اللون والفئة -->
    <div class="pd-info">
      <div class="pd-info__top">
        <div class="pd-info__tags">
          ${product.brandLabel ? `<span class="pd-brand-tag">${product.brandLabel}</span>` : ""}
          <span class="pd-cat-tag">${product.category}</span>
        </div>
        <div class="pd-rating">
          <i class="fa-solid fa-star"></i>
          <strong>${Number(product.rating || 4.8).toFixed(1)}</strong>
          <span>(تقييم معتمد)</span>
        </div>
      </div>

      <h1 class="pd-title">${product.name}</h1>

      <p class="pd-desc">
        ${
          product.desc ||
          (isCar
            ? "أداء رياضي متكامل مع نظام تعليق متطور وتجهيزات أمان حديثة، متاحة الآن للحجز الفوري مع باقة صيانة وضمان معتمد من APEX AUTO."
            : "قطعة أصلية عالية الاعتمادية مصممة لتحمل أقصى ظروف القيادة، متوافقة بدقة مع مواصفات المصنع مع ضمان شامل.")
        }
      </p>

      <div class="pd-pricing">
        <span class="pd-price" id="pdPrice">${formatPrice(currentPrice())}</span>
        ${
          product.oldPrice
            ? `<span class="pd-old-price" id="pdOldPrice">${formatPrice(product.oldPrice)}</span>`
            : ""
        }
      </div>

      <!-- اختيار اللون -->
      <div class="pd-group">
        <div class="pd-group__head">
          <span>اختر اللون:</span>
          <span class="pd-group__selected" id="pdColorName">${selectedColor.name}</span>
        </div>
        <div class="pd-colors" id="pdColorsWrap">
          ${colorOptions
            .map(
              (c, idx) => `
              <button
                type="button"
                class="pd-color-btn${idx === 0 ? " is-active" : ""}"
                data-color-idx="${idx}"
                style="--swatch: ${c.hex}"
                title="${c.name}"
                aria-label="${c.name}"
              ></button>`,
            )
            .join("")}
        </div>
      </div>

      <!-- اختيار الفئة -->
      <div class="pd-group">
        <div class="pd-group__head">
          <span>اختر الفئة / الطراز:</span>
          <span class="pd-group__selected" id="pdTrimName">${selectedTrim.name}</span>
        </div>
        <div class="pd-trims" id="pdTrimsWrap">
          ${trimOptions
            .map(
              (t, idx) => `
              <button
                type="button"
                class="pd-trim-btn${idx === 0 ? " is-active" : ""}"
                data-trim-idx="${idx}"
              >
                <strong>${t.name}</strong>
                <span>${t.subtitle}${t.extraPrice ? ` (+${formatPrice(t.extraPrice)})` : ""}</span>
              </button>`,
            )
            .join("")}
        </div>
      </div>

      <!-- مميزات سريعة -->
      <div class="pd-specs">
        <div class="pd-spec-item">
          <i class="fa-solid fa-shield-halved"></i>
          <span>ضمان معتمد وفاتورة رسمية</span>
        </div>
        <div class="pd-spec-item">
          <i class="fa-solid fa-truck-fast"></i>
          <span>توصيل وتسليم سريع</span>
        </div>
      </div>

      <!-- الكمية وزر الإضافة للسلة -->
      <div class="pd-actions">
        <div class="pd-qty" role="group" aria-label="الكمية">
          <button type="button" id="pdQtyDec" aria-label="تقليل الكمية">−</button>
          <span id="pdQtyVal">1</span>
          <button type="button" id="pdQtyInc" aria-label="زيادة الكمية">+</button>
        </div>

        <button type="button" class="pd-add-btn" id="pdAddToCartBtn">
          <i class="fa-solid fa-cart-plus"></i>
          <span>أضف إلى السلة</span>
        </button>
      </div>
    </div>

    <!-- الشمال: معرض الصور مع التبديل -->
    <div class="pd-gallery">
      <div class="pd-gallery__main">
        <button
          type="button"
          class="pd-gallery__nav pd-gallery__nav--prev"
          id="pdPrevImg"
          aria-label="الصورة السابقة"
        >
          <i class="fa-solid fa-chevron-right"></i>
        </button>

        <img id="pdMainImg" src="${galleryImages[0]}" alt="${product.name}" />

        <button
          type="button"
          class="pd-gallery__nav pd-gallery__nav--next"
          id="pdNextImg"
          aria-label="الصورة التالية"
        >
          <i class="fa-solid fa-chevron-left"></i>
        </button>
      </div>

      <div class="pd-thumbs" id="pdThumbsWrap">
        ${galleryImages
          .map(
            (src, idx) => `
            <button
              type="button"
              class="pd-thumb${idx === 0 ? " is-active" : ""}"
              data-img-idx="${idx}"
              aria-label="عرض صورة ${idx + 1}"
            >
              <img src="${src}" alt="" loading="lazy" />
            </button>`,
          )
          .join("")}
      </div>
    </div>
  `;

  const mainImgEl = $("#pdMainImg");
  const priceEl = $("#pdPrice");
  const colorNameEl = $("#pdColorName");
  const trimNameEl = $("#pdTrimName");
  const qtyValEl = $("#pdQtyVal");

  const setGalleryImage = (index) => {
    activeImgIdx = (index + galleryImages.length) % galleryImages.length;
    if (mainImgEl) {
      mainImgEl.style.opacity = "0.35";
      setTimeout(() => {
        mainImgEl.src = galleryImages[activeImgIdx];
        mainImgEl.style.opacity = "1";
      }, 120);
    }
    $$(".pd-thumb", detailsWrap).forEach((btn, i) => {
      btn.classList.toggle("is-active", i === activeImgIdx);
    });
  };

  $("#pdThumbsWrap")?.addEventListener("click", (e) => {
    const thumb = e.target.closest("[data-img-idx]");
    if (thumb) setGalleryImage(Number(thumb.dataset.imgIdx));
  });

  $("#pdPrevImg")?.addEventListener("click", () =>
    setGalleryImage(activeImgIdx - 1),
  );
  $("#pdNextImg")?.addEventListener("click", () =>
    setGalleryImage(activeImgIdx + 1),
  );

  // اختيار اللون
  $("#pdColorsWrap")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-color-idx]");
    if (!btn) return;
    const idx = Number(btn.dataset.colorIdx);
    selectedColor = colorOptions[idx];
    if (colorNameEl) colorNameEl.textContent = selectedColor.name;

    $$(".pd-color-btn", detailsWrap).forEach((el, i) =>
      el.classList.toggle("is-active", i === idx),
    );

    if (typeof selectedColor.imgIndex === "number") {
      setGalleryImage(selectedColor.imgIndex);
    }
  });

  // اختيار الفئة
  $("#pdTrimsWrap")?.addEventListener("click", (e) => {
    const btn = e.target.closest("[data-trim-idx]");
    if (!btn) return;
    const idx = Number(btn.dataset.trimIdx);
    selectedTrim = trimOptions[idx];
    if (trimNameEl) trimNameEl.textContent = selectedTrim.name;
    if (priceEl) priceEl.textContent = formatPrice(currentPrice());

    $$(".pd-trim-btn", detailsWrap).forEach((el, i) =>
      el.classList.toggle("is-active", i === idx),
    );
  });

  // التحكم في الكمية
  $("#pdQtyDec")?.addEventListener("click", () => {
    qty = Math.max(1, qty - 1);
    if (qtyValEl) qtyValEl.textContent = qty;
  });

  $("#pdQtyInc")?.addEventListener("click", () => {
    qty = Math.min(20, qty + 1);
    if (qtyValEl) qtyValEl.textContent = qty;
  });

  // الإضافة للسلة باللون والفئة المختارة
  $("#pdAddToCartBtn")?.addEventListener("click", () => {
    if (!window.StoreCart) return;
    const variantId = `${product.id}-${selectedColor.name}-${selectedTrim.name}`;
    window.StoreCart.add(
      {
        id: variantId,
        name: `${product.name} (${selectedColor.name} - ${selectedTrim.name})`,
        category: product.category,
        price: currentPrice(),
        image: galleryImages[activeImgIdx] || product.image,
      },
      qty,
    );
  });

  /* ---------- Related Products ---------- */
  const relatedGrid = $("#relatedProductsGrid");
  if (relatedGrid) {
    const sameBrandOrType = products.filter(
      (p) =>
        p.id !== product.id &&
        (p.brand === product.brand || p.type === product.type),
    );
    const fallback = products.filter(
      (p) => p.id !== product.id && !sameBrandOrType.includes(p),
    );
    const relatedList = [...sameBrandOrType, ...fallback].slice(0, 4);

    relatedGrid.innerHTML = relatedList
      .map(
        (item) => `
        <article class="product-card" data-id="${item.id}">
          ${item.badge ? `<span class="product-card__badge">${item.badge}</span>` : ""}
          <a href="product-details.html?id=${item.id}" class="product-card__media product-card__link">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </a>
          <div class="product-card__body">
            <div class="product-card__meta">
              <span>${item.category}${item.brandLabel ? ` • ${item.brandLabel}` : ""}</span>
              <span class="product-card__rating">
                <i class="fa-solid fa-star"></i> ${item.rating.toFixed(1)}
              </span>
            </div>
            <h3 class="product-card__title">
              <a href="product-details.html?id=${item.id}">${item.name}</a>
            </h3>
            <div class="product-card__footer">
              <div>
                <span class="product-card__price">${formatPrice(item.price)}</span>
                ${
                  item.oldPrice
                    ? `<span class="product-card__old">${formatPrice(item.oldPrice)}</span>`
                    : ""
                }
              </div>
              <button class="product-card__btn" type="button" data-add-cart aria-label="أضف ${item.name} إلى السلة">
                <i class="fa-solid fa-plus"></i>
              </button>
            </div>
          </div>
        </article>`,
      )
      .join("");

    relatedGrid.addEventListener("click", (e) => {
      const addBtn = e.target.closest("[data-add-cart]");
      if (!addBtn) return;
      const card = addBtn.closest(".product-card");
      const relProduct = products.find(
        (p) => String(p.id) === card?.dataset.id,
      );
      if (relProduct && window.StoreCart) {
        window.StoreCart.add(relProduct);
        addBtn.classList.add("is-added");
        setTimeout(() => addBtn.classList.remove("is-added"), 450);
      }
    });
  }
})();