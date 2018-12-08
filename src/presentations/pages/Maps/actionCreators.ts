// tslint:disable:no-any
import { actionTypes } from 'presentations/pages/Maps/actionTypes';
import { IAction, IDispatch, IPosition, IRawShop } from 'presentations/pages/Maps/interfaces';
import { saveView } from 'presentations/utils/helpers';
import { ISearchResult, shopSearchEngine } from 'ShopSearchEngine';

export function updateView(
  dispatch: IDispatch,
  pos: IPosition,
  zoom: number,
  offset: [number, number],
): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      saveView(pos, zoom);
      const action: IAction = {
        actionType: actionTypes.UPDATE_VIEW,
        payload: {
          pos,
          zoom,
          offset,
        },
      };
      dispatch(action);
      resolve(action);
    },
  );
}

export function selectShop(dispatch: IDispatch, shopKey: string): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.SELECT_SHOP,
        payload: {
          shopKey,
        },
      };
      dispatch(action);
      resolve(action);
    },
  );
}

export function unselectShop(dispatch: IDispatch): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.UNSELECT_SHOP,
      };
      dispatch(action);
      resolve(action);
    },
  );
}

export function selectTargetShop(
  dispatch: IDispatch,
  shopKey: string | null,
  pos: IPosition,
  zoom: number,
  offset: [number, number],
): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.SELECT_TARGET_SHOP,
        payload: {
          shopKey,
          pos,
          zoom,
          offset,
        },
      };
      dispatch(action);
      resolve(action);
    },
  );
}

export function updateCurrentPosition(dispatch: IDispatch, currentPos: IPosition): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.UPDATE_CURRENT_POSITION,
        payload: {
          currentPos,
        },
      };

      dispatch(action);
      resolve(action);
    },
  );
}

export function changeSheetShown(dispatch: IDispatch, isShown: boolean): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.UPDATE_SHEET_MODE,
        payload: {
          isShown,
        },
      };
      dispatch(action);
      resolve(action);
    },
  );
}

export function searchShop(dispatch: IDispatch, query: string, pos: IPosition): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const result: ISearchResult = shopSearchEngine.search(query, pos);
      const firstResult: { score: number; key: string; shop: IRawShop } = result.results[0];
      const newPos: IPosition = firstResult
        ? {
            lat: firstResult.shop.lat,
            lng: firstResult.shop.lng,
          }
        : pos;

      const action: IAction = {
        actionType: actionTypes.SEARCH_SHOP,
        payload: {
          searchQuery: result.searchQuery,
          targetShopKeys: result.results.map((tmp: { shop: IRawShop; score: number; key: string }): string => tmp.key),
          zoom: 12,
          pos: newPos,
        },
      };

      dispatch(action);
      resolve(action);
    },
  );
}

export function filterShop(dispatch: IDispatch, query: string, pos: IPosition): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const result: ISearchResult = shopSearchEngine.search(query, pos);
      const candidateShopKeys: string[] = result.results.map(
        (res: { key: string; score: number; shop: IRawShop }) => res.shop.key,
      );
      const action: IAction = {
        actionType: actionTypes.FILTER_SHOP,
        payload: {
          query,
          searchQuery: result.searchQuery,
          targetShopKeys: candidateShopKeys,
        },
      };

      dispatch(action);
      resolve(action);
    },
  );
}
