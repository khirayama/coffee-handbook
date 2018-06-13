const config = require('config');
const Beverage = require('resources/Beverage');
const Dictionary = require('utils/Dictionary');

function beveragesHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const beverages = Beverage(req.lang).find();

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
    items: beverages,
  });
}

module.exports = beveragesHandler;
