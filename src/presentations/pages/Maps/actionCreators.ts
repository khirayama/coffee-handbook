// tslint:disable:no-any
import { actionTypes } from 'presentations/pages/Maps/actionTypes';
import { IAction, IDispatch, IPosition, IRawStore } from 'presentations/pages/Maps/interfaces';
import { ISearchResult, storeSearchEngine } from 'StoreSearchEngine';

///********** START *********///
import { redHorn } from 'data/stores/redHorn';
import { saredoCoffee } from 'data/stores/saredoCoffee';
import { tokadoCoffee } from 'data/stores/tokadoCoffee';

// parseSearchQuery
// buildSearchQuery
// function searchStoreMock(query: string, pos: IPosition): ISearchResult {
//   // TODO: Make url safe
//   const normalizedQuery: string[] = query
//     .replace(/,/g, ' ')
//     .replace(/、/g, ' ')
//     .replace(/　/, ' ')
//     .split(' ')
//     .map((key: string) => key.trim())
//     .filter((key: string) => !!key);
//   const searchQuery: string = `${normalizedQuery.join('+')}&pos=${pos.lat},${pos.lng}`;
//
//   return {
//     searchQuery: searchQuery,
//     result: [saredoCoffee, tokadoCoffee, redHorn],
//   };
// }
///********** END *********///

export function updateView(
  dispatch: IDispatch,
  pos: IPosition,
  zoom: number,
  offset: [number, number],
): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
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

export function selectStore(dispatch: IDispatch, storeKey: string | null): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.SELECT_STORE,
        payload: {
          storeKey,
        },
      };
      dispatch(action);
      resolve(action);
    },
  );
}

export function selectTargetStore(dispatch: IDispatch, storeKey: string | null): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.SELECT_TARGET_STORE,
        payload: {
          storeKey,
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

export function updateSheetMode(dispatch: IDispatch, mode: string): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.UPDATE_SHEET_MODE,
        payload: {
          mode,
        },
      };
      dispatch(action);
      resolve(action);
    },
  );
}

export function searchStore(dispatch: IDispatch, query: string, pos: IPosition): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const result: ISearchResult = storeSearchEngine.search(query, pos);

      const action: IAction = {
        actionType: actionTypes.SEARCH_STORE,
        payload: {
          searchQuery: result.searchQuery,
          targetStoreKeys: result.results.map((tmp: any): string => tmp.key),
          zoom: 12,
          pos: {
            lat: result.results[0].store.lat,
            lng: result.results[0].store.lng,
          },
        },
      };

      dispatch(action);
      resolve(action);
    },
  );
}
