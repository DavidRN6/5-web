/* ======================
  table of contents
=========================
  1. Helpers & state
  2. Announcement marquee (clone)
  3. Header state (transparent on home)
  4. Static links (no navigation)
  5. Cart count
  6. Search (open / close)
  7. Mobile menu (open / close)
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
  // 2. Announcement marquee
  //=======================
  const marquee = $("#marquee");
  if (marquee) {
    const clone = marquee.firstElementChild.cloneNode(true);
    clone.setAttribute("aria-hidden", "true");
    marquee.appendChild(clone);
  }

  //=======================
  // 3. Header state
  //=======================
  const renderHeader = () => {
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
  // 4. Static links (no navigation)
  //=======================
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');
    if (!link) return;
    e.preventDefault();

    // active state
    if (link.matches(".nav-link, .mobile-link")) {
      const group = link.closest("nav");
      $$(".nav-link, .mobile-link", group).forEach((l) =>
        l.classList.toggle("active", l === link),
      );
    }
  });

  // HOME active
  $$(".nav-link:first-child, .mobile-link:first-child").forEach((l) =>
    l.classList.add("active"),
  );

  //=======================
  // 5. Cart count
  //=======================
  const updateCartCount = () => {
    let count = 0;
    try {
      const items = JSON.parse(localStorage.getItem("cartItems")) || {};
      count = Object.values(items).reduce(
        (total, sizes) =>
          total + Object.values(sizes).reduce((sum, qty) => sum + qty, 0),
        0,
      );
    } catch {}
    $("#cartCount").textContent = count;
  };
  updateCartCount();
  window.updateCartCount = updateCartCount;

  $("#cartBtn").addEventListener("click", () => {
    document.dispatchEvent(new CustomEvent("cart:open"));
  });

  //=======================
  // 6. Search (open / close)
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

  $("#searchToggle").addEventListener("click", () =>
    searchOpen ? closeSearch() : openSearch(),
  );
  $("#searchClose").addEventListener("click", closeSearch);
  $("#searchForm").addEventListener("submit", (e) => e.preventDefault());

  //=======================
  // 7. Mobile menu (open / close)
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

  $("#openMenu").addEventListener("click", openMenu);
  $$("[data-close-menu]").forEach((el) =>
    el.addEventListener("click", closeMenu),
  );
  $$(".mobile-link, .mobile-login").forEach((el) =>
    el.addEventListener("click", closeMenu),
  );

  document.addEventListener("keydown", (e) => {
    if (e.key !== "Escape") return;
    closeMenu();
    if (searchOpen) closeSearch();
  });
})();

//=====================
// Best Sellers
//=====================

const products = [
  {
    _id: "1",
    name: "Wide leg basic sweatpants",
    price: 450,
    image: ["./assets/img_1.webp"],
    bestseller: true,
  },
  {
    _id: "2",
    name: "Oversize premium cotton hoodie",
    price: 750,
    image: [
      "./assets/img2_1.webp",
      "./assets/img2_2.webp",
      "./assets/img2_3.webp",
      "./assets/img2_4.webp",
      "./assets/img2_5.webp",
      "./assets/img2_6.webp",
      "./assets/img2_7.webp",
    ],
    bestseller: true,
  },
  {
    _id: "3",
    name: "Plain cotton shirt",
    price: 600,
    image: ["./assets/img_3.webp"],
    bestseller: true,
  },
  {
    _id: "4",
    name: "Premium cotton slim basic t-shirt",
    price: 600,
    image: ["./assets/img_4.webp"],
    bestseller: true,
  },
  {
    _id: "5",
    name: "Striped cotton shirt",
    price: 600,
    image: ["./assets/img_5.webp"],
    bestseller: true,
  },
  {
    _id: "6",
    name: "Gabardine shirt jacket",
    price: 600,
    image: ["./assets/img_6.webp"],
    bestseller: true,
  },
  {
    _id: "7",
    name: "Stwd oversize interlock",
    price: 600,
    image: ["./assets/img_7.webp"],
    bestseller: true,
  },
  {
    _id: "8",
    name: "Relaxed fit polo sweatshirt",
    price: 900,
    image: ["./assets/img_8.webp", "./assets/img_8_2.webp"],
    bestseller: false,
  },
  {
    _id: "9",
    name: "Flannel baseball jacket",
    price: 1000,
    image: ["./assets/img_9.webp"],
    bestseller: false,
  },
  {
    _id: "10",
    name: "Lacoste basic pullover",
    price: 750,
    image: ["./assets/img_10.webp"],
    bestseller: false,
  },
];
const bestSellers = products.filter((product) => product.bestseller);
const newArrivals = products; // تعرض كل المنتجات، بما فيها bestseller: false

const bestSellersGrid = document.querySelector(".best-sellers__grid");
const newArrivalsGrid = document.querySelector(".new-arrivals__grid");

function createProductCard(product) {
  const visibleImages = product.image.slice(0, 4);
  const remainingImages = product.image.length - visibleImages.length;

  return `
    <article class="product-card">
      <div class="product-card__image-wrap">
        <img
          class="product-card__image"
          src="${product.image[0]}"
          alt="${product.name}"
          loading="lazy"
        />
      </div>

      <h3 class="product-card__name">${product.name}</h3>

      <p class="product-card__price">
        <span class="product-card__current-price">LE ${product.price}</span>
      </p>

      <div class="product-card__colors" aria-label="Product images">
        ${visibleImages
          .map(
            (image, index) => `
              <button
                class="product-card__color ${index === 0 ? "is-selected" : ""}"
                type="button"
                data-product-id="${product._id}"
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
          remainingImages > 0
            ? `
              <button
                class="product-card__more-colors"
                type="button"
                data-show-all="${product._id}"
                aria-label="Show ${remainingImages} more images"
              >
                +${remainingImages}
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
}

function renderProducts(grid, productList) {
  if (!grid) return;

  grid.innerHTML = productList.map(createProductCard).join("");
}

renderProducts(bestSellersGrid, bestSellers);
renderProducts(newArrivalsGrid, newArrivals);

// only in best sellers section, scroll left and right
const previousProductsButton = document.querySelector(
  ".best-sellers__arrow--left",
);
const nextProductsButton = document.querySelector(
  ".best-sellers__arrow--right",
);

if (bestSellersGrid && previousProductsButton && nextProductsButton) {
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

  previousProductsButton.addEventListener("click", () => scrollProducts(-1));
  nextProductsButton.addEventListener("click", () => scrollProducts(1));
}

// sellecting product images and showing all images
[bestSellersGrid, newArrivalsGrid].forEach((grid) => {
  if (!grid) return;

  grid.addEventListener("click", (event) => {
    const moreButton = event.target.closest("[data-show-all]");
    const imageButton = event.target.closest(".product-card__color");
    const card = event.target.closest(".product-card");

    if (!card) return;

    const productId = moreButton
      ? moreButton.dataset.showAll
      : imageButton?.dataset.productId;

    const product = products.find((item) => item._id === productId);
    if (!product) return;

    // Show all
    if (moreButton) {
      const colorOptions = card.querySelector(".product-card__colors");

      colorOptions.innerHTML = product.image
        .map(
          (image, index) => `
            <button
              class="product-card__color ${index === 0 ? "is-selected" : ""}"
              type="button"
              data-product-id="${product._id}"
              data-image-index="${index}"
              aria-label="Show image ${index + 1}"
              aria-pressed="${index === 0}"
            >
              <img src="${image}" alt="" loading="lazy" />
            </button>
          `,
        )
        .join("");

      return;
    }

    // الضغط على صورة مصغرة يغيّر الصورة الرئيسية
    if (!imageButton) return;

    const imageIndex = Number(imageButton.dataset.imageIndex);
    card.querySelector(".product-card__image").src = product.image[imageIndex];

    card.querySelectorAll(".product-card__color").forEach((button) => {
      const selected = button === imageButton;
      button.classList.toggle("is-selected", selected);
      button.setAttribute("aria-pressed", String(selected));
    });
  });
});
