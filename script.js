const cat = document.querySelector(".cat");
const desktop = document.querySelector(".desktop");
const doc = document.querySelector(".doc");
const taskbar = document.querySelector(".taskbar");

const positions = [
  { x: 140, y: 420, label: "taskbar" },
  { x: 220, y: 180, label: "doc" },
  { x: 520, y: 190, label: "doc" },
  { x: 720, y: 420, label: "taskbar" },
];

let currentIndex = 0;
let isJumping = false;

function moveCat(targetX, targetY) {
  if (!cat || isJumping) return;
  isJumping = true;

  const startX = cat.offsetLeft;
  const startY = cat.offsetTop;
  const deltaX = targetX - startX;
  const deltaY = targetY - startY;
  const duration = 900;
  const startTime = performance.now();

  function animate(time) {
    const progress = Math.min((time - startTime) / duration, 1);
    const jumpArc = Math.sin(progress * Math.PI) * -90;
    cat.style.left = `${startX + deltaX * progress}px`;
    cat.style.top = `${startY + deltaY * progress + jumpArc}px`;

    if (progress < 1) {
      requestAnimationFrame(animate);
    } else {
      isJumping = false;
    }
  }

  requestAnimationFrame(animate);
}

function loopJump() {
  const target = positions[currentIndex];
  moveCat(target.x, target.y);
  currentIndex = (currentIndex + 1) % positions.length;
}

setInterval(loopJump, 2400);

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

desktop.addEventListener("click", (event) => {
  const rect = desktop.getBoundingClientRect();
  const x = clamp(event.clientX - rect.left - 40, 40, rect.width - 80);
  const y = clamp(event.clientY - rect.top - 40, 60, rect.height - 140);
  moveCat(x, y);
});

doc.addEventListener("mouseenter", () => {
  doc.classList.add("active");
});

doc.addEventListener("mouseleave", () => {
  doc.classList.remove("active");
});

taskbar.addEventListener("mouseenter", () => {
  taskbar.style.background = "rgba(29, 40, 76, 0.95)";
});

taskbar.addEventListener("mouseleave", () => {
  taskbar.style.background = "rgba(16, 24, 48, 0.9)";
});
