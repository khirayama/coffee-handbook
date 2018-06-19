import * as path from 'path';

import * as pug from 'pug';

import { IRawPost } from 'data/posts';

export const post4: IRawPost = {
  key: 'post4',
  createdAt: '2018-05-26 12:00',
  publishedAt: '2018-05-27 16:00',
  thumbnailUrl: {
    square: {
      ja: '/images/image_4@square.jpg',
      en: '/images/image_4@square.jpg',
    },
    rectangle: {
      ja: '/images/image_4@rectangle.jpg',
      en: '/images/image_4@rectangle.jpg',
    },
  },
  title: {
    ja: '通常記事',
    en: 'Regular',
  },
  content: {
    ja: pug.compileFile(path.join(__dirname, 'post4-content.ja.pug'))(),
    en: pug.compileFile(path.join(__dirname, 'post4-content.en.pug'))(),
  },
  categories: [
    {
      id: 3,
    },
  ],
  tags: [],
};
