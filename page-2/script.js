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
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];

  const navbar = $("#navbar");
  const drawer = $("#drawer");

  const CATEGORY_FALLBACK_IMAGES = {
    smartphones: [
      "images/Apple_IPhone_16.webp",
      "images/Samsung Galaxy S26.webp",
    ],
    laptops: ["images/Apple_MacBook_Air.webp", "images/laptop.webp"],
    gaming: ["images/play station.jpg", "images/accessories.webp"],
    tablets: ["images/tablet.jpg", "images/Apple_MacBook_Air.webp"],
    headphones: [
      "images/Apple_AirPods_Pro_2_Wireless.webp",
      "images/headphone.webp",
    ],
    smartwatches: ["images/Shop_Apple_Watch.webp", "images/accessories.webp"],
    cameras: ["images/cameras.jpg", "images/accessories.webp"],
    accessories: ["images/accessories.webp", "images/headphone.webp"],
  };

  const DEFAULT_COLORS = [
    { name: "Midnight Black", hex: "#18181b" },
    { name: "Silver Frost", hex: "#e4e4e7" },
    { name: "Royal Blue", hex: "#2563eb" },
  ];

  const ALL_PRODUCTS = [
    // --- Smartphones ---
    {
      id: "p1",
      name: "iPhone 16 Pro",
      category: "smartphones",
      brand: "Apple",
      price: 69990,
      img: "images/products/iPhone 16 blue.png",
      images: [
        "images/products/iPhone 16 Pink.png",
        "images/products/iPhone 16 Black.png",
        "images/products/iphone white.png",
      ],
      colors: [
        {
          name: "Desert Titanium",
          hex: "#c2a88d",
          img: "images/Apple_IPhone_16.webp",
        },
        {
          name: "Black Titanium",
          hex: "#27272a",
          img: "images/Apple_IPhone_16.webp",
        },
        {
          name: "White Titanium",
          hex: "#f4f4f5",
          img: "images/Apple_IPhone_16.webp",
        },
        {
          name: "Blue Titanium",
          hex: "#3b82f6",
          img: "images/Samsung Galaxy S26.webp",
        },
      ],
      description:
        "Crafted with a grade 5 titanium design, Camera Control, 4K 120fps Dolby Vision, and the A18 Pro chip for next-level performance.",
      specs: {
        Display: "6.3-inch Super Retina XDR ProMotion",
        Processor: "Apple A18 Pro Chip",
        Camera: "48MP Fusion + 48MP Ultra Wide",
        Battery: "Up to 27 hrs video playback",
      },
    },
    {
      id: "p5",
      name: "Samsung Galaxy S26 Ultra",
      category: "smartphones",
      brand: "Samsung",
      price: 64990,
      img: "images/Samsung Galaxy S26.webp",
      images: ["images/Samsung Galaxy S26.webp", "images/Apple_IPhone_16.webp"],
      colors: [
        {
          name: "Titanium Gray",
          hex: "#71717a",
          img: "images/Samsung Galaxy S26.webp",
        },
        {
          name: "Titanium Black",
          hex: "#18181b",
          img: "images/Samsung Galaxy S26.webp",
        },
        {
          name: "Cobalt Blue",
          hex: "#1d4ed8",
          img: "images/Samsung Galaxy S26.webp",
        },
      ],
      description:
        "Built-in S Pen, anti-reflective Dynamic AMOLED display, Galaxy AI tools, and an ultra-sharp quad camera system.",
      specs: {
        Display: "6.8-inch Dynamic AMOLED 2X 120Hz",
        Processor: "Snapdragon 8 Elite for Galaxy",
        Camera: "200MP Main + 50MP Periscope Zoom",
        Battery: "5000mAh with 45W Fast Charging",
      },
    },
    {
      id: "p15",
      name: "Xiaomi 15 Ultra",
      category: "smartphones",
      brand: "Xiaomi",
      price: 48990,
      img: "images/Samsung Galaxy S26.webp",
      images: ["images/Samsung Galaxy S26.webp", "images/Apple_IPhone_16.webp"],
      colors: [
        { name: "Obsidian Black", hex: "#111827" },
        { name: "Alpine White", hex: "#f8fafc" },
        { name: "Olive Green", hex: "#3f6212" },
      ],
      description:
        "Co-engineered Leica optics, flagship performance, and hyper-fast charging for everyday creators.",
      specs: {
        Display: "6.73-inch LTPO AMOLED 120Hz",
        Processor: "Snapdragon 8 Elite",
        Camera: "50MP Leica 1-inch Sensor",
        Battery: "5400mAh + 90W HyperCharge",
      },
    },
    {
      id: "p16",
      name: "Google Pixel 10 Pro",
      category: "smartphones",
      brand: "Google",
      price: 57990,
      img: "images/Apple_IPhone_16.webp",
      images: ["images/Apple_IPhone_16.webp", "images/Samsung Galaxy S26.webp"],
      colors: [
        { name: "Porcelain", hex: "#f3f4f6" },
        { name: "Obsidian", hex: "#111827" },
        { name: "Hazel", hex: "#6b7280" },
      ],
      description:
        "Pure Android experience powered by Google Tensor AI, Super Actua display, and computational photography.",
      specs: {
        Display: "6.3-inch Super Actua OLED",
        Processor: "Google Tensor G5",
        Camera: "Triple Pro Camera with 5x Zoom",
        Battery: "All-day adaptive battery",
      },
    },

    // --- Laptops ---
    {
      id: "p2",
      name: "MacBook Air M4",
      category: "laptops",
      brand: "Apple",
      price: 89990,
      img: "images/Apple_MacBook_Air.webp",
      images: ["images/Apple_MacBook_Air.webp", "images/laptop.webp"],
      colors: [
        { name: "Midnight", hex: "#1e293b" },
        { name: "Starlight", hex: "#e5dec9" },
        { name: "Space Gray", hex: "#64748b" },
        { name: "Silver", hex: "#e2e8f0" },
      ],
      description:
        "Silently powerful, ultra-thin portable laptop with M4 silicon, Liquid Retina display, and up to 18 hours of battery life.",
      specs: {
        Display: "13.6-inch Liquid Retina",
        Processor: "Apple M4 Chip",
        Memory: "16GB Unified Memory / 512GB SSD",
        Battery: "Up to 18 hours",
      },
    },
    {
      id: "p6",
      name: "XPS 14 Creator Edition",
      category: "laptops",
      brand: "Dell",
      price: 54990,
      img: "images/laptop.webp",
      images: ["images/laptop.webp", "images/Apple_MacBook_Air.webp"],
      colors: [
        { name: "Platinum", hex: "#cbd5e1" },
        { name: "Graphite", hex: "#334155" },
      ],
      description:
        "Precision-machined aluminum and glass design built for creative workflows, photo/video editing, and multitasking.",
      specs: {
        Display: "14.5-inch InfinityEdge OLED",
        Processor: "Intel Core Ultra 7",
        Memory: "16GB RAM / 1TB NVMe SSD",
        Port: "Thunderbolt 4 + MicroSD",
      },
    },
    {
      id: "p13",
      name: "Spectre x360 14",
      category: "laptops",
      brand: "HP",
      price: 61990,
      img: "images/laptop.webp",
      images: ["images/laptop.webp", "images/Apple_MacBook_Air.webp"],
      colors: [
        { name: "Nightfall Black", hex: "#0f172a" },
        { name: "Nocturne Blue", hex: "#1e3a8a" },
      ],
      description:
        "Convertible 2-in-1 touchscreen laptop with stylus support and crisp OLED visuals.",
      specs: {
        Display: "14-inch 2.8K OLED Touch",
        Processor: "Intel Core Ultra 7",
        Memory: "16GB RAM / 512GB SSD",
        Form: "360-degree Convertible",
      },
    },
    {
      id: "p17",
      name: "Legion Pro 7i",
      category: "laptops",
      brand: "Lenovo",
      price: 78990,
      img: "images/laptop.webp",
      images: ["images/laptop.webp", "images/play station.jpg"],
      colors: [
        { name: "Eclipse Black", hex: "#111827" },
        { name: "Glacier White", hex: "#f1f5f9" },
      ],
      description:
        "High-refresh gaming and performance powerhouse with advanced thermal cooling.",
      specs: {
        Display: "16-inch WQXGA 240Hz",
        Processor: "Intel Core i9",
        Graphics: "NVIDIA GeForce RTX",
        Cooling: "ColdFront Vapor Chamber",
      },
    },
    {
      id: "p18",
      name: "ROG Zephyrus G16",
      category: "laptops",
      brand: "ASUS",
      price: 84990,
      img: "images/laptop.webp",
      images: ["images/laptop.webp", "images/Apple_MacBook_Air.webp"],
      colors: [
        { name: "Eclipse Gray", hex: "#374151" },
        { name: "Platinum White", hex: "#f8fafc" },
      ],
      description:
        "Slim gaming and creator laptop blending high frame rates with a sleek CNC aluminum chassis.",
      specs: {
        Display: "16-inch ROG Nebula OLED 240Hz",
        Processor: "AMD Ryzen AI / Intel Core Ultra",
        Weight: "1.85 kg ultra-slim",
        Audio: "6-Speaker Dolby Atmos",
      },
    },

    // --- Gaming ---
    {
      id: "p10",
      name: "PlayStation 5 Pro",
      category: "gaming",
      brand: "PlayStation",
      price: 39990,
      img: "images/play station.jpg",
      images: ["images/play station.jpg", "images/accessories.webp"],
      colors: [
        { name: "Classic White", hex: "#f8fafc" },
        { name: "Midnight Black", hex: "#18181b" },
      ],
      description:
        "Next-gen console experience with upgraded GPU ray tracing, PSSR upscaling, and ultra-fast SSD.",
      specs: {
        Resolution: "Up to 4K 120fps / 8K support",
        Storage: "2TB Custom SSD",
        Features: "Ray Tracing + DualSense Haptics",
        Connectivity: "Wi-Fi 7 + HDMI 2.1",
      },
    },
    {
      id: "p19",
      name: "Xbox Series X 2TB Galaxy",
      category: "gaming",
      brand: "Xbox",
      price: 36990,
      img: "images/play station.jpg",
      images: ["images/play station.jpg"],
      colors: [
        { name: "Galaxy Black", hex: "#09090b" },
        { name: "Robot White", hex: "#f4f4f5" },
      ],
      description:
        "High-capacity Xbox Series X with Quick Resume, 120fps support, and spacious 2TB storage.",
      specs: {
        Storage: "2TB NVMe SSD",
        FrameRate: "Up to 120 FPS",
        Audio: "Spatial Sound & Dolby Atmos",
        Compatibility: "Smart Delivery & Game Pass",
      },
    },
    {
      id: "p20",
      name: "Nintendo Switch OLED",
      category: "gaming",
      brand: "Nintendo",
      price: 18990,
      img: "images/play station.jpg",
      images: ["images/play station.jpg"],
      colors: [
        { name: "White Joy-Con", hex: "#f8fafc" },
        { name: "Neon Red / Blue", hex: "#ef4444" },
      ],
      description:
        "Vibrant 7-inch OLED screen, wide adjustable stand, and dock with wired LAN port.",
      specs: {
        Display: "7-inch OLED Touchscreen",
        Storage: "64GB Internal (expandable)",
        Modes: "TV, Tabletop & Handheld",
        Battery: "4.5 to 9 hours",
      },
    },
    {
      id: "p21",
      name: "DualSense Edge Controller",
      category: "gaming",
      brand: "PlayStation",
      price: 8990,
      img: "images/play station.jpg",
      images: ["images/play station.jpg"],
      colors: [
        { name: "White & Black", hex: "#e5e7eb" },
        { name: "Midnight Black", hex: "#18181b" },
      ],
      description:
        "Customizable wireless pro controller with swappable stick caps, back buttons, and adjustable triggers.",
      specs: {
        Controls: "Remappable buttons & trigger stops",
        Sticks: "Replaceable stick modules",
        Case: "Carrying case + USB braided cable",
        Compatibility: "PS5 & PC",
      },
    },

    // --- Tablets ---
    {
      id: "p7",
      name: "iPad Pro M4",
      category: "tablets",
      brand: "Apple",
      price: 52990,
      img: "images/tablet.jpg",
      images: ["images/tablet.jpg", "images/Apple_MacBook_Air.webp"],
      colors: [
        { name: "Space Black", hex: "#18181b" },
        { name: "Silver", hex: "#e4e4e7" },
      ],
      description:
        "Impossibly thin tablet with Tandem OLED display, M4 speed, and Apple Pencil Pro support.",
      specs: {
        Display: "Ultra Retina XDR OLED",
        Processor: "Apple M4 Chip",
        Thickness: "5.1mm ultra-thin design",
        Accessories: "Apple Pencil Pro & Magic Keyboard",
      },
    },
    {
      id: "p8",
      name: "Galaxy Tab S10 Ultra",
      category: "tablets",
      brand: "Samsung",
      price: 44990,
      img: "images/tablet.jpg",
      images: ["images/tablet.jpg"],
      colors: [
        { name: "Moonstone Gray", hex: "#52525b" },
        { name: "Platinum Silver", hex: "#d4d4d8" },
      ],
      description:
        "Expansive tablet canvas with S Pen included, anti-reflection coating, and Galaxy AI note assist.",
      specs: {
        Display: "14.6-inch Dynamic AMOLED 2X",
        Stylus: "S Pen included in box",
        Durability: "IP68 water & dust resistance",
        Audio: "Quad speakers with Dolby Atmos",
      },
    },
    {
      id: "p22",
      name: "Lenovo Tab P12 Pro",
      category: "tablets",
      brand: "Lenovo",
      price: 27990,
      img: "images/tablet.jpg",
      images: ["images/tablet.jpg"],
      colors: [{ name: "Storm Grey", hex: "#4b5563" }],
      description:
        "Entertainment and productivity tablet with vivid AMOLED display and quad JBL speakers.",
      specs: {
        Display: "12.6-inch AMOLED 120Hz",
        Audio: "JBL Quad Speakers",
        Battery: "10200mAh fast charging",
        Productivity: "Split-screen & stylus support",
      },
    },

    // --- Headphones ---
    {
      id: "p3",
      name: "AirPods Pro 2",
      category: "headphones",
      brand: "Apple",
      price: 19990,
      img: "images/Apple_AirPods_Pro_2_Wireless.webp",
      images: [
        "images/Apple_AirPods_Pro_2_Wireless.webp",
        "images/headphone.webp",
      ],
      colors: [{ name: "Pure White", hex: "#f9fafb" }],
      description:
        "Up to 2x more Active Noise Cancellation, Adaptive Audio, Personalized Spatial Audio, and USB-C MagSafe Case.",
      specs: {
        Chip: "Apple H2 Headphone Chip",
        ANC: "Active Noise Cancellation + Transparency",
        Case: "MagSafe Charging Case (USB-C) with speaker",
        WaterResistance: "IP54 dust, sweat & water resistant",
      },
    },
    {
      id: "p9",
      name: "WH-1000XM6 Wireless ANC",
      category: "headphones",
      brand: "Sony",
      price: 14990,
      img: "images/headphone.webp",
      images: [
        "images/headphone.webp",
        "images/Apple_AirPods_Pro_2_Wireless.webp",
      ],
      colors: [
        { name: "Midnight Black", hex: "#111827" },
        { name: "Silver", hex: "#d1d5db" },
        { name: "Midnight Blue", hex: "#1e3a8a" },
      ],
      description:
        "Industry-leading noise cancellation, crystal-clear calls, and plush ear cushions for long flights.",
      specs: {
        NoiseCancelling: "Multi-mic HD Noise Cancelling",
        Battery: "Up to 30 hours with ANC",
        Connectivity: "Multipoint Bluetooth + LDAC",
        Comfort: "Lightweight swivel design",
      },
    },
    {
      id: "p23",
      name: "Galaxy Buds3 Pro",
      category: "headphones",
      brand: "Samsung",
      price: 9990,
      img: "images/Apple_AirPods_Pro_2_Wireless.webp",
      images: [
        "images/Apple_AirPods_Pro_2_Wireless.webp",
        "images/headphone.webp",
      ],
      colors: [
        { name: "Silver", hex: "#d4d4d8" },
        { name: "White", hex: "#ffffff" },
      ],
      description:
        "Blade lights design, 2-way speakers, and adaptive noise control tailored to your surroundings.",
      specs: {
        Audio: "2-way speaker + dual amplifier",
        Features: "Adaptive ANC & Voice Detect",
        Rating: "IP57 water & sweat resistant",
        Battery: "Up to 26 hrs with case",
      },
    },

    // --- Smartwatches ---
    {
      id: "p4",
      name: "Apple Watch Series 10",
      category: "smartwatches",
      brand: "Apple",
      price: 29990,
      img: "images/Shop_Apple_Watch.webp",
      images: ["images/Shop_Apple_Watch.webp", "images/accessories.webp"],
      colors: [
        { name: "Jet Black", hex: "#09090b" },
        { name: "Rose Gold", hex: "#e5a99c" },
        { name: "Silver Aluminum", hex: "#e2e8f0" },
      ],
      description:
        "Biggest, most advanced Apple Watch display yet in our thinnest design, with faster charging and health insights.",
      specs: {
        Display: "Wide-angle Always-On OLED",
        Health: "ECG, Heart Rate, Sleep & Vitals",
        WaterResistance: "50m water resistant",
        Charging: "Up to 80% in ~30 minutes",
      },
    },
    {
      id: "p14",
      name: "Galaxy Watch Ultra",
      category: "smartwatches",
      brand: "Samsung",
      price: 24990,
      img: "images/Shop_Apple_Watch.webp",
      images: ["images/Shop_Apple_Watch.webp"],
      colors: [
        { name: "Titanium Gray", hex: "#6b7280" },
        { name: "Titanium White", hex: "#f3f4f6" },
        { name: "Titanium Silver", hex: "#cbd5e1" },
      ],
      description:
        "Rugged titanium build engineered for extreme outdoor workouts, multi-day battery life, and GPS accuracy.",
      specs: {
        Case: "Grade 4 Titanium cushion design",
        Durability: "10ATM + MIL-STD-810H",
        GPS: "Dual-frequency GPS (L1 + L5)",
        Battery: "Multi-day endurance mode",
      },
    },

    // --- Cameras ---
    {
      id: "p11",
      name: "Alpha A7 IV Mirrorless",
      category: "cameras",
      brand: "Sony",
      price: 74990,
      img: "images/cameras.jpg",
      images: ["images/cameras.jpg", "images/accessories.webp"],
      colors: [{ name: "Matte Black", hex: "#18181b" }],
      description:
        "33MP full-frame hybrid mirrorless camera with Real-time Eye AF and 4K 60p video for photo and video pros.",
      specs: {
        Sensor: "33MP Full-Frame Exmor R CMOS",
        Video: "4K 60p 10-bit 4:2:2",
        Autofocus: "759 phase-detection points",
        Stabilization: "5-axis in-body IS",
      },
    },
    {
      id: "p24",
      name: "EOS R8 Full-Frame",
      category: "cameras",
      brand: "Canon",
      price: 68990,
      img: "images/cameras.jpg",
      images: ["images/cameras.jpg"],
      colors: [{ name: "Canon Black", hex: "#111827" }],
      description:
        "Lightweight full-frame mirrorless camera featuring Dual Pixel CMOS AF II and oversampled 4K video.",
      specs: {
        Sensor: "24.2MP Full-Frame CMOS",
        Video: "4K up to 60p + Full HD 180p",
        Weight: "Approx. 461g body only",
        Connectivity: "Wi-Fi & Bluetooth",
      },
    },

    // --- Accessories ---
    {
      id: "p12",
      name: "MagSafe Charging Kit",
      category: "accessories",
      brand: "Apple",
      price: 4990,
      img: "images/accessories.webp",
      images: ["images/accessories.webp", "images/Apple_IPhone_16.webp"],
      colors: [
        { name: "White", hex: "#f8fafc" },
        { name: "Black", hex: "#18181b" },
      ],
      description:
        "Snap-on magnetic wireless charging bundle for fast, aligned power delivery on compatible phones and earbuds.",
      specs: {
        Output: "Up to 25W fast wireless charging",
        Alignment: "Precision magnetic ring",
        Included: "MagSafe puck + power adapter",
        Safety: "Over-temperature protection",
      },
    },
    {
      id: "p25",
      name: "65W GaN Super Charger",
      category: "accessories",
      brand: "Samsung",
      price: 2490,
      img: "images/accessories.webp",
      images: ["images/accessories.webp"],
      colors: [
        { name: "Black", hex: "#111827" },
        { name: "White", hex: "#f9fafb" },
      ],
      description:
        "Compact Gallium Nitride multi-port fast charger capable of powering phones, tablets, and laptops.",
      specs: {
        Power: "65W USB-C PD / PPS",
        Tech: "Compact GaN efficiency",
        Ports: "Multi-device smart allocation",
        Portability: "Pocket-friendly travel size",
      },
    },
  ];

  const getProductImages = (product) => {
    if (Array.isArray(product.images) && product.images.length > 0) {
      return product.images;
    }
    const fallback = CATEGORY_FALLBACK_IMAGES[product.category] || [
      product.img,
    ];
    return product.img
      ? [product.img, ...fallback.filter((x) => x !== product.img)]
      : fallback;
  };

  const getProductColors = (product) => {
    if (Array.isArray(product.colors) && product.colors.length > 0) {
      return product.colors;
    }
    return DEFAULT_COLORS;
  };

  // ==========================================
  // 3. Navbar Scroll Behavior
  // ==========================================
  const onScroll = () => {
    if (navbar) navbar.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  // ==========================================
  // Auto Card Image Slider (Inside Product Cards)
  // ==========================================
  const cardIntervals = new WeakMap();

  const initAutoCardSliders = (root = document) => {
    const mediaContainers = $$("[data-card-slider]", root);

    mediaContainers.forEach((container) => {
      if (cardIntervals.has(container)) {
        clearInterval(cardIntervals.get(container));
        cardIntervals.delete(container);
      }

      const imgs = $$(".popular-card__slide-img", container);
      const dots = $$(".popular-card__dot", container);
      if (imgs.length <= 1) return;

      let activeIdx = imgs.findIndex((img) =>
        img.classList.contains("is-active"),
      );
      if (activeIdx < 0) activeIdx = 0;

      const showSlide = (idx) => {
        activeIdx = (idx + imgs.length) % imgs.length;
        imgs.forEach((img, i) =>
          img.classList.toggle("is-active", i === activeIdx),
        );
        dots.forEach((dot, i) =>
          dot.classList.toggle("is-active", i === activeIdx),
        );
      };

      const startTimer = () => {
        if (cardIntervals.has(container))
          clearInterval(cardIntervals.get(container));
        const timer = setInterval(() => {
          showSlide(activeIdx + 1);
        }, 2600);
        cardIntervals.set(container, timer);
      };

      const stopTimer = () => {
        if (cardIntervals.has(container)) {
          clearInterval(cardIntervals.get(container));
          cardIntervals.delete(container);
        }
      };

      const parentCard = container.closest(".popular-card") || container;
      parentCard.addEventListener("mouseenter", stopTimer);
      parentCard.addEventListener("mouseleave", startTimer);

      startTimer();
    });
  };

  const buildProductCardHTML = (product) => {
    const imgs = getProductImages(product);
    const colors = getProductColors(product);
    const defaultColor = colors[0]?.name || "";
    const productUrl = `product.html?id=${encodeURIComponent(product.id)}`;

    return `
      <article
        class="popular-card"
        data-id="${product.id}"
        data-name="${product.name}"
        data-price="${product.price}"
        data-img="${product.img}"
        data-color="${defaultColor}"
      >
        <div class="popular-card__top">
          <a href="${productUrl}" class="popular-card__title-link">
            <h3 class="popular-card__name">${product.name}</h3>
          </a>
          <div class="popular-card__actions-group">
            <button class="popular-card__button wishlist-trigger" type="button" aria-label="Wishlist">
              <i class="fa-regular fa-heart"></i>
            </button>
            <button class="popular-card__button cart-trigger" type="button" aria-label="Cart">
              <i class="fa-solid fa-plus"></i>
            </button>
          </div>
        </div>

        <div class="popular-card__meta-row">
          <span class="popular-card__badge">${product.category}</span>
          <span class="popular-card__brand">${product.brand}</span>
        </div>

        <a
          href="${productUrl}"
          class="popular-card__media"
          data-card-slider
          aria-label="View ${product.name}"
        >
          ${imgs
            .map(
              (src, idx) => `
            <img
              class="popular-card__slide-img ${idx === 0 ? "is-active" : ""}"
              src="${src}"
              alt="${product.name} view ${idx + 1}"
              loading="lazy"
            />`,
            )
            .join("")}
          ${
            imgs.length > 1
              ? `<div class="popular-card__dots" aria-hidden="true">
                  ${imgs
                    .map(
                      (_, idx) =>
                        `<span class="popular-card__dot ${idx === 0 ? "is-active" : ""}"></span>`,
                    )
                    .join("")}
                </div>`
              : ""
          }
        </a>

        <p class="popular-card__price">From <strong>LE ${product.price.toLocaleString()}</strong></p>
      </article>`;
  };

  document.addEventListener("DOMContentLoaded", () => {
    // تفعيل التقليب التلقائي للبطاقات الثابتة في الصفحة الرئيسية (index.html)
    $$(".popular-products .popular-card").forEach((card) => {
      const id = card.dataset.id;
      const product = ALL_PRODUCTS.find((p) => p.id === id);
      const imgs = product ? getProductImages(product) : [card.dataset.img];
      const existingImg = card.querySelector(".popular-card__image");
      const nameEl = card.querySelector(".popular-card__name");
      const productUrl = `product.html?id=${encodeURIComponent(id || "p1")}`;

      if (nameEl && !nameEl.closest("a")) {
        const link = document.createElement("a");
        link.href = productUrl;
        link.className = "popular-card__title-link";
        nameEl.parentNode.insertBefore(link, nameEl);
        link.appendChild(nameEl);
      }

      if (existingImg && !card.querySelector("[data-card-slider]")) {
        const mediaLink = document.createElement("a");
        mediaLink.href = productUrl;
        mediaLink.className = "popular-card__media";
        mediaLink.setAttribute("data-card-slider", "");

        mediaLink.innerHTML = `
          ${imgs
            .map(
              (src, idx) => `
            <img
              class="popular-card__slide-img ${idx === 0 ? "is-active" : ""}"
              src="${src}"
              alt="${card.dataset.name || "Product"} view ${idx + 1}"
              loading="lazy"
            />`,
            )
            .join("")}
          ${
            imgs.length > 1
              ? `<div class="popular-card__dots" aria-hidden="true">
                  ${imgs
                    .map(
                      (_, idx) =>
                        `<span class="popular-card__dot ${idx === 0 ? "is-active" : ""}"></span>`,
                    )
                    .join("")}
                </div>`
              : ""
          }
        `;

        existingImg.replaceWith(mediaLink);
      }
    });

    initAutoCardSliders();

    // ==========================================
    // 4. Navigation Dropdowns & Mobile Drawer
    // ==========================================
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
    let cart = JSON.parse(localStorage.getItem("technova_cart")) || [];
    let wishlist = JSON.parse(localStorage.getItem("technova_wishlist")) || [];

    const saveState = () => {
      localStorage.setItem("technova_cart", JSON.stringify(cart));
      localStorage.setItem("technova_wishlist", JSON.stringify(wishlist));
    };

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
    const toastNotification = document.getElementById("toastNotification");
    const toastTitle = document.getElementById("toastTitle");
    const toastMessage = document.getElementById("toastMessage");

    const showToast = (title, message) => {
      if (toastNotification && toastTitle && toastMessage) {
        toastTitle.textContent = title;
        toastMessage.textContent = message;
        toastNotification.hidden = false;

        setTimeout(() => {
          toastNotification.hidden = true;
        }, 3000);
      }
    };

    const openOverlay = () => {
      if (!overlay) return;
      overlay.hidden = false;
      document.body.classList.add("no-scroll");
    };

    const closeOverlay = () => {
      if (overlay) overlay.hidden = true;
      if (cartPanel) cartPanel.classList.remove("open");
      if (wishlistPanel) wishlistPanel.classList.remove("open");
      document.body.classList.remove("no-scroll");
    };

    const updateUI = () => {
      saveState();

      const totalCartItems = cart.reduce((sum, item) => sum + item.qty, 0);
      if (cartBadgeEl) {
        cartBadgeEl.textContent = totalCartItems;
        cartBadgeEl.hidden = totalCartItems <= 0;
      }
      if (cartDrawerCount)
        cartDrawerCount.textContent = `${totalCartItems} items`;

      if (wishlistBadgeEl) {
        wishlistBadgeEl.textContent = wishlist.length;
        wishlistBadgeEl.hidden = wishlist.length <= 0;
      }
      if (wishlistDrawerCount)
        wishlistDrawerCount.textContent = `${wishlist.length} items`;

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
            <div class="side-item" data-id="${item.id}" data-color="${item.color || ""}">
              <img src="${item.img}" alt="${item.name}" class="side-item__img" />
              <div class="side-item__details">
                <h4 class="side-item__name">${item.name}${item.color ? ` (${item.color})` : ""}</h4>
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

    const addItemToCart = ({ id, name, price, img, color = "" }) => {
      const existing = cart.find(
        (item) => item.id === id && (item.color || "") === color,
      );
      if (existing) existing.qty++;
      else cart.push({ id, name, price, img, color, qty: 1 });

      updateUI();
      showToast(
        "Added to Cart",
        `${name}${color ? ` (${color})` : ""} has been added to your cart.`,
      );
      if (cartPanel) cartPanel.classList.add("open");
      openOverlay();
    };

    document.addEventListener("click", (e) => {
      const cartTrigger = e.target.closest(".cart-trigger");
      if (cartTrigger) {
        const card = cartTrigger.closest(".popular-card");
        if (!card) return;
        const { id, name, img, color } = card.dataset;
        const price = Number(card.dataset.price);
        addItemToCart({ id, name, price, img, color: color || "" });
      }

      const wishTrigger = e.target.closest(".wishlist-trigger");
      if (wishTrigger) {
        const card = wishTrigger.closest(".popular-card");
        if (!card) return;
        const { id, name, img } = card.dataset;
        const price = Number(card.dataset.price);
        const index = wishlist.findIndex((item) => item.id === id);

        if (index > -1) {
          wishlist.splice(index, 1);
          showToast(
            "Removed from Wishlist",
            `${name} was removed from your wishlist.`,
          );
        } else {
          wishlist.push({ id, name, price, img });
          showToast(
            "Added to Wishlist",
            `${name} has been added to your wishlist.`,
          );
        }
        updateUI();
      }
    });

    if (cartBtn) {
      cartBtn.addEventListener("click", () => {
        if (wishlistPanel) wishlistPanel.classList.remove("open");
        if (cartPanel) cartPanel.classList.add("open");
        openOverlay();
      });
    }

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

    if (closeCartBtn) closeCartBtn.addEventListener("click", closeOverlay);
    if (closeWishlistBtn)
      closeWishlistBtn.addEventListener("click", closeOverlay);
    if (overlay) overlay.addEventListener("click", closeOverlay);

    if (cartItemsContainer) {
      cartItemsContainer.addEventListener("click", (e) => {
        const itemEl = e.target.closest(".side-item");
        if (!itemEl) return;
        const id = itemEl.dataset.id;
        const color = itemEl.dataset.color || "";
        const matchItem = (i) => i.id === id && (i.color || "") === color;

        if (e.target.closest(".increase-qty")) {
          const item = cart.find(matchItem);
          if (item) item.qty++;
          updateUI();
        }
        if (e.target.closest(".decrease-qty")) {
          const item = cart.find(matchItem);
          if (item) {
            item.qty--;
            if (item.qty <= 0) cart = cart.filter((i) => !matchItem(i));
          }
          updateUI();
        }
        if (e.target.closest(".remove-cart-item")) {
          cart = cart.filter((i) => !matchItem(i));
          updateUI();
        }
      });
    }

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
            addItemToCart({ ...product });
            wishlist = wishlist.filter((i) => i.id !== id);
            updateUI();
          }
        }
      });
    }

    if (clearCartBtn) {
      clearCartBtn.addEventListener("click", () => {
        cart = [];
        updateUI();
      });
    }

    if (moveAllToCartBtn) {
      moveAllToCartBtn.addEventListener("click", () => {
        wishlist.forEach((wItem) => {
          const existing = cart.find(
            (i) => i.id === wItem.id && (i.color || "") === "",
          );
          if (existing) existing.qty++;
          else cart.push({ ...wItem, color: "", qty: 1 });
        });
        wishlist = [];
        updateUI();
      });
    }

    // ==========================================
    // 7. Checkout Modal & Order Submission
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

        const subtotal = cart.reduce(
          (sum, item) => sum + item.price * item.qty,
          0,
        );
        if (checkoutModalTotal) {
          checkoutModalTotal.textContent = `LE ${subtotal.toLocaleString()}`;
        }

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

    if (checkoutForm) {
      checkoutForm.addEventListener("submit", (e) => {
        e.preventDefault();
        closeCheckoutModal();
        cart = [];
        updateUI();
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
      const initialBrand = (urlParams.get("brand") || "all").toLowerCase();

      let filterState = {
        category: initialCat,
        brand: initialBrand,
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

      const getBrandInitials = (brandName) =>
        brandName
          .split(/\s+/)
          .map((part) => part[0])
          .join("")
          .slice(0, 2)
          .toUpperCase();

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
          catalogGrid.innerHTML = filtered.map(buildProductCardHTML).join("");
          initAutoCardSliders(catalogGrid);
        }
        updateUI();
      };

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

    // ==========================================
    // 12. Product Details Page & Related Products (product.html)
    // ==========================================
    const productDetailsContainer = $("#productDetailsContainer");
    const relatedProductsGrid = $("#relatedProductsGrid");

    if (productDetailsContainer) {
      const params = new URLSearchParams(window.location.search);
      const requestedId = params.get("id");
      const product =
        ALL_PRODUCTS.find((p) => p.id === requestedId) || ALL_PRODUCTS[0];

      document.title = `${product.name} - TechNova`;

      const catLink = $("#pdCategoryLink");
      const bcName = $("#pdBreadcrumbName");
      if (catLink) {
        catLink.textContent = product.category;
        catLink.href = `products.html?category=${encodeURIComponent(product.category)}`;
      }
      if (bcName) bcName.textContent = product.name;

      const imgs = getProductImages(product);
      const colors = getProductColors(product);
      let selectedColor = colors[0];
      let activeImage = selectedColor?.img || imgs[0];

      const specsEntries = Object.entries(
        product.specs || {
          Category: product.category,
          Brand: product.brand,
          Warranty: "1 Year Official Warranty",
          Delivery: "Fast Express Delivery",
        },
      );

      productDetailsContainer.innerHTML = `
        <div class="product-gallery">
          <div class="product-gallery__main">
            <img id="pdMainImage" src="${activeImage}" alt="${product.name}" />
          </div>
          <div class="product-gallery__thumbs" id="pdThumbs">
            ${imgs
              .map(
                (src, idx) => `
              <button
                type="button"
                class="product-thumb ${src === activeImage || (idx === 0 && !selectedColor?.img) ? "is-active" : ""}"
                data-src="${src}"
                aria-label="Preview image ${idx + 1}"
              >
                <img src="${src}" alt="${product.name} thumbnail ${idx + 1}" />
              </button>`,
              )
              .join("")}
          </div>
        </div>

        <div class="product-info">
          <div class="product-info__badges">
            <span class="popular-card__badge">${product.category}</span>
            <span class="popular-card__brand">${product.brand}</span>
          </div>

          <h1 class="product-info__title">${product.name}</h1>

          <div class="product-info__price-row">
            <strong class="product-info__price">LE ${product.price.toLocaleString()}</strong>
            <span class="product-info__stock"><i class="fa-solid fa-check-circle"></i> In Stock</span>
          </div>

          <p class="product-info__desc">${product.description || ""}</p>

          <div class="color-picker">
            <div class="color-picker__label">
              <span>Select Color:</span>
              <span class="color-picker__selected-name" id="pdSelectedColorName">${selectedColor.name}</span>
            </div>
            <div class="color-swatches" id="pdColorSwatches">
              ${colors
                .map(
                  (c, idx) => `
                <button
                  type="button"
                  class="color-swatch ${idx === 0 ? "is-active" : ""}"
                  data-color-name="${c.name}"
                  data-color-img="${c.img || ""}"
                >
                  <span class="color-swatch__dot" style="background:${c.hex}"></span>
                  <span>${c.name}</span>
                </button>`,
                )
                .join("")}
            </div>
          </div>

          <div class="product-specs">
            ${specsEntries
              .map(
                ([k, v]) => `
              <div class="product-spec-item">
                <span>${k}</span>
                <strong>${v}</strong>
              </div>`,
              )
              .join("")}
          </div>

          <div class="product-info__actions">
            <button type="button" class="product-add-btn" id="pdAddToCartBtn">
              <i class="fa-solid fa-bag-shopping"></i>
              Add to Cart
            </button>
            <button type="button" class="product-wish-btn" id="pdWishBtn" aria-label="Add to Wishlist">
              <i class="fa-regular fa-heart"></i>
            </button>
          </div>
        </div>
      `;

      const mainImgEl = $("#pdMainImage");
      const thumbBtns = $$("#pdThumbs .product-thumb");
      const swatchBtns = $$("#pdColorSwatches .color-swatch");
      const colorNameLabel = $("#pdSelectedColorName");

      const setActiveThumb = (src) => {
        activeImage = src;
        if (mainImgEl) mainImgEl.src = src;
        thumbBtns.forEach((b) =>
          b.classList.toggle("is-active", b.dataset.src === src),
        );
      };

      thumbBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          setActiveThumb(btn.dataset.src);
        });
      });

      swatchBtns.forEach((btn) => {
        btn.addEventListener("click", () => {
          swatchBtns.forEach((b) => b.classList.remove("is-active"));
          btn.classList.add("is-active");

          const cName = btn.dataset.colorName;
          const cImg = btn.dataset.colorImg;
          selectedColor = { name: cName, img: cImg };
          if (colorNameLabel) colorNameLabel.textContent = cName;

          if (cImg) {
            setActiveThumb(cImg);
          }
        });
      });

      const pdAddBtn = $("#pdAddToCartBtn");
      if (pdAddBtn) {
        pdAddBtn.addEventListener("click", () => {
          addItemToCart({
            id: product.id,
            name: product.name,
            price: product.price,
            img: activeImage,
            color: selectedColor?.name || "",
          });
        });
      }

      const pdWishBtn = $("#pdWishBtn");
      if (pdWishBtn) {
        const syncWishIcon = () => {
          const exists = wishlist.some((w) => w.id === product.id);
          const icon = pdWishBtn.querySelector("i");
          if (icon) {
            icon.className = exists
              ? "fa-solid fa-heart"
              : "fa-regular fa-heart";
            icon.style.color = exists ? "var(--primary)" : "";
          }
        };
        syncWishIcon();

        pdWishBtn.addEventListener("click", () => {
          const idx = wishlist.findIndex((w) => w.id === product.id);
          if (idx > -1) {
            wishlist.splice(idx, 1);
            showToast(
              "Removed from Wishlist",
              `${product.name} was removed from your wishlist.`,
            );
          } else {
            wishlist.push({
              id: product.id,
              name: product.name,
              price: product.price,
              img: activeImage,
            });
            showToast(
              "Added to Wishlist",
              `${product.name} has been added to your wishlist.`,
            );
          }
          updateUI();
          syncWishIcon();
        });
      }

      // تعبئة Related Products
      if (relatedProductsGrid) {
        const sameCategory = ALL_PRODUCTS.filter(
          (p) => p.id !== product.id && p.category === product.category,
        );
        const sameBrandOtherCat = ALL_PRODUCTS.filter(
          (p) =>
            p.id !== product.id &&
            p.category !== product.category &&
            p.brand === product.brand,
        );
        const others = ALL_PRODUCTS.filter(
          (p) =>
            p.id !== product.id &&
            p.category !== product.category &&
            p.brand !== product.brand,
        );

        const related = [
          ...sameCategory,
          ...sameBrandOtherCat,
          ...others,
        ].slice(0, 4);

        relatedProductsGrid.innerHTML = related
          .map(buildProductCardHTML)
          .join("");
        initAutoCardSliders(relatedProductsGrid);
        updateUI();
      }
    }
  });

  // ==========================================
  // 9. Preloader & Sale Popup Modal
  // ==========================================
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

    setTimeout(() => {
      openSalePopup();
    }, 650);
  };

  if (document.readyState === "complete") {
    finishInitialLoad();
  } else {
    window.addEventListener("load", finishInitialLoad, { once: true });
    setTimeout(finishInitialLoad, 2500);
  }

  // ==========================================
  // 10. Mobile Drawer Toggle
  // ==========================================
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
