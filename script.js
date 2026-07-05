// ============================================================
// ShefOS Reborn — CHAOS ENGINE
// ============================================================

const POPUP_IDS = ['popup-1', 'popup-2', 'popup-3', 'popup-4', 'popup-5'];
const openPopups = new Set();

function updateOverlay() {
  const overlay = document.getElementById('popup-overlay');
  if (!overlay) return;
  if (openPopups.size > 0) {
    overlay.classList.add('show');
  } else {
    overlay.classList.remove('show');
  }
}

function openPopup(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.add('show');
  openPopups.add(id);
  updateOverlay();
}

function closePopup(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.classList.remove('show');
  openPopups.delete(id);
  updateOverlay();
}

// stagger the popup invasion after page load
window.addEventListener('DOMContentLoaded', () => {
  const delays = [400, 3500, 7000, 10500, 14000];
  POPUP_IDS.forEach((id, i) => {
    setTimeout(() => openPopup(id), delays[i]);
  });
});

// ---------- toast notifications ----------
const TOAST_MESSAGES = [
  '⚠ Пингвин прибавил в весе',
  '🐧 320KG init: Done !',
  '☢ Systemd не обнаружен',
  '🔥 Новый пользователь скачал ShefOS',
  '💾 Свободно места: 0 байт',
  '🐧 Вес сайта увеличен на 1кг',
  '⚡ PENGVIN320KG_INIT активен',
];

function spawnToast() {
  const container = document.getElementById('toast-container');
  if (!container) return;
  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.textContent = TOAST_MESSAGES[Math.floor(Math.random() * TOAST_MESSAGES.length)];
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 5200);
}

setInterval(spawnToast, 3800);
setTimeout(spawnToast, 1500);

// ---------- emoji rain ----------
const RAIN_EMOJIS = ['🐧', '☢️', '🔥', '⚡', '💀'];

function spawnFallingEmoji() {
  const container = document.getElementById('emoji-rain');
  if (!container) return;
  const span = document.createElement('span');
  span.className = 'falling-emoji';
  span.textContent = RAIN_EMOJIS[Math.floor(Math.random() * RAIN_EMOJIS.length)];
  span.style.left = Math.random() * 100 + 'vw';
  const duration = 4 + Math.random() * 3;
  span.style.animationDuration = duration + 's';
  container.appendChild(span);
  setTimeout(() => span.remove(), duration * 1000 + 200);
}

setInterval(spawnFallingEmoji, 450);

// ---------- periodic screen shake burst ----------
function screenShakeBurst() {
  document.body.classList.add('shake');
  setTimeout(() => document.body.classList.remove('shake'), 600);
}

setInterval(screenShakeBurst, 9000);

// ---------- matrix rain background ----------
(function () {
  const canvas = document.getElementById('matrix-rain');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  const chars = 'アイウエオカキクケコサシスセソ01ABCDEF#$%&*+-=<>/root@shefos320kg'.split('');
  const fontSize = 16;
  let columns, drops;

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    columns = Math.floor(canvas.width / fontSize);
    drops = new Array(columns).fill(0).map(() => Math.random() * -100);
  }

  window.addEventListener('resize', resize);
  resize();

  function draw() {
    ctx.fillStyle = 'rgba(5, 7, 5, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.font = fontSize + 'px monospace';

    for (let i = 0; i < drops.length; i++) {
      const text = chars[Math.floor(Math.random() * chars.length)];
      const x = i * fontSize;
      const y = drops[i] * fontSize;

      const roll = Math.random();
      if (roll < 0.02) {
        ctx.fillStyle = '#ff1744';
      } else if (roll < 0.04) {
        ctx.fillStyle = '#ff00e6';
      } else {
        ctx.fillStyle = '#39ff14';
      }
      ctx.fillText(text, x, y);

      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(draw, 45);
})();
