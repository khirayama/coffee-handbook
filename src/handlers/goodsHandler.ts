import * as express from 'express';

import { config } from 'config';
import { IGoodCardComponent } from 'presentations/components/GoodCard';
import { IGoodsPage } from 'presentations/pages/Goods';
import { Good, IGood } from 'resources/Good';
import { Dictionary } from 'utils/Dictionary';

export function goodsHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const goods: IGood[] = Good(req.lang).find();

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
      (good: IGood): IGoodCardComponent => {
        return {
          url: `/goods/${good.key}`,
          name: good.name,
          category: good.category,
          picture: {
            src: good.thumbnailUrl.square,
            alt: good.name,
            lazy: true,
          },
        };
      },
    ),
  };

  res.render('pages/Goods', { dic, props });
}
