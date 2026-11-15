/* ======================
  table of contents
=========================
  1. Helpers & state
  2. Scroll listener (glass navbar)
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
  let cartCount = 2; // قيمة تجريبية، غيّرها أو نادى window.setCartCount(n)

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

    // active state شكلى بس
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
    cartBadge.hidden = cartCount <= 0;

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

  $("#cartBtn").addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("cart:open"));
  });

  //=======================
  // 5. Search panel
  //=======================
  const openSearch = () => {
    searchOpen = true;
    searchPanel.hidden = false;
    searchInput.focus();
  };

  const closeSearch = () => {
    searchOpen = false;
    searchPanel.hidden = true;
  };

  $$("[data-open-search]").forEach((btn) =>
    btn.addEventListener("click", () =>
      searchOpen ? closeSearch() : openSearch(),
    ),
  );
  $("#closeSearch").addEventListener("click", closeSearch);
  $("#searchForm").addEventListener("submit", (e) => e.preventDefault());

  //=======================
  // 6. Mobile drawer
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
    if (e.key !== "Escape") return;
    closeMenu();
    if (searchOpen) closeSearch();
  });
})();
