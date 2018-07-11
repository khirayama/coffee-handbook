import { IRawPost } from 'data/posts';
import { IRawRecipe } from 'data/recipes';
import { dictionary } from 'dictionary';
import { Dictionary } from 'utils/Dictionary';

const dic: Dictionary = new Dictionary(null, dictionary);

export const madeleineRecipe: IRawPost<IRawRecipe> = {
  key: 'madeleine',
  meta: {
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-27 16:00',
    url: '/foods/madeleine',
    title: {
      ja: 'マドレーヌ',
      en: 'MADELEINE',
    },
    description: {
      ja: 'マドレーヌ desc',
      en: 'MADELEINE desc',
    },
    thumbnailUrl: {
      square: {
        ja: '/images/image_1@square.jpg',
        en: '/images/image_1@square.jpg',
      },
      rectangle: {
        ja: '/images/image_1@rectangle.jpg',
        en: '/images/image_1@rectangle.jpg',
      },
    },
  },
  data: {
    category: dic.v('meta.recipe.category.FOODS'),
    recipeType: null,
    name: {
      ja: 'マドレーヌ',
      en: 'MADELEINE',
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
  },
};
