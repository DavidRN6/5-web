/* ======================
  table of contents
=========================
  1. Helpers & state
  2. Static links (no navigation)
  3. Cart badge
  4. Drawer (hamburger)
  5. Automotive & Spare Parts Deals Data
  6. Hero Deals Slider (theme & content switching)
*/

(() => {
  //=======================
  // 1. Helpers & state
  //=======================
  const $ = (selector, root = document) => root.querySelector(selector);
  const $$ = (selector, root = document) => [
    ...root.querySelectorAll(selector),
  ];

  const drawer = $("#drawer");
  const cartBadge = $("#cartBadge");

  //=======================
  // 2. Static links (no navigation)
  //=======================
  document.addEventListener("click", (e) => {
    const link = e.target.closest('a[href="#"]');
    if (link) e.preventDefault();
  });

  //=======================
  // 3. Cart badge
  //=======================
  let cartCount = 2;

  const renderCart = () => {
    cartBadge.textContent = cartCount;
    cartBadge.hidden = cartCount <= 0;
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
  // 4. Drawer (hamburger)
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
    if (e.key === "Escape") closeMenu();
  });

  //=======================
  // 5. Deals Data (سيارات وقطع غيار)
  //=======================
  // theme: carbon | racing-red | pearl | midnight-blue
  // استبدل مسارات الصور بصور PNG شفافة للسيارات وقطع الغيار
  const deals = [
    {
      id: "gtr-nismo",
      category: "سيارات رياضية",
      cardName: "نيسان GT-R نيسمو",
      discountTag: "-12%",
      badge: "عرض خاص لفترة محدودة",
      watermark: "GT-R NISMO",
      title: "نيسان GT-R<br />نيسمو 2026",
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
      image: "images/auto/brembo-brake.png",
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
      image: "images/auto/bbs-wheel.png",
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
      image: "images/auto/turbo-kit.png",
    },
  ];

  const DEFAULT_THEME = "carbon";

  //=======================
  // 6. Hero Deals Slider
  //=======================
  const heroMedia = $("#heroMedia");
  const heroContent = $("#heroContent");
  const heroWatermark = $("#heroWatermark");
  const heroBadge = $("#heroBadge span");
  const heroTitle = $("#heroTitle");
  const heroDesc = $("#heroDesc");
  const heroPrice = $("#heroPrice");
  const heroOldPrice = $("#heroOldPrice");
  const heroCtaText = $("#heroCtaText");
  const heroOfferNote = $("#heroOfferNote");

  const list = $("#dealList");
  const dotsWrap = $("#dots");
  const stage = $("#stage");

  const formatPrice = (n) => `${n.toLocaleString("en-US")} ج.م`;

  let current = Math.max(
    0,
    deals.findIndex((d) => d.theme === DEFAULT_THEME),
  );
  let swapTimer;

  // Render Deal Cards
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

  // Render Dots
  dotsWrap.innerHTML = deals
    .map(
      (d, i) =>
        `<button class="dot" type="button" role="tab" data-index="${i}" aria-label="${d.cardName}"></button>`,
    )
    .join("");

  const cards = $$(".deal-card", list);
  const dots = $$(".dot", dotsWrap);

  // Preload images
  deals.forEach((d) => {
    const img = new Image();
    img.src = d.image;
  });

  const scrollCardIntoView = (card) => {
    const left = card.offsetLeft - (list.clientWidth - card.clientWidth) / 2;
    list.scrollTo({ left, behavior: "smooth" });
  };

  const updateHeroText = (deal) => {
    heroWatermark.textContent = deal.watermark;
    heroBadge.textContent = deal.badge;
    heroTitle.innerHTML = deal.title;
    heroDesc.textContent = deal.desc;
    heroPrice.textContent = formatPrice(deal.price);
    heroOldPrice.textContent = formatPrice(deal.oldPrice);
    heroCtaText.textContent = deal.ctaText;
    heroOfferNote.innerHTML = `<i class="fa-regular fa-clock"></i> ${deal.offerNote}`;
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

    scrollCardIntoView(cards[current]);

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

  // Events
  list.addEventListener("click", (e) => {
    const card = e.target.closest(".deal-card");
    if (card) setDeal(Number(card.dataset.index));
  });

  dotsWrap.addEventListener("click", (e) => {
    const dot = e.target.closest(".dot");
    if (dot) setDeal(Number(dot.dataset.index));
  });

  // الأسهم (مع مراعاة اتجاه RTL)
  $("#prevDeal").addEventListener("click", () => setDeal(current - 1));
  $("#nextDeal").addEventListener("click", () => setDeal(current + 1));

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

  // التحميل الأول
  setDeal(current, { animate: false });
})();
