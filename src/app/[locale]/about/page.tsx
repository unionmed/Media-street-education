import { About } from '@/components/institutional-pages';
import { pageMetadata } from '@/lib/metadata';
import { text } from '@/lib/content';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    text(locale, 'About Merit Way', 'عن ميريت واي'),
    text(
      locale,
      'The academic and media perspective behind Merit Way, operated by Media Street.',
      'الرؤية الأكاديمية والإعلامية وراء ميريت واي، مبادرة من ميديا ستريت.',
    ),
    'about',
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <About locale={locale} />;
}
