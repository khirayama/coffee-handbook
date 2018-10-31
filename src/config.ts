export const config: {
  url: string;
  languages: string[];
  githubUrl: string;
  facebookPageUrl: string;
  twitterCardType: string;
  twitterAccount: string;
  instagramAccount: string;
} = {
  url: process.env.NODE_ENV === 'production' ? 'https://coffee-handbook.com' : '//localhost:3030',
  languages: ['en', 'ja'],
  githubUrl: 'https://github.com/khirayama/coffee-handbook',
  facebookPageUrl: 'https://www.facebook.com/coffeehandbook/',
  twitterCardType: 'summary',
  twitterAccount: '@coffeehandbook_',
  instagramAccount: 'coffeehandbook',
};
