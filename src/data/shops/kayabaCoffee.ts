// tslint:disable:no-http-string
import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const kayabaCoffee: IRawShop = {
  key: 'kayaba-coffee',
  lat: 35.721148,
  lng: 139.770704,
  name: {
    ja: 'カヤバ珈琲',
    en: 'Kayaba Coffee',
  },
  address: {
    ja: '東京都台東区谷中6-1-29',
    en: '6-1-29 Yanaka, Taito-ku, Tokyo',
  },
  hours: [
    [['8:00', '18:00']],
    [['8:00', '21:00']],
    [['8:00', '21:00']],
    [['8:00', '21:00']],
    [['8:00', '21:00']],
    [['8:00', '21:00']],
    [['8:00', '21:00']],
  ],
  hoursNote: null,
  email: 'mail@kayaba-coffee.com',
  tel: '0338233545',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://kayaba-coffee.com/',
    ec: null,
    facebook: null,
    twitter: 'https://twitter.com/kayaba_coffee',
    instagram: null,
    instagramTag: 'https://www.instagram.com/explore/tags/kayabacoffee/',
    googleMaps: 'https://goo.gl/maps/RnMkGnsvDNN2',
  },
  services: {
    roaster: 0,
    speciality: 0,
    beans: 0,
    credit: 0,
    power: 0,
    wifi: 0,
    barrierFree: 0,
    pet: 0,
    smoking: 2,
  },
};
