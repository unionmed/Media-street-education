'use client';

import { useId, useMemo, useState } from 'react';
import { Search, SlidersHorizontal, RotateCcw } from 'lucide-react';
import { categories, levels, outcomes, text } from '@/lib/content';
import type { Locale, Programme } from '@/lib/types';
import { ProgrammeCard } from './programme-card';

const initial = { query: '', category: '', platform: '', level: '', outcome: '' };
const normalise = (value: string) =>
  value
    .toLocaleLowerCase()
    .normalize('NFKD')
    .replace(/[\u0300-\u036f\u064b-\u065f\u0670]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .trim();
export function Catalogue({ programmes, locale }: { programmes: Programme[]; locale: Locale }) {
  const [filters, setFilters] = useState(initial);
  const id = useId();
  const platforms = [...new Set(programmes.map((p) => p.platform))].sort();
  const filtered = useMemo(
    () =>
      programmes.filter((p) => {
        const haystack = normalise(
          `${p.title} ${p.provider} ${p.platform} ${p.summary[locale]} ${categories[p.category][locale]}`,
        );
        return (
          normalise(filters.query)
            .split(/\s+/)
            .every((word) => haystack.includes(word)) &&
          (!filters.category || filters.category === p.category) &&
          (!filters.platform || filters.platform === p.platform) &&
          (!filters.level || filters.level === p.level) &&
          (!filters.outcome || filters.outcome === p.outcome)
        );
      }),
    [filters, locale, programmes],
  );
  const update = (key: keyof typeof filters, value: string) =>
    setFilters((current) => ({ ...current, [key]: value }));
  const active = Object.values(filters).some(Boolean);
  return (
    <div className="catalogue">
      <form
        className="filter-panel"
        onSubmit={(event) => event.preventDefault()}
        role="search"
        aria-label={text(locale, 'Find a programme', 'ابحث عن برنامج')}
      >
        <div className="search-control">
          <Search aria-hidden="true" size={21} />
          <label className="sr-only" htmlFor={`${id}-search`}>
            {text(locale, 'Search programmes', 'ابحث في البرامج')}
          </label>
          <input
            id={`${id}-search`}
            type="search"
            placeholder={text(locale, 'What would you like to learn?', 'ماذا تريد أن تتعلّم؟')}
            value={filters.query}
            onChange={(event) => update('query', event.target.value)}
          />
        </div>
        <div className="filter-selects">
          <span className="filter-heading">
            <SlidersHorizontal size={16} aria-hidden="true" />
            {text(locale, 'Refine your search', 'حدّد بحثك')}
          </span>
          {(
            [
              {
                key: 'platform',
                label: text(locale, 'Platform', 'المنصة'),
                options: platforms.map((p) => [p, p]),
              },
              {
                key: 'level',
                label: text(locale, 'Starting level', 'مستوى البداية'),
                options: Object.entries(levels).map(([k, v]) => [k, v[locale]]),
              },
              {
                key: 'outcome',
                label: text(locale, 'Your goal', 'هدفك'),
                options: Object.entries(outcomes).map(([k, v]) => [k, v[locale]]),
              },
            ] as const
          ).map((filter) => (
            <label key={filter.key}>
              {filter.label}
              <select
                aria-label={filter.label}
                value={filters[filter.key]}
                onChange={(event) => update(filter.key, event.target.value)}
              >
                <option value="">{text(locale, 'All', 'الكل')}</option>
                {filter.options.map(([value, label]) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          ))}
          <button
            type="button"
            className="reset-button"
            disabled={!active}
            onClick={() => setFilters(initial)}
          >
            <RotateCcw size={15} aria-hidden="true" />
            {text(locale, 'Reset', 'مسح الفلاتر')}
          </button>
        </div>
      </form>
      <div
        className="category-tabs"
        role="group"
        aria-label={text(locale, 'Learning subject', 'مجال التعلم')}
      >
        <button
          type="button"
          aria-pressed={!filters.category}
          onClick={() => update('category', '')}
        >
          {text(locale, 'All programmes', 'كل البرامج')}
          <span>{programmes.length}</span>
        </button>
        {Object.entries(categories).map(([key, label]) => (
          <button
            key={key}
            type="button"
            aria-pressed={filters.category === key}
            onClick={() => update('category', key)}
          >
            {label[locale]}
          </button>
        ))}
      </div>
      <div className="catalogue-status">
        <p role="status" aria-live="polite">
          {text(
            locale,
            `${filtered.length} of ${programmes.length} programmes`,
            `${filtered.length} من ${programmes.length} برنامجًا`,
          )}
        </p>
        <span>{text(locale, 'Selected with a purpose', 'اختيارات لها غاية')}</span>
      </div>
      {filtered.length ? (
        <div className="programme-grid">
          {filtered.map((p) => (
            <ProgrammeCard key={p.id} programme={p} locale={locale} />
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={32} aria-hidden="true" />
          <h2 className="display">
            {text(locale, 'A different search. A new possibility.', 'بحث آخر. فرصة جديدة.')}
          </h2>
          <p>
            {text(
              locale,
              'Try a broader term or reset your filters to explore all programmes.',
              'جرّب كلمة أوسع أو امسح الفلاتر لاستكشاف كل البرامج.',
            )}
          </p>
          <button className="button button-dark" onClick={() => setFilters(initial)}>
            {text(locale, 'Show all programmes', 'عرض كل البرامج')}
          </button>
        </div>
      )}
    </div>
  );
}
