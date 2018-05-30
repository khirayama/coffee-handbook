const path = require('path');
const express = require('express');
const compression = require('compression');
const cookieParser = require('cookie-parser');

const config = require(path.join(__dirname, '..', 'config.json'));
const Posts = require('./utils/posts');
const Dictionary = require('./utils/dictionary');

const app = express();

const basedir = path.join(__dirname, 'templates');

app.set('views', basedir);
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser());
app.use(
  compression({
    level: 9,
  }),
);
app.use((req, res, next) => {
  const lang = req.query.lang || req.cookies.lang || config.languages[0];
  res.cookie('lang', lang, { maxAge: 60000, httpOnly: false });
  req.lang = lang;
  next();
});

app.get('/', (req, res) => {
  const dic = new Dictionary(req.lang);
  const posts = new Posts(req.lang);
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

  res.render('pages/home', {
    basedir,
    lang: req.lang,
    path: req.path,
    dic,
    title: dic.t('navigation.HOME'),
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',

    featuredPost,
    posts: exceptedFeaturedPosts,
  });
});

app.get('/beverages', (req, res) => {
  const dic = new Dictionary(req.lang);

  res.render('pages/beverages', {
    basedir,
    lang: req.lang,
    path: req.path,
    dic,
    title: dic.t('navigation.BEVERAGES'),
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
});

app.get('/foods', (req, res) => {
  const dic = new Dictionary(req.lang);

  res.render('pages/foods', {
    basedir,
    lang: req.lang,
    path: req.path,
    dic,
    title: dic.t('navigation.FOODS'),
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
});

app.get('/beans', (req, res) => {
  const dic = new Dictionary(req.lang);

  res.render('pages/beans', {
    basedir,
    lang: req.lang,
    path: req.path,
    dic,
    title: dic.t('navigation.BEANS'),
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
});

app.get('/goods', (req, res) => {
  const dic = new Dictionary(req.lang);

  res.render('pages/goods', {
    basedir,
    lang: req.lang,
    path: req.path,
    dic,
    title: dic.t('navigation.GOODS'),
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
});

app.get('/knowledge', (req, res) => {
  const dic = new Dictionary(req.lang);

  res.render('pages/knowledge', {
    basedir,
    lang: req.lang,
    path: req.path,
    dic,
    title: dic.t('navigation.KNOWLEDGE'),
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
});

app.get('/about-us', (req, res) => {
  const dic = new Dictionary(req.lang);

  res.render('pages/about-us', {
    basedir,
    lang: req.lang,
    path: req.path,
    dic,
    title: dic.t('footer.ABOUT_US'),
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
});

app.get('/posts/:id', (req, res) => {
  const id = Number(req.params.id);
  const posts = new Posts(req.lang);
  const dic = new Dictionary(req.lang);
  const post = posts.where({ id }).findOne();

  res.render('pages/post', {
    basedir,
    lang: req.lang,
    path: req.path,
    dic,
    title: post.title,
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',

    post,
  });
});

app.listen(3030, () => {
  console.log(`Start app at ${new Date().toString()}.`);
});
