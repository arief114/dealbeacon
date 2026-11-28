// views.js — turns deals into HTML. One job: rendering, no state here.
import { discountOf, savingsOf, dealById } from './data.js';

export const CATEGORY_ICON = {
  Audio: '🎧',
  Laptops: '💻',
  'Phones & Wearables': '⌚',
  Tablets: '📲',
  TVs: '📺',
  Home: '🏠',
  Toys: '🧱',
  Gaming: '🎮',
  Accessories: '🔌',
};

const VERDICT_CLASS = {
  'New low': 'verdict-low',
  'Strong price': 'verdict-strong',
  'Routine sale': 'verdict-routine',
};

export function money(n) {
  return '$' + n.toLocaleString('en-US', { minimumFractionDigits: n % 1 ? 2 : 0, maximumFractionDigits: 2 });
}

export function verdictBadge(deal) {
  return `<span class="verdict ${VERDICT_CLASS[deal.verdict]}">${deal.verdict}</span>`;
}

export function dealCard(deal) {
  const pct = discountOf(deal);
  const save = savingsOf(deal);
  return `<article class="card" data-id="${deal.id}">
    <div class="card-top">
      <span class="cat">${CATEGORY_ICON[deal.category] ?? '🛍️'} ${deal.category}</span>
      ${verdictBadge(deal)}
    </div>
    <h3><a href="#/deal/${deal.id}">${deal.name}</a></h3>
    <p class="brand">${deal.brand} · ${deal.store}</p>
    <p class="prices"><span class="sale">${money(deal.sale)}</span>
      <span class="usual">${money(deal.usual)}</span>
      <span class="pct">−${pct}%</span></p>
    <p class="save">You save ${money(save)}</p>
    <p class="checked">✓ Price checked ${deal.checked}</p>
    <div class="card-actions">
      <a class="btn primary" href="#/deal/${deal.id}">See deal</a>
      <a class="btn" href="${deal.url}" target="_blank" rel="noopener">View at ${deal.store} ↗</a>
    </div>
  </article>`;
}

// The single deepest cut on the page, called out above the filters so the
// best bargain is the first thing a shopper sees.
export function spotlightCard(deal) {
  const pct = discountOf(deal);
  const save = savingsOf(deal);
  return `<article class="spotlight">
    <p class="spotlight-label">🔥 Deepest cut on this page — ${pct}% off</p>
    <h2><a href="#/deal/${deal.id}">${deal.name}</a></h2>
    <p class="brand">${deal.brand} · ${deal.store} · ${deal.category}</p>
    <p class="prices big"><span class="sale">${money(deal.sale)}</span>
      <span class="usual">${money(deal.usual)}</span>
      <span class="pct">−${pct}%</span></p>
    <p class="save big">You save ${money(save)}</p>
    <p class="note">${deal.note}</p>
    <div class="card-actions">
      <a class="btn primary big" href="${deal.url}" target="_blank" rel="noopener">View at ${deal.store} ↗</a>
      <a class="btn big" href="#/deal/${deal.id}">See deal</a>
    </div>
  </article>`;
}

export function dealDetail(deal) {
  const pct = discountOf(deal);
  const save = savingsOf(deal);
  const other = deal.compareWith ? dealById(deal.compareWith) : null;
  const compare = other
    ? `<section class="compare"><h2>Same product, other store</h2>
      <p><strong>${other.store}:</strong> ${money(other.sale)} (usual ${money(other.usual)}, −${discountOf(other)}%) —
      <a href="#/deal/${other.id}">${other.name}</a>.
      This listing is <strong>${money(Math.abs(deal.sale - other.sale))} ${deal.sale < other.sale ? 'cheaper' : 'dearer'}</strong> here.</p></section>`
    : '';
  return `<article class="detail">
    <p class="crumbs"><a href="#/">← All deals</a> · ${deal.category} · ${deal.store}</p>
    <div class="card-top">${verdictBadge(deal)}<span class="cat">${CATEGORY_ICON[deal.category] ?? '🛍️'} ${deal.category}</span></div>
    <h2>${deal.name}</h2>
    <p class="brand">${deal.brand} · sold by ${deal.store}</p>
    <p class="prices big"><span class="sale">${money(deal.sale)}</span>
      <span class="usual">${money(deal.usual)}</span>
      <span class="pct">−${pct}%</span></p>
    <p class="save big">You save ${money(save)} (${pct}% off the usual price)</p>
    <p class="note">${deal.note}</p>
    <p class="checked">✓ Price checked ${deal.checked}. Source: ${deal.source}. Prices can change or sell out — re-check at the store before you buy.</p>
    <div class="card-actions">
      <a class="btn primary big" href="${deal.url}" target="_blank" rel="noopener">View at ${deal.store} ↗</a>
      <a class="btn" href="#/">Back to all deals</a>
    </div>
    ${compare}
  </article>`;
}

export function emptyState() {
  return `<p class="empty">No deals match those filters. Try clearing the search or lowering the minimum discount.</p>`;
}
