/* ─────────────── NAVBAR ─────────────── */
const navbar = document.getElementById('navbar');
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  updateActiveLink();
});

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close mobile menu on link click
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

/* ─────────────── ACTIVE NAV LINK ─────────────── */
function updateActiveLink() {
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-link');
  let current = '';

  sections.forEach(sec => {
    if (window.scrollY >= sec.offsetTop - 120) current = sec.id;
  });

  links.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

/* ─────────────── SCROLL REVEAL ─────────────── */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

/* ─────────────── TYPEWRITER ─────────────── */
const roles = [
  'Full Stack Developer',
  'Frontend Engineer',
  'React Enthusiast',
  'Problem Solver'
];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById('typedText');

function typeWriter() {
  const currentRole = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = currentRole.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedEl.textContent = currentRole.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentRole.length) {
    setTimeout(() => { isDeleting = true; typeWriter(); }, 2000);
    return;
  }
  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    roleIndex = (roleIndex + 1) % roles.length;
  }
  setTimeout(typeWriter, isDeleting ? 60 : 100);
}

typeWriter();

/* ─────────────── FOOTER YEAR ─────────────── */
document.getElementById('year').textContent = new Date().getFullYear();

/* ─────────────── CONTACT FORM ─────────────── */
function sendMessage() {
  const name = document.getElementById('name').value.trim();
  const email = document.getElementById('email').value.trim();
  const message = document.getElementById('message').value.trim();

  if (!name || !email || !message) {
    showToast('Please fill in all fields.', 'error');
    return;
  }
  if (!isValidEmail(email)) {
    showToast('Please enter a valid email address.', 'error');
    return;
  }

  // Simulate send
  showToast('Message sent! I\'ll get back to you soon. 🚀', 'success');
  document.getElementById('name').value = '';
  document.getElementById('email').value = '';
  document.getElementById('message').value = '';
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

/* ─────────────── TOAST ─────────────── */
function showToast(msg, type = 'success') {
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = msg;

  Object.assign(toast.style, {
    position: 'fixed', bottom: '2rem', right: '2rem', zIndex: '9999',
    padding: '1rem 1.5rem', borderRadius: '12px',
    fontFamily: 'DM Sans, sans-serif', fontSize: '0.9rem', fontWeight: '500',
    color: '#fff', maxWidth: '320px',
    background: type === 'success'
      ? 'linear-gradient(135deg, #1d4ed8, #3b82f6)'
      : 'linear-gradient(135deg, #dc2626, #ef4444)',
    boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
    transform: 'translateY(20px)', opacity: '0',
    transition: 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)'
  });

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.transform = 'translateY(0)';
    toast.style.opacity = '1';
  });
  setTimeout(() => {
    toast.style.transform = 'translateY(20px)';
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* ─────────────── SKILL BADGE STAGGER ─────────────── */
document.querySelectorAll('.skill-badge').forEach((badge, i) => {
  badge.style.animationDelay = `${i * 0.06}s`;
});
