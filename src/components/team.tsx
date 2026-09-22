import Image from 'next/image';
import { team, text } from '@/lib/content';
import { publicPath } from '@/lib/site';
import type { Locale } from '@/lib/types';
import { Eyebrow } from './ui';

export function Team({ locale }: { locale: Locale }) {
  return (
    <section className="section-space team-section" id="team">
      <div className="container-shell">
        <div className="team-intro">
          <div>
            <Eyebrow>
              {text(locale, 'THE PEOPLE BEHIND THE PERSPECTIVE', 'الفريق وراء الرؤية')}
            </Eyebrow>
            <h2 className="display section-title">
              {text(locale, 'Academic depth.\nMedia instinct.', 'عمق أكاديمي.\nحسّ إعلامي.')}
            </h2>
          </div>
          <p className="lead">
            {text(
              locale,
              'Led by people who understand learning, communication and the work of bringing ideas to an audience.',
              'بقيادة فريق يفهم التعلم والاتصال والعمل على إيصال الأفكار إلى جمهورها.',
            )}
          </p>
        </div>
        <div className="team-grid">
          {team.map((person) => (
            <article key={person.image} className="team-person">
              <div className="team-image">
                <Image
                  src={publicPath(`images/${person.image}`)}
                  width={1536}
                  height={1536}
                  alt={person.name[locale]}
                  sizes="(max-width: 767px) 88vw, 30vw"
                />
              </div>
              <p className="eyebrow">{person.role[locale]}</p>
              <h3>{person.name[locale]}</h3>
              <p className="team-bio">{person.bio[locale]}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
