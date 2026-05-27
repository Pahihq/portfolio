const BADGES = [
  { id: "diverse", label: "DIVERSE", kind: "text" },
  { id: "designer", label: "DESIGNER", kind: "text" },
  { id: "multidisciplinary", label: "MULTIDISCIPLINARY", kind: "text" },
  { id: "russia", label: "RUSSIA", kind: "text" },
  { id: "star", label: "*", kind: "icon" },
  { id: "arrow", label: "↓", kind: "icon" },
];

const GRAVITY = 0.26;
const GRAVITY_INTRO = 0.12;
const BOUNCE = 0.3;
const BOUNCE_INTRO = 0.22;
const FRICTION = 0.88;
const AIR = 0.992;
const AIR_INTRO = 0.994;
const COLLISION_STEPS = 4;
const REST_VELOCITY = 0.025;
const SETTLE_FRAMES = 80;
const COLLISION_IMPULSE = 0.08;
const MAX_VX = 5.5;
const MAX_VY = 4.5;
const MAX_VY_INTRO = 2.2;
const SMOOTH = 0.2;
const SMOOTH_INTRO = 0.14;
const THROW_DAMPING = 0.52;
const MOBILE_WIDTH = 600;
const TITLE_GAP = 14;
const MOBILE_TITLE_GAP = 18;
const ROTATION_AIR = 0.988;
const ROTATION_BOUNCE = 0.72;
const REST_ANGULAR = 0.04;
const MAX_VA = 12;
const TORQUE = 0.022;
const DRAG_TORQUE = 0.18;

const clampVelocity = (chip, intro = false) => {
  const maxVy = intro ? MAX_VY_INTRO : MAX_VY;
  chip.vx = Math.max(-MAX_VX, Math.min(MAX_VX, chip.vx));
  chip.vy = Math.max(-maxVy, Math.min(maxVy, chip.vy));
  chip.va = Math.max(-MAX_VA, Math.min(MAX_VA, chip.va));
};

const normalizeAngleDelta = (delta) => {
  let value = delta;
  while (value > 180) value -= 360;
  while (value < -180) value += 360;
  return value;
};

const getRotatedHalfHeight = (chip) => {
  const rad = (chip.angle * Math.PI) / 180;
  return (Math.abs(Math.sin(rad)) * chip.w + Math.abs(Math.cos(rad)) * chip.h) / 2;
};

const getMaxChipY = (chip, bounds) =>
  bounds.textTop - bounds.titleGap - chip.h / 2 - getRotatedHalfHeight(chip);

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

  const getHeroTextZone = () => {
    const fieldRect = field.getBoundingClientRect();
    const words = titleRow.querySelectorAll(".hero__title-word");
    let textTop = Infinity;
    let textBottom = -Infinity;

    words.forEach((word) => {
      const rect = word.getBoundingClientRect();
      textTop = Math.min(textTop, rect.top);
      textBottom = Math.max(textBottom, rect.bottom);
    });

    if (!Number.isFinite(textTop)) {
      const titleRect = titleRow.getBoundingClientRect();
      textTop = titleRect.top;
      textBottom = titleRect.bottom;
    }

    const captionRow = titleRow.parentElement?.querySelector(".hero__caption-row");
    if (captionRow) {
      const captionRect = captionRow.getBoundingClientRect();
      textBottom = Math.max(textBottom, captionRect.bottom);
    }

    return {
      textTop: textTop - fieldRect.top,
      textBottom: textBottom - fieldRect.top,
    };
  };

  const getBounds = () => {
    const fieldRect = field.getBoundingClientRect();
    const { textTop, textBottom } = getHeroTextZone();
    const isMobile = fieldRect.width <= MOBILE_WIDTH;
    const titleGap = isMobile ? MOBILE_TITLE_GAP : TITLE_GAP;

    return {
      width: fieldRect.width,
      height: fieldRect.height,
      textTop,
      textBottom,
      wordsTop: textTop,
      wordsBottom: textBottom,
      wordHeight: Math.max(textBottom - textTop, 1),
      isMobile,
      titleGap,
      titleSafeBottom: textTop - titleGap,
      landingLine: textTop - titleGap,
    };
  };

  const clampChipAboveTitle = (chip, bounds) => {
    const maxY = getMaxChipY(chip, bounds);
    if (chip.y > maxY) {
      chip.y = maxY;
      if (chip.vy > 0) chip.vy = 0;
    }
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
      chip.y = bounds.textTop - chip.h - bounds.titleGap - 60 - Math.random() * 480;
      chip.displayX = chip.x;
      chip.displayY = chip.y;
      chip.vx = (Math.random() - 0.5) * 3.5;
      chip.vy = Math.random() * 0.45;
      chip.angle = (Math.random() - 0.5) * 40;
      chip.displayAngle = chip.angle;
      chip.va = (Math.random() - 0.5) * 2.5;
      chip.dropDelay = Math.floor(Math.random() * 38);
      chip.introDrop = true;
      chip.dragging = false;
    });
  };

  const applyTransform = (chip) => {
    if (chip.dragging) {
      chip.displayX = chip.x;
      chip.displayY = chip.y;
      chip.displayAngle = chip.angle;
    } else {
      const smooth = chip.introDrop ? SMOOTH_INTRO : SMOOTH;
      chip.displayX += (chip.x - chip.displayX) * smooth;
      chip.displayY += (chip.y - chip.displayY) * smooth;
      chip.displayAngle += (chip.angle - chip.displayAngle) * smooth;
    }

    chip.el.style.transformOrigin = "center center";
    const pivotX = chip.displayX + chip.w / 2;
    const pivotY = chip.displayY + chip.h / 2;
    chip.el.style.transform = `translate3d(${pivotX}px, ${pivotY}px, 0) rotate(${chip.displayAngle}deg) translate3d(${-chip.w / 2}px, ${-chip.h / 2}px, 0)`;
  };

  const applyDragTorque = (chip, prevX, prevY, nextX, nextY) => {
    const cx = chip.x + chip.w / 2;
    const cy = chip.y + chip.h / 2;
    const dx = nextX - prevX;
    const dy = nextY - prevY;
    const rx = cx - (prevX + chip.w / 2);
    const ry = cy - (prevY + chip.h / 2);
    chip.va += (rx * dy - ry * dx) * DRAG_TORQUE;
    chip.angle += chip.va * 0.35;
    clampVelocity(chip);
  };

  const stepChip = (chip, bounds) => {
    if (chip.dragging) return false;

    if (chip.dropDelay > 0) {
      chip.dropDelay -= 1;
      chip.x += chip.vx * 0.2;
      return true;
    }

    const intro = chip.introDrop;
    chip.vy += intro ? GRAVITY_INTRO : GRAVITY;
    const air = intro ? AIR_INTRO : AIR;
    chip.vx *= air;
    chip.vy *= air;
    chip.va *= ROTATION_AIR;
    chip.x += chip.vx;
    chip.y += chip.vy;
    chip.angle += chip.va;
    clampVelocity(chip, intro);
    clampChipAboveTitle(chip, bounds);

    if (chip.x < 0) {
      chip.x = 0;
      chip.vx *= -(intro ? BOUNCE_INTRO : BOUNCE);
      chip.va += chip.vy * TORQUE;
    } else if (chip.x + chip.w > bounds.width) {
      chip.x = bounds.width - chip.w;
      chip.vx *= -(intro ? BOUNCE_INTRO : BOUNCE);
      chip.va -= chip.vy * TORQUE;
    }

    const floor = getMaxChipY(chip, bounds);
    if (chip.y > floor) {
      chip.y = floor;
      const bounce = intro ? BOUNCE_INTRO : BOUNCE;
      if (Math.abs(chip.vy) > REST_VELOCITY) {
        chip.vy *= -bounce;
        chip.vx *= FRICTION;
        chip.va += chip.vx * TORQUE * 2.4;
      } else {
        chip.vy = 0;
        chip.vx *= 0.92;
        chip.va *= ROTATION_BOUNCE;
        if (intro) chip.introDrop = false;
      }
    }

    const minY = bounds.textTop - chip.h * 3.2 - getRotatedHalfHeight(chip);
    if (chip.y < minY && !chip.dragging) {
      chip.y = minY;
      if (chip.vy < 0) chip.vy *= -BOUNCE * 0.5;
    }

    clampChipAboveTitle(chip, bounds);

    return (
      Math.abs(chip.vx) > REST_VELOCITY ||
      Math.abs(chip.vy) > REST_VELOCITY ||
      Math.abs(chip.va) > REST_ANGULAR ||
      Math.abs(chip.x - chip.displayX) > 0.08 ||
      Math.abs(chip.y - chip.displayY) > 0.08 ||
      Math.abs(chip.angle - chip.displayAngle) > 0.08
    );
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

    state.forEach((chip) => {
      clampChipAboveTitle(chip, bounds);
    });

    // при перетаскивании — не даём провалиться сквозь другие блоки
    state.forEach((chip) => {
      if (!chip.dragging) return;
      for (let step = 0; step < COLLISION_STEPS; step++) {
        state.forEach((other) => {
          if (other !== chip) separate(chip, other);
        });
      }
      clampChipAboveTitle(chip, bounds);
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
    chip.introDrop = false;
    chip.el.setPointerCapture(event.pointerId);
    chip.el.classList.add("is-dragging");

    const fieldRect = field.getBoundingClientRect();
    chip.offsetX = event.clientX - fieldRect.left - chip.x;
    chip.offsetY = event.clientY - fieldRect.top - chip.y;
    chip.vx = 0;
    chip.vy = 0;
    chip.va = 0;
    chip.spinPointerAngle = Math.atan2(
      event.clientY - fieldRect.top - (chip.y + chip.h / 2),
      event.clientX - fieldRect.left - (chip.x + chip.w / 2)
    );

    startLoop();
  };

  const onPointerMove = (event, chip) => {
    if (!chip.dragging || event.pointerId !== activePointer) return;

    const fieldRect = field.getBoundingClientRect();
    const prevX = chip.x;
    const prevY = chip.y;
    const nextX = event.clientX - fieldRect.left - chip.offsetX;
    const nextY = event.clientY - fieldRect.top - chip.offsetY;

    chip.vx = chip.vx * 0.55 + (nextX - chip.x) * 0.38;
    chip.vy = chip.vy * 0.55 + (nextY - chip.y) * 0.38;
    chip.x = nextX;
    chip.y = nextY;

    const cx = chip.x + chip.w / 2;
    const cy = chip.y + chip.h / 2;
    const pointerAngle = Math.atan2(
      event.clientY - fieldRect.top - cy,
      event.clientX - fieldRect.left - cx
    );
    const spinDelta = normalizeAngleDelta((pointerAngle - chip.spinPointerAngle) * (180 / Math.PI));
    chip.angle += spinDelta;
    chip.va = chip.va * 0.45 + spinDelta * 0.55;
    chip.spinPointerAngle = pointerAngle;

    applyDragTorque(chip, prevX, prevY, nextX, nextY);
    clampChipAboveTitle(chip, getBounds());
    clampVelocity(chip);
    applyTransform(chip);
  };

  const onPointerUp = (event, chip) => {
    if (event.pointerId !== activePointer) return;
    chip.dragging = false;
    chip.el.classList.remove("is-dragging");
    chip.el.releasePointerCapture(event.pointerId);
    activePointer = null;

    chip.vx *= THROW_DAMPING;
    chip.vy *= THROW_DAMPING;
    chip.va *= THROW_DAMPING + 0.18;

    if (Math.hypot(chip.vx, chip.vy) < 0.5) {
      chip.vx = (Math.random() - 0.5) * 1.5;
      chip.vy = 0.2;
    }

    clampVelocity(chip);
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
    const bounds = getBounds();
    state.forEach((chip) => clampChipAboveTitle(chip, bounds));
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
    displayX: 0,
    displayY: 0,
    angle: 0,
    displayAngle: 0,
    vx: 0,
    vy: 0,
    va: 0,
    w: 0,
    h: 0,
    dragging: false,
    offsetX: 0,
    offsetY: 0,
    spinPointerAngle: 0,
    dropDelay: 0,
    introDrop: false,
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
        a.va += push * COLLISION_IMPULSE * 4;
        b.va -= push * COLLISION_IMPULSE * 4;
      } else {
        a.x += push;
        b.x -= push;
        a.vx += push * COLLISION_IMPULSE;
        b.vx -= push * COLLISION_IMPULSE;
        a.va -= push * COLLISION_IMPULSE * 4;
        b.va += push * COLLISION_IMPULSE * 4;
      }
      clampVelocity(a);
      clampVelocity(b);
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
    const bounce = upper.introDrop ? BOUNCE_INTRO : BOUNCE;
    upper.vy *= -bounce * 0.45;
    upper.vx += lower.vx * 0.08;
    upper.va += (upper.vx - lower.vx) * TORQUE * 3;
    lower.va += lower.vx * TORQUE;
    clampVelocity(upper, upper.introDrop);
    clampVelocity(lower, lower.introDrop);

    if (upper.introDrop && Math.abs(upper.vy) < REST_VELOCITY * 3) {
      upper.introDrop = false;
    }
  }
}
