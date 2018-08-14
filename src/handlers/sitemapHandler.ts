import * as express from 'express';

import { ILayout } from 'presentations/application/Layout';
import { IHeaderComponent } from 'presentations/components/Header';
import { INavigationComponent } from 'presentations/components/Navigation';
import { Dictionary } from 'utils/Dictionary';
import { buildHtmlSitemap, buildXmlSitemap } from 'utils/sitemap';

interface ISitemapPage extends ILayout {
  header: IHeaderComponent;
  navigation: INavigationComponent;
}

export function sitemapHandler(req: express.Request, res: express.Response): void {
  const dic: Dictionary = req.dic;

  const props: ISitemapPage = {
    ...req.layout,
    title: 'TODO',
    description: 'TODO',
    keywords: ['coffee', 'コーヒー', '珈琲', 'handbook', '手帖'],
    image: 'TODO',
    pageType: 'cafe',

    header: {
      lang: req.lang,
    },
    navigation: {
      path: req.originalUrl,
    },
    content: buildHtmlSitemap(req.lang),
  };

  res.render('pages/Sitemap', { dic, props });
}

export function sitemapXmlHandler(req: express.Request, res: express.Response): void {
  res.set('Content-Type', 'text/xml').send(buildXmlSitemap());
}
