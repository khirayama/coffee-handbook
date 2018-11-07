import { config } from 'config';
import { stores } from 'data/stores';
import { IRawStore } from 'presentations/pages/Maps/interfaces';

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
  url: {
    en: string;
    ja: string;
  };
  freq: string;
  priority: number;
  lastmod?: string;
  pages?: IPage[];
}

function createPages(): IPage[] {
  return [
    {
      name: {
        en: 'COFFEE HANDBOOK',
        ja: '珈琲手帖',
      },
      url: config.url,
      freq: 'daily',
      priority: 1,
      pages: stores.map(
        (store: IRawStore): IPage => {
          return {
            name: {
              en: `${store.name.en} | ${store.address.en}`,
              ja: `${store.name.ja} | ${store.address.ja}`,
            },
            url: {
              en: `${config.url.en}/stores/${store.key}`,
              ja: `${config.url.ja}/stores/${store.key}`,
            },
            freq: 'daily',
            priority: 0.5,
          };
        },
      ),
    },
    {
      name: {
        en: 'ABOUT COFFEE HANDBOOK',
        ja: '珈琲手帖について',
      },
      url: {
        en: `${config.url.en}/about`,
        ja: `${config.url.ja}/about`,
      },
      freq: 'daily',
      priority: 0.3,
      pages: [],
    },
    {
      name: {
        en: 'PRIVACY',
        ja: 'プライバシーポリシー',
      },
      url: {
        en: `${config.url.en}/privacy`,
        ja: `${config.url.ja}/privacy`,
      },
      freq: 'daily',
      priority: 0.3,
      pages: [],
    },
    {
      name: {
        en: 'SITEMAP',
        ja: 'サイトマップ',
      },
      url: {
        en: `${config.url.en}/sitemap`,
        ja: `${config.url.ja}/sitemap`,
      },
      freq: 'daily',
      priority: 0.3,
      pages: [],
    },
  ];
}

function xmlUrlTemplate(page: IPage, lang: string): string {
  const alternate: string = Object.keys(config.url)
    .map(
      (key: string): string => {
        return `<xhtml:link rel="alternate" hreflang="${key}" href="${config.url[key]}"/>`;
      },
    )
    .join('');

  return `<url><loc>${page.url[lang]}</loc>${alternate}${page.lastmod ? `<lastmod>${page.lastmod}</lastmod>` : ''}${
    page.freq ? `<changefreq>${page.freq}</changefreq>` : ''
  }${page.priority ? `<priority>${page.priority}</priority>` : ''}</url>`;
}

function xmlSitemapTemplate(urlTemplates: string[]): string {
  return `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">${urlTemplates.join(
    '',
  )}</urlset>`;
}

function buildUrlTemplates(pages: IPage[], lang: string): string[] {
  let urlTemplates: string[] = [];

  pages.forEach((page: IPage) => {
    urlTemplates.push(xmlUrlTemplate(page, lang));

    if (page.pages) {
      const subUrlTemplates: string[] = buildUrlTemplates(page.pages, lang);
      urlTemplates = urlTemplates.concat(subUrlTemplates);
    }
  });

  return urlTemplates;
}

function htmlUrlTemplate(page: IPage, lang: string): string {
  return `
    <li><a href="${page.url[lang]}">${page.name[lang]}</a></li>
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

export function buildXmlSitemap(lang: string): string {
  return xmlSitemapTemplate(buildUrlTemplates(createPages(), lang));
}

export function buildHtmlSitemap(lang: string): string {
  return htmlSitemapTemplate(buildHtmlSitemapTemplates(createPages(), lang));
}
