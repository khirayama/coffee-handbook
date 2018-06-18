export type TResource<IRawResource, IResource> = (lang: string) => Resource<IRawResource, IResource>;

function build(value: any, lang: string): any {
  if (Array.isArray(value)) {
    const res: any[] = [];
    for (let i: number = 0; i < value.length; i += 1) {
      const val: any = value[i];
      res[i] = build(val, lang);
    }

    return res;
  }

  if (typeof value === 'boolean' || typeof value === 'string' || typeof value === 'number' || value === null) {
    return value;
  }

  const result: any = {};
  const keys: string[] = Object.keys(value);
  for (const key of keys) {
    if (key === lang) {
      return build(value[key], lang);
    }
    result[key] = build(value[key], lang);
  }

  return result;
}

/* Usecase
find, findOne, where, page, order
*/

export class Resource<IRawResource, IResource> {
  private resources: IRawResource[];

  private lang: string;

  private tmp: IResource[];

  constructor(resources: IRawResource[], lang: string) {
    this.resources = resources;
    this.lang = lang;
    this.tmp = build(this.resources, this.lang);
  }

  public find(num?: number): IResource[] {
    const tmp: IResource[] = this.tmp.slice();
    this.tmp = build(this.resources, this.lang);

    return tmp.slice(tmp.length - num);
  }

  public findOne(): IResource {
    const tmp: IResource[] = this.tmp.slice();
    this.tmp = build(this.resources, this.lang);

    return tmp[0];
  }

  public where(condition: { [key: string]: any }): Resource<IRawResource, IResource> {
    this.tmp = this.include(this.tmp, condition);

    if (condition.excepted) {
      this.tmp = this.except(this.tmp, condition.excepted);
    }

    return this;
  }

  private include(items: any[], condition: any): any {
    let result: any[] = items;
    const keys: string[] = Object.keys(condition);
    for (const key of keys) {
      const val: any = condition[key];
      if (key !== 'excepted') {
        result = result.filter((item: any) => {
          const target: any = item[key];
          if (Array.isArray(target)) {
            return this.include(target, val).length;
          }

          return target === val;
        });
      }
    }

    return result;
  }

  private except(items: any[], condition: any): any {
    let result: any[] = items;
    const keys: string[] = Object.keys(condition);
    for (const key of keys) {
      const val: any = condition[key];
      result = result.filter((item: any) => {
        const target: any = item[key];
        if (Array.isArray(target)) {
          return !this.except(target, val).length;
        }

        return target !== val;
      });
    }

    return result;
  }
}
