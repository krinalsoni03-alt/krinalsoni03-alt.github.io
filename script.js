// ===== Typing effect in the hero =====
const words = ['Software Engineer', 'Test Automation Engineer', 'SQA Engineer', 'Problem Solver'];
const typed = document.getElementById('typed');
let wordIndex = 0, charIndex = 0, deleting = false;

function type() {
  const word = words[wordIndex];
  typed.textContent = word.slice(0, charIndex);

  if (!deleting && charIndex < word.length) charIndex++;
  else if (deleting && charIndex > 0) charIndex--;
  else if (!deleting) { deleting = true; return setTimeout(type, 1500); }
  else { deleting = false; wordIndex = (wordIndex + 1) % words.length; }

  setTimeout(type, deleting ? 60 : 110);
}
type();

// ===== Mobile menu =====
const menuBtn = document.querySelector('.menu-btn');
const nav = document.querySelector('.nav nav');
menuBtn.addEventListener('click', () => nav.classList.toggle('open'));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => nav.classList.remove('open')));

// ===== Reveal sections on scroll =====
document.querySelectorAll('.section').forEach(s => s.classList.add('reveal'));
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.15 });
document.querySelectorAll('.reveal').forEach(s => observer.observe(s));

// ===== Footer year =====
document.getElementById('year').textContent = new Date().getFullYear();

// ===== Color theme switcher (remembers your choice) =====
const themeButtons = document.querySelectorAll('.theme-picker button');
function setTheme(name) {
  document.documentElement.setAttribute('data-theme', name);
  themeButtons.forEach(b => b.classList.toggle('active', b.dataset.theme === name));
  try { localStorage.setItem('theme', name); } catch (e) {}
}
themeButtons.forEach(b => b.addEventListener('click', () => setTheme(b.dataset.theme)));
let savedTheme = 'sunset';
try { savedTheme = localStorage.getItem('theme') || 'sunset'; } catch (e) {}
setTheme(savedTheme);

// ===== Hero terminal: a "test run" on Krinal's profile =====
const narrow = window.innerWidth < 560;
const termPad = narrow ? 33 : 36;
const termRule = '='.repeat(termPad + 6);
const termLines = [
  ['cmd', '$ robot krinal_soni.robot'],
  ['dim', termRule],
  ['test', 'Experience Is 4+ Years'],
  ['test', 'Speaks Java, Python And SQL'],
  ['test', 'Automates With Selenium And Robot'],
  ['test', 'Ships Through Jenkins And Docker'],
  ['test', 'Finds Bugs Before Users Do'],
  ['dim', termRule],
  ['pass', '5 tests, 5 passed, 0 failed ✅']
];
const termOut = document.getElementById('terminal-output');
let termRow = 0;
function termNext() {
  if (termRow >= termLines.length) return;
  const [kind, text] = termLines[termRow++];
  const line = document.createElement('div');
  if (kind === 'test') {
    line.innerHTML = text.padEnd(termPad, '.').replace(/ /g, ' ') + ' <span class="pass">PASS</span>';
  } else {
    line.className = kind;
    line.textContent = text;
  }
  termOut.appendChild(line);
  setTimeout(termNext, kind === 'cmd' ? 700 : 380);
}
setTimeout(termNext, 600);

// ===== Bug Hunt game =====
const bugs = document.querySelectorAll('.bug');
const counter = document.querySelector('.bug-counter');
const foundEl = document.getElementById('bugs-found');
const toast = document.getElementById('toast');
const win = document.getElementById('win');
let found = 0, toastTimer;

function showToast(msg, ms = 3500) {
  toast.textContent = msg;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), ms);
}

const fixMessages = [
  'Bug #1 fixed ✅ Regression test added.',
  'Bug #2 fixed ✅ Root cause: missing semicolon 😄',
  'Bug #3 fixed ✅ Retested and closed in JIRA.',
  'Bug #4 fixed ✅ One more to go...'
];

bugs.forEach(bug => bug.addEventListener('click', () => {
  bug.classList.add('fixed');
  found++;
  foundEl.textContent = found;
  counter.classList.remove('pop'); void counter.offsetWidth; counter.classList.add('pop');
  if (found < bugs.length) {
    showToast(fixMessages[found - 1] || `Bug #${found} fixed ✅`);
  } else {
    counter.classList.add('done');
    toast.classList.remove('show');
    win.hidden = false;
    confetti();
  }
}));

counter.addEventListener('click', () => {
  showToast(found === bugs.length
    ? 'All bugs fixed. Zero open defects 🏆'
    : `🐞 ${bugs.length - found} bug${bugs.length - found > 1 ? 's are' : ' is'} still hiding. Scroll around and look closely!`);
});

document.getElementById('win-close').addEventListener('click', () => { win.hidden = true; });
document.getElementById('win-contact').addEventListener('click', () => { win.hidden = true; });

setTimeout(() => showToast('🐞 5 bugs are hiding on this page. Can you find and fix them all?', 5000), 4500);

function confetti() {
  const colors = ['--pink', '--orange', '--yellow', '--teal', '--purple']
    .map(v => getComputedStyle(document.documentElement).getPropertyValue(v));
  for (let i = 0; i < 120; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.left = Math.random() * 100 + 'vw';
    c.style.background = colors[i % colors.length];
    c.style.animationDuration = 2 + Math.random() * 2 + 's';
    c.style.animationDelay = Math.random() * .5 + 's';
    document.body.appendChild(c);
    setTimeout(() => c.remove(), 5000);
  }
}
