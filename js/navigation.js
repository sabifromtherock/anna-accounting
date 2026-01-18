document.addEventListener("pagesLoaded", () => {
  initNavigation();
});

function initNavigation() {
  const navButtons = document.querySelectorAll(".main-nav button");
  const pageFromHash = window.location.hash.replace("#", "") || "about";

  showPage(pageFromHash);
  setActiveNavByPage(pageFromHash);

  navButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const page = btn.dataset.page;
      showPage(page);
      setActiveNav(btn);
      updateUrlHash(page);
    });
  });

  // Listen for back/forward browser navigation
  window.addEventListener("hashchange", () => {
    const hashPage = window.location.hash.replace("#", "") || "about";
    showPage(hashPage);
    setActiveNavByPage(hashPage);
  });
}

function showPage(pageId) {
  document.querySelectorAll(".page-section").forEach((section) => {
    section.style.display = "none";
  });

  const active = document.getElementById(pageId);
  if (active) active.style.display = "block";
}

function setActiveNav(activeButton) {
  document
    .querySelectorAll(".main-nav button")
    .forEach((btn) => btn.classList.remove("active"));
  activeButton.classList.add("active");
}

function setActiveNavByPage(page) {
  const btn = document.querySelector(`.main-nav button[data-page="${page}"]`);
  if (btn) btn.classList.add("active");
}

function updateUrlHash(page) {
  window.location.hash = page;
}
