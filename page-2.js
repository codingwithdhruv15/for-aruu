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


/* ================= PAGE 2 : yahan apna text + photos/videos badlo ================= */
const CONFIG = {
  title:        "Kash is time hum dono ek sath hote🌙",
  subtitle:     "Teddy ke neeche wala button dabao...",
  startButton:  "Yahan Dabao",

  noteTitle:    "Meri jaan se bhi pyari madam jii✨",
  note:         `Madam jii\n\nMe na hamesha yahi sochta hu ki kash tum mere hi ghr pe rehti mere sath to hum dono ko ek dusre ko pyar karne ke liye ye duriya nhi hoti lekin mene ye soch rakha hai ki jab hum dono bade ho jayenge to sath me hi rahenge or shadi bhi karengi me tumhari family se baat karunga tumhe aapne bohot pass lane ke liye matlab sath rehne ke liye.`,
  noteHint:     "Thoda sa intezaar... 💫",
  noteButtonDelay: 10,                 // kitne second baad button aaye
  noteButton:   "Yaha dekhiye📸",

  galleryTitle: "Hamari Yaadein 💞",
  gallerySub:   "Madam jii ek baar meri ankho se dekh ke ddekhne ki koshish kariye or dekhiye ki aap kitni jyada pyari hai mere liye to duniya me aapse jyada sundar koi hai hi nhi or nhi kabhi hoga.",
  galleryHint:  "Ek surprise aur aane wala hai... 🎁",
  galleryButtonDelay: 10,              // kitne second baad button aaye
  galleryButton:"Aage Chalo 💖",

  nextPage:     "page-3.html"
};

/* ---------- PHOTOS / VIDEOS ----------
   1) Apni files 'media' naam ke folder me daalo (page-2.html ke saath wala folder)
   2) Neeche list me unka naam likhte jao. Limit koi nahi - jitni chaho utni.
   3) Photos: .jpg .jpeg .png .webp .gif   |   Videos: .mp4 .webm (mp4 sabse safe)
   Caption optional hai.                                                       */
const MEDIA_FOLDER = 'images/';
const MEDIA = [
  "1000032491.mp4",
  "1000032492.mp4",
  "1000032493.mp4",
  "1000032494.jpg",
  "1000032495.jpg",
  "1000032496.jpg",
  "1000032497.jpg",
  "1000032498.jpg",
  "1000032500.jpg",
  "1000032501.jpg",
  "1000032502.jpg",
  "1000032503.mp4",
];

/* ================= PAGE 2 : logic ================= */
$('#title').textContent = CONFIG.title;
$('#sub').textContent = CONFIG.subtitle;
$('#startLabel').textContent = CONFIG.startButton;
$('#noteTitle').textContent = CONFIG.noteTitle;
$('#noteHint').textContent = CONFIG.noteHint;
$('#noteNextLabel').textContent = CONFIG.noteButton;
$('#galTitle').textContent = CONFIG.galleryTitle;
$('#galSub').textContent = CONFIG.gallerySub;
$('#galHint').textContent = CONFIG.galleryHint;
$('#galNextLabel').textContent = CONFIG.galleryButton;

/* aasman ke taare */
(function stars() {
  const sky = $('.stars');
  for (let i = 0; i < 110; i++) {
    const s = document.createElement('i');
    const size = 1 + Math.random() * 2.4;
    s.style.cssText = `left:${Math.random() * 100}%;top:${Math.random() * 100}%;width:${size}px;height:${size}px;animation-delay:${Math.random() * 4}s;animation-duration:${2 + Math.random() * 3}s`;
    sky.appendChild(s);
  }
})();
startFloaters(['✨', '💫', '⭐', '💜', '🌟'], { count: 16, min: 12, max: 26, speed: [12, 22] });
tapSparkles(['✨', '⭐', '💜']);

/* progress bar wala timer */
function countdown(waitEl, secs) {
  const i = $('i', waitEl);
  i.style.animation = 'none'; void i.offsetWidth;
  i.style.animation = `fill ${secs}s linear forwards`;
  return wait(secs * 1000);
}

/* ---- Step 1 : teddy wala button -> note ---- */
const noteOverlay = $('#noteOverlay'), galOverlay = $('#galOverlay');
let started = false;
$('#startBtn').addEventListener('click', async e => {
  if (started) return;
  started = true;
  burst(e.clientX, e.clientY, ['✨', '💛', '⭐', '💫'], 14);
  noteOverlay.classList.add('show');
  const typing = wait(900).then(() => typeText($('#noteText'), CONFIG.note, 38));
  await Promise.all([typing, countdown($('#noteWait'), CONFIG.noteButtonDelay)]);
  $('#noteWait').classList.add('hidden');
  reveal($('#noteSlot'));
});

/* ---- Step 2 : note hatao -> photos/videos box ---- */
$('#noteNext').addEventListener('click', async () => {
  $('#noteBox').classList.add('closing');
  await wait(700);
  noteOverlay.classList.remove('show');
  await wait(300);
  galOverlay.classList.add('show');
  buildGrid();
  await countdown($('#galWait'), CONFIG.galleryButtonDelay);
  $('#galWait').classList.add('hidden');
  reveal($('#galSlot'));
});
$('#galNext').addEventListener('click', () => goTo(CONFIG.nextPage));

/* ---- Gallery ---- */
const items = MEDIA.map(m => {
  const o = typeof m === 'string' ? { file: m } : m;
  const remote = /^(https?:|data:)/.test(o.file);
  return {
    src: remote ? o.file : encodeURI(MEDIA_FOLDER + o.file),
    type: /\.(mp4|webm|mov|m4v|ogv)(\?.*)?$/i.test(o.file) ? 'video' : 'image',
    caption: o.caption || ''
  };
});

function buildGrid() {
  const grid = $('#grid');
  if (grid.children.length) return;

  // jab tak tumne photos nahi daali, ye demo boxes dikhenge
  if (!items.length) {
    const demo = [['📸', 'Yahan tumhari photo aayegi', '#ff9ec4,#b48cff'], ['🎥', 'Yahan video chalega', '#ffd86b,#ff8fd0'],
                  ['💞', 'Hamari yaad', '#7fd6ff,#b48cff'], ['🌹', 'Ek aur photo', '#ff8fd0,#ff7a7a'],
                  ['🎬', 'Ek aur video', '#9ef0c4,#7fd6ff'], ['🧸', 'Cute pal', '#ffb36b,#ff8fd0'],
                  ['✨', 'Special din', '#c9a4ff,#ff9ec4'], ['💖', 'Tum aur main', '#ff7aa8,#ffd86b']];
    demo.forEach(([e, t, g], i) => {
      const c = document.createElement('div');
      c.className = 'card ph';
      c.style.background = `linear-gradient(145deg,${g})`;
      c.style.setProperty('--r', ((i % 2 ? 1 : -1) * (1 + Math.random() * 2)).toFixed(1) + 'deg');
      c.style.setProperty('--d', (i * 0.09) + 's');
      c.innerHTML = `<div><b>${e}</b>${t}</div>`;
      grid.appendChild(c);
    });
    return;
  }

  const io = new IntersectionObserver(entries => {      // sirf jo screen pe dikh rahi hai wahi video chalegi
    entries.forEach(en => {
      const v = en.target;
      if (en.isIntersecting) v.play().catch(() => {}); else v.pause();
    });
  }, { root: grid, threshold: 0.4 });

  items.forEach((it, i) => {
    const c = document.createElement('div');
    c.className = 'card';
    c.style.setProperty('--r', ((i % 2 ? 1 : -1) * (0.6 + Math.random() * 2.2)).toFixed(1) + 'deg');
    c.style.setProperty('--d', (Math.min(i, 14) * 0.09) + 's');
    if (it.type === 'video') {
      const v = document.createElement('video');
      v.src = it.src; v.muted = true; v.loop = true; v.playsInline = true; v.preload = 'metadata';
      c.appendChild(v);
      c.insertAdjacentHTML('beforeend', '<span class="badge">▶</span>');
      io.observe(v);
    } else {
      const im = document.createElement('img');
      im.src = it.src; im.loading = 'lazy'; im.alt = it.caption || 'photo';
      c.appendChild(im);
    }
    if (it.caption) {
      const cap = document.createElement('div');
      cap.className = 'cap';
      cap.textContent = it.caption;
      c.appendChild(cap);
    }
    c.addEventListener('click', () => openLightbox(i));
    grid.appendChild(c);
  });
}

/* ---- Fullscreen viewer ---- */
const lb = $('#lightbox'), lbContent = $('#lbContent'), lbCap = $('#lbCap');
let cur = 0;
function openLightbox(i) {
  cur = (i + items.length) % items.length;
  const it = items[cur];
  lbContent.innerHTML = '';
  let el;
  if (it.type === 'video') { el = document.createElement('video'); el.controls = true; el.autoplay = true; el.playsInline = true; el.loop = true; }
  else el = document.createElement('img');
  el.src = it.src;
  lbContent.appendChild(el);
  lbCap.textContent = it.caption;
  lb.classList.add('show');
}
function closeLightbox() {
  lb.classList.remove('show');
  setTimeout(() => (lbContent.innerHTML = ''), 350);
}
$('#lbClose').addEventListener('click', closeLightbox);
$('#lbPrev').addEventListener('click', () => openLightbox(cur - 1));
$('#lbNext').addEventListener('click', () => openLightbox(cur + 1));
lb.addEventListener('click', e => { if (e.target === lb) closeLightbox(); });
document.addEventListener('keydown', e => {
  if (!lb.classList.contains('show')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') openLightbox(cur - 1);
  if (e.key === 'ArrowRight') openLightbox(cur + 1);
});
