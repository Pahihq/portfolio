import { works } from "./data.js";
import {
  renderHeroNav,
  renderHeroBadges,
  renderFooter,
  initCommon,
} from "./components.js";
import { initHeroBadges } from "./hero-badges.js";

function renderWorkCard(work) {
  return `
    <article class="fade-in">
      <a class="work-card" href="/${work.slug}/">
        <div class="work-card__media">
          <img
            class="work-card__image"
            src="${work.thumb}"
            alt="${work.title}"
            loading="lazy"
          />
        </div>
        <div class="work-card__footer">
          <div class="work-card__meta">
            <h3 class="work-card__title">${work.title}</h3>
            <p class="work-card__category">${work.category}</p>
          </div>
          <span class="work-card__year">${work.year}</span>
        </div>
      </a>
    </article>
  `;
}

function renderHome() {
  const worksGrid = works.map(renderWorkCard).join("");

  document.body.innerHTML = `
    <div class="page">
      <main>
        <section class="hero-screen" id="home">
          ${renderHeroNav()}

          <div class="hero-body">
            ${renderHeroBadges()}
            <div class="hero-block fade-in" id="about">
              <h1 class="hero__name">
                <div class="hero__title-row" id="hero-title-row">
                  <div class="hero__name-col">
                    <span class="hero__title-word">NIKA</span>
                    <p class="hero__caption hero__caption--left">
                      Hi, I'm Nika, a russian designer that loves experimenting and archiving
                    </p>
                  </div>
                  <div class="hero__name-col">
                    <span class="hero__title-word">SABLINA</span>
                    <p class="hero__caption hero__caption--right">
                      *Digital Designer, focusing on crafting visual stories across branding and consumer-focused design
                    </p>
                  </div>
                </div>
              </h1>
            </div>
          </div>
        </section>

        <section class="works" id="works">
          <div class="works__header fade-in">
            <h2 class="works__title">Selected Works</h2>
            <span class="works__period">2020 - 2025</span>
          </div>
          <div class="works__grid">${worksGrid}</div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `;

  initCommon();
  fitHeroTitle();
  initHeroBadges();
}

/** Масштабирует NIKA SABLINA на всю ширину экрана */
function fitHeroTitle() {
  const row = document.getElementById("hero-title-row");
  const block = row?.closest(".hero-block");
  if (!row || !block) return;

  const fit = () => {
    const container = row.parentElement;
    if (!container) return;

    const isStacked = getComputedStyle(row).flexDirection === "column";
    if (isStacked) {
      row.style.fontSize = "";
      return;
    }

    const available = container.clientWidth;
    const words = row.querySelectorAll(".hero__title-word");
    const gap = parseFloat(getComputedStyle(row).columnGap || getComputedStyle(row).gap) || 0;

    let lo = 24;
    let hi = available;

    while (hi - lo > 0.5) {
      const mid = (lo + hi) / 2;
      row.style.fontSize = `${mid}px`;

      let total = gap * Math.max(words.length - 1, 0);
      words.forEach((word) => {
        total += word.offsetWidth;
      });

      if (total <= available) lo = mid;
      else hi = mid;
    }

    row.style.fontSize = `${lo}px`;
    window.dispatchEvent(new CustomEvent("hero-title-fit"));
  };

  fit();

  if (document.fonts?.ready) {
    document.fonts.ready.then(fit);
  }

  window.addEventListener("resize", fit);
}

renderHome();
