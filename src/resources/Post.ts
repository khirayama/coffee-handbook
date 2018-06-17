import { posts } from 'data/posts';
import { Resource } from 'resources/Resource';

export const Post = function(lang: string) {
  return new Resource(posts, lang);
};
