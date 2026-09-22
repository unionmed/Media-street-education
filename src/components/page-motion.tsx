'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export function PageMotion() {
  const pathname = usePathname();
  useEffect(() => {
    const preference = matchMedia('(prefers-reduced-motion: reduce)');
    if (preference.matches) return;
    const animations = new Set<Animation>();
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          observer.unobserve(entry.target);
          const animation = entry.target.animate(
            [
              { opacity: 0.15, transform: 'translateY(28px)' },
              { opacity: 1, transform: 'translateY(0)' },
            ],
            { duration: 750, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'none' },
          );
          animations.add(animation);
          animation.onfinish = () => animations.delete(animation);
        });
      },
      { threshold: 0.12 },
    );
    document
      .querySelectorAll(
        '.section-heading, .team-person, .pathway-panel, .programme-card, .journal-feature, .journal-item, .degree-details article, .service-list article',
      )
      .forEach((element) => observer.observe(element));
    const stop = () => {
      if (preference.matches) {
        observer.disconnect();
        animations.forEach((animation) => animation.cancel());
      }
    };
    preference.addEventListener('change', stop);
    return () => {
      observer.disconnect();
      animations.forEach((animation) => animation.cancel());
      preference.removeEventListener('change', stop);
    };
  }, [pathname]);
  return null;
}
