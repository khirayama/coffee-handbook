import * as fs from 'fs';
import * as path from 'path';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';

import * as React from 'react';
import { renderToString } from 'react-dom/server';

import { experiments } from 'experiments';
import { aboutHandler } from 'handlers/aboutHandler';
import { manifestHandler } from 'handlers/manifestHandler';
import { mapsHandler } from 'handlers/mapsHandler';
import { privacyHandler } from 'handlers/privacyHandler';
import { robotsHandler } from 'handlers/robotsHandler';
import { sitemapHandler, sitemapXmlHandler } from 'handlers/sitemapHandler';
import { setLang } from 'middlewares/setLang';
import { setLayoutProps } from 'middlewares/setLayoutProps';
import { HypothesisTesting } from 'utils/HypothesisTesting';

const hypothesisTesting: HypothesisTesting = new HypothesisTesting(experiments);
// const topPageSegment: string = req.hypothesisTesting.segment('top-page1', req.segId);

function preHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
  // For GA
  const key: string = req.query.key;
  if (key) {
    req.layout.route = `${req.route.path}?key=${key}`;
  } else {
    req.layout.route = req.route.path;
  }

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
  .use(compression({ level: 9 }))
  .use(express.static(path.join(__dirname, 'assets')))
  .use(express.static(path.join(__dirname, 'public')))
  .use(cookieParser())
  .use(setLang)
  .use(setLayoutProps);

app
  .get('/', preHandler, mapsHandler)
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
