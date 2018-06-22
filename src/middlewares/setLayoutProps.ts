import * as express from 'express';

import { config } from 'config';

export function setLayoutProps(req: express.Request, res: express.Response, next: express.NextFunction): void {
  req.layout = {
    author: req.dic.t('author'),
    name: req.dic.t('name'),
    baseUrl: config.url,
    facebookAppId: config.facebookAppId,
    facebookPageUrl: config.facebookPageUrl,
    twitterCardType: config.twitterCardType,
    twitterAccount: config.twitterAccount,

    lang: req.lang,
    path: req.originalUrl,
  };
  next();
}
