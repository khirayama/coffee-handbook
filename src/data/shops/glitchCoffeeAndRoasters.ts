// tslint:disable:no-http-string
import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const glitchCoffeeAndRoasters: IRawShop = {
  key: 'glitch-coffee-and-roasters',
  lat: 35.693743,
  lng: 139.761305,
  name: {
    ja: 'GLITCH COFFEE & ROASTERS',
    en: 'GLITCH COFFEE & ROASTERS',
  },
  address: {
    ja: '東京都千代田区神田錦町3-16 香村ビル1F',
    en: '3-16 1F Kandanishikicho, Chiyoda-ku, Tokyo',
  },
  hours: [
    [['9:00', '19:00']],
    [['7:30', '20:00']],
    [['7:30', '20:00']],
    [['7:30', '20:00']],
    [['7:30', '20:00']],
    [['7:30', '20:00']],
    [['9:00', '19:00']],
  ],
  hoursNote: null,
  email: 'press@glitchcoffee.com',
  tel: '0352445458',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://glitchcoffee.com/',
    ec: null,
    facebook: 'https://www.facebook.com/glitchcoffee/',
    twitter: 'https://twitter.com/glitch_coffee/',
    instagram: 'https://www.instagram.com/glitch_coffee/',
    instagramTag: 'https://www.instagram.com/explore/tags/glitchcoffee/',
    googleMaps: 'https://goo.gl/maps/GoebNwTigkL2',
  },
  services: {
    roaster: 1,
    speciality: 1,
    beans: 1,
    credit: 0,
    power: 1,
    wifi: 1,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
