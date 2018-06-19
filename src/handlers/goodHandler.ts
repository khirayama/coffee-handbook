import { config } from 'config';
import { IGoodTemplate } from 'presentations/templates/Good/index';
import { Good, IGood } from 'resources/Good';
import { Dictionary } from 'utils/Dictionary';

export function goodHandler(req: any, res: any): void {
  const dic: Dictionary = new Dictionary(req.lang);
  const good: IGood = Good(req.lang)
    .where({
      key: req.params.goodKey,
    })
    .findOne();

  const vars: IGoodTemplate = {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: `${good.meta.title} | ${dic.t('name')}`,
    description: good.meta.description,
    thumbnailUrl: good.meta.thumbnailUrl.rectangle,
    pageType: 'product',

    good,
  };

  res.render('templates/Good', vars);
}
