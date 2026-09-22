import Link from 'next/link';
import { categories, route } from '@/lib/content';
import type { Locale, Programme } from '@/lib/types';
import { Arrow } from './ui';
import { ProgrammeArtwork } from './programme-artwork';

export function ProgrammeCard({ programme: p, locale }: { programme: Programme; locale: Locale }) {
  return (
    <article className="programme-card group">
      <ProgrammeArtwork category={p.category} />
      <div className="flex items-center justify-between gap-4">
        <span className="category-label">{categories[p.category][locale]}</span>
        <Arrow className="text-gold-dark transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </div>
      <h3 lang="en" dir="ltr">
        <Link href={route(locale, `programmes/${p.id}`)}>{p.title}</Link>
      </h3>
      <p className="provider">
        <bdi>{p.provider}</bdi>
        {p.platform !== p.provider && (
          <>
            {' '}
            / <bdi>{p.platform}</bdi>
          </>
        )}
      </p>
      <p className="summary">{p.summary[locale]}</p>
      <Link className="text-link" href={route(locale, `programmes/${p.id}`)}>
        {locale === 'en' ? 'Explore this programme' : 'اكتشف هذا البرنامج'}
        <Arrow />
      </Link>
    </article>
  );
}
