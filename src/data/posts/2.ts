import * as path from 'path';

import * as pug from 'pug';

export const post2 = {
  id: 2,
  createdAt: '2018-05-26 12:00',
  publishedAt: '2018-05-27 15:00',
  thumbnailUrl: {
    default: {
      ja: '/images/image_2.jpg',
      en: '/images/image_2.jpg',
    },
    square: {
      ja: '/images/image_2@square.jpg',
      en: '/images/image_2@square.jpg',
    },
    rectangle: {
      ja: '/images/image_2@rectangle.jpg',
      en: '/images/image_2@rectangle.jpg',
    },
  },
  title: {
    ja: '【特集】なぜ僕らがこの活動をはじめたのか。- 2',
    en: '[Feature] Why we start this activities. - 2',
  },
  content: {
    ja: pug.compileFile(path.join(__dirname, '2-content.ja.pug'))(),
    en: pug.compileFile(path.join(__dirname, '2-content.en.pug'))(),
  },
  categories: [
    {
      id: 1,
    },
  ],
  tags: [
    {
      id: 1,
    },
  ],
};
