(function () {
  const S = Store;
  const rows = document.getElementById("cartRows");
  const COUPONS = { SWEET10: 0.1 };
  let coupon = null;
  try {
    coupon = localStorage.getItem("harvest_coupon");
  } catch (e) {}
  if (!COUPONS[coupon]) coupon = null;
  const $ = (id) => document.getElementById(id);

  function totals() {
    const items = S.get()
      .map((i) => ({ ...S.byId(i.id), qty: i.qty }))
      .filter((i) => i.id);
    const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    const ship = sub === 0 || sub >= 50 ? 0 : 5;
    const disc = coupon ? sub * COUPONS[coupon] : 0;
    return { items, sub, count, ship, disc, total: sub + ship - disc };
  }

  function render() {
    const t = totals();
    document
      .querySelector(".cart-main")
      .classList.toggle("is-empty", t.items.length === 0);
    rows.innerHTML = t.items.length
      ? t.items
          .map(
            (p) => `
        <div class="cart-row" data-id="${p.id}">
          <button class="rm" data-act="rm" aria-label="Remove ${p.name}"><i class="fa-solid fa-xmark"></i></button>
          <div class="cart-prod"><img src="${p.img}" alt="${p.name}" />
            <div><strong>${p.name}</strong><span>${p.weight}</span></div></div>
          <div class="c-price" data-label="Price">${S.money(p.price)}</div>
          <div class="qty">
            <button data-act="dec" aria-label="Decrease"><i class="fa-solid fa-minus"></i></button>
            <input type="number" min="1" max="99" value="${p.qty}" aria-label="Quantity" />
            <button data-act="inc" aria-label="Increase"><i class="fa-solid fa-plus"></i></button>
          </div>
          <div class="c-sub" data-label="Subtotal">${S.money(p.price * p.qty)}</div>
        </div>`,
          )
          .join("")
      : `<div class="cart-empty"><i class="fa-solid fa-bag-shopping"></i>
          <p>Your cart is empty.</p><a class="btn-primary" href="products.html">Browse Products</a></div>`;

    $("sItems").textContent = t.count;
    $("sSub").textContent = S.money(t.sub);
    $("sShip").textContent = t.ship ? S.money(t.ship) : "Free";
    $("sDisc").textContent = (t.disc ? "-" : "") + S.money(t.disc);
    $("sTotal").textContent = S.money(t.total);
    $("coTotal").textContent = S.money(t.total);
    $("couponInput").value = coupon || "";
  }

  rows.addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const id = b.closest(".cart-row").dataset.id;
    const item = S.get().find((i) => i.id === id);
    if (b.dataset.act === "rm") {
      S.remove(id);
      S.toast(`${S.byId(id).name} removed`);
    }
    if (b.dataset.act === "inc") S.setQty(id, item.qty + 1);
    if (b.dataset.act === "dec")
      item.qty > 1
        ? S.setQty(id, item.qty - 1)
        : (S.remove(id), S.toast(`${S.byId(id).name} removed`));
  });
  rows.addEventListener("change", (e) => {
    if (e.target.matches(".qty input"))
      S.setQty(e.target.closest(".cart-row").dataset.id, e.target.value);
  });

  $("clearCart").addEventListener("click", () => {
    if (!S.count()) return;
    S.clear();
    coupon = null;
    try {
      localStorage.removeItem("harvest_coupon");
    } catch (e) {}
    S.toast("Cart cleared");
  });

  $("couponForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = $("couponInput").value.trim().toUpperCase();
    if (!COUPONS[code]) return S.toast("Invalid coupon code", "error");
    coupon = code;
    try {
      localStorage.setItem("harvest_coupon", code);
    } catch (er) {}
    S.toast("Coupon applied: 10% off");
    render();
  });

  $("proceed").addEventListener("click", () => {
    if (!S.count()) return S.toast("Your cart is empty", "error");
    $("checkout").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => $("fullName").focus({ preventScroll: true }), 600);
  });

  $("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!S.count()) return S.toast("Your cart is empty", "error");
    const form = e.target;
    if (!form.checkValidity()) return form.reportValidity();
    const name = $("fullName").value.trim().split(" ")[0];
    S.clear();
    coupon = null;
    try {
      localStorage.removeItem("harvest_coupon");
    } catch (er) {}
    form.querySelector("button[type=submit]").disabled = true;
    S.toast(`Thank you ${name}! Your order has been placed.`);
    setTimeout(() => (location.href = "index.html"), 2000);
  });

  window.addEventListener("cart:change", render);
  render();
})();
