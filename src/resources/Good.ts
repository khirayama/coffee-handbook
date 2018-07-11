import { goods, IRawGood } from 'data/goods';
import { IRawPost } from 'data/posts';
import { IPost } from 'resources/Post';
import { Resource, TResource } from 'utils/Resource';

export interface IGood {
  category: string;
  name: string;
  summary: string;
  content: string;
  pictures: {
    url: string;
    caption: string;
  }[];
  specs: {
    name: string;
    value: string;
  }[];
  colors: string[];
  links: {
    site: string;
    url: string;
  }[];
}

// tslint:disable-next-line:variable-name
export const Good: TResource<IRawPost<IRawGood>, IPost<IGood>> = (
  lang: string,
): Resource<IRawPost<IRawGood>, IPost<IGood>> => {
  return new Resource(goods, lang);
};
