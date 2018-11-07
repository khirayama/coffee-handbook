export const config: {
  url: {
    en: string;
    ja: string;
  };
  languages: string[];
  githubUrl: string;
  facebookPageUrl: string;
  twitterCardType: string;
  twitterAccount: string;
  instagramAccount: string;
} = {
  url: {
    en: process.env.NODE_ENV === 'production' ? 'https://coffee-handbook.com' : '//example.com:3030',
    ja: process.env.NODE_ENV === 'production' ? 'https://ja.coffee-handbook.com' : '//ja.example.com:3030',
  },
  languages: ['en', 'ja'],
  githubUrl: 'https://github.com/khirayama/coffee-handbook',
  facebookPageUrl: 'https://www.facebook.com/coffeehandbook/',
  twitterCardType: 'summary',
  twitterAccount: '@coffeehandbook_',
  instagramAccount: 'coffeehandbook',
};
