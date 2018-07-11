import { IRawArticle, IRawPost, posts } from 'data/posts';
import { Resource, TResource } from 'utils/Resource';

export interface IArticle {
  content: string;
}

export interface IPost<T> {
  key: string;
  meta: {
    createdAt: string;
    publishedAt: string;
    url: string;
    title: string;
    description: string;
    thumbnailUrl: {
      square: string;
      rectangle: string;
    };
  };
  data: T;
}

// tslint:disable-next-line:variable-name
export const Post: TResource<IRawPost<IRawArticle>, IPost<IArticle>> = (
  lang: string,
): Resource<IRawPost<IRawArticle>, IPost<IArticle>> => {
  return new Resource(posts, lang);
};
