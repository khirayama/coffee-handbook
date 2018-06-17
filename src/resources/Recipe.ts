import { recipes } from 'data/recipes';
import { Resource } from 'resources/Resource';

export const Recipe = function(lang) {
  return new Resource(recipes, lang);
};
