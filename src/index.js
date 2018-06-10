const path = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const config = require('config');
const createPosts = require('resources/posts');
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
  const posts = createPosts(req.lang);
  const featuredPost = posts
    .where({
      categories: {
        id: 1,
      },
      tags: {
        id: 1,
      },
    })
    .findOne();
  const exceptedFeaturedPosts = posts
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

      res.render('pages/Beverages', {
        basedir,
        config,
        lang: req.lang,
        path: req.originalUrl,
        dic,
        title: 'BEVERAGES',
        description: 'test',
        thumbnailUrl: 'test',
        type: 'type',
      });
    })
    .use(
      '/coffee',
      new express.Router().get('/hot', (req, res) => {
        const dic = new Dictionary(req.lang);

        res.render('templates/Recipe', {
          basedir,
          config,
          lang: req.lang,
          path: req.originalUrl,
          dic,
          title: 'BEVERAGES',
          description: 'test',
          thumbnailUrl: 'test',
          type: 'type',

          recipe: {
            name: dic.t('Recipe.COFFEE'),
            type: dic.t('Recipe.HOT'),
            thumbnailUrl: {
              default: '/image_1@square.jpg',
              square: '/image_1@square.jpg',
              rectangle: '/image_1@rectangle.jpg',
            },
            steps: [
              {
                summary: '水をあれあれ',
                description: 'いろいろ細かく',
                note: 'ポイント',
              },
              {
                summary: '水をあれあれ',
                description: 'いろいろ細かく',
                note: 'ポイント',
              },
              {
                summary: '水をあれあれ',
                description: 'いろいろ細かく',
              },
              {
                summary: '水をあれあれ',
                description: 'いろいろ細かく',
                note: 'ポイント',
              },
            ],
          },
        });
      }),
    ),
);

app.get('/foods', (req, res) => {
  const dic = new Dictionary(req.lang);

  res.render('pages/Foods', {
    basedir,
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: 'FOODS',
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
});

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
  const posts = createPosts(req.lang);
  const dic = new Dictionary(req.lang);
  const post = posts.where({ id }).findOne();

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
