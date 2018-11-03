import * as express from 'express';

import { config } from 'config';
import { secret } from 'secret';
import { Dictionary } from 'utils/Dictionary';

interface IAboutPage {
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
}

export function aboutHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;

  const props: IAboutPage = {
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
    title: `${dic.t('Pages.About.ABOUT')} | ${dic.t('name')} | ${dic.t('siteDescription')}`,
    description: dic.t('Pages.About.description'),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
    image: 'TODO',
    pageType: 'cafe',

    header: {
      lang: req.lang,
    },
  };

  res.render('pages/About', { dic, props });
}
