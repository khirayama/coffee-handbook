// tslint:disable:no-http-string
import * as path from 'path';

import * as express from 'express';
import * as pug from 'pug';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { ShopEditDesktopPageContainer } from 'presentations/containers/ShopEditDesktopPageContainer';
import { ShopEditMobilePageContainer } from 'presentations/containers/ShopEditMobilePageContainer';
import { IAction, IState } from 'presentations/pages/ShopEdit/interfaces';
import { reducer } from 'presentations/pages/ShopEdit/reducer';
import { secret } from 'secret';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';

interface IProps {
  lang: string;
  env: string;
  gaCode: string;
  route: string;
  entrypoint: string;
  stylesheet: string;
  state: IState;
  content: string;
}

const compiledFunction: (options: { props: IProps }) => void = pug.compileFile(
  path.resolve('dist', 'presentations', 'pages', 'ShopEdit', 'Layout.pug'),
  {
    basedir: path.resolve('dist', 'presentations'),
  },
);

// tslint:disable-next-line:max-func-body-length cyclomatic-complexity
export function shopEditHandler(req: express.Request, res: express.Response): void {
  const lang: string = req.lang;
  const shopKey: string = req.params.key;
  // Build initial state
  const initialState: IState = {
    shopkey: '',
    email: '',
    tel: '',
    permanentClosed: false,
    transferTo: '',
    web: '',
    ec: '',
    facebook: '',
    twitter: '',
    instagram: '',
    instagramTag: '',
    googleMaps: '',
    hasRoaster: 0,
    hasSpeciality: 0,
    hasBeans: 0,
    hasCredit: 0,
    hasPower: 0,
    hasWifi: 0,
    hasBarrierFree: 0,
    hasPet: 0,
    hasSmoking: 0,
    // shop attributes
    en: {
      name: '',
      address: '',
      hoursNote: '',
    },
    ja: {
      name: '',
      address: '',
      hoursNote: '',
    },
    // shop open hours
    openHours: [
      [['07:00', '20:00']],
      [['07:00', '20:00']],
      [['07:00', '20:00']],
      [['07:00', '20:00']],
      [['07:00', '20:00']],
      [['07:00', '20:00']],
      [['07:00', '20:00']],
    ],
  };
  const store: Store<IState, IAction> = new Store(initialState, reducer);

  const props: IProps = {
    lang,
    env: process.env.NODE_ENV || 'development',
    gaCode: secret.gaCode,
    route: req.path,
    entrypoint: '',
    stylesheet: '',
    state: store.getState(),
    content: '',
  };

  if (req.useragent.isMobile) {
    props.entrypoint = '/pages/ShopEdit/mobile/bundle.js';
    props.stylesheet = '/pages/ShopEdit/mobile/index.css';
    props.content = renderToString(
      React.createElement(Provider, { store }, React.createElement(ShopEditMobilePageContainer)),
    );
    res.send(compiledFunction({ props }));
  } else {
    props.entrypoint = '/pages/ShopEdit/desktop/bundle.js';
    props.stylesheet = '/pages/ShopEdit/desktop/index.css';
    props.content = renderToString(
      React.createElement(Provider, { store }, React.createElement(ShopEditDesktopPageContainer)),
    );
    res.send(compiledFunction({ props }));
  }
}
