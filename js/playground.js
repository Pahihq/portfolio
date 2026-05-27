import { playgroundItems, paths } from "./data.js";
import { renderHeader, renderFooter, initCommon } from "./components.js";

function renderPlayground() {
  const itemsHtml = playgroundItems
    .map(
      ({ title, image }) => `
      <figure class="playground-item fade-in">
        <img class="playground-item__image" src="${image}" alt="${title}" loading="lazy" />
        <figcaption class="playground-item__label">${title}</figcaption>
      </figure>
    `
    )
    .join("");

  document.body.innerHTML = `
    <div class="page">
      ${renderHeader("archive")}
      <main>
        <section class="playground-hero container container--content">
          <a class="playground-hero__back" href="${paths.home}">← BACK TO HOME</a>
          <h1 class="playground-hero__title fade-in">Playground</h1>
          <p class="playground-hero__desc fade-in">
            Series of past exeperiments and client work i've done along the years :]
          </p>
        </section>
        <section class="playground-grid container container--content">${itemsHtml}</section>
      </main>
      ${renderFooter()}
    </div>
  `;

  initCommon();
}

renderPlayground();
