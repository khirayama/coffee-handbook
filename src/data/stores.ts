import { saredoCoffee } from 'data/stores/saredoCoffee';

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
    roaster: boolean | null;
    speciality: boolean | null;
    beans: boolean | null;
    power: boolean | null;
    wifi: boolean | null;
    // 0: なし、1: あり、2: 部分的にあり
    pet: number | null;
    // 0: 禁煙、1: 喫煙、2: 喫煙スペースあり
    smoking: number | null;
  };
}

export const stores: IRawStore[] = [saredoCoffee];
