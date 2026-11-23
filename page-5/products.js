(function () {
  const grid = document.getElementById("grid");
  const chips = document.getElementById("chips");
  const qInput = document.getElementById("q");
  const sortSel = document.getElementById("sort");
  const countEl = document.getElementById("count");
  const empty = document.getElementById("empty");

  const params = new URLSearchParams(location.search);
  const state = {
    cat: CATEGORIES.some((c) => c.id === params.get("cat"))
      ? params.get("cat")
      : "all",
    q: "",
    sort: "default",
  };

  function renderChips() {
    const all = [{ id: "all", name: "All" }, ...CATEGORIES];
    chips.innerHTML = all
      .map((c) => {
        const n =
          c.id === "all"
            ? PRODUCTS.length
            : PRODUCTS.filter((p) => p.cat === c.id).length;
        return `<button type="button" class="chip${state.cat === c.id ? " active" : ""}" data-cat="${c.id}">${c.name} <small>${n}</small></button>`;
      })
      .join("");
  }

  function card(p) {
    const cat = CATEGORIES.find((c) => c.id === p.cat).name;
    return `<article class="prod-card">
      <div class="prod-card__img">${p.tag ? `<span class="prod-tag">${p.tag}</span>` : ""}
        <img src="${p.img}" alt="${p.name}" loading="lazy" /></div>
      <div class="prod-card__body">
        <span class="prod-cat">${cat}</span>
        <h3>${p.name}</h3>
        <div class="prod-card__foot">
          <strong class="prod-price">${p.price} EGP</strong>
          <button type="button" class="add-btn" data-id="${p.id}" aria-label="Add ${p.name} to cart">
            <i class="fa-solid fa-bag-shopping" aria-hidden="true"></i><span>Add</span></button>
        </div>
      </div></article>`;
  }

  function render() {
    let list = PRODUCTS.filter(
      (p) =>
        (state.cat === "all" || p.cat === state.cat) &&
        p.name.toLowerCase().includes(state.q),
    );
    if (state.sort === "low") list.sort((a, b) => a.price - b.price);
    if (state.sort === "high") list.sort((a, b) => b.price - a.price);
    if (state.sort === "az") list.sort((a, b) => a.name.localeCompare(b.name));

    grid.innerHTML = list.map(card).join("");
    empty.hidden = list.length > 0;
    countEl.textContent = `${list.length} product${list.length === 1 ? "" : "s"}`;
    renderChips();
  }

  chips.addEventListener("click", (e) => {
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
  qInput.addEventListener("input", () => {
    state.q = qInput.value.trim().toLowerCase();
    render();
  });
  sortSel.addEventListener("change", () => {
    state.sort = sortSel.value;
    render();
  });
  document.getElementById("resetFilters").addEventListener("click", () => {
    state.cat = "all";
    state.q = "";
    state.sort = "default";
    qInput.value = "";
    sortSel.value = "default";
    history.replaceState(null, "", location.pathname);
    render();
  });

  render();
})();
