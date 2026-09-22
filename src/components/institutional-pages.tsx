import Link from 'next/link';
import { Check, Mail, MapPin, ArrowUpRight } from 'lucide-react';
import { route, text } from '@/lib/content';
import { contactHref, site } from '@/lib/site';
import type { Locale } from '@/lib/types';
import { Arrow, ButtonLink, Eyebrow, PageHero, SectionHeading } from './ui';
import { ContactBand } from './footer';
import { Team } from './team';

export function HigherEducation({ locale }: { locale: Locale }) {
  const degrees = [
    {
      id: 'undergraduate',
      title: text(locale, 'A strong foundation.', 'أساس متين.'),
      label: text(locale, 'UNDERGRADUATE', 'البكالوريوس'),
      description: text(
        locale,
        'Explore the relationship between your interests, academic strengths and the direction you want to take.',
        'استكشف العلاقة بين اهتماماتك وقدراتك الأكاديمية والاتجاه الذي تريد الوصول إليه.',
      ),
      points:
        locale === 'en'
          ? [
              'Field and curriculum fit',
              'Entry requirements and language',
              'Study location and delivery',
            ]
          : ['ملاءمة الاختصاص والمنهج', 'متطلبات القبول واللغة', 'مكان الدراسة وشكلها'],
    },
    {
      id: 'masters',
      title: text(locale, 'Specialise with purpose.', 'تخصص له غاية.'),
      label: text(locale, 'MASTER’S', 'الماستر'),
      description: text(
        locale,
        'Develop deeper expertise, prepare for a professional transition or build a foundation for research.',
        'عمّق خبرتك أو استعد لانتقال مهني أو ابنِ أساسًا للبحث.',
      ),
      points:
        locale === 'en'
          ? [
              'Specialist modules and project work',
              'Balance with professional commitments',
              'Academic and career direction',
            ]
          : [
              'المقررات المتخصصة والمشروع',
              'التوازن مع الالتزامات المهنية',
              'الاتجاه الأكاديمي والمهني',
            ],
    },
    {
      id: 'doctoral',
      title: text(locale, 'Make a contribution.', 'اصنع إسهامًا.'),
      label: text(locale, 'DOCTORAL & EXECUTIVE DEGREES', 'الدكتوراه والدرجات التنفيذية'),
      description: text(
        locale,
        'Clarify the research question, professional challenge or advanced area of practice you want to investigate.',
        'حدّد السؤال البحثي أو التحدي المهني أو مجال الممارسة المتقدم الذي تريد استكشافه.',
      ),
      points:
        locale === 'en'
          ? [
              'PhD, DBA and professional routes',
              'Research preparation and supervision',
              'Feasibility, access and study format',
            ]
          : [
              'الدكتوراه البحثية والمهنية وDBA',
              'الاستعداد للبحث والإشراف',
              'إمكان التنفيذ والبيانات وشكل الدراسة',
            ],
    },
  ];
  return (
    <>
      <PageHero
        eyebrow={text(locale, 'INTERNATIONAL HIGHER EDUCATION', 'التعليم الجامعي الدولي')}
        title={text(
          locale,
          'Think beyond\nyour next qualification.',
          'فكّر أبعد\nمن شهادتك التالية.',
        )}
        description={text(
          locale,
          'An academic pathway for students and professionals with a longer view. From undergraduate study to master’s, doctoral and executive degrees.',
          'مسار أكاديمي للطلاب والمهنيين الذين ينظرون إلى أبعد. من البكالوريوس إلى الماستر والدكتوراه والدرجات التنفيذية.',
        )}
      >
        <span className="status-pill">
          <span />
          {text(locale, 'Pathway in development', 'مسار قيد التطوير')}
        </span>
      </PageHero>
      <section className="section-space">
        <div className="container-shell degree-details">
          {degrees.map((degree, i) => (
            <article id={degree.id} key={degree.id}>
              <div className="degree-ordinal">0{i + 1}</div>
              <div>
                <Eyebrow>{degree.label}</Eyebrow>
                <h2 className="display section-title">{degree.title}</h2>
                <p className="lead">{degree.description}</p>
              </div>
              <ul>
                {degree.points.map((point) => (
                  <li key={point}>
                    <Check size={17} aria-hidden="true" />
                    {point}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="section-space bg-ink text-paper">
        <div className="container-shell academic-grid">
          <div>
            <Eyebrow>{text(locale, 'A CONSIDERED BEGINNING', 'بداية مدروسة')}</Eyebrow>
            <h2 className="display section-title">
              {text(locale, 'Start with\na clearer question.', 'ابدأ\nبسؤال أوضح.')}
            </h2>
          </div>
          <div>
            <p className="lead">
              {text(
                locale,
                'This pathway is being prepared with academic expertise at its core. Tell us the field, degree level and study format you are considering, and the direction you want to take.',
                'نُعدّ هذا المسار انطلاقًا من خبرة أكاديمية. أخبرنا بالاختصاص ومستوى الدرجة وشكل الدراسة الذي تفكر فيه والاتجاه الذي تريد الوصول إليه.',
              )}
            </p>
            <ButtonLink href={contactHref('Merit Way higher education enquiry')} light>
              {text(locale, 'Discuss your academic direction', 'ناقش اتجاهك الأكاديمي')}
            </ButtonLink>
          </div>
        </div>
      </section>
      <section className="section-space">
        <div className="container-shell">
          <SectionHeading
            eyebrow={text(locale, 'READ BEFORE YOU CHOOSE', 'اقرأ قبل أن تختار')}
            title={text(locale, 'Prepare your perspective.', 'حضّر رؤيتك.')}
          />
          <div className="degree-reading">
            {[
              ['choose-masters', text(locale, 'Choosing a master’s', 'اختيار الماستر')],
              [
                'doctorate-route',
                text(locale, 'PhD or professional doctorate?', 'دكتوراه بحثية أم مهنية؟'),
              ],
              ['research-proposal', text(locale, 'Writing a research proposal', 'كتابة مقترح بحث')],
            ].map(([slug, title]) => (
              <Link key={slug} href={route(locale, `guides/${slug}`)}>
                <span>{title}</span>
                <Arrow />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Services({ locale }: { locale: Locale }) {
  const services = [
    {
      title: text(locale, 'Programme positioning', 'تموضع البرامج'),
      description: text(
        locale,
        'A clear offer begins with the right questions: who is it for, what does it make possible, and why should this audience care?',
        'يبدأ العرض الواضح بالأسئلة الصحيحة: لمن هو؟ ماذا يتيح؟ ولماذا يهم هذا الجمهور؟',
      ),
      items:
        locale === 'en'
          ? [
              'Audience and programme narrative',
              'Programme pages and intake information',
              'Key messages and editorial structure',
            ]
          : [
              'تعريف الجمهور ورواية البرنامج',
              'صفحات البرامج ومعلومات التسجيل',
              'الرسائل الأساسية والبنية التحريرية',
            ],
    },
    {
      title: text(locale, 'Media & video production', 'الإنتاج الإعلامي والمرئي'),
      description: text(
        locale,
        'Give the programme a visual voice, with a story built around real expertise, useful detail and a clear editorial purpose.',
        'امنح البرنامج صوتًا بصريًا وقصة تقوم على الخبرة الفعلية والتفاصيل المفيدة والغاية التحريرية الواضحة.',
      ),
      items:
        locale === 'en'
          ? [
              'Creative concepts and treatments',
              'Interview briefs and script direction',
              'Story structure and production planning',
            ]
          : [
              'الأفكار الإبداعية والمعالجات',
              'موجز المقابلات واتجاه النص',
              'بنية القصة وتخطيط الإنتاج',
            ],
    },
    {
      title: text(locale, 'Campaign content', 'محتوى الحملات'),
      description: text(
        locale,
        'Connect the launch message to the audience journey, from first attention to a useful enquiry or a confident next step.',
        'اربط رسالة الإطلاق برحلة الجمهور، من الانتباه الأول إلى استفسار مفيد أو خطوة تالية واثقة.',
      ),
      items:
        locale === 'en'
          ? [
              'Launch themes and campaign messages',
              'Social, email and landing-page content',
              'Content sequences and creative briefs',
            ]
          : [
              'أفكار الإطلاق ورسائل الحملات',
              'محتوى التواصل والبريد وصفحات الهبوط',
              'تسلسل المحتوى والموجزات الإبداعية',
            ],
    },
  ];
  return (
    <>
      <PageHero
        eyebrow={text(
          locale,
          'FOR PROGRAMME PROVIDERS & ORGANISATIONS',
          'لمقدمي البرامج والمؤسسات',
        )}
        title={text(
          locale,
          'Good programmes\ndeserve a clear voice.',
          'البرامج الجيدة\nتستحق صوتًا واضحًا.',
        )}
        description={text(
          locale,
          'We bring editorial discipline, academic understanding and media production together to make the value of your programme visible.',
          'نجمع الانضباط التحريري والفهم الأكاديمي والإنتاج الإعلامي لإظهار قيمة برنامجك بوضوح.',
        )}
      >
        <ButtonLink href={contactHref('Merit Way programme promotion')}>
          {text(locale, 'Start a project', 'ابدأ مشروعًا')}
        </ButtonLink>
      </PageHero>
      <section className="section-space">
        <div className="container-shell service-list">
          {services.map((service, i) => (
            <article key={service.title}>
              <span className="service-number">0{i + 1}</span>
              <div>
                <h2 className="display">{service.title}</h2>
                <p className="lead">{service.description}</p>
              </div>
              <ul>
                {service.items.map((item) => (
                  <li key={item}>
                    <ArrowUpRight size={16} aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
      <section className="section-space bg-sand">
        <div className="container-shell">
          <SectionHeading
            eyebrow={text(locale, 'HOW WE BEGIN', 'كيف نبدأ')}
            title={text(
              locale,
              'A focused brief.\nA useful piece of work.',
              'موجز مركز.\nوعمل مفيد.',
            )}
          />
          <ol className="process-list">
            {[
              [
                text(locale, 'Understand', 'نفهم'),
                text(
                  locale,
                  'The programme, audience, evidence and timing.',
                  'البرنامج والجمهور والأدلة والتوقيت.',
                ),
              ],
              [
                text(locale, 'Shape', 'نصوغ'),
                text(
                  locale,
                  'The message, format and production direction.',
                  'الرسالة والشكل واتجاه الإنتاج.',
                ),
              ],
              [
                text(locale, 'Create', 'ننتج'),
                text(
                  locale,
                  'The agreed content, with a clear review and delivery process.',
                  'المحتوى المتفق عليه مع مراجعة وتسليم واضحين.',
                ),
              ],
            ].map(([title, description], i) => (
              <li key={title}>
                <span>0{i + 1}</span>
                <h3>{title}</h3>
                <p>{description}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}

export function About({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        eyebrow={text(locale, 'ABOUT MERIT WAY', 'عن ميريت واي')}
        title={text(
          locale,
          'Learning and media.\nA shared perspective.',
          'التعلم والإعلام.\nرؤية مشتركة.',
        )}
        description={text(
          locale,
          'Merit Way is an initiative operated by Media Street S.A.R.L. in Beirut, connecting selected professional learning, academic ambition and programme communication.',
          'ميريت واي مبادرة تشغّلها ميديا ستريت ش.م.م. في بيروت، تربط التعلم المهني المنتقى بالطموح الأكاديمي والتواصل حول البرامج.',
        )}
      />
      <Team locale={locale} />
      <section className="section-space bg-sand">
        <div className="container-shell academic-grid">
          <h2 className="display section-title">
            {text(locale, 'Clarity is\na useful starting point.', 'الوضوح\nنقطة بداية مفيدة.')}
          </h2>
          <div className="prose-content">
            <p>
              {text(
                locale,
                'We serve professionals and students considering their next learning decision, and organisations seeking a stronger public presence for a programme or initiative.',
                'نخدم المهنيين والطلاب الذين يفكرون في قرارهم التعليمي التالي، والمؤسسات الساعية إلى حضور أقوى لبرنامج أو مبادرة.',
              )}
            </p>
            <p>
              {text(
                locale,
                'Our approach connects academic understanding with editorial and production practice. The learning library offers original context around selected programmes, while our guides turn broad questions into practical next steps.',
                'يربط نهجنا الفهم الأكاديمي بالممارسة التحريرية والإنتاجية. تقدم مكتبة التعلم سياقًا أصيلًا للبرامج المختارة، وتحول الأدلة الأسئلة الواسعة إلى خطوات عملية.',
              )}
            </p>
            <Link className="text-link" href={route(locale, 'services')}>
              {text(locale, 'How we work with organisations', 'كيف نعمل مع المؤسسات')}
              <Arrow />
            </Link>
          </div>
        </div>
      </section>
      <ContactBand locale={locale} />
    </>
  );
}

export function Contact({ locale }: { locale: Locale }) {
  return (
    <>
      <PageHero
        eyebrow={text(locale, 'GET IN TOUCH', 'تواصل معنا')}
        title={text(locale, 'Let’s find\na useful next step.', 'لنجد\nخطوة تالية مفيدة.')}
        description={text(
          locale,
          'Tell us what you want to learn, explore or communicate. A little context helps us start the right conversation.',
          'أخبرنا بما تريد تعلّمه أو استكشافه أو إيصاله. قليل من السياق يساعدنا على بدء المحادثة المناسبة.',
        )}
      />
      <section className="section-space">
        <div className="container-shell contact-layout">
          <div className="contact-address">
            <Mail size={26} strokeWidth={1.3} aria-hidden="true" />
            <h2 className="display">{text(locale, 'Write to Merit Way', 'راسل ميريت واي')}</h2>
            <a href={contactHref()} dir="ltr">
              {site.email}
            </a>
            <p>
              <MapPin size={17} aria-hidden="true" />
              {text(
                locale,
                'Beirut, Lebanon · Media Street S.A.R.L.',
                'بيروت، لبنان · ميديا ستريت ش.م.م.',
              )}
            </p>
            <small>
              {text(
                locale,
                'Email opens in your preferred mail app.',
                'يفتح البريد في تطبيق المراسلة الذي تستخدمه.',
              )}
            </small>
          </div>
          <div className="contact-options">
            {[
              [
                'Learning enquiry',
                text(locale, 'A learning decision', 'قرار تعلّم'),
                text(
                  locale,
                  'Share the skill, role or project you want to develop.',
                  'شاركنا المهارة أو الدور أو المشروع الذي تريد تطويره.',
                ),
              ],
              [
                'Higher education enquiry',
                text(locale, 'An academic direction', 'اتجاه أكاديمي'),
                text(
                  locale,
                  'Tell us your field, intended degree and preferred study format.',
                  'أخبرنا باختصاصك والدرجة المقصودة وشكل الدراسة المفضل.',
                ),
              ],
              [
                'Programme promotion',
                text(locale, 'A programme to promote', 'برنامج للترويج'),
                text(
                  locale,
                  'Share the programme, audience, timing and content you need.',
                  'شاركنا البرنامج والجمهور والتوقيت والمحتوى المطلوب.',
                ),
              ],
            ].map(([subject, title, description]) => (
              <a key={subject} href={contactHref(`Merit Way — ${subject}`)}>
                <h3>
                  {title}
                  <Arrow />
                </h3>
                <p>{description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export function Disclosure({ locale }: { locale: Locale }) {
  const sections =
    locale === 'en'
      ? [
          [
            'Our relationship with providers',
            'Programme links are currently direct provider links. If an affiliate or referral arrangement is introduced, we will identify that relationship near the relevant link. Eligible purchases or registrations may then earn Media Street a commission under the provider’s terms.',
          ],
          [
            'Editorial approach',
            'Programme summaries provide an independent starting point for comparison. Providers determine their curricula, availability, fees and terms. Starting levels and practice exercises labelled as Merit Way suggestions are our editorial guidance, separate from provider assessments. We do not guarantee employment, admission, recognition or a particular learning outcome.',
          ],
          [
            'Higher education',
            'The higher education pathway is in development. Merit Way does not award degrees, decide admissions or collect tuition for listed providers. Any future formal institutional relationship will be described accurately. Team backgrounds are provided for context and do not imply endorsement by current or former institutions.',
          ],
          [
            'Privacy and contact',
            'This website has no user accounts, contact forms or advertising trackers. Search and filters run in your browser. If you email us, the information you send is used to respond to your enquiry and related communication. Hosting and email providers may process technical information in delivering their services. Contact us about your information at the email below.',
          ],
        ]
      : [
          [
            'علاقتنا بمقدمي البرامج',
            'روابط البرامج حاليًا مباشرة إلى الجهات المقدمة. إذا أُدخلت علاقة أفلييت أو إحالة، فسنعرّفها قرب الرابط المعني. وقد تحصل ميديا ستريت حينها على عمولة عن عمليات مؤهلة وفق شروط الجهة المقدمة.',
          ],
          [
            'النهج التحريري',
            'تقدم الملخصات نقطة بداية مستقلة للمقارنة. تحدد الجهات المقدمة المناهج والتوافر والرسوم والشروط. مستويات البداية والتمارين المنسوبة إلى ميريت واي إرشادات تحريرية مستقلة عن تقييمات البرنامج. لا نضمن وظيفة أو قبولًا أو اعترافًا أو نتيجة تعلم محددة.',
          ],
          [
            'التعليم الجامعي',
            'مسار التعليم الجامعي قيد التطوير. لا تمنح ميريت واي درجات ولا تقرر القبول ولا تجمع الرسوم الدراسية للجهات المدرجة. ستوصف أي علاقة مؤسسية رسمية مستقبلية بدقة. ترد خلفيات الفريق للتعريف ولا تعني تأييد المؤسسات الحالية أو السابقة.',
          ],
          [
            'الخصوصية والتواصل',
            'لا يستخدم الموقع حسابات أو نماذج اتصال أو أدوات تتبع إعلانية. يعمل البحث والتصفية في متصفحك. إذا راسلتنا بالبريد، نستخدم المعلومات للرد على استفسارك والتواصل المرتبط به. قد تعالج جهات الاستضافة والبريد معلومات تقنية لتقديم خدماتها. تواصل معنا بشأن معلوماتك عبر البريد أدناه.',
          ],
        ];
  return (
    <>
      <PageHero
        eyebrow={text(locale, 'DISCLOSURE & PRIVACY', 'الإفصاح والخصوصية')}
        title={text(
          locale,
          'Clear relationships.\nClear information.',
          'علاقات واضحة.\nمعلومات واضحة.',
        )}
        description={text(
          locale,
          'Updated 21 September 2026. Merit Way is operated by Media Street S.A.R.L.',
          'آخر تحديث: 21 أيلول 2026. تشغّل ميريت واي شركة ميديا ستريت ش.م.م.',
        )}
      />
      <section className="section-space">
        <div className="container-shell legal-grid">
          {sections.map(([title, body]) => (
            <section key={title} className="prose-content">
              <h2 className="display">{title}</h2>
              <p>{body}</p>
            </section>
          ))}
        </div>
        <div className="container-shell mt-12">
          <ButtonLink href={contactHref('Merit Way privacy enquiry')}>
            {text(locale, 'Contact us about your information', 'تواصل بشأن معلوماتك')}
          </ButtonLink>
        </div>
      </section>
    </>
  );
}
