import * as path from 'path';

import * as express from 'express';
import * as pug from 'pug';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { config } from 'config';
import { stores } from 'data/stores';
import { MapsPageContainer } from 'presentations/components/MapsPage';
import { Provider } from 'presentations/containers/Container';
import { IAction, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';
import { reducer } from 'presentations/pages/Maps/reducer';
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
  images: {
    rectangle: {
      en: string;
      ja: string;
    };
    square: {
      en: string;
      ja: string;
    };
  };
  pageType: string;
  baseUrl: string;
  url: {
    en: string;
    ja: string;
  };
  path: string;
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
  const storeKey: string = req.params.key;

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
  const titleSafix: string = `${dic.t('name')} | ${dic.t('siteDescription')}`;
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
    images: {
      // TODO: 3600 * 1890で画像作る
      rectangle: {
        en: 'TODO en',
        ja: 'TODO ja',
      },
      // TODO: 1890 * 1890で画像作る
      square: {
        en: 'TODO en',
        ja: 'TODO ja',
      },
    },
    // FYI: http://fbdevwiki.com/wiki/Open_Graph_protocol#Types
    // FYI: https://developers.facebook.com/docs/reference/opengraph/
    pageType: 'cafe',
    baseUrl: config.url[lang],
    url: config.url,
    path: req.originalUrl,
    facebookPageUrl: config.facebookPageUrl,
    twitterCardType: config.twitterCardType,
    twitterAccount: config.twitterAccount,
    env: process.env.NODE_ENV || 'development',
    gaCode: secret.gaCode,
    route: req.path,
    entrypoint: '/pages/Maps/bundle.js',
    stylesheet: '/pages/Maps/index.css',
    state: appStore.getState(),
    content: renderToString(React.createElement(Provider, { store: appStore }, React.createElement(MapsPageContainer))),
  };

  res.send(compiledFunction({ props }));
}
