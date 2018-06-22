import * as express from 'express';

import { config } from 'config';
import { IMenuPage, IRecipeItemComponent } from 'presentations/templates/Menu';
import { IRecipe, Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function beveragesHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const beverageRecipes: IRecipe[] = Recipe(req.lang)
    .where({
      category: dic.t('Templates.Beverages.BEVERAGES'),
    })
    .find();

  const items: IRecipeItemComponent[] = [];
  beverageRecipes.forEach((beverageRecipe: IRecipe) => {
    let exsting: boolean = false;
    for (const item of items) {
      if (item.name === beverageRecipe.name) {
        exsting = true;
        if (beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.HOT')) {
          item.hot = {
            href: beverageRecipe.url,
          };
        } else if (beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.ICED')) {
          item.iced = {
            href: beverageRecipe.url,
          };
        }
      }
    }
    if (!exsting) {
      items.push({
        name: beverageRecipe.name,
        hot: beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.HOT') ? { href: beverageRecipe.url } : null,
        iced: beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.ICED') ? { href: beverageRecipe.url } : null,
        defaults: null,
      });
    }
  });

  const props: IMenuPage = {
    ...req.layout,
    title: `${dic.t('Templates.Beverages.BEVERAGES')} | ${dic.t('name')}`,
    description: dic.t('Templates.Beverages.description'),
    keywords: ['hirayama', '平山', 'coffee', 'コーヒー', '珈琲', 'institute', '研究所'],
    image: 'TODO',
    pageType: 'drink',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    categoryTitle: {
      heading: dic.t('Templates.Beverages.BEVERAGES'),
    },
    items,
  };

  res.render('templates/Menu', { dic, props });
}
