import { IRawPost } from 'data/posts';
import { IRawRecipe, recipes } from 'data/recipes';
import { IPost } from 'resources/Post';
import { Resource, TResource } from 'utils/Resource';

export interface IRecipe {
  category: string;
  name: string;
  recipeType: string;
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
export const Recipe: TResource<IRawPost<IRawRecipe>, IPost<IRecipe>> = (lang: string): Resource<IRawPost<IRawRecipe>, IPost<IRecipe>> => {
  return new Resource(recipes, lang);
};
