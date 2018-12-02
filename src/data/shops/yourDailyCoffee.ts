// tslint:disable:no-http-string
import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const yourDailyCoffee: IRawShop = {
  key: 'your-daily-coffee',
  lat: 35.641856,
  lng: 139.644362,
  name: {
    ja: 'YOUR DAILY/COFFEE',
    en: 'YOUR DAILY/COFFEE',
  },
  address: {
    ja: '東京都世田谷区世田谷2-14-3 TKビル1階',
    en: 'TK Building 1F, 2-14-3 Setagaya, Setagaya-ku, Tokyo',
  },
  hours: [
    [['9:00', '19:00']],
    [],
    [['9:00', '18:00']],
    [['9:00', '18:00']],
    [['9:00', '18:00']],
    [['9:00', '18:00']],
    [['9:00', '19:00']],
  ],
  hoursNote: {
    ja: '祝日 9:00 - 19:00',
    en: 'Holiday 9:00 - 19:00',
  },
  email: 'info@yourdaily.coffee',
  tel: '0364135297',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://yourdaily.coffee/',
    ec: null,
    facebook: 'https://www.facebook.com/Your-Daily-Coffee-1158126794263810',
    twitter: null,
    instagram: 'https://www.instagram.com/yourdaily_coffee/',
    instagramTag: 'https://www.instagram.com/explore/tags/yourdailycoffee/',
    googleMaps: 'https://goo.gl/maps/YZwLJs3Ub4u',
  },
  services: {
    roaster: 0,
    speciality: 1,
    beans: 1,
    credit: 0,
    power: 0,
    wifi: 0,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
