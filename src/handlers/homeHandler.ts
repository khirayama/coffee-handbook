import * as express from 'express';

import { config } from 'config';
import { IHomePage, IStoryListItemComponent } from 'presentations/pages/Home';
import { IArticle, IPost, Post } from 'resources/Post';
import { Dictionary } from 'utils/Dictionary';

export function homeHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const featuredPost: IPost<IArticle> = Post(req.lang).findOne();
  const exceptedFeaturedPosts: IPost<IArticle>[] = Post(req.lang)
    .where({
      excepted: {
        key: featuredPost.key,
      },
    })
    .find();

  const props: IHomePage = {
    ...req.layout,
    title: dic.t('name'),
    description: dic.t('Pages.Home.description'),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
    image: 'TODO',
    pageType: 'cafe',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    coverStory: {
      alt: featuredPost.meta.title,
      src: featuredPost.meta.thumbnailUrl.square,
      lazy: false,
      key: featuredPost.key,
      title: featuredPost.meta.title,
      squareImagePath: featuredPost.meta.thumbnailUrl.square,
      rectangleImagePath: featuredPost.meta.thumbnailUrl.rectangle,
    },
    storyList: exceptedFeaturedPosts.map(
      (post: IPost<IArticle>): IStoryListItemComponent => {
        return {
          key: post.key,
          publishedAt: post.meta.publishedAt,
          title: post.meta.title,
          picture: {
            alt: post.meta.title,
            src: post.meta.thumbnailUrl.rectangle,
            lazy: true,
          },
        };
      },
    ),
  };

  res.render('pages/Home', { dic, props });
}
