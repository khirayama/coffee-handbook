// tslint:disable:no-console no-any
import * as fs from 'fs';

import * as imagemin from 'imagemin';
import * as imageminJpegtran from 'imagemin-jpegtran';
import * as imageminPngquant from 'imagemin-pngquant';
import * as imageminWebp from 'imagemin-webp';

const ROOT_DIR: string = './materials';
const DIST_DIR: string = './src/assets';

function isTarget(filePath: string): boolean {
  return (
    filePath.endsWith('.png') ||
    filePath.endsWith('.jpg') ||
    filePath.endsWith('.jpeg') ||
    filePath.endsWith('.webp') ||
    filePath.endsWith('svg')
  );
}

function compressImage(filePath: string): void {
  console.log(`Compressing ${filePath}`);

  const tmpDist: string[] = filePath.split('/');
  tmpDist.pop();

  const dist: string = tmpDist.join('/').replace(ROOT_DIR, DIST_DIR);

  imagemin([filePath], dist, {
    plugins: [
      imageminJpegtran({
        quality: '60-70',
        progressive: true,
      }),
    ],
  });
  imagemin([filePath], dist, {
    plugins: [
      imageminPngquant({
        quality: '60-70',
      }),
    ],
  });
  imagemin([filePath], dist, {
    plugins: [
      imageminWebp({
        quality: '60-70',
        lossless: true,
      }),
    ],
  });
}

function compressImages(rootPath: string): void {
  fs.readdir(rootPath, (err: Error, fileNames: string[]) => {
    if (err) {
      return;
    }

    for (const fileName of fileNames) {
      const filePath: string = `${rootPath}/${fileName}`;
      const stats: any = fs.statSync(filePath);
      if (stats.isDirectory()) {
        compressImages(filePath);
      } else if (isTarget(filePath)) {
        compressImage(filePath);
      }
    }
  });
}

compressImages(ROOT_DIR);
