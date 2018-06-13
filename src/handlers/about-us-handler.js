const config = require('config');
const Dictionary = require('utils/Dictionary');

function aboutUsHandler(req, res) {
  const dic = new Dictionary(req.lang);

  res.render('pages/AboutUs', {
    config,
    lang: req.lang,
    path: req.originalUrl,
    dic,
    title: 'ABOUT US',
    description: 'test',
    thumbnailUrl: 'test',
    type: 'type',
  });
}

module.exports = aboutUsHandler;
