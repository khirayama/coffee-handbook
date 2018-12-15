// tslint:disable:no-any
import * as fs from 'fs';
import * as path from 'path';

import * as csvParse from 'csv-parse/lib/sync';

import { config } from 'config';
import { IRawShop } from 'presentations/pages/Maps/interfaces';
import { IDic } from 'utils/Dictionary';

interface ICSVRecord {
  [key: string]: string;
}

function findRecordsFromShopKey(shopKey: string, shopRelatedRecords: ICSVRecord[]): ICSVRecord[] {
  const records: ICSVRecord[] = [];

  for (const shopRelatedRecord of shopRelatedRecords) {
    if (shopKey === shopRelatedRecord.shop_key) {
      records.push(shopRelatedRecord);
    }
  }

  return records;
}

function buildDic(shopAttributeRecords: ICSVRecord[], key: string): IDic | null {
  const result: object = {};
  for (const lang of config.langs) {
    for (const shopAttributeRecord of shopAttributeRecords) {
      const val: string = shopAttributeRecord[key];
      if (shopAttributeRecord.lang === lang && val) {
        result[lang] = val;
      } else if (!result[lang] && shopAttributeRecord.locale === config.langs[0] && val) {
        result[lang] = val;
      }
    }
  }

  return Object.keys(result).length ? <IDic>result : null;
}

function buildOpenHours(shopOpenHourRecords: ICSVRecord[]): string[][][] {
  const openHours: string[][][] = [
    [], // 0: sun
    [], // 1: mon
    [], // 2: tue
    [], // 3: wed
    [], // 4: thu
    [], // 5: fri
    [], // 6: sat
  ];

  for (const sohr of shopOpenHourRecords) {
    openHours[sohr.day].push([sohr.start, sohr.end]);
  }

  return openHours;
}

function buildShops(
  shopRecords: ICSVRecord[],
  shopAttributeRecords: ICSVRecord[],
  shopOpenHourRecords: ICSVRecord[],
): IRawShop[] {
  const shops: IRawShop[] = [];

  for (const sr of shopRecords) {
    const targetShopAttributeRecords: ICSVRecord[] = findRecordsFromShopKey(sr.key, shopAttributeRecords);
    const targetShopOpenHourRecords: ICSVRecord[] = findRecordsFromShopKey(sr.key, shopOpenHourRecords);

    if (sr && sr.key) {
      shops.push({
        key: sr.key,
        lat: Number(sr.lat),
        lng: Number(sr.lng),
        email: sr.email || null,
        tel: sr.tel || null,
        permanentClosed: sr.permanent_closed === 'TRUE',
        transforTo: sr.transfer_to || null,
        name: buildDic(targetShopAttributeRecords, 'name'),
        address: buildDic(targetShopAttributeRecords, 'address'),
        hours: buildOpenHours(targetShopOpenHourRecords),
        hoursNote: buildDic(targetShopAttributeRecords, 'hours_note'),
        media: {
          web: sr.web,
          ec: sr.ec,
          facebook: sr.facebook,
          twitter: sr.twitter,
          instagram: sr.instagram,
          instagramTag: sr.instagram_tag,
          googleMaps: sr.google_maps,
        },
        services: {
          roaster: Number(sr.has_roaster),
          speciality: Number(sr.has_speciality),
          beans: Number(sr.has_beans),
          credit: Number(sr.has_credit),
          power: Number(sr.has_power),
          wifi: Number(sr.has_wifi),
          barrierFree: Number(sr.has_barrier_free),
          pet: Number(sr.has_pet),
          smoking: Number(sr.has_smoking),
        },
      });
    }
  }

  return shops;
}

export function loadShops(): IRawShop[] {
  const rootPath: string = path.join(__dirname);

  const shopsRawData: string = fs.readFileSync(path.resolve(rootPath, 'shops.csv'), 'utf8');
  const shopRecords: ICSVRecord[] = csvParse(shopsRawData, {
    columns: true,
    skip_empty_lines: true,
  });

  const shopAttributesRawData: string = fs.readFileSync(path.resolve(rootPath, 'shop_attributes.csv'), 'utf8');
  const shopAttributeRecords: ICSVRecord[] = csvParse(shopAttributesRawData, {
    columns: true,
    skip_empty_lines: true,
  });

  const shopOpenHoursRawData: string = fs.readFileSync(path.resolve(rootPath, 'shop_open_hours.csv'), 'utf8');
  const shopOpenHourRecords: ICSVRecord[] = csvParse(shopOpenHoursRawData, {
    columns: true,
    skip_empty_lines: true,
  });

  return buildShops(shopRecords, shopAttributeRecords, shopOpenHourRecords);
}
