(() => {
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];

  // Mobile Drawer
  const drawer = $("#drawer");
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

  $$(".drawer__sublist", drawer).forEach((sublist) => {
    const inner = document.createElement("div");
    inner.className = "drawer__sublist-inner";
    while (sublist.firstChild) inner.appendChild(sublist.firstChild);
    sublist.appendChild(inner);
  });

  $$(".drawer__trigger", drawer).forEach((trigger) => {
    trigger.addEventListener("click", () => {
      const group = trigger.closest(".drawer__group");
      const willOpen = !group.classList.contains("is-open");
      group.classList.toggle("is-open", willOpen);
      trigger.setAttribute("aria-expanded", String(willOpen));
    });
  });

  $("#openMenu")?.addEventListener("click", openMenu);
  $$("[data-close-menu]").forEach((el) =>
    el.addEventListener("click", closeMenu),
  );

  // Catalog Filtering Logic
  const products = window.STORE_PRODUCTS || [];
  const grid = $("#catalogGrid");
  const emptyState = $("#catalogEmpty");
  const countEl = $("#catalogCount");
  const titleEl = $("#catalogTitle");
  const breadcrumbEl = $("#breadcrumbCurrent");

  const catTabs = $("#catTabs");
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

  // قراءة الفلاتر من الرابط عند فتح الصفحة
  const params = new URLSearchParams(window.location.search);
  const state = {
    cat: params.get("cat") || "all",
    sub: params.get("sub") || "all",
    search: "",
    sort: "default",
  };

  const formatPrice = (n) => `${n.toLocaleString("en-US")} ج.م`;

  const syncUIWithState = () => {
    $$(".filter-tab", catTabs).forEach((btn) =>
      btn.classList.toggle("is-active", btn.dataset.cat === state.cat),
    );
    if (subFilter) subFilter.value = state.sub;

    const label =
      state.sub !== "all"
        ? TITLES[state.sub] || TITLES[state.cat]
        : TITLES[state.cat] || TITLES.all;

    if (titleEl) titleEl.textContent = label;
    if (breadcrumbEl) breadcrumbEl.textContent = label;
  };

  const syncURL = () => {
    const url = new URL(window.location.href);
    if (state.cat && state.cat !== "all")
      url.searchParams.set("cat", state.cat);
    else url.searchParams.delete("cat");

    if (state.sub && state.sub !== "all")
      url.searchParams.set("sub", state.sub);
    else url.searchParams.delete("sub");

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

    if (state.search.trim()) {
      const q = state.search.trim().toLowerCase();
      list = list.filter(
        (p) =>
          p.name.toLowerCase().includes(q) ||
          p.category.toLowerCase().includes(q),
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
      grid.innerHTML = "";
      emptyState.hidden = false;
      return;
    }

    emptyState.hidden = true;
    grid.innerHTML = list
      .map(
        (item) => `
        <article class="product-card" data-id="${item.id}">
          ${item.badge ? `<span class="product-card__badge">${item.badge}</span>` : ""}
          <div class="product-card__media">
            <img src="${item.image}" alt="${item.name}" loading="lazy" />
          </div>
          <div class="product-card__body">
            <div class="product-card__meta">
              <span>${item.category}</span>
              <span class="product-card__rating">
                <i class="fa-solid fa-star"></i> ${item.rating.toFixed(1)}
              </span>
            </div>
            <h3 class="product-card__title">${item.name}</h3>
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
    state.search = "";
    state.sort = "default";
    if (searchInput) searchInput.value = "";
    if (sortSelect) sortSelect.value = "default";
    syncUIWithState();
    syncURL();
    renderCatalog();
  });

  grid?.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-cart]");
    if (addBtn) {
      const card = addBtn.closest(".product-card");
      const product = products.find((p) => String(p.id) === card?.dataset.id);
      if (product && window.StoreCart) {
        window.StoreCart.add(product);
        addBtn.classList.add("is-added");
        setTimeout(() => addBtn.classList.remove("is-added"), 450);
      }
    }
  });

  syncUIWithState();
  renderCatalog();
})();
