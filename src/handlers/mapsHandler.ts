import * as path from 'path';

import * as express from 'express';
import * as pug from 'pug';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { config } from 'config';
import { IRawStore, stores } from 'data/stores';
import { MapsPage } from 'presentations/components/MapsPage';
import { IAction, IState } from 'presentations/pages/Maps/interfaces';
import { reducer } from 'presentations/pages/Maps/reducer';
import { IStore } from 'resources/Store';
import { secret } from 'secret';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';
import { Store as AppStore } from 'utils/Store';

interface IProps {
  lang: string;
  title: string;
  description: string;
  author: string;
  keywords: string[];
  name: string;
  image: string;
  pageType: string;
  baseUrl: string;
  path: string;
  facebookAppId: string;
  facebookPageUrl: string;
  twitterCardType: string;
  twitterAccount: string;
  env: string;
  gaCode: string;
  route: string;
  entrypoint: string;
  stylesheet: string;
  state: IState;
  content: string;
}

const compiledFunction: (options: { props: IProps }) => void = pug.compileFile(
  path.resolve('dist', 'presentations', 'application', 'Layout.new.pug'),
  {
    basedir: path.resolve('dist', 'presentations'),
  },
);

export function mapsHandler(req: express.Request, res: express.Response): void {
  const lang: string = req.lang;
  const dic: Dictionary = req.dic;
  const storeKey: string = req.query.key;

  const storeResource: Resource<IRawStore, IStore> = new Resource(stores, lang);
  const store: IStore = storeResource
    .where({
      key: storeKey,
    })
    .findOne();

  const appStore: AppStore<IState, IAction> = new AppStore(
    {
      lang,
      stores,
      ui: {
        currentPos: null,
        pos: {
          lat: 35.664035,
          lng: 139.698212,
        },
        selectedStoreKey: storeKey,
        zoom: 8,
      },
    },
    reducer,
  );
  const titleSafix: string = `${dic.t('Pages.Maps.MAP')} | ${dic.t('name')}`;
  const title: string = store ? `${store.name} | ${titleSafix}` : titleSafix;
  const description: string = store ? `${store.name} | ${store.address} | ${titleSafix}` : titleSafix;
  const keywords: string[] = ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'];
  if (store) {
    keywords.push(store.name);
    keywords.push(store.address);
  }

  const props: IProps = {
    lang,
    title,
    description,
    author: req.dic.t('author'),
    keywords,
    name: req.dic.t('name'),
    image: 'TODO',
    pageType: 'cafe',
    baseUrl: config.url,
    path: req.originalUrl,
    facebookAppId: config.facebookAppId,
    facebookPageUrl: config.facebookPageUrl,
    twitterCardType: config.twitterCardType,
    twitterAccount: config.twitterAccount,
    env: process.env.NODE_ENV || 'development',
    gaCode: secret.gaCode,
    route: `${req.route.path}?key=${storeKey}`,
    entrypoint: '/pages/Maps/bundle.js',
    stylesheet: '/pages/Maps/index.css',
    state: appStore.getState(),
    content: renderToString(React.createElement(MapsPage, { store: appStore })),
  };

  res.send(compiledFunction({ props }));
}
