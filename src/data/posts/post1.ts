import * as path from 'path';

import * as pug from 'pug';

import { IRawArticle, IRawPost } from 'data/posts';

export const post1: IRawPost<IRawArticle> = {
  key: 'post1',
  meta: {
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-26 15:00',
    url: '/posts/post1',
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
      ja: '【特集】なぜ僕らがこの活動をはじめたのか。',
      en: '[Feature] Why we start this activities.',
    },
    description: {
      ja: '【特集】なぜ僕らがこの活動をはじめたのか。',
      en: '[Feature] Why we start this activities.',
    },
  },
  data: {
    content: {
      ja: pug.compileFile(path.join(__dirname, 'post1-content.ja.pug'))(),
      en: pug.compileFile(path.join(__dirname, 'post1-content.en.pug'))(),
    },
  },
};
