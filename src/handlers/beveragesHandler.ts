import * as express from 'express';

import { config } from 'config';
import { IMenuPage, IRecipeItemComponent } from 'presentations/templates/Menu';
import { IPost } from 'resources/Post';
import { IRecipe, Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function beveragesHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const beverageRecipes: IPost<IRecipe>[] = Recipe(req.lang)
    .where({
      data: {
        category: dic.t('Templates.Beverages.BEVERAGES'),
      },
    })
    .find();

  const items: IRecipeItemComponent[] = [];
  beverageRecipes.forEach((beverageRecipe: IPost<IRecipe>) => {
    let exsting: boolean = false;
    for (const item of items) {
      if (item.name === beverageRecipe.data.name) {
        exsting = true;
        if (beverageRecipe.data.recipeType === dic.t('meta.recipe.recipeType.HOT')) {
          item.hot = {
            href: beverageRecipe.meta.url,
          };
        } else if (beverageRecipe.data.recipeType === dic.t('meta.recipe.recipeType.ICED')) {
          item.iced = {
            href: beverageRecipe.meta.url,
          };
        }
      }
    }
    if (!exsting) {
      items.push({
        name: beverageRecipe.data.name,
        hot: beverageRecipe.data.recipeType === dic.t('meta.recipe.recipeType.HOT') ? { href: beverageRecipe.meta.url } : null,
        iced: beverageRecipe.data.recipeType === dic.t('meta.recipe.recipeType.ICED') ? { href: beverageRecipe.meta.url } : null,
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
