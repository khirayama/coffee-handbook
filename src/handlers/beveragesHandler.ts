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
            href: `/beverages/${beverageRecipe.key}`,
          };
        } else if (beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.ICED')) {
          item.iced = {
            href: `/beverages/${beverageRecipe.key}`,
          };
        }
      }
    }
    if (!exsting) {
      items.push({
        name: beverageRecipe.name,
        hot:
          beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.HOT')
            ? { href: `/beverages/${beverageRecipe.key}` }
            : null,
        iced:
          beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.ICED')
            ? { href: `/beverages/${beverageRecipe.key}` }
            : null,
        defaults: null,
      });
    }
  });

  const props: IMenuPage = {
    ...req.layout,
    title: `${dic.t('Templates.Beverages.BEVERAGES')} | ${dic.t('name')}`,
    description: dic.t('Templates.Beverages.description'),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
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
