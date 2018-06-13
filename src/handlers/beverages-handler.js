const config = require('config');
const Recipe = require('resources/Recipe');
const Dictionary = require('utils/Dictionary');

function beveragesHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const beverageRecipes = Recipe(req.lang)
    .where({
      category: dic.t('Beverages.BEVERAGES'),
    })
    .find();
  // Const beverages = Beverage(req.lang).find();
  const items = [];
  beverageRecipes.forEach(beverageRecipe => {
    let exsting = false;
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
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
    title: `${dic.t('Beverages.BEVERAGES')} | ${config.name}`,
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',

    heading: dic.t('Beverages.BEVERAGES'),
    items,
  });
}

module.exports = beveragesHandler;
