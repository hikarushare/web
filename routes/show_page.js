const express = require('express');
const amisJSONs = require('../utils/amis/get_json');

function routerGenerator(option) {
  const router = express.Router();
  router.get(option.path, (req, res, next) => {
    res.render('amis/index', {
      subtitle: option.subtitle,
      amisJSON: option.amisJSON
    });
  });
  return router;
}

module.exports = {
  about: routerGenerator({
    path: '/about',
    subtitle: 'About',
    amisJSON: amisJSONs.about
  }),
  home: routerGenerator({
    path: '/home',
    subtitle: 'Home',
    amisJSON: amisJSONs.home
  }),
  torrents: routerGenerator({
    path: '/torrents',
    subtitle: 'Torrents',
    amisJSON: amisJSONs.torrents
  }),
  '/': (() => {
    const router = express.Router();
    router.get('/', (req, res, next) => {
      res.redirect(301, '/home');
    });
    return router;
  })()
};
