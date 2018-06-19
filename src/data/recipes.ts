// Beverages
import { coffeeHotRecipe } from 'data/recipes/coffeeHotRecipe';
import { coffeeIcedRecipe } from 'data/recipes/coffeeIcedRecipe';
// Foods
import { madeleineRecipe } from 'data/recipes/madeleineRecipe';

export interface IRawRecipe {
  key: string;
  url: string;
  category: {
    ja: string;
    en: string;
  };
  recipeType: {
    ja: string;
    en: string;
  } | null;
  title: {
    ja: string;
    en: string;
  };
  name: {
    ja: string;
    en: string;
  };
  description: {
    ja: string;
    en: string;
  };
  thumbnailUrl: {
    square: {
      ja: string;
      en: string;
    };
    rectangle: {
      ja: string;
      en: string;
    };
  };
  ingredients: {
    name: {
      ja: string;
      en: string;
    };
    quantity: {
      ja: string;
      en: string;
    };
    note: {
      ja: string;
      en: string;
    };
  }[];
  steps: {
    summary: {
      ja: string;
      en: string;
    };
    description: {
      ja: string;
      en: string;
    };
    note: {
      ja: string;
      en: string;
    };
  }[];
}

export const recipes: IRawRecipe[] = [coffeeHotRecipe, coffeeIcedRecipe, madeleineRecipe];
