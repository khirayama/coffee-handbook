import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MapsDesktopPageContainer } from 'presentations/containers/MapsDesktopPage';
import { IAction, IState } from 'presentations/pages/ShopEdit/interfaces';
import { reducer } from 'presentations/pages/ShopEdit/reducer';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    state: IState;
  }
}

const initialState: IState = {
  ...window.state,
};

const store: Store<IState, IAction> = new Store(initialState, reducer);

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(MapsDesktopPageContainer)), el);
});
