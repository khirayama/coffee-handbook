import * as fs from 'fs';
import * as path from 'path';

import { IRawStore } from 'presentations/pages/Maps/interfaces';

export const stores: IRawStore[] = [];

const rootPath: string = path.resolve('dist', 'data', 'stores');
const fileNames: string[] = fs.readdirSync(rootPath);
for (const fileName of fileNames) {
  if (!fileName.endsWith('.map')) {
    import(`${rootPath}/${fileName}`).then((store: IRawStore) => {
      const key: string = Object.keys(store)[0];
      stores.push(store[key]);
    });
  }
}