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


/* ================= PAGE 3 : yahan apna text badlo ================= */
const CONFIG = {
  title:      "Love letter for her🧸",
  subtitle:   "Bas ek tap door hai...",
  hint:       "Teddy ke pet pe dil dabao 💛",

  letterTo:   "For future wife,",
  letter:     `Me bhale mene aapke sath kafi kam time spend kiya hai or wo bhi online but mujhe jesi ladki chahiye thi wo aap hi ho or aapke jesa koi bhi nhi hai or agar koi hoga bhi tab bhi me aapse hi pyar karunga kyuki aap pe hi mera dil aa gaya hai or me ab aapko bohot sari khushi dena chahta hu lifetime ke liye or me iss relationship ko itna acha bana dunga ki log bhi kahenge ki ha agar ladka or ladki dono hi sach dilse ache hona to sabse acha relationship rehta hai unka or me chahta hu ki aap bhi mera iss relationship ko bohot jyada acha banane me help karo hum dono ek dusre se ese pyar karenge jese aaj ki genration me hota hi nhi hai bohot jyada mujhe bas ab aapka hi sath chahiye hai aapka hi pyar,support,care,pure love chahiye hai..\n\nYe to bas starting hai hum dono dheere dheere or ache se aage badhenge sweetheart.`,
  letterFrom: "I love you so much meri pyari madam ji❤",

  nextButton: "Aakhri Page 💛",
  nextPage:   "page-4.html"
};

/* ================= PAGE 3 : logic ================= */
$('#title').textContent = CONFIG.title;
$('#sub').textContent = CONFIG.subtitle;
$('#hint').textContent = CONFIG.hint;
$('#nextLabel').textContent = CONFIG.nextButton;

startFloaters(['🌸', '🌼', '✨', '🍃', '💛', '🌷'], { count: 22, speed: [10, 20] });
tapSparkles(['💛', '🌸', '✨']);

let done = false;
$('#bellyBtn').addEventListener('click', async e => {
  if (done) return;
  done = true;
  burst(e.clientX, e.clientY, ['💛', '💖', '✨', '🌸'], 16);
  const overlay = $('#overlay'), scene = $('#scene');
  overlay.classList.add('show');
  await wait(500);
  scene.classList.add('s-env');      // envelope neeche girta hai
  await wait(1500);
  scene.classList.add('s-open');     // flap khulta hai
  await wait(1000);
  scene.classList.add('s-read');     // letter bahar aata hai
  await wait(1300);
  await typeText($('#lTo'), CONFIG.letterTo, 60);
  await typeText($('#lText'), CONFIG.letter, 34);
  await typeText($('#lFrom'), CONFIG.letterFrom, 60);
  reveal($('#nextSlot'));
});

$('#nextBtn').addEventListener('click', () => goTo(CONFIG.nextPage));
