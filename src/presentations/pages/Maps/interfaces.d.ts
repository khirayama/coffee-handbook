// tslint:disable:no-any
export type IDispatch = (action: IAction) => void;

export type ISheetModes = 'opened' | 'closed' | 'default' | 'none';

export interface IState {
  lang: string;
  stores: IRawStore[];
  ui: {
    sheetMode: ISheetModes;
    selectedStoreKey: string;
    targetStoreKeys: string[];
    searchQuery: string;
    currentPos: IPosition | null;
    pos: IPosition;
    zoom: number;
    offset: [number, number];
  };
}

export interface IAction {
  actionType: Symbol;
  payload?: any;
  meta?: any;
  error?: any;
}

export interface IPosition {
  lat: number;
  lng: number;
}

export interface IStore {
  key: string;
  lat: number;
  lng: number;
  name: string;
  address: string;
  hours: string[][][];
  hoursNote: string | null;
  email: string | null;
  tel: string | null;
  permanentClosed: boolean;
  // 移転した場合のkey
  transforTo: string;
  media: {
    web: string | null;
    ec: string | null;
    facebook: string | null;
    twitter: string | null;
    instagram: string | null;
    instagramTag: string | null;
    googleMaps: string | null;
  };
  services: {
    // 0: なし、1: あり、2: 部分的にあり
    roaster: number | null;
    speciality: number | null;
    beans: number | null;
    credit: number | null;
    power: number | null;
    wifi: number | null;
    barrierFree: number | null;
    pet: number | null;
    smoking: number | null;
  };
}

export interface IRawStore {
  key: string;
  lat: number;
  lng: number;
  name: {
    ja: string;
    en: string;
  };
  address: {
    ja: string;
    en: string;
  };
  hours: string[][][];
  hoursNote: {
    ja: string;
    en: string;
  } | null;
  email: string | null;
  tel: string | null;
  permanentClosed: boolean;
  // 移転した場合のkey
  transforTo: string;
  media: {
    web: string | null;
    ec: string | null;
    facebook: string | null;
    twitter: string | null;
    instagram: string | null;
    instagramTag: string | null;
    googleMaps: string | null;
  };
  services: {
    // 0: なし、1: あり、2: 部分的にあり
    roaster: number | null;
    speciality: number | null;
    beans: number | null;
    credit: number | null;
    power: number | null;
    wifi: number | null;
    barrierFree: number | null;
    pet: number | null;
    smoking: number | null;
  };
}
