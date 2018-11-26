// tslint:disable:no-any
import { actionTypes } from 'presentations/pages/Maps/actionTypes';
import { IAction, IDispatch, IPosition, IRawStore } from 'presentations/pages/Maps/interfaces';

///********** START *********///
import { redHorn } from 'data/stores/redHorn';
import { saredoCoffee } from 'data/stores/saredoCoffee';

interface ISearchResult {
  searchQuery: string;
  result: IRawStore[];
}

// parseSearchQuery
// buildSearchQuery
function searchStoreMock(query: string, pos: IPosition): ISearchResult {
  // TODO: Make url safe
  const normalizedQuery: string[] = query
    .replace(/,/g, ' ')
    .replace(/、/g, ' ')
    .replace(/　/, ' ')
    .split(' ')
    .map((key: string) => key.trim())
    .filter((key: string) => !!key);
  const searchQuery: string = `${normalizedQuery.join('+')}&pos=${pos.lat},${pos.lng}`;

  return {
    searchQuery: searchQuery,
    result: [saredoCoffee, redHorn],
  };
}
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
      // TODO: Use search engine
      const result: ISearchResult = searchStoreMock(query, pos);

      const action: IAction = {
        actionType: actionTypes.SEARCH_STORE,
        payload: {
          searchQuery: result.searchQuery,
          targetStoreKeys: result.result.map((rawStore: IRawStore): string => rawStore.key),
        },
      };

      dispatch(action);
      resolve(action);
    },
  );
}
