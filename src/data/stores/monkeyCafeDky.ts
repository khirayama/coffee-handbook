// tslint:disable:no-http-string
import { IRawStore } from 'data/stores';

export const monkeyCafeDky: IRawStore = {
  key: 'monkey-cafe-dky',
  lat: 35.651615,
  lng: 139.701984,
  name: {
    ja: 'MONKEY CAFE D.K.Y.',
    en: 'MONKEY CAFE D.K.Y.',
  },
  address: {
    ja: '東京都渋谷区猿楽町12-8',
    en: '12-8 Sarugakucho, Shibuya-ku, Tokyo',
  },
  hours: [
    [['10:00', '19:00']],
    [['10:00', '19:00']],
    [['10:00', '19:00']],
    [['10:00', '19:00']],
    [['10:00', '19:00']],
    [['10:00', '19:00']],
    [['10:00', '19:00']],
  ],
  hoursNote: null,
  email: null,
  tel: '0357286260',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://monkeycafe.jp/',
    ec: null,
    facebook: null,
    twitter: 'https://twitter.com/MONKEYCafeDKY',
    instagram: 'https://www.instagram.com/monkey_cafe_d.k.y/',
    instagramTag: 'https://www.instagram.com/explore/tags/monkeycafedky/',
    googleMaps: 'https://goo.gl/maps/jChSbzLYXX52',
  },
  services: {
    roaster: 0,
    speciality: 0,
    beans: 0,
    credit: 1,
    power: 0,
    wifi: 0,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
