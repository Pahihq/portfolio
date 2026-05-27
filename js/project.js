import { projects, getAdjacentProjects } from "./data.js";
import { renderHeader, renderFooter, initCommon } from "./components.js";

export function initProjectPage(slug) {
  const project = projects[slug];
  if (!project) {
    window.location.href = "/404.html";
    return;
  }

  const { prev, next } = getAdjacentProjects(slug);
  document.title = `${project.displayTitle} — Jenny Park`;

  const servicesHtml = project.services.map((s) => `<span>${s}</span>`).join("");
  const toolsHtml = project.tools.map((t) => `<span>${t}</span>`).join("");
  const galleryHtml = project.images
    .map(
      (src) =>
        `<img class="project-gallery__image fade-in" src="${src}" alt="${project.displayTitle}" loading="lazy" />`
    )
    .join("");

  const nextLink = next
    ? `<a class="project-nav__link" href="/${next}/">NEXT PROJECT →</a>`
    : "<span></span>";

  document.body.innerHTML = `
    <div class="page">
      ${renderHeader()}
      <main>
        <section class="project-hero container container--content">
          <nav class="breadcrumb" aria-label="Breadcrumb">
            <a href="/">Home</a>
            <span class="breadcrumb__sep">/</span>
            <a href="/#works">Works</a>
            <span class="breadcrumb__sep">/</span>
            <span>${project.displayTitle}</span>
          </nav>
          <h1 class="project-hero__title fade-in">${project.displayTitle}</h1>
          <p class="project-hero__description fade-in">${project.description}</p>
          <div class="project-meta fade-in">
            <div>
              <p class="project-meta__label">Year</p>
              <p class="project-meta__value">${project.year}</p>
            </div>
            <div>
              <p class="project-meta__label">Services</p>
              <div class="project-meta__list project-meta__value">${servicesHtml}</div>
            </div>
            <div>
              <p class="project-meta__label">Tools</p>
              <div class="project-meta__list project-meta__value">${toolsHtml}</div>
            </div>
          </div>
        </section>
        <section class="project-gallery container container--content">${galleryHtml}</section>
        <div class="container container--content project-nav">
          <a class="project-nav__link" href="/">← BACK TO HOME</a>
          ${nextLink}
        </div>
      </main>
      ${renderFooter()}
    </div>
  `;

  initCommon();
}
