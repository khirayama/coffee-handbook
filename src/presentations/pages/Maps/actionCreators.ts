import { actionTypes } from 'presentations/pages/Maps/actionTypes';
import { IDispatch, IPosition } from 'presentations/pages/Maps/interfaces';

export function updateView(dispatch: IDispatch, pos: IPosition, zoom: number): void {
  dispatch({
    actionType: actionTypes.UPDATE_VIEW,
    payload: {
      pos,
      zoom,
    },
  });
}

export function selectStore(dispatch: IDispatch, storeKey: string | null): void {
  dispatch({
    actionType: actionTypes.SELECT_STORE,
    payload: {
      storeKey,
    },
  });
}

export function updateCurrentPosition(dispatch: IDispatch, currentPos: IPosition): void {
  dispatch({
    actionType: actionTypes.UPDATE_CURRENT_POSITION,
    payload: {
      currentPos,
    },
  });
}
