// tslint:disable:no-any
import { actionTypes } from 'presentations/pages/Maps/actionTypes';
import { IAction, IDispatch, IPosition, IRawStore } from 'presentations/pages/Maps/interfaces';
import { ISearchResult, storeSearchEngine } from 'StoreSearchEngine';

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

export function selectStore(dispatch: IDispatch, storeKey: string): Promise<IAction> {
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

export function unselectStore(dispatch: IDispatch): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const action: IAction = {
        actionType: actionTypes.UNSELECT_STORE,
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

export function searchStore(dispatch: IDispatch, query: string, pos: IPosition): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const result: ISearchResult = storeSearchEngine.search(query, pos);
      const firstResult: { score: number; key: string; store: IRawStore } = result.results[0];
      const newPos: IPosition = firstResult
        ? {
            lat: firstResult.store.lat,
            lng: firstResult.store.lng,
          }
        : pos;

      const action: IAction = {
        actionType: actionTypes.SEARCH_STORE,
        payload: {
          searchQuery: result.searchQuery,
          targetStoreKeys: result.results.map(
            (tmp: { store: IRawStore; score: number; key: string }): string => tmp.key,
          ),
          zoom: 12,
          pos: newPos,
        },
      };

      dispatch(action);
      resolve(action);
    },
  );
}

export function filterStore(dispatch: IDispatch, query: string, pos: IPosition): Promise<IAction> {
  return new Promise(
    (resolve: any): void => {
      const result: ISearchResult = storeSearchEngine.search(query, pos);
      const candidateStoreKeys: string[] = result.results.map(
        (res: { key: string; score: number; store: IRawStore }) => res.store.key,
      );
      const action: IAction = {
        actionType: actionTypes.FILTER_STORE,
        payload: {
          searchQuery: result.searchQuery,
          targetStoreKeys: candidateStoreKeys,
        },
      };

      dispatch(action);
      resolve(action);
    },
  );
}
