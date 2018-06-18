import { goods } from 'data/goods';
import { Resource, TResource } from 'resources/Resource';

// tslint:disable-next-line:variable-name
export const Good: TResource = (lang: string): Resource => {
  return new Resource(goods, lang);
};
