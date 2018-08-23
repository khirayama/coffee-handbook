// Beverages - Coffee
import { coffeeHotRecipe } from 'data/recipes/coffeeHotRecipe';
import { coffeeIcedRecipe } from 'data/recipes/coffeeIcedRecipe';

// Beverages - Cold Brew
import { coldBrewIcedRecipe } from 'data/recipes/coldBrewIcedRecipe';

// Beverages - Latte
import { latteHotRecipe } from 'data/recipes/latteHotRecipe';
import { latteIcedRecipe } from 'data/recipes/latteIcedRecipe';

// Beverages - Americano
import { americanoHotRecipe } from 'data/recipes/americanoHotRecipe';
import { americanoIcedRecipe } from 'data/recipes/americanoIcedRecipe';

// Beverages - Mocha
import { mochaHotRecipe } from 'data/recipes/mochaHotRecipe';
import { mochaIcedRecipe } from 'data/recipes/mochaIcedRecipe';

// Beverages - Vanilla Latte
import { vanillaLatteHotRecipe } from 'data/recipes/vanillaLatteHotRecipe';
import { vanillaLatteIcedRecipe } from 'data/recipes/vanillaLatteIcedRecipe';

// Beverages - Cocoa
import { cocoaHotRecipe } from 'data/recipes/cocoaHotRecipe';
import { cocoaIcedRecipe } from 'data/recipes/cocoaIcedRecipe';

// Beverages - Espresson
import { espressoHotRecipe } from 'data/recipes/espressoHotRecipe';

// Foods - Madeleine
import { madeleineRecipe } from 'data/recipes/madeleineRecipe';

import { IRawPost } from 'data/posts';

interface IRawRecipeStep {
  summary: {
    ja: string;
    en: string;
  };
  description?: {
    ja: string;
    en: string;
  };
  image?: {
    src: {
      ja: string;
      en: string;
    };
    caption: {
      ja: string;
      en: string;
    };
  };
  note?: {
    ja: string;
    en: string;
  };
}

export interface IRawRecipe {
  category: {
    ja: string;
    en: string;
  };
  recipeType: {
    ja: string;
    en: string;
  } | null;
  name: {
    ja: string;
    en: string;
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
    note?: {
      ja: string;
      en: string;
    };
  }[];
  steps: IRawRecipeStep[];
}

export const recipes: IRawPost<IRawRecipe>[] = [
  // Beverages
  coffeeHotRecipe,
  coffeeIcedRecipe,
  coldBrewIcedRecipe,
  latteHotRecipe,
  latteIcedRecipe,
  americanoHotRecipe,
  americanoIcedRecipe,
  mochaHotRecipe,
  mochaIcedRecipe,
  vanillaLatteHotRecipe,
  vanillaLatteIcedRecipe,
  cocoaHotRecipe,
  cocoaIcedRecipe,
  espressoHotRecipe,
  // Foods
  madeleineRecipe,
];
