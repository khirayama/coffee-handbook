const Resource = require('resources/Resource');

const beverages = [
  {
    name: {
      ja: 'コーヒー',
      en: 'COFFEE',
    },
    hot: {
      url: '/beverages/coffee/hot',
    },
    iced: {
      url: '/beverages/coffee/iced',
    },
  },
  {
    name: {
      ja: 'コールドブリュー',
      en: 'COLD BREW',
    },
    iced: {
      url: '/beverages/cold-brew/iced',
    },
  },
  {
    name: {
      ja: 'ラテ',
      en: 'LATTE',
    },
    hot: {
      url: '/beverages/latte/hot',
    },
    iced: {
      url: '/beverages/latte/iced',
    },
  },
  {
    name: {
      ja: 'アメリカーノ',
      en: 'AMERICANO',
    },
    hot: {
      url: '/beverages/americano/hot',
    },
    iced: {
      url: '/beverages/americano/iced',
    },
  },
  {
    name: {
      ja: 'カプチーノ',
      en: 'CAPPUCCINO',
    },
    hot: {
      url: '/beverages/cappuccino/hot',
    },
    iced: {
      url: '/beverages/cappuccino/iced',
    },
  },
  {
    name: {
      ja: 'モカ',
      en: 'MOCHA',
    },
    hot: {
      url: '/beverages/mocha/hot',
    },
    iced: {
      url: '/beverages/mocha/iced',
    },
  },
  {
    name: {
      ja: 'バニララテ',
      en: 'VANILLA LATTE',
    },
    hot: {
      url: '/beverages/vanilla-latte/hot',
    },
    iced: {
      url: '/beverages/vanilla-latte/iced',
    },
  },
  {
    name: {
      ja: 'ココア',
      en: 'COCOA',
    },
    hot: {
      url: '/beverages/cocoa/hot',
    },
    iced: {
      url: '/beverages/cocoa/iced',
    },
  },
  {
    name: {
      ja: 'エスプレッソ',
      en: 'ESPRESSO',
    },
    hot: {
      url: '/beverages/espresso/hot',
    },
  },
];

const Beverage = function(lang) {
  return new Resource(beverages, lang);
};

module.exports = Beverage;
