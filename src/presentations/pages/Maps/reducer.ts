import { actionTypes } from 'presentations/pages/Maps/actionTypes';
import { IAction, IPosition, IState } from 'presentations/pages/Maps/interfaces';

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
    targetStoreKeys?: string[];
    isShown?: boolean;
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
      newState.ui.isShownSheet = false;
      newState.ui.isShownModal = true;
      newState.ui.isShownStoreCards = false;
      newState.ui.isShownCurrentPositionButton = false;
      break;
    }
    case actionTypes.UNSELECT_STORE: {
      newState.ui.selectedStoreKey = null;
      newState.ui.isShownModal = false;
      newState.ui.isShownSheet = false;
      if (newState.ui.targetStoreKeys.length && !newState.ui.isShownStoreCards) {
        newState.ui.isShownStoreCards = true;
        newState.ui.isShownCurrentPositionButton = false;
      } else if (newState.ui.targetStoreKeys.length && newState.ui.isShownStoreCards) {
        newState.ui.isShownStoreCards = false;
        newState.ui.isShownCurrentPositionButton = true;
        newState.ui.targetStoreKeys = [];
      }
      break;
    }
    case actionTypes.SELECT_TARGET_STORE: {
      newState.ui.targetStoreKey = payload.storeKey;
      break;
    }
    case actionTypes.UPDATE_CURRENT_POSITION: {
      newState.ui.currentPos = payload.currentPos;
      break;
    }
    case actionTypes.UPDATE_SHEET_MODE: {
      newState.ui.isShownSheet = payload.isShown;
      break;
    }
    case actionTypes.SEARCH_STORE: {
      newState.ui.isShownSheet = false;
      newState.ui.isShownStoreCards = true;
      newState.ui.isShownModal = false;
      newState.ui.isShownCurrentPositionButton = false;
      newState.ui.targetStoreKeys = payload.targetStoreKeys;
      newState.ui.pos = payload.pos;
      newState.ui.zoom = payload.zoom;
      break;
    }
    case actionTypes.FILTER_STORE: {
      newState.ui.isShownSheet = true;
      newState.ui.isShownStoreCards = false;
      newState.ui.isShownModal = false;
      newState.ui.isShownCurrentPositionButton = false;
      newState.ui.targetStoreKeys = payload.targetStoreKeys;
      break;
    }
    default:
  }

  return newState;
}
