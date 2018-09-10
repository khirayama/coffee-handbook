// tslint:disable:no-http-string
import { IRawStore } from 'data/stores';

export const redHorn: IRawStore = {
  key: 'red-horn',
  lat: 30.5338194,
  lng: -97.7808235,
  name: {
    ja: 'RedHorn COFFEE HOUSE & BREWING CO.',
    en: 'RedHorn COFFEE HOUSE & BREWING CO.',
  },
  address: {
    ja: 'テキサス州シーダーパークG6M9+GM',
    en: '13010 W Parmer Lane, Ste 800 Cedar Park, Texas 78613',
  },
  hours: [
    [['7:00', '22:00']],
    [['7:00', '22:00']],
    [['7:00', '22:00']],
    [['7:00', '22:00']],
    [['7:00', '23:00']],
    [['7:00', '23:00']],
    [['8:00', '22:00']],
  ],
  hoursNote: null,
  email: 'info@redhornbrew.com',
  tel: '5129867038',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'http://redhornbrew.com/',
    ec: null,
    facebook: 'https://www.facebook.com/redhornbrew',
    twitter: 'https://twitter.com/redhornbrew',
    instagram: 'https://www.instagram.com/redhornbrew/',
    instagramTag:
      'https://www.instagram.com/explore/tags/redhorn/',
    googleMaps: 'https://goo.gl/maps/FmyzHdexZru',
  },
  services: {
    roaster: 1,
    speciality: 1,
    beans: 1,
    credit: null,
    power: null,
    wifi: null,
    barrierFree: null,
    pet: null,
    smoking: null,
  },
};
