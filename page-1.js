/* ================= COMMON HELPERS (har page me same) ================= */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const wait = ms => new Promise(r => setTimeout(r, ms));

/* Dusre page pe smooth jaana */
function goTo(page) {
  document.body.classList.add('leaving');
  setTimeout(() => {
    if (window.parent !== window && window.parent.__previewGo) window.parent.__previewGo(page); // sirf preview ke liye
    else location.href = page;
  }, 650);
}

/* Upar ki taraf udte hearts / stars */
function startFloaters(emojis, { count = 22, min = 14, max = 34, speed = [9, 18] } = {}) {
  const box = $('.floaters');
  for (let i = 0; i < count; i++) {
    const s = document.createElement('span');
    s.textContent = emojis[Math.floor(Math.random() * emojis.length)];
    s.style.left = Math.random() * 100 + '%';
    s.style.fontSize = (min + Math.random() * (max - min)) + 'px';
    s.style.animationDuration = (speed[0] + Math.random() * (speed[1] - speed[0])) + 's';
    s.style.animationDelay = (-Math.random() * speed[1]) + 's';
    box.appendChild(s);
  }
}

/* Tap karne pe chhote sparkles */
function burst(x, y, emojis, n = 10) {
  for (let i = 0; i < n; i++) {
    const p = document.createElement('span');
    p.className = 'burst';
    p.textContent = emojis[i % emojis.length];
    const a = Math.random() * Math.PI * 2, d = 60 + Math.random() * 90;
    p.style.left = x + 'px';
    p.style.top = y + 'px';
    p.style.setProperty('--dx', Math.cos(a) * d + 'px');
    p.style.setProperty('--dy', Math.sin(a) * d + 'px');
    document.body.appendChild(p);
    setTimeout(() => p.remove(), 1100);
  }
}
function tapSparkles(emojis) {
  document.addEventListener('pointerdown', e => burst(e.clientX, e.clientY, emojis, 5));
}

/* Upar se neeche barsaat (hearts etc) */
function rain(emojis, n = 40) {
  for (let i = 0; i < n; i++) {
    const s = document.createElement('span');
    s.className = 'rain';
    s.textContent = emojis[i % emojis.length];
    s.style.left = Math.random() * 100 + 'vw';
    s.style.fontSize = (18 + Math.random() * 22) + 'px';
    s.style.animationDuration = (2 + Math.random() * 2) + 's';
    s.style.animationDelay = (Math.random() * 1.2) + 's';
    document.body.appendChild(s);
    setTimeout(() => s.remove(), 5500);
  }
}

/* Note ko typewriter jaise likhna (tap karoge to poora dikh jayega) */
async function typeText(el, text, speed = 40) {
  el.textContent = '';
  let skip = false;
  const stop = () => (skip = true);
  el.addEventListener('pointerdown', stop, { once: true });
  for (let i = 0; i < text.length && !skip; i++) {
    el.textContent += text[i];
    await wait(speed);
  }
  el.textContent = text;
}

/* Chhupa hua button/box smoothly dikhana */
function reveal(el) {
  el.classList.remove('hidden');
  el.classList.add('pop-in');
}


/* ================= PAGE 1 : yahan apna text badlo ================= */
const CONFIG = {
  hello:       "Heyy my love 🥰",
  title:       "Aapke liye ek chhota sa surprise hai...",
  openButton:  "Surprise Kholo",
  rainButton:  "Hearts barsao",
  hugButton:   "Teddy ko hug do",
  hugBubbles:  ["Aww thank you 🤗", "Mujhe bhi tumse pyaar hai 🧸", "Tight wala hug mil gaya 💕"],
  noteTitle:   "Meri pyaari si madam jii💕",
  note:        `Hi cutie pie.\n\nTo ye ek proposal hai for aapke liye iske andar meri dil ki baate likhi hai mene jo shayad apko pasand aaye.😊`,
  nextButton:  "Aage Chalo 💖",
  nextPage:    "page-2.html"
};

/* ================= PAGE 1 : logic (isse chhedna zaroori nahi) ================= */
$('#hello').textContent = CONFIG.hello;
$('#title').textContent = CONFIG.title;
$('#openLabel').textContent = CONFIG.openButton;
$('#rainLabel').textContent = CONFIG.rainButton;
$('#hugLabel').textContent = CONFIG.hugButton;
$('#noteTitle').textContent = CONFIG.noteTitle;
$('#nextLabel').textContent = CONFIG.nextButton;

startFloaters(['💖', '💗', '💕', '🌸', '✨', '🎀'], { count: 24 });
tapSparkles(['💖', '✨', '💕']);

const overlay = $('#overlay');
let opened = false;

$('#openBtn').addEventListener('click', async e => {
  if (opened) return;
  opened = true;
  burst(e.clientX, e.clientY, ['💖', '💌', '✨', '💕'], 14);
  overlay.classList.add('show');
  overlay.setAttribute('aria-hidden', 'false');
  await wait(900);
  await typeText($('#noteText'), CONFIG.note, 38);
  reveal($('#nextSlot'));
});

$('#nextBtn').addEventListener('click', () => goTo(CONFIG.nextPage));

$('#rainBtn').addEventListener('click', () => rain(['💗', '💖', '💕', '🌸', '💞'], 45));

const hero = $('#hero'), bubble = $('#bubble');
let hugN = 0, bubbleTimer;
function hug() {
  hero.classList.remove('squish'); void hero.offsetWidth; hero.classList.add('squish');
  const r = hero.getBoundingClientRect();
  burst(r.left + r.width / 2, r.top + r.height / 2, ['💗', '🤗', '💕', '✨'], 12);
  bubble.textContent = CONFIG.hugBubbles[hugN++ % CONFIG.hugBubbles.length];
  bubble.classList.add('show');
  clearTimeout(bubbleTimer);
  bubbleTimer = setTimeout(() => bubble.classList.remove('show'), 2400);
}
$('#hugBtn').addEventListener('click', hug);
hero.addEventListener('click', hug);
