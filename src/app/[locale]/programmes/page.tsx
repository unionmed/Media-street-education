import { Catalogue } from '@/components/catalogue';
import { ContactBand } from '@/components/footer';
import { PageHero } from '@/components/ui';
import { programmes, text } from '@/lib/content';
import { pageMetadata } from '@/lib/metadata';
import type { Locale } from '@/lib/types';

type Props = { params: Promise<{ locale: Locale }> };
export async function generateMetadata({ params }: Props) {
  const { locale } = await params;
  return pageMetadata(
    locale,
    text(locale, 'Professional learning library', 'مكتبة التعلم المهني'),
    text(
      locale,
      'Explore 15 programmes in AI, marketing, data, projects and leadership.',
      'استكشف 15 برنامجًا في الذكاء الاصطناعي والتسويق والبيانات والمشاريع والقيادة.',
    ),
    'programmes',
  );
}
export default async function Page({ params }: Props) {
  const { locale } = await params;
  return (
    <>
      <PageHero
        eyebrow={text(locale, 'THE PROFESSIONAL LEARNING LIBRARY', 'مكتبة التعلم المهني')}
        title={text(locale, 'Choose a skill.\nCreate a possibility.', 'اختر مهارة.\nافتح أفقًا.')}
        description={text(
          locale,
          'Fifteen programmes, selected with a practical purpose. Find the learning that fits the work you want to do next.',
          'خمسة عشر برنامجًا اختيرت لغاية عملية. اعثر على التعلم الذي يلائم العمل الذي تريد القيام به.',
        )}
      >
        <div className="library-note">
          <span>15</span>
          <p>{text(locale, 'programmes.\nOne next step.', 'برنامجًا.\nوخطوة تالية.')}</p>
        </div>
      </PageHero>
      <section className="section-space">
        <div className="container-shell">
          <h2 className="sr-only">{text(locale, 'Explore programmes', 'استكشف البرامج')}</h2>
          <Catalogue programmes={programmes} locale={locale} />
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
