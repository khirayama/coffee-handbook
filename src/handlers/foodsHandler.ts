import * as express from 'express';

import { config } from 'config';
import { IMenuPage, IRecipeItemComponent } from 'presentations/templates/Menu';
import { IPost } from 'resources/Post';
import { IRecipe, Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function foodsHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const foodRecipes: IPost<IRecipe>[] = Recipe(req.lang)
    .where({
      data: {
        category: dic.t('Templates.Foods.FOODS'),
      },
    })
    .find();
  const items: IRecipeItemComponent[] = foodRecipes.map(
    (foodRecipe: IPost<IRecipe>): IRecipeItemComponent => {
      return {
        name: foodRecipe.data.name,
        hot: null,
        iced: null,
        defaults: {
          href: foodRecipe.meta.url,
        },
      };
    },
  );

  const props: IMenuPage = {
    ...req.layout,
    title: `${dic.t('Templates.Foods.FOODS')} | ${dic.t('name')}`,
    description: dic.t('Templates.Foods.description'),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
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
