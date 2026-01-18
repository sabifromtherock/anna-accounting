document.addEventListener("click", (event) => {
  const burger = event.target.closest(".burger");
  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".menu-overlay");

  if (!mobileMenu || !overlay) return;

  /* Open menu */
  if (burger) {
    const isOpen = mobileMenu.classList.contains("open");

    mobileMenu.classList.toggle("open", !isOpen);
    overlay.hidden = isOpen;

    burger.setAttribute("aria-expanded", String(!isOpen));
    mobileMenu.setAttribute("aria-hidden", String(isOpen));
    return;
  }

  /* Close on overlay click */
  if (event.target === overlay) {
    closeMenu();
  }

  /* Close on mobile menu button click */
  if (event.target.closest(".mobile-menu button")) {
    closeMenu();
  }

  function closeMenu() {
    mobileMenu.classList.remove("open");
    overlay.hidden = true;

    const burgerBtn = document.querySelector(".burger");
    if (burgerBtn) burgerBtn.setAttribute("aria-expanded", "false");

    mobileMenu.setAttribute("aria-hidden", "true");
  }
});

/* ESC key support */
document.addEventListener("keydown", (e) => {
  if (e.key !== "Escape") return;

  const mobileMenu = document.querySelector(".mobile-menu");
  const overlay = document.querySelector(".menu-overlay");

  if (!mobileMenu || !overlay) return;

  mobileMenu.classList.remove("open");
  overlay.hidden = true;
});
