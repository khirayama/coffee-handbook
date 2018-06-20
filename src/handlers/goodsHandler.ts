import * as express from 'express';

import { config } from 'config';
import { IGoodCardComponent } from 'presentations/components/GoodCard';
import { IGoodsPage } from 'presentations/pages/Goods';
import { Good, IGood } from 'resources/Good';
import { Dictionary } from 'utils/Dictionary';

export function goodsHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const goods: IGood[] = Good(req.lang).find();

  const props: IGoodsPage = {
    author: dic.t('author'),
    name: dic.t('name'),
    baseUrl: config.url,
    facebookAppId: config.facebookAppId,
    facebookPageUrl: config.facebookPageUrl,
    twitterCardType: config.twitterCardType,
    twitterAccount: config.twitterAccount,

    lang: req.lang,
    path: req.originalUrl,

    title: `${dic.t('Pages.Goods.GOODS')} | ${dic.t('name')}`,
    description: dic.t('Pages.Goods.description'),
    keywords: ['hirayama', '平山', 'coffee', 'コーヒー', '珈琲', 'institute', '研究所'],
    image: 'TODO',
    pageType: 'product',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    categoryTitle: {
      heading: dic.t('Pages.Goods.GOODS'),
    },
    goodList: goods.map(
      (good: IGood): IGoodCardComponent => {
        return {
          url: good.url,
          name: good.name,
          category: good.category,
          picture: {
            src: good.meta.thumbnailUrl.square,
            alt: good.meta.title,
            lazy: true,
          },
        };
      },
    ),
  };

  res.render('pages/Goods', { dic, props });
}
