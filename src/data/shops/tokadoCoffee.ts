// tslint:disable:no-http-string
import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const tokadoCoffee: IRawShop = {
  key: 'tokado-coffee',
  lat: 33.5299656,
  lng: 130.4815722,
  name: {
    ja: '豆香洞コーヒー',
    en: 'Tokado Coffee',
  },
  address: {
    ja: '福岡県大野城市白木原3-3-1',
    en: '3-3-1, Shirakibaru, Onojo-shi, Fukuoka',
  },
  hours: [
    [['11:00', '18:00']],
    [['11:00', '18:00']],
    [['11:00', '18:00']],
    [['11:00', '18:00']],
    [['11:00', '18:00']],
    [['11:00', '18:00']],
    [['11:00', '18:00']],
  ],
  hoursNote: null,
  email: null,
  tel: '0922609432',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://www.tokado-coffee.com/',
    ec: 'http://tokado-coffee.shop-pro.jp/',
    facebook: 'https://www.facebook.com/tokadocoffee',
    twitter: 'https://twitter.com/tokadocoffee',
    instagram: 'https://www.instagram.com/tokado_coffee/',
    instagramTag:
      'https://www.instagram.com/explore/tags/%E8%B1%86%E9%A6%99%E6%B4%9E%E3%82%B3%E3%83%BC%E3%83%92%E3%83%BC/',
    googleMaps: 'https://goo.gl/maps/adbS7eUitrt',
  },
  services: {
    roaster: 1,
    speciality: 1,
    beans: 1,
    credit: 2,
    power: 0,
    wifi: 2,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
