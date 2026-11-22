/* Cart state + toast + badge (مشترك بين كل الصفحات) */
(function () {
  const KEY = "harvest_cart";
  const byId = (id) => PRODUCTS.find((p) => p.id === id);
  const money = (n) => "$" + n.toFixed(2);

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
    if (it) it.qty = Math.min(99, it.qty + qty);
    else c.push({ id, qty });
    save(c);
  }
  function setQty(id, qty) {
    qty = Math.max(1, Math.min(99, parseInt(qty, 10) || 1));
    save(get().map((i) => (i.id === id ? { ...i, qty } : i)));
  }
  const remove = (id) => save(get().filter((i) => i.id !== id));
  const clear = () => save([]);

  /* ---- Toast ---- */
  let box;
  function toast(msg, type = "success") {
    if (!box) {
      box = document.createElement("div");
      box.className = "toasts";
      box.setAttribute("aria-live", "polite");
      document.body.appendChild(box);
    }
    const t = document.createElement("div");
    t.className = "toast toast--" + type;
    const icon = type === "error" ? "fa-circle-exclamation" : "fa-circle-check";
    t.innerHTML = `<i class="fa-solid ${icon}" aria-hidden="true"></i><span></span>`;
    t.querySelector("span").textContent = msg;
    box.appendChild(t);
    requestAnimationFrame(() => t.classList.add("show"));
    setTimeout(() => {
      t.classList.remove("show");
      setTimeout(() => t.remove(), 300);
    }, 3000);
  }

  /* ---- Badge ---- */
  function updateBadge() {
    const n = count();
    document.querySelectorAll(".cart-count").forEach((el) => {
      el.textContent = n;
      el.hidden = n === 0;
    });
  }
  window.addEventListener("cart:change", updateBadge);
  window.addEventListener("storage", updateBadge);
  document.addEventListener("DOMContentLoaded", updateBadge);

  /* ---- Add to cart (أى زرار .add-btn[data-id]) ---- */
  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".add-btn[data-id]");
    if (!btn) return;
    const p = byId(btn.dataset.id);
    if (!p) return;
    add(p.id);
    toast(`${p.name} added to cart`);
    const label = btn.querySelector("span");
    btn.classList.add("added");
    if (label) label.textContent = "Added";
    setTimeout(() => {
      btn.classList.remove("added");
      if (label) label.textContent = "Add";
    }, 1200);
  });

  window.Store = { money, byId, get, count, add, setQty, remove, clear, toast };
})();
