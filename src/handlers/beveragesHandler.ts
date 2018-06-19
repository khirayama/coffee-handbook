import { config } from 'config';
import { Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function beveragesHandler(req: any, res: any): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const beverageRecipes: any[] = Recipe(req.lang)
    .where({
      category: dic.t('Templates.Beverages.BEVERAGES'),
    })
    .find();
  // Const beverages = Beverage(req.lang).find();
  const items: any[] = [];
  beverageRecipes.forEach((beverageRecipe: any) => {
    let exsting: boolean = false;
    for (const item of items) {
      if (item.name === beverageRecipe.name) {
        exsting = true;
        if (beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.HOT')) {
          item.hot = {
            url: beverageRecipe.url,
          };
        } else if (beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.ICED')) {
          item.iced = {
            url: beverageRecipe.url,
          };
        }
      }
    }
    if (!exsting) {
      items.push({
        name: beverageRecipe.name,
        hot: beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.HOT') ? { url: beverageRecipe.url } : null,
        iced: beverageRecipe.recipeType === dic.t('meta.recipe.recipeType.ICED') ? { url: beverageRecipe.url } : null,
      });
    }
  });

  res.render('templates/Menu', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${dic.t('Templates.Beverages.BEVERAGES')} | ${dic.t('name')}`,
    description: dic.t('Templates.Beverages.description'),
    thumbnailUrl: 'TODO',
    pageType: 'drink',

    heading: dic.t('Templates.Beverages.BEVERAGES'),
    items,
  });
}
