import * as express from 'express';

import { config } from 'config';
import { IMenuPage, IRecipeItemComponent } from 'presentations/templates/Menu';
import { IRecipe, Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function foodsHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const foodRecipes: IRecipe[] = Recipe(req.lang)
    .where({
      category: dic.t('Templates.Foods.FOODS'),
    })
    .find();
  const items: IRecipeItemComponent[] = foodRecipes.map(
    (foodRecipe: IRecipe): IRecipeItemComponent => {
      return {
        name: foodRecipe.name,
        hot: null,
        iced: null,
        defaults: {
          href: foodRecipe.url,
        },
      };
    },
  );

  const props: IMenuPage = {
    ...req.layout,
    title: `${dic.t('Templates.Foods.FOODS')} | ${dic.t('name')}`,
    description: dic.t('Templates.Foods.description'),
    keywords: ['hirayama', '平山', 'coffee', 'コーヒー', '珈琲', 'institute', '研究所'],
    image: 'TODO',
    pageType: 'food',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    categoryTitle: {
      heading: dic.t('Templates.Foods.FOODS'),
    },
    items,
  };

  res.render('templates/Menu', { dic, props });
}
