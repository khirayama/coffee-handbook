const config = require('config');
const Recipe = require('resources/Recipe');
const Dictionary = require('utils/Dictionary');

function beverageHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const recipe = Recipe(req.lang)
    .where({
      key: `${req.params.beverage}-${req.params.type}`,
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
    type: 'drink',

    recipe,
  });
}

module.exports = beverageHandler;
