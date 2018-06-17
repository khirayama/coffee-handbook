import { config } from 'config';
import { Dictionary } from 'utils/Dictionary';
import { Good } from 'resources/Good';

export function goodsHandler(req, res) {
  const dic = new Dictionary(req.lang);
  const goods = Good(req.lang).find();

  res.render('pages/Goods', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${dic.t('Goods.GOODS')} | ${dic.t('name')}`,
    description: dic.t('Goods.description'),
    thumbnailUrl: 'TODO',
    type: 'product',

    heading: dic.t('Goods.GOODS'),
    goods,
  });
}
