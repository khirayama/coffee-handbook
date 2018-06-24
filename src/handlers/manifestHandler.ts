import * as express from 'express';

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
  const manifest: IManifest = {
    name: req.dic.t('name'),
    short_name: req.dic.t('name'),
    icons: [
      {
        src: '/images/logo/icon_android.png',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    scope: '/',
    start_url: `/?lang=${req.lang}`,
    display: 'standalone',
    orientation: 'portrait',
    theme_color: '#fbfaf5',
    background_color: '#fbfaf5',
  };

  res.json(manifest);
}
