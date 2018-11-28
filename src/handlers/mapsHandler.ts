// tslint:disable:no-http-string
import * as path from 'path';

import * as express from 'express';
import * as pug from 'pug';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { config } from 'config';
import { stores } from 'data/stores';
import { Provider } from 'presentations/containers/Container';
import { MapsDesktopPageContainer } from 'presentations/containers/MapsDesktopPage';
import { MapsMobilePageContainer } from 'presentations/containers/MapsMobilePage';
import { IAction, IPosition, IRawStore, IState, IStore } from 'presentations/pages/Maps/interfaces';
import { reducer } from 'presentations/pages/Maps/reducer';
import { secret } from 'secret';
import { ISearchResult, storeSearchEngine } from 'StoreSearchEngine';
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
  jsonLD: {};
  state: IState;
  content: string;
}

const compiledFunction: (options: { props: IProps }) => void = pug.compileFile(
  path.resolve('dist', 'presentations', 'application', 'Layout.new.pug'),
  {
    basedir: path.resolve('dist', 'presentations'),
  },
);

// FIXME: data/stores loads data async.
setTimeout(() => {
  storeSearchEngine.buildIndex(stores);
}, 10);

// tslint:disable-next-line:max-func-body-length cyclomatic-complexity
export function mapsHandler(req: express.Request, res: express.Response): void {
  const lang: string = req.lang;
  const dic: Dictionary = req.dic;
  const storeKey: string = req.params.key;
  const searchKeyword: string = req.query.q ? storeSearchEngine.decode(req.query.q) : '';
  const searchPos: IPosition = {
    lat: req.query.pos ? req.query.pos.split(',')[0] : null,
    lng: req.query.pos ? req.query.pos.split(',')[1] : null,
  };

  const storeResource: Resource<IRawStore, IStore> = new Resource(stores, lang);
  const store: IStore = storeResource
    .where({
      key: storeKey,
    })
    .findOne();
  const pos: IPosition = {
    lat: store ? store.lat : 35.664035,
    lng: store ? store.lng : 139.698212,
  };
  let targetStoreKeys: string[] = [];
  if (searchKeyword) {
    const result: ISearchResult = storeSearchEngine.search(searchKeyword, searchPos);
    targetStoreKeys = result.results.map((tmp: { store: IRawStore; score: number; key: string }): string => tmp.key);
    const firstResult: { score: number; key: string; store: IRawStore } = result.results[0];
    if (firstResult) {
      pos.lat = firstResult ? firstResult.store.lat : pos.lat;
      pos.lng = firstResult ? firstResult.store.lng : pos.lng;
    }
  }

  const appStore: AppStore<IState, IAction> = new AppStore(
    {
      lang,
      stores,
      ui: {
        sheetMode: store || targetStoreKeys.length ? <'none'>'none' : <'default'>'default',
        targetStoreKey: targetStoreKeys[0] || null,
        targetStoreKeys,
        searchQuery: '',
        currentPos: null,
        pos,
        selectedStoreKey: storeKey,
        zoom: 8,
        offset: <[number, number]>[0, 0],
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

  // FYI: https://schema.org/CafeOrCoffeeShop
  // FYI: https://developers.google.com/search/docs/data-types/breadcrumb
  // FYI: https://qiita.com/narumana/items/b66969b80cce848b2ddf
  // TODO: https://developers.google.com/search/docs/data-types/sitelinks-searchbox
  const jsonLD: {}[] = [];
  // tslint:disable-next-line:no-any
  const site: any = {
    '@context': 'http://schema.org',
    '@type': 'WebSite',
    name: dic.t('name'),
    url: config.url[lang],
  };
  jsonLD.push(site);
  // tslint:disable-next-line:no-any
  const breadcrumbList: any = {
    '@context': 'http://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        item: {
          '@id': config.url[lang],
          name: dic.t('name'),
        },
      },
    ],
  };
  jsonLD.push(breadcrumbList);
  if (store) {
    breadcrumbList.itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      item: {
        '@id': `${config.url[lang]}${req.path}`,
        name: store.name,
      },
    });

    // FYI: https://developers.google.com/search/docs/data-types/social-profile
    // tslint:disable-next-line:no-any
    const socialProfile: any = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      name: store.name,
      url: store.media.web || '',
      sameAs: Object.keys(store.media)
        .map((key: string) => {
          if (key === 'web' || key === 'ec' || key === 'instagramTag' || key === 'googleMaps') {
            return null;
          }

          return store.media[key];
        })
        .filter((v: string | undefined) => !!v),
    };
    jsonLD.push(socialProfile);

    // FYI: https://developers.google.com/search/docs/data-types/local-business
    // tslint:disable-next-line:no-any
    const cafeOrCoffeeShop: any = {
      '@context': 'http://schema.org',
      '@type': 'Restaurant',
      '@id': `${config.url[lang]}${req.path}`,
      address: store.address,
      name: store.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: store.lat,
        longitude: store.lng,
      },
      priceRange: lang === 'en' ? '&dollar;12' : '&yen;1,200',
      telephone: store.tel,
      email: store.email,
      url: store.media.web || '',
      image: `${config.url[lang]}/images/icon_${lang}_square.png`,
      servesCuisine: 'coffee',
      // FYI: If google supports following type, please use it.
      // '@type': 'CafeOrCoffeeShop', 'LocalBusiness' or 'Restaurant'
    };
    jsonLD.push(cafeOrCoffeeShop);
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
    entrypoint: '',
    stylesheet: '',
    jsonLD,
    state: appStore.getState(),
    content: '',
  };

  if (req.useragent.isMobile) {
    props.entrypoint = '/pages/Maps/mobile/bundle.js';
    props.stylesheet = '/pages/Maps/mobile/index.css';
    props.content = renderToString(
      React.createElement(Provider, { store: appStore }, React.createElement(MapsMobilePageContainer)),
    );
    res.send(compiledFunction({ props }));
  } else {
    props.entrypoint = '/pages/Maps/desktop/bundle.js';
    props.stylesheet = '/pages/Maps/desktop/index.css';
    props.content = renderToString(
      React.createElement(Provider, { store: appStore }, React.createElement(MapsDesktopPageContainer)),
    );
    res.send(compiledFunction({ props }));
  }
}
