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
import { rss } from 'utils/rss';

const app: express = express();

// Set middleware
const basedir: string = path.join(__dirname, 'presentations');
app.locals.basedir = basedir;
app.set('views', basedir);
app.set('view engine', 'pug');
app.use(
  compression({
    level: 9,
  }),
);
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use((req: any, res: any, next: any) => {
  let lang: string = req.query.lang || req.cookies.lang || config.languages[0];
  if (config.languages.indexOf(lang) === -1) {
    lang = config.languages[0];
  }
  res.cookie('lang', lang, { maxAge: 60000, httpOnly: false });
  req.lang = lang;
  next();
});

// Routing
app
  .get('/', homeHandler)
  .use('/beverages', new express.Router().get('/', beveragesHandler).get('/:beverageKey/:type', beverageHandler))
  .use('/foods', new express.Router().get('/', foodsHandler).get('/:foodKey', foodHandler))
  .use('/goods', new express.Router().get('/', goodsHandler).get('/:goodKey', goodHandler))
  .get('/about-us', aboutUsHandler)
  .get('/posts/:id', postHandler)
  .get('/rss*', (req: any, res: any) => {
    res.set('Content-Type', 'text/xml').send(rss[req.lang]);
  });

// Server
app.listen(3030, () => {
  console.log(`Start app at ${new Date().toString()}.`); // tslint:disable-line:no-console
});
