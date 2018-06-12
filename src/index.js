const path = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const config = require('config');
const Post = require('resources/Post');
const Recipe = require('resources/Recipe');
const Beverage = require('resources/Beverage');
const Food = require('resources/Food');
const Dictionary = require('utils/Dictionary');
const rss = require('utils/rss');

const app = express();

const basedir = path.join(__dirname, 'presentations');

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

app.get('/', (req, res) => {
  const dic = new Dictionary(req.lang);
  const featuredPost = Post(req.lang)
    .where({
      categories: {
        id: 1,
      },
      tags: {
        id: 1,
      },
    })
    .findOne();
  const exceptedFeaturedPosts = Post(req.lang)
    .where({
      categories: {
        id: 1,
      },
      excepted: {
        id: featuredPost.id,
      },
    })
    .find();

  res.render('pages/Home', {
    basedir,
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: 'home',
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',

    featuredPost,
    posts: exceptedFeaturedPosts,
  });
});

app.use(
  '/beverages',
  new express.Router()
    .get('/', (req, res) => {
      const dic = new Dictionary(req.lang);
      const beverages = Beverage(req.lang).find();

      res.render('templates/Menu', {
        basedir,
        config,
        lang: req.lang,
        path: req.originalUrl,
        dic,
        title: `${dic.t('Beverages.BEVERAGES')} | ${config.name}`,
        description: 'test',
        thumbnailUrl: 'test',
        type: 'type',

        heading: dic.t('Beverages.BEVERAGES'),
        items: beverages,
      });
    })
    .get('/:beverage/:type', (req, res) => {
      const dic = new Dictionary(req.lang);
      const recipe = Recipe(req.lang)
        .where({
          key: `${req.params.beverage}-${req.params.type}`,
        })
        .findOne();

      res.render('templates/Recipe', {
        basedir,
        config,
        lang: req.lang,
        path: req.originalUrl,
        dic,
        title: `${recipe.title} | ${config.name}`,
        description: recipe.description,
        thumbnailUrl: recipe.thumbnailUrl.rectangle,
        type: '',

        recipe,
      });
    }),
);

app.use(
  '/foods',
  new express.Router()
    .get('/', (req, res) => {
      const dic = new Dictionary(req.lang);
      const foods = Food(req.lang).find();

      res.render('templates/Menu', {
        basedir,
        config,
        lang: req.lang,
        path: req.originalUrl,
        dic,
        title: `${dic.t('Foods.FOODS')} | ${config.name}`,
        description: 'test',
        thumbnailUrl: 'test',
        type: 'type',

        heading: dic.t('Foods.FOODS'),
        items: foods,
      });
    })
    .get('/:food', (req, res) => {
      const dic = new Dictionary(req.lang);
      const recipe = Recipe(req.lang)
        .where({
          key: req.params.food,
        })
        .findOne();

      res.render('templates/Recipe', {
        basedir,
        config,
        lang: req.lang,
        path: req.originalUrl,
        dic,
        title: `${recipe.title} | ${config.name}`,
        description: recipe.description,
        thumbnailUrl: recipe.thumbnailUrl.rectangle,
        type: '',

        recipe,
      });
    }),
);

app.get('/goods', (req, res) => {
  const dic = new Dictionary(req.lang);

  res.render('pages/Goods', {
    basedir,
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: 'GOODS',
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
});

app.get('/about-us', (req, res) => {
  const dic = new Dictionary(req.lang);

  res.render('pages/AboutUs', {
    basedir,
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: 'ABOUT US',
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
});

app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const dic = new Dictionary(req.lang);
  const post = Post(req.lang)
    .where({ id })
    .findOne();

  res.render('pages/Post', {
    basedir,
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: post.title,
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',

    post,
  });
});

app.get('/rss*', (req, res) => {
  res.set('Content-Type', 'text/xml').send(rss[req.lang]);
});

app.listen(3030, () => {
  console.log(`Start app at ${new Date().toString()}.`);
});
