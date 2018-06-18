import { config } from 'config';
import { Post } from 'resources/Post';
import { Dictionary } from 'utils/Dictionary';

export function postHandler(req: any, res: any): void {
  const id: number = Number(req.params.id);
  const dic: Dictionary = new Dictionary(req.lang);
  const post: any = Post(req.lang)
    .where({ id })
    .findOne();

  res.render('pages/Post', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: post.title,
    description: 'test',
    thumbnailUrl: 'test',
    type: 'article',

    post,
  });
}
