// tslint:disable:no-http-string
import * as path from 'path';

import * as express from 'express';
import * as pug from 'pug';
import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { MapsDesktopPageContainer } from 'presentations/containers/MapsDesktopPage';
import { MapsMobilePageContainer } from 'presentations/containers/MapsMobilePage';
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
    lang,
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
      React.createElement(Provider, { store }, React.createElement(MapsMobilePageContainer)),
    );
    res.send(compiledFunction({ props }));
  } else {
    props.entrypoint = '/pages/ShopEdit/desktop/bundle.js';
    props.stylesheet = '/pages/ShopEdit/desktop/index.css';
    props.content = renderToString(
      React.createElement(Provider, { store }, React.createElement(MapsDesktopPageContainer)),
    );
    res.send(compiledFunction({ props }));
  }
}
