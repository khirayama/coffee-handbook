import * as express from 'express';

import { config } from 'config';
import { dic } from 'dic';

interface IManifest {
  name: string;
  short_name: string;
  icons: {
    src: string;
    sizes: string;
    // tslint:disable-next-line:no-reserved-keywords
    type: string;
  }[];
  scope: string;
  start_url: string;
  display: string;
  orientation: string;
  theme_color: string;
  background_color: string;
}

export function manifestHandler(req: express.Request, res: express.Response): void {
  const lang: string = req.lang;

  const manifest: IManifest = {
    name: dic.t('name', lang),
    short_name: dic.t('name', lang),
    icons: [
      {
        src: `/images/icon_${lang}_android.png`,
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    scope: '/',
    start_url: config.url[lang],
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#fbfaf5',
    background_color: '#fbfaf5',
  };

  res.json(manifest);
}
