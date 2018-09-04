import { IRawStore } from 'data/stores';

export const saredoCoffee: IRawStore = {
  key: 'saredo-coffee',
  lat: 33.5794,
  lng: 130.381028,
  name: {
    ja: 'Saredo Coffee',
    en: 'Saredo Coffee',
  },
  address: {
    ja: '福岡県福岡市中央区六本松3-11-33エステートビル101',
    en: 'Estate Building 101, 3-11-33, Ropponmatsu, Chuo-ku, Fukuoka-shi, Fukuoka-ken',
  },
  hours: [
    [['11:00', '20:00']],
    [['11:00', '20:00']],
    [['11:00', '20:00']],
    [],
    [['11:00', '20:00']],
    [['11:00', '20:00']],
    [['11:00', '20:00']],
  ],
  hoursNote: null,
  email: null,
  tel: '0927911313',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'https://www.saredocoffee.com/',
    ec: 'https://www.saredocoffee.com/shop',
    facebook: 'https://www.facebook.com/SaredoCoffee/',
    twitter: null,
    instagram: 'https://www.instagram.com/saredocoffee/',
    instagramTag: 'https://www.instagram.com/explore/tags/saredocoffee/',
    googleMaps: 'https://goo.gl/maps/jfZhdSXprhn',
  },
  payments: {
    cash: true,
    credit: {
      visa: false,
      masterCard: false,
      unionPay: false,
      amex: false,
      jcb: false,
      diners: false,
      discover: false,
    },
  },
  services: {
    roaster: true,
    speciality: true,
    beans: true,
    power: false,
    wifi: true,
    pet: 0, // 0: なし、1: あり、2: 部分的にあり
    smoking: 0, // 0: 禁煙、1: 喫煙、2: 喫煙スペースあり
  },
};
