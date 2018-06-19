import { IRawPost, posts } from 'data/posts';
import { Resource, TResource } from 'resources/Resource';

export interface IPost {
  key: string;
  createdAt: string;
  publishedAt: string;
  thumbnailUrl: {
    square: string;
    rectangle: string;
  };
  title: string;
  content: string;
  categories: { id: number }[];
  tags: { id: number }[];
}

// tslint:disable-next-line:variable-name
export const Post: TResource<IRawPost, IPost> = (lang: string): Resource<IRawPost, IPost> => {
  return new Resource(posts, lang);
};
