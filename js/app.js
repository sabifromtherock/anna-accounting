function initializeApp() {
  // Show initial page from URL hash or default
  const initialPage = window.location.hash.replace("#", "") || "about";
  appState.setPage(initialPage);

  // Set initial language
  appState.setLang(appState.currentLang);

  // Attach nav buttons
  document.querySelectorAll("button[data-page]").forEach((btn) => {
    btn.addEventListener("click", () => {
      appState.setPage(btn.dataset.page);
    });
  });

  // Attach language button
  document
    .querySelectorAll("#lang-toggle, #lang-toggle-mobile")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        const newLang = appState.currentLang === "en" ? "hu" : "en";
        appState.setLang(newLang);
      });
    });

  // Listen for back/forward browser navigation
  window.addEventListener("hashchange", () => {
    const hashPage = window.location.hash.replace("#", "") || "about";
    appState.setPage(hashPage);
  });

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
