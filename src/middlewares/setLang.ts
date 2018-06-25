import * as express from 'express';

import { config } from 'config';
import { Dictionary } from 'utils/Dictionary';

export function setLang(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const langs: string[] = req.headers['accept-language']
    .split(';')
    .map(
      (local: string): string => {
        for (const language of config.languages) {
          if (local.indexOf(language) !== -1) {
            return language;
          }
        }

        return null;
      },
    )
    .filter((language: string) => !!language);
  let lang: string = req.query.lang || req.cookies._lang || langs[0] || config.languages[0];
  if (config.languages.indexOf(lang) === -1) {
    lang = config.languages[0];
  }
  res.cookie('_lang', lang, {
    maxAge: 31536000,
    httpOnly: false,
  });
  req.lang = lang;
  req.dic = new Dictionary(req.lang);
  next();
}
