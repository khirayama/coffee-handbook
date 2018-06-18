import * as path from 'path';

import * as pug from 'pug';

export const post1: any = {
  id: 1,
  createdAt: '2018-05-26 12:00',
  publishedAt: '2018-05-26 15:00',
  thumbnailUrl: {
    default: {
      ja: '/images/image_1.jpg',
      en: '/images/image_1.jpg',
    },
    square: {
      ja: '/images/image_1@square.jpg',
      en: '/images/image_1@square.jpg',
    },
    rectangle: {
      ja: '/images/image_1@rectangle.jpg',
      en: '/images/image_1@rectangle.jpg',
    },
  },
  title: {
    ja: '【特集】なぜ僕らがこの活動をはじめたのか。',
    en: '[Feature] Why we start this activities.',
  },
  content: {
    ja: pug.compileFile(path.join(__dirname, 'post1-content.ja.pug'))(),
    en: pug.compileFile(path.join(__dirname, 'post1-content.en.pug'))(),
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
