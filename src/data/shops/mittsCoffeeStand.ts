// tslint:disable:no-http-string
import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const mittsCoffeeStand: IRawShop = {
  key: 'mitts-coffee-stand',
  lat: 35.17133,
  lng: 136.898236,
  name: {
    ja: 'MITTS COFFEE STAND',
    en: 'MITTS COFFEE STAND',
  },
  address: {
    ja: '愛知県名古屋市中区錦2丁目8-15 錦三輪ビル1階',
    en: 'Nishikiminowa building 1F, 2 Chome-8-15 Nishiki, Naka-ku, Nagoya, Aichi',
  },
  hours: [
    [['8:00', '18:00']],
    [['7:00', '19:00']],
    [['7:00', '19:00']],
    [['7:00', '19:00']],
    [['7:00', '19:00']],
    [['7:00', '19:00']],
    [['8:00', '18:00']],
  ],
  hoursNote: null,
  email: null,
  tel: '0522220207',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://www.mitts-coffee.com/',
    ec: null,
    facebook: 'https://www.facebook.com/MittsCoffeeStand',
    twitter: 'https://twitter.com/MITTScoffee',
    instagram: 'https://www.instagram.com/mittscoffeestand/',
    instagramTag: 'https://www.instagram.com/explore/tags/mittscoffeestand/',
    googleMaps: 'https://goo.gl/maps/TmVc69m41qD2',
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
