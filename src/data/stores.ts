import { monzCafe } from 'data/stores/monzCafe';
import { redHorn } from 'data/stores/redHorn';
import { saredoCoffee } from 'data/stores/saredoCoffee';
import { sarutahikoCoffee } from 'data/stores/sarutahikoCoffee';
import { theCoffeeBeanAndTeaLeaf } from 'data/stores/theCoffeeBeanAndTeaLeaf';
import { tokadoCoffee } from 'data/stores/tokadoCoffee';
import { tokadoCoffeeNakasukawabata } from 'data/stores/tokadoCoffeeNakasukawabata';

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

export const stores: IRawStore[] = [
  monzCafe,
  redHorn,
  saredoCoffee,
  sarutahikoCoffee,
  theCoffeeBeanAndTeaLeaf,
  tokadoCoffee,
  tokadoCoffeeNakasukawabata,
];
