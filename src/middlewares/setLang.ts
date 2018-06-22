import * as express from 'express';

import { config } from 'config';
import { Dictionary } from 'utils/Dictionary';

export function setLang(req: express.Request, res: express.Response, next: express.NextFunction): void {
  let lang: string = req.query.lang || req.cookies.lang || config.languages[0];
  if (config.languages.indexOf(lang) === -1) {
    lang = config.languages[0];
  }
  res.cookie('lang', lang, {
    maxAge: 60000,
    httpOnly: false,
  });
  req.lang = lang;
  req.dic = new Dictionary(req.lang);
  next();
}
