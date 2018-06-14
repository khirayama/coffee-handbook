const config = require('config');
const Dictionary = require('utils/Dictionary');
const Product = require('resources/Product');

function productHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const product = Product(req.lang)
    .where({
      key: req.params.product,
    })
    .findOne();

  res.render('templates/Product', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${product.title} | ${dic.t('name')}`,
    description: product.description,
    thumbnailUrl: product.thumbnailUrl.rectangle,
    type: 'product',

    product,
  });
}

module.exports = productHandler;
