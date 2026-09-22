import Link from 'next/link';
import { ArrowUpRight } from 'lucide-react';
import type { ReactNode } from 'react';

export function Arrow({ className = '' }: { className?: string }) {
  return (
    <ArrowUpRight
      aria-hidden="true"
      size={19}
      strokeWidth={1.5}
      className={`shrink-0 ${className}`}
    />
  );
}
export function ButtonLink({
  href,
  children,
  light = false,
  external = false,
  className = '',
}: {
  href: string;
  children: ReactNode;
  light?: boolean;
  external?: boolean;
  className?: string;
}) {
  const style = `button ${light ? 'button-light' : 'button-dark'} ${className}`;
  if (external || href.startsWith('mailto:'))
    return (
      <a
        className={style}
        href={href}
        {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      >
        {children}
        <Arrow />
      </a>
    );
  return (
    <Link className={style} href={href}>
      {children}
      <Arrow />
    </Link>
  );
}
export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <p className={`eyebrow ${className}`}>{children}</p>;
}
export function SectionHeading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="section-heading">
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="display section-title">{title}</h2>
      </div>
      {children && <div className="section-description">{children}</div>}
    </div>
  );
}
export function PageHero({
  eyebrow,
  title,
  description,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="page-hero">
      <div className="container-shell">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1 className="display page-title">{title}</h1>
        <div className="page-hero-bottom">
          <p className="lead max-w-2xl">{description}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
