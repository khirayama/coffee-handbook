// tslint:disable:no-http-string
import { IRawStore } from 'data/stores';

export const tokadoCoffeeNakasukawabata: IRawStore = {
  key: 'tokado-coffee-nakasukawabata',
  lat: 33.5950094,
  lng: 130.4059613,
  name: {
    ja: '豆香洞コーヒー',
    en: 'Tokado Coffee',
  },
  address: {
    ja: '福岡県福岡市博多区下川端町3-1 博多リバレインモールB2F',
    en: 'Hakata Riverain B2F, 3-1, Shimokawabatamachi, Hakata-ku, Fukuoka-shi, Fukuoka',
  },
  hours: [
    [['10:30', '19:30']],
    [['10:30', '19:30']],
    [['10:30', '19:30']],
    [['10:30', '19:30']],
    [['10:30', '19:30']],
    [['10:30', '19:30']],
    [['10:30', '19:30']],
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
    googleMaps: 'https://goo.gl/maps/QuSdTYx9Eap',
  },
  services: {
    roaster: 0,
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
