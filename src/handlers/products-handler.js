const config = require('config');
const Product = require('resources/Product');
const Dictionary = require('utils/Dictionary');

function productsHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const products = Product(req.lang).find();

  res.render('pages/Products', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${dic.t('Products.PRODUCTS')} | ${dic.t('name')}`,
    description: dic.t('Products.description'),
    thumbnailUrl: 'TODO',
    type: 'product',

    heading: dic.t('Products.PRODUCTS'),
    products,
  });
}

module.exports = productsHandler;
