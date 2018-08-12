import * as express from 'express';

import { config } from 'config';
import { IGoodCardComponent } from 'presentations/components/GoodCard';
import { IGoodsPage } from 'presentations/pages/Goods';
import { Good, IGood } from 'resources/Good';
import { IPost } from 'resources/Post';
import { Dictionary } from 'utils/Dictionary';

export function goodsHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const goods: IPost<IGood>[] = Good(req.lang).find();

  const props: IGoodsPage = {
    ...req.layout,
    title: `${dic.t('Pages.Goods.GOODS')} | ${dic.t('name')}`,
    description: dic.t('Pages.Goods.description'),
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
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
      (good: IPost<IGood>): IGoodCardComponent => {
        return {
          url: good.meta.url,
          name: good.data.name,
          category: good.data.category,
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
