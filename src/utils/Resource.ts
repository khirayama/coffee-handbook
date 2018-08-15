// tslint:disable:no-any
import * as Fuse from 'fuse.js';

export type TResource<IRawResource, IResource> = (lang: string) => Resource<IRawResource, IResource>;

/* Usecase
find, findOne, where, page, order
*/

function buildSearchKeys(obj: any): string[] {
  const keys: string[] = Object.keys(obj);
  const res: string[] = [];

  for (const key of keys) {
    if (Array.isArray(obj[key])) {
      const childRes: string[] = buildSearchKeys(obj[key][0]);
      for (const childKey of childRes) {
        res.push(`${key}.${childKey}`);
      }
    } else if (typeof obj[key] === 'object') {
      const childRes: string[] = buildSearchKeys(obj[key]);
      for (const childKey of childRes) {
        res.push(`${key}.${childKey}`);
      }
    } else {
      res.push(key);
    }
  }

  return res;
}

export class Resource<IRawResource, IResource> {
  private resources: IRawResource[];

  private lang: string;

  private tmp: IResource[];

  constructor(resources: IRawResource[], lang: string) {
    this.resources = resources;
    this.lang = lang;
    this.tmp = this.build(this.resources, this.lang);
  }

  public find(num?: number): IResource[] {
    const tmp: IResource[] = this.tmp.slice();
    this.tmp = this.build(this.resources, this.lang);

    return tmp.slice(tmp.length - num);
  }

  public findOne(): IResource {
    const tmp: IResource[] = this.tmp.slice();
    this.tmp = this.build(this.resources, this.lang);

    return tmp[0] || null;
  }

  public where(condition: { [key: string]: any }): Resource<IRawResource, IResource> {
    this.tmp = this.include(this.tmp, condition);

    if (condition.excepted) {
      this.tmp = this.except(this.tmp, condition.excepted);
    }

    return this;
  }

  public search(keyword: string, options?: { root?: string }): IResource[] {
    const fuseOptions: any = {
      shouldSort: true,
      includeScore: true,
      tokenize: true,
      threshold: 0.5,
      location: 0,
      distance: 100,
      keys:
        options && options.root
          ? buildSearchKeys(this.resources[0][options.root]).map((searchKey: string) => `${options.root}.${searchKey}`)
          : buildSearchKeys(this.resources[0]),
    };

    const fuse: Fuse = new Fuse(this.resources, fuseOptions);
    const result: IRawResource[] = fuse.search(keyword);

    return this.build(result.map((res: any) => res.item), this.lang);
  }

  private build(value: IRawResource[], lang: string): IResource[] {
    if (Array.isArray(value)) {
      const res: any[] = [];
      for (let i: number = 0; i < value.length; i += 1) {
        const val: any = value[i];
        res[i] = this.build(val, lang);
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
        return this.build(value[key], lang);
      }
      result[key] = this.build(value[key], lang);
    }

    return result;
  }

  private include(items: IResource[], condition: any): IResource[] {
    let result: IResource[] = items;
    const keys: string[] = Object.keys(condition);
    for (const key of keys) {
      const val: any = condition[key];
      if (key !== 'excepted') {
        result = result.filter(
          (item: IResource): boolean => {
            const target: any = item[key];
            if (Array.isArray(target)) {
              return !!this.include(target, val).length;
            } else if (typeof target === 'object') {
              return !!this.include([target], val).length;
            }

            return target === val;
          },
        );
      }
    }

    return result;
  }

  private except(items: IResource[], condition: any): IResource[] {
    let result: IResource[] = items;
    const keys: string[] = Object.keys(condition);
    for (const key of keys) {
      const val: any = condition[key];
      result = result.filter(
        (item: IResource): boolean => {
          const target: any = item[key];
          if (Array.isArray(target)) {
            return !this.except(target, val).length;
          }

          return target !== val;
        },
      );
    }

    return result;
  }
}
