import { posts } from 'data/posts';
import { Resource, TResource } from 'resources/Resource';

// tslint:disable-next-line:variable-name
export const Post: TResource<any, any> = (lang: string): Resource<any, any> => {
  return new Resource(posts, lang);
};
