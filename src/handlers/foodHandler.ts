import * as express from 'express';

import { config } from 'config';
import { IIngredientTableRow, IRecipeTemplate, IStepListItem } from 'presentations/templates/Recipe';
import { IPost } from 'resources/Post';
import { IRecipe, Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function foodHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const recipe: IPost<IRecipe> = Recipe(req.lang)
    .where({
      key: req.params.foodKey,
    })
    .findOne();

  const props: IRecipeTemplate = {
    ...req.layout,
    title: `${recipe.meta.title} | ${dic.t('name')}`,
    description: recipe.meta.description,
    keywords: ['hirayama', '平山', 'coffee', 'コーヒー', '珈琲', 'institute', '研究所'],
    image: recipe.meta.thumbnailUrl.rectangle,
    pageType: 'drink',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    contentTitle: {
      heading: recipe.data.name,
      recipeType: recipe.data.recipeType,
    },
    coverPicture: {
      src: recipe.meta.thumbnailUrl.square,
      squareSrc: recipe.meta.thumbnailUrl.square,
      rectangleSrc: recipe.meta.thumbnailUrl.rectangle,
      alt: recipe.data.name,
      lazy: true,
    },
    ingredientTable: recipe.data.ingredients.map(
      (ingredient: { name: string; note: string; quantity: string }): IIngredientTableRow => {
        return {
          name: ingredient.name,
          note: ingredient.note,
          quantity: ingredient.quantity,
        };
      },
    ),
    stepList: {
      recipeType: recipe.data.recipeType,
      items: recipe.data.steps.map(
        (step: { summary: string; description: string; note: string }): IStepListItem => {
          return {
            summary: step.summary,
            description: step.description,
            note: step.note,
          };
        },
      ),
    },
  };

  res.render('templates/Recipe', { dic, props });
}
