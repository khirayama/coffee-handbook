// tslint:disable:max-func-body-length no-any no-console
import * as Fuse from 'fuse.js';

import { shops } from 'data/shops';
import { dictionary } from 'dictionary';
import { IDispatch, IRawShop, IShop, IState } from 'presentations/pages/Maps/interfaces';
import { Dictionary } from 'utils/Dictionary';

// Google Mapsの挙動
// - focusする
// - historyなどのlist表示
// - typeする
// - 候補を表示
// - if 候補を選択
//  - placeに移動
//- if 検索を実行
//  - if matchの角度が高ければ and 1つだけ高い
//    - placeに移動
//  - if matchの角度が低ければ
//    - placesとしてplot

interface IIndexedShop {
  name: {
    en: string;
    ja: string;
  };
  address: {
    en: string;
    ja: string;
  };
  roaster: {
    en: string;
    ja: string;
  };
  speciality: {
    en: string;
    ja: string;
  };
  beans: {
    en: string;
    ja: string;
  };
  credit: {
    en: string;
    ja: string;
  };
  power: {
    en: string;
    ja: string;
  };
  wifi: {
    en: string;
    ja: string;
  };
  barrierFree: {
    en: string;
    ja: string;
  };
  pet: {
    en: string;
    ja: string;
  };
  smoking: {
    en: string;
    ja: string;
  };
}

function createIndex(rawShops: IRawShop[], dic: Dictionary): IIndexedShop[] {
  return rawShops.map(
    (shop: IRawShop): IIndexedShop => {
      function isSupported(status: number): boolean {
        return status === 1 || status === 2;
      }

      const result: any = {
        key: shop.key,
        name: {
          en: shop.name.en.toLowerCase(),
          ja: shop.name.ja.toLowerCase(),
        },
        address: {
          en: shop.address.en.toLowerCase(),
          ja: shop.address.ja.toLowerCase(),
        },
      };
      Object.keys(shop.services).forEach(
        (key: string): void => {
          const value: any = shop.services[key];
          result[key] = isSupported(shop.services[key])
            ? {
                en: (dic.v(`Pages.Maps.services.${key}`).en || ' ').replace('<br>', '').toLowerCase(),
                ja: (dic.v(`Pages.Maps.services.${key}`).ja || ' ').replace('<br>', '').toLowerCase(),
              }
            : { en: '', ja: '' };
        },
      );

      return <IIndexedShop>result;
    },
  );
}

setTimeout((): void => {
  const index: any[] = createIndex(shops, new Dictionary(null, dictionary));

  const searchKeys: string[] = [
    '福岡',
    'fukuoka',
    '焙煎機',
    'roaster',
    '福岡 焙煎機',
    'fukuoka roaster',
    '福岡 roaster',
    'fukuoka 焙煎機',
    'saredo',
  ];
  // const searchKey: string = 'fukuoka roaster'
  //   .replace('　', ' ')
  //   .trim()
  //   .toLowerCase();

  const keys: { name: string; weight: number }[] = [];
  Object.keys(index[0]).forEach((key: string) => {
    if (key === 'key') {
      return;
    }
    Object.keys(index[0][key]).forEach((langKey: string) => {
      keys.push({
        name: `${key}.${langKey}`,
        weight: ((): number => {
          let weight: number = 0.5;
          if (key === 'name') {
            weight += 0.05;
          }
          if (key === 'address') {
            weight += 0.1;
          }

          return weight;
        })(),
      });
    });
  });

  const fuse: Fuse<any> = new Fuse(index, {
    shouldSort: true,
    includeScore: true,
    tokenize: true,
    location: 0,
    distance: 0,
    keys,
  });

  /* TODO:
   * name
   * address
   * services
   * ごとに検索機を作成。
   * 1 - scoreしたものをポイントとして
   * name point * 1 + address point * 1.3 + services point * 0.7
   * したものを上位から表示。とか
   */

  for (const searchKey of searchKeys) {
    console.log(`----- ${searchKey} -----`);
    const result: any[] = fuse.search(searchKey).filter((item: any) => item.score < 0.5);
    for (const res of result) {
      console.log(`${res.item.name.ja}@${res.item.address.ja}: ${res.score}`);
    }
  }
}, 300);
