import { goods, IRawGood } from 'data/goods';
import { Resource, TResource } from 'utils/Resource';

export interface IGood {
  key: string;
  createdAt: string;
  publishedAt: string;
  category: string;
  name: string;
  thumbnailUrl: {
    square: string;
    rectangle: string;
  };
  description: string;
  pictures: {
    url: string;
    caption: string;
  }[];
  summary: string;
  specs: {
    name: string;
    value: string;
  }[];
  content: string;
  colors: string[];
}

// tslint:disable-next-line:variable-name
export const Good: TResource<IRawGood, IGood> = (lang: string): Resource<IRawGood, IGood> => {
  return new Resource(goods, lang);
};
