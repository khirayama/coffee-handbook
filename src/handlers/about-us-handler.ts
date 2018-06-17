import { config } from 'config';
import { Dictionary } from 'utils/Dictionary';

export function aboutUsHandler(req, res) {
  const dic = new Dictionary(req.lang);

  res.render('pages/AboutUs', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: 'ABOUT US',
    description: 'test',
    thumbnailUrl: 'test',
    type: 'author',
  });
}
