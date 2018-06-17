import { config } from 'config';
import { Dictionary } from 'utils/Dictionary';
import { Post } from 'resources/Post';

export function homeHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const featuredPost = Post(req.lang)
    .where({
      categories: {
        id: 1,
      },
      tags: {
        id: 1,
      },
    })
    .findOne();
  const exceptedFeaturedPosts = Post(req.lang)
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
    type: 'cafe',

    featuredPost,
    posts: exceptedFeaturedPosts,
  });
}
