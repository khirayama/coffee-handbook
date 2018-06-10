const posts = require('data/posts');
const Resource = require('resources/Resource');

const Post = function(lang) {
  return new Resource(posts, lang);
};

module.exports = Post;
