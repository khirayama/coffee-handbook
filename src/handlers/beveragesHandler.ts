import { config } from 'config';
import { Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function beveragesHandler(req: any, res: any): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const beverageRecipes: any[] = Recipe(req.lang)
    .where({
      category: dic.t('Beverages.BEVERAGES'),
    })
    .find();
  // Const beverages = Beverage(req.lang).find();
  const items: any[] = [];
  beverageRecipes.forEach((beverageRecipe: any) => {
    let exsting: boolean = false;
    for (const item of items) {
      if (item.name === beverageRecipe.name) {
        exsting = true;
        if (beverageRecipe.type === dic.t('Recipe.HOT')) {
          item.hot = {
            url: beverageRecipe.url,
          };
        } else if (beverageRecipe.type === dic.t('Recipe.ICED')) {
          item.iced = {
            url: beverageRecipe.url,
          };
        }
      }
    }
    if (!exsting) {
      items.push({
        name: beverageRecipe.name,
        hot: beverageRecipe.type === dic.t('Recipe.HOT') ? { url: beverageRecipe.url } : null,
        iced: beverageRecipe.type === dic.t('Recipe.ICED') ? { url: beverageRecipe.url } : null,
      });
    }
  });

  res.render('templates/Menu', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${dic.t('Beverages.BEVERAGES')} | ${dic.t('name')}`,
    description: dic.t('Beverages.description'),
    thumbnailUrl: 'TODO',
    type: 'drink',

    heading: dic.t('Beverages.BEVERAGES'),
    items,
  });
}
