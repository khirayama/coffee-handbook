const config = require('config');
const Dictionary = require('utils/Dictionary');
const Good = require('resources/Good');

function goodHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const good = Good(req.lang)
    .where({
      key: req.params.goodKey,
    })
    .findOne();

  res.render('templates/Good', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${good.title} | ${dic.t('name')}`,
    description: good.description,
    thumbnailUrl: good.thumbnailUrl.rectangle,
    type: 'product',

    good,
  });
}

module.exports = goodHandler;
