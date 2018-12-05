// tslint:disable:no-any

interface IOptions {
  defaultLang?: string;
}

export interface IText {
  ja: string;
  en: string;
}

export type ITextFunc = (...args: string[]) => IText;

export interface IDictionary {
  [key: string]: IText | ITextFunc | IDictionary;
}

export class Dictionary {
  private dic: IDictionary;

  private defaultLang: string | null;

  constructor(dictionary: IDictionary, options?: IOptions) {
    this.dic = dictionary;
    this.defaultLang = options ? options.defaultLang || null : null;
  }

  // tslint:disable-next-line:function-name
  public v(key: string): IText {
    const keys: string[] = key.split('.');
    let val: any = this.dic;
    for (const valueKey of keys) {
      val = val[valueKey];
    }

    return val;
  }

  // tslint:disable-next-line:function-name
  public t(key: string, lang: string, ...args: any[]): string {
    let val: any = this.v(key);
    if (typeof val === 'function') {
      val = val(...args);
    }

    return val[lang] || val[this.defaultLang];
  }
}
