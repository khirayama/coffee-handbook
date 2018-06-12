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
  ingredients: [
    {
      name: {
        ja: 'コーヒー豆',
        en: 'Coffee Beans',
      },
      quantity: {
        ja: '20g',
        en: '20g',
      },
      note: {
        ja: '中細挽き',
        en: 'Middle casdcadscasdcasdcas',
      },
    },
    {
      name: {
        ja: '水',
        en: 'Water',
      },
      quantity: {
        ja: '200ml',
        en: '200ml',
      },
      note: {
        ja: '94℃程度',
        en: 'Around 94℃(201℉)',
      },
    },
  ],
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

module.exports = coffeeHotRecipe;
