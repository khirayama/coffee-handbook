// tslint:disable:cyclomatic-complexity
import * as fs from 'fs';
import * as path from 'path';

import { IRawShop } from 'presentations/pages/Maps/interfaces';

const shops: IRawShop[] = [];

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

setTimeout(() => {
  const shopsRecords: string[] = [];
  shops.forEach((s: IRawShop) => {
    shopsRecords.push(
      [
        s.key,
        s.lat,
        s.lng,
        s.email || '',
        s.tel || '',
        s.permanentClosed || '',
        s.transforTo || '',
        s.media.web || '',
        s.media.ec || '',
        s.media.facebook || '',
        s.media.twitter || '',
        s.media.instagram || '',
        s.media.instagramTag || '',
        s.media.googleMaps || '',
        s.services.roaster || '',
        s.services.speciality || '',
        s.services.beans || '',
        s.services.credit || '',
        s.services.power || '',
        s.services.wifi || '',
        s.services.barrierFree || '',
        s.services.pet || '',
        s.services.smoking || '',
      ].join(','),
    );
  });

  const shopAttributesRecords: string[] = [];
  shops.forEach((s: IRawShop) => {
    shopAttributesRecords.push(
      [s.key, 'ja_JP', s.name.ja, `"${s.address.ja}"`, s.hoursNote ? s.hoursNote.ja : ''].join(','),
    );
    shopAttributesRecords.push(
      [s.key, 'en_US', s.name.en, `"${s.address.en}"`, s.hoursNote ? s.hoursNote.en : ''].join(','),
    );
    shopAttributesRecords.push(
      [s.key, 'en_UK', s.name.en, `"${s.address.en}"`, s.hoursNote ? s.hoursNote.en : ''].join(','),
    );
  });

  const shopOpenHoursRecords: string[] = [];
  shops.forEach((s: IRawShop) => {
    for (let i: number = 0; i < s.hours.length; i += 1) {
      for (const hours of s.hours[i]) {
        shopOpenHoursRecords.push([s.key, String(i), hours[0], hours[1]].join(','));
      }
    }
  });

  console.log('shops');
  console.log(shopsRecords.join('\n'));
  console.log('shopAttributes');
  console.log(shopAttributesRecords.join('\n'));
  console.log('shopOpenHours');
  console.log(shopOpenHoursRecords.join('\n'));

  fs.writeFileSync('shops.csv', shopsRecords.join(`\n`));
  fs.writeFileSync('shop_attributes.csv', shopAttributesRecords.join(`\n`));
  fs.writeFileSync('shop_open_hours.csv', shopOpenHoursRecords.join(`\n`));
}, 1000);
