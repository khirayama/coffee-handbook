/* eslint-disable camelcase */
const RSS = require('rss');

const config = require('config');
const Post = require('resources/Post');
const Dictionary = require('utils/Dictionary');

const rss = {};

for (let i = 0; i < config.languages.length; i++) {
  const lang = config.languages[i];
  const dic = new Dictionary(lang);

  const feed = new RSS({
    title: dic.t('name'),
    description: dic.t('Home.description'),
    generaror: 'by myself',
    feed_url: `${config.url}/rss`,
    site_url: config.url,
    image_url: `${config.url}/images/logo`,
    docs: `${config.url}/rss-docs`,
    managingEditor: 'khirayama',
    webMaster: 'khirayama',
    copyright: dic.t('name'),
    language: lang,
    categories: ['media'],
    pubDate: new Date(),
    ttl: 0,
    hub: null,
    custom_namespaces: null,
    custom_elements: null,
  });

  Post(lang)
    .find()
    .forEach(post => {
      feed.item({
        title: post.title,
        description: post.description,
        url: `${config.url}/posts/${post.id}`,
        guid: '',
        categories: ['media'],
        author: dic.t('author'),
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
