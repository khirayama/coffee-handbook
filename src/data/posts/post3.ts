import * as path from 'path';

import * as pug from 'pug';

import { IRawArticle, IRawPost } from 'data/posts';

export const post3: IRawPost<IRawArticle> = {
  key: 'post3',
  meta: {
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-27 16:00',
    url: '/posts/post3',
    thumbnailUrl: {
      square: {
        ja: '/images/image_3@square.jpg',
        en: '/images/image_3@square.jpg',
      },
      rectangle: {
        ja: '/images/image_3@rectangle.jpg',
        en: '/images/image_3@rectangle.jpg',
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
  },
  data: {
    content: {
      ja: pug.compileFile(path.join(__dirname, 'post3-content.ja.pug'))(),
      en: pug.compileFile(path.join(__dirname, 'post3-content.en.pug'))(),
    },
  },
};
