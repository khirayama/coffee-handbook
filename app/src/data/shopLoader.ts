// tslint:disable:no-any
import * as csvParse from 'csv-parse/lib/sync';
import * as got from 'got';

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
      } else if (!result[lang] && shopAttributeRecord.lang === config.langs[0] && val) {
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

export const shopLoader: {
  cache: IRawShop[] | null;
  getShops(): IRawShop[];
  initialize(): Promise<IRawShop[]>;
} = {
  cache: null,
  getShops: (): IRawShop[] => {
    if (shopLoader.cache === null) {
      // tslint:disable-next-line:no-console
      console.trace('Please call shopLoader.initialize first.');

      return;
    }

    return shopLoader.cache;
  },
  initialize: (): Promise<IRawShop[]> => {
    // FYI: google spread sheetでcsvのexport urlを出力する
    // https://qiita.com/reikubonaga/items/8a6322efd353e08d5243
    const SHEET_ID: string = process.env.GOOGLE_SPREADSHEET_SHEET_ID;
    const SHOPS_PAGE_ID: string = process.env.GOOGLE_SPREADSHEET_SHOPS_PAGE_ID;
    const SHOP_ATTRIBUTES_PAGE_ID: string = process.env.GOOGLE_SPREADSHEET_SHOP_ATTRIBUTES_PAGE_ID;
    const SHOP_OPEN_HOURS_PAGE_ID: string = process.env.GOOGLE_SPREADSHEET_SHOP_OPEN_HOURS_PAGE_ID;

    const req: any = got.extend({ baseUrl: `https://docs.google.com/spreadsheets/d/${SHEET_ID}` });

    return Promise.all([
      req.get(`/export?format=csv&gid=${SHOPS_PAGE_ID}`),
      req.get(`/export?format=csv&gid=${SHOP_ATTRIBUTES_PAGE_ID}`),
      req.get(`/export?format=csv&gid=${SHOP_OPEN_HOURS_PAGE_ID}`),
    ]).then((res: any) => {
      const shopsRawData: string = res[0].body;
      const shopRecords: ICSVRecord[] = csvParse(shopsRawData, {
        columns: true,
        skip_empty_lines: true,
      });

      const shopAttributesRawData: string = res[1].body;
      const shopAttributeRecords: ICSVRecord[] = csvParse(shopAttributesRawData, {
        columns: true,
        skip_empty_lines: true,
      });

      const shopOpenHoursRawData: string = res[2].body;
      const shopOpenHourRecords: ICSVRecord[] = csvParse(shopOpenHoursRawData, {
        columns: true,
        skip_empty_lines: true,
      });

      shopLoader.cache = buildShops(shopRecords, shopAttributeRecords, shopOpenHourRecords);

      return shopLoader.cache;
    });
  },
};
