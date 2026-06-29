/* ═══════════════════════════════════
   FEATURES — cool quick wins
   Reactions, Reading List, Word Count,
   Member of the Week, RSS trigger
═══════════════════════════════════ */

// ═══════════════════════════════════
// 1. REACTIONS — localStorage-based
// ═══════════════════════════════════

const REACTION_EMOJIS = ['💛', '🔥', '✍️', '📖', '⚡'];
const REACTION_KEY = 'gh-reactions'; // { "work-title": { "💛": 3, "🔥": 1 } }

function getReactions() {
  try {
    return JSON.parse(localStorage.getItem(REACTION_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function saveReactions(reactions) {
  localStorage.setItem(REACTION_KEY, JSON.stringify(reactions));
}

function addReaction(workTitle, emoji) {
  const reactions = getReactions();
  if (!reactions[workTitle]) reactions[workTitle] = {};
  if (!reactions[workTitle][emoji]) reactions[workTitle][emoji] = 0;
  reactions[workTitle][emoji]++;
  saveReactions(reactions);
  return reactions[workTitle];
}

function getWorkReactions(workTitle) {
  const reactions = getReactions();
  return reactions[workTitle] || {};
}

function renderReactions(workTitle, container) {
  const counts = getWorkReactions(workTitle);
  const total = Object.values(counts).reduce((sum, c) => sum + c, 0);

  let html = '<div class="reactions-wrap">';
  REACTION_EMOJIS.forEach(emoji => {
    const count = counts[emoji] || 0;
    html += `<button class="reaction-btn" onclick="event.stopPropagation(); handleReaction('${workTitle.replace(/'/g, "\\'")}', '${emoji}')" title="${emoji}">${emoji} <span class="reaction-count">${count}</span></button>`;
  });
  if (total > 0) {
    html += `<span class="reaction-total">${total} reaction${total > 1 ? 's' : ''}</span>`;
  }
  html += '</div>';
  container.innerHTML = html;
}

function handleReaction(workTitle, emoji) {
  const newCounts = addReaction(workTitle, emoji);
  const workIdx = WORKS.findIndex(w => w.title === workTitle);
  if (workIdx >= 0 && currentWorkIndex === workIdx) {
    const container = document.getElementById('reactionsContainer');
    if (container) renderReactions(workTitle, container);
  }
}


// ═══════════════════════════════════
// 2. READING LIST — localStorage-based
// ═══════════════════════════════════

const BOOKMARKS_KEY = 'gh-bookmarks'; // array of work indices

function getBookmarks() {
  try {
    return JSON.parse(localStorage.getItem(BOOKMARKS_KEY)) || [];
  } catch (e) {
    return [];
  }
}

function saveBookmarks(bookmarks) {
  localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
}

function toggleBookmark(workIdx) {
  const bookmarks = getBookmarks();
  const existing = bookmarks.indexOf(workIdx);
  if (existing >= 0) {
    bookmarks.splice(existing, 1);
  } else {
    bookmarks.push(workIdx);
  }
  saveBookmarks(bookmarks);
  updateBookmarkButton(workIdx);
  renderBookmarkList();
}

function isBookmarked(workIdx) {
  return getBookmarks().includes(workIdx);
}

function updateBookmarkButton(workIdx) {
  const btn = document.getElementById('bookmarkBtn');
  if (!btn) return;
  if (isBookmarked(workIdx)) {
    btn.textContent = '🔖 Saved';
    btn.style.color = 'var(--yellow)';
    btn.style.borderColor = 'var(--yellow)';
  } else {
    btn.textContent = '🔖 Save for Later';
    btn.style.color = '';
    btn.style.borderColor = '';
  }
}

function renderBookmarkList() {
  const container = document.getElementById('bookmarkList');
  if (!container) return;

  const bookmarks = getBookmarks();
  if (bookmarks.length === 0) {
    container.innerHTML = '<p style="color:var(--slate);font-size:0.75rem;text-align:center;padding:1rem;">No saved works yet. Click 🔖 on any work to save it.</p>';
    return;
  }

  container.innerHTML = bookmarks.map(idx => {
    const w = WORKS[idx];
    if (!w) return '';
    const readTime = getReadTime ? getReadTime(w.content) : '';
    return `
      <div class="bookmark-item" onclick="openWorkPanel(${idx}); closeBookmarkPanel();" style="cursor:pointer;padding:0.7rem 1rem;border-bottom:1px solid var(--border);display:flex;justify-content:space-between;align-items:center;transition:background 0.2s;" onmouseover="this.style.background='var(--card2)'" onmouseout="this.style.background='transparent'">
        <div>
          <span style="font-size:0.7rem;color:var(--yellow);">${TYPE_LABEL[w.type] || w.type}</span>
          <span style="font-size:0.85rem;color:var(--cream);margin-left:0.5rem;">${w.title}</span>
        </div>
        <span style="font-size:0.65rem;color:var(--slate);">${readTime}</span>
      </div>
    `;
  }).join('') + `
    <div style="text-align:center;padding:0.8rem;">
      <button onclick="clearBookmarks()" style="background:transparent;border:1px solid var(--border);color:var(--slate);font-size:0.6rem;padding:0.3rem 0.8rem;cursor:pointer;letter-spacing:0.05em;text-transform:uppercase;">Clear All</button>
    </div>
  `;
}

function clearBookmarks() {
  localStorage.removeItem(BOOKMARKS_KEY);
  renderBookmarkList();
}

function openBookmarkPanel() {
  const contentDiv = document.getElementById('memberPanelContent');
  if (!contentDiv) return;

  contentDiv.innerHTML = `
    <h3 style="font-family:'Cormorant Garamond',serif;font-size:1.4rem;color:var(--cream);margin-bottom:1.2rem;">📖 Your Reading List</h3>
    <div id="bookmarkList"></div>
  `;
  renderBookmarkList();
  openPanel('memberPanel');
}

function closeBookmarkPanel() {
  closePanel();
}

// Add bookmark button to nav
function initBookmarkNav() {
  const nav = document.querySelector('.nav-links');
  if (!nav) return;

  const bookmarkLink = document.createElement('a');
  bookmarkLink.href = '#';
  bookmarkLink.textContent = '📖';
  bookmarkLink.title = 'Reading List';
  bookmarkLink.style.cssText = 'font-size:0.85rem;padding:0.4rem 0.6rem;';
  bookmarkLink.addEventListener('click', (e) => {
    e.preventDefault();
    openBookmarkPanel();
  });
  nav.appendChild(bookmarkLink);
}


// ═══════════════════════════════════
// 3. WORD COUNT
// ═══════════════════════════════════

function getWordCount(content) {
  return content.split(/\s+/).filter(w => w.length > 0).length;
}

function getCharCount(content) {
  return content.replace(/\s/g, '').length;
}


// ═══════════════════════════════════
// 4. MEMBER OF THE WEEK (random)
// ═══════════════════════════════════

function getMemberOfTheWeek() {
  // Seed by week number so it stays the same all week
  const now = new Date();
  const weekNum = Math.floor((now - new Date(now.getFullYear(), 0, 1)) / (7 * 24 * 60 * 60 * 1000));
  const idx = weekNum % MEMBERS.length;
  return MEMBERS[idx];
}

function renderMemberOfTheWeek() {
  const motw = getMemberOfTheWeek();
  const section = document.getElementById('members');
  if (!section) return;

  // Remove old MOTW if exists
  const old = document.getElementById('motwBanner');
  if (old) old.remove();

  const banner = document.createElement('div');
  banner.id = 'motwBanner';
  banner.style.cssText = `
    background: linear-gradient(135deg, rgba(245,194,0,0.08), rgba(245,194,0,0.02));
    border: 1px solid var(--border);
    padding: 1.2rem 1.6rem;
    margin-bottom: 2rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
  `;
  banner.innerHTML = `
    <span style="font-size:0.6rem;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:var(--yellow);">⭐ Member of the Week</span>
    <span style="font-family:'Cormorant Garamond',serif;font-size:1.2rem;font-weight:700;color:var(--cream);">${motw.name}</span>
    <span style="font-size:0.7rem;color:var(--slate);">${motw.role}</span>
  `;

  const header = section.querySelector('.members-header');
  if (header) {
    header.after(banner);
  }
}


// ═══════════════════════════════════
// 5. PLAYLIST LINK (editable)
// ═══════════════════════════════════

const HOUSE_PLAYLIST = {
  title: 'Gandhi House Vibes',
  url: 'https://www.youtube.com/playlist?list=PLACEHOLDER', // ← Change this later
  description: 'The official Gandhi House YouTube playlist. Songs that match our energy.'
};

function renderPlaylistLink() {
  const section = document.getElementById('about');
  if (!section) return;

  // Remove old if exists
  const old = document.getElementById('playlistBanner');
  if (old) old.remove();

  const banner = document.createElement('div');
  banner.id = 'playlistBanner';
  banner.style.cssText = `
    margin-top: 2rem;
    padding: 1.5rem;
    border: 1px solid var(--border);
    display: flex;
    align-items: center;
    gap: 1rem;
    flex-wrap: wrap;
    cursor: pointer;
    transition: border-color 0.2s;
  `;
  banner.onmouseover = () => { banner.style.borderColor = 'var(--yellow)'; };
  banner.onmouseout = () => { banner.style.borderColor = 'var(--border)'; };
  banner.onclick = () => { window.open(HOUSE_PLAYLIST.url, '_blank'); };

  banner.innerHTML = `
    <span style="font-size:2rem;">🎵</span>
    <div style="flex:1;">
      <div style="font-family:'Cormorant Garamond',serif;font-size:1.1rem;font-weight:700;color:var(--cream);">${HOUSE_PLAYLIST.title}</div>
      <div style="font-size:0.72rem;color:var(--slate);margin-top:0.2rem;">${HOUSE_PLAYLIST.description}</div>
    </div>
    <span style="font-size:0.65rem;color:var(--yellow);font-weight:600;letter-spacing:0.08em;text-transform:uppercase;">Open →</span>
  `;

  const aboutRight = section.querySelector('.about-right');
  if (aboutRight) {
    aboutRight.appendChild(banner);
  }
}


// ═══════════════════════════════════
// 6. RSS FEED GENERATOR
// ═══════════════════════════════════

function generateRSS() {
  const siteUrl = window.location.origin + window.location.pathname.replace('index.html', '');
  const now = new Date().toUTCString();

  let items = '';
  WORKS.forEach((w, i) => {
    const pubDate = new Date(w.date).toUTCString();
    const url = siteUrl + '#work-' + i;
    const desc = escapeXML(w.excerpt || '');
    items += `
    <item>
      <title>${escapeXML(w.title)}</title>
      <link>${url}</link>
      <description>${desc} — by ${escapeXML(w.author)} · ${escapeXML(TYPE_LABEL[w.type] || w.type)}</description>
      <author>${escapeXML(w.author)}</author>
      <category>${escapeXML(w.type)}</category>
      <pubDate>${pubDate}</pubDate>
      <guid>${url}</guid>
    </item>`;
  });

  return `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0">
<channel>
  <title>Gandhi House — VWMS Works</title>
  <link>${siteUrl}</link>
  <description>Short stories, poems, songs, essays, blogposts, and ARGs from Gandhi House at VWMS.</description>
  <language>en</language>
  <lastBuildDate>${now}</lastBuildDate>
  ${items}
</channel>
</rss>`;
}

function escapeXML(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function downloadRSS() {
  const rss = generateRSS();
  const blob = new Blob([rss], { type: 'application/rss+xml' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'feed.xml';
  a.click();
  URL.revokeObjectURL(url);
}

// Show a small RSS link in footer
function initRSSLink() {
  const footer = document.querySelector('.footer-links');
  if (!footer) return;

  const rssLink = document.createElement('a');
  rssLink.href = '#';
  rssLink.textContent = 'RSS';
  rssLink.title = 'Download RSS feed';
  rssLink.addEventListener('click', (e) => {
    e.preventDefault();
    downloadRSS();
  });
  footer.appendChild(rssLink);
}