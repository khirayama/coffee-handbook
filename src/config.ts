export const config: {
  url: string;
  languages: string[];
  githubUrl: string;
  patreonUrl: string;
  facebookAppId: string;
  facebookPageUrl: string;
  twitterCardType: string;
  twitterAccount: string;
} = {
  url: process.env.NODE_ENV === 'production' ? 'https://coffeehandbook.app' : '//localhost:3030',
  languages: ['en', 'ja'],
  // TODO: Update repo name
  githubUrl: 'https://github.com/khirayama/tmp',
  // TODO: Get patreon https://www.patreon.com/
  patreonUrl: '',
  facebookAppId: 'test id',
  facebookPageUrl: 'facebook page url',
  twitterCardType: 'summary_large_image',
  twitterAccount: '@coffee_handbook',
};
