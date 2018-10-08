// tslint:disable:no-http-string
import { IRawStore } from 'data/stores';

export const mightyStepsCoffeeStop: IRawStore = {
  key: 'mighty-steps-coffee-stop',
  lat: 35.689784,
  lng: 139.773466,
  name: {
    ja: 'マイティ ステップス コーヒー ストップ',
    en: 'Mighty steps coffee stop',
  },
  address: {
    ja: '東京都中央区日本橋本町4-3-14',
    en: '4-3-14 Nihombashihoncho, Chuo-ku, Tokyo',
  },
  hours: [
    [['11:00', '19:00']],
    [['11:00', '19:00']],
    [['11:00', '19:00']],
    [['11:00', '19:00']],
    [['11:00', '19:00']],
    [['11:00', '19:00']],
    [['11:00', '19:00']],
  ],
  hoursNote: null,
  email: null,
  tel: '0362621988',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: null,
    ec: null,
    facebook: 'https://www.facebook.com/mightysteps.coffee.stop/',
    twitter: null,
    instagram: null,
    instagramTag: null,
    googleMaps: 'https://goo.gl/maps/yJQvWKCfC2B2',
  },
  services: {
    roaster: 0,
    speciality: 1,
    beans: 0,
    credit: 0,
    power: 0,
    wifi: 1,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
