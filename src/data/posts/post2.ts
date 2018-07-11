import * as path from 'path';

import * as pug from 'pug';

import { IRawArticle, IRawPost } from 'data/posts';

export const post2: IRawPost<IRawArticle> = {
  key: 'post2',
  meta: {
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-27 15:00',
    url: '/posts/post2',
    thumbnailUrl: {
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
    description: {
      ja: '【特集】なぜ僕らがこの活動をはじめたのか。- 2',
      en: '[Feature] Why we start this activities. - 2',
    },
  },
  data: {
    content: {
      ja: pug.compileFile(path.join(__dirname, 'post2-content.ja.pug'))(),
      en: pug.compileFile(path.join(__dirname, 'post2-content.en.pug'))(),
    },
  },
};
