import { GuideIndex } from '@/components/editorial-pages';
import { pageMetadata } from '@/lib/metadata';
import { text } from '@/lib/content';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    text(locale, 'Guides & perspectives', 'الأدلة والرؤى'),
    text(
      locale,
      'Eight original guides for better learning and academic decisions.',
      'ثمانية أدلة أصلية لقرارات تعليمية وأكاديمية أفضل.',
    ),
    'guides',
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <GuideIndex locale={locale} />;
}
