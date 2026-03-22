/* ============================================================
   NAV — scroll class
   ============================================================ */

const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

/* ============================================================
   REVEAL ON SCROLL
   ============================================================ */

const revealEls = document.querySelectorAll('[data-reveal]');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      // stagger siblings inside the same parent
      const siblings = [...entry.target.parentElement.querySelectorAll('[data-reveal]')];
      const idx = siblings.indexOf(entry.target);
      entry.target.style.transitionDelay = `${idx * 80}ms`;
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

revealEls.forEach(el => revealObserver.observe(el));

/* ============================================================
   TERMINAL TYPEWRITER
   ============================================================ */

const sequences = [
  {
    cmd: 'whoami',
    out: 'noxxa — builder, tinkerer, operator of machines.'
  },
  {
    cmd: 'uptime',
    out: 'up 847 days, 3 hrs — no pages since deploy.'
  },
  {
    cmd: 'ls ./projects',
    out: 'noxxa-web/   tooling/   config/'
  },
  {
    cmd: 'cat manifesto.txt',
    out: 'ship fast. break nothing. automate the rest.'
  }
];

const cmdEl    = document.getElementById('term-cmd');
const outEl    = document.getElementById('term-output');
const cursorEl = document.getElementById('term-cursor');

let seqIdx = 0;

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

async function typeString(el, str, speed = 38) {
  for (const ch of str) {
    el.textContent += ch;
    await sleep(speed + Math.random() * 20);
  }
}

async function eraseString(el, speed = 22) {
  while (el.textContent.length > 0) {
    el.textContent = el.textContent.slice(0, -1);
    await sleep(speed);
  }
}

async function runTerminal() {
  await sleep(800);
  while (true) {
    const seq = sequences[seqIdx % sequences.length];
    seqIdx++;

    cursorEl.style.display = 'inline';
    await typeString(cmdEl, seq.cmd);
    cursorEl.style.display = 'none';

    await sleep(420);

    outEl.textContent = seq.out;
    await sleep(2800);

    outEl.textContent = '';
    await eraseString(cmdEl);

    cursorEl.style.display = 'inline';
    await sleep(500);
  }
}

runTerminal();

/* ============================================================
   FOOTER YEAR
   ============================================================ */

document.getElementById('year').textContent = new Date().getFullYear();
