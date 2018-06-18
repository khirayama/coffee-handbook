import { config } from 'config';
import { Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function foodsHandler(req: any, res: any): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const foodRecipes: any = Recipe(req.lang)
    .where({
      category: dic.t('Foods.FOODS'),
    })
    .find();
  const items: any[] = foodRecipes.map(
    (foodRecipe: any): any => {
      return {
        name: foodRecipe.name,
        hot: null,
        iced: null,
        default: {
          url: foodRecipe.url,
        },
      };
    },
  );

  res.render('templates/Menu', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${dic.t('Foods.FOODS')} | ${dic.t('name')}`,
    description: dic.t('Foods.description'),
    thumbnailUrl: 'TODO',
    type: 'food',

    heading: dic.t('Foods.FOODS'),
    items,
  });
}
