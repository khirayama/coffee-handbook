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
  key: string;
  createdAt: string;
  publishedAt: string;
  category: string;
  recipeType: string | null;
  name: string;
  thumbnailUrl: {
    square: string;
    rectangle: string;
  };
  description: string;
  ingredients: {
    name: string;
    quantity: string;
    note?: string;
  }[];
  steps: IRecipeStep[];
}

// tslint:disable-next-line:variable-name
export const Recipe: TResource<IRawRecipe, IRecipe> = (lang: string): Resource<IRawRecipe, IRecipe> => {
  return new Resource(recipes, lang);
};
