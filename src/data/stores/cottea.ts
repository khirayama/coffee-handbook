// tslint:disable:no-http-string
import { IRawStore } from 'data/stores';

export const cottea: IRawStore = {
  key: 'cottea',
  lat: 35.65964,
  lng: 139.708759,
  name: {
    ja: 'Cottea',
    en: 'Cottea',
  },
  address: {
    ja: '東京都渋谷区渋谷2-3-3 仙海ビル1階',
    en: 'Senkai Building 1F, 2-3-3 Shibuya, Shibuya-ku, Tokyo',
  },
  hours: [
    [],
    [['10:00', '18:00']],
    [['10:00', '18:00']],
    [['10:00', '18:00']],
    [['10:00', '18:00']],
    [['10:00', '18:00']],
    [['10:00', '18:00']],
  ],
  hoursNote: null,
  email: 'info@cottea.jp',
  tel: '0364506674',
  permanentClosed: false,
  transforTo: null,
  media: {
    web: 'https://cottea.jp/',
    ec: 'https://cottea.jp/customize/',
    facebook: 'https://www.facebook.com/cottea.jp/',
    twitter: 'https://twitter.com/Cotteajp',
    instagram: 'https://www.instagram.com/cottea.jp/',
    instagramTag: 'https://www.instagram.com/explore/tags/cottea/',
    googleMaps: 'https://goo.gl/maps/FApX58mdaw32',
  },
  services: {
    roaster: 1,
    speciality: 1,
    beans: 1,
    credit: 0,
    power: null,
    wifi: 0,
    barrierFree: 0,
    pet: 0,
    smoking: 0,
  },
};
