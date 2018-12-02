// tslint:disable:no-any
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'presentations/containers/Container';
import { MapsMobilePageContainer } from 'presentations/containers/MapsMobilePage';
import { IAction, IPosition, IState } from 'presentations/pages/Maps/interfaces';
import { loadView, reducer } from 'presentations/pages/Maps/reducer';
import { shopSearchEngine } from 'ShopSearchEngine';
import { Store } from 'utils/Store';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    options: {
      env: string;
      lang: string;
      gaCode: string;
      route: string;
    };
    state: IState;
  }
}

const view: { pos: IPosition; zoom: number; currentPos: IPosition | null } = loadView();

const initialState: IState = {
  ...window.state,
};
if (initialState.ui.selectedShopKey || initialState.ui.targetShopKeys.length) {
  initialState.ui.zoom = 12;
} else {
  initialState.ui.pos = view.pos;
  initialState.ui.zoom = view.zoom;
}
initialState.ui.currentPos = view.currentPos || null;

const store: Store<IState | null, IAction> = new Store(initialState, reducer);

shopSearchEngine.buildIndex(initialState.shops);

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(MapsMobilePageContainer)), el);
});
