import * as express from 'express';

import { rss } from 'utils/rss';

export function rssHandler(req: express.Request, res: express.Response): void {
  res.set('Content-Type', 'text/xml').send(rss[req.lang]);
}
