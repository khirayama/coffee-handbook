const Resource = require('resources/Resource');

const foods = [
  {
    name: {
      ja: 'マドレーヌ',
      en: 'MADELEINE',
    },
    default: {
      url: '/foods/madeleine',
    },
  },
];

const Food = function(lang) {
  return new Resource(foods, lang);
};

module.exports = Food;
