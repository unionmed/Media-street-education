import Link from 'next/link';
import { route, text } from '@/lib/content';
import { site, contactHref } from '@/lib/site';
import type { Locale } from '@/lib/types';
import { ButtonLink, Eyebrow } from './ui';

export function ContactBand({ locale }: { locale: Locale }) {
  return (
    <section className="contact-band">
      <span className="contact-watermark" aria-hidden="true">
        ↗
      </span>
      <div className="container-shell contact-band-inner">
        <div>
          <Eyebrow>{text(locale, 'A CONVERSATION IS A GOOD START', 'المحادثة بداية جيدة')}</Eyebrow>
          <h2 className="display">
            {text(locale, 'What comes next for you?', 'ما خطوتك التالية؟')}
          </h2>
          <p>
            {text(
              locale,
              'A skill to build. A degree to explore. A programme to bring to life.',
              'مهارة تبنيها. درجة تستكشفها. برنامج تمنحه حضورًا.',
            )}
          </p>
        </div>
        <ButtonLink href={contactHref()} light>
          {text(locale, 'Let’s talk', 'لنتحدث')}
        </ButtonLink>
      </div>
    </section>
  );
}
export function Footer({ locale }: { locale: Locale }) {
  return (
    <footer className="site-footer">
      <div className="container-shell">
        <div className="footer-top">
          <p>
            {text(
              locale,
              'Independent perspective.\nMeaningful progress.',
              'رؤية مستقلة.\nتقدّم له معنى.',
            )}
          </p>
          <nav aria-label={text(locale, 'Footer navigation', 'روابط التذييل')}>
            <Link href={route(locale, 'programmes')}>
              {text(locale, 'Learning library', 'مكتبة التعلم')}
            </Link>
            <Link href={route(locale, 'guides')}>
              {text(locale, 'Guides & perspectives', 'الأدلة والرؤى')}
            </Link>
            <Link href={route(locale, 'services')}>{text(locale, 'Our services', 'خدماتنا')}</Link>
            <Link href={route(locale, 'contact')}>{text(locale, 'Contact', 'تواصل')}</Link>
          </nav>
          <a className="footer-email" href={contactHref()} dir="ltr">
            {site.email}
          </a>
        </div>
        <div className="footer-wordmark" aria-hidden="true" dir="ltr">
          MERIT WAY
        </div>
        <div className="footer-bottom">
          <span>
            {text(
              locale,
              '© 2026 Merit Way. Operated by Media Street S.A.R.L.',
              '© 2026 ميريت واي. تشغّلها ميديا ستريت ش.م.م.',
            )}
          </span>
          <span>{text(locale, 'Beirut, Lebanon', 'بيروت، لبنان')}</span>
          <Link href={route(locale, 'disclosure')}>
            {text(locale, 'Disclosure & privacy', 'الإفصاح والخصوصية')}
          </Link>
        </div>
      </div>
    </footer>
  );
}
