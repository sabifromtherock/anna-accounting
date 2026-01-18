function initializeApp() {
  // Show initial page from URL hash or default
  const initialPage = window.location.hash.replace("#", "") || "about";
  appState.setPage(initialPage);

  // Set initial language
  appState.setLang(appState.currentLang);

  // Attach nav buttons
  document.querySelectorAll(".main-nav button").forEach((btn) => {
    btn.addEventListener("click", () => appState.setPage(btn.dataset.page));
  });

  // Attach language button
  const langButton = document.getElementById("lang-toggle");
  if (langButton) {
    langButton.addEventListener("click", () => {
      const newLang = appState.currentLang === "en" ? "hu" : "en";
      appState.setLang(newLang);
    });
  }

  // Listen for back/forward browser navigation
  window.addEventListener("hashchange", () => {
    const hashPage = window.location.hash.replace("#", "") || "about";
    appState.setPage(hashPage);
  });

  // Footer year
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
}
