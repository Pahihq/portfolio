import { works, paths, ui, site } from "./data.js";
import {
  renderHeroNav,
  renderFooter,
  initCommon,
} from "./components.js";
import { initHeroBadges } from "./hero-badges.js";

function renderWorkCard(work) {
  return `
    <article class="fade-in">
      <a class="work-card" href="${paths.project(work.slug)}">
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
  document.title = site.title;
  const worksGrid = works.map(renderWorkCard).join("");

  document.body.innerHTML = `
    <div class="page">
      <main>
        <section class="hero-screen" id="home">
          ${renderHeroNav()}

          <div class="hero-body">
            <div class="hero-badge-field hero-badge-field--back" id="hero-badge-field-back" aria-hidden="true"></div>
            <div class="hero-block fade-in" id="about">
              <h1 class="hero__name">
                <div class="hero__title-row" id="hero-title-row">
                  <span class="hero__title-word">NIKA</span>
                  <span class="hero__title-word">SABLINA</span>
                </div>
                <div class="hero__caption-row">
                  <p class="hero__caption hero__caption--left">
                    ${ui.hero.captionLeft}
                  </p>
                  <p class="hero__caption hero__caption--right">
                    ${ui.hero.captionRight}
                  </p>
                </div>
              </h1>
            </div>
            <div class="hero-badge-field hero-badge-field--front" id="hero-badge-field-front" aria-hidden="true"></div>
          </div>
        </section>

        <section class="about">
          <p class="about__lead fade-in">Я графический дизайнер.</p>
          <p class="about__text fade-in">
            Создаю айдентику, упаковку, постеры и визуальные концепции с характером. Работаю с формой,
            типографикой, материалами и образами, чтобы дизайн не просто выглядел красиво, а запоминался и работал.
          </p>
        </section>

        <section class="works" id="works">
          <div class="works__header fade-in">
            <h2 class="works__title">${ui.works.title}</h2>
            <span class="works__period">${ui.works.period}</span>
          </div>
          <div class="works__grid">${worksGrid}</div>
        </section>

        <section class="approach">
          <h2 class="approach__title fade-in">Мой подход</h2>
          <div class="approach__body">
            <p class="approach__text fade-in">
              Я начинаю проект не с украшений, а с идеи. Мне важно понять, какой образ должен остаться у
              человека после контакта с дизайном: ощущение, ассоциация, настроение, жест.
            </p>
            <p class="approach__text fade-in">
              После этого я ищу визуальный язык: цвет, типографику, форму, материал, ритм, композицию. Я не
              боюсь делать дизайн наивным, грубым, странным или чрезмерным, если именно это делает проект точнее.
            </p>
            <p class="approach__text fade-in">
              Для меня дизайн — это не просто «сделать красиво». Это способ собрать смысл в форму, которую можно
              увидеть, потрогать, запомнить и отличить от сотни одинаковых решений.
            </p>
          </div>
        </section>
      </main>
      ${renderFooter()}
    </div>
  `;

  initCommon();
  initHeroBadges();
  fitHeroTitle();
}

/** Масштабирует NIKA SABLINA на всю ширину экрана */
function fitHeroTitle() {
  const row = document.getElementById("hero-title-row");
  const block = row?.closest(".hero-block");
  if (!row || !block) return;

  const fit = () => {
    const container = row.parentElement;
    if (!container) return;

    const available = container.clientWidth;
    const words = row.querySelectorAll(".hero__title-word");
    if (!words.length) return;

    let lo = 16;
    let hi = available;

    while (hi - lo > 0.5) {
      const mid = (lo + hi) / 2;
      row.style.fontSize = `${mid}px`;

      const gap =
        parseFloat(getComputedStyle(row).columnGap || getComputedStyle(row).gap) || 0;

      let total = gap * Math.max(words.length - 1, 0);
      words.forEach((word) => {
        total += word.offsetWidth;
      });

      if (total <= available - 4) lo = mid;
      else hi = mid;
    }

    row.style.fontSize = `${lo}px`;
    window.dispatchEvent(new CustomEvent("hero-title-fit"));
  };

  fit();

  if (document.fonts?.ready) {
    document.fonts.ready.then(fit);
  }

  const container = row.parentElement;
  if (container && "ResizeObserver" in window) {
    const observer = new ResizeObserver(fit);
    observer.observe(container);
  } else {
    window.addEventListener("resize", fit);
  }

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", fit);
  }
}

renderHome();
