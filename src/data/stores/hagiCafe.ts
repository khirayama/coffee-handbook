// tslint:disable:no-http-string
import { IRawStore } from 'presentations/pages/Maps/interfaces';

export const hagiCafe: IRawStore = {
  key: 'hagi-cafe',
  lat: 35.726399,
  lng: 139.766049,
  name: {
    ja: 'ハギ カフェ',
    en: 'HAGI CAFE',
  },
  address: {
    ja: '東京都台東区谷中3-10-25',
    en: '3-10-25 Yanaka, Taito-ku, Tokyo',
  },
  hours: [
    [['8:00', '10:30'], ['12:00', '21:00']],
    [['8:00', '10:30'], ['12:00', '21:00']],
    [['8:00', '10:30'], ['12:00', '21:00']],
    [['8:00', '10:30'], ['12:00', '21:00']],
    [['8:00', '10:30'], ['12:00', '21:00']],
    [['8:00', '10:30'], ['12:00', '21:00']],
    [['8:00', '10:30'], ['12:00', '21:00']],
  ],
  hoursNote: {
    ja: 'ラストオーダー 10:00, 20:30',
    en: 'Last Order 10:00, 20:30',
  },
  email: 'info@hagiso.jp',
  tel: '0358329808',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://hagiso.jp/cafe/',
    ec: null,
    facebook: 'https://www.facebook.com/hagiso/',
    twitter: 'https://twitter.com/hagiso1955',
    instagram: 'https://www.instagram.com/hagiso_yanaka/',
    instagramTag: 'https://www.instagram.com/explore/tags/hagicafe/',
    googleMaps: 'https://goo.gl/maps/hQF5ucj3E8z',
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
    smoking: 2,
  },
};
