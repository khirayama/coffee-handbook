import { config } from 'config';

interface ISitemapOptions {
  lastmod?: string;
  freq?: string;
  priority?: number;
}

// Ref: https://www.sitemaps.org/ja/
// Ref: https://www.adminweb.jp/wmt/sitemap/index1.html
// freq: always, hourly, daily, weekly, monthly, yearly, never
interface IPage {
  name: {
    en: string;
    ja: string;
  };
  url: string;
  freq: string;
  priority: number;
  lastmod?: string;
  pages?: IPage[];
}

const coffeeHandbookPages: IPage[] = [
  {
    name: {
      en: 'COFFEE HANDBOOK',
      ja: '珈琲手帖',
    },
    url: `${config.url}`,
    freq: 'daily',
    priority: 1,
  },
  {
    name: {
      en: 'ABOUT COFFEE HANDBOOK',
      ja: '珈琲手帖について',
    },
    url: `${config.url}/about`,
    freq: 'daily',
    priority: 0.3,
    pages: [],
  },
  {
    name: {
      en: 'PRIVACY',
      ja: 'プライバシーポリシー',
    },
    url: `${config.url}/privacy`,
    freq: 'daily',
    priority: 0.3,
    pages: [],
  },
  {
    name: {
      en: 'SITEMAP',
      ja: 'サイトマップ',
    },
    url: `${config.url}/sitemap`,
    freq: 'daily',
    priority: 0.3,
    pages: [],
  },
];

function xmlUrlTemplate(page: IPage): string {
  return `<url><loc>${page.url}</loc>${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}${
    page.freq ? `<changefreq>${page.freq}</changefreq>` : ''
  }${page.priority ? `<priority>${page.priority}</priority>` : ''}</url>`;
}

function xmlSitemapTemplate(urlTemplates: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlTemplates.join(
    '',
  )}</urlset>`;
}

function buildUrlTemplates(pages: IPage[]): string[] {
  let urlTemplates: string[] = [];

  pages.forEach((page: IPage) => {
    urlTemplates.push(xmlUrlTemplate(page));

    if (page.pages) {
      const subUrlTemplates: string[] = buildUrlTemplates(page.pages);
      urlTemplates = urlTemplates.concat(subUrlTemplates);
    }
  });

  return urlTemplates;
}

function htmlUrlTemplate(page: IPage, lang: string): string {
  return `
    <li><a href="${page.url}">${page.name[lang]}</a></li>
  `;
}

function htmlSitemapTemplate(htmlTemplates: string[]): string {
  return `
    <ul>
      ${htmlTemplates.join('')}
    </ul>
  `;
}

function buildHtmlSitemapTemplates(pages: IPage[], lang: string): string[] {
  let urlTemplates: string[] = [];

  pages.forEach((page: IPage) => {
    urlTemplates.push(htmlUrlTemplate(page, lang));

    if (page.pages) {
      urlTemplates.push('<ul>');
      const subUrlTemplates: string[] = buildHtmlSitemapTemplates(page.pages, lang);
      urlTemplates = urlTemplates.concat(subUrlTemplates);
      urlTemplates.push('</ul>');
    }
  });

  return urlTemplates;
}

export function buildXmlSitemap(): string {
  return xmlSitemapTemplate(buildUrlTemplates(coffeeHandbookPages));
}

export function buildHtmlSitemap(lang: string): string {
  return htmlSitemapTemplate(buildHtmlSitemapTemplates(coffeeHandbookPages, lang));
}
