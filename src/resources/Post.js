const rawPosts = require('data/posts');
const Resource = require('resources/Resource');

const Post = function(lang) {
  return new Resource(rawPosts, lang);
};

module.exports = Post;
