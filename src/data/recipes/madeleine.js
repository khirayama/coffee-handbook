const madeleineRecipe = {
  key: 'madeleine',
  title: {
    ja: 'マドレーヌ',
    en: 'MADELEINE',
  },
  name: {
    ja: 'マドレーヌ',
    en: 'MADELEINE',
  },
  description: {
    ja: 'マドレーヌ desc',
    en: 'MADELEINE desc',
  },
  type: null,
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
        ja: 'バター',
        en: 'Butter',
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

module.exports = madeleineRecipe;
