import * as path from 'path';

import * as express from 'express';
import * as pug from 'pug';

import { getNextStatusMessage } from 'presentations/utils/getNextStatusMessage';
import { getOpenStatus, IOpenStatus } from 'presentations/utils/getOpenStatus';
import { IStore, Store } from 'resources/Store';
import { Dictionary } from 'utils/Dictionary';

const basedir: string = path.join(__dirname, '..', 'presentations');
const storeTemplate: (props: object) => string = pug.compileFile(
  path.join(__dirname, '..', 'presentations', 'api', 'Store.pug'),
  {
    basedir,
  },
);

export function storeAPIHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const store: IStore = Store(req.lang)
    .where({
      key: req.params.storeKey,
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

  const props: {
    store: IStore;
    currentDay: number;
    openStatus: IOpenStatus;
    nextStatusMessage: string;
  } = {
    store,
    currentDay,
    openStatus,
    nextStatusMessage,
  };

  res.header('Content-Type', 'application/json; charset=utf-8').json({
    lat: store.lat,
    lng: store.lng,
    html: storeTemplate({ dic, props }),
  });
}
