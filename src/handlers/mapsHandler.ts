// tslint:disable:no-http-string
import * as path from 'path';

import * as express from 'express';
import * as pug from 'pug';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { config } from 'config';
import { shops } from 'data/shops';
import { Provider } from 'presentations/containers/Container';
import { MapsDesktopPageContainer } from 'presentations/containers/MapsDesktopPage';
import { MapsMobilePageContainer } from 'presentations/containers/MapsMobilePage';
import { IAction, IPosition, IRawShop, IShop, IState } from 'presentations/pages/Maps/interfaces';
import { reducer } from 'presentations/pages/Maps/reducer';
import { secret } from 'secret';
import { ISearchResult, shopSearchEngine } from 'ShopSearchEngine';
import { Dictionary } from 'utils/Dictionary';
import { Resource } from 'utils/Resource';
import { Store } from 'utils/Store';

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

// FIXME: data/shops loads data async.
setTimeout(() => {
  shopSearchEngine.buildIndex(shops);
}, 10);

// tslint:disable-next-line:max-func-body-length cyclomatic-complexity
export function mapsHandler(req: express.Request, res: express.Response): void {
  const lang: string = req.lang;
  const dic: Dictionary = req.dic;
  const shopKey: string = req.params.key;
  const searchKeyword: string = req.query.q ? shopSearchEngine.decode(req.query.q) : '';
  const searchPos: IPosition = {
    lat: req.query.pos ? Number(req.query.pos.split(',')[0]) : null,
    lng: req.query.pos ? Number(req.query.pos.split(',')[1]) : null,
  };

  // Build initial state
  const initialState: IState = {
    lang,
    shops,
    ui: {
      isShownModal: false,
      isShownShopCards: false,
      isShownSheet: false,
      isShownCurrentPositionButton: false,
      targetShopKey: null,
      targetShopKeys: [],
      selectedShopKey: null,
      currentPos: null,
      pos: {
        lat: 35.664035,
        lng: 139.698212,
      },
      zoom: 8,
      offset: <[number, number]>[0, 0],
    },
  };
  const shopResource: Resource<IRawShop, IShop> = new Resource(shops, lang);
  const shop: IShop = shopResource
    .where({
      key: shopKey,
    })
    .findOne();
  if (searchKeyword) {
    const result: ISearchResult = shopSearchEngine.search(searchKeyword, searchPos);
    const firstResult: { score: number; key: string; shop: IRawShop } = result.results[0];

    if (firstResult) {
      initialState.ui.isShownModal = false;
      initialState.ui.isShownShopCards = true;
      initialState.ui.isShownCurrentPositionButton = false;
      initialState.ui.targetShopKeys = result.results.map(
        (tmp: { shop: IRawShop; score: number; key: string }): string => tmp.key,
      );
      initialState.ui.targetShopKey = initialState.ui.targetShopKeys[0];
      initialState.ui.pos.lat = firstResult.shop.lat;
      initialState.ui.pos.lng = firstResult.shop.lng;
    }
  }
  if (shop) {
    initialState.ui.selectedShopKey = shop.key;
    initialState.ui.isShownModal = true;
    initialState.ui.isShownShopCards = false;
    initialState.ui.isShownCurrentPositionButton = false;
    initialState.ui.pos.lat = shop.lat;
    initialState.ui.pos.lng = shop.lng;
  }
  const store: Store<IState, IAction> = new Store(initialState, reducer);

  // For SEO
  const titleSafix: string = `${dic.t('name')} | ${dic.t('siteDescription')}`;
  const title: string = shop ? `${shop.name} | ${titleSafix}` : titleSafix;
  const description: string = shop ? `${shop.name} | ${shop.address} | ${titleSafix}` : titleSafix;
  const keywords: string[] = ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'];
  if (shop) {
    keywords.push(shop.name);
    keywords.push(shop.address);
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
  if (shop) {
    breadcrumbList.itemListElement.push({
      '@type': 'ListItem',
      position: 2,
      item: {
        '@id': `${config.url[lang]}${req.path}`,
        name: shop.name,
      },
    });
    // FYI: https://developers.google.com/search/docs/data-types/social-profile
    // tslint:disable-next-line:no-any
    const socialProfile: any = {
      '@context': 'http://schema.org',
      '@type': 'Organization',
      name: shop.name,
      url: shop.media.web || '',
      sameAs: Object.keys(shop.media)
        .map((key: string) => {
          if (key === 'web' || key === 'ec' || key === 'instagramTag' || key === 'googleMaps') {
            return null;
          }

          return shop.media[key];
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
      address: shop.address,
      name: shop.name,
      geo: {
        '@type': 'GeoCoordinates',
        latitude: shop.lat,
        longitude: shop.lng,
      },
      priceRange: lang === 'en' ? '&dollar;12' : '&yen;1,200',
      telephone: shop.tel,
      email: shop.email,
      url: shop.media.web || '',
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
    state: store.getState(),
    content: '',
  };

  if (req.useragent.isMobile) {
    props.entrypoint = '/pages/Maps/mobile/bundle.js';
    props.stylesheet = '/pages/Maps/mobile/index.css';
    props.content = renderToString(
      React.createElement(Provider, { store }, React.createElement(MapsMobilePageContainer)),
    );
    res.send(compiledFunction({ props }));
  } else {
    props.entrypoint = '/pages/Maps/desktop/bundle.js';
    props.stylesheet = '/pages/Maps/desktop/index.css';
    props.content = renderToString(
      React.createElement(Provider, { store }, React.createElement(MapsDesktopPageContainer)),
    );
    res.send(compiledFunction({ props }));
  }
}
