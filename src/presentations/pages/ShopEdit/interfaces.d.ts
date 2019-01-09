export type IDispatch = (action: IAction) => void;

interface IShopAttribute {
  name: string;
  address: string;
  hoursNote: string;
}

export interface IState {
  shopkey: string;
  email: string;
  tel: string;
  permanentClosed: boolean;
  transferTo: string;
  // media
  web: string;
  ec: string;
  facebook: string;
  twitter: string;
  instagram: string;
  instagramTag: string;
  googleMaps: string;
  // services
  hasRoaster: 0 | 2;
  hasSpeciality: 0 | 2;
  hasBeans: 0 | 2;
  hasCredit: 0 | 1 | 2;
  hasPower: 0 | 1 | 2;
  hasWifi: 0 | 2;
  hasBarrierFree: 0 | 1 | 2;
  hasPet: 0 | 1 | 2;
  hasSmoking: 0 | 1 | 2;
  // attributes
  en: IShopAttribute;
  ja: IShopAttribute;
  // openHours
  openHours: string[][][];
}

export interface IAction {
  actionType: Symbol;
  payload?: any; // tslint:disable-line:no-any
  meta?: any; // tslint:disable-line:no-any
  error?: any; // tslint:disable-line:no-any
}
