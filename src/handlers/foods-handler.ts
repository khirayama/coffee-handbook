import { config } from 'config';
import { Dictionary } from 'utils/Dictionary';
import { Recipe } from 'resources/Recipe';

export function foodsHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const foodRecipes = Recipe(req.lang)
    .where({
      category: dic.t('Foods.FOODS'),
    })
    .find();
  const items = foodRecipes.map(foodRecipe => {
    return {
      name: foodRecipe.name,
      hot: null,
      iced: null,
      default: {
        url: foodRecipe.url,
      },
    };
  });

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
