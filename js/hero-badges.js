const BADGES = [
  { id: "diverse", label: "DIVERSE", kind: "text" },
  { id: "designer", label: "DESIGNER", kind: "text" },
  { id: "multidisciplinary", label: "MULTIDISCIPLINARY", kind: "text" },
  { id: "korean", label: "KOREAN", kind: "text" },
  { id: "star", label: "*", kind: "icon" },
  { id: "arrow", label: "↓", kind: "icon" },
];

const GRAVITY = 0.52;
const BOUNCE = 0.44;
const FRICTION = 0.84;
const AIR = 0.998;
const COLLISION_STEPS = 5;
const REST_VELOCITY = 0.04;
const SETTLE_FRAMES = 65;
const COLLISION_IMPULSE = 0.14;

/** Инициализация физики и перетаскивания бейджей */
export function initHeroBadges() {
  const field = document.getElementById("hero-badge-field");
  const titleRow = document.getElementById("hero-title-row");
  if (!field || !titleRow) return;

  field.innerHTML = BADGES.map(
    ({ id, label, kind }) => {
      const inner =
        kind === "icon"
          ? label
          : `<span class="hero-badge-chip__label">${label}</span>`;

      return `
        <div
          class="hero-badge-chip${kind === "icon" ? " hero-badge-chip--icon" : ""}${id === "multidisciplinary" ? " hero-badge-chip--round" : ""}"
          data-badge="${id}"
        >${inner}</div>
      `;
    }
  ).join("");

  const chips = [...field.querySelectorAll(".hero-badge-chip")];
  const state = chips.map((el, index) => createChipState(el, index));

  let rafId = 0;
  let activePointer = null;
  let settleFrames = 0;

  const getTitleWordsRect = () => {
    const fieldRect = field.getBoundingClientRect();
    const words = titleRow.querySelectorAll(".hero__title-word");
    let top = Infinity;
    let bottom = -Infinity;

    words.forEach((word) => {
      const rect = word.getBoundingClientRect();
      top = Math.min(top, rect.top);
      bottom = Math.max(bottom, rect.bottom);
    });

    if (!Number.isFinite(top)) {
      const titleRect = titleRow.getBoundingClientRect();
      top = titleRect.top;
      bottom = titleRect.top + titleRect.height * 0.55;
    }

    return {
      top: top - fieldRect.top,
      bottom: bottom - fieldRect.top,
    };
  };

  const getBounds = () => {
    const fieldRect = field.getBoundingClientRect();
    const words = getTitleWordsRect();
    const wordHeight = Math.max(words.bottom - words.top, 1);

    return {
      width: fieldRect.width,
      height: fieldRect.height,
      wordsTop: words.top,
      wordsBottom: words.bottom,
      wordHeight,
      // линия приземления — слегка на верхний край JENNY / PARK
      landingLine: words.top + wordHeight * 0.1,
    };
  };

  const layoutSizes = () => {
    state.forEach((chip) => {
      chip.w = chip.el.offsetWidth;
      chip.h = chip.el.offsetHeight;
    });
  };

  const scatterAbove = () => {
    const bounds = getBounds();
    state.forEach((chip) => {
      chip.x = Math.random() * Math.max(bounds.width - chip.w - 16, 1) + 8;
      chip.y = bounds.wordsTop - chip.h - 60 - Math.random() * 480;
      chip.vx = (Math.random() - 0.5) * 8;
      chip.vy = Math.random() * 3 + 0.5;
      chip.dropDelay = Math.floor(Math.random() * 22);
      chip.dragging = false;
    });
  };

  const applyTransform = (chip) => {
    chip.el.style.transform = `translate3d(${chip.x}px, ${chip.y}px, 0)`;
  };

  const stepChip = (chip, bounds) => {
    if (chip.dragging) return false;

    if (chip.dropDelay > 0) {
      chip.dropDelay -= 1;
      chip.x += chip.vx * 0.35;
      return true;
    }

    chip.vy += GRAVITY;
    chip.vx *= AIR;
    chip.vy *= AIR;
    chip.x += chip.vx;
    chip.y += chip.vy;

    if (chip.x < 0) {
      chip.x = 0;
      chip.vx *= -BOUNCE;
    } else if (chip.x + chip.w > bounds.width) {
      chip.x = bounds.width - chip.w;
      chip.vx *= -BOUNCE;
    }

    const floor = bounds.landingLine - chip.h;
    if (chip.y > floor) {
      chip.y = floor;
      if (Math.abs(chip.vy) > REST_VELOCITY) {
        chip.vy *= -BOUNCE;
        chip.vx *= FRICTION;
      } else {
        chip.vy = 0;
        chip.vx *= 0.92;
      }
    }

    const minY = bounds.wordsTop - chip.h * 0.5;
    if (chip.y < minY && !chip.dragging) {
      chip.y = minY;
      if (chip.vy < 0) chip.vy *= -BOUNCE * 0.5;
    }

    return Math.abs(chip.vx) > REST_VELOCITY || Math.abs(chip.vy) > REST_VELOCITY;
  };

  const resolveCollisions = () => {
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
        moving = true;
        return;
      }
      if (stepChip(chip, bounds)) moving = true;
    });

    for (let step = 0; step < COLLISION_STEPS; step++) {
      resolveCollisions();
    }

    // при перетаскивании — не даём провалиться сквозь другие блоки
    state.forEach((chip) => {
      if (!chip.dragging) return;
      for (let step = 0; step < COLLISION_STEPS; step++) {
        state.forEach((other) => {
          if (other !== chip) separate(chip, other);
        });
      }
    });

    state.forEach(applyTransform);

    if (moving || state.some((c) => c.dragging)) settleFrames = 0;
    else settleFrames += 1;

    if (moving || state.some((c) => c.dragging) || settleFrames < SETTLE_FRAMES) {
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
    const nextX = event.clientX - fieldRect.left - chip.offsetX;
    const nextY = event.clientY - fieldRect.top - chip.offsetY;

    chip.vx = (nextX - chip.x) * 0.72;
    chip.vy = (nextY - chip.y) * 0.72;
    chip.x = nextX;
    chip.y = nextY;
    applyTransform(chip);
  };

  const onPointerUp = (event, chip) => {
    if (event.pointerId !== activePointer) return;
    chip.dragging = false;
    chip.el.classList.remove("is-dragging");
    chip.el.releasePointerCapture(event.pointerId);
    activePointer = null;

    if (Math.hypot(chip.vx, chip.vy) < 0.8) {
      chip.vx = (Math.random() - 0.5) * 3;
      chip.vy = -1.5;
    }

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
    settleFrames = 0;
    state.forEach(applyTransform);
    startLoop();
  };

  const relayout = () => {
    layoutSizes();
    settleFrames = 0;
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
    dropDelay: 0,
  };
}

function separate(a, b) {
  const dx = b.x + b.w / 2 - (a.x + a.w / 2);
  const dy = b.y + b.h / 2 - (a.y + a.h / 2);
  const overlapX = (a.w + b.w) / 2 - Math.abs(dx);
  const overlapY = (a.h + b.h) / 2 - Math.abs(dy);

  if (overlapX <= 0 || overlapY <= 0) return;

  if (overlapX < overlapY) {
    if (a.dragging && !b.dragging) {
      a.x = dx > 0 ? b.x - a.w : b.x + b.w;
      return;
    }
    if (b.dragging && !a.dragging) {
      b.x = dx > 0 ? a.x + a.w : a.x - a.w;
      return;
    }
    if (!a.dragging && !b.dragging) {
      const push = overlapX * 0.5;
      if (dx > 0) {
        a.x -= push;
        b.x += push;
        a.vx -= push * COLLISION_IMPULSE;
        b.vx += push * COLLISION_IMPULSE;
      } else {
        a.x += push;
        b.x -= push;
        a.vx += push * COLLISION_IMPULSE;
        b.vx -= push * COLLISION_IMPULSE;
      }
    }
    return;
  }

  const upper = dy > 0 ? a : b;
  const lower = dy > 0 ? b : a;

  // верхний блок ложится на нижний — нижний не двигаем
  if (upper.dragging) {
    upper.y = lower.y - upper.h;
    return;
  }

  if (lower.dragging) {
    lower.y = upper.y + upper.h;
    return;
  }

  upper.y = lower.y - upper.h;

  if (upper.vy > 0) {
    upper.vy *= -BOUNCE * 0.55;
    upper.vx += lower.vx * 0.12;
  }
}
