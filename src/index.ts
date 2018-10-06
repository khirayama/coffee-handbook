import * as fs from 'fs';
import * as path from 'path';

import * as basicAuth from 'basic-auth-connect';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';
import * as logger from 'morgan';
import rotatingFileStream from 'rotating-file-stream';

// Middleware
import { setLang } from 'middlewares/setLang';
import { setLayoutProps } from 'middlewares/setLayoutProps';

// Handlers
import { aboutUsHandler } from 'handlers/aboutUsHandler';
import { beverageHandler } from 'handlers/beverageHandler';
import { beveragesHandler } from 'handlers/beveragesHandler';
import { foodHandler } from 'handlers/foodHandler';
import { foodsHandler } from 'handlers/foodsHandler';
import { goodHandler } from 'handlers/goodHandler';
import { goodsHandler } from 'handlers/goodsHandler';
import { homeHandler } from 'handlers/homeHandler';
import { manifestHandler } from 'handlers/manifestHandler';
import { mapsHandler } from 'handlers/mapsHandler';
import { postHandler } from 'handlers/postHandler';
import { privacyHandler } from 'handlers/privacyHandler';
import { robotsHandler } from 'handlers/robotsHandler';
import { rssHandler } from 'handlers/rssHandler';
import { sitemapHandler, sitemapXmlHandler } from 'handlers/sitemapHandler';

// API Handlers
import { storeAPIHandler } from 'handlers/storeAPIHandler';

// For AB Testing
import { experiments } from 'experiments';
import { HypothesisTesting } from 'utils/HypothesisTesting';

const hypothesisTesting: HypothesisTesting = new HypothesisTesting(experiments);
// const topPageSegment: string = req.hypothesisTesting.segment('top-page1', req.segId);

function preHandler(req: express.Request, res: express.Response, next: express.NextFunction): void {
  // For GA
  req.layout.route = req.route.path;

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
const logDirectory: string = path.join(__dirname, '..', './log');
fs.existsSync(logDirectory) || fs.mkdirSync(logDirectory);
// tslint:disable-next-line:no-any
const accessLogStream: any = rotatingFileStream('access.log', {
  interval: '1d',
  path: logDirectory,
});

// Middleware
const basedir: string = path.join(__dirname, 'presentations');
app.locals.basedir = basedir;
if (process.env.USER && process.env.PASSWORD) {
  app.use(basicAuth(process.env.USER, process.env.PASSWORD));
}
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('combined'));
}
app
  .set('views', basedir)
  .set('view engine', 'pug')
  .use(logger('combined', { stream: accessLogStream }))
  .use(compression({ level: 9 }))
  .use(express.static(path.join(__dirname, 'assets')))
  .use(express.static(path.join(__dirname, 'public')))
  .use(cookieParser())
  .use(setLang)
  .use(setLayoutProps);

// Routing
app
  .get('/', preHandler, homeHandler)
  .get('/maps', preHandler, mapsHandler)
  .get('/beverages', preHandler, beveragesHandler)
  .get('/beverages/:beverageKey/:recipeType', preHandler, beverageHandler)
  .get('/foods', preHandler, foodsHandler)
  .get('/foods/:foodKey', preHandler, foodHandler)
  .get('/goods', preHandler, goodsHandler)
  .get('/goods/:goodKey', preHandler, goodHandler)
  .get('/about-us', preHandler, aboutUsHandler)
  .get('/posts/:postKey', preHandler, postHandler)
  .get('/privacy', preHandler, privacyHandler)
  .get('/sitemap.xml', preHandler, sitemapXmlHandler)
  .get('/sitemap', preHandler, sitemapHandler)
  .get('/rss*', preHandler, rssHandler)
  .get('/robots.txt', preHandler, robotsHandler)
  .get('/manifest.json', preHandler, manifestHandler);

// API Routing
app.get('/api/v1/html/stores/:storeKey', preHandler, storeAPIHandler);

// Server
const APP_SERVER_PORT: number = Number(process.env.PORT || '3030');
app.listen(APP_SERVER_PORT, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
  // tslint:disable-next-line:no-console
  console.log(`Open the site at http://localhost:${APP_SERVER_PORT}`);
});
