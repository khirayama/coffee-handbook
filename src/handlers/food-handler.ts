import { config } from 'config';
import { Dictionary } from 'utils/Dictionary';
import { Recipe } from 'resources/Recipe';

export function foodHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const recipe = Recipe(req.lang)
    .where({
      key: req.params.foodKey,
    })
    .findOne();

  res.render('templates/Recipe', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${recipe.title} | ${dic.t('name')}`,
    description: recipe.description,
    thumbnailUrl: recipe.thumbnailUrl.rectangle,
    type: 'food',

    recipe,
  });
}
