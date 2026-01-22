const appState = {
  currentPage: "about",
  currentLang: "en",
  sections: ["about", "services", "prices", "contact"],

  setPage(page) {
    if (!this.sections.includes(page)) return;
    this.currentPage = page;

    document
      .querySelectorAll(".page-section")
      .forEach((s) => (s.style.display = "none"));
    const active = document.getElementById(page);
    if (active) active.style.display = "block";

    document
      .querySelectorAll(".main-nav button")
      .forEach((btn) => btn.classList.remove("active"));
    const btn = document.querySelector(`.main-nav button[data-page="${page}"]`);
    if (btn) btn.classList.add("active");

    window.location.hash = page;
  },

  setLang(lang) {
    if (!["en", "hu"].includes(lang)) return;
    this.currentLang = lang;
    applyTranslations();

    document
      .querySelectorAll("#lang-toggle, #lang-toggle-mobile")
      .forEach((btn) => {
        btn.textContent = lang === "en" ? "🇭🇺 HU" : "🇬🇧 EN";
      });

    // update URL without reloading page
    const currentHash = window.location.hash;
    const newUrl = `${window.location.pathname}?lang=${lang}${currentHash}`;
    window.history.replaceState(null, "", newUrl);
  },
};
