const config = require('config');
const Dictionary = require('utils/Dictionary');
const Recipe = require('resources/Recipe');

function foodHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const recipe = Recipe(req.lang)
    .where({
      key: req.params.food,
    })
    .findOne();

  res.render('templates/Recipe', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${recipe.title} | ${config.name}`,
    description: recipe.description,
    thumbnailUrl: recipe.thumbnailUrl.rectangle,
    type: '',

    recipe,
  });
}

module.exports = foodHandler;
