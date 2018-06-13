const path = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const config = require('config');
const rss = require('utils/rss');
// Handlers
const homeHandler = require('handlers/home-handler');
const beveragesHandler = require('handlers/beverages-handler');
const beverageHandler = require('handlers/beverage-handler');
const foodsHandler = require('handlers/foods-handler');
const foodHandler = require('handlers/food-handler');
const goodsHandler = require('handlers/goods-handler');
const aboutUsHandler = require('handlers/about-us-handler');
const postHandler = require('handlers/post-handler');

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
  .use('/beverages', new express.Router().get('/', beveragesHandler).get('/:beverage/:type', beverageHandler))
  .use('/foods', new express.Router().get('/', foodsHandler).get('/:food', foodHandler))
  .use('/goods', new express.Router().get('/', goodsHandler))
  .get('/about-us', aboutUsHandler)
  .get('/posts/:id', postHandler)
  .get('/rss*', (req, res) => {
    res.set('Content-Type', 'text/xml').send(rss[req.lang]);
  });

// Server
app.listen(3030, () => {
  console.log(`Start app at ${new Date().toString()}.`);
});
