import { config } from 'config';
import { Good } from 'resources/Good';
import { Dictionary } from 'utils/Dictionary';

export function goodHandler(req: any, res: any): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const good: any = Good(req.lang)
    .where({
      key: req.params.goodKey,
    })
    .findOne();

  res.render('templates/Good', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${good.title} | ${dic.t('name')}`,
    description: good.description,
    thumbnailUrl: good.thumbnailUrl.rectangle,
    type: 'product',

    good,
  });
}
