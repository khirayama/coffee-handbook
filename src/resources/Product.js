const products = require('data/products');
const Resource = require('resources/Resource');

const Product = function(lang) {
  return new Resource(products, lang);
};

module.exports = Product;
