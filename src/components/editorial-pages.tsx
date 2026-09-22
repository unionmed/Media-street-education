import Link from 'next/link';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { categories, guides, levels, outcomes, programmes, route, text } from '@/lib/content';
import type { Guide, Locale, Programme } from '@/lib/types';
import { Arrow, ButtonLink, Eyebrow, PageHero, SectionHeading } from './ui';
import { ProgrammeCard } from './programme-card';
import { ContactBand } from './footer';

export function ProgrammeDetail({
  programme: p,
  locale,
}: {
  programme: Programme;
  locale: Locale;
}) {
  const related = programmes
    .filter((other) => other.category === p.category && other.id !== p.id)
    .slice(0, 2);
  return (
    <>
      <section className="page-hero">
        <div className="container-shell">
          <Link className="back-link" href={route(locale, 'programmes')}>
            <ArrowLeft size={16} aria-hidden="true" />
            {text(locale, 'The learning library', 'مكتبة التعلم')}
          </Link>
          <Eyebrow>{categories[p.category][locale]}</Eyebrow>
          <h1 className="display programme-title" dir="ltr" lang="en">
            {p.title}
          </h1>
          <p className="lead max-w-3xl">{p.summary[locale]}</p>
          <div className="detail-meta">
            <span>
              <bdi>{p.provider}</bdi>
            </span>
            {p.provider !== p.platform && (
              <span>
                <bdi>{p.platform}</bdi>
              </span>
            )}
            <span>{levels[p.level][locale]}</span>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell detail-layout">
          <article className="prose-content">
            <Eyebrow>
              {text(locale, 'THE PROGRAMME, IN PERSPECTIVE', 'البرنامج من منظور عملي')}
            </Eyebrow>
            <h2 className="display">{text(locale, 'Who it suits', 'لمن يناسب؟')}</h2>
            <p>{p.audience[locale]}</p>
            <h2 className="display">{text(locale, 'What you will explore', 'ما الذي ستتعلمه؟')}</h2>
            <ul className="topic-list">
              {p.topics[locale].map((topic) => (
                <li key={topic}>{topic}</li>
              ))}
            </ul>
            <div className="practice-box">
              <Eyebrow>
                {text(locale, 'A MERIT WAY PRACTICE IDEA', 'فكرة تطبيقية من ميريت واي')}
              </Eyebrow>
              <h2 className="display">
                {text(locale, 'Make the learning useful.', 'اجعل التعلم مفيدًا.')}
              </h2>
              <p>{p.project[locale]}</p>
              <small>
                {text(
                  locale,
                  'Our editorial exercise, separate from the programme’s own assessments.',
                  'تمرين تحريري نقترحه، مستقل عن تقييمات البرنامج.',
                )}
              </small>
            </div>
            <h2 className="display">{text(locale, 'Before you begin', 'قبل أن تبدأ')}</h2>
            <p>
              {text(
                locale,
                'Review the provider’s full syllabus, language options, study requirements and current fees. Choose the pace and format that fit your next goal.',
                'راجع المنهج الكامل وخيارات اللغة ومتطلبات الدراسة والرسوم الحالية لدى الجهة المقدمة. اختر الوتيرة والشكل الملائمين لهدفك التالي.',
              )}
            </p>
            <Link className="text-link" href={route(locale, 'guides/certificate')}>
              {text(locale, 'How to assess a professional certificate', 'كيف تقيّم شهادة مهنية؟')}
              <Arrow />
            </Link>
          </article>
          <aside className="detail-sidebar">
            <Eyebrow>{text(locale, 'YOUR NEXT STEP', 'خطوتك التالية')}</Eyebrow>
            <h2 className="display">
              {text(locale, 'Explore the fit.\nThen move forward.', 'اكتشف الملاءمة.\nثم تقدّم.')}
            </h2>
            <dl>
              <div>
                <dt>{text(locale, 'Provider', 'الجهة المقدمة')}</dt>
                <dd>
                  <bdi>{p.provider}</bdi>
                </dd>
              </div>
              <div>
                <dt>{text(locale, 'Suggested starting point', 'بداية مقترحة')}</dt>
                <dd>{levels[p.level][locale]}</dd>
              </div>
              <div>
                <dt>{text(locale, 'Your practice goal', 'هدفك العملي')}</dt>
                <dd>{outcomes[p.outcome][locale]}</dd>
              </div>
            </dl>
            <ButtonLink href={p.url} external>
              {text(locale, 'Visit the programme', 'انتقل إلى البرنامج')}
            </ButtonLink>
            <p className="microcopy">
              {text(
                locale,
                'Opens the provider’s website in a new tab.',
                'يفتح موقع الجهة المقدمة في علامة تبويب جديدة.',
              )}
            </p>
          </aside>
        </div>
      </section>
      <section className="section-space border-t border-line">
        <div className="container-shell">
          <SectionHeading
            eyebrow={text(locale, 'KEEP EXPLORING', 'واصل الاستكشاف')}
            title={text(locale, 'Related learning', 'تعلّم مرتبط')}
          />
          <div className="programme-grid">
            {related.map((p) => (
              <ProgrammeCard key={p.id} programme={p} locale={locale} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function GuideIndex({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        eyebrow={text(locale, 'THE MERIT WAY JOURNAL', 'أدلة ميريت واي')}
        title={text(locale, 'Perspective before\nthe next step.', 'رؤية أوضح\nقبل الخطوة التالية.')}
        description={text(
          locale,
          'Eight original guides to help you choose learning, prepare for higher education and turn knowledge into useful work.',
          'ثمانية أدلة أصلية تساعدك على اختيار التعلم والاستعداد للتعليم العالي وتحويل المعرفة إلى عمل مفيد.',
        )}
      />
      <section className="section-space">
        <div className="container-shell guide-index">
          {guides.map((g, i) => (
            <article key={g.slug} className="guide-index-item">
              <span className="guide-number">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <Eyebrow>{g.category[locale]}</Eyebrow>
                <h2 className="display">
                  <Link href={route(locale, `guides/${g.slug}`)}>{g.title[locale]}</Link>
                </h2>
                <p>{g.intro[locale]}</p>
                <Link className="text-link" href={route(locale, `guides/${g.slug}`)}>
                  {text(locale, 'Read the guide', 'اقرأ الدليل')}
                  <Arrow />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}

export function GuideDetail({ guide: g, locale }: { guide: Guide; locale: Locale }) {
  const words = g.sections
    .flatMap((s) => s.paragraphs[locale])
    .join(' ')
    .split(/\s+/).length;
  const minutes = Math.max(2, Math.ceil(words / (locale === 'ar' ? 160 : 210)));
  return (
    <>
      <section className="page-hero article-hero">
        <div className="container-shell">
          <Link className="back-link" href={route(locale, 'guides')}>
            <ArrowLeft size={16} aria-hidden="true" />
            {text(locale, 'The journal', 'الأدلة والرؤى')}
          </Link>
          <Eyebrow>{g.category[locale]}</Eyebrow>
          <h1 className="display page-title">{g.title[locale]}</h1>
          <p className="lead max-w-3xl">{g.intro[locale]}</p>
          <div className="article-byline">
            <span>{text(locale, 'Merit Way editorial', 'تحرير ميريت واي')}</span>
            <span>21.09.2026</span>
            <span className="inline-flex items-center gap-2">
              <Clock3 size={14} aria-hidden="true" />
              {text(locale, `${minutes} min read`, `${minutes} دقائق للقراءة`)}
            </span>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell article-layout">
          <aside className="article-toc">
            <p className="eyebrow">{text(locale, 'IN THIS PERSPECTIVE', 'في هذا الدليل')}</p>
            <nav aria-label={text(locale, 'Article contents', 'محتويات المقال')}>
              <ol>
                {g.sections.map((section, i) => (
                  <li key={section.heading.en}>
                    <a href={`#section-${i + 1}`}>{section.heading[locale]}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </aside>
          <article className="prose-content reading-column">
            {g.sections.map((section, i) => (
              <section key={section.heading.en} id={`section-${i + 1}`}>
                <h2 className="display">{section.heading[locale]}</h2>
                {section.paragraphs[locale].map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </section>
            ))}
            {g.sources.length > 0 && (
              <section className="article-sources">
                <h2 className="display">{text(locale, 'Further reading', 'للمتابعة')}</h2>
                <ul>
                  {g.sources.map((source) => (
                    <li key={source.url}>
                      <a href={source.url} lang="en" dir="ltr">
                        {source.title}
                        <Arrow />
                      </a>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            <div className="practice-box">
              <Eyebrow>{text(locale, 'PUT IT INTO PRACTICE', 'حوّل الفكرة إلى عمل')}</Eyebrow>
              <p>
                {text(
                  locale,
                  'Choose one idea from this guide and turn it into a short working note for your next decision.',
                  'اختر فكرة واحدة من هذا الدليل وحوّلها إلى ورقة عمل قصيرة تساعدك في قرارك التالي.',
                )}
              </p>
              <ButtonLink href={route(locale, g.relatedPath)}>
                {text(locale, 'Explore your next step', 'استكشف خطوتك التالية')}
              </ButtonLink>
            </div>
          </article>
        </div>
      </section>
    </>
  );
}
