// tslint:disable:no-any
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MapsDesktopPageContainer } from 'presentations/containers/MapsDesktopPage';
import { IAction, IPosition, IState } from 'presentations/pages/Maps/interfaces';
import { reducer } from 'presentations/pages/Maps/reducer';
import { loadView } from 'presentations/utils/helpers';
import { Provider } from 'utils/Container';
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
initialState.ui.currentPos = view.currentPos || null;
initialState.ui.pos = view.pos;
initialState.ui.zoom = view.zoom;

const store: Store<IState | null, IAction> = new Store(initialState, reducer);

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(MapsDesktopPageContainer)), el);
});
