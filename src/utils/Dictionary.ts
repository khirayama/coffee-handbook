import { dictionary as dictionaryData } from 'dictionary';

export class Dictionary {
  private lang: string | null;

  private dic: any;

  constructor(lang: string | null) {
    this.lang = lang;
    this.dic = dictionaryData;
  }

  public t(key: string): string {
    // tslint:disable-line:function-name
    const val: any = this.v(key);

    return val[this.lang];
  }

  public v(key: string): any {
    // tslint:disable-line:function-name
    const keys: string[] = key.split('.');
    let val: any = this.dic;
    for (const valueKey of keys) {
      val = val[valueKey];
    }

    return val;
  }
}
