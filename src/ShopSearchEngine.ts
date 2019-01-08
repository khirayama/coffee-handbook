// tslint:disable:no-any
import { dic } from 'dic';
import { IPosition, IRawShop } from 'presentations/pages/Shops/interfaces';
import { IDic } from 'utils/Dictionary';

export interface ISearchResult {
  searchQuery: { [key: string]: string };
  results: {
    key: string;
    score: number;
    shop: IRawShop;
  }[];
}

function isSurrogatePear(upper: number, lower: number): boolean {
  return upper >= 0xd800 && upper <= 0xdbff && lower >= 0xdc00 && lower <= 0xdfff;
}

function mbLength(str: string): number {
  let ret: number = 0;
  for (let i: number = 0; i < str.length; i += 1, ret += 1) {
    const upper: number = str.charCodeAt(i);
    const lower: number = str.length > i + 1 ? str.charCodeAt(i + 1) : 0;
    if (isSurrogatePear(upper, lower)) {
      i += 1;
    }
  }

  return ret;
}

function mbSubstr(str: string, begin: number, end: number): string {
  let ret: string = '';
  let len: number = 0;
  for (let i: number = 0; i < str.length; i += 1, len += 1) {
    const upper: number = str.charCodeAt(i);
    const lower: number = str.length > i + 1 ? str.charCodeAt(i + 1) : 0;
    let s: string = '';
    if (isSurrogatePear(upper, lower)) {
      i += 1;
      s = String.fromCharCode(upper, lower);
    } else {
      s = String.fromCharCode(upper);
    }
    if (begin <= len && len < end) {
      ret += s;
    }
  }

  return ret;
}

export class ShopSearchEngine {
  public rawShops: IRawShop[] = [];

  private rawShopsObj: { [key: string]: IRawShop } = {};

  private placeIndex: any = {};

  private shopIndex: any = {};

  public encode(keyword: string): string {
    return encodeURIComponent(keyword);
  }

  public decode(keyword: string): string {
    return decodeURIComponent(keyword);
  }

  public buildIndex(rawShops: IRawShop[]): void {
    this.rawShops = rawShops;

    for (const rawShop of this.rawShops) {
      this.rawShopsObj[rawShop.key] = rawShop;
    }

    this.buildPlaceIndex(rawShops);
    this.buildShopIndex(rawShops);
  }

  public search(keyword: string, pos: IPosition): ISearchResult {
    // TODO: posも使うように。
    // アイデアとしては、placeIndexにマッチしなかった場合に使う。
    // 近いものには加点。という感じか。
    const score: any = {};
    for (let n: number = 2; n <= 4; n += 1) {
      const searchWords: string[] = this.splitNGram(keyword, n);

      for (const searchWord of searchWords) {
        const placeShopKeys: string[] = this.placeIndex[searchWord] || [];
        for (const placeShopKey of placeShopKeys) {
          if (score[placeShopKey]) {
            score[placeShopKey] += 1.3;
          } else {
            score[placeShopKey] = 1.3;
          }
        }

        const shopKeys: string[] = this.shopIndex[searchWord] || [];
        for (const shopKey of shopKeys) {
          if (score[shopKey]) {
            score[shopKey] += 1;
          } else {
            score[shopKey] = 1;
          }
        }
      }
    }

    const scores: number[] = Object.keys(score).map((shopKey: string) => score[shopKey]);
    const maxScore: number = Math.max(...scores);
    const results: {
      key: string;
      score: number;
      shop: IRawShop;
    }[] = Object.keys(score)
      .map((shopKey: string) => {
        return {
          key: shopKey,
          score: score[shopKey] / maxScore,
          shop: this.rawShopsObj[shopKey],
        };
      })
      .sort((a: any, b: any) => {
        return b.score - a.score;
      })
      .filter((result: any) => {
        return result.score > 0.4;
      });

    return {
      searchQuery: {
        q: this.encode(keyword),
        pos: `${pos.lat},${pos.lng}`,
      },
      results,
    };
  }

  private splitNGram(text: string, n: number): string[] {
    const splittedTexts: string[] = text
      .toLowerCase()
      .replace(/ |　/g, '')
      .split(/,/g)
      .map((txt: string) => {
        return txt.trim();
      })
      .filter((txt: string) => !!txt);
    const result: string[] = [];
    for (const splittedText of splittedTexts) {
      for (let i: number = 0; i < mbLength(splittedText); i += 1) {
        result.push(mbSubstr(splittedText, i, i + n));
      }
    }

    return result;
  }

  private addTextObjToIndex(langObj: IDic, shopKey: string, index: {}): void {
    Object.keys(langObj).forEach((lang: string) => {
      const value: any = langObj[lang];
      for (let n: number = 2; n <= 4; n += 1) {
        const nGramTexts: string[] = this.splitNGram(value, n);
        for (const nGramText of nGramTexts) {
          if (index[nGramText]) {
            index[nGramText].push(shopKey);
          } else {
            index[nGramText] = [shopKey];
          }
        }
      }
    });
  }

  private buildPlaceIndex(rawShops: IRawShop[]): void {
    for (const rawShop of rawShops) {
      this.addTextObjToIndex(rawShop.address, rawShop.key, this.placeIndex);
    }
  }

  private buildShopIndex(rawShops: IRawShop[]): void {
    for (const rawShop of rawShops) {
      this.addTextObjToIndex(rawShop.name, rawShop.key, this.shopIndex);

      const serviceKeys: string[] = Object.keys(rawShop.services);
      for (const serviceKey of serviceKeys) {
        const langObj: any = dic.v(`Pages.Maps.services.${serviceKey}`);
        if (rawShop.services[serviceKey] === 1 || rawShop.services[serviceKey] === 2) {
          this.addTextObjToIndex(langObj, rawShop.key, this.shopIndex);
        }
      }
    }
  }
}

export const shopSearchEngine: ShopSearchEngine = new ShopSearchEngine();
