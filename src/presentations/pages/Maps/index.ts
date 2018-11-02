// tslint:disable:no-any
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MapsPageContainer } from 'presentations/components/MapsPage';
import { Provider } from 'presentations/containers/Container';
import { IAction, IPosition, IState } from 'presentations/pages/Maps/interfaces';
import { loadView, reducer } from 'presentations/pages/Maps/reducer';
import { Store as AppStore } from 'utils/Store';

// TODO: store検索
// TODO: モーダル閉じる時のanimatin
// TODO: Provider componentを作って、contextを共有。Containerはcontextでdispatchを受け取る
// TODO: render rootでProviderを必須にする感じか。Providerはstoreを必ず受け取る
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
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store: appStore }, React.createElement(MapsPageContainer)), el);
});
