/* ======================
  TechNova Main Script
========================= */

(() => {
  // دوال مساعدة لاختيار العناصر من الصفحة بشكل مختصر
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];

  const navbar = $("#navbar");
  const drawer = $("#drawer");

  // قاعدة بيانات المنتجات الشاملة لكل الأقسام
  const ALL_PRODUCTS = [
    {
      id: "p1",
      name: "iPhone 16",
      category: "smartphones",
      price: 69990,
      img: "images/Apple_IPhone_16.webp",
    },
    {
      id: "p5",
      name: "Samsung Galaxy S26",
      category: "smartphones",
      price: 64990,
      img: "images/Samsung Galaxy S26.webp",
    },
    {
      id: "p2",
      name: "MacBook Air",
      category: "laptops",
      price: 89990,
      img: "images/Apple_MacBook_Air.webp",
    },
    {
      id: "p6",
      name: "Pro Creator Laptop 14",
      category: "laptops",
      price: 54990,
      img: "images/laptop.webp",
    },
    {
      id: "p7",
      name: "iPad Pro M4",
      category: "tablets",
      price: 52990,
      img: "images/tablet.jpg",
    },
    {
      id: "p8",
      name: "Galaxy Tab S10 Ultra",
      category: "tablets",
      price: 44990,
      img: "images/tablet.jpg",
    },
    {
      id: "p3",
      name: "AirPods Pro 2",
      category: "headphones",
      price: 19990,
      img: "images/Apple_AirPods_Pro_2_Wireless.webp",
    },
    {
      id: "p9",
      name: "Studio Wireless ANC",
      category: "headphones",
      price: 14990,
      img: "images/headphone.webp",
    },
    {
      id: "p4",
      name: "Apple Watch Series 10",
      category: "smartwatches",
      price: 29990,
      img: "images/Shop_Apple_Watch.webp",
    },
    {
      id: "p10",
      name: "PlayStation 5 Pro",
      category: "gaming",
      price: 39990,
      img: "images/play station.jpg",
    },
    {
      id: "p11",
      name: "Alpha 4K Mirrorless",
      category: "cameras",
      price: 74990,
      img: "images/cameras.jpg",
    },
    {
      id: "p12",
      name: "MagSafe Charging Kit",
      category: "accessories",
      price: 4990,
      img: "images/accessories.webp",
    },
  ];

  // مراقبة التمرير لتغيير تصميم شريط التنقل (Navbar)
  const onScroll = () => {
    if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.addEventListener("DOMContentLoaded", () => {
    // تفعيل قوائم الأقسام المندلجة في القائمة الجانبية (Mobile Drawer Accordion)
    const drawerAccordions = document.querySelectorAll(".drawer__accordion");
    drawerAccordions.forEach((accordion) => {
      const toggle = accordion.querySelector(".drawer__accordion-toggle");
      if (toggle) {
        toggle.addEventListener("click", (e) => {
          e.preventDefault();
          e.stopPropagation();
          accordion.classList.toggle("is-open");
        });
      }
    });

    // تفعيل قائمة الأقسام المندلجة في شريط التنقل العلوي (Navbar Dropdown)
    const navDropdown = document.getElementById("navDropdown");
    if (navDropdown) {
      const toggleBtn = navDropdown.querySelector(".nav-dropdown__toggle");
      toggleBtn.addEventListener("click", (e) => {
        e.stopPropagation();
        navDropdown.classList.toggle("is-open");
        toggleBtn.setAttribute(
          "aria-expanded",
          navDropdown.classList.contains("is-open"),
        );
      });
      document.addEventListener("click", () => {
        navDropdown.classList.remove("is-open");
        toggleBtn.setAttribute("aria-expanded", "false");
      });
    }

    // إدارة الحالة المشتركة (سلة التسوق والمفضلة محفوظة في الذاكرة المحلية localStorage)
    let cart = JSON.parse(localStorage.getItem("technova_cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("technova_wishlist")) || [];

    const saveState = () => {
      localStorage.setItem("technova_cart", JSON.stringify(cart));
      localStorage.setItem("technova_wishlist", JSON.stringify(wishlist));
    };

    // عناصر واجهة المستخدم الخاصة باللوحات الجانبية (Drawers)
    const cartBtn = document.getElementById("cartBtn");
    const wishlistBtn = document.getElementById("wishlistBtn");
    const drawerWishlist = document.getElementById("drawerWishlist");
    const cartPanel = document.getElementById("cartPanel");
    const wishlistPanel = document.getElementById("wishlistPanel");
    const overlay = document.getElementById("sideDrawerOverlay");
    const closeCartBtn = document.getElementById("closeCartPanel");
    const closeWishlistBtn = document.getElementById("closeWishlistPanel");
    const cartBadgeEl = document.getElementById("cartBadge");
    const wishlistBadgeEl = document.getElementById("wishlistBadge");
    const cartDrawerCount = document.getElementById("cartDrawerCount");
    const wishlistDrawerCount = document.getElementById("wishlistDrawerCount");
    const cartItemsContainer = document.getElementById("cartItemsContainer");
    const wishlistItemsContainer = document.getElementById(
      "wishlistItemsContainer",
    );
    const cartSubtotal = document.getElementById("cartSubtotal");
    const clearCartBtn = document.getElementById("clearCartBtn");
    const moveAllToCartBtn = document.getElementById("moveAllToCartBtn");

    // عناصر نظام الإشعارات المنبثقة (Toast Notifications)
    const toastNotification = document.getElementById("toastNotification");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");

    // دالة مخصصة لإظهار الإشعار برسالة وعنوان محددين لفترة زمنية قصيرة
    const showToast = (title, message) => {
      if (toastNotification && toastTitle && toastMessage) {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        toastNotification.hidden = false;

        // إخفاء الإشعار تلقائياً بعد 3 ثوانٍ
        setTimeout(() => {
          toastNotification.hidden = true;
        }, 3000);
      }
    };

    // فتح الخلفية المعتمة للقوائم الجانبية
    const openOverlay = () => {
      overlay.hidden = false;
      document.body.classList.add("no-scroll");
    };

    // إغلاق الخلفية المعتمة والقوائم الجانبية
    const closeOverlay = () => {
      overlay.hidden = true;
      cartPanel.classList.remove("open");
      wishlistPanel.classList.remove("open");
      document.body.classList.remove("no-scroll");
    };

    // تحديث واجهة المستخدم (العلامات، المجموع، محتوى السلة والمفضلة)
    const updateUI = () => {
      saveState();
      
      // تحديث عداد سلة التسوق
      const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);
      if (cartBadgeEl) {
        cartBadgeEl.textContent = totalCartItems;
        cartBadgeEl.hidden = totalCartItems <= 0;
      }
      if (cartDrawerCount)
        cartDrawerCount.textContent = `${totalCartItems} items`;

      // تحديث عداد قائمة المفضلة
      if (wishlistBadgeEl) {
        wishlistBadgeEl.textContent = wishlist.length;
        wishlistBadgeEl.hidden = wishlist.length <= 0;
      }
      if (wishlistDrawerCount)
        wishlistDrawerCount.textContent = `${wishlist.length} items`;

      // تحديث عرض عناصر سلة التسوق داخل اللوحة الجانبية
      if (cartItemsContainer) {
        if (cart.length === 0) {
          cartItemsContainer.innerHTML = `
            <div class="side-panel__empty">
              <i class="fa-solid fa-bag-shopping"></i>
              <p>Your cart is empty</p>
            </div>`;
          if (cartSubtotal) cartSubtotal.textContent = "LE 0";
        } else {
          cartItemsContainer.innerHTML = cart
            .map(
              (item) => `
            <div class="side-item" data-id="${item.id}">
              <img src="${item.img}" alt="${item.name}" class="side-item__img" />
              <div class="side-item__details">
                <h4 class="side-item__name">${item.name}</h4>
                <div class="side-item__price">LE ${item.price.toLocaleString()}</div>
                <div class="side-item__controls">
                  <button class="side-item__qty-btn decrease-qty" type="button">-</button>
                  <span class="side-item__qty">${item.qty}</span>
                  <button class="side-item__qty-btn increase-qty" type="button">+</button>
                </div>
              </div>
              <button class="side-item__remove remove-cart-item" type="button" aria-label="Remove item">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>`,
            )
            .join("");

          const subtotal = cart.reduce(
            (sum, item) => sum + item.price * item.qty,
            0,
          );
          if (cartSubtotal)
            cartSubtotal.textContent = `LE ${subtotal.toLocaleString()}`;
        }
      }

      // تحديث عرض عناصر قائمة المفضلة داخل اللوحة الجانبية
      if (wishlistItemsContainer) {
        if (wishlist.length === 0) {
          wishlistItemsContainer.innerHTML = `
            <div class="side-panel__empty">
              <i class="fa-regular fa-heart"></i>
              <p>Your wishlist is empty</p>
            </div>`;
        } else {
          wishlistItemsContainer.innerHTML = wishlist
            .map(
              (item) => `
            <div class="side-item" data-id="${item.id}">
              <img src="${item.img}" alt="${item.name}" class="side-item__img" />
              <div class="side-item__details">
                <h4 class="side-item__name">${item.name}</h4>
                <div class="side-item__price">LE ${item.price.toLocaleString()}</div>
                <button class="side-panel__btn-checkout move-to-cart-single" type="button" style="margin-top: 8px; padding: 6px 12px; font-size: 12px;">Add to Cart</button>
              </div>
              <button class="side-item__remove remove-wishlist-item" type="button" aria-label="Remove item">
                <i class="fa-solid fa-trash-can"></i>
              </button>
            </div>`,
            )
            .join("");
        }
      }

      // مزامنة أيقونات القلب (Wishlist Heart Icon) النشطة على بطاقات المنتجات
      document.querySelectorAll(".popular-card").forEach((card) => {
        const id = card.dataset.id;
        const heartIcon = card.querySelector(".wishlist-trigger i");
        const isInWishlist = wishlist.some((w) => w.id === id);
        if (heartIcon) {
          heartIcon.className = isInWishlist
            ? "fa-solid fa-heart"
            : "fa-regular fa-heart";
          heartIcon.style.color = isInWishlist ? "var(--primary)" : "";
        }
      });
    };

    // الاستماع لأحداث النقر لإضافة المنتجات إلى السلة أو المفضلة مع تفعيل الإشعارات
    document.addEventListener("click", (e) => {
      // تفاعل زر إضافة منتج إلى السلة
      const cartTrigger = e.target.closest(".cart-trigger");
      if (cartTrigger) {
        const card = cartTrigger.closest(".popular-card");
        if (!card) return;
        const { id, name, img } = card.dataset;
        const price = Number(card.dataset.price);
        const existing = cart.find((item) => item.id === id);
        
        if (existing) existing.qty++;
        else cart.push({ id, name, price, img, qty: 1 });
        
        updateUI();
        
        // إظهار إشعار نجاح الإضافة إلى السلة
        showToast("Added to Cart", `${name} has been added to your cart.`);
        
        if (cartPanel) cartPanel.classList.add("open");
        openOverlay();
      }

      // تفاعل زر إضافة/إزالة منتج من المفضلة
      const wishTrigger = e.target.closest(".wishlist-trigger");
      if (wishTrigger) {
        const card = wishTrigger.closest(".popular-card");
        if (!card) return;
        const { id, name, img } = card.dataset;
        const price = Number(card.dataset.price);
        const index = wishlist.findIndex((item) => item.id === id);
        
        if (index > -1) {
          wishlist.splice(index, 1);
          // إشعار الإزالة من المفضلة
          showToast("Removed from Wishlist", `${name} was removed from your wishlist.`);
        } else {
          wishlist.push({ id, name, price, img });
          // إشعار الإضافة إلى المفضلة
          showToast("Added to Wishlist", `${name} has been added to your wishlist.`);
        }
        updateUI();
      }
    });

    // فتح وإغلاق لوحة سلة التسوق
    if (cartBtn) {
      cartBtn.addEventListener("click", () => {
        if (wishlistPanel) wishlistPanel.classList.remove("open");
        if (cartPanel) cartPanel.classList.add("open");
        openOverlay();
      });
    }

    // فتح لوحة المفضلة
    const openWishlistDrawer = () => {
      if (cartPanel) cartPanel.classList.remove("open");
      if (wishlistPanel) wishlistPanel.classList.add("open");
      openOverlay();
    };

    if (wishlistBtn) wishlistBtn.addEventListener("click", openWishlistDrawer);
    if (drawerWishlist) {
      drawerWishlist.addEventListener("click", (e) => {
        e.preventDefault();
        openWishlistDrawer();
      });
    }

    // أزرار إغلاق اللوحات والخلفية المعتمة
    if (closeCartBtn) closeCartBtn.addEventListener("click", closeOverlay);
    if (closeWishlistBtn) closeWishlistBtn.addEventListener("click", closeOverlay);
    if (overlay) overlay.addEventListener("click", closeOverlay);

    // إدارة عناصر سلة التسوق (زيادة، تقليص، أو إزالة منتج)
    if (cartItemsContainer) {
      cartItemsContainer.addEventListener("click", (e) => {
        const itemEl = e.target.closest(".side-item");
        if (!itemEl) return;
        const id = itemEl.dataset.id;
        if (e.target.closest(".increase-qty")) {
          const item = cart.find((i) => i.id === id);
          if (item) item.qty++;
          updateUI();
        }
        if (e.target.closest(".decrease-qty")) {
          const item = cart.find((i) => i.id === id);
          if (item) {
            item.qty--;
            if (item.qty <= 0) cart = cart.filter((i) => i.id !== id);
          }
          updateUI();
        }
        if (e.target.closest(".remove-cart-item")) {
          cart = cart.filter((i) => i.id !== id);
          updateUI();
        }
      });
    }

    // إدارة عناصر المفضلة (إزالة أو نقل للسلة)
    if (wishlistItemsContainer) {
      wishlistItemsContainer.addEventListener("click", (e) => {
        const itemEl = e.target.closest(".side-item");
        if (!itemEl) return;
        const id = itemEl.dataset.id;
        if (e.target.closest(".remove-wishlist-item")) {
          wishlist = wishlist.filter((i) => i.id !== id);
          updateUI();
        }
        if (e.target.closest(".move-to-cart-single")) {
          const product = wishlist.find((i) => i.id === id);
          if (product) {
            const existing = cart.find((i) => i.id === id);
            if (existing) existing.qty++;
            else cart.push({ ...product, qty: 1 });
            wishlist = wishlist.filter((i) => i.id !== id);
            updateUI();
          }
        }
      });
    }

    // زر تفريغ السلة بالكامل
    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateUI();
      });
    }

    // زر نقل كل منتجات المفضلة إلى السلة
    if (moveAllToCartBtn) {
      moveAllToCartBtn.addEventListener("click", () => {
        wishlist.forEach((wItem) => {
          const existing = cart.find((i) => i.id === wItem.id);
          if (existing) existing.qty++;
          else cart.push({ ...wItem, qty: 1 });
        });
        wishlist = [];
        updateUI();
      });
    }

    // ==========================================
    // منطق إتمام الطلب (Checkout Modal & Form)
    // ==========================================
    const checkoutBtn = document.querySelector(".side-panel__btn-checkout");
    const checkoutModal = document.getElementById("checkoutModal");
    const closeCheckoutModalBtn = document.getElementById("closeCheckoutModal");
    const closeCheckoutBtn = document.getElementById("closeCheckoutBtn");
    const checkoutModalTotal = document.getElementById("checkoutModalTotal");
    const checkoutForm = document.getElementById("checkoutForm");

    if (checkoutBtn) {
      checkoutBtn.addEventListener("click", () => {
        if (cart.length === 0) {
          alert("Your cart is empty!");
          return;
        }
        closeOverlay();

        // حساب المبلغ الإجمالي وحفظه داخل نافذة إتمام الطلب المنبثقة
        const subtotal = cart.reduce(
          (sum, item) => sum + item.price * item.qty,
          0,
        );
        if (checkoutModalTotal) {
          checkoutModalTotal.textContent = `LE ${subtotal.toLocaleString()}`;
        }

        // فتح نافذة الـ Popup
        if (checkoutModal) {
          checkoutModal.hidden = false;
          document.body.classList.add("no-scroll");
        }
      });
    }

    const closeCheckoutModal = () => {
      if (checkoutModal) {
        checkoutModal.hidden = true;
        document.body.classList.remove("no-scroll");
      }
    };

    if (closeCheckoutModalBtn)
      closeCheckoutModalBtn.addEventListener("click", closeCheckoutModal);
    if (closeCheckoutBtn)
      closeCheckoutBtn.addEventListener("click", closeCheckoutModal);

    // إرسال نموذج بيانات العميل وإتمام الطلب بنجاح
    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();

        closeCheckoutModal();

        // تفريغ السلة بعد إتمام الطلب
        cart = [];
        updateUI();

        // إظهار إشعار تأكيد الطلب الناجح
        showToast("Success!", "Your order has been placed successfully.");

        checkoutForm.reset();
      });
    }

    // ==========================================
    // منطق تصفية الكتالوج والبحث (products.html)
    // ==========================================
    const catalogGrid = document.getElementById("catalogProductsGrid");
    if (catalogGrid) {
      const urlParams = new URLSearchParams(window.location.search);
      const initialCat = (urlParams.get("category") || "all").toLowerCase();

      let filterState = {
        category: initialCat,
        maxPrice: 120000,
        search: "",
        sort: "featured",
      };

      const categoryBtns = $$("#categoryFilterList .filter-pill");
      const priceInput = $("#priceRangeInput");
      const priceValueLabel = $("#priceRangeValue");
      const sortSelect = $("#sortSelect");
      const resetBtn = $("#resetFiltersBtn");
      const catalogTitle = $("#catalogTitle");
      const breadcrumbCat = $("#breadcrumbCategory");
      const countLabel = $("#productsCountLabel");
      const navbarSearch = $("#navbarSearchInput");

      const renderCatalog = () => {
        categoryBtns.forEach((btn) => {
          btn.classList.toggle(
            "active",
            btn.dataset.cat === filterState.category,
          );
        });

        const displayCatName =
          filterState.category === "all"
            ? "All Products"
            : filterState.category;
        if (catalogTitle) catalogTitle.textContent = displayCatName;
        if (breadcrumbCat) breadcrumbCat.textContent = displayCatName;

        let filtered = ALL_PRODUCTS.filter((p) => {
          const matchCat =
            filterState.category === "all" ||
            p.category === filterState.category;
          const matchPrice = p.price <= filterState.maxPrice;
          const matchSearch = p.name.toLowerCase().includes(filterState.search);
          return matchCat && matchPrice && matchSearch;
        });

        if (filterState.sort === "price-asc") {
          filtered.sort((a, b) => a.price - b.price);
        } else if (filterState.sort === "price-desc") {
          filtered.sort((a, b) => b.price - a.price);
        }

        if (countLabel) {
          countLabel.textContent = `Showing ${filtered.length} product${filtered.length === 1 ? "" : "s"}`;
        }

        if (filtered.length === 0) {
          catalogGrid.innerHTML = `
            <div class="catalog-empty">
              <i class="fa-solid fa-box-open"></i>
              <p>No products match your selected filters.</p>
            </div>`;
        } else {
          catalogGrid.innerHTML = filtered
            .map(
              (p) => `
            <article class="popular-card" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}" data-img="${p.img}">
              <div class="popular-card__top">
                <h3 class="popular-card__name">${p.name}</h3>
                <div class="popular-card__actions-group">
                  <button class="popular-card__button wishlist-trigger" type="button" aria-label="Wishlist"><i class="fa-regular fa-heart"></i></button>
                  <button class="popular-card__button cart-trigger" type="button" aria-label="Cart"><i class="fa-solid fa-plus"></i></button>
                </div>
              </div>
              <span class="popular-card__badge">${p.category}</span>
              <img class="popular-card__image" src="${p.img}" alt="${p.name}" loading="lazy" />
              <p class="popular-card__price">From <strong>LE ${p.price.toLocaleString()}</strong></p>
            </article>`,
            )
            .join("");
        }
        updateUI();
      };

      categoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          filterState.category = btn.dataset.cat;
          const newUrl =
            filterState.category === "all"
              ? "products.html"
              : `products.html?category=${filterState.category}`;
          window.history.replaceState({}, "", newUrl);
          renderCatalog();
        });
      });

      if (priceInput) {
        priceInput.addEventListener("input", (e) => {
          filterState.maxPrice = Number(e.target.value);
          if (priceValueLabel)
            priceValueLabel.textContent = `LE ${filterState.maxPrice.toLocaleString()}`;
          renderCatalog();
        });
      }

      if (sortSelect) {
        sortSelect.addEventListener("change", (e) => {
          filterState.sort = e.target.value;
          renderCatalog();
        });
      }

      if (navbarSearch) {
        navbarSearch.addEventListener("input", (e) => {
          filterState.search = e.target.value.trim().toLowerCase();
          renderCatalog();
        });
      }

      if (resetBtn) {
        resetBtn.addEventListener("click", () => {
          filterState = {
            category: "all",
            maxPrice: 120000,
            search: "",
            sort: "featured",
          };
          if (priceInput) priceInput.value = 120000;
          if (priceValueLabel) priceValueLabel.textContent = "LE 120,000";
          if (sortSelect) sortSelect.value = "featured";
          if (navbarSearch) navbarSearch.value = "";
          window.history.replaceState({}, "", "products.html");
          renderCatalog();
        });
      }

      renderCatalog();
    } else {
      updateUI();
    }
  });

  // إدارة القائمة الجانبية للشاشات الصغيرة (Mobile Drawer Menu)
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

  const openMenuBtn = $("#openMenu");
  if (openMenuBtn) openMenuBtn.addEventListener("click", openMenu);
  $$("[data-close-menu]").forEach((el) =>
    el.addEventListener("click", closeMenu),
  );

  // ==========================================
    // 7. Black Friday Deals Auto-Slider
    // ==========================================
    const dealSlider = $("#dealSlider");
    const dealViewport = $("#dealViewport");
    const dealTrack = $("#dealTrack");
    const dealSlides = $$(".deal-slide", dealSlider);
    const dealDots = $$("[data-deal-dot]", dealSlider);

    if (dealSlider && dealViewport && dealTrack && dealSlides.length > 0) {
      let dealIndex = 0;
      let dealTimer = null;
      const AUTO_DELAY = 4500;

      const goToDeal = (i) => {
        dealIndex = (i + dealSlides.length) % dealSlides.length;
        dealTrack.style.transform = `translateX(-${dealIndex * 100}%)`;

        dealSlides.forEach((slide, n) => {
          const isCurrent = n === dealIndex;
          slide.classList.toggle("is-active", isCurrent);
          slide.toggleAttribute("inert", !isCurrent);
        });

        dealDots.forEach((dot, n) => {
          dot.classList.remove("active");
          void dot.offsetWidth;
          if (n === dealIndex) {
            dot.classList.add("active");
            dot.setAttribute("aria-current", "true");
          } else {
            dot.removeAttribute("aria-current");
          }
        });
      };

      const startAutoDeal = () => {
        stopAutoDeal();
        dealTimer = setInterval(() => {
          goToDeal(dealIndex + 1);
        }, AUTO_DELAY);
      };

      const stopAutoDeal = () => {
        if (dealTimer) {
          clearInterval(dealTimer);
          dealTimer = null;
        }
      };

      dealDots.forEach((dot) =>
        dot.addEventListener("click", () => {
          goToDeal(Number(dot.dataset.dealDot));
          startAutoDeal();
        }),
      );

      dealSlider.addEventListener("mouseenter", stopAutoDeal);
      dealSlider.addEventListener("mouseleave", startAutoDeal);

      let dealStartX = null;
      dealViewport.addEventListener("pointerdown", (e) => {
        dealStartX = e.clientX;
        stopAutoDeal();
      });
      dealViewport.addEventListener("pointerup", (e) => {
        if (dealStartX === null) return;
        const dx = e.clientX - dealStartX;
        dealStartX = null;
        if (Math.abs(dx) > 50) goToDeal(dealIndex + (dx < 0 ? 1 : -1));
        startAutoDeal();
      });
      dealViewport.addEventListener("pointercancel", () => {
        dealStartX = null;
        startAutoDeal();
      });

      dealSlider.addEventListener("keydown", (e) => {
        if (e.key === "ArrowRight") {
          goToDeal(dealIndex + 1);
          startAutoDeal();
        }
        if (e.key === "ArrowLeft") {
          goToDeal(dealIndex - 1);
          startAutoDeal();
        }
      });

      goToDeal(0);
      startAutoDeal();
    }
})();