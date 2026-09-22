export const locales = ['en', 'ar'] as const;
export type Locale = (typeof locales)[number];
export type Translated<T = string> = Record<Locale, T>;
export type Category = 'ai' | 'marketing' | 'data' | 'leadership';

export interface Programme {
  id: string;
  title: string;
  provider: string;
  platform: string;
  category: Category;
  level: 'foundation' | 'developing';
  outcome: 'workflow' | 'campaign' | 'project' | 'analysis' | 'leadership';
  url: string;
  summary: Translated;
  audience: Translated;
  topics: Translated<string[]>;
  project: Translated;
}

export interface Guide {
  slug: string;
  category: Translated;
  title: Translated;
  intro: Translated;
  sections: { heading: Translated; paragraphs: Translated<string[]> }[];
  sources: { title: string; url: string }[];
  relatedPath: string;
}
