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


/* ================= PAGE 4 : yahan apna text badlo ================= */
const CONFIG = {
  hello:       "Aur ab...",
  title:       "Ek aakhri sawaal 💍",
  askButton:   "Sawaal Dekho",

  noteTitle:   "Meri jaan, ek baat poochni hai",
  note:        `To meri madam jii kya aap hamesha ke liye sirf mujhpe bharosa karengi i promish to you me hamesha ache se rahunga kyuki kharab to me hu hi nhi or pyar to aapse hi karta hu\n\nHum dono hi ek dusre ko bohot pyar karte hai\n\nTo kya aap meri sirf partner nhi meri life partner banogi sweetheart? 💖`,

  yesButton:   "Haan! 💖",
  noButtons:   ["Sochna hai 🙈", "Pakka? 🥺", "Ek baar aur socho 🧸", "Me ro dunga 😭", "Mujhe pakadke dikhao 😜", "Haan bolo na 🥹"],

  yesTitle:    "Yaaay! 🎉",
  yesText:     `Thank you meri jaan.\nAb se me hamesha ke liye sirf tumhara hu or tum meri, hamesha. 💞`,
  replayButton:"🔁 Phir se dekho",
  replayPage:  "page-1.html"
};

/* ================= PAGE 4 : logic ================= */
$('#hello').textContent = CONFIG.hello;
$('#title').textContent = CONFIG.title;
$('#askLabel').textContent = CONFIG.askButton;
$('#noteTitle').textContent = CONFIG.noteTitle;
$('#yesLabel').textContent = CONFIG.yesButton;
$('#noBtn').textContent = CONFIG.noButtons[0];
$('#yesTitle').textContent = CONFIG.yesTitle;
$('#yesText').textContent = CONFIG.yesText;
$('#replay').textContent = CONFIG.replayButton;
$('#replay').href = CONFIG.replayPage;

startFloaters(['🎈', '💖', '✨', '🌹', '💗', '🎈'], { count: 20, min: 18, max: 40, speed: [10, 20] });
tapSparkles(['💖', '✨', '🌹']);

/* ---- sawaal wala note ---- */
let asked = false;
$('#askBtn').addEventListener('click', async e => {
  if (asked) return;
  asked = true;
  burst(e.clientX, e.clientY, ['💍', '💖', '✨', '🌹'], 14);
  $('#overlay').classList.add('show');
  await wait(900);
  await typeText($('#noteText'), CONFIG.note, 42);
  reveal($('#answers'));
});

/* ---- "Sochna hai" button bhaagta hai, "Haan" bada hota jata hai ---- */
const noBtn = $('#noBtn'), yesBtn = $('#yesBtn');
let noCount = 0;
function runAway(e) {
  if (e) e.preventDefault();
  noCount++;
  noBtn.textContent = CONFIG.noButtons[noCount % CONFIG.noButtons.length];
  yesBtn.style.setProperty('--ys', Math.min(1 + noCount * 0.12, 1.9));
  if (noBtn.parentElement !== document.body) document.body.appendChild(noBtn); // taaki poori screen pe bhaag sake
  noBtn.classList.add('run');
  const w = noBtn.offsetWidth, h = noBtn.offsetHeight, pad = 12;
  noBtn.style.left = pad + Math.random() * (window.innerWidth - w - pad * 2) + 'px';
  noBtn.style.top = pad + Math.random() * (window.innerHeight - h - pad * 2) + 'px';
}
noBtn.addEventListener('pointerenter', runAway);
noBtn.addEventListener('pointerdown', runAway);
noBtn.addEventListener('click', e => e.preventDefault());

/* ---- "Haan" dabate hi celebration ---- */
yesBtn.addEventListener('click', async e => {
  burst(e.clientX, e.clientY, ['💖', '🎉', '✨', '💍'], 18);
  noBtn.classList.add('hidden');
  $('.note-wrap').classList.add('gone');
  await wait(650);
  $('#overlay').classList.remove('show');
  $('#party').classList.add('show');
  celebrate();
});

function confetti(n = 70) {
  const colors = ['#ff5f9a', '#ffd27a', '#ffffff', '#ff8a6b', '#c9a4ff', '#7fe0ff'];
  for (let i = 0; i < n; i++) {
    const c = document.createElement('i');
    c.className = 'confetti';
    const size = 7 + Math.random() * 8;
    c.style.cssText = `left:${Math.random() * 100}vw;width:${size}px;height:${size * 1.6}px;background:${colors[i % colors.length]};border-radius:${Math.random() > .5 ? '50%' : '2px'};animation-duration:${2.6 + Math.random() * 2.4}s;animation-delay:${Math.random() * .8}s;--sx:${(Math.random() - .5) * 160}px;--rot:${(Math.random() > .5 ? 1 : -1) * (360 + Math.random() * 720)}deg`;
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 6500);
  }
}
function celebrate() {
  confetti(90);
  rain(['💖', '🎉', '💍', '🌹', '💞', '✨'], 40);
  let n = 0;
  const t = setInterval(() => {
    confetti(40);
    if (++n % 2 === 0) rain(['💖', '💗', '🎈'], 16);
    if (n >= 8) clearInterval(t);
  }, 1200);
}
