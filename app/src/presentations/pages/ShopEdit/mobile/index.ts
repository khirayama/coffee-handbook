import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { ShopEditMobilePageContainer } from 'presentations/containers/ShopEditMobilePageContainer';
import { IAction, IState } from 'presentations/pages/ShopEdit/interfaces';
import { reducer } from 'presentations/pages/ShopEdit/reducer';
import { Provider } from 'utils/Container';
import { Store } from 'utils/Store';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
    // tslint:disable-next-line:no-any
    state: any;
  }
}

const initialState: IState = {
  ...window.state,
};

const store: Store<IState, IAction> = new Store(initialState, reducer);

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(ShopEditMobilePageContainer)), el);
});
