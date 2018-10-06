// tslint:disable:no-http-string
import { IRawStore } from 'data/stores';

export const theCoffeeBeanAndTeaLeaf: IRawStore = {
  key: 'the-coffee-bean-&-tea-leaf',
  lat: 35.683004,
  lng: 139.773235,
  name: {
    ja: 'コーヒービーン＆ティーリーフ',
    en: 'The Coffee Bean \& Tea Leaf',
  },
  address: {
    ja: '東京都中央区日本橋1丁目3番13号　東京建物日本橋ビル1F',
    en: 'Tokyo Tatemono Nihombashi Building 1F, 1-3-13, Nihombashi, Chuo-ku, Tokyo',
  },
  hours: [
    [["8:00","21:00"]],
    [["7:00","22:00"]],
    [["7:00","22:00"]],
    [["7:00","22:00"]],
    [["7:00","22:00"]],
    [["7:00","22:00"]],
    [["7:00","22:00"]]
  ],
  hoursNote: {
    ja: "祝日 8:00 - 21:00",
    en: "Holiday 8:00 - 21:00",
  },
  email: null,
  tel: '0362621336',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://www.coffeebean.co.jp/index.html',
    ec: null,
    facebook: 'https://www.facebook.com/thecoffeebean.japan',
    twitter: null,
    instagram: 'https://www.instagram.com/coffeebean_japan/',
    instagramTag: 'https://www.instagram.com/explore/tags/coffeebean_japan/',
    googleMaps: 'https://goo.gl/maps/9wvJR7ohZmB2',
  },
  services: {
    roaster: 0,
    speciality: 2,
    beans: 1,
    credit: 1,
    power: 1,
    wifi: 1,
    barrierFree: 1,
    pet: 0,
    smoking: 0,
  },
};
