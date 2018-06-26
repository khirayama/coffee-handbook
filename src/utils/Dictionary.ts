// tslint:disable:no-any

export class Dictionary {
  private lang: string | null;

  private dic: any;

  constructor(lang: string | null, dic: any) {
    this.lang = lang;
    this.dic = dic;
  }

  // tslint:disable-next-line:function-name
  public v(key: string): any {
    const keys: string[] = key.split('.');
    let val: any = this.dic;
    for (const valueKey of keys) {
      val = val[valueKey];
    }

    return val;
  }

  // tslint:disable-next-line:function-name
  public t(key: string): string {
    const val: any = this.v(key);

    return val[this.lang];
  }
}
