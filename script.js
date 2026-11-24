/* ======================
  table of contents
=========================
  1. Helpers & state
  2. Preloader & Sale Modal
  3. Announcement marquee (clone)
  4. Header state (transparent on home)
  5. Static links & Mobile Accordion
  6. Cart, Quick Order Modal & Notification
  7. Search (open / close)
  8. Mobile menu (open / close)
  9. Auth Modal (UI Only)
  10. Promo Banner Slider
  11. Products Rendering (Home & Catalog Filter)
  12. Checkout & Orders Logic
  13. Contact Form Logic
  14. Catalog layout switcher
*/

(() => {
  //=======================
  // 1. Helpers & state
  //=======================
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];

  const isHome = document.body.dataset.page === "home";
  const header = $("#siteHeader");
  const searchPanel = $("#searchPanel");
  const searchInput = $("#searchInput");
  const mobileMenu = $("#mobileMenu");

  let scrolled = false;
  let searchOpen = false;

  //=======================
  // 2. Preloader & Sale Modal
  //=======================
  const preloader = $("#preloader");
  const saleModal = $("#saleModal");
  const copyBtn = $("#copyPromoCode");

  const openSaleModal = () => {
    if (!saleModal) return;
    saleModal.classList.add("is-open");
    saleModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeSaleModal = () => {
    if (!saleModal) return;
    saleModal.classList.remove("is-open");
    saleModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  if (preloader) {
    document.body.classList.add("no-scroll");

    setTimeout(() => {
      preloader.classList.add("is-hidden");
      document.body.classList.remove("no-scroll");

      setTimeout(openSaleModal, 400);
    }, 1150);
  }

  if (saleModal) {
    $$("[data-close-sale]", saleModal).forEach((el) => {
      el.addEventListener("click", closeSaleModal);
    });
  }

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      const code = copyBtn.dataset.code;
      navigator.clipboard?.writeText(code);

      const label = copyBtn.querySelector("span");
      const icon = copyBtn.querySelector("i");

      label.textContent = "COPIED!";
      icon.className = "fa-solid fa-check";

      setTimeout(() => {
        label.textContent = code;
        icon.className = "fa-regular fa-copy";
      }, 1800);
    });
  }

  //=======================
  // 3. Announcement marquee (clone)
  //=======================
  ["#marquee", "#brandsMarquee"].forEach((selector) => {
    const el = $(selector);
    if (!el || !el.firstElementChild) return;
    const clone = el.firstElementChild.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    el.appendChild(clone);
  });

  //=======================
  // 4. Header state (transparent on home)
  //=======================
  const renderHeader = () => {
    if (!header) return;
    header.classList.toggle(
      "is-transparent",
      isHome && !scrolled && !searchOpen,
    );
  };

  window.addEventListener(
    "scroll",
    () => {
      scrolled = window.scrollY > 30;
      renderHeader();
    },
    { passive: true },
  );
  scrolled = window.scrollY > 30;
  renderHeader();

  //=======================
  // 5. Static links & Mobile Accordion
  //=======================
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');
    if (!link) return;
    e.preventDefault();
  });

  const mobileShopToggle = $("#mobileShopToggle");
  const mobileShopPanel = $("#mobileShopPanel");
  if (mobileShopToggle && mobileShopPanel) {
    mobileShopToggle.addEventListener("click", () => {
      const isExpanded =
        mobileShopToggle.getAttribute("aria-expanded") === "true";
      mobileShopToggle.setAttribute("aria-expanded", String(!isExpanded));
      mobileShopPanel.hidden = isExpanded;
    });
  }

  //=======================
  // 6. Cart, Quick Order Modal & Notification
  //=======================
  // --- Cart state & drawer ---
  let cart = [];
  try {
    const saved = JSON.parse(localStorage.getItem("wandaCart"));
    if (Array.isArray(saved)) cart = saved;
  } catch {}

  const orderModal = $("#orderModal");
  const cartDrawer = $("#cartDrawer");
  const toastNotify = $("#toastNotify");
  const toastMessage = $("#toastMessage");
  let toastTimer;

  const showNotification = (msg) => {
    if (!toastNotify) return;
    if (toastMessage) toastMessage.textContent = msg;
    toastNotify.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotify.classList.remove("is-visible");
    }, 3000);
  };

  const saveCart = () => {
    try {
      localStorage.setItem("wandaCart", JSON.stringify(cart));
    } catch {}
    updateCartUI();
  };

  const updateCartUI = () => {
    const totalItems = cart.reduce((sum, item) => sum + item.qty, 0);
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

    const cartCountEl = $("#cartCount");
    const drawerCountEl = $("#drawerCartCount");
    const itemsContainer = $("#cartItemsContainer");
    const drawerFooter = $("#cartDrawerFooter");
    const subtotalEl = $("#cartSubtotal");

    if (cartCountEl) cartCountEl.textContent = totalItems;
    if (drawerCountEl) drawerCountEl.textContent = totalItems;
    if (subtotalEl) subtotalEl.textContent = `LE ${subtotal}`;

    if (!itemsContainer) return;

    if (cart.length === 0) {
      itemsContainer.innerHTML = `
        <div class="cart-empty">
          <i class="fa-solid fa-bag-shopping"></i>
          <p>Your shopping bag is currently empty.</p>
        </div>
      `;
      if (drawerFooter) drawerFooter.hidden = true;
      return;
    }

    if (drawerFooter) drawerFooter.hidden = false;

    itemsContainer.innerHTML = cart
      .map(
        (item, index) => `
        <div class="cart-item">
          <img class="cart-item__img" src="${item.image}" alt="${item.name}" />
          <div class="cart-item__info">
            <div>
              <div class="cart-item__top">
                <h4 class="cart-item__name">${item.name}</h4>
                <button type="button" class="cart-item__remove" data-remove-index="${index}" aria-label="Remove item">
                  <i class="fa-solid fa-trash-can"></i>
                </button>
              </div>
              <p class="cart-item__meta">Size: ${item.size} &bull; ${item.colorLabel}</p>
            </div>

            <div class="cart-item__bottom">
              <div class="cart-item__qty">
                <button type="button" data-qty-delta="-1" data-item-index="${index}" aria-label="Decrease">−</button>
                <span>${item.qty}</span>
                <button type="button" data-qty-delta="1" data-item-index="${index}" aria-label="Increase">+</button>
              </div>
              <span class="cart-item__price">LE ${item.price * item.qty}</span>
            </div>
          </div>
        </div>
      `,
      )
      .join("");
  };

  const openCartDrawer = () => {
    if (!cartDrawer) return;
    cartDrawer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeCartDrawer = () => {
    if (!cartDrawer) return;
    cartDrawer.classList.remove("is-open");
    cartDrawer.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  $("#cartBtn")?.addEventListener("click", openCartDrawer);
  $$("[data-close-cart]").forEach((el) =>
    el.addEventListener("click", closeCartDrawer),
  );

  $("#cartItemsContainer")?.addEventListener("click", (e) => {
    const removeBtn = e.target.closest("[data-remove-index]");
    const qtyBtn = e.target.closest("[data-qty-delta]");

    if (removeBtn) {
      const idx = Number(removeBtn.dataset.removeIndex);
      cart.splice(idx, 1);
      saveCart();
      return;
    }

    if (qtyBtn) {
      const idx = Number(qtyBtn.dataset.itemIndex);
      const delta = Number(qtyBtn.dataset.qtyDelta);
      cart[idx].qty += delta;
      if (cart[idx].qty <= 0) {
        cart.splice(idx, 1);
      }
      saveCart();
    }
  });

  // --- Quick Order Modal ---
  let activeProduct = null;
  let selectedImageIndex = 0;
  let selectedSize = "M";
  let selectedQty = 1;

  const updateOrderModalTotal = () => {
    if (!activeProduct) return;
    const totalEl = $("#orderTotalBtn");
    if (totalEl)
      totalEl.textContent = `LE ${activeProduct.price * selectedQty}`;
  };

  const openOrderModal = (product, initialImageIndex = 0) => {
    if (!orderModal || !product) return;
    activeProduct = product;
    selectedImageIndex = initialImageIndex;
    selectedSize = "M";
    selectedQty = 1;

    $("#orderModalTitle").textContent = product.name;
    $("#orderModalPrice").textContent = `LE ${product.price}`;
    $("#orderModalImg").src =
      product.image[selectedImageIndex] || product.image[0];
    $("#selectedColorLabel").textContent = `Style ${selectedImageIndex + 1}`;
    $("#orderQty").textContent = "1";

    const colorsContainer = $("#orderModalColors");
    colorsContainer.innerHTML = product.image
      .map(
        (img, idx) => `
        <button
          type="button"
          class="modal-color-btn ${idx === selectedImageIndex ? "is-selected" : ""}"
          data-modal-img-idx="${idx}"
          aria-label="Select style ${idx + 1}"
        >
          <img src="${img}" alt="" />
        </button>
      `,
      )
      .join("");

    $$(".size-btn", orderModal).forEach((btn) => {
      btn.classList.toggle("is-selected", btn.dataset.size === "M");
    });

    updateOrderModalTotal();
    orderModal.classList.add("is-open");
    orderModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeOrderModal = () => {
    if (!orderModal) return;
    orderModal.classList.remove("is-open");
    orderModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  $$("[data-close-order]").forEach((el) =>
    el.addEventListener("click", closeOrderModal),
  );

  $("#orderModalColors")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".modal-color-btn");
    if (!btn || !activeProduct) return;

    selectedImageIndex = Number(btn.dataset.modalImgIdx);
    $("#orderModalImg").src = activeProduct.image[selectedImageIndex];
    $("#selectedColorLabel").textContent = `Style ${selectedImageIndex + 1}`;

    $$(".modal-color-btn", orderModal).forEach((b) =>
      b.classList.toggle("is-selected", b === btn),
    );
  });

  $("#orderModalSizes")?.addEventListener("click", (e) => {
    const btn = e.target.closest(".size-btn");
    if (!btn) return;
    selectedSize = btn.dataset.size;
    $$(".size-btn", orderModal).forEach((b) =>
      b.classList.toggle("is-selected", b === btn),
    );
  });

  $("#qtyMinus")?.addEventListener("click", () => {
    if (selectedQty > 1) {
      selectedQty--;
      $("#orderQty").textContent = String(selectedQty);
      updateOrderModalTotal();
    }
  });

  $("#qtyPlus")?.addEventListener("click", () => {
    selectedQty++;
    $("#orderQty").textContent = String(selectedQty);
    updateOrderModalTotal();
  });

  $("#confirmAddToCart")?.addEventListener("click", () => {
    if (!activeProduct) return;

    const chosenImage =
      activeProduct.image[selectedImageIndex] || activeProduct.image[0];
    const colorLabel = `Style ${selectedImageIndex + 1}`;

    const existingItem = cart.find(
      (item) =>
        item.id === activeProduct._id &&
        item.size === selectedSize &&
        item.image === chosenImage,
    );

    if (existingItem) {
      existingItem.qty += selectedQty;
    } else {
      cart.push({
        id: activeProduct._id,
        name: activeProduct.name,
        price: activeProduct.price,
        image: chosenImage,
        colorLabel,
        size: selectedSize,
        qty: selectedQty,
      });
    }

    saveCart();
    closeOrderModal();
    showNotification(`"${activeProduct.name}" added to your bag!`);
  });

  updateCartUI();

  //=======================
  // 7. Search (open / close)
  //=======================
  const openSearch = () => {
    searchOpen = true;
    searchPanel.hidden = false;
    searchInput.focus();
    renderHeader();
  };

  const closeSearch = () => {
    searchOpen = false;
    searchPanel.hidden = true;
    renderHeader();
  };

  $("#searchToggle")?.addEventListener("click", () =>
    searchOpen ? closeSearch() : openSearch(),
  );
  $("#searchClose")?.addEventListener("click", closeSearch);
  $("#searchForm")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = searchInput?.value.trim();
    if (q && !$("#catalogGrid")) {
      window.location.href = `products.html?search=${encodeURIComponent(q)}`;
    }
  });

  //=======================
  // 8. Mobile menu (open / close)
  //=======================
  const openMenu = () => {
    mobileMenu.classList.add("open");
    mobileMenu.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeMenu = () => {
    mobileMenu.classList.remove("open");
    mobileMenu.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  $("#openMenu")?.addEventListener("click", openMenu);
  $$("[data-close-menu]").forEach((el) =>
    el.addEventListener("click", closeMenu),
  );
  $$(
    ".mobile-link:not(.mobile-accordion__btn), .mobile-sublink, .mobile-login",
  ).forEach((el) => el.addEventListener("click", closeMenu));

  //=======================
  // 9. Auth Modal (UI Only)
  //=======================
  const authModal = $("#authModal");
  const authTriggerBtn = $("#authTriggerBtn");
  const mobileAuthTrigger = $("#mobileAuthTrigger");
  const loginForm = $("#loginForm");
  const registerForm = $("#registerForm");

  const switchAuthTab = (tabName) => {
    const isLogin = tabName === "login";
    $$(".auth-tab", authModal).forEach((tab) => {
      const active = tab.dataset.authTab === tabName;
      tab.classList.toggle("is-active", active);
      tab.setAttribute("aria-selected", String(active));
    });

    if (loginForm) loginForm.hidden = !isLogin;
    if (registerForm) registerForm.hidden = isLogin;

    const titleEl = $("#authModalTitle");
    const subEl = $("#authModalSubtitle");
    if (titleEl)
      titleEl.textContent = isLogin ? "Welcome Back" : "Create Account";
    if (subEl)
      subEl.textContent = isLogin
        ? "Sign in to access your bag and faster checkout."
        : "Join WANDA for exclusive drops and easy order tracking.";
  };

  const openAuthModal = (defaultTab = "login") => {
    if (!authModal) return;
    switchAuthTab(defaultTab);
    authModal.classList.add("is-open");
    authModal.setAttribute("aria-hidden", "false");
    document.body.classList.add("no-scroll");
  };

  const closeAuthModal = () => {
    if (!authModal) return;
    authModal.classList.remove("is-open");
    authModal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("no-scroll");
  };

  $$(".auth-tab", authModal).forEach((tab) => {
    tab.addEventListener("click", () => switchAuthTab(tab.dataset.authTab));
  });

  $$("[data-close-auth]").forEach((el) =>
    el.addEventListener("click", closeAuthModal),
  );

  authTriggerBtn?.addEventListener("click", () => openAuthModal("login"));

  mobileAuthTrigger?.addEventListener("click", (e) => {
    e.preventDefault();
    closeMenu();
    openAuthModal("login");
  });

  loginForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    loginForm.reset();
    closeAuthModal();
    showNotification("Signed in successfully!");
  });

  registerForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    registerForm.reset();
    closeAuthModal();
    showNotification("Account created successfully!");
  });

  // --- Global Escape key handler ---
  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    if (mobileMenu?.classList.contains("open")) closeMenu();
    if (searchOpen) closeSearch();
    if (saleModal?.classList.contains("is-open")) closeSaleModal();
    if (orderModal?.classList.contains("is-open")) closeOrderModal();
    if (cartDrawer?.classList.contains("is-open")) closeCartDrawer();
    if (authModal?.classList.contains("is-open")) closeAuthModal();
  });

  //=======================
  // 10. Promo Banner Slider
  //=======================
  (() => {
    const track = document.getElementById("promoTrack");
    const dots = document.querySelectorAll(".promo-dot");

    if (!track || dots.length === 0) return;

    let currentIndex = 0;
    const slideCount = dots.length;

    const goToSlide = (index) => {
      currentIndex = index;
      track.style.transform = `translateX(-${currentIndex * 100}%)`;

      dots.forEach((dot, idx) => {
        dot.classList.toggle("active", idx === currentIndex);
      });
    };

    dots.forEach((dot) => {
      dot.addEventListener("click", () => {
        const index = Number(dot.dataset.index);
        goToSlide(index);
        resetTimer();
      });
    });

    const nextSlide = () => {
      currentIndex = (currentIndex + 1) % slideCount;
      goToSlide(currentIndex);
    };

    let timer = setInterval(nextSlide, 4500);

    const resetTimer = () => {
      clearInterval(timer);
      timer = setInterval(nextSlide, 4500);
    };
  })();

  //=======================
  // 11. Products Rendering (Home & Catalog Filter)
  //=======================
  const products = window.WANDA_PRODUCTS || [];

  const createProductCard = (product) => {
    const maxVisible = 2;
    const hasMultipleImages = product.image.length > 1;
    const primaryImg = product.image[0];
    const secondaryImg = hasMultipleImages ? product.image[1] : primaryImg;

    const visibleImages = product.image.slice(0, maxVisible);
    const remainingCount = product.image.length - maxVisible;

    return `
      <article class="product-card" data-product-id="${product._id}">
        <div class="product-card__image-wrap">
          <img
            class="product-card__image product-card__image--primary"
            src="${primaryImg}"
            alt="${product.name}"
            loading="lazy"
          />
          <img
            class="product-card__image product-card__image--secondary"
            src="${secondaryImg}"
            alt="${product.name} alternate view"
            loading="lazy"
          />
        </div>

        <h3 class="product-card__name" title="${product.name}">${product.name}</h3>

        <p class="product-card__price">
          <span class="product-card__current-price">LE ${product.price}</span>
        </p>

        <div class="product-card__colors" data-expanded="false" aria-label="Product images">
          ${visibleImages
            .map(
              (image, index) => `
                <button
                  class="product-card__color ${index === 0 ? "is-selected" : ""}"
                  type="button"
                  data-image-index="${index}"
                  aria-label="Show image ${index + 1}"
                  aria-pressed="${index === 0}"
                >
                  <img src="${image}" alt="" loading="lazy" />
                </button>
              `,
            )
            .join("")}

          ${
            remainingCount > 0
              ? `
                <button
                  class="product-card__more-colors"
                  type="button"
                  data-action="show-more"
                  aria-label="Show ${remainingCount} more images"
                >
                  +${remainingCount}
                </button>
              `
              : ""
          }
        </div>

        <button class="product-card__add-to-cart" type="button">
          Add To Cart
        </button>
      </article>
    `;
  };

  // --- Home Page Grids ---
  const bestSellersGrid = $(".best-sellers__grid");
  const newArrivalsGrid = $(".new-arrivals__grid");

  if (bestSellersGrid) {
    bestSellersGrid.innerHTML = products
      .filter((p) => p.bestseller)
      .map(createProductCard)
      .join("");
  }

  if (newArrivalsGrid) {
    newArrivalsGrid.innerHTML = products.map(createProductCard).join("");
  }

  const prevBtn = $(".best-sellers__arrow--left");
  const nextBtn = $(".best-sellers__arrow--right");

  if (bestSellersGrid && prevBtn && nextBtn) {
    const scrollProducts = (direction) => {
      const card = bestSellersGrid.querySelector(".product-card");
      if (!card) return;
      const gap = parseFloat(getComputedStyle(bestSellersGrid).columnGap) || 0;
      const distance = card.getBoundingClientRect().width + gap;
      bestSellersGrid.scrollBy({
        left: direction * distance,
        behavior: "smooth",
      });
    };

    prevBtn.addEventListener("click", () => scrollProducts(-1));
    nextBtn.addEventListener("click", () => scrollProducts(1));
  }

  // --- Catalog Page (products.html) Filter & Sort Logic ---
  const catalogGrid = $("#catalogGrid");
  const catalogTitle = $("#catalogTitle");
  const catalogCount = $("#catalogCount");
  const categoryFilters = $("#categoryFilters");
  const brandFilters = $("#brandFilters");
  const sortSelect = $("#sortSelect");

  if (catalogGrid) {
    const params = new URLSearchParams(window.location.search);
    let currentCategory = (params.get("category") || "all").toLowerCase();
    let currentBrand = (params.get("brand") || "all").toLowerCase();
    let currentSearch = (params.get("search") || "").toLowerCase();
    let currentSort = "featured";

    if (currentSearch && searchInput) {
      searchInput.value = currentSearch;
    }

    const categoryLabels = {
      all: "ALL PRODUCTS",
      hoodies: "HOODIES",
      "t-shirts": "T-SHIRTS & SHIRTS",
      jackets: "JACKETS",
      pullover: "PULLOVERS",
      pants: "PANTS",
      shoes: "SHOES",
      bags: "BAGS",
      accessories: "ACCESSORIES",
    };

    const syncUrl = () => {
      const url = new URL(window.location.href);
      if (currentCategory === "all") url.searchParams.delete("category");
      else url.searchParams.set("category", currentCategory);

      if (currentBrand === "all") url.searchParams.delete("brand");
      else url.searchParams.set("brand", currentBrand);

      if (!currentSearch) url.searchParams.delete("search");
      window.history.replaceState({}, "", url);
    };

    const renderCatalog = () => {
      let filtered = [...products];

      if (currentCategory !== "all") {
        filtered = filtered.filter(
          (p) => (p.category || "").toLowerCase() === currentCategory,
        );
      }

      if (currentBrand !== "all") {
        filtered = filtered.filter(
          (p) => (p.brand || "").toLowerCase() === currentBrand,
        );
      }

      if (currentSearch) {
        filtered = filtered.filter(
          (p) =>
            p.name.toLowerCase().includes(currentSearch) ||
            (p.brand || "").toLowerCase().includes(currentSearch),
        );
      }

      if (currentSort === "price-asc") {
        filtered.sort((a, b) => a.price - b.price);
      } else if (currentSort === "price-desc") {
        filtered.sort((a, b) => b.price - a.price);
      }

      if (catalogTitle) {
        if (currentBrand !== "all" && currentCategory === "all") {
          catalogTitle.textContent = currentBrand.toUpperCase();
        } else if (currentBrand !== "all" && currentCategory !== "all") {
          catalogTitle.textContent = `${currentBrand.toUpperCase()} — ${categoryLabels[currentCategory] || currentCategory.toUpperCase()}`;
        } else {
          catalogTitle.textContent =
            categoryLabels[currentCategory] || currentCategory.toUpperCase();
        }
      }

      if (catalogCount) {
        catalogCount.textContent = `Showing ${filtered.length} ${filtered.length === 1 ? "item" : "items"}`;
      }

      if (categoryFilters) {
        $$(".filter-pill", categoryFilters).forEach((pill) => {
          pill.classList.toggle(
            "is-active",
            pill.dataset.cat === currentCategory,
          );
        });
      }

      if (brandFilters) {
        $$(".filter-pill", brandFilters).forEach((pill) => {
          pill.classList.toggle(
            "is-active",
            pill.dataset.brand === currentBrand,
          );
        });
      }

      if (filtered.length === 0) {
        catalogGrid.innerHTML = `
          <div class="catalog-empty">
            <p>No products found matching this filter yet. Check back soon!</p>
          </div>
        `;
        return;
      }

      catalogGrid.innerHTML = filtered.map(createProductCard).join("");
    };

    categoryFilters?.addEventListener("click", (e) => {
      const pill = e.target.closest(".filter-pill");
      if (!pill) return;
      currentCategory = pill.dataset.cat;
      currentSearch = "";
      if (searchInput) searchInput.value = "";
      syncUrl();
      renderCatalog();
    });

    brandFilters?.addEventListener("click", (e) => {
      const pill = e.target.closest(".filter-pill");
      if (!pill) return;
      currentBrand = pill.dataset.brand;
      currentSearch = "";
      if (searchInput) searchInput.value = "";
      syncUrl();
      renderCatalog();
    });

    sortSelect?.addEventListener("change", (e) => {
      currentSort = e.target.value;
      renderCatalog();
    });

    searchInput?.addEventListener("input", (e) => {
      currentSearch = e.target.value.trim().toLowerCase();
      renderCatalog();
    });

    renderCatalog();
  }

  // --- Shared Product Card Interactions (Home & Catalog) ---
  [bestSellersGrid, newArrivalsGrid, catalogGrid].forEach((grid) => {
    if (!grid) return;

    grid.addEventListener("click", (event) => {
      const card = event.target.closest(".product-card");
      if (!card) return;

      const productId = card.dataset.productId;
      const product = products.find((item) => item._id === productId);
      if (!product) return;

      const addToCartBtn = event.target.closest(".product-card__add-to-cart");
      if (addToCartBtn) {
        const selectedThumb = card.querySelector(
          ".product-card__color.is-selected",
        );
        const initialIdx = selectedThumb
          ? Number(selectedThumb.dataset.imageIndex)
          : 0;
        openOrderModal(product, initialIdx);
        return;
      }

      const moreBtn = event.target.closest("[data-action='show-more']");
      const lessBtn = event.target.closest("[data-action='show-less']");
      const imageButton = event.target.closest(".product-card__color");
      const colorOptions = card.querySelector(".product-card__colors");

      if (moreBtn) {
        colorOptions.innerHTML =
          product.image
            .map(
              (image, index) => `
              <button
                class="product-card__color ${index === 0 ? "is-selected" : ""}"
                type="button"
                data-image-index="${index}"
                aria-label="Show image ${index + 1}"
                aria-pressed="${index === 0}"
              >
                <img src="${image}" alt="" loading="lazy" />
              </button>
            `,
            )
            .join("") +
          `
            <button
              class="product-card__less-colors"
              type="button"
              data-action="show-less"
              aria-label="Show less images"
            >
              Show Less
            </button>
          `;
        return;
      }

      if (lessBtn) {
        const visibleImages = product.image.slice(0, 2);
        const remainingCount = product.image.length - 2;

        colorOptions.innerHTML =
          visibleImages
            .map(
              (image, index) => `
              <button
                class="product-card__color ${index === 0 ? "is-selected" : ""}"
                type="button"
                data-image-index="${index}"
                aria-label="Show image ${index + 1}"
                aria-pressed="${index === 0}"
              >
                <img src="${image}" alt="" loading="lazy" />
              </button>
            `,
            )
            .join("") +
          `
            <button
              class="product-card__more-colors"
              type="button"
              data-action="show-more"
              aria-label="Show ${remainingCount} more images"
            >
              +${remainingCount}
            </button>
          `;
        return;
      }

      if (!imageButton) return;

      // 1. جلب الترتيب الحقيقي للصورة من الـ dataset المضمون
      const imageIndex = Number(imageButton.dataset.imageIndex);
      const primaryImgEl = card.querySelector(".product-card__image--primary");
      const secondaryImgEl = card.querySelector(
        ".product-card__image--secondary",
      );

      // 2. تغيير الصورة الرئيسية فوراً بالصورة المطلوبة بدقة
      if (primaryImgEl && product.image[imageIndex]) {
        primaryImgEl.src = product.image[imageIndex];
      }

      // 3. تحديث الصورة الثانوية لتكون الصورة التالية أو الأولى لضمان عدم حدوث تضارب
      if (secondaryImgEl) {
        const nextImg = product.image[imageIndex + 1] || product.image[0];
        secondaryImgEl.src = nextImg;
      }

      // 4. تمييز الزرار الحالي بأنه المختار (is-selected)
      card.querySelectorAll(".product-card__color").cache = true;
      card.querySelectorAll(".product-card__color").forEach((button) => {
        const selected = button === imageButton;
        button.classList.toggle("is-selected", selected);
        button.setAttribute("aria-pressed", String(selected));
      });
    });
  });

  //=======================
  // 12. Checkout & Orders Logic
  //=======================
  // --- Checkout form & order creation ---
  const checkoutForm = $("#checkoutForm");
  const checkoutItemsList = $("#checkoutItemsList");

  if (checkoutForm || checkoutItemsList) {
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
    const checkoutTotal = $("#checkoutTotal");
    if (checkoutTotal) checkoutTotal.textContent = `LE ${subtotal}`;

    if (checkoutItemsList) {
      if (cart.length === 0) {
        checkoutItemsList.innerHTML = `<p class="checkout-empty-msg">Your cart is empty.</p>`;
      } else {
        checkoutItemsList.innerHTML = cart
          .map(
            (item) => `
          <div class="checkout-item-row">
            <img src="${item.image}" alt="${item.name}" class="checkout-item-img" />
            <div class="checkout-item-details">
              <strong>${item.name}</strong>
              <span class="checkout-item-meta">Qty: ${item.qty} &bull; Size: ${item.size}</span>
            </div>
            <strong>LE ${item.price * item.qty}</strong>
          </div>
        `,
          )
          .join("");
      }
    }

    checkoutForm?.addEventListener("submit", (e) => {
      e.preventDefault();
      if (cart.length === 0) {
        alert("Your cart is empty!");
        return;
      }

      const name = $("#custName").value.trim();
      const phone = $("#custPhone").value.trim();
      const address = $("#custAddress").value.trim();

      const newOrder = {
        id: "WANDA-" + Math.floor(100000 + Math.random() * 900000),
        date: new Date().toLocaleDateString(),
        name,
        phone,
        address,
        items: [...cart],
        total: subtotal,
      };

      let orders = [];
      try {
        orders = JSON.parse(localStorage.getItem("wandaOrders")) || [];
      } catch {}

      orders.unshift(newOrder);
      localStorage.setItem("wandaOrders", JSON.stringify(orders));

      cart = [];
      localStorage.removeItem("wandaCart");

      window.location.href = "orders.html";
    });
  }

  // --- عرض الأوردرات في صفحة orders.html ---
  const ordersContainer = $("#ordersContainer");
  const ordersCount = $("#ordersCount");
  if (ordersContainer) {
    let orders = [];
    try {
      orders = JSON.parse(localStorage.getItem("wandaOrders")) || [];
    } catch {}

    if (ordersCount) {
      ordersCount.textContent = `You have ${orders.length} ${orders.length === 1 ? "order" : "orders"}`;
    }

    if (orders.length === 0) {
      ordersContainer.innerHTML = `
        <div class="order-empty-state">
          <i class="fa-solid fa-box-open order-empty-icon"></i>
          <p>You haven't placed any orders yet.</p>
        </div>
      `;
    } else {
      ordersContainer.innerHTML = orders
        .map(
          (order) => `
        <div class="order-card">
          <div class="order-card-header">
            <span><strong>Order ID:</strong> ${order.id}</span>
            <span><strong>Date:</strong> ${order.date}</span>
          </div>
          <p class="order-info-line"><strong>Recipient:</strong> ${order.name} (${order.phone})</p>
          <p class="order-info-address"><strong>Address:</strong> ${order.address}</p>
          <div class="order-items-group">
            ${order.items
              .map(
                (item) => `
              <div class="checkout-item-row">
                <img src="${item.image}" alt="${item.name}" class="checkout-item-img" />
                <div class="checkout-item-details">
                  <span>${item.name}</span>
                  <span class="checkout-item-meta">Qty: ${item.qty} &bull; Size: ${item.size}</span>
                </div>
                <strong>LE ${item.price * item.qty}</strong>
              </div>
            `,
              )
              .join("")}
          </div>
          <div class="checkout-total-row">
            <span>Total Paid:</span>
            <span class="checkout-total-price">LE ${order.total}</span>
          </div>
        </div>
      `,
        )
        .join("");
    }
  }

  //=======================
  // 13. Contact Form Logic
  //=======================
  const contactForm = $("#contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      contactForm.reset();
      showNotification("Your message has been sent! We'll reply soon.");
    });
  }
})();

/* ==============================
  14. Catalog layout switcher
  بيغير عدد المنتجات فى الصف، والخيارات اللى مش ينفع تتعرض على الشاشة بتختفى
================================ */
(() => {
  const grid = document.getElementById("catalogGrid");
  const box = document.getElementById("layoutSwitch");
  if (!grid || !box) return;

  const OPTIONS = [6, 5, 4, 3, 2, 1];
  const KEY = "wanda_catalog_cols";
  const MIN_CARD = 216; // أقل عرض مريح للكارت + المسافة (px)

  let wanted = 4;
  try {
    wanted = Number(localStorage.getItem(KEY)) || 4;
  } catch (e) {}

  // أكبر عدد أعمدة ينفع يتعرض على عرض الشاشة الحالى
  const maxCols = () => {
    const w = window.innerWidth;
    if (w < 600) return 2;
    const inner = Math.min(w, 1400) - 32;
    return Math.max(2, Math.min(6, Math.floor((inner + 16) / MIN_CARD)));
  };

  box.innerHTML = OPTIONS.map(
    (n) => `
      <button type="button" class="layout-btn" data-cols="${n}"
        aria-label="${n === 1 ? "List view" : n + " products per row"}" aria-pressed="false">
        <span class="layout-ico${n === 1 ? " is-list" : ""}">${"<i></i>".repeat(n === 1 ? 3 : n)}</span>
      </button>`,
  ).join("");

  const apply = () => {
    const max = maxCols();
    const cols = Math.min(wanted, max); // الاختيار بيرجع لوحده لما الشاشة تكبر
    box.querySelectorAll(".layout-btn").forEach((btn) => {
      const n = Number(btn.dataset.cols);
      const on = n === cols;
      btn.hidden = n > max;
      btn.classList.toggle("is-active", on);
      btn.setAttribute("aria-pressed", String(on));
    });
    grid.style.setProperty("--cols", cols);
    grid.dataset.cols = cols;
  };

  box.addEventListener("click", (e) => {
    const btn = e.target.closest(".layout-btn");
    if (!btn) return;
    wanted = Number(btn.dataset.cols);
    try {
      localStorage.setItem(KEY, wanted);
    } catch (err) {}
    apply();
  });

  window.addEventListener("resize", apply);
  apply();
})();
