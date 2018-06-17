import { goods } from 'data/goods';
import { Resource } from 'resources/Resource';

export const Good = function(lang) {
  return new Resource(goods, lang);
};
