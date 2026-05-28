import { projects, getAdjacentProjects, paths, ui } from "./data.js";
import { renderHeader, renderFooter, initCommon } from "./components.js";

export function initProjectPage(slug) {
  const project = projects[slug];
  if (!project) {
    window.location.href = paths.notFound;
    return;
  }

  const { prev, next } = getAdjacentProjects(slug);
  document.title = `${project.displayTitle} — Ника Саблина`;

  const servicesHtml = project.services.map((s) => `<span>${s}</span>`).join("");
  const toolsHtml = project.tools.map((t) => `<span>${t}</span>`).join("");
  const galleryHtml = project.images
    .map(
      (src) =>
        `<img class="project-gallery__image fade-in" src="${src}" alt="${project.displayTitle}" loading="lazy" />`
    )
    .join("");

  const nextLink = next
    ? `<a class="project-nav__link" href="${paths.project(next)}">${ui.project.nextProject}</a>`
    : "<span></span>";

  const breadcrumbTitle = project.breadcrumbTitle || project.displayTitle;
  const subtitleHtml = project.subtitle
    ? `<p class="project-hero__subtitle fade-in">${project.subtitle}</p>`
    : "";
  const sectionsHtml = project.sections?.length
    ? `<div class="project-sections container container--content">
        ${project.sections
          .map(
            (section) => `
          <section class="project-section fade-in">
            <h2 class="project-section__title">${section.title}</h2>
            <p class="project-section__text">${section.text}</p>
          </section>
        `
          )
          .join("")}
      </div>`
    : "";

  document.body.innerHTML = `
    <div class="page">
      ${renderHeader()}
      <main>
        <section class="project-hero container container--content">
          <nav class="breadcrumb" aria-label="${ui.a11y.breadcrumb}">
            <a href="${paths.home}">${ui.project.home}</a>
            <span class="breadcrumb__sep">/</span>
            <a href="${paths.works}">${ui.project.works}</a>
            <span class="breadcrumb__sep">/</span>
            <span>${breadcrumbTitle}</span>
          </nav>
          <h1 class="project-hero__title fade-in">${project.displayTitle}</h1>
          ${subtitleHtml}
          <p class="project-hero__description fade-in">${project.description}</p>
          <div class="project-meta fade-in">
            <div>
              <p class="project-meta__label">${ui.project.year}</p>
              <p class="project-meta__value">${project.year}</p>
            </div>
            <div>
              <p class="project-meta__label">${ui.project.services}</p>
              <div class="project-meta__list project-meta__value">${servicesHtml}</div>
            </div>
            <div>
              <p class="project-meta__label">${ui.project.tools}</p>
              <div class="project-meta__list project-meta__value">${toolsHtml}</div>
            </div>
          </div>
        </section>
        ${sectionsHtml}
        <section class="project-gallery container container--content">${galleryHtml}</section>
        <div class="container container--content project-nav">
          <a class="project-nav__link" href="${paths.home}">${ui.project.backHome}</a>
          ${nextLink}
        </div>
      </main>
      ${renderFooter()}
    </div>
  `;

  initCommon();
}
