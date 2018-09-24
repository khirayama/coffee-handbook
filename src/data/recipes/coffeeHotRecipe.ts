import { IRawPost } from 'data/posts';
import { IRawRecipe } from 'data/recipes';
import { dictionary } from 'dictionary';
import { Dictionary } from 'utils/Dictionary';

const dic: Dictionary = new Dictionary(null, dictionary);

export const coffeeHotRecipe: IRawPost<IRawRecipe> = {
  key: 'coffee-hot',
  meta: {
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-27 16:00',
    url: '/beverages/coffee/hot',
    title: {
      ja: 'コーヒー',
      en: 'COFFEE',
    },
    description: {
      ja: 'ペーパーフィルターを使用したホットコーヒーのレシピ。',
      en: 'Recipe of hot coffee used paper filter.',
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
      ja: 'コーヒー',
      en: 'COFFEE',
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
          en: 'Medium Fine',
        },
      },
      {
        name: {
          ja: '水',
          en: 'Water',
        },
        quantity: {
          ja: '425ml',
          en: '425ml',
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
          ja: '準備',
          en: 'Prepares',
        },
        description: {
          ja: `
            水200mlを94℃程度まで沸かし、抽出器具にセットしたペーパーフィルターに湯通しする。<br>
            豆は中細挽きにして、湯通ししたペーパーフィルターにセットする。
          `,
          en: `
            Boil water to 21℉ and parboil the paper filter.<br>
            Graind the beans and set it to the filter parboilded.
          `,
        },
      },
      {
        summary: {
          ja: '抽出',
          en: 'Brew',
        },
        description: {
          ja: `
            お湯を75ml注ぎ、45秒蒸らす。その後、50mlずつに6回に分けながら注ぐ。合計375ml使用。<br>
            最後のお湯が落ちきる前にドリッパーを取り上げる。
          `,
          en: `
            First, pours 75ml water up to the dripper. After this, pours 50ml water 6 separate times. Use 375ml in all.<br>
            Remove the dripper before last time dropping.
          `,
        },
        note: {
          ja: `
            フィルターに直接お湯を注がないように注意する。コーヒー豆を通らないお湯が混ざってしまう。
          `,
          en: `
            Be careful not to pour the water directly to the filter because hot water does not pass through coffee beans.
          `,
        },
      },
      {
        summary: {
          ja: '出来上がり！',
          en: "It's ready to drink! ",
        },
      },
    ],
  },
};
