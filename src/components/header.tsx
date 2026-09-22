'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useRef, useState } from 'react';
import { Menu, X, Globe2 } from 'lucide-react';
import { route, text } from '@/lib/content';
import { site } from '@/lib/site';
import type { Locale } from '@/lib/types';

export function Header({ locale }: { locale: Locale }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const cleanPath =
    site.basePath && pathname.startsWith(site.basePath)
      ? pathname.slice(site.basePath.length)
      : pathname;
  const other = locale === 'en' ? 'ar' : 'en';
  const otherPath = cleanPath.replace(new RegExp(`^/${locale}(?=/|$)`), `/${other}`);
  const links = [
    ['programmes', text(locale, 'Learning', 'التعلم')],
    ['higher-education', text(locale, 'Higher education', 'التعليم الجامعي')],
    ['services', text(locale, 'For organisations', 'للمؤسسات')],
    ['guides', text(locale, 'Journal', 'الأدلة')],
    ['about', text(locale, 'About us', 'عنّا')],
  ];
  return (
    <header
      className="site-header"
      onKeyDown={(event) => {
        if (event.key === 'Escape' && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <div className="container-shell header-inner">
        <Link
          href={route(locale)}
          className="wordmark"
          aria-label={text(locale, 'Merit Way home', 'ميريت واي — الرئيسية')}
          onClick={() => setOpen(false)}
        >
          <span dir="ltr">
            MERIT<span className="wordmark-way">WAY</span>
            <span className="brand-dot" />
          </span>
          <small>{text(locale, 'A MEDIA STREET INITIATIVE', 'مبادرة من ميديا ستريت')}</small>
        </Link>
        <nav className="desktop-nav" aria-label={text(locale, 'Main navigation', 'التنقل الرئيسي')}>
          {links.map(([path, label]) => (
            <Link
              key={path}
              href={route(locale, path)}
              aria-current={cleanPath.startsWith(route(locale, path)) ? 'page' : undefined}
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="header-controls">
          <Link
            className="language-link"
            href={otherPath}
            hrefLang={other}
            lang={other}
            onClick={() => setOpen(false)}
          >
            <Globe2 size={16} aria-hidden="true" />
            <span>{other === 'ar' ? 'العربية' : 'EN'}</span>
          </Link>
          <button
            ref={toggle}
            className="menu-toggle"
            type="button"
            aria-expanded={open}
            aria-controls="mobile-navigation"
            aria-label={text(
              locale,
              open ? 'Close menu' : 'Open menu',
              open ? 'إغلاق القائمة' : 'فتح القائمة',
            )}
            onClick={() => setOpen(!open)}
          >
            {open ? <X aria-hidden="true" size={23} /> : <Menu aria-hidden="true" size={23} />}
          </button>
        </div>
      </div>
      <nav
        id="mobile-navigation"
        className="mobile-nav container-shell"
        hidden={!open}
        aria-label={text(locale, 'Mobile navigation', 'التنقل على الهاتف')}
      >
        {links.map(([path, label]) => (
          <Link key={path} href={route(locale, path)} onClick={() => setOpen(false)}>
            {label}
          </Link>
        ))}
        <Link href={route(locale, 'contact')} onClick={() => setOpen(false)}>
          {text(locale, 'Get in touch', 'تواصل معنا')}
        </Link>
      </nav>
      <noscript>
        <nav className="container-shell no-script-nav">
          {links.map(([path, label]) => (
            <a key={path} href={`${site.basePath}${route(locale, path)}`}>
              {label}
            </a>
          ))}
        </nav>
      </noscript>
    </header>
  );
}
