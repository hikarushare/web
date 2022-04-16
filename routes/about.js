var express = require('express');
var router = express.Router();

router.get('/about', (req, res, next) => {
  res.render('amis/index', {
    subtitle: 'About',
    amisFilePath: 'pages/about'
  });
});

module.exports = router;
