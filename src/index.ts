import * as path from 'path';

import * as express from 'express';
import * as compression from 'compression';
import * as cookieParser from 'cookie-parser';

import { config } from 'config';
import { rss } from 'utils/rss';
// Handlers
import { homeHandler } from 'handlers/home-handler';
import { beveragesHandler } from 'handlers/beverages-handler';
import { beverageHandler } from 'handlers/beverage-handler';
import { foodsHandler } from 'handlers/foods-handler';
import { foodHandler } from 'handlers/food-handler';
import { goodsHandler } from 'handlers/goods-handler';
import { goodHandler } from 'handlers/good-handler';
import { aboutUsHandler } from 'handlers/about-us-handler';
import { postHandler } from 'handlers/post-handler';

const app = express();

// Set middleware
const basedir = path.join(__dirname, 'presentations');
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
app.use((req, res, next) => {
  let lang = req.query.lang || req.cookies.lang || config.languages[0];
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
  .get('/rss*', (req, res) => {
    res.set('Content-Type', 'text/xml').send(rss[req.lang]);
  });

// Server
app.listen(3030, () => {
  console.log(`Start app at ${new Date().toString()}.`);
});
