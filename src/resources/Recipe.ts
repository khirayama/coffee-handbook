import { recipes } from 'data/recipes';
import { Resource, TResource } from 'resources/Resource';

// tslint:disable-next-line:variable-name
export const Recipe: TResource = (lang: string): Resource => {
  return new Resource(recipes, lang);
};
