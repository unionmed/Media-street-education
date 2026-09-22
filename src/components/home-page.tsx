import Link from 'next/link';
import { BookOpen, GraduationCap, Radio } from 'lucide-react';
import { featuredProgrammes, guides, route, text } from '@/lib/content';
import type { Locale } from '@/lib/types';
import { Arrow, ButtonLink, Eyebrow, SectionHeading } from './ui';
import { ProgrammeCard } from './programme-card';
import { Team } from './team';
import { ContactBand } from './footer';

export function HomePage({ locale }: { locale: Locale }) {
  const pathways = [
    {
      path: 'programmes',
      title: text(locale, 'Build your next capability', 'ابنِ قدرتك التالية'),
      label: text(locale, 'PROFESSIONAL LEARNING', 'التعلم المهني'),
      icon: BookOpen,
    },
    {
      path: 'higher-education',
      title: text(locale, 'Take your ambition further', 'امنح طموحك أفقًا أوسع'),
      label: text(locale, 'HIGHER EDUCATION', 'التعليم الجامعي'),
      icon: GraduationCap,
    },
    {
      path: 'services',
      title: text(locale, 'Give your programme a voice', 'امنح برنامجك صوتًا'),
      label: text(locale, 'MEDIA & PROGRAMME PROMOTION', 'الإعلام وترويج البرامج'),
      icon: Radio,
    },
  ];
  return (
    <>
      <section className="home-hero">
        <div className="container-shell hero-grid">
          <div className="hero-copy">
            <Eyebrow>
              {text(locale, 'LEARNING. PERSPECTIVE. POSSIBILITY.', 'تعلّم. رؤية. إمكانات.')}
            </Eyebrow>
            <h1 className="display hero-title">
              {text(locale, 'A clear direction.', 'اتجاه واضح.')}
              <br />
              <em>
                {text(locale, 'A meaningful', 'خطوة لها')}
                <br />
                {text(locale, 'next step.', 'معنى.')}
              </em>
            </h1>
            <p className="lead">
              {text(
                locale,
                'Thoughtfully selected learning, informed guidance, and media that brings programmes to life. Welcome to Merit Way.',
                'تعلّم منتقى بعناية، وتوجيه قائم على المعرفة، وإعلام يمنح البرامج حضورًا. أهلًا بك في ميريت واي.',
              )}
            </p>
            <ButtonLink href={route(locale, 'programmes')}>
              {text(locale, 'Find your learning route', 'اكتشف مسارك في التعلم')}
            </ButtonLink>
            <div className="hero-footnote">
              <span className="small-rule" />
              {text(
                locale,
                'An initiative by Media Street · Beirut & beyond',
                'مبادرة من ميديا ستريت · من بيروت إلى آفاق أوسع',
              )}
            </div>
          </div>
          <div className="hero-index">
            <div className="index-heading">
              <span>{text(locale, 'THE MERIT WAY', 'طريق ميريت واي')}</span>
              <span>01 — 03</span>
            </div>
            <div className="hero-monogram" aria-hidden="true">
              <svg viewBox="0 0 320 160" fill="none">
                <path
                  d="M20 140V20L90 100 160 20V140M160 20L230 140 300 20"
                  stroke="currentColor"
                  strokeWidth="1.4"
                />
                <path d="M0 140H320M0 20H320M160 0V160" stroke="currentColor" strokeOpacity=".2" />
              </svg>
            </div>
            {pathways.map(({ path, title, label, icon: Icon }, i) => (
              <Link className="pathway-index-link" key={path} href={route(locale, path)}>
                <div className="pathway-number">0{i + 1}</div>
                <div>
                  <span className="eyebrow">{label}</span>
                  <h2>{title}</h2>
                </div>
                <Icon size={23} strokeWidth={1.3} aria-hidden="true" />
              </Link>
            ))}
            <p className="index-note">
              {text(
                locale,
                'For curious minds. For purposeful work.',
                'للعقول الفضولية. وللعمل الذي يحمل غاية.',
              )}
            </p>
          </div>
        </div>
      </section>
      <div className="intro-strip">
        <div className="container-shell">
          <span>
            {text(locale, 'A considered approach to what comes next.', 'نهج مدروس لما يأتي بعد.')}
          </span>
          <span>
            {text(
              locale,
              'Learning · Higher education · Media',
              'التعلم · التعليم الجامعي · الإعلام',
            )}
          </span>
        </div>
      </div>
      <Team locale={locale} />
      <section className="section-space bg-ink text-paper">
        <div className="container-shell">
          <SectionHeading
            eyebrow={text(locale, 'TWO WAYS TO MOVE FORWARD', 'طريقتان للتقدّم')}
            title={text(locale, 'For people.\nFor programmes.', 'للأفراد.\nوللبرامج.')}
          >
            <p>
              {text(
                locale,
                'Develop your own capabilities, or help a learning opportunity reach the people it was made for.',
                'طوّر قدراتك، أو ساعد فرصة تعلّم على الوصول إلى الجمهور الذي صُمّمت من أجله.',
              )}
            </p>
          </SectionHeading>
          <div className="audience-grid">
            <Link href={route(locale, 'programmes')} className="audience-route">
              <BookOpen size={30} strokeWidth={1.2} aria-hidden="true" />
              <span className="eyebrow">{text(locale, 'FOR LEARNERS', 'للمتعلمين')}</span>
              <h3 className="display">
                {text(locale, 'Turn curiosity\ninto capability.', 'حوّل الفضول\nإلى قدرة.')}
              </h3>
              <p>
                {text(
                  locale,
                  'Professional programmes and practical perspectives for a more informed learning decision.',
                  'برامج مهنية ورؤى عملية لاتخاذ قرار تعلّم أكثر وعيًا.',
                )}
              </p>
              <span className="text-link">
                {text(locale, 'Explore learning', 'استكشف التعلم')}
                <Arrow />
              </span>
            </Link>
            <Link href={route(locale, 'services')} className="audience-route">
              <Radio size={30} strokeWidth={1.2} aria-hidden="true" />
              <span className="eyebrow">{text(locale, 'FOR ORGANISATIONS', 'للمؤسسات')}</span>
              <h3 className="display">
                {text(
                  locale,
                  'Turn a strong offer\ninto a clear story.',
                  'حوّل العرض القوي\nإلى قصة واضحة.',
                )}
              </h3>
              <p>
                {text(
                  locale,
                  'Programme positioning, campaign content and media production that make the value visible.',
                  'تموضع البرامج ومحتوى الحملات والإنتاج الإعلامي لإظهار القيمة بوضوح.',
                )}
              </p>
              <span className="text-link">
                {text(locale, 'Explore our services', 'استكشف خدماتنا')}
                <Arrow />
              </span>
            </Link>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={text(locale, 'THE LEARNING EDIT', 'اختيارات التعلم')}
            title={text(
              locale,
              'Start with a skill\nthat has a purpose.',
              'ابدأ بمهارة\nلها غاية.',
            )}
          >
            <p>
              {text(
                locale,
                'A selection from our 15-programme library. Explore the fit, the focus and a practical way to put it to work.',
                'اختيارات من مكتبتنا التي تضم 15 برنامجًا. اكتشف ملاءمة كل برنامج ومحاوره وطريقة عملية للاستفادة منه.',
              )}
            </p>
            <Link className="text-link" href={route(locale, 'programmes')}>
              {text(locale, 'View the full library', 'شاهد المكتبة كاملة')}
              <Arrow />
            </Link>
          </SectionHeading>
          <div className="programme-grid">
            {featuredProgrammes.map((p) => (
              <ProgrammeCard key={p.id} programme={p} locale={locale} />
            ))}
          </div>
        </div>
      </section>
      <section className="academic-section section-space">
        <div className="container-shell academic-grid">
          <div>
            <Eyebrow>{text(locale, 'A BIGGER ACADEMIC HORIZON', 'أفق أكاديمي أوسع')}</Eyebrow>
            <h2 className="display section-title">
              {text(locale, 'Your ambition\nhas room to grow.', 'لطموحك\nمساحة للنمو.')}
            </h2>
            <p className="lead">
              {text(
                locale,
                'From undergraduate foundations to master’s and doctoral study. We are developing a considered pathway to international higher education.',
                'من تأسيس البكالوريوس إلى الماستر والدكتوراه. نطوّر مسارًا مدروسًا نحو التعليم الجامعي الدولي.',
              )}
            </p>
            <ButtonLink href={route(locale, 'higher-education')}>
              {text(locale, 'Explore the academic pathway', 'استكشف المسار الأكاديمي')}
            </ButtonLink>
          </div>
          <div className="degree-list">
            {[
              text(locale, 'Undergraduate', 'البكالوريوس'),
              text(locale, 'Master’s', 'الماستر'),
              text(locale, 'Doctoral & executive', 'الدكتوراه والدرجات التنفيذية'),
            ].map((label, i) => (
              <Link
                key={label}
                href={`${route(locale, 'higher-education')}#${['undergraduate', 'masters', 'doctoral'][i]}`}
              >
                <span>0{i + 1}</span>
                <h3 className="display">{label}</h3>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={text(locale, 'THE JOURNAL', 'الأدلة والرؤى')}
            title={text(
              locale,
              'A little perspective.\nA better decision.',
              'رؤية أوسع.\nقرار أفضل.',
            )}
          >
            <Link className="text-link" href={route(locale, 'guides')}>
              {text(locale, 'Read all eight guides', 'اقرأ الأدلة الثمانية')}
              <Arrow />
            </Link>
          </SectionHeading>
          <div className="journal-preview">
            {[guides[0], guides[3], guides[4]].map((g, i) => (
              <Link
                href={route(locale, `guides/${g.slug}`)}
                key={g.slug}
                className={i === 0 ? 'journal-feature' : 'journal-item'}
              >
                <span className="eyebrow">{g.category[locale]}</span>
                <h3 className="display">{g.title[locale]}</h3>
                <p>{g.intro[locale]}</p>
                <span className="text-link">
                  {text(locale, 'Read the perspective', 'اقرأ الدليل')}
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}
