// tslint:disable:no-http-string
import { IRawStore } from 'presentations/pages/Maps/interfaces';

export const coffeeStandByMe: IRawStore = {
  key: 'coffee-stand-by-me',
  lat: 25.054776,
  lng: 121.52008,
  name: {
    ja: 'Coffee Stand by me',
    en: 'Coffee Stand by me',
  },
  address: {
    ja: '台北市大同區赤峰街41巷4號',
    en: 'No. 4, lane 41, chifeng street, datong district, Taipei city',
  },
  hours: [
    [['12:00', '22:00']],
    [['12:00', '22:00']],
    [['12:00', '22:00']],
    [['12:00', '22:00']],
    [['12:00', '24:00']],
    [['12:00', '24:00']],
    [['12:00', '24:00']],
  ],
  hoursNote: null,
  email: null,
  tel: '886225588381',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: null,
    ec: null,
    facebook: 'https://www.facebook.com/coffeestandbyme/',
    twitter: null,
    instagram: 'https://www.instagram.com/coffeestandbyme/',
    instagramTag: 'https://www.instagram.com/explore/tags/coffeestandbyme/',
    googleMaps: 'https://goo.gl/maps/LQLwrpAxhxA2',
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
