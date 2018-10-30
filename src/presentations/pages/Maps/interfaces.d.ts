// tslint:disable:no-any
import { IRawStore } from 'data/stores';

export type IDispatch = (action: IAction) => void;

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

export interface IPosition {
  lat: number;
  lng: number;
}
