import { Services } from '@/components/institutional-pages';
import { pageMetadata } from '@/lib/metadata';
import { text } from '@/lib/content';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    text(locale, 'Programme promotion & media', 'ترويج البرامج والإعلام'),
    text(
      locale,
      'Programme positioning, media production and campaign content.',
      'تموضع البرامج والإنتاج الإعلامي ومحتوى الحملات.',
    ),
    'services',
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <Services locale={locale} />;
}
