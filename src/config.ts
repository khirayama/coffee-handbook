// tslint:disable:no-http-string
import { IDic } from 'utils/Dictionary';

// FYI:
// サポートされている言語または地域のコード: https://support.google.com/webmasters/answer/189077?hl=ja
// ISO639-1: https://ja.wikipedia.org/wiki/ISO_639-1%E3%82%B3%E3%83%BC%E3%83%89%E4%B8%80%E8%A6%A7
// ISO3166-1: https://ja.wikipedia.org/wiki/ISO_3166-1_alpha-2
// Ref: Wikipedia url structure
export const config: {
  url: IDic;
  langs: ['en', 'ja'];
  githubUrl: string;
  facebookPageUrl: string;
  twitterCardType: string;
  twitterAccount: string;
  instagramAccount: string;
} = {
  url: {
    en: process.env.NODE_ENV === 'production' ? 'https://coffee-handbook.com' : 'http://example.com:3030',
    ja: process.env.NODE_ENV === 'production' ? 'https://ja.coffee-handbook.com' : 'http://ja.example.com:3030',
  },
  langs: ['en', 'ja'],
  githubUrl: 'https://github.com/khirayama/coffee-handbook',
  facebookPageUrl: 'https://www.facebook.com/coffeehandbook/',
  twitterCardType: 'summary',
  twitterAccount: '@coffeehandbook_',
  instagramAccount: 'coffeehandbook',
};
