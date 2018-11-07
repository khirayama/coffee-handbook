import * as express from 'express';

import { config } from 'config';
import { dictionary } from 'dictionary';
import { Dictionary } from 'utils/Dictionary';

export function setLang(req: express.Request, res: express.Response, next: express.NextFunction): void {
  req.lang = req.subdomains[0] || 'en';
  req.dic = new Dictionary(req.lang, dictionary);
  next();
}
