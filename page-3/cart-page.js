(function () {
  const S = Store,
    $ = (id) => document.getElementById(id);
  const FREE_FROM = 500,
    SHIP_FEE = 40,
    COUPONS = { TEA10: 0.1 };
  let coupon = null;
  try {
    coupon = localStorage.getItem("harvest_tea_coupon");
  } catch (e) {}
  if (!COUPONS[coupon]) coupon = null;
  const saveCoupon = (c) => {
    try {
      c
        ? localStorage.setItem("harvest_tea_coupon", c)
        : localStorage.removeItem("harvest_tea_coupon");
    } catch (e) {}
  };

  function totals() {
    const items = S.get()
      .map((i) => ({ ...S.byId(i.id), qty: i.qty }))
      .filter((i) => i.name);
    const sub = items.reduce((s, i) => s + i.price * i.qty, 0);
    const count = items.reduce((s, i) => s + i.qty, 0);
    const ship = sub === 0 || sub >= FREE_FROM ? 0 : SHIP_FEE;
    const disc = coupon ? sub * COUPONS[coupon] : 0;
    return { items, sub, count, ship, disc, total: sub + ship - disc };
  }

  function render() {
    const t = totals();
    document.body.classList.toggle("cart-is-empty", t.items.length === 0);

    $("cartList").innerHTML = t.items.length
      ? t.items
          .map(
            (p) => `
        <article class="ci" data-id="${p.id}">
          <a href="#" class="ci__img"><img src="${p.image}" alt="${p.name}" /></a>
          <div class="ci__info">
            <span class="ci__cat">${S.catName(p.cat)}</span>
            <h3>${p.name}</h3>
            <span class="ci__unit">${S.money(p.price)} each</span>
          </div>
          <div class="qty" role="group" aria-label="Quantity">
            <button type="button" data-act="dec" aria-label="Decrease"><i class="fa-solid fa-minus"></i></button>
            <input type="number" min="1" max="99" value="${p.qty}" aria-label="Quantity" />
            <button type="button" data-act="inc" aria-label="Increase"><i class="fa-solid fa-plus"></i></button>
          </div>
          <strong class="ci__total">${S.money(p.price * p.qty)}</strong>
          <button type="button" class="ci__rm" data-act="rm"><i class="fa-regular fa-trash-can"></i><span>Remove</span></button>
        </article>`,
          )
          .join("")
      : `<div class="cart-empty"><i class="fa-solid fa-mug-hot"></i><h3>Your cart is empty</h3>
         <p>Add something from our collection and it will show up here.</p>
         <a class="btn btn--primary" href="products.html">Shop Now</a></div>`;

    $("sItems").textContent = t.count;
    $("sSub").textContent = S.money(t.sub);
    $("sShip").textContent = t.ship ? S.money(t.ship) : "Free";
    $("sDisc").textContent = (t.disc ? "- " : "") + S.money(t.disc);
    $("sTotal").textContent = S.money(t.total);
    $("couponInput").value = coupon || "";

    const left = FREE_FROM - t.sub;
    $("shipBar").style.width = Math.min(100, (t.sub / FREE_FROM) * 100) + "%";
    $("shipMsg").textContent =
      t.sub === 0
        ? `Free delivery on orders over ${FREE_FROM} EGP`
        : left > 0
          ? `Add ${S.money(left)} more for free delivery`
          : "You've unlocked free delivery!";

    $("recap").innerHTML = t.items
      .map(
        (p) => `
      <li><img src="${p.image}" alt="" /><span>${p.name} <small>× ${p.qty}</small></span><b>${S.money(p.price * p.qty)}</b></li>`,
      )
      .join("");
    $("coTotal").textContent = S.money(t.total);
  }

  $("cartList").addEventListener("click", (e) => {
    const b = e.target.closest("[data-act]");
    if (!b) return;
    const id = b.closest(".ci").dataset.id,
      p = S.byId(id);
    const it = S.get().find((i) => i.id === id);
    const gone = () =>
      S.toast(`${p.name} removed`, {
        img: p.image,
        sub: "Removed from your cart",
      });
    if (b.dataset.act === "rm") {
      S.remove(id);
      gone();
    }
    if (b.dataset.act === "inc") S.setQty(id, it.qty + 1);
    if (b.dataset.act === "dec")
      it.qty > 1 ? S.setQty(id, it.qty - 1) : (S.remove(id), gone());
  });
  $("cartList").addEventListener("change", (e) => {
    if (e.target.matches(".qty input"))
      S.setQty(e.target.closest(".ci").dataset.id, e.target.value);
  });

  $("clearCart").addEventListener("click", () => {
    if (!S.count()) return;
    S.clear();
    coupon = null;
    saveCoupon(null);
    S.toast("Cart cleared");
  });
  $("couponForm").addEventListener("submit", (e) => {
    e.preventDefault();
    const code = $("couponInput").value.trim().toUpperCase();
    if (!COUPONS[code])
      return S.toast("Invalid coupon code", { type: "error" });
    coupon = code;
    saveCoupon(code);
    S.toast("Coupon applied", { sub: "10% off your order" });
    render();
  });
  $("proceed").addEventListener("click", () => {
    if (!S.count())
      return S.toast("Your cart is empty", {
        type: "error",
        sub: "Add a product first",
      });
    $("checkout").scrollIntoView({ behavior: "smooth" });
    setTimeout(() => $("fullName").focus({ preventScroll: true }), 650);
  });
  $("checkoutForm").addEventListener("submit", (e) => {
    e.preventDefault();
    if (!S.count()) return S.toast("Your cart is empty", { type: "error" });
    const form = e.target;
    if (!form.checkValidity()) return form.reportValidity();
    const first = $("fullName").value.trim().split(" ")[0];
    S.clear();
    coupon = null;
    saveCoupon(null);
    form.querySelector("button[type=submit]").disabled = true;
    S.toast(`Thank you, ${first}!`, {
      sub: "Your order has been placed successfully",
      time: 2400,
    });
    setTimeout(() => (location.href = "index.html"), 2400);
  });

  window.addEventListener("cart:change", render);
  render();
})();
