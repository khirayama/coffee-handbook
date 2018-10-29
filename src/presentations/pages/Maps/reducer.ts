// tslint:disable:no-any
import { IRawStore } from 'data/stores';
import { IPosition } from 'presentations/components/StoreMapView';

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

export interface IState {
  lang: string;
  stores: IRawStore[];
  ui: {
    selectedStoreKey: string;
    currentPos: IPosition | null;
    pos: IPosition;
    zoom: number;
  };
}

export interface IAction {
  actionType: string;
  payload?: any;
  meta?: any;
  error?: any;
}

export type IDispatch = (action: IAction) => void;

export function reducer(state: IState, action: IAction): IState {
  const newState: IState = JSON.parse(JSON.stringify(state));
  const payload: any = action.payload;

  switch (action.actionType) {
    case '__UPDATE_VIEW': {
      saveView(payload.pos, payload.zoom);
      newState.ui.pos = payload.pos;
      newState.ui.zoom = payload.zoom;
      break;
    }
    case '__SELECT_STORE': {
      newState.ui.selectedStoreKey = payload.storeKey;
      break;
    }
    case '__UPDATE_CURRENT_POSITION': {
      newState.ui.currentPos = payload.currentPos;
      break;
    }
    default:
  }

  return newState;
}
