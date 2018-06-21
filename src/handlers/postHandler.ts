import * as express from 'express';

import { config } from 'config';
import { IPost, Post } from 'resources/Post';
import { Dictionary } from 'utils/Dictionary';

export function postHandler(req: express.Request, res: express.Response): void {
  const id: number = Number(req.params.id);
  const dic: Dictionary = new Dictionary(req.lang);
  const post: IPost = Post(req.lang)
    .where({ id })
    .findOne();

  // tslint:disable-next-line
  const vars: any = {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: post.title,
    description: 'test',
    thumbnailUrl: 'test',
    pageType: 'article',

    post,
  };

  res.render('pages/Post', vars);
}
