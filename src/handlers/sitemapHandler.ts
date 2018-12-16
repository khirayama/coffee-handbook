import * as express from 'express';

import { config } from 'config';
import { dic } from 'dic';
import { secret } from 'secret';
import { IDic } from 'utils/Dictionary';
import { buildHtmlSitemap, buildXmlSitemap } from 'utils/sitemap';

interface ISitemapPage {
  env: string;
  gaCode: string;
  lang: string;
  title: string;
  description: string;
  author: string;
  baseUrl: string;
  url: IDic;
  path: string;
  name: string;
  keywords: string[];
  image: string;
  facebookPageUrl: string;
  twitterCardType: string;
  twitterAccount: string;
  pageType: string;
  header: {
    lang: string;
    path: string;
    url: IDic;
  };
  content: string;
}

export function sitemapHandler(req: express.Request, res: express.Response): void {
  const lang: string = req.lang;

  const props: ISitemapPage = {
    env: process.env.NODE_ENV || 'development',
    gaCode: secret.gaCode,
    author: dic.t('author', lang),
    name: dic.t('name', lang),
    baseUrl: config.url[lang],
    url: config.url,
    facebookPageUrl: config.facebookPageUrl,
    twitterCardType: config.twitterCardType,
    twitterAccount: config.twitterAccount,
    lang,
    path: req.originalUrl,
    title: `${dic.t('Pages.Sitemap.SITEMAP', lang)} | ${dic.t('name', lang)} | ${dic.t('siteDescription', lang)}`,
    description: dic.t('Pages.Sitemap.description', lang),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
    image: 'TODO',
    pageType: 'cafe',

    header: {
      lang: req.lang,
      path: req.path,
      url: config.url,
    },
    content: buildHtmlSitemap(req.lang),
  };

  res.render('pages/Sitemap', { dic, props });
}

export function sitemapXmlHandler(req: express.Request, res: express.Response): void {
  res.set('Content-Type', 'text/xml').send(buildXmlSitemap(req.lang));
}
