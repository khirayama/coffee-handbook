import * as express from 'express';

import { IMapsPage } from 'presentations/pages/Maps';
import { Dictionary } from 'utils/Dictionary';

export function mapsHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const props: IMapsPage = {
    ...req.layout,
    title: dic.t('name'),
    description: dic.t('Pages.Home.description'),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
    image: 'TODO',
    pageType: 'cafe',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
  };

  res.render('pages/Maps', { dic, props });
}
