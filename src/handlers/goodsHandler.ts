import { config } from 'config';
import { IGoodsPage } from 'presentations/pages/Goods/index';
import { Good, IGood } from 'resources/Good';
import { Dictionary } from 'utils/Dictionary';

export function goodsHandler(req: any, res: any): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const goods: IGood[] = Good(req.lang).find();

  const vars: IGoodsPage = {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${dic.t('Pages.Goods.GOODS')} | ${dic.t('name')}`,
    description: dic.t('Pages.Goods.description'),
    thumbnailUrl: 'TODO',
    pageType: 'product',

    heading: dic.t('Pages.Goods.GOODS'),
    goods,
  };

  res.render('pages/Goods', vars);
}
