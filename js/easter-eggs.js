/* ═══════════════════════════════════
   EASTER EGGS — secrets, codes, fun
═══════════════════════════════════ */

// ── Konami Code ──
const KONAMI = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'KeyB', 'KeyA'];
let konamiBuffer = [];

function initKonami() {
  document.addEventListener('keydown', (e) => {
    konamiBuffer.push(e.code);
    if (konamiBuffer.length > KONAMI.length) konamiBuffer.shift();
    if (konamiBuffer.join(',') === KONAMI.join(',')) {
      activateGlitchMode();
      konamiBuffer = [];
    }
  });
}

function activateGlitchMode() {
  document.body.style.transition = 'all 0.1s';
  document.body.style.filter = 'hue-rotate(180deg) contrast(1.5)';
  setTimeout(() => {
    document.body.style.filter = '';
    document.body.style.transition = 'all 0.5s';
  }, 800);

  const ticker = document.querySelector('.ticker-inner');
  if (ticker) {
    const orig = ticker.textContent;
    ticker.textContent = '⚠ GOLDFINCH PROTOCOL ACTIVE ⚠ ◆ YOU FOUND IT ◆ ◆ KEEP LOOKING ◆';
    setTimeout(() => { ticker.textContent = orig; }, 3000);
  }

  console.log('%c🐦 GOLDFINCH PROTOCOL ACTIVATED %c— keep digging.',
    'color:#F5C200;font-size:1.2rem;', 'color:#888;');
}

// ── Load from URL hash on page load ──
function loadFromHash() {
  const hash = window.location.hash;
  if (hash.startsWith('#work-')) {
    const idx = parseInt(hash.replace('#work-', ''));
    if (idx >= 0 && idx < WORKS.length) {
      setTimeout(() => openWorkPanel(idx), 100);
    }
  } else if (hash.startsWith('#member-')) {
    const idx = parseInt(hash.replace('#member-', ''));
    if (idx >= 0 && idx < MEMBERS.length) {
      setTimeout(() => openMemberPanel(idx), 100);
    }
  }
}

// ── 404 redirect trick (call from 404.html if needed) ──
function checkSecretPath() {
  const path = window.location.pathname.toLowerCase();
  const secrets = {
    '/secret/room7b': '🔑 You found Room 7B. The cipher begins here.',
    '/secret/goldfinch': '🐦 Goldfinch nest confirmed.',
    '/secret/vault': '🔒 Vault access pending. Awaiting authorization.'
  };
  if (secrets[path]) {
    console.log(secrets[path]);
  }
}