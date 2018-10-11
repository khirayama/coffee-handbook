import { IRawRecipe } from 'data/recipes';
import { dictionary } from 'dictionary';
import { Dictionary } from 'utils/Dictionary';

const dic: Dictionary = new Dictionary(null, dictionary);

export const mochaIcedRecipe: IRawRecipe = {
  key: 'mocha-iced',
  createdAt: '2018-05-26 12:00',
  publishedAt: '2018-05-27 16:00',
  description: {
    ja: 'モカ desc',
    en: 'MOCHA desc',
  },
  thumbnailUrl: {
    square: null,
    rectangle: null,
  },
  category: dic.v('meta.recipe.category.BEVERAGES'),
  recipeType: dic.v('meta.recipe.recipeType.ICED'),
  name: {
    ja: 'モカ',
    en: 'MOCHA',
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
