const path = require('path');
const RSS = require('rss');

const config = require(path.join(__dirname, '..', '..', 'config.json'));
const Posts = require('./posts');

const rss = {};

for (let i = 0; i < config.languages.length; i++) {
  const lang = config.languages[i];
  const posts = new Posts(lang);

  const feed = new RSS({
    title: config.name,
    description: config.description,
    generaror: 'by myself',
    feed_url: `${config.url}/rss`,
    site_url: config.url,
    image_url: `${config.url}/images/logo`,
    docs: `${config.url}/rss-docs`,
    managingEditor: 'khirayama',
    webMaster: 'khirayama',
    copyright: config.name,
    language: lang,
    categories: ['media'],
    pubDate: new Date(),
    ttl: 0,
    hub: null,
    custom_namespaces: null,
    custom_elements: null,
  });
  posts.find().forEach(post => {
    feed.item({
      title: post.title,
      description: post.description,
      url: `${config.url}/posts/${post.id}`,
      guid: '',
      categories: ['media'],
      author: config.name,
      date: new Date(post.publishedAt),
      lat: null,
      long: null,
      custom_elements: null,
      enclosure: null,
    });
  });
  rss[lang] = feed.xml();
}

module.exports = rss;
