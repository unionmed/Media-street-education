import fs from 'node:fs';
import { guides } from './guides.mjs';
const base = 'https://unionmed.github.io/Media-street-education/';
const esc = s => s.replaceAll('&','&amp;').replaceAll('"','&quot;');
for (const ar of [false,true]) {
  const i = ar ? 1 : 0;
  const prefix = ar ? 'arabic-' : '';
  const template = fs.readFileSync(`${prefix}guides.html`,'utf8');
  for (const guide of guides) {
    const file = `${prefix}guide-${guide.id}.html`;
    const en = `guide-${guide.id}.html`;
    const other = ar ? en : `arabic-${en}`;
    const body = `<main id="main" tabindex="-1"><section class="page-hero"><a class="breadcrumb" href="${prefix}guides.html">${ar ? 'مكتبة الأدلة' : 'Guide library'}</a><p class="eyebrow">${guide.category[i]}</p><h1>${guide.title[i]}</h1><p>${guide.intro[i]}</p></section><article class="section article long-guide"><p class="article-byline">${ar ? 'دليل تحريري من ميريت واي · 21 أيلول 2026' : 'A Merit Way editorial guide · 21 September 2026'}</p><nav class="article-toc" aria-label="${ar ? 'في هذا الدليل' : 'In this guide'}"><b>${ar ? 'في هذا الدليل' : 'In this guide'}</b><ol>${guide.sections.map((s,n)=>`<li><a href="#step-${n+1}">${s[i]}</a></li>`).join('')}</ol></nav>${guide.sections.map((s,n)=>`<section id="step-${n+1}"><h2>${s[i]}</h2><p>${s[ar ? 3 : 2]}</p></section>`).join('')}${guide.sources.length ? `<section class="article-sources"><h2>${ar ? 'مصادر للمتابعة' : 'Further reading'}</h2><ul>${guide.sources.map(([label,url])=>`<li><a href="${esc(url)}" lang="en" dir="ltr">${label}</a></li>`).join('')}</ul></section>` : ''}<p class="callout">${ar ? 'خطوة عملية: اختر فكرة واحدة من هذا الدليل وحوّلها إلى ورقة عمل قصيرة تخدم قرارك التالي.' : 'Put it into practice: choose one idea from this guide and turn it into a short working note for your next decision.'}</p><a class="button emerald" href="${prefix}${guide.next[0]}">${guide.next[ar ? 2 : 1]} <span aria-hidden="true">↗</span></a></article></main>`;
    const title = `${guide.title[i]} | ${ar ? 'ميريت واي' : 'Merit Way'}`;
    let html=template.replace(/<title>[\s\S]*?<\/title>/,`<title>${esc(title)}</title>`).replace(/<main[\s\S]*?<\/main>/,body)
      .replace(/<meta name="description"[^>]+>/,`<meta name="description" content="${esc(guide.intro[i])}">`)
      .replace(/<meta property="og:title"[^>]+>/,`<meta property="og:title" content="${esc(title)}">`)
      .replace(/<meta property="og:description"[^>]+>/,`<meta property="og:description" content="${esc(guide.intro[i])}">`)
      .replace(/<meta property="og:url"[^>]+>/,`<meta property="og:url" content="${base}${file}">`)
      .replace(/<link rel="canonical"[^>]+>/,`<link rel="canonical" href="${base}${file}">`)
      .replace(/<link rel="alternate"[^>]+>/g,'')
      .replace('</head>',`<link rel="alternate" hreflang="en" href="${base}${en}"><link rel="alternate" hreflang="ar" href="${base}arabic-${en}"><link rel="alternate" hreflang="x-default" href="${base}${en}"></head>`)
      .replace(/class="language" href="[^"]+"/,`class="language" href="${other}"`);
    fs.writeFileSync(file,html.replace(/[ \t]+$/gm, ''));
  }
  let index=template.replace(/<!-- additional-guides -->[\s\S]*?<!-- end-additional-guides -->/,'');
  const extra=`<!-- additional-guides -->${guides.map((g,n)=>`<article class="article-card"><p class="eyebrow">${g.category[i]}</p><h3>${g.title[i]}</h3><p>${g.intro[i]}</p><a class="text-link" href="${prefix}guide-${g.id}.html">${ar ? 'اقرأ الدليل' : 'Read guide'} <span aria-hidden="true">↗</span></a></article>`).join('')}<!-- end-additional-guides -->`;
  index=index.replace(/(<div class="article-grid">[\s\S]*?)(<\/div><\/section>)/,`$1${extra}$2`)
    .replace('Our initial guides help professionals compare options and assess whether an online programme suits their real goal.', 'Eight practical guides for choosing professional learning, preparing for higher education and turning knowledge into useful work.')
    .replace('تساعد أدلتنا الأولى المهنيين على مقارنة الخيارات ومعرفة ما إذا كان البرنامج الأونلاين ملائمًا لهدفهم الفعلي.', 'ثمانية أدلة عملية لاختيار التعلم المهني والاستعداد للتعليم العالي وتحويل المعرفة إلى عمل مفيد.');
  fs.writeFileSync(`${prefix}guides.html`,index);
}
