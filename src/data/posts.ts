import { post1 } from 'data/posts/post1';
import { post2 } from 'data/posts/post2';

export interface IRawPost {
  key: string;
  createdAt: string;
  publishedAt: string;
  title: {
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
  description: {
    ja: string;
    en: string;
  };
  content: {
    ja: string;
    en: string;
  };
}

export const posts: IRawPost[] = [post2, post1];
