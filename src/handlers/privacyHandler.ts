import * as express from 'express';

import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { Dictionary } from 'utils/Dictionary';

interface IPrivacyPage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
}

export function privacyHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;

  const props: IPrivacyPage = {
    ...req.layout,
    title: `${dic.t('Pages.Privacy.PRIVACY')} | ${dic.t('name')}`,
    description: dic.t('Pages.Privacy.description'),
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

  res.render('pages/Privacy', { dic, props });
}
