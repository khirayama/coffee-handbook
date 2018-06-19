import { config } from 'config';
import { Post } from 'resources/Post';
import { Dictionary } from 'utils/Dictionary';

export function homeHandler(req: any, res: any): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const featuredPost: any = Post(req.lang)
    .where({
      categories: {
        id: 1,
      },
      tags: {
        id: 1,
      },
    })
    .findOne();
  const exceptedFeaturedPosts: any[] = Post(req.lang)
    .where({
      categories: {
        id: 1,
      },
      excepted: {
        id: featuredPost.id,
      },
    })
    .find();

  res.render('pages/Home', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: dic.t('name'),
    description: dic.t('Home.description'),
    thumbnailUrl: 'TODO',
    pageType: 'cafe',

    featuredPost,
    posts: exceptedFeaturedPosts,
  });
}
