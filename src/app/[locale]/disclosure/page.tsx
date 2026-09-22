import { Disclosure } from '@/components/institutional-pages';
import { pageMetadata } from '@/lib/metadata';
import { text } from '@/lib/content';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    text(locale, 'Disclosure & privacy', 'الإفصاح والخصوصية'),
    text(
      locale,
      'Our editorial approach, provider relationships and privacy information.',
      'نهجنا التحريري وعلاقات مقدمي البرامج ومعلومات الخصوصية.',
    ),
    'disclosure',
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <Disclosure locale={locale} />;
}
