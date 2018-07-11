import { IRawPost } from 'data/posts';
import { IRawRecipe, recipes } from 'data/recipes';
import { IPost } from 'resources/Post';
import { Resource, TResource } from 'utils/Resource';

export interface IRecipeStep {
  summary: string;
  description: string;
  image?: {
    src: string;
    caption: string;
  };
  note?: string;
}

export interface IRecipe {
  category: string;
  name: string;
  recipeType: string;
  ingredients: {
    name: string;
    quantity: string;
    note?: string;
  }[];
  steps: IRecipeStep[];
}

// tslint:disable-next-line:variable-name
export const Recipe: TResource<IRawPost<IRawRecipe>, IPost<IRecipe>> = (
  lang: string,
): Resource<IRawPost<IRawRecipe>, IPost<IRecipe>> => {
  return new Resource(recipes, lang);
};
