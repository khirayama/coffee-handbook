// tslint:disable:no-http-string
import { IRawStore } from 'data/stores';

export const torse: IRawStore = {
  key: 'torse',
  lat: 35.63768,
  lng: 139.684159,
  name: {
    ja: 'トルス',
    en: 'torse',
  },
  address: {
    ja: '東京都世田谷区下馬5-35-5',
    en: '5-35-5 Shimouma, Setagaya-ku, Tokyo',
  },
  hours: [
    [['12:00', '21:00']],
    [['12:00', '22:00']],
    [['12:00', '22:00']],
    [['12:00', '22:00']],
    [['12:00', '15:30'], ['17:30', '22:00']],
    [['12:00', '22:00']],
    [['12:00', '22:00']],
  ],
  hoursNote: null,
  email: null,
  tel: '0364532418',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://torse.jp/',
    ec: 'https://torse.stores.jp/',
    facebook: 'https://www.facebook.com/torse-157791604319650/',
    twitter: 'https://twitter.com/torse_staff/',
    instagram: 'https://www.instagram.com/torse_cafe/',
    instagramTag: 'https://www.instagram.com/explore/tags/torse/',
    googleMaps: 'https://goo.gl/maps/zFt1q4boWbS2',
  },
  services: {
    roaster: 0,
    speciality: 1,
    beans: 0,
    credit: 1,
    power: 0,
    wifi: 0,
    barrierFree: 0,
    pet: 0,
    smoking: 1,
  },
};
