/* ═══════════════════════════════════
   COMPONENTS — renders every section
═══════════════════════════════════ */

// ── Values ──
function renderValues() {
  const grid = document.getElementById('valuesGrid');
  if (!grid) return;
  grid.innerHTML = HOUSE_VALUES.map(v => `
    <div class="value-card">
      <span class="value-icon">${v.icon}</span>
      <h3>${v.title}</h3>
      <p>${v.body}</p>
    </div>
  `).join('');
}

// ── Members ──
function renderMembers() {
  const grid = document.getElementById('membersGrid');
  if (!grid) return;
  grid.innerHTML = MEMBERS.map((m, i) => `
    <div class="member-card" onclick="openMemberPanel(${i})" tabindex="0" role="button" aria-label="View ${m.name}'s profile">
      <div class="member-avatar">${m.name.trim()[0].toUpperCase()}</div>
      <div class="member-name">${m.name}</div>
      <div class="member-role">${m.role}</div>
      <div class="member-card-hint">Click to view profile →</div>
    </div>
  `).join('') + `
    <div class="member-card member-add" style="cursor:default;">
      <span style="font-size:1.4rem;color:var(--border);line-height:1;">+</span>
      <p style="font-size:0.72rem;color:var(--slate);text-align:center;line-height:1.5;">Add members<br/>in the JS data</p>
    </div>
  `;
}

// ── Works filter bar ──
function renderWorksFilter() {
  const f = document.getElementById('worksFilter');
  if (!f) return;
  const types = getAllTypes();
  f.innerHTML = types.map(t => {
    const count = t === "All" ? WORKS.length : WORKS.filter(w => w.type === t).length;
    return `<button class="filter-btn${t === activeFilter ? ' active' : ''}" onclick="setFilter('${t}')">${t === 'All' ? 'All' : TYPE_LABEL[t] || t}<span class="count">(${count})</span></button>`;
  }).join('');
}

function setFilter(type) {
  activeFilter = type;
  visibleCount = ITEMS_PER_PAGE;
  renderWorksFilter();
  renderWorksGrid();
}

function onSearch() {
  const input = document.getElementById('searchInput');
  searchQuery = input ? input.value : '';
  visibleCount = ITEMS_PER_PAGE;
  renderWorksGrid();
}

// ── Works grid (with pagination) ──
function renderWorksGrid() {
  const grid = document.getElementById('worksGrid');
  const loadWrap = document.getElementById('loadMoreWrap');
  if (!grid) return;

  const filtered = getFilteredWorks();
  const visible = filtered.slice(0, visibleCount);

  if (filtered.length === 0) {
    grid.innerHTML = `<div class="no-results">No works found. Try a different search or filter.</div>`;
    if (loadWrap) loadWrap.innerHTML = '';
    return;
  }

  grid.innerHTML = visible.map(w => {
    const realIdx = WORKS.indexOf(w);
    const isArg = w.type === "ARG";
    const readTime = getReadTime(w.content);
    return `
      <div class="work-card${isArg ? ' arg-card' : ''}" onclick="openWorkPanel(${realIdx})" tabindex="0" role="button" aria-label="Open ${w.title}">
        <span class="work-tag ${TYPE_TAG[w.type] || ''}">${TYPE_LABEL[w.type] || w.type}</span>
        <div class="work-title">${w.title}</div>
        <div class="work-author">by <span class="author-link" onclick="event.stopPropagation(); openAuthorPanel('${w.author.replace(/'/g, "\\'")}')" style="cursor:pointer;text-decoration:underline;text-decoration-color:var(--border);text-underline-offset:3px;" onmouseover="this.style.color='var(--yellow)'" onmouseout="this.style.color='var(--slate)'">${w.author}</span></div>
        <p class="work-excerpt">${w.excerpt}</p>
        ${isArg ? `<div class="arg-glitch">ERROR: FILE CORRUPTED — CONTINUE? [Y/N]</div>` : ''}
        <div class="work-footer">
          <span>${w.date}</span>
          <span class="read-time">${readTime}</span>
          <span class="work-read">${READ_LABEL[w.type] || 'Read →'}</span>
        </div>
      </div>
    `;
  }).join('') + `
    <div class="work-card work-submit">
      <div>
        <p>Have a story, poem, song, blogpost or ARG?</p>
        <p><strong>Submit to the House Moderator</strong> to be published here.</p>
      </div>
    </div>
  `;

  if (loadWrap) {
    if (filtered.length > visibleCount) {
      loadWrap.innerHTML = `<button class="load-more-btn" onclick="loadMore()">Load More (${filtered.length - visibleCount} remaining)</button>`;
    } else if (filtered.length > ITEMS_PER_PAGE && visibleCount >= filtered.length) {
      loadWrap.innerHTML = `<button class="load-more-btn" onclick="showLess()">Show Less</button>`;
    } else {
      loadWrap.innerHTML = '';
    }
  }
}

function loadMore() {
  visibleCount += ITEMS_PER_PAGE;
  renderWorksGrid();
}

function showLess() {
  visibleCount = ITEMS_PER_PAGE;
  renderWorksGrid();
  const section = document.getElementById('works');
  if (section) section.scrollIntoView({ behavior: 'smooth', block: 'start' });
}

// ── Author Pages ──
function openAuthorPanel(authorName) {
  const authorWorks = WORKS.filter(w => w.author === authorName);
  if (!authorWorks.length) return;

  const contentDiv = document.getElementById('workPanelContent');
  if (!contentDiv) return;

  contentDiv.innerHTML = `
    <div class="reading-top-bar">
      <span></span>
      <button class="reading-close-btn" onclick="closePanel()">✕ Close</button>
    </div>
    <div class="reading-layout">
      <h1 class="reading-title" style="margin-bottom:0.3rem;">${authorName}</h1>
      <p style="color:var(--slate);margin-bottom:2rem;">
        ${authorWorks.length} work${authorWorks.length > 1 ? 's' : ''} published
      </p>
      <div class="related-grid">
        ${authorWorks.map(w => {
          const ri = WORKS.indexOf(w);
          const readTime = getReadTime(w.content);
          return `
            <div class="related-card" onclick="switchToWork(${ri})" tabindex="0" role="button">
              <span class="work-tag ${TYPE_TAG[w.type] || ''}">${TYPE_LABEL[w.type] || w.type}</span>
              <div class="work-title">${w.title}</div>
              <div class="work-author">${w.date} · ${readTime}</div>
            </div>
          `;
        }).join('')}
      </div>
    </div>
  `;
  openPanel('workPanel');
  window.location.hash = `author-${encodeURIComponent(authorName)}`;
}

// ── Theme Toggle ──
function initThemeToggle() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;

  const toggleBtn = document.createElement('a');
  toggleBtn.href = '#';
  toggleBtn.textContent = '☀️';
  toggleBtn.title = 'Toggle theme';
  toggleBtn.style.cssText = 'font-size:0.85rem;padding:0.4rem 0.6rem;';
  toggleBtn.addEventListener('click', (e) => {
    e.preventDefault();
    toggleTheme();
  });
  nav.appendChild(toggleBtn);

  // Load saved theme
  const saved = localStorage.getItem('gh-theme');
  if (saved === 'light') setLightTheme();
}

function toggleTheme() {
  const isLight = document.body.classList.contains('light-theme');
  if (isLight) {
    setDarkTheme();
  } else {
    setLightTheme();
  }
}

function setLightTheme() {
  document.body.classList.add('light-theme');
  document.documentElement.style.setProperty('--yellow', '#C99D00');
  document.documentElement.style.setProperty('--black', '#F5F0E8');
  document.documentElement.style.setProperty('--card', '#FFFFFF');
  document.documentElement.style.setProperty('--card2', '#F0EDE5');
  document.documentElement.style.setProperty('--cream', '#0D0D0D');
  document.documentElement.style.setProperty('--slate', '#555');
  document.documentElement.style.setProperty('--border', 'rgba(201,157,0,0.25)');
  const toggle = document.querySelector('.nav-links a[title="Toggle theme"]');
  if (toggle) toggle.textContent = '🌙';
  localStorage.setItem('gh-theme', 'light');
}

function setDarkTheme() {
  document.body.classList.remove('light-theme');
  document.documentElement.style.setProperty('--yellow', '#F5C200');
  document.documentElement.style.setProperty('--black', '#0D0D0D');
  document.documentElement.style.setProperty('--card', '#161616');
  document.documentElement.style.setProperty('--card2', '#1E1E1E');
  document.documentElement.style.setProperty('--cream', '#F5F0E8');
  document.documentElement.style.setProperty('--slate', '#8A8A8A');
  document.documentElement.style.setProperty('--border', 'rgba(245,194,0,0.18)');
  const toggle = document.querySelector('.nav-links a[title="Toggle theme"]');
  if (toggle) toggle.textContent = '☀️';
  localStorage.setItem('gh-theme', 'dark');
}

// ── I'm Feeling Lucky ──
function randomWork() {
  if (!WORKS.length) return;
  const idx = Math.floor(Math.random() * WORKS.length);
  openWorkPanel(idx);
}