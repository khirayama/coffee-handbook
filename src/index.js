const path = require('path');
const express = require('express');

const Posts = require('./utils/posts');
const Dictionary = require('./utils/dictionary');

const app = express();

const basedir = path.join(__dirname, 'templates');

app.set('views', basedir);
app.set('view engine', 'pug');
app.use(express.static(path.join(__dirname, 'assets')));
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
  const lang = 'ja';
  const dic = new Dictionary(lang);
  const posts = new Posts(lang);
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
    dic,
    featuredPost,
    posts: exceptedFeaturedPosts,
  });
});

app.get('/beans', (req, res) => {
  const lang = 'ja';
  const dic = new Dictionary(lang);
  res.render('pages/beans', {
    basedir,
    dic,
  });
});

app.get('/beverages', (req, res) => {
  const lang = 'ja';
  const dic = new Dictionary(lang);
  res.render('pages/beverages', {
    basedir,
    dic,
  });
});

app.get('/foods', (req, res) => {
  const lang = 'ja';
  const dic = new Dictionary(lang);
  res.render('pages/foods', {
    basedir,
    dic,
  });
});

app.get('/goods', (req, res) => {
  const lang = 'ja';
  const dic = new Dictionary(lang);
  res.render('pages/goods', {
    basedir,
    dic,
  });
});

app.get('/knowledge', (req, res) => {
  const lang = 'ja';
  const dic = new Dictionary(lang);
  res.render('pages/knowledge', {
    basedir,
    dic,
  });
});

app.get('/posts/:id', (req, res) => {
  const lang = 'ja';
  const id = Number(req.params.id);
  const posts = new Posts(lang);
  const dic = new Dictionary(lang);
  const post = posts.where({ id }).findOne();
  res.render('pages/post', {
    basedir,
    dic,
    post,
  });
});

app.listen(3030, () => {
  console.log(`Start app at ${new Date().toString()}.`);
});
