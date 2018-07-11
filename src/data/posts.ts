import { post1 } from 'data/posts/post1';
import { post2 } from 'data/posts/post2';
import { post3 } from 'data/posts/post3';
import { post4 } from 'data/posts/post4';
import { post5 } from 'data/posts/post5';

export interface IRawArticle {
  content: {
    ja: string;
    en: string;
  },
}

export interface IRawPost<T> {
  key: string;
  meta: {
    createdAt: string;
    publishedAt: string;
    url: string;
    title: {
      ja: string;
      en: string;
    };
    description: {
      ja: string;
      en: string;
    };
    thumbnailUrl: {
      square: {
        ja: string;
        en: string;
      };
      rectangle: {
        ja: string;
        en: string;
      };
    };
  };
  data: T;
}

export const posts: IRawPost<IRawArticle>[] = [post5, post4, post3, post2, post1];
