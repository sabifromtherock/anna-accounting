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

  // Mobile language button reposition
  function updateMobileLangButton() {
    const mobileLangBtn = document.getElementById("lang-toggle-mobile");
    const headerContainer = document.querySelector(".site-header .container");
    const burgerBtn = document.querySelector(".burger");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (!mobileLangBtn || !headerContainer || !burgerBtn || !mobileMenu) return;

    if (window.innerWidth < 1024) {
      // Create a wrapper if it doesn't exist
      let wrapper = document.querySelector(".burger-lang-wrapper");
      if (!wrapper) {
        wrapper = document.createElement("div");
        wrapper.className = "burger-lang-wrapper";
        burgerBtn.insertAdjacentElement("beforebegin", wrapper);
        wrapper.appendChild(burgerBtn);
      }

      // Move lang button below burger
      wrapper.appendChild(mobileLangBtn);
      mobileLangBtn.classList.add("mobile-below-burger");
    } else {
      // Remove wrapper and move button back to mobile menu
      const wrapper = document.querySelector(".burger-lang-wrapper");
      if (wrapper) {
        headerContainer.appendChild(burgerBtn); // restore burger
        wrapper.remove();
      }
      mobileMenu.appendChild(mobileLangBtn);
      mobileLangBtn.classList.remove("mobile-below-burger");
    }
  }

  // Run on load & resize
  window.addEventListener("load", updateMobileLangButton);
  window.addEventListener("resize", updateMobileLangButton);
}
