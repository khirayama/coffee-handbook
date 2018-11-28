// tslint:disable:no-any
import { dictionary } from 'dictionary';
import { IAction, IDispatch, IPosition, IRawStore } from 'presentations/pages/Maps/interfaces';
import { Dictionary } from 'utils/Dictionary';

export interface ISearchResult {
  searchQuery: { [key: string]: string };
  results: {
    key: string;
    score: number;
    store: IRawStore;
  }[];
}

interface IText {
  en: string;
  ja: string;
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

export class StoreSearchEngine {
  private rawStores: IRawStore[] = [];

  private rawStoresObj: { [key: string]: IRawStore } = {};

  private placeIndex: any = {};

  private storeIndex: any = {};

  private dic: Dictionary = new Dictionary(null, dictionary);

  public encode(keyword: string): string {
    return encodeURIComponent(keyword);
  }

  public decode(keyword: string): string {
    return decodeURIComponent(keyword);
  }

  public buildIndex(rawStores: IRawStore[]): void {
    this.rawStores = rawStores;

    for (const rawStore of this.rawStores) {
      this.rawStoresObj[rawStore.key] = rawStore;
    }

    this.buildPlaceIndex(rawStores);
    this.buildStoreIndex(rawStores);
  }

  public search(keyword: string, pos: IPosition): ISearchResult {
    // TODO: posも使うように。
    // アイデアとしては、placeIndexにマッチしなかった場合に使う。
    // 近いものには加点。という感じか。
    const score: any = {};
    for (let n: number = 2; n <= 4; n += 1) {
      const searchWords: string[] = this.splitNGram(keyword, n);

      for (const searchWord of searchWords) {
        const placeStoreKeys: string[] = this.placeIndex[searchWord] || [];
        for (const placeStoreKey of placeStoreKeys) {
          if (score[placeStoreKey]) {
            score[placeStoreKey] += 1.3;
          } else {
            score[placeStoreKey] = 1.3;
          }
        }

        const storeKeys: string[] = this.storeIndex[searchWord] || [];
        for (const storeKey of storeKeys) {
          if (score[storeKey]) {
            score[storeKey] += 1;
          } else {
            score[storeKey] = 1;
          }
        }
      }
    }

    const scores: number[] = Object.keys(score).map((storeKey: string) => score[storeKey]);
    const maxScore: number = Math.max(...scores);
    const results: {
      key: string;
      score: number;
      store: IRawStore;
    }[] = Object.keys(score)
      .map((storeKey: string) => {
        return {
          key: storeKey,
          score: score[storeKey] / maxScore,
          store: this.rawStoresObj[storeKey],
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

  private addTextObjToIndex(textObj: IText, storeKey: string, index: {}): void {
    Object.keys(textObj).forEach((lang: string) => {
      const value: any = textObj[lang];
      for (let n: number = 2; n <= 4; n += 1) {
        const nGramTexts: string[] = this.splitNGram(value, n);
        for (const nGramText of nGramTexts) {
          if (index[nGramText]) {
            index[nGramText].push(storeKey);
          } else {
            index[nGramText] = [storeKey];
          }
        }
      }
    });
  }

  private buildPlaceIndex(rawStores: IRawStore[]): void {
    for (const rawStore of rawStores) {
      this.addTextObjToIndex(rawStore.address, rawStore.key, this.placeIndex);
    }
  }

  private buildStoreIndex(rawStores: IRawStore[]): void {
    for (const rawStore of rawStores) {
      this.addTextObjToIndex(rawStore.name, rawStore.key, this.storeIndex);

      const serviceKeys: string[] = Object.keys(rawStore.services);
      for (const serviceKey of serviceKeys) {
        const textObj: any = this.dic.v(`Pages.Maps.services.${serviceKey}`);
        if (rawStore.services[serviceKey] === 1 || rawStore.services[serviceKey] === 2) {
          this.addTextObjToIndex(textObj, rawStore.key, this.storeIndex);
        }
      }
    }
  }
}

export const storeSearchEngine: StoreSearchEngine = new StoreSearchEngine();
