const pages = {
  header: "pages/header.html",
  about: "pages/about.html",
  services: "pages/services.html",
  prices: "pages/prices.html",
  contact: "pages/contact.html",
  footer: "pages/footer.html",
};

function loadPages() {
  const loadPromises = Object.entries(pages).map(([id, url]) =>
    fetch(url)
      .then((res) => res.text())
      .then((html) => {
        const container = document.getElementById(id);
        if (container) container.innerHTML = html;
      })
  );

  Promise.all(loadPromises).then(() => {
    initializeApp();
  });
}

loadPages();
