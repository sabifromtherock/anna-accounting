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

  // Header hide on scroll for landscape mobile
  let lastScrollY = 0;
  const header = document.querySelector(".site-header");

  window.addEventListener("scroll", () => {
    if (
      window.matchMedia("(max-width: 1023px) and (orientation: landscape)")
        .matches
    ) {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 50) {
        // scrolling down → hide
        header.classList.add("hidden");
      } else {
        // scrolling up → show
        header.classList.remove("hidden");
      }

      lastScrollY = currentScrollY;
    } else {
      // reset for other views
      header.classList.remove("hidden");
    }
  });
}
