// tslint:disable:no-any

interface IOptions {
  defaultLang?: string;
}

export interface IDic {
  en?: string;
  ja?: string;
}

export type IDicFunc = (...args: string[]) => IDic;

export interface IDicTree {
  [key: string]: IDic | IDicFunc | IDicTree;
}

export class Dictionary {
  private dic: IDicTree;

  private defaultLang: string | null;

  constructor(dictionary: IDicTree, options?: IOptions) {
    this.dic = dictionary;
    this.defaultLang = options ? options.defaultLang || null : null;
  }

  // tslint:disable-next-line:function-name
  public v(key: string, ...args: any[]): IDic {
    const keys: string[] = key.split('.');
    let val: IDic | IDicFunc = this.dic;
    for (const valueKey of keys) {
      val = val[valueKey];
    }
    if (typeof val === 'function') {
      val = val(...args);
    }

    return val;
  }

  // tslint:disable-next-line:function-name
  public t(key: string, lang: string, ...args: any[]): string {
    const val: IDic = this.v(key);

    return val[lang] || val[this.defaultLang];
  }
}
