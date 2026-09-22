'use client';

import Link from 'next/link';
import { useId, useRef, useState } from 'react';
import { ArrowUpRight, BookOpen, GraduationCap, Radio, Pause, Play } from 'lucide-react';
import type { Locale } from '@/lib/types';
import { route, text } from '@/lib/content';

function orbitPath(phase: number, meridian: boolean) {
  return (
    Array.from({ length: 97 }, (_, i) => {
      const u = meridian ? phase : (i / 96) * Math.PI * 2;
      const v = meridian ? (i / 96) * Math.PI * 2 : phase;
      const x = (148 + 53 * Math.cos(v)) * Math.cos(u);
      const y = (148 + 53 * Math.cos(v)) * Math.sin(u);
      const z = 53 * Math.sin(v);
      const tiltedY = y * 0.55 - z * 0.835;
      const px = x * 0.87 - tiltedY * -0.49;
      const py = x * -0.49 + tiltedY * 0.87;
      return `${i ? 'L' : 'M'}${(300 + px).toFixed(2)},${(290 + py).toFixed(2)}`;
    }).join(' ') + 'Z'
  );
}

const meridians = Array.from({ length: 44 }, (_, i) => orbitPath((i / 44) * Math.PI * 2, true));
const parallels = Array.from({ length: 18 }, (_, i) => orbitPath((i / 18) * Math.PI * 2, false));

export function OrbitScene({ locale }: { locale: Locale }) {
  const id = useId().replaceAll(':', '');
  const [selected, setSelected] = useState(0);
  const [paused, setPaused] = useState(false);
  const scene = useRef<HTMLDivElement>(null);
  const paths = [
    {
      label: text(locale, 'Learn', 'تعلّم'),
      title: text(locale, 'Small steps. Expanding possibilities.', 'خطوات صغيرة. إمكانات تتّسع.'),
      detail: text(
        locale,
        '15 selected programmes. Your next capability.',
        '15 برنامجًا منتقى. قدرتك التالية.',
      ),
      path: 'programmes',
      icon: BookOpen,
    },
    {
      label: text(locale, 'Go further', 'تعمّق'),
      title: text(locale, 'Make room for a bigger ambition.', 'امنح طموحك مساحة أوسع.'),
      detail: text(
        locale,
        'Explore our higher education direction.',
        'استكشف توجهنا نحو التعليم الجامعي.',
      ),
      path: 'higher-education',
      icon: GraduationCap,
    },
    {
      label: text(locale, 'Make an impact', 'اترك أثرًا'),
      title: text(locale, 'Great ideas deserve an audience.', 'الأفكار الكبيرة تستحق جمهورًا.'),
      detail: text(
        locale,
        'Media, storytelling and programme promotion.',
        'إعلام وسرد وترويج للبرامج.',
      ),
      path: 'services',
      icon: Radio,
    },
  ];
  const current = paths[selected];
  const Icon = current.icon;
  return (
    <div
      className="orbit-experience"
      data-orbit={selected}
      data-paused={paused}
      ref={scene}
      onPointerMove={(event) => {
        if (
          !matchMedia('(pointer: fine) and (prefers-reduced-motion: no-preference)').matches ||
          paused
        )
          return;
        const bounds = event.currentTarget.getBoundingClientRect();
        scene.current?.style.setProperty(
          '--pointer-x',
          `${((event.clientX - bounds.left) / bounds.width - 0.5) * 12}px`,
        );
        scene.current?.style.setProperty(
          '--pointer-y',
          `${((event.clientY - bounds.top) / bounds.height - 0.5) * 12}px`,
        );
      }}
      onPointerLeave={() => {
        scene.current?.style.setProperty('--pointer-x', '0px');
        scene.current?.style.setProperty('--pointer-y', '0px');
      }}
    >
      <noscript>
        <style>
          {
            '.orbit-sculpture, .orbit-satellite { animation: none !important; } .motion-control { display: none; }'
          }
        </style>
      </noscript>
      <div className="orbit-topline">
        <span>{text(locale, 'A WORLD OF POSSIBILITY', 'عالم من الإمكانات')}</span>
        <span dir="ltr">MW / 0{selected + 1}</span>
      </div>
      <div className="orbital-art" aria-hidden="true">
        <div className="orbital-halo" />
        <svg viewBox="0 0 600 580" className="orbital-svg" fill="none">
          <defs>
            <linearGradient
              id={`${id}-wire`}
              x1="110"
              y1="110"
              x2="470"
              y2="420"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#e8ffb5" />
              <stop offset=".45" stopColor="#d3ef92" />
              <stop offset="1" stopColor="#4b8178" />
            </linearGradient>
            <radialGradient id={`${id}-sphere`} cx=".3" cy=".25" r=".8">
              <stop stopColor="#f6ffe4" />
              <stop offset=".35" stopColor="#d3ef92" />
              <stop offset=".7" stopColor="#7d9e5c" />
              <stop offset="1" stopColor="#233932" />
            </radialGradient>
            <radialGradient id={`${id}-shade`}>
              <stop stopColor="#172e37" />
              <stop offset="1" stopColor="#101b25" />
            </radialGradient>
          </defs>
          <g className="orbit-coordinate-lines" stroke="#60747f" strokeOpacity=".25">
            <circle cx="300" cy="290" r="248" strokeDasharray="2 9" />
            <path d="M300 12V558M22 290H578" />
            <path d="M88 80L512 500M88 500L512 80" strokeDasharray="3 12" />
          </g>
          <g className="orbit-sculpture">
            <ellipse
              cx="300"
              cy="290"
              rx="205"
              ry="127"
              transform="rotate(-29 300 290)"
              fill={`url(#${id}-shade)`}
            />
            <g stroke={`url(#${id}-wire)`} strokeWidth=".8">
              {meridians.map((d, i) => (
                <path key={`m${i}`} d={d} opacity=".7" />
              ))}
              {parallels.map((d, i) => (
                <path key={`p${i}`} d={d} opacity=".9" />
              ))}
            </g>
            <circle cx="300" cy="290" r="51" fill={`url(#${id}-sphere)`} />
            <circle cx="286" cy="276" r="59" stroke="#e8ffb5" strokeOpacity=".12" />
          </g>
          <g className="orbit-satellite">
            <circle cx="300" cy="42" r="9" fill="#d3ef92" />
            <circle cx="300" cy="42" r="17" stroke="#d3ef92" strokeOpacity=".3" />
          </g>
          <g className="orbit-satellite orbit-satellite-second">
            <circle cx="300" cy="520" r="6" fill="#c4b8f2" />
          </g>
          <g fill="#adbdc5" fontFamily="monospace" fontSize="10">
            <text x="30" y="278">
              01
            </text>
            <text x="550" y="278">
              03
            </text>
            <text x="314" y="24">
              ∞
            </text>
          </g>
        </svg>
        <div className="orbit-caption">
          <span className="orbit-dot" />
          {text(locale, 'Curiosity has no fixed point.', 'الفضول لا يعرف حدودًا.')}
        </div>
      </div>
      <div
        className="orbit-selector"
        role="group"
        aria-label={text(locale, 'Explore a pathway', 'استكشف مسارًا')}
      >
        {paths.map((path, i) => (
          <button
            key={path.path}
            type="button"
            aria-pressed={selected === i}
            onClick={() => setSelected(i)}
          >
            <span>0{i + 1}</span>
            {path.label}
          </button>
        ))}
      </div>
      <div className="orbit-selection" aria-live="polite">
        <Icon size={24} strokeWidth={1.4} aria-hidden="true" />
        <div>
          <p>{current.title}</p>
          <span>{current.detail}</span>
        </div>
        <Link
          href={route(locale, current.path)}
          aria-label={text(locale, `Explore: ${current.label}`, `استكشف: ${current.label}`)}
        >
          <ArrowUpRight aria-hidden="true" size={24} />
        </Link>
      </div>
      <button
        type="button"
        className="motion-control"
        aria-pressed={paused}
        onClick={() => setPaused(!paused)}
      >
        {paused ? <Play size={12} aria-hidden="true" /> : <Pause size={12} aria-hidden="true" />}
        {text(
          locale,
          paused ? 'Resume animation' : 'Pause animation',
          paused ? 'تشغيل الحركة' : 'إيقاف الحركة',
        )}
      </button>
    </div>
  );
}
