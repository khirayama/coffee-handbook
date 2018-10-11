import * as express from 'express';

import { config } from 'config';
import { IIngredientTableRow, IRecipeTemplate, IStepListItem } from 'presentations/templates/Recipe';
import { IRecipe, IRecipeStep, Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function beverageHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const recipe: IRecipe = Recipe(req.lang)
    .where({
      key: req.params.beverageKey,
    })
    .findOne();

  const props: IRecipeTemplate = {
    ...req.layout,
    title: `${recipe.name} | ${dic.t('name')}`,
    description: recipe.description,
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
    image: recipe.thumbnailUrl.rectangle ? recipe.thumbnailUrl.rectangle : null,
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
    ingredientTable: recipe.ingredients
      ? recipe.ingredients.map(
          (ingredient: { name: string; note: string; quantity: string }): IIngredientTableRow => {
            return {
              name: ingredient.name,
              note: ingredient.note,
              quantity: ingredient.quantity,
            };
          },
        )
      : null,
    stepList: {
      recipeType: recipe.recipeType,
      items: recipe.steps.map(
        (step: IRecipeStep): IStepListItem => {
          return {
            summary: step.summary,
            description: step.description,
            image: step.image
              ? {
                  src: step.image.src,
                  alt: step.image.caption,
                  lazy: true,
                }
              : null,
            note: step.note,
          };
        },
      ),
    },
  };

  res.render('templates/Recipe', { dic, props });
}
