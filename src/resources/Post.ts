import { Resource } from 'resources/Resource';

const posts = [
  {
    id: 3,
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-27 16:00',
    thumbnailUrl: {
      default: { ja: '/images/image_3.jpg', en: '/images/image_3.jpg' },
      square: { ja: '/images/image_3@square.jpg', en: '/images/image_3@square.jpg' },
      rectangle: { ja: '/images/image_3@rectangle.jpg', en: '/images/image_3@rectangle.jpg' },
    },
    title: { ja: '通常記事', en: 'Regular' },
    categories: [{ id: 1, name: { ja: '記事', en: 'Post' }, subCategory: null }],
    tags: [],
    content: { ja: '<h1>テスト</h1>', en: '<h1>Test</h1>' },
  },
  {
    id: 4,
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-27 16:00',
    thumbnailUrl: {
      default: { ja: '/images/image_4.jpg', en: '/images/image_4.jpg' },
      square: { ja: '/images/image_4@square.jpg', en: '/images/image_4@square.jpg' },
      rectangle: { ja: '/images/image_4@rectangle.jpg', en: '/images/image_4@rectangle.jpg' },
    },
    title: { ja: '通常記事', en: 'Regular' },
    categories: [{ id: 3, name: { ja: 'ビバレッジ', en: 'Beverages' }, subCategory: null }],
    tags: [],
    content: { ja: '<h1>テスト</h1>', en: '<h1>Test</h1>' },
  },
  {
    id: 5,
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-27 16:00',
    thumbnailUrl: {
      default: { ja: '/images/image_5.jpg', en: '/images/image_5.jpg' },
      square: { ja: '/images/image_5@square.jpg', en: '/images/image_5@square.jpg' },
      rectangle: { ja: '/images/image_5@rectangle.jpg', en: '/images/image_5@rectangle.jpg' },
    },
    title: { ja: '通常記事', en: 'Regular' },
    categories: [{ id: 1, name: { ja: '記事', en: 'Post' }, subCategory: null }],
    tags: [],
    content: { ja: '<h1>テスト</h1>', en: '<h1>Test</h1>' },
  },
  {
    id: 2,
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-27 15:00',
    thumbnailUrl: {
      default: { ja: '/images/image_2.jpg', en: '/images/image_2.jpg' },
      square: { ja: '/images/image_2@square.jpg', en: '/images/image_2@square.jpg' },
      rectangle: { ja: '/images/image_2@rectangle.jpg', en: '/images/image_2@rectangle.jpg' },
    },
    title: { ja: '【特集】なぜ僕らがこの活動をはじめたのか。2', en: '[Feature] Why we start this activities. 2' },
    categories: [{ id: 1, name: { ja: '記事', en: 'Post' }, subCategory: null }],
    tags: [{ id: 1, name: { ja: '特集', en: 'Feature' } }],
    content: { ja: '<h1>テスト</h1>', en: '<h1>Test</h1>' },
  },
  {
    id: 1,
    createdAt: '2018-05-26 12:00',
    publishedAt: '2018-05-26 15:00',
    thumbnailUrl: {
      default: { ja: '/images/image_1.jpg', en: '/images/image_1.jpg' },
      square: { ja: '/images/image_1@square.jpg', en: '/images/image_1@square.jpg' },
      rectangle: { ja: '/images/image_1@rectangle.jpg', en: '/images/image_1@rectangle.jpg' },
    },
    title: { ja: '【特集】なぜ僕らがこの活動をはじめたのか。', en: '[Feature] Why we start this activities.' },
    categories: [{ id: 1, name: { ja: '記事', en: 'Post' }, subCategory: null }],
    tags: [{ id: 1, name: { ja: '特集', en: 'Feature' } }],
    content: { ja: '<h1>テスト</h1>', en: '<h1>Test</h1>' },
  },
];

export const Post = function(lang: string) {
  return new Resource(posts, lang);
};
