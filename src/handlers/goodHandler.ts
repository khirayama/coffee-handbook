import * as express from 'express';

import { config } from 'config';
import { IPictureComponent } from 'presentations/components/Picture';
import { IGoodTemplate, ISpecRowComponent } from 'presentations/templates/Good';
import { Good, IGood } from 'resources/Good';
import { Dictionary } from 'utils/Dictionary';

export function goodHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;
  const good: IGood = Good(req.lang)
    .where({
      key: req.params.goodKey,
    })
    .findOne();

  const props: IGoodTemplate = {
    ...req.layout,
    title: `${good.meta.title} | ${dic.t('name')}`,
    description: good.meta.description,
    keywords: ['hirayama', '平山', 'coffee', 'コーヒー', '珈琲', 'institute', '研究所'],
    image: good.meta.thumbnailUrl.rectangle,
    pageType: 'product',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    good: {
      name: good.name,
      category: good.category,
      summary: good.summary,
      content: good.content,
      pictures: good.pictures.map(
        (picture: { url: string; caption: string }): IPictureComponent => {
          return {
            src: picture.url,
            alt: picture.caption,
            lazy: true,
          };
        },
      ),
      specs: good.specs.map(
        (spec: { name: string; value: string }): ISpecRowComponent => {
          return {
            name: spec.name,
            value: spec.value,
          };
        },
      ),
    },
    relatedGoods: [
      {
        url: 'TODO',
        name: good.name,
        category: good.category,
        picture: {
          src: good.meta.thumbnailUrl.square,
          alt: good.name,
          lazy: true,
        },
      },
    ],
  };

  res.render('templates/Good', { dic, props });
}
