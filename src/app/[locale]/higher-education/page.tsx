import { HigherEducation } from '@/components/institutional-pages';
import { pageMetadata } from '@/lib/metadata';
import { text } from '@/lib/content';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    text(locale, 'Higher education', 'التعليم الجامعي'),
    text(
      locale,
      'Explore undergraduate, master’s, doctoral and executive study pathways.',
      'استكشف مسارات البكالوريوس والماستر والدكتوراه والدرجات التنفيذية.',
    ),
    'higher-education',
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HigherEducation locale={locale} />;
}
