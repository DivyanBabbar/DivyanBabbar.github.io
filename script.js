const cards = [...document.querySelectorAll(".project-card")];
const filterButtons = [...document.querySelectorAll(".filter")];
const searchInput = document.querySelector("#project-search");
const count = document.querySelector("#results-count");
const emptyState = document.querySelector("#no-results");
let activeFilter = "all";

function updateProjects() {
  const query = searchInput.value.trim().toLowerCase();
  let visible = 0;
  for (const card of cards) {
    const categories = card.dataset.categories.split(/\s+/);
    const matchesCategory = activeFilter === "all" || categories.includes(activeFilter);
    const matchesSearch = !query || card.dataset.search.includes(query) || card.textContent.toLowerCase().includes(query);
    const show = matchesCategory && matchesSearch;
    card.hidden = !show;
    if (show) visible += 1;
  }
  count.textContent = `Showing ${visible} ${visible === 1 ? "project" : "projects"}`;
  emptyState.hidden = visible !== 0;
}

for (const button of filterButtons) {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    for (const item of filterButtons) {
      const selected = item === button;
      item.classList.toggle("is-active", selected);
      item.setAttribute("aria-pressed", String(selected));
    }
    updateProjects();
  });
}
searchInput.addEventListener("input", updateProjects);
updateProjects();

