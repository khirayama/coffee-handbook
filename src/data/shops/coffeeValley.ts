// tslint:disable:no-http-string
import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const coffeeValley: IRawShop = {
  key: 'coffee-valley',
  lat: 35.727809,
  lng: 139.713377,
  name: {
    ja: 'コーヒーバレー',
    en: 'COFFEE VALLEY',
  },
  address: {
    ja: '東京都豊島区南池袋2-26-3',
    en: '2-26-3 Minamiikebukuro, Toshima-ku, Tokyo',
  },
  hours: [
    [['9:00', '22:00']],
    [['8:00', '22:00']],
    [['8:00', '22:00']],
    [['8:00', '22:00']],
    [['8:00', '22:00']],
    [['8:00', '22:00']],
    [['9:00', '22:00']],
  ],
  hoursNote: {
    ja: '祝日 9:00 - 22:00',
    en: 'Holiday 9:00 - 22:00',
  },
  email: 'info@coffeevalley.jp',
  tel: '0369071173',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'https://coffeevalley.jp/',
    ec: null,
    facebook: 'https://www.facebook.com/www.coffeevalley.jp/',
    twitter: null,
    instagram: 'https://www.instagram.com/coffeevalley.jp/',
    instagramTag: 'https://www.instagram.com/explore/tags/coffeevalley/',
    googleMaps: 'https://goo.gl/maps/Y3WNmBhdxi32',
  },
  services: {
    roaster: 1,
    speciality: 1,
    beans: 1,
    credit: 1,
    power: 0,
    wifi: 1,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
