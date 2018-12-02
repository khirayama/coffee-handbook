import * as fs from 'fs';
import * as path from 'path';

import { IRawShop } from 'presentations/pages/Maps/interfaces';

export const shops: IRawShop[] = [];

const rootPath: string = path.resolve('dist', 'data', 'shops');
const fileNames: string[] = fs.readdirSync(rootPath);
for (const fileName of fileNames) {
  if (!fileName.endsWith('.map')) {
    import(`${rootPath}/${fileName}`).then((shop: IRawShop) => {
      const key: string = Object.keys(shop)[0];
      shops.push(shop[key]);
    });
  }
}
