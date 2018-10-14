import * as path from 'path';

import * as pug from 'pug';

import { config } from 'config';

import { IRawPost } from 'data/posts';

export const post1: IRawPost = {
  key: 'here-comes-coffee-handbook',
  createdAt: '2018-10-14 12:00',
  publishedAt: '2018-10-14 12:00',
  thumbnailUrl: {
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
    ja: '珈琲手帖、はじめました！',
    en: 'Here comes COFFEE HANDBOOK!',
  },
  description: {
    ja: '珈琲手帖、はじめました！',
    en: 'Here comes COFFEE HANDBOOK!',
  },
  content: {
    ja: pug.compileFile(path.join(__dirname, 'post1-content.ja.pug'))({ config }),
    en: pug.compileFile(path.join(__dirname, 'post1-content.en.pug'))({ config }),
  },
};
