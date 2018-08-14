import * as express from 'express';

import { config } from 'config';

const robotsContent: string = `User-agent: *
Disallow: /*.gif$
Disallow: /*.png$
Disallow: /*.jpg$

Sitemap: ${config.url}/sitemap.xml`;

export function robotsHandler(req: express.Request, res: express.Response): void {
  res.set('Content-Type', 'text/plain').send(robotsContent);
}
