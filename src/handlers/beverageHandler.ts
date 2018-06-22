import * as express from 'express';

import { config } from 'config';
import { IIngredientTableRow, IRecipeTemplate, IStepListItem } from 'presentations/templates/Recipe';
import { IRecipe, Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function beverageHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const recipe: IRecipe = Recipe(req.lang)
    .where({
      key: `${req.params.beverageKey}-${req.params.recipeType}`,
    })
    .findOne();

  const props: IRecipeTemplate = {
    ...req.layout,
    title: `${recipe.title} | ${dic.t('name')}`,
    description: recipe.description,
    keywords: ['hirayama', '平山', 'coffee', 'コーヒー', '珈琲', 'institute', '研究所'],
    image: recipe.thumbnailUrl.rectangle,
    pageType: 'drink',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    contentTitle: {
      heading: recipe.name,
      recipeType: recipe.recipeType,
    },
    coverPicture: {
      src: recipe.thumbnailUrl.square,
      squareSrc: recipe.thumbnailUrl.square,
      rectangleSrc: recipe.thumbnailUrl.rectangle,
      alt: recipe.name,
      lazy: true,
    },
    ingredientTable: recipe.ingredients.map(
      (ingredient: { name: string; note: string; quantity: string }): IIngredientTableRow => {
        return {
          name: ingredient.name,
          note: ingredient.note,
          quantity: ingredient.quantity,
        };
      },
    ),
    stepList: {
      recipeType: recipe.recipeType,
      items: recipe.steps.map(
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
