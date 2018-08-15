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
      en: 'BEVERAGES',
      ja: 'ビバレッジ',
    },
    url: `${config.url}/beverages`,
    freq: 'daily',
    priority: 0.8,
    pages: [
      {
        name: {
          en: 'COFFEE(HOT)',
          ja: 'コーヒー(ホット)',
        },
        url: `${config.url}/beverages/coffee/hot`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'COFFEE(ICED)',
          ja: 'コーヒー(アイス)',
        },
        url: `${config.url}/beverages/coffee/iced`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'COLD BREW',
          ja: 'コールドブリュー',
        },
        url: `${config.url}/beverages/cold-brew/iced`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'LATTE(HOT)',
          ja: 'ラテ(ホット)',
        },
        url: `${config.url}/beverages/latte/hot`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'LATTE(ICED)',
          ja: 'ラテ(アイス)',
        },
        url: `${config.url}/beverages/latte/iced`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'AMERICANO(HOT)',
          ja: 'アメリカーノ(ホット)',
        },
        url: `${config.url}/beverages/americano/hot`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'AMERICANO(ICED)',
          ja: 'アメリカーノ(アイス)',
        },
        url: `${config.url}/beverages/americano/iced`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'MOCHA(HOT)',
          ja: 'モカ(ホット)',
        },
        url: `${config.url}/beverages/mocha/hot`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'MOCHA(ICED)',
          ja: 'モカ(アイス)',
        },
        url: `${config.url}/beverages/mocha/iced`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'VANILLA LATTE(HOT)',
          ja: 'バニララテ(ホット)',
        },
        url: `${config.url}/beverages/vanilla-latte/hot`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'VANILLA LATTE(ICED)',
          ja: 'バニララテ(アイス)',
        },
        url: `${config.url}/beverages/vanilla-latte/iced`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'COCOA(HOT)',
          ja: 'ココア(ホット)',
        },
        url: `${config.url}/beverages/cocoa/hot`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'COCOA(ICED)',
          ja: 'ココア(アイス)',
        },
        url: `${config.url}/beverages/cocoa/iced`,
        freq: 'daily',
        priority: 0.5,
      },
      {
        name: {
          en: 'ESPRESSO',
          ja: 'エスプレッソ',
        },
        url: `${config.url}/beverages/espresso/hot`,
        freq: 'daily',
        priority: 0.5,
      },
    ],
  },
  {
    name: {
      en: 'FOODS',
      ja: 'フード',
    },
    url: `${config.url}/foods`,
    freq: 'daily',
    priority: 0.8,
    pages: [
      {
        name: {
          en: 'MADELEINE',
          ja: 'マドレーヌ',
        },
        url: `${config.url}/foods/madeleine`,
        freq: 'daily',
        priority: 0.5,
      },
    ],
  },
  {
    name: {
      en: 'GOODS',
      ja: 'グッズ',
    },
    url: `${config.url}/goods`,
    freq: 'daily',
    priority: 0.8,
    pages: [],
  },
  {
    name: {
      en: 'ABOUT US',
      ja: '私たちについて',
    },
    url: `${config.url}/about-us`,
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
