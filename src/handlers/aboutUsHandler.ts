import * as express from 'express';

import { config } from 'config';
import { IAboutUsPage } from 'presentations/pages/AboutUs';
import { Dictionary } from 'utils/Dictionary';

export function aboutUsHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = new Dictionary(req.lang);

  const props: IAboutUsPage = {
    author: dic.t('author'),
    name: dic.t('name'),
    baseUrl: config.url,
    facebookAppId: config.facebookAppId,
    facebookPageUrl: config.facebookPageUrl,
    twitterCardType: config.twitterCardType,
    twitterAccount: config.twitterAccount,

    lang: req.lang,
    path: req.originalUrl,

    title: dic.t('name'),
    description: dic.t('Pages.Home.description'),
    keywords: ['hirayama', '平山', 'coffee', 'コーヒー', '珈琲', 'institute', '研究所'],
    image: 'TODO',
    pageType: 'cafe',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
  };

  res.render('pages/AboutUs', { dic, props });
}
