import programmeData from '@/content/programmes.json';
import guideData from '@/content/guides.json';
import type { Category, Guide, Locale, Programme, Translated } from './types';

export const programmes = programmeData as Programme[];
export const guides = guideData as Guide[];
export const categories: Record<Category, Translated> = {
  ai: { en: 'AI & work', ar: 'الذكاء الاصطناعي والعمل' },
  marketing: { en: 'Marketing & media', ar: 'التسويق والإعلام' },
  data: { en: 'Data & projects', ar: 'البيانات والمشاريع' },
  leadership: { en: 'Leadership & growth', ar: 'القيادة والتطوير' },
};
export const levels: Record<Programme['level'], Translated> = {
  foundation: { en: 'Foundation', ar: 'تأسيسي' },
  developing: { en: 'Developing knowledge', ar: 'تطوير المعرفة' },
};
export const outcomes: Record<Programme['outcome'], Translated> = {
  workflow: { en: 'AI workflow', ar: 'عمل بالذكاء الاصطناعي' },
  campaign: { en: 'Campaign plan', ar: 'خطة حملة' },
  project: { en: 'Project plan', ar: 'خطة مشروع' },
  analysis: { en: 'Data analysis', ar: 'تحليل بيانات' },
  leadership: { en: 'Leadership practice', ar: 'ممارسة قيادية' },
};
export const featuredProgrammes = [
  'project-management',
  'google-ai',
  'content-marketing',
  'data-analytics',
  'social-media-marketing',
  'leadership',
].map((id) => programmes.find((p) => p.id === id)!);
export function isLocale(value: string): value is Locale {
  return value === 'en' || value === 'ar';
}
export function route(locale: Locale, path = '') {
  return `/${locale}${path ? `/${path.replace(/^\//, '').replace(/\/$/, '')}` : ''}/`;
}
export function text(locale: Locale, en: string, ar: string) {
  return locale === 'en' ? en : ar;
}

export const team = [
  {
    image: 'hala-el-khatib.jpg',
    name: { en: 'Dr Hala El Khatib', ar: 'د. هلا الخطيب' },
    role: { en: 'Academic & media leadership', ar: 'قيادة أكاديمية وإعلامية' },
    bio: {
      en: 'Media Street director, Lebanese University academic, journalist and television professional.',
      ar: 'مديرة ميديا ستريت وأستاذة في الجامعة اللبنانية وصحافية ومنتجة برامج تلفزيونية.',
    },
  },
  {
    image: 'marie-therese-kreidy.jpg',
    name: { en: 'Dr Marie Therese Kreidy', ar: 'د. ماري تريز كريدي' },
    role: { en: 'Communication & learning', ar: 'الاتصال والتعلم المهني' },
    bio: {
      en: 'Noursat Chief Executive Officer and Lebanese University academic with regional communication experience.',
      ar: 'المديرة التنفيذية لنورسات وأستاذة في الجامعة اللبنانية بخبرة إقليمية في الاتصال.',
    },
  },
  {
    image: 'nayef-krayem.jpg',
    name: { en: 'Nayef Krayem', ar: 'نايف كريم' },
    role: { en: 'Development & production', ar: 'تطوير المشاريع والإنتاج' },
    bio: {
      en: 'Regional media, production and project-development experience across Lebanon and the Gulf.',
      ar: 'خبرة إقليمية في الإعلام والإنتاج وتطوير المشاريع بين لبنان والخليج.',
    },
  },
];
