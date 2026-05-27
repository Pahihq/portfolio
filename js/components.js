import { site } from "./data.js";

const navItems = [
  { label: "ABOUT", href: "/#about", id: "about" },
  { label: "ARCHIVE", href: "/playground.html", id: "archive" },
  { label: "CONTACT", href: "/#contact", id: "contact" },
];

function renderNavLinks(activePage = "", linkClass = "nav__link") {
  return navItems
    .map(({ label, href, id, external }) => {
      const isActive = activePage === id;
      const attrs = external ? 'target="_blank" rel="noopener noreferrer"' : "";
      return `<a class="${linkClass}${isActive ? " is-active" : ""}" href="${href}" ${attrs}>${label}</a>`;
    })
    .join("");
}

/** Круглый переключатель темы — две половинки */
export function renderThemeSwitcher() {
  return `
    <button class="theme-switch" id="theme-switch" type="button" aria-label="Toggle light and dark theme">
      <span class="theme-switch__half theme-switch__half--light"></span>
      <span class="theme-switch__half theme-switch__half--dark"></span>
    </button>
  `;
}

/** Навигация внутри полноэкранного hero на главной */
export function renderHeroNav() {
  return `
    <nav class="hero-nav" aria-label="Main navigation">
      <a class="hero-nav__logo" href="/">${site.name}</a>
      <div class="hero-nav__links">${renderNavLinks("", "hero-nav__link")}</div>
      ${renderThemeSwitcher()}
    </nav>
  `;
}

/** Шапка для внутренних страниц */
export function renderHeader(activePage = "") {
  return `
    <header class="header" id="header">
      <div class="container container--content header__inner">
        <a class="logo" href="/">${site.name}</a>
        <nav class="nav" aria-label="Main navigation">${renderNavLinks(activePage)}</nav>
        ${renderThemeSwitcher()}
      </div>
    </header>
  `;
}

/** Контейнер для физических бейджей */
export function renderHeroBadges() {
  return `<div class="hero-badge-field" id="hero-badge-field" aria-hidden="true"></div>`;
}

/** Рендер блока контактов в подвале */
export function renderFooter() {
  return `
    <footer class="footer" id="contact">
      <div class="footer__inner">
        <h2 class="footer__heading">LET'S GET IN TOUCH :)</h2>

        <div class="footer__center">
          <div class="footer__socials">
            <a class="social-btn" href="${site.telegram}" target="_blank" rel="noopener noreferrer">Telegram</a>
            <button class="social-btn" id="email-btn" type="button" data-email="${site.email}">Email</button>
          </div>
          <button class="footer__top" id="scroll-top-btn" type="button" aria-label="Back to top">↑</button>
        </div>

        <span class="footer__clock clock" id="clock" aria-live="polite"></span>
      </div>
    </footer>
  `;
}

function getTheme() {
  return document.documentElement.dataset.theme || "dark";
}

function setTheme(theme) {
  document.documentElement.dataset.theme = theme;
  localStorage.setItem("theme", theme);
}

function initThemeSwitcher() {
  const btn = document.getElementById("theme-switch");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const next = getTheme() === "dark" ? "light" : "dark";
    setTheme(next);
  });
}

/** Инициализация общих компонентов */
export function initCommon() {
  initThemeSwitcher();
  initClock();
  initEmailCopy();
  initScrollToTop();
  initScrollAnimations();
}

function initClock() {
  const clockEl = document.getElementById("clock");
  if (!clockEl) return;

  const update = () => {
    const now = new Date();
    const hours = now.getHours();
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const seconds = String(now.getSeconds()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";
    const h12 = hours % 12 || 12;
    clockEl.textContent = `${h12}:${minutes}:${seconds} ${ampm}`;
  };

  update();
  setInterval(update, 1000);
}

function initEmailCopy() {
  const btn = document.getElementById("email-btn");
  if (!btn) return;

  btn.addEventListener("click", async () => {
    const email = btn.dataset.email;
    try {
      await navigator.clipboard.writeText(email);
      const original = btn.textContent;
      btn.textContent = "Copied!";
      setTimeout(() => {
        btn.textContent = original;
      }, 2000);
    } catch {
      window.location.href = `mailto:${email}`;
    }
  });
}

function initScrollToTop() {
  const btn = document.getElementById("scroll-top-btn");
  if (!btn) return;

  btn.addEventListener("click", () => {
    const home = document.getElementById("home");
    if (home) {
      home.scrollIntoView({ behavior: "smooth" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

function initScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: "0px 0px -40px 0px" }
  );

  elements.forEach((el) => observer.observe(el));
}
