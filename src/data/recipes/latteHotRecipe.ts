import { IRawRecipe } from 'data/recipes';
import { dictionary } from 'dictionary';
import { Dictionary } from 'utils/Dictionary';

const dic: Dictionary = new Dictionary(null, dictionary);

export const latteHotRecipe: IRawRecipe = {
  key: 'latte-hot',
  createdAt: '2018-05-26 12:00',
  publishedAt: '2018-05-27 16:00',
  description: {
    ja: 'ラテのレシピ。',
    en: 'The recipe of hot latte.',
  },
  thumbnailUrl: {
    square: null,
    rectangle: null,
  },
  category: dic.v('meta.recipe.category.BEVERAGES'),
  recipeType: dic.v('meta.recipe.recipeType.HOT'),
  name: {
    ja: 'ラテ',
    en: 'LATTE',
  },
  ingredients: null,
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
