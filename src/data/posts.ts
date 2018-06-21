import { post1 } from 'data/posts/post1';
import { post2 } from 'data/posts/post2';
import { post3 } from 'data/posts/post3';
import { post4 } from 'data/posts/post4';
import { post5 } from 'data/posts/post5';

export interface IRawPost {
  key: string;
  createdAt: string;
  publishedAt: string;
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
  title: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  content: {
    ja: string;
    en: string;
  };
  categories: { id: number }[];
  tags: { id: number }[];
}

export const posts: IRawPost[] = [post5, post4, post3, post2, post1];
