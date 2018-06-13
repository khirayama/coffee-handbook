const config = require('config');
const Food = require('resources/Food');
const Dictionary = require('utils/Dictionary');

function foodsHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const foods = Food(req.lang).find();

  res.render('templates/Menu', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${dic.t('Foods.FOODS')} | ${config.name}`,
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',

    heading: dic.t('Foods.FOODS'),
    items: foods,
  });
}

module.exports = foodsHandler;
