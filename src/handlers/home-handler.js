const config = require('config');
const Dictionary = require('utils/Dictionary');
const Post = require('resources/Post');

function homeHandler(req, res) {
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
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: config.name,
    description: config.description,
    thumbnailUrl: 'test',
    type: 'cafe',

    featuredPost,
    posts: exceptedFeaturedPosts,
  });
}

module.exports = homeHandler;
