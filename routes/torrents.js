var express = require('express');
var router = express.Router();

router.get('/torrents', (req, res, next) => {
  res.render('amis/index', {
    subtitle: 'Torrents',
    amisFilePath: 'pages/torrents'
  });
});

module.exports = router;
