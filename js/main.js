/* ═══════════════════════════════════
   MAIN — init, events, glue
═══════════════════════════════════ */

function init() {
  // Render all sections
  renderValues();
  renderMembers();
  renderWorksFilter();
  renderWorksGrid();

  // Features
  initThemeToggle();
  initKonami();
  initBookmarkNav();
  initRSSLink();
  checkSecretPath();
  loadFromHash();
  renderMemberOfTheWeek();
  renderPlaylistLink();

  // Overlay click to close panels
  const overlay = document.getElementById('overlay');
  if (overlay) overlay.addEventListener('click', closePanel);

  // Keyboard: Escape to close, Enter to activate focused cards
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closePanel();
    if (e.key === 'Enter' && e.target.getAttribute('role') === 'button') {
      e.target.click();
    }

    // Arrow navigation between works in reading panel
    if (currentWorkIndex >= 0 && document.getElementById('workPanel')?.classList.contains('open')) {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
        e.preventDefault();
        const filtered = getFilteredWorks();
        const currentWork = WORKS[currentWorkIndex];
        const currentInFiltered = filtered.indexOf(currentWork);
        if (currentInFiltered < filtered.length - 1) {
          const nextWork = filtered[currentInFiltered + 1];
          switchToWork(WORKS.indexOf(nextWork));
        }
      }
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault();
        const filtered = getFilteredWorks();
        const currentWork = WORKS[currentWorkIndex];
        const currentInFiltered = filtered.indexOf(currentWork);
        if (currentInFiltered > 0) {
          const prevWork = filtered[currentInFiltered - 1];
          switchToWork(WORKS.indexOf(prevWork));
        }
      }
    }
  });

  // Scroll listeners for panels
  const workPanel = document.getElementById('workPanel');
  const memberPanel = document.getElementById('memberPanel');
  if (workPanel) workPanel.addEventListener('scroll', updateBackToTop);
  if (memberPanel) memberPanel.addEventListener('scroll', updateBackToTop);

  // Hash change (back/forward browser buttons)
  window.addEventListener('hashchange', loadFromHash);
}

// Fire when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

// ── Mobile menu ──
function toggleMobileMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburgerBtn');
  if (nav) nav.classList.toggle('open');
  if (btn) btn.classList.toggle('open');
}

function closeMobileMenu() {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburgerBtn');
  if (nav) nav.classList.remove('open');
  if (btn) btn.classList.remove('open');
}

// Close mobile menu when clicking overlay
document.addEventListener('click', (e) => {
  const nav = document.getElementById('navLinks');
  const btn = document.getElementById('hamburgerBtn');
  if (nav && nav.classList.contains('open') && !nav.contains(e.target) && !btn.contains(e.target)) {
    closeMobileMenu();
  }
});
