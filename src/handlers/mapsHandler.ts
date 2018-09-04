import * as express from 'express';

import { IMapsPage } from 'presentations/pages/Maps';
import { getNextStatusMessage } from 'presentations/utils/getNextStatusMessage';
import { getOpenStatus, IOpenStatus } from 'presentations/utils/getOpenStatus';
import { IStore, Store } from 'resources/Store';
import { Dictionary } from 'utils/Dictionary';

export function mapsHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const store: IStore = Store(req.lang)
    .where({
      key: req.query.key,
    })
    .findOne();

  const now: Date = new Date();
  const currentDay: number = now.getDay();
  let openStatus: IOpenStatus | null = null;
  let nextStatusMessage: string | null = null;
  if (store) {
    openStatus = getOpenStatus(now, store.hours);
    nextStatusMessage = getNextStatusMessage(openStatus, dic);
  }

  const props: IMapsPage = {
    ...req.layout,
    title: dic.t('name'),
    description: dic.t('Pages.Home.description'),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
    image: 'TODO',
    pageType: 'cafe',

    store,
    currentDay,
    openStatus,
    nextStatusMessage,
  };

  res.render('pages/Maps', { dic, props });
}
