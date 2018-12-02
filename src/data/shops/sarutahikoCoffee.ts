// tslint:disable:no-http-string
import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const sarutahikoCoffee: IRawShop = {
  key: 'sarutahiko-coffee',
  lat: 35.647707,
  lng: 139.710948,
  name: {
    ja: '猿田彦珈琲 恵比寿本店',
    en: 'SARUTAHIKO COFFEE Ebisu',
  },
  address: {
    ja: '東京都渋谷区恵比寿1-6-6',
    en: '1-6-6 Ebisu, Shibuya-ku, Tokyo',
  },
  hours: [
    [['8:00', '24:30']],
    [['8:00', '24:30']],
    [['8:00', '24:30']],
    [['8:00', '24:30']],
    [['8:00', '24:30']],
    [['10:00', '24:30']],
    [['10:00', '24:30']],
  ],
  hoursNote: null,
  email: null,
  tel: '0354226970',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://sarutahiko.co/',
    ec: 'http://shop.sarutahiko.co/',
    facebook: 'https://www.facebook.com/sarutahiko/',
    twitter: 'https://twitter.com/sarutahikoffee',
    instagram: 'https://www.instagram.com/sarutahikocoffee/',
    instagramTag: 'https://www.instagram.com/explore/tags/%E7%8C%BF%E7%94%B0%E5%BD%A6%E7%8F%88%E7%90%B2/',
    googleMaps: 'https://goo.gl/maps/9tNGeu6uGuu',
  },
  services: {
    roaster: 0,
    speciality: 1,
    beans: 1,
    credit: 0,
    power: 0,
    wifi: 1,
    barrierFree: 0,
    pet: 1,
    smoking: 0,
  },
};
