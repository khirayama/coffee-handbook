import { posts } from 'data/posts';
import { Resource, TResource } from 'resources/Resource';

// tslint:disable-next-line:variable-name
export const Post: TResource = (lang: string): Resource => {
  return new Resource(posts, lang);
};
