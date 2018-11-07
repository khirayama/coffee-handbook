// tslint:disable:no-console no-any cyclomatic-complexity max-func-body-length
import * as fs from 'fs';
import * as path from 'path';

import * as co from 'co';
import * as cp from 'co-prompt';
import * as puppeteer from 'puppeteer';

function isUpperCase(char: string | undefined): boolean {
  if (typeof char === 'string') {
    return !!char.match(/^[A-Z]+$/);
  }

  return false;
}

function transformHyphenationEnglishName(enName: string): string {
  const hyphenationEnglishName: string[] = [];
  const normalizeEnglishName: string = enName.replace(/ {2}/g, ' ').replace(/ /g, '-');

  for (let i: number = 0; i < normalizeEnglishName.length; i += 1) {
    const char: string = normalizeEnglishName[i];
    if (char) {
      if (isUpperCase(char) && i !== 0 && normalizeEnglishName[i - 1] !== '-') {
        hyphenationEnglishName.push('-');
        hyphenationEnglishName.push(char.toLowerCase());
      } else {
        hyphenationEnglishName.push(char.toLowerCase());
      }
    }
  }

  return hyphenationEnglishName.join('');
}

function transformFileName(key: string): string {
  const fileName: string[] = [];
  const splittedKey: string[] = key.split('-');

  for (let i: number = 0; i < splittedKey.length; i += 1) {
    const splittedKeyWord: string = splittedKey[i];

    if (i === 0) {
      fileName.push(splittedKeyWord);
    } else {
      fileName.push(splittedKeyWord.charAt(0).toUpperCase() + splittedKeyWord.slice(1));
    }
  }

  return fileName.join('');
}

async function getPosition(jaAddress: string): Promise<{ lat: number; lng: number }> {
  const browser: any = await puppeteer.launch();
  const page: any = await browser.newPage();
  // FYI: It might help you if you want to translate Chinese.
  // http://fanyi.youdao.com/
  await page.goto(`https://www.geocoding.jp/?q=${jaAddress}`);

  try {
    return page.evaluate(() => {
      const latEl: HTMLElement = window.document.querySelector('body > span:nth-child(3) > b:nth-child(1)');
      const lngEl: HTMLElement = window.document.querySelector('body > span:nth-child(3) > b:nth-child(2)');
      if (latEl && lngEl) {
        return {
          lat: Number(latEl.innerText),
          lng: Number(lngEl.innerText),
        };
      }
    });
  } catch (err) {
    return {
      lat: 0,
      lng: 0,
    };
  }
}

async function transformEnglishAddress(jaAddress: string): Promise<string> {
  const browser: any = await puppeteer.launch();
  const page: any = await browser.newPage();
  await page.goto('https://jushotr.j-server.com/addrtrans/address.cgi');
  await page.waitFor('#src');
  const elementHandle: any = await page.$('#src');
  await page.evaluate((japaneseAddress: string) => {
    const inputEl: HTMLInputElement = window.document.querySelector('#src');
    inputEl.value = japaneseAddress;
  }, jaAddress);
  await elementHandle.press('Enter');
  await page.waitFor('#copyTarget01');

  const enAddress: string = await page.evaluate(() => {
    const enNameInputEl: HTMLInputElement = window.document.querySelector('#copyTarget01');

    return Promise.resolve(enNameInputEl.value);
  });
  await browser.close();

  return enAddress;
}

function template(options: any): string {
  return `// tslint:disable:no-http-string
import { IRawStore } from 'presentations/pages/Maps/interfaces';

export const ${options.fileName}: IRawStore = {
  key: '${options.key}',
  lat: ${options.lat},
  lng: ${options.lng},
  name: {
    ja: '${options.jaName}',
    en: '${options.enName}',
  },
  address: {
    ja: '${options.jaAddress}',
    en: '${options.enAddress}',
  },
  hours: ${JSON.stringify(options.hours)},
  hoursNote: ${
    options.jaHoursNote && options.enHoursNote
      ? `{
      ja: "${options.jaHoursNote}",
      en: "${options.enHoursNote}"
    }`
      : null
  },
  email: ${options.email ? `"${options.email}"` : null},
  tel: ${options.tel ? `"${options.tel}"` : null},
  permanentClosed: false,
  transforTo: null,
  media: {
    web: ${options.web ? `"${options.web}"` : null},
    ec: ${options.ec ? `"${options.ec}"` : null},
    facebook: ${options.facebook ? `"${options.facebook}"` : null},
    twitter: ${options.twitter ? `"${options.twitter}"` : null},
    instagram: ${options.instagram ? `"${options.instagram}"` : null},
    instagramTag: ${options.instagramTag ? `"${options.instagramTag}"` : null},
    googleMaps: ${options.googleMaps ? `"${options.googleMaps}"` : null},
  },
  services: {
    roaster: ${options.roaster},
    speciality: ${options.speciality},
    beans: ${options.beans},
    credit: ${options.credit},
    power: ${options.power},
    wifi: ${options.wifi},
    barrierFree: ${options.barrierFree},
    pet: ${options.pet},
    smoking: ${options.smoking},
  },
};`;
}

co(function*(): any {
  console.log('These site might help you.');
  console.log('https://tabelog.com/');
  console.log('https://r.gnavi.co.jp/');
  console.log('https://retty.me/');
  console.log('https://hitosara.com/');
  console.log('https://goodcoffee.me/');

  const jaName: string = yield cp('Japanese Name: ');
  const enName: string = yield cp('English Name: ');
  const hyphenationEnglishName: string = transformHyphenationEnglishName(enName);
  let key: string = yield cp(`key or id(default ${hyphenationEnglishName}): `);
  if (!key) {
    key = hyphenationEnglishName;
  }
  const fileName: string = transformFileName(key);
  const jaAddress: string = yield cp('Japanese Address: ');
  const transformedEnglishAddress: string = yield transformEnglishAddress(jaAddress);
  let enAddress: string = yield cp(`English Address(default ${transformedEnglishAddress}): `);
  if (!enAddress) {
    enAddress = transformedEnglishAddress;
  }
  const { lat, lng } = yield getPosition(jaAddress);
  const hoursString: string = yield cp('Basic open time(like 11:00 18:00): ');
  const hours: string[][][] = [];
  for (let i: number = 0; i < 7; i += 1) {
    hours.push([hoursString.trim().split(' ')]);
  }
  console.log('Please update directory if you need.');

  const jaHoursNote: string | null = yield cp('Hours Note in Japanese: ');
  const enHoursNote: string | null = yield cp('Hours Note in English: ');

  // medias
  let email: string | null = yield cp('E-Mail: ');
  if (!email) {
    email = null;
  }
  let tel: string | null = yield cp('Tel: ');
  if (!tel) {
    tel = null;
  }
  let web: string | null = yield cp('Web Site URL: ');
  if (!web) {
    web = null;
  }
  let ec: string | null = yield cp('EC Site URL: ');
  if (!ec) {
    ec = null;
  }
  let facebook: string | null = yield cp('Facebook Page URL: ');
  if (!facebook) {
    facebook = null;
  }
  let twitter: string | null = yield cp('Twitter Account URL: ');
  if (!twitter) {
    twitter = null;
  }
  let instagram: string | null = yield cp('Instagram Account URL: ');
  if (!instagram) {
    instagram = null;
  }
  let instagramTag: string | null = yield cp('Instagram Hash Tag URL: ');
  if (!instagramTag) {
    instagramTag = null;
  }
  let googleMaps: string | null = yield cp('Google Maps URL: ');
  if (!googleMaps) {
    googleMaps = null;
  }

  // services
  const answerOptions: string = '(0: No, 1: Yes, 2: Partial)';
  let roaster: string | number | null = yield cp(`Does the store have a roaster? ${answerOptions}: `);
  if (!roaster) {
    roaster = null;
  } else {
    roaster = Number(roaster);
  }
  let speciality: string | number | null = yield cp(`Does the store provide speciality coffee? ${answerOptions}: `);
  if (!speciality) {
    speciality = null;
  } else {
    speciality = Number(speciality);
  }
  let beans: string | number | null = yield cp(`Does the store sell coffee beans? ${answerOptions}: `);
  if (!beans) {
    beans = null;
  } else {
    beans = Number(beans);
  }
  let credit: string | number | null = yield cp(`Can customers use credit cards? ${answerOptions}: `);
  if (!credit) {
    credit = null;
  } else {
    credit = Number(credit);
  }
  let power: string | number | null = yield cp(`Does the store have powers? ${answerOptions}: `);
  if (!power) {
    power = null;
  } else {
    power = Number(power);
  }
  let wifi: string | number | null = yield cp(`Does the store have Wi-Fi? ${answerOptions}: `);
  if (!wifi) {
    wifi = null;
  } else {
    wifi = Number(wifi);
  }
  let barrierFree: string | number | null = yield cp(`Are the store's facilities barrier free? ${answerOptions}: `);
  if (!barrierFree) {
    barrierFree = null;
  } else {
    barrierFree = Number(barrierFree);
  }
  let pet: string | number | null = yield cp(`Can customers go the store with customers' pet? ${answerOptions}: `);
  if (!pet) {
    pet = null;
  } else {
    pet = Number(pet);
  }
  let smoking: string | number | null = yield cp(`Can customers smoke? ${answerOptions}: `);
  if (!smoking) {
    smoking = null;
  } else {
    smoking = Number(smoking);
  }

  const options: any = {
    fileName,
    key,
    lat,
    lng,
    jaName,
    enName,
    jaAddress,
    enAddress,
    hours,
    jaHoursNote,
    enHoursNote,
    email,
    tel,
    web,
    ec,
    facebook,
    twitter,
    instagram,
    instagramTag,
    googleMaps,
    roaster,
    speciality,
    beans,
    credit,
    power,
    wifi,
    barrierFree,
    pet,
    smoking,
  };

  fs.writeFileSync(path.join('src', 'data', 'stores', `${options.fileName}.ts`), template(options));
  process.exit();
});
