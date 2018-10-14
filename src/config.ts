export const config: {
  url: string;
  languages: string[];
  githubUrl: string;
  patreonUrl: string;
  facebookAppId: string;
  facebookPageUrl: string;
  twitterCardType: string;
  twitterAccount: string;
  instagramAccount: string;
} = {
  url: process.env.NODE_ENV === 'production' ? 'https://coffee-handbook.com' : '//localhost:3030',
  languages: ['en', 'ja'],
  githubUrl: 'https://github.com/khirayama/coffee-handbook',
  // TODO: Get patreon https://www.patreon.com/
  patreonUrl: '',
  facebookAppId: 'test id',
  facebookPageUrl: 'https://www.facebook.com/coffeehandbook/',
  twitterCardType: 'summary_large_image',
  twitterAccount: '@coffeehandbook_',
  instagramAccount: 'coffeehandbook',
};
