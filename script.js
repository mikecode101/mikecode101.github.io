// ══════════════════════════════════════════════
// HERO BADGE TYPEWRITER
// ══════════════════════════════════════════════
const badgeTexts = ["Embedded Systems · IoT · PCB Design", "Firmware · RF · Open Source", "Hardware Hacking · Maker"];
let bTi = 0, bCi = 0, bDel = false, bTimer = null;

function typeBadge() {
  const badge = document.getElementById('hero-badge');
  if (!badge) return;
  const cur = badgeTexts[bTi];
  const prefix = '// ';
  if (!bDel) {
    badge.textContent = prefix + cur.slice(0, bCi++);
    if (bCi > cur.length) { bDel = true; bTimer = setTimeout(typeBadge, 1800); return; }
  } else {
    badge.textContent = prefix + cur.slice(0, bCi--);
    if (bCi < 0) { bDel = false; bTi = (bTi + 1) % badgeTexts.length; bTimer = setTimeout(typeBadge, 300); return; }
  }
  bTimer = setTimeout(typeBadge, bDel ? 28 : 52);
}

setTimeout(typeBadge, 200);

// ══════════════════════════════════════════════
// HAMBURGER MENU
// ══════════════════════════════════════════════
const hamburger = document.getElementById('nav-hamburger');
const mobileMenu = document.getElementById('mobile-menu');
if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const open = hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open', open);
  });
  mobileMenu.querySelectorAll('a[data-mob]').forEach(a => {
    a.addEventListener('click', () => {
      hamburger.classList.remove('open');
      mobileMenu.classList.remove('open');
    });
  });
}

// ══════════════════════════════════════════════
// CURSOR
// ══════════════════════════════════════════════
const dot = document.getElementById('cursor-dot');
const ring = document.getElementById('cursor-ring');
let mx=0, my=0, rx=0, ry=0;

document.addEventListener('mousemove', e => {
  mx=e.clientX; my=e.clientY;
  dot.style.left=mx+'px'; dot.style.top=my+'px';
  dot.style.opacity='1'; ring.style.opacity='0.5';
});
(function animRing(){rx+=(mx-rx)*.12;ry+=(my-ry)*.12;ring.style.left=rx+'px';ring.style.top=ry+'px';requestAnimationFrame(animRing);})();

let touchFadeTimer = null;
document.addEventListener('touchstart', e => {
  const t = e.touches[0];
  mx=t.clientX; my=t.clientY; rx=mx; ry=my;
  dot.style.transition='opacity 0s'; ring.style.transition='opacity 0s, border-color .2s, width .2s, height .2s';
  dot.style.left=mx+'px'; dot.style.top=my+'px';
  ring.style.left=rx+'px'; ring.style.top=ry+'px';
  dot.style.opacity='1'; ring.style.opacity='0.5';
  if (touchFadeTimer) clearTimeout(touchFadeTimer);
}, { passive: true });
document.addEventListener('touchend', () => {
  touchFadeTimer = setTimeout(() => {
    dot.style.transition='opacity 0.6s';
    ring.style.transition='opacity 0.6s, border-color .2s, width .2s, height .2s';
    dot.style.opacity='0';
    ring.style.opacity='0';
  }, 120);
}, { passive: true });

document.querySelectorAll('a,button,.project-card,.blog-card').forEach(el => {
  el.addEventListener('mouseenter', () => { ring.style.width='48px'; ring.style.height='48px'; ring.style.borderColor='var(--accent2)'; dot.style.background='var(--accent2)'; dot.style.boxShadow='0 0 12px var(--accent2)'; });
  el.addEventListener('mouseleave', () => { ring.style.width='32px'; ring.style.height='32px'; ring.style.borderColor='var(--accent)'; dot.style.background='var(--accent)'; dot.style.boxShadow='0 0 12px var(--accent)'; });
});

// ══════════════════════════════════════════════
// SCROLL REVEAL
// ══════════════════════════════════════════════
const revealObs = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// ══════════════════════════════════════════════
// SMOOTH SCROLL
// ══════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const href = a.getAttribute('href');
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      const t = document.querySelector(href);
      if (t) t.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// ══════════════════════════════════════════════
// CONTACT FORM
// ══════════════════════════════════════════════
let formTimeout = null;
const formSubmit = document.querySelector('.form-submit');
if (formSubmit) {
  formSubmit.addEventListener('click', e => {
    e.preventDefault();
    formSubmit.textContent = 'Sent! ✓';
    formSubmit.style.background = 'var(--accent2)';
    formSubmit.style.borderColor = 'var(--accent2)';
    formSubmit.style.color = '#000';
    if (formTimeout) clearTimeout(formTimeout);
    formTimeout = setTimeout(() => {
      formSubmit.textContent = 'Send Message →';
      formSubmit.style.background = '';
      formSubmit.style.borderColor = '';
      formSubmit.style.color = '';
    }, 3000);
  });
}
