import { IRawRecipe, recipes } from 'data/recipes';
import { Resource, TResource } from 'resources/Resource';

export interface IRecipe {
  key: string;
  url: string;
  category: string;
  recipeType: string;
  title: string;
  name: string;
  description: string;
  thumbnailUrl: {
    square: string;
    rectangle: string;
  };
  ingredients: {
    name: string;
    quantity: string;
    note: string;
  }[];
  steps: {
    summary: string;
    description: string;
    note: string;
  }[];
}

// tslint:disable-next-line:variable-name
export const Recipe: TResource<IRawRecipe, IRecipe> = (lang: string): Resource<IRawRecipe, IRecipe> => {
  return new Resource(recipes, lang);
};
