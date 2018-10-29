// tslint:disable:no-any
import * as queryString from 'query-string';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MapsPage } from 'presentations/components/MapsPage';
import { StoreCard } from 'presentations/components/StoreCard';
import { IPosition } from 'presentations/components/StoreMapView';
import { StoreMarker } from 'presentations/components/StoreMarker';
import { IAction, IState, loadView, reducer } from 'presentations/pages/Maps/reducer';
import { getOpenStatus, IOpenStatus } from 'presentations/utils/getOpenStatus';
import { logger } from 'presentations/utils/logger';
import { tracker, Tracker } from 'presentations/utils/tracker';
import { IStore, Store } from 'resources/Store';
import { Store as AppStore } from 'utils/Store';

// TODO: store検索
// TODO: モーダル閉じる時のanimatin
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
initialState.ui.currentPos = view.currentPos || null;
initialState.ui.pos = view.pos;
initialState.ui.zoom = view.zoom;

const appStore: AppStore<IState | null, IAction> = new AppStore(initialState, reducer);

window.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(React.createElement(MapsPage, { store: appStore }), window.document.querySelector('.application'));
});
