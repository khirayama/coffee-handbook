import { dictionary as dictionaryData } from 'dictionary';

export class Dictionary {
  private lang: string | null;

  private dic: any;

  constructor(lang) {
    this.lang = lang;
    this.dic = dictionaryData;
  }

  public t(key) {
    const val = this.v(key);
    return val[this.lang];
  }

  public v(key) {
    const keys = key.split('.');
    let val = this.dic;
    for (let i = 0; i < keys.length; i++) {
      val = val[keys[i]];
    }
    return val;
  }
}
