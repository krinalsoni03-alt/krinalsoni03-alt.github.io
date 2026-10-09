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
