const config = require('config');
const Dictionary = require('utils/Dictionary');
const Post = require('resources/Post');

function postHandler(req, res) {
  const id = Number(req.params.id);
  const dic = new Dictionary(req.lang);
  const post = Post(req.lang)
    .where({ id })
    .findOne();

  res.render('pages/Post', {
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
}

module.exports = postHandler;
