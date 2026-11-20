(() => {
  const STORAGE_KEY = "apex_auto_cart_v1";
  const formatPrice = (n) => `${Number(n).toLocaleString("en-US")} ج.م`;

  // حقن HTML السلة الجانبية وفورم الطلب والإشعار تلقائياً في أي صفحة
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

  const drawer = document.getElementById("cartDrawer");
  const headingEl = document.getElementById("cartDrawerHeading");
  const itemsList = document.getElementById("cartItemsList");
  const countEl = document.getElementById("cartDrawerCount");
  const footEl = document.getElementById("cartDrawerFoot");
  const subtotalEl = document.getElementById("cartSubtotal");
  const badgeEl = document.getElementById("cartBadge");

  const checkoutForm = document.getElementById("cartCheckoutForm");
  const checkoutTotalEl = document.getElementById("cartCheckoutTotal");
  const checkoutErrorEl = document.getElementById("cartCheckoutError");
  const fullNameInput = document.getElementById("checkoutFullName");
  const emailInput = document.getElementById("checkoutEmail");
  const phoneInput = document.getElementById("checkoutPhone");
  const addressInput = document.getElementById("checkoutAddress");

  const toastEl = document.getElementById("cartToast");
  const toastTitleEl = document.getElementById("cartToastTitle");
  const toastDescEl = document.getElementById("cartToastDesc");
  const toastOpenBtn = document.getElementById("cartToastOpen");

  let isCheckoutView = false;
  let toastTimer;

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

  const setCheckoutMode = (active) => {
    isCheckoutView = Boolean(active) && cart.length > 0;
    if (headingEl) {
      headingEl.textContent = isCheckoutView ? "إتمام الطلب" : "سلة المشتريات";
    }
    if (itemsList) itemsList.hidden = isCheckoutView;
    if (footEl) footEl.hidden = isCheckoutView || cart.length === 0;
    if (checkoutForm) checkoutForm.hidden = !isCheckoutView;
    if (checkoutErrorEl) {
      checkoutErrorEl.hidden = true;
      checkoutErrorEl.textContent = "";
    }
    if (isCheckoutView && checkoutTotalEl) {
      checkoutTotalEl.textContent = formatPrice(getSubtotal());
    }
  };

  const render = () => {
    const totalCount = getTotalCount();

    if (badgeEl) {
      badgeEl.textContent = totalCount;
      badgeEl.hidden = totalCount <= 0;
    }

    if (countEl) {
      countEl.textContent = `${totalCount} ${totalCount === 1 ? "منتج" : "منتجات"}`;
    }

    if (!itemsList || !footEl) return;

    if (cart.length === 0) {
      setCheckoutMode(false);
      footEl.hidden = true;
      itemsList.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-cart-shopping"></i>
          <h3>سلة المشتريات فارغة</h3>
          <p>أضف سيارات أو قطع غيار من المتجر وستظهر هنا فوراً.</p>
        </div>
      `;
      return;
    }

    if (subtotalEl) subtotalEl.textContent = formatPrice(getSubtotal());
    if (checkoutTotalEl)
      checkoutTotalEl.textContent = formatPrice(getSubtotal());

    itemsList.innerHTML = cart
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
    if (!drawer) return;
    drawer.classList.add("open");
    drawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeCart = () => {
    if (!drawer) return;
    drawer.classList.remove("open");
    drawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
    setCheckoutMode(false);
  };

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
    render();
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
    render();
  };

  const removeItem = (id) => {
    cart = cart.filter((item) => String(item.id) !== String(id));
    saveCart();
    render();
  };

  const clearCart = () => {
    cart = [];
    saveCart();
    render();
  };

  document.getElementById("cartBtn")?.addEventListener("click", openCart);
  document.addEventListener("cart:open", openCart);

  document.getElementById("cartCheckoutBtn")?.addEventListener("click", () => {
    if (cart.length === 0) return;
    setCheckoutMode(true);
    setTimeout(() => fullNameInput?.focus(), 60);
  });

  document.getElementById("cartBackBtn")?.addEventListener("click", () => {
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

    if (fullName.length < 2) {
      if (checkoutErrorEl) {
        checkoutErrorEl.textContent = "من فضلك أدخل الاسم بالكامل.";
        checkoutErrorEl.hidden = false;
      }
      fullNameInput?.focus();
      return;
    }

    if (!emailValid) {
      if (checkoutErrorEl) {
        checkoutErrorEl.textContent = "من فضلك أدخل بريد إلكتروني صحيح.";
        checkoutErrorEl.hidden = false;
      }
      emailInput?.focus();
      return;
    }

    if (!phoneValid) {
      if (checkoutErrorEl) {
        checkoutErrorEl.textContent = "من فضلك أدخل رقم هاتف صحيح.";
        checkoutErrorEl.hidden = false;
      }
      phoneInput?.focus();
      return;
    }

    if (address.length < 5) {
      if (checkoutErrorEl) {
        checkoutErrorEl.textContent = "من فضلك أدخل العنوان بالتفصيل.";
        checkoutErrorEl.hidden = false;
      }
      addressInput?.focus();
      return;
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

  drawer?.addEventListener("click", (e) => {
    if (e.target.closest("[data-close-cart]")) closeCart();

    const row = e.target.closest("[data-cart-id]");
    if (!row) return;
    const id = row.dataset.cartId;

    if (e.target.closest("[data-qty-inc]")) updateQty(id, 1);
    if (e.target.closest("[data-qty-dec]")) updateQty(id, -1);
    if (e.target.closest("[data-remove-item]")) removeItem(id);
  });

  document.getElementById("cartClearBtn")?.addEventListener("click", clearCart);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && drawer?.classList.contains("open")) closeCart();
  });

  window.addEventListener("storage", (e) => {
    if (e.key === STORAGE_KEY) {
      cart = readCart();
      render();
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

  render();
})();
