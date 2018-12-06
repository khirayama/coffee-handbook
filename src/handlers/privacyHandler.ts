import * as express from 'express';

import { config } from 'config';
import { dic } from 'dic';
import { secret } from 'secret';

interface IPrivacyPage {
  env: string;
  gaCode: string;
  lang: string;
  title: string;
  description: string;
  author: string;
  baseUrl: string;
  url: {
    en: string;
    ja: string;
  };
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
    url: {
      en: string;
      ja: string;
    };
  };
  twitterLink: string;
}

export function privacyHandler(req: express.Request, res: express.Response): void {
  const lang: string = req.lang;

  const props: IPrivacyPage = {
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
    title: `${dic.t('Pages.Privacy.PRIVACY', lang)} | ${dic.t('name', lang)} | ${dic.t('siteDescription', lang)}`,
    description: dic.t('Pages.Privacy.description', lang),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
    image: 'TODO',
    pageType: 'cafe',

    header: {
      lang: req.lang,
      path: req.path,
      url: config.url,
    },
    twitterLink: `https://twitter.com/${config.twitterAccount}`,
  };

  res.render('pages/Privacy', { dic, props });
}
