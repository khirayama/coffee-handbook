import { IRawPost, posts } from 'data/posts';
import { Resource, TResource } from 'utils/Resource';

export interface IPost {
  key: string;
  createdAt: string;
  publishedAt: string;
  title: string;
  thumbnailUrl: {
    square: string;
    rectangle: string;
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

// tslint:disable-next-line:variable-name
export const Post: TResource<IRawPost, IPost> = (lang: string): Resource<IRawPost, IPost> => {
  return new Resource(posts, lang);
};
