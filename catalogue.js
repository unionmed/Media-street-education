// Progressive enhancement: all programmes remain readable without JavaScript.
const filters = document.querySelector('#catalogue-filters');
const cards = [...document.querySelectorAll('.programme-card')];
const count = document.querySelector('#result-count');
const empty = document.querySelector('#no-results');
const arabic = document.documentElement.lang === 'ar';
const normalise = text => text.toLocaleLowerCase().normalize('NFKD').replace(/[\u0300-\u036f\u064b-\u065f\u0670]/g, '').replace(/[أإآ]/g, 'ا').trim();

function filterProgrammes() {
  const values = new FormData(filters);
  const words = normalise(values.get('query') || '').split(/\s+/).filter(Boolean);
  let visible = 0;
  for (const card of cards) {
    const matchesText = words.every(word => normalise(card.textContent).includes(word));
    const matchesFilters = ['category','provider','level','outcome'].every(key => !values.get(key) || values.get(key) === card.dataset[key]);
    card.hidden = !(matchesText && matchesFilters);
    if (!card.hidden) visible++;
  }
  count.textContent = arabic ? `${visible} من ${cards.length} برنامجًا` : `${visible} of ${cards.length} programmes`;
  empty.hidden = visible !== 0;
}

if (filters) {
  filters.hidden = false;
  filters.addEventListener('input', filterProgrammes);
  filters.addEventListener('change', filterProgrammes);
  filters.addEventListener('submit', event => event.preventDefault());
  filters.addEventListener('reset', () => setTimeout(filterProgrammes, 0));
  document.querySelector('#clear-empty').addEventListener('click', () => { filters.reset(); filters.querySelector('input').focus(); });
}
