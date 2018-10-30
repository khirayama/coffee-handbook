// tslint:disable:no-http-string
import { IRawStore } from 'presentations/pages/Maps/interfaces';

export const allSeasonsCoffee: IRawStore = {
  key: 'all-seasons-coffee',
  lat: 35.689796,
  lng: 139.70793,
  name: {
    ja: 'オールシーズンズコーヒー',
    en: '4/4 SEASONS COFFEE',
  },
  address: {
    ja: '東京都新宿区新宿2-７−７',
    en: '2-7-7 Shinjuku, Shinjuku-ku, Tokyo',
  },
  hours: [
    [['10:00', '19:00']],
    [['8:30', '19:00']],
    [],
    [['8:30', '19:00']],
    [['8:30', '19:00']],
    [['8:30', '19:00']],
    [['10:00', '19:00']],
  ],
  hoursNote: {
    ja: '祝日 10:00 - 19:00',
    en: 'Holiday 10:00 - 19:00',
  },
  email: 'info@allseasonscoffee.jp',
  tel: '0353414273',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://allseasonscoffee.jp/',
    ec: null,
    facebook: 'https://www.facebook.com/44-SEASONS-COFFEE-881066701961401/',
    twitter: null,
    instagram: 'https://www.instagram.com/allseasonscoffee/',
    instagramTag: 'https://www.instagram.com/explore/tags/allseasonscoffee/',
    googleMaps: 'https://goo.gl/maps/JrGcYPCtgKq',
  },
  services: {
    roaster: 0,
    speciality: 1,
    beans: 0,
    credit: 0,
    power: 0,
    wifi: 0,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
