import { Contact } from '@/components/institutional-pages';
import { pageMetadata } from '@/lib/metadata';
import { text } from '@/lib/content';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    text(locale, 'Contact Merit Way', 'تواصل مع ميريت واي'),
    text(
      locale,
      'Start a conversation about learning, higher education or programme promotion.',
      'ابدأ محادثة حول التعلم أو التعليم الجامعي أو ترويج البرامج.',
    ),
    'contact',
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return <Contact locale={locale} />;
}
