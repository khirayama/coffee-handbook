// tslint:disable:no-http-string
import { IRawStore } from 'presentations/pages/Maps/interfaces';

export const verveCoffeeRoastersShinjuku: IRawStore = {
  key: 'verve-coffee-roasters-shinjuku',
  lat: 35.688763,
  lng: 139.701294,
  name: {
    ja: 'VERVE COFFEE ROASTERS 新宿',
    en: 'VERVE COFFEE ROASTERS SHINJUKU',
  },
  address: {
    ja: '東京都渋谷区千駄ヶ谷5-24-55 NEWoMan SHINJUKU 2F',
    en: 'NEWoMan SHINJUKU 2F, 5-24-55 Sendagaya, Shibuya-ku, Tokyo',
  },
  hours: [
    [['7:00', '21:30']],
    [['7:00', '22:00']],
    [['7:00', '22:00']],
    [['7:00', '22:00']],
    [['7:00', '22:00']],
    [['7:00', '22:00']],
    [['7:00', '21:30']],
  ],
  hoursNote: null,
  email: 'shinjuku@vervecoffeeroasters.com',
  tel: '0362731325',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'https://vervecoffee.jp/',
    ec: 'https://vervecoffee.jp/',
    facebook: 'https://www.facebook.com/VerveCoffeeNEWoManShinjuku2FTokyo/',
    twitter: null,
    instagram: 'https://www.instagram.com/vervecoffeejapan/',
    instagramTag: 'https://www.instagram.com/explore/tags/vervecoffee/',
    googleMaps: 'https://goo.gl/maps/dsGwBfgBwgq',
  },
  services: {
    roaster: 0,
    speciality: 1,
    beans: 1,
    credit: 1,
    power: 0,
    wifi: 0,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
