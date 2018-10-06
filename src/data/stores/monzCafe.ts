// tslint:disable:no-http-string
import { IRawStore } from 'data/stores';

export const monzCafe: IRawStore = {
  key: 'monz-cafe',
  lat: 35.67229,
  lng: 139.797826,
  name: {
    ja: 'MONZ CAFE 門前仲町店',
    en: 'MONZ CAFE',
  },
  address: {
    ja: '東京都江東区富岡1-14-5',
    en: '1-14-5 Tomioka, Koto-ku, Tokyo',
  },
  hours: [
    [["9:00","18:00"]],
    [["8:00","19:00"]],
    [["8:00","19:00"]],
    [["8:00","19:00"]],
    [["8:00","19:00"]],
    [["8:00","19:00"]],
    [["9:00","18:00"]]
  ],
  hoursNote: {
    ja: "祝日 9:00 - 18:00",
    en: "Holiday 9:00 - 18:00",
  },
  email: "coffee@monzcafe.com",
  tel: '0368730835',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://www.monzcafe.com',
    ec: null,
    facebook: 'https://www.facebook.com/MONZCAFE',
    twitter: null,
    instagram: 'https://www.instagram.com/monzcafe/',
    instagramTag: 'https://www.instagram.com/explore/tags/monzcafe/',
    googleMaps: 'https://goo.gl/maps/PLwSU9zdFaM2',
  },
  services: {
    roaster: 0,
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
