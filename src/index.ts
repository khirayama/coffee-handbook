import * as path from 'path';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

import { aboutUsHandler } from 'handlers/aboutUsHandler';
import { beverageHandler } from 'handlers/beverageHandler';
import { beveragesHandler } from 'handlers/beveragesHandler';
import { foodHandler } from 'handlers/foodHandler';
import { foodsHandler } from 'handlers/foodsHandler';
import { goodHandler } from 'handlers/goodHandler';
import { goodsHandler } from 'handlers/goodsHandler';
import { homeHandler } from 'handlers/homeHandler';
import { manifestHandler } from 'handlers/manifestHandler';
import { postHandler } from 'handlers/postHandler';
import { rssHandler } from 'handlers/rssHandler';
import { setLang } from 'middlewares/setLang';
import { setLayoutProps } from 'middlewares/setLayoutProps';

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

// Middleware
const basedir: string = path.join(__dirname, 'presentations');
app.locals.basedir = basedir;
app
  .set('views', basedir)
  .set('view engine', 'pug')
  .use(compression({ level: 9 }))
  .use(express.static(path.join(__dirname, 'assets')))
  .use(express.static(path.join(__dirname, 'public')))
  .use(cookieParser())
  .use(setLang)
  .use(setLayoutProps);

// Routing
app
  .get('/', preHandler, homeHandler)
  .get('/beverages', preHandler, beveragesHandler)
  .get('/beverages/:beverageKey/:recipeType', preHandler, beverageHandler)
  .get('/foods', preHandler, foodsHandler)
  .get('/foods/:foodKey', preHandler, foodHandler)
  .get('/goods', preHandler, goodsHandler)
  .get('/goods/:goodKey', preHandler, goodHandler)
  .get('/about-us', preHandler, aboutUsHandler)
  .get('/posts/:postKey', preHandler, postHandler)
  .get('/rss*', preHandler, rssHandler)
  .get('/manifest.json', preHandler, manifestHandler);

// Server
app.listen(3030, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
});
