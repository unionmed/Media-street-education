import type { Metadata } from 'next';
import { absoluteUrl, site } from './site';
import { route } from './content';
import type { Locale } from './types';

export function pageMetadata(
  locale: Locale,
  title: string,
  description: string,
  path = '',
): Metadata {
  return {
    title,
    description,
    metadataBase: new URL(site.origin),
    alternates: {
      canonical: absoluteUrl(route(locale, path)),
      languages: {
        en: absoluteUrl(route('en', path)),
        ar: absoluteUrl(route('ar', path)),
        'x-default': absoluteUrl(route('en', path)),
      },
    },
    openGraph: {
      title,
      description,
      type: 'website',
      siteName: site.name,
      url: absoluteUrl(route(locale, path)),
      locale: locale === 'ar' ? 'ar_LB' : 'en_GB',
    },
    twitter: { card: 'summary', title, description },
  };
}
