const TELEGRAM_BOT_URL = "https://t.me/brickhouse";

const menuButton = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
const header = document.querySelector(".site-header");
const botLinks = document.querySelectorAll(".js-bot-link");
const revealItems = document.querySelectorAll(".reveal");
const stepCards = document.querySelectorAll(".step-card");

botLinks.forEach((link) => {
  link.href = TELEGRAM_BOT_URL;
});

document.querySelector("#current-year").textContent = new Date().getFullYear();

const closeMenu = () => {
  menuButton.setAttribute("aria-expanded", "false");
  menuButton.setAttribute("aria-label", "Відкрити меню");
  nav.classList.remove("open");
  document.body.classList.remove("menu-open");
};

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  menuButton.setAttribute("aria-expanded", String(!isOpen));
  menuButton.setAttribute("aria-label", isOpen ? "Відкрити меню" : "Закрити меню");
  nav.classList.toggle("open", !isOpen);
  document.body.classList.toggle("menu-open", !isOpen);
});

nav.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

window.addEventListener(
  "scroll",
  () => {
    header.classList.toggle("scrolled", window.scrollY > 24);
  },
  { passive: true },
);

const revealObserver = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  },
  { threshold: 0.12 },
);

revealItems.forEach((item) => revealObserver.observe(item));

stepCards.forEach((card) => {
  card.addEventListener("mouseenter", () => {
    stepCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
  });

  card.addEventListener("focusin", () => {
    stepCards.forEach((item) => item.classList.remove("active"));
    card.classList.add("active");
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closeMenu();
});
