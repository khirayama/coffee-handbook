// tslint:disable:no-http-string
import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const solsCoffeeRoastery: IRawShop = {
  key: 'sols-coffee-roastery',
  lat: 35.701428,
  lng: 139.788348,
  name: {
    ja: 'ソルズコーヒー ロースタリー',
    en: "SOL'S COFFEE ROASTERY",
  },
  address: {
    ja: '東京都台東区浅草橋3-25-7',
    en: '3-25-7 Asakusabashi, Taito-ku, Tokyo',
  },
  hours: [
    [['9:00', '19:00']],
    [['8:00', '18:00']],
    [['8:00', '18:00']],
    [],
    [['8:00', '18:00']],
    [['8:00', '18:00']],
    [['9:00', '19:00']],
  ],
  hoursNote: null,
  email: null,
  tel: '0358298824',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://www.sols-coffee.com/',
    ec: 'https://solscoffee.shop-pro.jp/',
    facebook: 'https://www.facebook.com/solscoffee/',
    twitter: 'https://twitter.com/solscoffee',
    instagram: 'https://www.instagram.com/solscoffee/',
    instagramTag: 'https://www.instagram.com/explore/tags/solscoffeeroastery/',
    googleMaps: 'https://goo.gl/maps/Y4NeNNBqYD32',
  },
  services: {
    roaster: 1,
    speciality: 1,
    beans: 0,
    credit: 0,
    power: 0,
    wifi: 0,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
