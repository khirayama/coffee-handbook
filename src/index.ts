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
import { postHandler } from 'handlers/postHandler';
import { rssHandler } from 'handlers/rssHandler';
import { setLang } from 'middlewares/setLang';
import { setLayoutProps } from 'middlewares/setLayoutProps';

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
  .get('/', homeHandler)
  .get('/beverages', beveragesHandler)
  .get('/beverages/:beverageKey/:recipeType', beverageHandler)
  .get('/foods', foodsHandler)
  .get('/foods/:foodKey', foodHandler)
  .get('/goods', goodsHandler)
  .get('/goods/:goodKey', goodHandler)
  .get('/about-us', aboutUsHandler)
  .get('/posts/:postKey', postHandler)
  .get('/rss*', rssHandler);

// Server
app.listen(3030, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
});
