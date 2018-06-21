import * as path from 'path';

import * as pug from 'pug';

import { IRawPost } from 'data/posts';

export const post5: IRawPost = {
  key: 'post5',
  createdAt: '2018-05-26 12:00',
  publishedAt: '2018-05-27 16:00',
  thumbnailUrl: {
    square: {
      ja: '/images/image_5@square.jpg',
      en: '/images/image_5@square.jpg',
    },
    rectangle: {
      ja: '/images/image_5@rectangle.jpg',
      en: '/images/image_5@rectangle.jpg',
    },
  },
  title: {
    ja: '通常記事',
    en: 'Regular',
  },
  description: {
    ja: '通常記事',
    en: 'Regular',
  },
  content: {
    ja: pug.compileFile(path.join(__dirname, 'post5-content.ja.pug'))(),
    en: pug.compileFile(path.join(__dirname, 'post5-content.en.pug'))(),
  },
  categories: [
    {
      id: 1,
    },
  ],
  tags: [],
};
