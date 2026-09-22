import Link from 'next/link';
import { ArrowDown, BookOpen, GraduationCap, Radio, Sparkles } from 'lucide-react';
import { featuredProgrammes, guides, route, text } from '@/lib/content';
import type { Locale } from '@/lib/types';
import { Arrow, ButtonLink, Eyebrow, SectionHeading } from './ui';
import { ProgrammeCard } from './programme-card';
import { Team } from './team';
import { ContactBand } from './footer';
import { OrbitScene } from './orbit-scene';

export function HomePage({ locale }: { locale: Locale }) {
  const pathways = [
    {
      path: 'programmes',
      word: text(locale, 'Learn.', 'تعلّم.'),
      title: text(
        locale,
        'Build the skills. Change the possibilities.',
        'ابنِ المهارات. غيّر الإمكانات.',
      ),
      description: text(
        locale,
        'Selected programmes for curious minds ready to put new ideas to work.',
        'برامج منتقاة للعقول الفضولية المستعدة لتحويل الأفكار إلى عمل.',
      ),
      label: text(locale, 'PROFESSIONAL LEARNING', 'التعلم المهني'),
      icon: BookOpen,
    },
    {
      path: 'higher-education',
      word: text(locale, 'Advance.', 'تقدّم.'),
      title: text(
        locale,
        'Think bigger. Take your ambition further.',
        'فكّر أكبر. امنح طموحك أفقًا أوسع.',
      ),
      description: text(
        locale,
        'A considered direction for undergraduate, master’s and doctoral ambitions.',
        'توجّه مدروس لطموحات البكالوريوس والماستر والدكتوراه.',
      ),
      label: text(locale, 'HIGHER EDUCATION', 'التعليم الجامعي'),
      icon: GraduationCap,
    },
    {
      path: 'services',
      word: text(locale, 'Amplify.', 'أثّر.'),
      title: text(locale, 'Find your story. Make it matter.', 'اكتشف قصتك. امنحها أثرًا.'),
      description: text(
        locale,
        'Media and communication that bring programmes closer to their audience.',
        'إعلام واتصال يقرّبان البرامج من جمهورها.',
      ),
      label: text(locale, 'MEDIA & COMMUNICATION', 'الإعلام والاتصال'),
      icon: Radio,
    },
  ];
  return (
    <>
      <section className="studio-hero">
        <div className="hero-gridlines" aria-hidden="true" />
        <div className="container-shell studio-hero-grid">
          <div className="studio-hero-copy">
            <Eyebrow>
              <span className="signal-dot" />
              {text(locale, 'FOR MINDS THAT KEEP MOVING', 'للعقول التي تواصل التقدّم')}
            </Eyebrow>
            <h1 className="display studio-title">
              {text(locale, 'Your next', 'فصلك')}
              <br />
              <em>{text(locale, 'chapter', 'القادم')}</em>
              <span className="title-star" aria-hidden="true">
                ✳
              </span>
              <br />
              {text(locale, 'starts here.', 'يبدأ هنا.')}
            </h1>
            <p className="lead">
              {text(
                locale,
                'New skills. Bigger ambitions. Ideas that travel further. Discover a world of learning and possibility with Merit Way.',
                'مهارات جديدة. طموحات أكبر. أفكار تصل أبعد. اكتشف عالمًا من التعلم والإمكانات مع ميريت واي.',
              )}
            </p>
            <div className="studio-hero-actions">
              <ButtonLink href={route(locale, 'programmes')}>
                {text(locale, 'Find your learning route', 'اكتشف مسارك في التعلم')}
              </ButtonLink>
              <Link href="#possibilities" className="hero-secondary">
                {text(locale, 'Explore the possibilities', 'استكشف الإمكانات')}
                <ArrowDown size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="hero-signature">
              <span className="signature-mark" aria-hidden="true">
                m.
              </span>
              <span>
                {text(locale, 'An initiative by Media Street', 'مبادرة من ميديا ستريت')}
                <small>
                  {text(locale, 'ROOTED IN BEIRUT. OPEN TO THE WORLD.', 'من بيروت. إلى العالم.')}
                </small>
              </span>
            </div>
          </div>
          <OrbitScene locale={locale} />
        </div>
        <div className="container-shell hero-bottom-line">
          <span>
            {text(
              locale,
              'LEARNING × HIGHER EDUCATION × MEDIA',
              'التعلم × التعليم الجامعي × الإعلام',
            )}
          </span>
          <a href="#possibilities">
            {text(locale, 'SCROLL TO DISCOVER', 'مرّر للاستكشاف')}
            <ArrowDown size={14} aria-hidden="true" />
          </a>
        </div>
      </section>
      <section
        className="provider-ribbon"
        aria-label={text(
          locale,
          'Platforms represented in our learning library',
          'منصات في مكتبتنا التعليمية',
        )}
      >
        <div className="container-shell provider-inner">
          <p>
            {text(locale, 'Good learning.\nThoughtfully selected.', 'تعلّم جيد.\nاختيارات مدروسة.')}
          </p>
          <div className="provider-names" dir="ltr">
            <span>Google</span>
            <span>
              HubSpot<span className="provider-small"> Academy</span>
            </span>
            <span>DataCamp</span>
            <span>Elements of AI</span>
            <span>OpenLearn</span>
          </div>
        </div>
      </section>
      <section className="possibilities-section section-space" id="possibilities">
        <div className="container-shell">
          <SectionHeading
            eyebrow={text(locale, '01 / FIND YOUR DIRECTION', '01 / اكتشف اتجاهك')}
            title={text(
              locale,
              'One curious mind.\nEndless ways forward.',
              'عقل فضولي واحد.\nوآفاق بلا حدود.',
            )}
          >
            <p>
              {text(
                locale,
                'Wherever you are in your journey, there is a meaningful next step. Let’s find yours.',
                'أينما كنت في رحلتك، هناك خطوة تالية لها معنى. لنكتشف خطوتك.',
              )}
            </p>
          </SectionHeading>
          <div className="pathway-panels">
            {pathways.map(({ path, word, title, description, label, icon: Icon }, i) => (
              <Link
                key={path}
                href={route(locale, path)}
                className={`pathway-panel pathway-panel-${i}`}
              >
                <div className="pathway-panel-top">
                  <span>
                    0{i + 1} / {label}
                  </span>
                  <Icon size={22} strokeWidth={1.4} aria-hidden="true" />
                </div>
                <div className="pathway-art" aria-hidden="true">
                  <i />
                  <i />
                  <i />
                  <i />
                  <span>{i === 0 ? '↗' : i === 1 ? '∞' : '✳'}</span>
                </div>
                <h3 className="display">{word}</h3>
                <p className="pathway-panel-title">{title}</p>
                <p className="pathway-panel-description">{description}</p>
                <span className="pathway-panel-action">
                  {text(locale, 'Explore this direction', 'استكشف هذا الاتجاه')}
                  <Arrow />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Team locale={locale} />
      <section className="learning-edit section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={text(locale, '03 / THE LEARNING EDIT', '03 / اختيارات التعلم')}
            title={text(locale, 'A new skill.\nA different tomorrow.', 'مهارة جديدة.\nوغد مختلف.')}
          >
            <p>
              {text(
                locale,
                'A starting point for what you want to become. Explore a few favourites from our 15-programme library.',
                'نقطة انطلاق لما تطمح أن تصبحه. استكشف اختيارات من مكتبتنا التي تضم 15 برنامجًا.',
              )}
            </p>
            <Link className="text-link" href={route(locale, 'programmes')}>
              {text(locale, 'View the full library', 'شاهد المكتبة كاملة')}
              <Arrow />
            </Link>
          </SectionHeading>
          <div className="programme-grid">
            {featuredProgrammes.slice(0, 4).map((p) => (
              <ProgrammeCard key={p.id} programme={p} locale={locale} />
            ))}
          </div>
          <div className="learning-footnote">
            <Sparkles size={18} aria-hidden="true" />
            <p>
              {text(
                locale,
                'AI & work. Marketing & media. Data & projects. Leadership & growth.',
                'الذكاء الاصطناعي والعمل. التسويق والإعلام. البيانات والمشاريع. القيادة والتطوير.',
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="academic-section section-space">
        <div className="academic-orbits" aria-hidden="true">
          <i />
          <i />
          <i />
        </div>
        <div className="container-shell academic-grid">
          <div>
            <Eyebrow>{text(locale, '04 / A BIGGER HORIZON', '04 / أفق أوسع')}</Eyebrow>
            <h2 className="display section-title">
              {text(locale, 'Some ambitions\nneed more space.', 'بعض الطموحات\nتحتاج مساحة أكبر.')}
            </h2>
            <p className="lead">
              {text(
                locale,
                'From your first degree to an original contribution. We are developing a thoughtful pathway to international higher education.',
                'من درجتك الأولى إلى إسهام أصيل. نطوّر مسارًا مدروسًا نحو التعليم الجامعي الدولي.',
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
            <p className="academic-note">
              {text(
                locale,
                'A pathway in development. A conversation worth starting.',
                'مسار قيد التطوير. ومحادثة تستحق البداية.',
              )}
            </p>
          </div>
        </div>
      </section>
      <section className="journal-section section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={text(locale, '05 / IDEAS TO TAKE WITH YOU', '05 / أفكار ترافقك')}
            title={text(
              locale,
              'Fresh perspective.\nForward thinking.',
              'رؤية متجدّدة.\nوتفكير إلى الأمام.',
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
                <div className="journal-graphic" aria-hidden="true">
                  <span>{['↗', '∞', '?'][i]}</span>
                  <i />
                  <i />
                  <small>MW JOURNAL / 0{i + 1}</small>
                </div>
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
