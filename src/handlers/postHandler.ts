import * as express from 'express';

import { config } from 'config';
import { IPostTemplate } from 'presentations/templates/Post';
import { IPost, Post } from 'resources/Post';
import { Dictionary } from 'utils/Dictionary';

export function postHandler(req: express.Request, res: express.Response): void {
  const postKey: string = req.params.postKey;
  const dic: Dictionary = new Dictionary(req.lang);
  const post: IPost = Post(req.lang)
    .where({ key: postKey })
    .findOne();

  const props: IPostTemplate = {
    author: dic.t('author'),
    name: dic.t('name'),
    baseUrl: config.url,
    facebookAppId: config.facebookAppId,
    facebookPageUrl: config.facebookPageUrl,
    twitterCardType: config.twitterCardType,
    twitterAccount: config.twitterAccount,

    lang: req.lang,
    path: req.originalUrl,

    title: post.title,
    description: post.description,
    keywords: ['hirayama', '平山', 'coffee', 'コーヒー', '珈琲', 'institute', '研究所'],
    image: post.thumbnailUrl.rectangle,
    pageType: 'article',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    post: {
      title: post.title,
      content: post.content,
    },
  };

  res.render('templates/Post', { dic, props });
}
