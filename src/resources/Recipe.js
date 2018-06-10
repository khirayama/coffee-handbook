const Resource = require('resources/Resource');

const coffeeHotRecipe = {
  key: 'coffee-hot',
  title: {
    ja: 'コーヒー',
    en: 'COFFEE',
  },
  name: {
    ja: 'コーヒー',
    en: 'COFFEE',
  },
  description: {
    ja: 'コーヒー desc',
    en: 'COFFEE desc',
  },
  type: {
    ja: 'ホット',
    en: 'HOT',
  },
  thumbnailUrl: {
    default: {
      ja: '/images/image_1@square.jpg',
      en: '/images/image_1@square.jpg',
    },
    square: {
      ja: '/images/image_1@square.jpg',
      en: '/images/image_1@square.jpg',
    },
    rectangle: {
      ja: '/images/image_1@rectangle.jpg',
      en: '/images/image_1@rectangle.jpg',
    },
  },
  steps: [
    {
      summary: {
        ja: '水をあれあれ',
        en: 'Water Water',
      },
      description: {
        ja: 'いろいろ細かく',
        en: 'Do something',
      },
      note: {
        ja: 'ほげほげ',
        en: 'hogehoge',
      },
    },
    {
      summary: {
        ja: '水をあれあれ',
        en: 'Water Water',
      },
      description: {
        ja: 'いろいろ細かく',
        en: 'Do something',
      },
      note: {
        ja: 'ほげほげ',
        en: 'hogehoge',
      },
    },
  ],
};

const coffeeIcedRecipe = {
  key: 'coffee-iced',
  title: {
    ja: 'コーヒー',
    en: 'COFFEE',
  },
  name: {
    ja: 'コーヒー',
    en: 'COFFEE',
  },
  description: {
    ja: 'コーヒー desc',
    en: 'COFFEE desc',
  },
  type: {
    ja: 'アイス',
    en: 'ICED',
  },
  thumbnailUrl: {
    default: {
      ja: '/images/image_1@square.jpg',
      en: '/images/image_1@square.jpg',
    },
    square: {
      ja: '/images/image_1@square.jpg',
      en: '/images/image_1@square.jpg',
    },
    rectangle: {
      ja: '/images/image_1@rectangle.jpg',
      en: '/images/image_1@rectangle.jpg',
    },
  },
  steps: [
    {
      summary: {
        ja: '水をあれあれ',
        en: 'Water Water',
      },
      description: {
        ja: 'いろいろ細かく',
        en: 'Do something',
      },
      note: {
        ja: 'ほげほげ',
        en: 'hogehoge',
      },
    },
    {
      summary: {
        ja: '水をあれあれ',
        en: 'Water Water',
      },
      description: {
        ja: 'いろいろ細かく',
        en: 'Do something',
      },
      note: {
        ja: 'ほげほげ',
        en: 'hogehoge',
      },
    },
  ],
};

const recipes = [coffeeHotRecipe, coffeeIcedRecipe];

const Recipe = function(lang) {
  return new Resource(recipes, lang);
};

module.exports = Recipe;
