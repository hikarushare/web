var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
  res.redirect('/home');
});

router.get('/home', (req, res, next) => {
  res.render('amis/index', {
    subtitle: 'Home',
    amisFilePath: 'pages/home'
  });
});

module.exports = router;
