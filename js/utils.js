/* ═══════════════════════════════════
   UTILS — helpers & shared functions
═══════════════════════════════════ */

// ── Read time estimator ──
function getReadTime(content) {
  const words = content.split(/\s+/).length;
  const mins = Math.max(1, Math.round(words / 200));
  return mins === 1 ? '1 min read' : `${mins} min read`;
}

// ── Related works (same type, same author, keyword overlap) ──
function getRelatedWorks(currentWork, max = 3) {
  return WORKS
    .filter(w => w.title !== currentWork.title)
    .map(w => ({ work: w, score: 0 }))
    .map(item => {
      if (item.work.type === currentWork.type) item.score += 3;
      if (item.work.author === currentWork.author) item.score += 5;
      const words = currentWork.title.split(/\s+/);
      words.forEach(word => {
        if (word.length > 3 && item.work.title.toLowerCase().includes(word.toLowerCase())) item.score += 2;
      });
      return item;
    })
    .filter(item => item.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, max)
    .map(item => item.work);
}

// ── Filter + search ──
let activeFilter = "All";
let searchQuery = "";
let visibleCount = ITEMS_PER_PAGE;

function getFilteredWorks() {
  let filtered = WORKS;
  if (activeFilter !== "All") filtered = filtered.filter(w => w.type === activeFilter);
  if (searchQuery.trim()) {
    const q = searchQuery.toLowerCase();
    filtered = filtered.filter(w =>
      w.title.toLowerCase().includes(q) ||
      w.author.toLowerCase().includes(q) ||
      w.excerpt.toLowerCase().includes(q) ||
      (TYPE_LABEL[w.type] || w.type).toLowerCase().includes(q)
    );
  }
  return filtered;
}

// ── Generate all filter types from data ──
function getAllTypes() {
  return ["All", ...new Set(WORKS.map(w => w.type))];
}

// ── Escape HTML ──
function escapeHTML(str) {
  return str.replace(/</g, '&lt;').replace(/>/g, '&gt;');
}