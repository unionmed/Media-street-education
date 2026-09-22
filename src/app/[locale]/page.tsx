import { HomePage } from '@/components/home-page';
import { pageMetadata } from '@/lib/metadata';
import { text } from '@/lib/content';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    text(locale, 'Your next chapter starts here. | Merit Way', 'فصلك القادم يبدأ هنا. | ميريت واي'),
    text(
      locale,
      'Selected learning, informed guidance and media that brings programmes to life.',
      'تعلم منتقى وتوجيه مدروس وإعلام يمنح البرامج حضورًا.',
    ),
    '',
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <HomePage locale={locale} />;
}
