const BADGES = [
  { id: "diverse", label: "DIVERSE", kind: "text" },
  { id: "designer", label: "DESIGNER", kind: "text", tilt: -12 },
  { id: "multidisciplinary", label: "MULTIDISCIPLINARY", kind: "text" },
  { id: "korean", label: "KOREAN", kind: "text" },
  { id: "star", label: "*", kind: "icon" },
  { id: "arrow", label: "↓", kind: "icon" },
];

const GRAVITY = 0.55;
const BOUNCE = 0.38;
const FRICTION = 0.82;
const DAMPING = 0.98;

/** Инициализация физики и перетаскивания бейджей */
export function initHeroBadges() {
  const field = document.getElementById("hero-badge-field");
  const titleRow = document.getElementById("hero-title-row");
  if (!field || !titleRow) return;

  field.innerHTML = BADGES.map(
    ({ id, label, kind, tilt = 0 }) => `
      <div
        class="hero-badge-chip${kind === "icon" ? " hero-badge-chip--icon" : ""}"
        data-badge="${id}"
        data-tilt="${tilt}"
      >${label}</div>
    `
  ).join("");

  const chips = [...field.querySelectorAll(".hero-badge-chip")];
  const state = chips.map((el, index) => createChipState(el, index));

  let rafId = 0;
  let activePointer = null;

  const getBounds = () => {
    const fieldRect = field.getBoundingClientRect();
    const titleRect = titleRow.getBoundingClientRect();
    return {
      width: fieldRect.width,
      height: fieldRect.height,
      floor: titleRect.top - fieldRect.top - 8,
    };
  };

  const layoutSizes = () => {
    state.forEach((chip) => {
      chip.w = chip.el.offsetWidth;
      chip.h = chip.el.offsetHeight;
    });
  };

  const scatterAbove = () => {
    const { width } = getBounds();
    state.forEach((chip, i) => {
      chip.x = (width / (state.length + 1)) * (i + 1) - chip.w / 2;
      chip.x += (Math.random() - 0.5) * 48;
      chip.y = -120 - Math.random() * 240;
      chip.vx = (Math.random() - 0.5) * 2.5;
      chip.vy = 0;
      chip.dragging = false;
    });
  };

  const applyTransform = (chip) => {
    const tilt = Number(chip.el.dataset.tilt) || 0;
    const rotate = tilt ? `rotate(${tilt}deg) ` : "";
    chip.el.style.transform = `${rotate}translate(${chip.x}px, ${chip.y}px)`;
  };

  const resolveCollisions = (bounds) => {
    state.forEach((chip) => {
      if (chip.dragging) return;

      if (chip.x < 0) {
        chip.x = 0;
        chip.vx *= -BOUNCE;
      } else if (chip.x + chip.w > bounds.width) {
        chip.x = bounds.width - chip.w;
        chip.vx *= -BOUNCE;
      }

      const floor = bounds.floor - chip.h;
      if (chip.y > floor) {
        chip.y = floor;
        if (Math.abs(chip.vy) > 0.4) {
          chip.vy *= -BOUNCE;
          chip.vx *= FRICTION;
        } else {
          chip.vy = 0;
          chip.vx *= 0.9;
        }
      }
    });

    for (let i = 0; i < state.length; i++) {
      for (let j = i + 1; j < state.length; j++) {
        separate(state[i], state[j]);
      }
    }
  };

  const tick = () => {
    const bounds = getBounds();
    let moving = false;

    state.forEach((chip) => {
      if (chip.dragging) {
        applyTransform(chip);
        return;
      }

      chip.vy += GRAVITY;
      chip.vx *= DAMPING;
      chip.vy *= DAMPING;
      chip.x += chip.vx;
      chip.y += chip.vy;

      if (Math.abs(chip.vx) > 0.05 || Math.abs(chip.vy) > 0.05) moving = true;

      applyTransform(chip);
    });

    resolveCollisions(bounds);

    if (moving || state.some((c) => c.dragging)) {
      rafId = requestAnimationFrame(tick);
    }
  };

  const startLoop = () => {
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(tick);
  };

  const onPointerDown = (event, chip) => {
    if (event.button !== 0) return;
    activePointer = event.pointerId;
    chip.dragging = true;
    chip.el.setPointerCapture(event.pointerId);
    chip.el.classList.add("is-dragging");

    const fieldRect = field.getBoundingClientRect();
    chip.offsetX = event.clientX - fieldRect.left - chip.x;
    chip.offsetY = event.clientY - fieldRect.top - chip.y;
    chip.vx = 0;
    chip.vy = 0;

    startLoop();
  };

  const onPointerMove = (event, chip) => {
    if (!chip.dragging || event.pointerId !== activePointer) return;

    const fieldRect = field.getBoundingClientRect();
    chip.x = event.clientX - fieldRect.left - chip.offsetX;
    chip.y = event.clientY - fieldRect.top - chip.offsetY;
    chip.vx = 0;
    chip.vy = 0;
    applyTransform(chip);
  };

  const onPointerUp = (event, chip) => {
    if (event.pointerId !== activePointer) return;
    chip.dragging = false;
    chip.el.classList.remove("is-dragging");
    chip.el.releasePointerCapture(event.pointerId);
    activePointer = null;
    chip.vx = (Math.random() - 0.5) * 3;
    chip.vy = -1;
    startLoop();
  };

  state.forEach((chip) => {
    chip.el.addEventListener("pointerdown", (e) => onPointerDown(e, chip));
    chip.el.addEventListener("pointermove", (e) => onPointerMove(e, chip));
    chip.el.addEventListener("pointerup", (e) => onPointerUp(e, chip));
    chip.el.addEventListener("pointercancel", (e) => onPointerUp(e, chip));
  });

  const dropIn = () => {
    layoutSizes();
    scatterAbove();
    state.forEach(applyTransform);
    startLoop();
  };

  const relayout = () => {
    layoutSizes();
    startLoop();
  };

  dropIn();

  window.addEventListener("resize", relayout);
  window.addEventListener("hero-title-fit", relayout);

  if (document.fonts?.ready) {
    document.fonts.ready.then(relayout);
  }
};

function createChipState(el, index) {
  return {
    el,
    index,
    x: 0,
    y: 0,
    vx: 0,
    vy: 0,
    w: 0,
    h: 0,
    dragging: false,
    offsetX: 0,
    offsetY: 0,
  };
}

function separate(a, b) {
  const dx = b.x + b.w / 2 - (a.x + a.w / 2);
  const dy = b.y + b.h / 2 - (a.y + a.h / 2);
  const overlapX = (a.w + b.w) / 2 - Math.abs(dx);
  const overlapY = (a.h + b.h) / 2 - Math.abs(dy);

  if (overlapX <= 0 || overlapY <= 0) return;

  if (overlapX < overlapY) {
    const push = (overlapX / 2) * (dx > 0 ? 1 : -1);
    if (!a.dragging) a.x -= push;
    if (!b.dragging) b.x += push;
  } else {
    const push = (overlapY / 2) * (dy > 0 ? 1 : -1);
    if (!a.dragging) a.y -= push;
    if (!b.dragging) b.y += push;
  }
}
