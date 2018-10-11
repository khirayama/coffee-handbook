import * as express from 'express';

import { config } from 'config';
import { IPostTemplate } from 'presentations/templates/Post';
import { IPost, Post } from 'resources/Post';
import { Dictionary } from 'utils/Dictionary';

export function postHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const postKey: string = req.params.postKey;
  const post: IPost = Post(req.lang)
    .where({ key: postKey })
    .findOne();

  const props: IPostTemplate = {
    ...req.layout,
    title: post.title,
    description: post.description,
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
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
