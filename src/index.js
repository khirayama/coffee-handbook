const path = require('path');
const express = require('express');

const Posts = require('./utils/posts');
const Dictionary = require('./utils/dictionary');

const app = express();

const basedir = path.join(__dirname, 'templates');

app.set('views', basedir);
app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const lang = 'ja';
  const dic = new Dictionary(lang);
  res.render('pages/home', {
    basedir,
    dic,
  });
});

app.get('/coffee-beans', (req, res) => {
  const lang = 'ja';
  const dic = new Dictionary(lang);
  res.render('pages/coffee-beans', {
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
  const post = posts.findById(id);
  res.render('pages/post', {
    basedir,
    dic,
    post,
  });
});

app.listen(3000, () => {
  console.log(`Start app at ${new Date().toString()}.`);
});
