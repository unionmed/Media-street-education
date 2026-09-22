import type { Metadata, Viewport } from 'next';
import type { ReactNode } from 'react';
import { notFound } from 'next/navigation';
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { isLocale, text } from '@/lib/content';
import { locales } from '@/lib/types';
import { publicPath } from '@/lib/site';
import '../globals.css';

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export const metadata: Metadata = {
  title: { default: 'Merit Way', template: '%s | Merit Way' },
  icons: { icon: publicPath('images/favicon.svg') },
};
export const viewport: Viewport = { width: 'device-width', initialScale: 1, themeColor: '#182b2a' };

export default async function LocaleLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isLocale(locale)) notFound();
  return (
    <html lang={locale} dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      <body>
        <a href="#main" className="skip-link">
          {text(locale, 'Skip to content', 'تخطَّ إلى المحتوى')}
        </a>
        <Header locale={locale} />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
