/* ============================================================
   ADITI DUBEY — PORTFOLIO JAVASCRIPT
   script.js
   ============================================================ */

/* ── HELPERS ─────────────────────────────────────────────────── */
function scrollToSection(id) {
  document.getElementById(id).scrollIntoView({ behavior: 'smooth' });
}

/* ── TYPEWRITER EFFECT ───────────────────────────────────────── */
const words    = ["Software Developer", "Data Analyst", "IT Associate", "Problem Solver"];
let wordIndex  = 0;
let charIndex  = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-el');

function typeWriter() {
  const currentWord = words[wordIndex];

  if (isDeleting) {
    charIndex--;
  } else {
    charIndex++;
  }

  typingEl.textContent = currentWord.substring(0, charIndex);

  let speed = isDeleting ? 50 : 100;

  if (!isDeleting && charIndex === currentWord.length) {
    speed = 2400;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting  = false;
    wordIndex   = (wordIndex + 1) % words.length;
    speed       = 350;
  }

  setTimeout(typeWriter, speed);
}

setTimeout(typeWriter, 800);

/* ── THEME TOGGLE ────────────────────────────────────────────── */
const themeBtn = document.getElementById('theme-btn');
const body     = document.body;

// Restore saved preference
if (localStorage.getItem('theme') === 'light') {
  applyLight();
}

function applyLight() {
  body.classList.add('light');
  themeBtn.querySelector('i').className = 'fas fa-sun';
}

function applyDark() {
  body.classList.remove('light');
  themeBtn.querySelector('i').className = 'fas fa-moon';
}

themeBtn.addEventListener('click', function () {
  if (body.classList.contains('light')) {
    applyDark();
    localStorage.setItem('theme', 'dark');
  } else {
    applyLight();
    localStorage.setItem('theme', 'light');
  }
});

/* ── MOBILE HAMBURGER MENU ───────────────────────────────────── */
const hamburger = document.getElementById('hamburger');
const mobileNav = document.getElementById('mobile-nav');

hamburger.addEventListener('click', function () {
  const isOpen = mobileNav.classList.toggle('open');
  hamburger.querySelector('i').className = isOpen ? 'fas fa-times' : 'fas fa-bars';
});

// Close mobile menu when a link is clicked
document.querySelectorAll('.mobile-nav-link').forEach(function (btn) {
  btn.addEventListener('click', function () {
    scrollToSection(btn.getAttribute('data-target'));
    mobileNav.classList.remove('open');
    hamburger.querySelector('i').className = 'fas fa-bars';
  });
});

/* ── SCROLL: PROGRESS BAR + NAV HIGHLIGHT + BACK-TO-TOP ─────── */
const nav      = document.getElementById('nav');
const progress = document.getElementById('progress');
const backTop  = document.getElementById('back-top');
const sections = ['hero', 'about', 'skills', 'projects', 'education', 'contact'];

window.addEventListener('scroll', function () {
  const scrolled = window.pageYOffset;
  const total    = document.body.scrollHeight - window.innerHeight;

  // Progress bar width
  progress.style.width = ((scrolled / total) * 100) + '%';

  // Frosted glass nav on scroll
  nav.classList.toggle('scrolled', scrolled > 60);

  // Back to top button
  backTop.classList.toggle('show', scrolled > 400);

  // Active nav link
  let current = 'hero';
  sections.forEach(function (id) {
    const sec = document.getElementById(id);
    if (sec && scrolled >= sec.offsetTop - 120) {
      current = id;
    }
  });

  document.querySelectorAll('.nav-link').forEach(function (link) {
    link.classList.toggle('active', link.getAttribute('data-target') === current);
  });
});

/* ── DESKTOP NAV LINK CLICKS ─────────────────────────────────── */
document.querySelectorAll('.nav-link').forEach(function (btn) {
  btn.addEventListener('click', function () {
    scrollToSection(btn.getAttribute('data-target'));
  });
});

/* ── BACK TO TOP BUTTON ──────────────────────────────────────── */
backTop.addEventListener('click', function () {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

/* ── SCROLL REVEAL (IntersectionObserver) ────────────────────── */
const revealObserver = new IntersectionObserver(function (entries) {
  entries.forEach(function (entry) {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(function (el) {
  revealObserver.observe(el);
});

/* ── PROJECT FILTER BUTTONS ──────────────────────────────────── */
document.querySelectorAll('.filter-btn').forEach(function (btn) {
  btn.addEventListener('click', function () {

    // Update active button
    document.querySelectorAll('.filter-btn').forEach(function (b) {
      b.classList.remove('active');
    });
    btn.classList.add('active');

    const filter = btn.getAttribute('data-filter');

    document.querySelectorAll('.proj-card').forEach(function (card) {
      const shouldShow = filter === 'all' || card.classList.contains(filter);

      if (shouldShow) {
        card.classList.remove('hidden');
        card.style.opacity = '0';
        setTimeout(function () {
          card.style.transition = 'opacity 0.3s ease';
          card.style.opacity    = '1';
        }, 30);
      } else {
        card.classList.add('hidden');
      }
    });
  });
});

/* ── CONTACT FORM SUBMIT ─────────────────────────────────────── */
const contactForm = document.getElementById('contact-form');
const toast       = document.getElementById('toast');
const toastMsg    = document.getElementById('toast-msg');

contactForm.addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('name').value.trim();
  toastMsg.textContent = 'Thanks ' + name + '! Your message was received. I\'ll get back to you shortly.';

  toast.classList.add('show');
  setTimeout(function () {
    toast.classList.remove('show');
  }, 4000);

  contactForm.reset();
});

/* ── SKILL TAG CLICK BOUNCE ──────────────────────────────────── */
document.querySelectorAll('.tag').forEach(function (tag) {
  tag.addEventListener('click', function () {
    tag.style.transform = 'scale(0.92)';
    setTimeout(function () {
      tag.style.transform = '';
    }, 150);
  });
});
