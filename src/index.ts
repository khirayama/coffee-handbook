import * as path from 'path';

import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';
import * as express from 'express';

import { config } from 'config';
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

const app: express = express();

// Middleware
const basedir: string = path.join(__dirname, 'presentations');
app.locals.basedir = basedir;
app.set('views', basedir);
app.set('view engine', 'pug');
app.use(compression({ level: 9 }));
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(setLang);

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
  .get('/posts/:id', postHandler)
  .get('/rss*', rssHandler);

// Server
app.listen(3030, () => {
  // tslint:disable-next-line:no-console
  console.log(`Start app at ${new Date().toString()}.`);
});
