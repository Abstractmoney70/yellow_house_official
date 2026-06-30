/* ═══════════════════════════════════
   PANELS — work reader & member profiles
═══════════════════════════════════ */

let currentWorkIndex = -1;

// ── Work panel (reading experience) ──
function openWorkPanel(idx) {
  currentWorkIndex = idx;
  const w = WORKS[idx];
  if (!w) return;

  const isArg = w.type === "ARG";
  const isBlog = w.type === "Blogpost";
  const readTime = getReadTime(w.content);
  const wordCount = getWordCount(w.content);
  const charCount = getCharCount(w.content);
  const related = getRelatedWorks(w);

  let bodyClass = '';
  if (isArg) bodyClass = 'arg-body';
  else if (isBlog) bodyClass = 'blog-body';

  const contentDiv = document.getElementById('workPanelContent');
  if (!contentDiv) return;

  contentDiv.innerHTML = `
    <div class="reading-top-bar">
      <button class="reading-share-btn" onclick="copyWorkLink(${idx})" title="Copy link">🔗 Copy Link</button>
      <button class="reading-close-btn" onclick="closePanel()">✕ Close</button>
    </div>
    <div class="reading-layout">
      <span class="reading-type-badge ${TYPE_TAG[w.type] || ''}">${TYPE_LABEL[w.type] || w.type}</span>
      <h1 class="reading-title">${w.title}</h1>
      <div class="reading-meta">
        <span class="reading-author">by <span class="author-link" onclick="openAuthorPanel('${w.author.replace(/'/g, "\\'")}')" style="cursor:pointer;text-decoration:underline;text-decoration-color:rgba(255,255,255,0.15);text-underline-offset:4px;" onmouseover="this.style.color='#fff'" onmouseout="this.style.color='var(--yellow)'">${w.author}</span></span>
        <span class="reading-date">${w.date}</span>
        <span class="reading-time">${readTime}</span>
        <span class="reading-time">${wordCount} words · ${charCount} chars</span>
      </div>
      <div style="display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:0.5rem;margin-bottom:1.5rem;">
        <div id="reactionsContainer"></div>
        <button class="reading-share-btn" id="bookmarkBtn" onclick="toggleBookmark(${idx})" style="font-size:0.65rem;">${typeof isBookmarked === 'function' && isBookmarked(idx) ? '🔖 Saved' : '🔖 Save for Later'}</button>
      </div>
      <div class="reading-body ${bodyClass}">${escapeHTML(w.content)}</div>
      ${related.length ? `
        <div class="reading-related">
          <h3>You May Also Like</h3>
          <div class="related-grid">
            ${related.map(r => {
              const ri = WORKS.indexOf(r);
              return `
                <div class="related-card" onclick="switchToWork(${ri})" tabindex="0" role="button">
                  <span class="work-tag ${TYPE_TAG[r.type] || ''}">${TYPE_LABEL[r.type] || r.type}</span>
                  <div class="work-title">${r.title}</div>
                  <div class="work-author">by ${r.author}</div>
                </div>
              `;
            }).join('')}
          </div>
        </div>
      ` : ''}
    </div>
  `;
  openPanel('workPanel');
  window.location.hash = `work-${idx}`;

  // Populate reactions + bookmark
  setTimeout(() => {
    const reactionsDiv = document.getElementById('reactionsContainer');
    if (reactionsDiv && typeof renderReactions === 'function') {
      renderReactions(w.title, reactionsDiv);
    }
    if (typeof updateBookmarkButton === 'function') {
      updateBookmarkButton(idx);
    }
  }, 0);
}

// ── Member panel ──
function openMemberPanel(idx) {
  const m = MEMBERS[idx];
  if (!m) return;

  const memberWorks = WORKS.filter(w => m.works.includes(w.title));
  const worksHtml = memberWorks.length ? `
    <div class="member-panel-works">
      <h4>Works by ${m.name.split(' ')[0]}</h4>
      ${memberWorks.map(w => {
        const wi = WORKS.indexOf(w);
        return `<div class="member-work-link" onclick="switchToWork(${wi})" tabindex="0" role="button">
          ${w.title} <span>${TYPE_LABEL[w.type] || w.type}</span>
        </div>`;
      }).join('')}
    </div>
  ` : '';

  const contentDiv = document.getElementById('memberPanelContent');
  if (!contentDiv) return;

  contentDiv.innerHTML = `
    <div class="member-panel-header">
      <div class="member-panel-avatar">${m.name.trim()[0].toUpperCase()}</div>
      <div>
        <div class="member-panel-name">${m.name}</div>
        <div class="member-panel-role">${m.role}</div>
      </div>
    </div>
    <p class="member-panel-bio">${m.bio}</p>
    ${worksHtml}
  `;
  openPanel('memberPanel');
  window.location.hash = `member-${idx}`;
}

// ── Switch between works ──
function switchToWork(idx) {
  closePanel();
  setTimeout(() => openWorkPanel(idx), 150);
}

// ── Copy link to work ──
function copyWorkLink(idx) {
  const url = window.location.origin + window.location.pathname + `#work-${idx}`;
  navigator.clipboard.writeText(url).then(() => {
    const btn = document.querySelector('.reading-share-btn');
    if (btn) btn.textContent = '✓ Copied!';
    setTimeout(() => { if (btn) btn.textContent = '🔗 Copy Link'; }, 1500);
  }).catch(() => {
    alert('Link: ' + url);
  });
}

// ── Open / close panels ──
function openPanel(id) {
  const overlay = document.getElementById('overlay');
  const panel = document.getElementById(id);
  if (overlay) overlay.classList.add('open');
  if (panel) {
    panel.classList.add('open');
    panel.scrollTop = 0;
  }
  document.body.style.overflow = 'hidden';
  updateBackToTop();
}

function closePanel() {
  closeMobileMenu(); 
  const overlay = document.getElementById('overlay');
  const progress = document.getElementById('readingProgress');
  const backBtn = document.getElementById('backToTop');
  if (overlay) overlay.classList.remove('open');
  document.querySelectorAll('.panel').forEach(p => p.classList.remove('open'));
  document.body.style.overflow = '';
  if (progress) progress.style.width = '0%';
  if (backBtn) backBtn.classList.remove('visible');
  currentWorkIndex = -1;
  window.location.hash = '';
}

// ── Progress bar + back to top ──
function updateBackToTop() {
  const panel = document.querySelector('.panel.open');
  const backBtn = document.getElementById('backToTop');
  const progress = document.getElementById('readingProgress');
  if (!panel || !backBtn) return;

  if (panel.scrollTop > 400) {
    backBtn.classList.add('visible');
  } else {
    backBtn.classList.remove('visible');
  }

  if (progress && panel.id === 'workPanel') {
    const scrollHeight = panel.scrollHeight - panel.clientHeight;
    if (scrollHeight > 0) {
      progress.style.width = (panel.scrollTop / scrollHeight * 100) + '%';
    }
  }
}

function scrollPanelToTop() {
  const panel = document.querySelector('.panel.open');
  if (panel) panel.scrollTo({ top: 0, behavior: 'smooth' });
}
