import { goods, IRawGood } from 'data/goods';
import { Resource, TResource } from 'resources/Resource';

export interface IGood {
  key: string;
  url: string;
  meta: {
    title: string;
    description: string;
    thumbnailUrl: {
      square: string;
      rectangle: string;
    };
  };
  category: string;
  name: string;
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
  links: {
    site: string;
    url: string;
  }[];
}

// tslint:disable-next-line:variable-name
export const Good: TResource<IRawGood, IGood> = (lang: string): Resource<IRawGood, IGood> => {
  return new Resource(goods, lang);
};
