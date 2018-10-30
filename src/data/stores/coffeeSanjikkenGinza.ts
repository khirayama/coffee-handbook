// tslint:disable:no-http-string
import { IRawStore } from 'presentations/pages/Maps/interfaces';

export const coffeeSanjikkenGinza: IRawStore = {
  key: 'coffee-sanjikken-ginza',
  lat: 35.671413,
  lng: 139.767185,
  name: {
    ja: '珈琲専門店 三十間 銀座本店',
    en: 'COFFEE SANJIKKEN GINZA',
  },
  address: {
    ja: '東京都中央区銀座3-8-12 大広朝日ビルB1',
    en: 'Daiko Asahi Building B1, 3-8-12 Ginza, Chuo-ku, Tokyo',
  },
  hours: [
    [['11:00', '22:00']],
    [['11:00', '22:00']],
    [['11:00', '22:00']],
    [['11:00', '22:00']],
    [['11:00', '22:00']],
    [['11:00', '22:00']],
    [['11:00', '22:00']],
  ],
  hoursNote: null,
  email: null,
  tel: '0335648096',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://sanjikken.net/',
    ec: null,
    facebook: null,
    twitter: null,
    instagram: null,
    instagramTag: null,
    googleMaps: 'https://goo.gl/maps/LdHKJbz7QUt',
  },
  services: {
    roaster: 0,
    speciality: 1,
    beans: 0,
    credit: 1,
    power: 0,
    wifi: 0,
    barrierFree: 0,
    pet: 0,
    smoking: 2,
  },
};
