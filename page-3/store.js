/* Cart state + fly animation + toast (مشترك بين كل الصفحات) */
(function () {
  const KEY = "harvest_tea_cart";
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const money = (n) => n.toFixed(2) + " EGP";
  const catName = (id) =>
    (CATEGORIES.find((c) => c.id === id) || {}).name || "";

  function get() {
    try {
      return JSON.parse(localStorage.getItem(KEY)) || [];
    } catch (e) {
      return [];
    }
  }
  function save(c) {
    try {
      localStorage.setItem(KEY, JSON.stringify(c));
    } catch (e) {}
    window.dispatchEvent(new Event("cart:change"));
  }
  const count = () => get().reduce((s, i) => s + i.qty, 0);
  function add(id, qty = 1) {
    const c = get();
    const it = c.find((i) => i.id === id);
    it ? (it.qty = Math.min(99, it.qty + qty)) : c.push({ id, qty });
    save(c);
  }
  function setQty(id, qty) {
    qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    save(get().map((i) => (i.id === id ? { ...i, qty } : i)));
  }
  const remove = (id) => save(get().filter((i) => i.id !== id));
  const clear = () => save([]);

  /* ---------- Toast ---------- */
  let box;
  function toast(msg, opt = {}) {
    if (!box) {
      box = document.createElement("div");
      box.className = "toasts";
      box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    const t = document.createElement("div");
    t.className = "toast" + (opt.type === "error" ? " toast--error" : "");
    const visual = opt.img
      ? `<img class="toast__img" src="${opt.img}" alt="" />`
      : `<span class="toast__icon"><i class="fa-solid ${opt.type === "error" ? "fa-triangle-exclamation" : "fa-leaf"}"></i></span>`;
    t.innerHTML = `${visual}<div class="toast__text"><strong></strong>${
      opt.sub ? "<small></small>" : ""
    }</div>${
      opt.link
        ? `<a class="toast__link" href="${opt.link}">${opt.linkText || "View"}</a>`
        : ""
    }<span class="toast__bar"></span>`;
    t.querySelector("strong").textContent = msg;
    if (opt.sub) t.querySelector("small").textContent = opt.sub;
    box.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 350);
    }, opt.time || 3200);
  }

  /* ---------- Fly to cart ---------- */
  function fly(imgEl) {
    const target = document.getElementById("cartBtn");
    if (
      !target ||
      !imgEl ||
      matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const a = imgEl.getBoundingClientRect();
    const b = target.getBoundingClientRect();
    const size = Math.min(a.width, 110);
    const el = document.createElement("img");
    el.src = imgEl.currentSrc || imgEl.src;
    el.className = "fly-img";
    Object.assign(el.style, {
      left: a.left + a.width / 2 - size / 2 + "px",
      top: a.top + a.height / 2 - size / 2 + "px",
      width: size + "px",
      height: size + "px",
    });
    document.body.appendChild(el);
    const dx = b.left + b.width / 2 - (a.left + a.width / 2);
    const dy = b.top + b.height / 2 - (a.top + a.height / 2);
    const anim = el.animate(
      [
        {
          transform: "translate(0,0) scale(1) rotate(0)",
          opacity: 1,
          borderRadius: "10px",
        },
        {
          transform: `translate(${dx * 0.45}px,${dy * 0.45 - 90}px) scale(.65) rotate(120deg)`,
          opacity: 0.95,
          borderRadius: "50%",
          offset: 0.5,
        },
        {
          transform: `translate(${dx}px,${dy}px) scale(.1) rotate(300deg)`,
          opacity: 0.3,
          borderRadius: "50%",
        },
      ],
      { duration: 900, easing: "cubic-bezier(.55,.05,.7,.35)" },
    );
    anim.onfinish = () => {
      el.remove();
      target.classList.remove("cart-bump");
      void target.offsetWidth;
      target.classList.add("cart-bump");
    };
  }

  /* ---------- Badge sync مع script.js ---------- */
  function sync() {
    if (window.setCartCount) window.setCartCount(count());
  }
  window.addEventListener("cart:change", sync);
  window.addEventListener("storage", sync);
  document.addEventListener("DOMContentLoaded", sync);

  /* ---------- Add to cart (أى كارت فيه .product-card__add) ---------- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".product-card__add");
    if (!btn) return;
    const card = btn.closest(".product-card");
    const p = card && byId(card.dataset.id);
    if (!p) return;
    fly(card.querySelector(".product-card__image"));
    add(p.id);
    toast(`${p.name} added to cart`, {
      img: p.image,
      sub: `${count()} item(s) in your cart`,
      link: "cart.html",
      linkText: "View cart",
    });
    btn.classList.add("is-added");
    btn.textContent = "Added";
    setTimeout(() => {
      btn.classList.remove("is-added");
      btn.textContent = "Add To Cart";
    }, 1200);
  });

  /* ---------- Wishlist ---------- */
  const WKEY = "harvest_tea_wish";
  const wishGet = () => {
    try {
      return JSON.parse(localStorage.getItem(WKEY)) || [];
    } catch (e) {
      return [];
    }
  };
  function wishSave(l) {
    try {
      localStorage.setItem(WKEY, JSON.stringify(l));
    } catch (e) {}
    window.dispatchEvent(new Event("wish:change"));
  }
  function wishToggle(id) {
    const l = wishGet(),
      i = l.indexOf(id);
    i > -1 ? l.splice(i, 1) : l.push(id);
    wishSave(l);
    return i === -1;
  }
  function paintWish() {
    const l = wishGet();
    document.querySelectorAll(".product-card[data-id]").forEach((c) => {
      const w = c.querySelector(".product-card__wish");
      if (!w) return;
      const on = l.includes(c.dataset.id);
      w.classList.toggle("is-liked", on);
      w.setAttribute("aria-pressed", String(on));
      w.querySelector("i").className = on
        ? "fa-solid fa-heart"
        : "fa-regular fa-heart";
    });
    const badge = document.getElementById("wlBadge");
    if (badge) {
      badge.textContent = l.length;
      badge.hidden = l.length === 0;
    }
  }
  window.addEventListener("wish:change", paintWish);
  window.addEventListener("storage", paintWish);
  document.addEventListener("DOMContentLoaded", paintWish);
  document.addEventListener("click", (e) => {
    const w = e.target.closest(".product-card__wish");
    if (!w) return;
    const card = w.closest(".product-card"),
      p = card && byId(card.dataset.id);
    if (!p) return;
    const on = wishToggle(p.id);
    toast(
      on ? `${p.name} saved to wishlist` : `${p.name} removed from wishlist`,
      { img: p.image, sub: `${wishGet().length} item(s) in your wishlist` },
    );
  });

  window.Store = {
    fly,
    wishGet,
    wishToggle,
    paintWish,
    money,
    byId,
    catName,
    get,
    count,
    add,
    setQty,
    remove,
    clear,
    toast,
  };
})();
