// main.js — state, search, filters, sorting and hash routing for DealBeacon v3.
// One job: behaviour. Rendering lives in views.js, data lives in data.js.
import { CATEGORIES, STORES, DEALS, CHECKED_ON, dealById, discountOf, savingsOf } from './data.js';
import { dealCard, dealDetail, emptyState, spotlightCard, money } from './views.js';

const root = document.getElementById('app');
const searchInput = document.getElementById('search');
const categorySelect = document.getElementById('category');
const storeSelect = document.getElementById('store');
const discountSelect = document.getElementById('discount');
const sortSelect = document.getElementById('sort');
const countEl = document.getElementById('count');
const heroStatsEl = document.getElementById('hero-stats');
const spotlightEl = document.getElementById('spotlight');

const state = { q: '', category: 'All', store: 'All', minDiscount: 0, sort: 'discount' };

for (const c of CATEGORIES) {
  const o = document.createElement('option');
  o.value = c;
  o.textContent = `${c} (${DEALS.filter((d) => d.category === c).length})`;
  categorySelect.appendChild(o);
}
for (const s of STORES) {
  const o = document.createElement('option');
  o.value = s; o.textContent = s;
  storeSelect.appendChild(o);
}

// Hero stats and the spotlight are computed from the data, so they can
// never drift from the deals listed below them.
const totalSavings = DEALS.reduce((sum, d) => sum + savingsOf(d), 0);
const maxDiscount = Math.max(...DEALS.map(discountOf));
const newLowCount = DEALS.filter((d) => d.verdict === 'New low').length;
heroStatsEl.textContent =
  `${money(totalSavings)} total savings across all deals · up to ${maxDiscount}% off · ${newLowCount} all-time lows`;

const deepest = [...DEALS].sort((a, b) => discountOf(b) - discountOf(a))[0];
spotlightEl.innerHTML = spotlightCard(deepest);

const VERDICT_RANK = { 'New low': 0, 'Strong price': 1, 'Routine sale': 2 };

function applyFilters() {
  const q = state.q.trim().toLowerCase();
  let list = DEALS.filter((d) => {
    if (state.category !== 'All' && d.category !== state.category) return false;
    if (state.store !== 'All' && d.store !== state.store) return false;
    if (discountOf(d) < state.minDiscount) return false;
    if (q && !(d.name + ' ' + d.brand + ' ' + d.store).toLowerCase().includes(q)) return false;
    return true;
  });
  const sorts = {
    discount: (a, b) => discountOf(b) - discountOf(a),
    newlow: (a, b) => (VERDICT_RANK[a.verdict] - VERDICT_RANK[b.verdict]) || (discountOf(b) - discountOf(a)),
    savings: (a, b) => savingsOf(b) - savingsOf(a),
    low: (a, b) => a.sale - b.sale,
    high: (a, b) => b.sale - a.sale,
  };
  return list.sort(sorts[state.sort] ?? sorts.discount);
}

function renderList() {
  const list = applyFilters();
  countEl.textContent = `${list.length} of ${DEALS.length} deals · prices checked ${CHECKED_ON}`;
  root.innerHTML = list.length
    ? `<div class="grid">${list.map(dealCard).join('')}</div>`
    : emptyState();
}

function render() {
  const hash = location.hash;
  const m = hash.match(/^#\/deal\/([\w-]+)$/);
  if (m) {
    const deal = dealById(m[1]);
    root.innerHTML = deal ? dealDetail(deal) : `<p class="empty">That deal is not here. <a href="#/">Back to all deals</a></p>`;
    window.scrollTo(0, 0);
    return;
  }
  renderList();
}

searchInput.addEventListener('input', () => { state.q = searchInput.value; renderList(); });
categorySelect.addEventListener('change', () => { state.category = categorySelect.value; renderList(); });
storeSelect.addEventListener('change', () => { state.store = storeSelect.value; renderList(); });
discountSelect.addEventListener('change', () => { state.minDiscount = Number(discountSelect.value); renderList(); });
sortSelect.addEventListener('change', () => { state.sort = sortSelect.value; renderList(); });
window.addEventListener('hashchange', render);

render();
