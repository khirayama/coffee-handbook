import { config } from 'config';
import { Good } from 'resources/Good';
import { Dictionary } from 'utils/Dictionary';

export function goodsHandler(req: any, res: any): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const goods: any[] = Good(req.lang).find();

  res.render('pages/Goods', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${dic.t('Goods.GOODS')} | ${dic.t('name')}`,
    description: dic.t('Goods.description'),
    thumbnailUrl: 'TODO',
    pageType: 'product',

    heading: dic.t('Goods.GOODS'),
    goods,
  });
}
