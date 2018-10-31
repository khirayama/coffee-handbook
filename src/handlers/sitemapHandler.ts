import * as express from 'express';

import { config } from 'config';
import { secret } from 'secret';
import { Dictionary } from 'utils/Dictionary';
import { buildHtmlSitemap, buildXmlSitemap } from 'utils/sitemap';

interface ISitemapPage {
  env: string;
  gaCode: string;
  lang: string;
  title: string;
  description: string;
  author: string;
  baseUrl: string;
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
  };
  content: string;
}

export function sitemapHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;

  const props: ISitemapPage = {
    env: process.env.NODE_ENV || 'development',
    gaCode: secret.gaCode,
    author: req.dic.t('author'),
    name: req.dic.t('name'),
    baseUrl: config.url,
    facebookPageUrl: config.facebookPageUrl,
    twitterCardType: config.twitterCardType,
    twitterAccount: config.twitterAccount,
    lang: req.lang,
    path: req.originalUrl,
    title: `${dic.t('Pages.Sitemap.SITEMAP')} | ${dic.t('name')}`,
    description: dic.t('Pages.Sitemap.description'),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
    image: 'TODO',
    pageType: 'cafe',

    header: {
      lang: req.lang,
    },
    content: buildHtmlSitemap(req.lang),
  };

  res.render('pages/Sitemap', { dic, props });
}

export function sitemapXmlHandler(req: express.Request, res: express.Response): void {
  res.set('Content-Type', 'text/xml').send(buildXmlSitemap());
}
