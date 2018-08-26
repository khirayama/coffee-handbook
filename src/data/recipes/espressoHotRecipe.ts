import { IRawPost } from 'data/posts';
import { IRawRecipe } from 'data/recipes';
import { dictionary } from 'dictionary';
import { Dictionary } from 'utils/Dictionary';

const dic: Dictionary = new Dictionary(null, dictionary);

export const espressoHotRecipe: IRawPost<IRawRecipe> = {
  key: 'espresso-hot',
  meta: {
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-27 16:00',
    url: '/beverages/espresso/hot',
    title: {
      ja: 'エスプレッソ',
      en: 'ESPRESSO',
    },
    description: {
      ja: 'エスプレッソ desc',
      en: 'ESPRESSO desc',
    },
    thumbnailUrl: {
      square: null,
      rectangle: null,
    },
  },
  data: {
    category: dic.v('meta.recipe.category.BEVERAGES'),
    recipeType: dic.v('meta.recipe.recipeType.HOT'),
    name: {
      ja: 'エスプレッソ',
      en: 'ESPRESSO',
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
  },
};
