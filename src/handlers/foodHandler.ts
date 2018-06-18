import { config } from 'config';
import { Recipe } from 'resources/Recipe';
import { Dictionary } from 'utils/Dictionary';

export function foodHandler(req: any, res: any): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const recipe: any = Recipe(req.lang)
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
