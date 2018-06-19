import { recipes } from 'data/recipes';
import { Resource, TResource } from 'resources/Resource';

// tslint:disable-next-line:variable-name
export const Recipe: TResource<any, any> = (lang: string): Resource<any, any> => {
  return new Resource(recipes, lang);
};
