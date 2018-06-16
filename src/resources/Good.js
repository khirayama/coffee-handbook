const goods = require('data/goods');
const Resource = require('resources/Resource');

const Good = function(lang) {
  return new Resource(goods, lang);
};

module.exports = Good;
