import { notFound } from 'next/navigation';
import { GuideDetail } from '@/components/editorial-pages';
import { guides } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return guides.map((g) => ({ slug: g.slug }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();
  return pageMetadata(locale, guide.title[locale], guide.intro[locale], `guides/${slug}`);
}
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const guide = guides.find((g) => g.slug === slug);
  if (!guide) notFound();
  return <GuideDetail guide={guide} locale={locale} />;
}
