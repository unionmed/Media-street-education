import { notFound } from 'next/navigation';
import { ProgrammeDetail } from '@/components/editorial-pages';
import { programmes } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale; slug: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return programmes.map((p) => ({ slug: p.id }));
}
export async function generateMetadata({ params }: Props) {
  const { locale, slug } = await params;
  const programme = programmes.find((p) => p.id === slug);
  if (!programme) notFound();
  return pageMetadata(locale, programme.title, programme.summary[locale], `programmes/${slug}`);
}
export default async function Page({ params }: Props) {
  const { locale, slug } = await params;
  const programme = programmes.find((p) => p.id === slug);
  if (!programme) notFound();
  return <ProgrammeDetail programme={programme} locale={locale} />;
}
