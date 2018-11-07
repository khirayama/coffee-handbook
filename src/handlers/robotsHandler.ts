import * as express from 'express';

import { config } from 'config';

export function robotsHandler(req: express.Request, res: express.Response): void {
  const lang: string = req.lang;

  const robotsContent: string = `User-agent: *
  Disallow: /*.gif$
  Disallow: /*.png$
  Disallow: /*.jpg$

  Sitemap: ${config.url[lang]}/sitemap.xml`;

  res.set('Content-Type', 'text/plain').send(robotsContent);
}
