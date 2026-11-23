(function () {
  const $ = (id) => document.getElementById(id);
  const grid = $("grid"),
    catList = $("catList"),
    q = $("q"),
    sort = $("sort");
  const price = $("price"),
    priceOut = $("priceOut"),
    count = $("count"),
    empty = $("empty");
  const params = new URLSearchParams(location.search);

  const prices = PRODUCTS.map((p) => p.price);
  const MAX = Math.max(...prices);
  price.min = Math.floor(Math.min(...prices) / 10) * 10;
  price.max = MAX;
  price.value = MAX;

  const state = {
    cat: CATEGORIES.some((c) => c.id === params.get("cat"))
      ? params.get("cat")
      : "all",
    q: "",
    sort: "default",
    max: MAX,
  };

  const card = (p) => `
    <article class="product-card" data-id="${p.id}">
      <button class="product-card__wish" type="button" aria-label="Add ${p.name} to wishlist" aria-pressed="false">
        <i class="fa-regular fa-heart"></i></button>
      <a href="#" class="product-card__image-wrap">
        <img class="product-card__image" src="${p.image}" alt="${p.name}" loading="lazy" /></a>
      <div class="product-card__body">
        <h3 class="product-card__name"><a href="#">${p.name}</a></h3>
        <p class="product-card__type">${Store.catName(p.cat)}</p>
        <p class="product-card__price">${p.price.toFixed(2)}EGP</p>
      </div>
      <button class="btn btn--primary btn--sm product-card__add" type="button">Add To Cart</button>
    </article>`;

  function renderCats() {
    const all = [{ id: "all", name: "All Teas & Spices" }, ...CATEGORIES];
    catList.innerHTML = all
      .map((c) => {
        const n =
          c.id === "all"
            ? PRODUCTS.length
            : PRODUCTS.filter((p) => p.cat === c.id).length;
        return `<button type="button" class="fcat${state.cat === c.id ? " active" : ""}" data-cat="${c.id}"><span>${c.name}</span><small>${n}</small></button>`;
      })
      .join("");
  }

  function render() {
    const list = PRODUCTS.filter(
      (p) =>
        (state.cat === "all" || p.cat === state.cat) &&
        p.price <= state.max &&
        p.name.toLowerCase().includes(state.q),
    );
    if (state.sort === "low") list.sort((a, b) => a.price - b.price);
    if (state.sort === "high") list.sort((a, b) => b.price - a.price);
    if (state.sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));
    grid.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
    count.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    priceOut.textContent = `Up to ${state.max} EGP`;
    const name = state.cat === "all" ? "All Teas" : Store.catName(state.cat);
    $("pageTitle").textContent = name;
    $("crumbCat").textContent = name;
    document.title = `${name} | Harvest`;
    renderCats();
    Store.paintWish();
  }

  catList.addEventListener("click", (e) => {
    const b = e.target.closest("[data-cat]");
    if (!b) return;
    state.cat = b.dataset.cat;
    const url = new URL(location.href);
    state.cat === "all"
      ? url.searchParams.delete("cat")
      : url.searchParams.set("cat", state.cat);
    history.replaceState(null, "", url);
    render();
  });
  q.addEventListener("input", () => {
    state.q = q.value.trim().toLowerCase();
    render();
  });
  sort.addEventListener("change", () => {
    state.sort = sort.value;
    render();
  });
  price.addEventListener("input", () => {
    state.max = +price.value;
    render();
  });
  $("resetFilters").addEventListener("click", () => {
    Object.assign(state, { cat: "all", q: "", sort: "default", max: MAX });
    q.value = "";
    sort.value = "default";
    price.value = MAX;
    history.replaceState(null, "", location.pathname);
    render();
  });
  $("filterBtn").addEventListener("click", () => {
    const open = $("filters").classList.toggle("open");
    $("filterBtn").setAttribute("aria-expanded", open);
  });

  $("resetFilters2").addEventListener("click", () => $("resetFilters").click());

  render();
})();
