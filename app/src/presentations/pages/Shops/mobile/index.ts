// tslint:disable:no-any
import * as queryString from 'query-string';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { MapsMobilePageContainer } from 'presentations/containers/MapsMobilePage';
import { searchShop, selectShop, unselectShop, updateView } from 'presentations/pages/Shops/actionCreators';
import { IAction, IDispatch, IPosition, IRawShop, IShop, IState } from 'presentations/pages/Shops/interfaces';
import { reducer } from 'presentations/pages/Shops/reducer';
import { getMapOffset, loadView, waitNextTick } from 'presentations/utils/helpers';
import { shopSearchEngine } from 'ShopSearchEngine';
import { Provider } from 'utils/Container';
import { Resource } from 'utils/Resource';
import { Store } from 'utils/Store';

declare global {
  // tslint:disable-next-line:interface-name
  interface Window {
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

window.addEventListener('popstate', () => {
  const dispatch: IDispatch = store.dispatch.bind(store);

  const state: IState = store.getState();
  // FYI: For shop
  let shopKey: string | null = window.location.pathname.replace('/shops/', '');
  if (shopKey === '/') {
    shopKey = null;
    unselectShop(dispatch);
  } else {
    selectShop(dispatch, shopKey);
  }

  if (shopKey) {
    waitNextTick().then(() => {
      const shopResource: Resource<IRawShop, IShop> = new Resource(state.shops, state.lang);
      const currentShop: IShop = shopResource
        .where({
          key: shopKey,
        })
        .findOne();
      const offset: [number, number] = getMapOffset();
      updateView(
        dispatch,
        {
          lng: currentShop.lng,
          lat: currentShop.lat,
        },
        state.ui.zoom,
        offset,
      );
    });
  } else {
    // FYI: For search
    const query: { q?: string; pos?: string } = queryString.parse(window.location.search);
    const searchKeyword: string = query.q ? shopSearchEngine.decode(query.q) : '';
    const searchPos: IPosition = {
      lat: query.pos ? Number(query.pos.split(',')[0]) : null,
      lng: query.pos ? Number(query.pos.split(',')[1]) : null,
    };
    searchShop(dispatch, searchKeyword, searchPos);
  }
});

window.addEventListener('DOMContentLoaded', () => {
  const el: HTMLElement = window.document.querySelector('.application');
  ReactDOM.render(React.createElement(Provider, { store }, React.createElement(MapsMobilePageContainer)), el);
});
