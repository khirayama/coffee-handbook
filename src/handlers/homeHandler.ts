import * as express from 'express';

import { config } from 'config';
import { IHomePage, IStoryListItemComponent } from 'presentations/pages/Home';
import { IPost, Post } from 'resources/Post';
import { Dictionary } from 'utils/Dictionary';

export function homeHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const featuredPost: IPost = Post(req.lang)
    .where({
      categories: {
        id: 1,
      },
      tags: {
        id: 1,
      },
    })
    .findOne();
  const exceptedFeaturedPosts: IPost[] = Post(req.lang)
    .where({
      categories: {
        id: 1,
      },
      excepted: {
        key: featuredPost.key,
      },
    })
    .find();

  const props: IHomePage = {
    ...req.layout,
    title: dic.t('name'),
    description: dic.t('Pages.Home.description'),
    keywords: ['hirayama', '平山', 'coffee', 'コーヒー', '珈琲', 'institute', '研究所'],
    image: 'TODO',
    pageType: 'cafe',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    coverStory: {
      alt: featuredPost.title,
      src: featuredPost.thumbnailUrl.square,
      lazy: false,
      key: featuredPost.key,
      title: featuredPost.title,
      squareImagePath: featuredPost.thumbnailUrl.square,
      rectangleImagePath: featuredPost.thumbnailUrl.rectangle,
    },
    storyList: exceptedFeaturedPosts.map(
      (post: IPost): IStoryListItemComponent => {
        return {
          key: post.key,
          publishedAt: post.publishedAt,
          title: post.title,
          picture: {
            alt: post.title,
            src: post.thumbnailUrl.rectangle,
            lazy: true,
          },
        };
      },
    ),
  };

  res.render('pages/Home', { dic, props });
}
