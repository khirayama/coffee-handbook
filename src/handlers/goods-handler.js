const config = require('config');
const Dictionary = require('utils/Dictionary');

function goodsHandler(req, res) {
  const dic = new Dictionary(req.lang);

  res.render('pages/Goods', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: 'GOODS',
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
}

module.exports = goodsHandler;
