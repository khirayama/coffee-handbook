// tslint:disable:no-http-string
import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const paddlersCoffee: IRawShop = {
  key: 'paddlers-coffee',
  lat: 35.674583,
  lng: 139.678572,
  name: {
    ja: 'パドラーズコーヒー',
    en: 'PADDLERS COFFEE',
  },
  address: {
    ja: '東京都渋谷区西原2丁目26-5',
    en: '2-26-5 Nishihara, Shibuya-ku, Tokyo',
  },
  hours: [
    [['7:30', '18:00']],
    [],
    [['7:30', '18:00']],
    [['7:30', '18:00']],
    [['7:30', '18:00']],
    [['7:30', '18:00']],
    [['7:30', '18:00']],
  ],
  hoursNote: null,
  email: 'contact@paddlerscoffee.com',
  tel: '0357387281',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'https://paddlerscoffee.com/',
    ec: 'https://paddlerscoffee.shop/',
    facebook: 'https://www.facebook.com/Paddlers-Coffee-132849676886888/',
    twitter: 'https://twitter.com/paddlers_coffee',
    instagram: 'https://www.instagram.com/paddlers_coffee/',
    instagramTag: 'https://www.instagram.com/explore/tags/paddlerscoffee/',
    googleMaps: 'https://goo.gl/maps/iUzQLgJE5dm',
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
