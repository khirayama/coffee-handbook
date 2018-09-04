import { IRawStore, stores } from 'data/stores';
import { Resource, TResource } from 'utils/Resource';

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
  payments: {
    cash: boolean | null;
    credit: {
      visa: boolean | null;
      masterCard: boolean | null;
      unionPay: boolean | null;
      amex: boolean | null;
      jcb: boolean | null;
      diners: boolean | null;
      discover: boolean | null;
    };
  };
  services: {
    // 0: なし、1: あり、2: 部分的にあり
    roaster: number | null;
    speciality: number | null;
    beans: number | null;
    power: number | null;
    wifi: number | null;
    barrierFree: number | null;
    pet: number | null;
    smoking: number | null;
  };
}

// tslint:disable-next-line:variable-name
export const Store: TResource<IRawStore, IStore> = (lang: string): Resource<IRawStore, IStore> => {
  return new Resource(stores, lang);
};
