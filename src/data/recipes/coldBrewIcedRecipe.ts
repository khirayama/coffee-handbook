import { IRawRecipe } from 'data/recipes';
import { dictionary } from 'dictionary';
import { Dictionary } from 'utils/Dictionary';

const dic: Dictionary = new Dictionary(null, dictionary);

export const coldBrewIcedRecipe: IRawRecipe = {
  key: 'cold-brew-iced',
  createdAt: '2018-05-26 12:00',
  publishedAt: '2018-05-27 16:00',
  description: {
    ja: 'コールドブリューのレシピ。',
    en: 'The recipe of cold brew.',
  },
  thumbnailUrl: {
    square: null,
    rectangle: null,
  },
  category: dic.v('meta.recipe.category.BEVERAGES'),
  recipeType: dic.v('meta.recipe.recipeType.ICED'),
  name: {
    ja: 'コールドブリュー',
    en: 'COLD BREW',
  },
  ingredients: [
    {
      name: {
        ja: 'コーヒー豆',
        en: 'Coffee Beans',
      },
      quantity: {
        ja: '80g',
        en: '80g',
      },
      note: {
        ja: '中細挽き',
        en: 'Medium Fine',
      },
    },
    {
      name: {
        ja: '水',
        en: 'Water',
      },
      quantity: {
        ja: '1150ml',
        en: '1150ml',
      },
    },
  ],
  steps: [
    {
      summary: {
        ja: '準備',
        en: 'Prepares',
      },
      description: {
        ja: 'ストレーナにコーヒー豆を入れる。',
        en: 'Sets coffee beans to a strainer.',
      },
    },
    {
      summary: {
        ja: '抽出',
        en: 'Brew',
      },
      description: {
        ja: '水を全て注いで、8時間冷蔵庫で待つ。',
        en: 'Pours water and place it in the refrigerator for over 8 hours.',
      },
    },
    {
      summary: {
        ja: '出来上がり！',
        en: "It's ready to drink! ",
      },
    },
  ],
};
