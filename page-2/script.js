/* ======================
  TechNova Main Script
=========================
  Table of Contents:
  1. Helpers & DOM References
  2. Products Database (Smartphones, Laptops, Gaming & More)
  3. Navbar Scroll Behavior
  4. Navigation Dropdowns & Mobile Drawer
  5. Cart & Wishlist State (localStorage)
  6. Toast Notifications & Drawers UI
  7. Checkout Modal & Order Submission
  8. Catalog Filtering, Slim Brand Strip & Search (products.html)
  9. Preloader & Sale Popup Modal
  10. Mobile Drawer Toggle
  11. Black Friday Deals Auto-Slider
========================= */

(() => {
  // ==========================================
  // 1. Helpers & DOM References
  // ==========================================
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];

  const navbar = $("#navbar");
  const drawer = $("#drawer");

  // ==========================================
  // 2. Products Database (Smartphones, Laptops, Gaming & More)
  // ==========================================
  // قاعدة بيانات موسعة تشمل ماركات متعددة للموبايلات، اللابتوبات، الجيمنج، وباقي الأقسام
  const ALL_PRODUCTS = [
    // --- Smartphones ---
    {
      id: "p1",
      name: "iPhone 16 Pro",
      category: "smartphones",
      brand: "Apple",
      price: 69990,
      img: "images/Apple_IPhone_16.webp",
    },
    {
      id: "p5",
      name: "Samsung Galaxy S26 Ultra",
      category: "smartphones",
      brand: "Samsung",
      price: 64990,
      img: "images/Samsung Galaxy S26.webp",
    },
    {
      id: "p15",
      name: "Xiaomi 15 Ultra",
      category: "smartphones",
      brand: "Xiaomi",
      price: 48990,
      img: "images/Samsung Galaxy S26.webp",
    },
    {
      id: "p16",
      name: "Google Pixel 10 Pro",
      category: "smartphones",
      brand: "Google",
      price: 57990,
      img: "images/Apple_IPhone_16.webp",
    },

    // --- Laptops ---
    {
      id: "p2",
      name: "MacBook Air M4",
      category: "laptops",
      brand: "Apple",
      price: 89990,
      img: "images/Apple_MacBook_Air.webp",
    },
    {
      id: "p6",
      name: "XPS 14 Creator Edition",
      category: "laptops",
      brand: "Dell",
      price: 54990,
      img: "images/laptop.webp",
    },
    {
      id: "p13",
      name: "Spectre x360 14",
      category: "laptops",
      brand: "HP",
      price: 61990,
      img: "images/laptop.webp",
    },
    {
      id: "p17",
      name: "Legion Pro 7i",
      category: "laptops",
      brand: "Lenovo",
      price: 78990,
      img: "images/laptop.webp",
    },
    {
      id: "p18",
      name: "ROG Zephyrus G16",
      category: "laptops",
      brand: "ASUS",
      price: 84990,
      img: "images/laptop.webp",
    },

    // --- Gaming ---
    {
      id: "p10",
      name: "PlayStation 5 Pro",
      category: "gaming",
      brand: "PlayStation",
      price: 39990,
      img: "images/play station.jpg",
    },
    {
      id: "p19",
      name: "Xbox Series X 2TB Galaxy",
      category: "gaming",
      brand: "Xbox",
      price: 36990,
      img: "images/play station.jpg",
    },
    {
      id: "p20",
      name: "Nintendo Switch OLED",
      category: "gaming",
      brand: "Nintendo",
      price: 18990,
      img: "images/play station.jpg",
    },
    {
      id: "p21",
      name: "DualSense Edge Controller",
      category: "gaming",
      brand: "PlayStation",
      price: 8990,
      img: "images/play station.jpg",
    },

    // --- Tablets ---
    {
      id: "p7",
      name: "iPad Pro M4",
      category: "tablets",
      brand: "Apple",
      price: 52990,
      img: "images/tablet.jpg",
    },
    {
      id: "p8",
      name: "Galaxy Tab S10 Ultra",
      category: "tablets",
      brand: "Samsung",
      price: 44990,
      img: "images/tablet.jpg",
    },
    {
      id: "p22",
      name: "Lenovo Tab P12 Pro",
      category: "tablets",
      brand: "Lenovo",
      price: 27990,
      img: "images/tablet.jpg",
    },

    // --- Headphones ---
    {
      id: "p3",
      name: "AirPods Pro 2",
      category: "headphones",
      brand: "Apple",
      price: 19990,
      img: "images/Apple_AirPods_Pro_2_Wireless.webp",
    },
    {
      id: "p9",
      name: "WH-1000XM6 Wireless ANC",
      category: "headphones",
      brand: "Sony",
      price: 14990,
      img: "images/headphone.webp",
    },
    {
      id: "p23",
      name: "Galaxy Buds3 Pro",
      category: "headphones",
      brand: "Samsung",
      price: 9990,
      img: "images/Apple_AirPods_Pro_2_Wireless.webp",
    },

    // --- Smartwatches ---
    {
      id: "p4",
      name: "Apple Watch Series 10",
      category: "smartwatches",
      brand: "Apple",
      price: 29990,
      img: "images/Shop_Apple_Watch.webp",
    },
    {
      id: "p14",
      name: "Galaxy Watch Ultra",
      category: "smartwatches",
      brand: "Samsung",
      price: 24990,
      img: "images/Shop_Apple_Watch.webp",
    },

    // --- Cameras ---
    {
      id: "p11",
      name: "Alpha A7 IV Mirrorless",
      category: "cameras",
      brand: "Sony",
      price: 74990,
      img: "images/cameras.jpg",
    },
    {
      id: "p24",
      name: "EOS R8 Full-Frame",
      category: "cameras",
      brand: "Canon",
      price: 68990,
      img: "images/cameras.jpg",
    },

    // --- Accessories ---
    {
      id: "p12",
      name: "MagSafe Charging Kit",
      category: "accessories",
      brand: "Apple",
      price: 4990,
      img: "images/accessories.webp",
    },
    {
      id: "p25",
      name: "65W GaN Super Charger",
      category: "accessories",
      brand: "Samsung",
      price: 2490,
      img: "images/accessories.webp",
    },
  ];

  // ==========================================
  // 3. Navbar Scroll Behavior
  // ==========================================
  // مراقبة التمرير لإضافة تأثير الزجاج (glass effect) لشريط التنقل عند النزول
  const onScroll = () => {
    if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.addEventListener("DOMContentLoaded", () => {
    // ==========================================
    // 4. Navigation Dropdowns & Mobile Drawer
    // ==========================================
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

    // ==========================================
    // 5. Cart & Wishlist State (localStorage)
    // ==========================================
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

    // ==========================================
    // 6. Toast Notifications & Drawers UI
    // ==========================================
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
          showToast(
            "Removed from Wishlist",
            `${name} was removed from your wishlist.`,
          );
        } else {
          wishlist.push({ id, name, price, img });
          // إشعار الإضافة إلى المفضلة
          showToast(
            "Added to Wishlist",
            `${name} has been added to your wishlist.`,
          );
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
    if (closeWishlistBtn)
      closeWishlistBtn.addEventListener("click", closeOverlay);
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
    // 7. Checkout Modal & Order Submission
    // ==========================================
    // منطق إتمام الطلب (Checkout Modal & Form)
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

        // حساب المبلغ الإجمالي وعرضه داخل نافذة إتمام الطلب المنبثقة
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
    // 8. Catalog Filtering, Slim Brand Strip & Search (products.html)
    // ==========================================
    const catalogGrid = document.getElementById("catalogProductsGrid");
    if (catalogGrid) {
      const urlParams = new URLSearchParams(window.location.search);
      const initialCat = (urlParams.get("category") || "all").toLowerCase();

      // حالة الفلاتر الحالية
      let filterState = {
        category: initialCat,
        brand: "all",
        maxPrice: 120000,
        search: "",
        sort: "featured",
      };

      const categoryBtns = $$("#categoryFilterList .filter-pill");
      const brandStrip = $("#brandStrip");
      const brandStripList = $("#brandStripList");
      const brandStripTitle = $("#brandStripTitle");
      const clearBrandBtn = $("#clearBrandBtn");
      const priceInput = $("#priceRangeInput");
      const priceValueLabel = $("#priceRangeValue");
      const sortSelect = $("#sortSelect");
      const resetBtn = $("#resetFiltersBtn");
      const catalogTitle = $("#catalogTitle");
      const breadcrumbCat = $("#breadcrumbCategory");
      const countLabel = $("#productsCountLabel");
      const navbarSearch = $("#navbarSearchInput");

      // اختصار اسم الماركة داخل الدائرة الصغيرة
      const getBrandInitials = (brandName) =>
        brandName
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

      // استخراج الماركات الخاصة بالصنف المحدد فقط
      const getCategoryBrands = (category) => {
        const categoryProducts = ALL_PRODUCTS.filter(
          (p) => p.category === category,
        );

        const brandCounts = categoryProducts.reduce((acc, item) => {
          acc[item.brand] = (acc[item.brand] || 0) + 1;
          return acc;
        }, {});

        return Object.entries(brandCounts).map(([brand, count]) => ({
          brand,
          count,
        }));
      };

      // إظهار شريط البراندات الرفيع فقط عند اختيار صنف معين (وليس All Tech)
      const renderBrandStrip = () => {
        if (!brandStrip || !brandStripList) return;

        if (filterState.category === "all") {
          brandStrip.classList.add("brand-strip--hidden");
          brandStripList.innerHTML = "";
          if (clearBrandBtn) clearBrandBtn.hidden = true;
          return;
        }

        brandStrip.classList.remove("brand-strip--hidden");

        const brands = getCategoryBrands(filterState.category);

        if (brandStripTitle) {
          brandStripTitle.textContent = `${filterState.category} types:`;
        }

        if (clearBrandBtn) {
          clearBrandBtn.hidden = filterState.brand === "all";
        }

        brandStripList.innerHTML = brands
          .map(({ brand, count }) => {
            const isActive =
              filterState.brand.toLowerCase() === brand.toLowerCase();
            return `
              <button
                type="button"
                class="brand-pill ${isActive ? "active" : ""}"
                data-brand="${brand}"
                aria-pressed="${isActive}"
              >
                <span class="brand-pill__circle" aria-hidden="true">${getBrandInitials(brand)}</span>
                <span>${brand}</span>
                <span class="brand-pill__count">(${count})</span>
              </button>`;
          })
          .join("");

        $$("#brandStripList .brand-pill").forEach((btn) => {
          btn.addEventListener("click", () => {
            const clickedBrand = btn.dataset.brand;
            // الضغط على نفس الماركة النشطة يرجعها إلى "all" لسهولة التبديل
            filterState.brand =
              filterState.brand.toLowerCase() === clickedBrand.toLowerCase()
                ? "all"
                : clickedBrand;
            renderCatalog();
          });
        });
      };

      if (clearBrandBtn) {
        clearBrandBtn.addEventListener("click", () => {
          filterState.brand = "all";
          renderCatalog();
        });
      }

      // رسم المنتجات المفلترة وتحديث العناوين والعدادات
      const renderCatalog = () => {
        categoryBtns.forEach((btn) => {
          btn.classList.toggle(
            "active",
            btn.dataset.cat === filterState.category,
          );
        });

        renderBrandStrip();

        const displayCatName =
          filterState.category === "all"
            ? "All Products"
            : filterState.brand === "all"
              ? filterState.category
              : `${filterState.category} / ${filterState.brand}`;

        if (catalogTitle) {
          catalogTitle.textContent =
            filterState.category === "all"
              ? "All Products"
              : filterState.category;
        }
        if (breadcrumbCat) breadcrumbCat.textContent = displayCatName;

        let filtered = ALL_PRODUCTS.filter((p) => {
          const matchCat =
            filterState.category === "all" ||
            p.category === filterState.category;
          const matchBrand =
            filterState.category === "all" ||
            filterState.brand === "all" ||
            p.brand.toLowerCase() === filterState.brand.toLowerCase();
          const matchPrice = p.price <= filterState.maxPrice;
          const matchSearch =
            p.name.toLowerCase().includes(filterState.search) ||
            p.brand.toLowerCase().includes(filterState.search);
          return matchCat && matchBrand && matchPrice && matchSearch;
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
              <div class="popular-card__meta-row">
                <span class="popular-card__badge">${p.category}</span>
                <span class="popular-card__brand">${p.brand}</span>
              </div>
              <img class="popular-card__image" src="${p.img}" alt="${p.name}" loading="lazy" />
              <p class="popular-card__price">From <strong>LE ${p.price.toLocaleString()}</strong></p>
            </article>`,
            )
            .join("");
        }
        updateUI();
      };

      // عند تغيير الصنف نرجع البراند لـ "all" عشان يعرض أنواع الصنف الجديد
      categoryBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          filterState.category = btn.dataset.cat;
          filterState.brand = "all";
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
            brand: "all",
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

  // ==========================================
  // 9. Preloader & Sale Popup Modal
  // ==========================================
  // إخفاء شاشة التحميل بعد اكتمال تحميل الصفحة ثم إظهار إعلان العروض (Sale Popup)
  const preloader = $("#preloader");
  const salePopup = $("#salePopup");

  const openSalePopup = () => {
    if (!salePopup) return;
    salePopup.hidden = false;
    requestAnimationFrame(() => {
      salePopup.classList.add("is-open");
      document.body.classList.add("no-scroll");
    });
  };

  const closeSalePopup = () => {
    if (!salePopup) return;
    salePopup.classList.remove("is-open");
    document.body.classList.remove("no-scroll");
    setTimeout(() => {
      salePopup.hidden = true;
    }, 300);
  };

  $$("[data-close-sale]").forEach((el) => {
    el.addEventListener("click", closeSalePopup);
  });

  const goToDealsBtn = $("#goToDealsBtn");
  if (goToDealsBtn) {
    goToDealsBtn.addEventListener("click", closeSalePopup);
  }

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && salePopup && !salePopup.hidden) {
      closeSalePopup();
    }
  });

  const finishInitialLoad = () => {
    document.body.classList.add("is-loaded");

    if (preloader) {
      preloader.classList.add("is-hidden");
      setTimeout(() => {
        preloader.hidden = true;
      }, 450);
    }

    // إظهار عرض الـ Sale بعد انتهاء الـ Preloader
    setTimeout(() => {
      openSalePopup();
    }, 650);
  };

  if (document.readyState === "complete") {
    finishInitialLoad();
  } else {
    window.addEventListener("load", finishInitialLoad, { once: true });
    // حد أقصى للانتظار في حال تأخر تحميل أحد الموارد
    setTimeout(finishInitialLoad, 2500);
  }

  // ==========================================
  // 10. Mobile Drawer Toggle
  // ==========================================
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

  //=================
  // Brand Marquee
  //=================
  ["#marquee", "#brandsMarquee"].forEach((selector) => {
    const el = document.querySelector(selector);
    if (!el || !el.firstElementChild) return;
    const clone = el.firstElementChild.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    el.appendChild(clone);
  });

  // ==========================================
  // 11. Black Friday Deals Auto-Slider
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
