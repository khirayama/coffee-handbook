import * as fs from 'fs';
import * as path from 'path';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as useragent from 'express-useragent';
import * as logger from 'morgan';

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { config } from 'config';
import { experiments } from 'experiments';
import { aboutHandler } from 'handlers/aboutHandler';
import { manifestHandler } from 'handlers/manifestHandler';
import { mapsHandler } from 'handlers/mapsHandler';
import { privacyHandler } from 'handlers/privacyHandler';
import { robotsHandler } from 'handlers/robotsHandler';
import { sitemapHandler, sitemapXmlHandler } from 'handlers/sitemapHandler';
import { setLang } from 'middlewares/setLang';
import { HypothesisTesting } from 'utils/HypothesisTesting';

const hypothesisTesting: HypothesisTesting = new HypothesisTesting(experiments);
// const topPageSegment: string = req.hypothesisTesting.segment('top-page1', req.segId);

function preHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
  const linkHeader: string = Object.keys(config.url)
    .map(
      (key: string): string => {
        return `<${config.url[key]}>; rel="alternate"; hreflang="${key}"`;
      },
    )
    .join(',');
  res.append('Link', linkHeader);

  // For AB Testing
  const segId: string = req.cookies._seg_id || hypothesisTesting.getSegId();
  res.cookie('_seg_id', segId, {
    maxAge: 31536000,
    httpOnly: true,
  });
  req.segId = segId;
  req.hypothesisTesting = hypothesisTesting;

  next();
}

const app: express = express();

const basedir: string = path.join(__dirname, 'presentations');
app.locals.basedir = basedir;
app
  .set('views', basedir)
  .set('view engine', 'pug')
  .use(logger('combined'))
  .use(useragent.express())
  .use(compression({ level: 9 }))
  .use(express.static(path.join(__dirname, 'assets')))
  .use(express.static(path.join(__dirname, 'public')))
  .use(cookieParser())
  .use(setLang);

app
  .get('/', preHandler, mapsHandler)
  .get('/shops', preHandler, mapsHandler)
  .get('/shops/:key', preHandler, mapsHandler)
  .get('/about', preHandler, aboutHandler)
  .get('/privacy', preHandler, privacyHandler)
  .get('/sitemap.xml', preHandler, sitemapXmlHandler)
  .get('/sitemap', preHandler, sitemapHandler)
  .get('/robots.txt', preHandler, robotsHandler)
  .get('/manifest.json', preHandler, manifestHandler);

// Server
const APP_SERVER_PORT: number = Number(process.env.PORT || '3030');
app.listen(APP_SERVER_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
  // tslint:disable-next-line:no-console
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
});
