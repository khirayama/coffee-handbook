import { actionTypes } from 'presentations/pages/Maps/actionTypes';
import { IAction, IPosition, ISheetModes, IState } from 'presentations/pages/Maps/interfaces';

const SAVE_VIEW_KEY: string = '__UI_MAP_VIEW';

function saveView(pos: IPosition, zoom: number): void {
  if (typeof window === 'object') {
    window.localStorage.setItem(
      SAVE_VIEW_KEY,
      JSON.stringify({
        pos,
        zoom,
      }),
    );
  }
}

export function loadView(): { pos: IPosition; zoom: number; currentPos: IPosition | null } {
  const defaultView: {
    currentPos: IPosition | null;
    pos: IPosition | null;
    zoom: number;
  } = {
    currentPos: null,
    pos: {
      lat: 35.664035,
      lng: 139.698212,
    },
    zoom: 8,
  };

  if (typeof window === 'object') {
    return JSON.parse(window.localStorage.getItem(SAVE_VIEW_KEY)) || defaultView;
  }

  return defaultView;
}

export function reducer(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: {
    pos?: IPosition;
    zoom?: number;
    offset?: [number, number];
    storeKey?: string;
    currentPos?: IPosition;
    searchQuery?: string;
    targetStoreKeys?: string[];
    mode?: ISheetModes;
  } = action.payload;

  switch (action.actionType) {
    case actionTypes.UPDATE_VIEW: {
      saveView(payload.pos, payload.zoom);
      newState.ui.pos = payload.pos;
      newState.ui.zoom = payload.zoom;
      newState.ui.offset = payload.offset;
      break;
    }
    case actionTypes.SELECT_STORE: {
      newState.ui.selectedStoreKey = payload.storeKey;
      break;
    }
    case actionTypes.UPDATE_CURRENT_POSITION: {
      newState.ui.currentPos = payload.currentPos;
      break;
    }
    case actionTypes.UPDATE_SHEET_MODE: {
      newState.ui.sheetMode = payload.mode;
      break;
    }
    case actionTypes.SEARCH_STORE: {
      newState.ui.sheetMode = <'closed'>'closed';
      newState.ui.searchQuery = payload.searchQuery;
      newState.ui.targetStoreKeys = payload.targetStoreKeys;
      break;
    }
    default:
  }

  return newState;
}
