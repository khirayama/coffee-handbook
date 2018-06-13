const config = require('config');
const Recipe = require('resources/Recipe');
const Dictionary = require('utils/Dictionary');

function foodsHandler(req, res) {
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
    title: `${dic.t('Foods.FOODS')} | ${config.name}`,
    description: 'test',
    thumbnailUrl: 'test',
    type: 'food',

    heading: dic.t('Foods.FOODS'),
    items,
  });
}

module.exports = foodsHandler;
