const amisJSONs = require('../../utils/amis/get_json');
const express = require('express');
const router = express.Router();

router.get('/getAmisJSON', (req, res, next) => {
  res.type('json');
  res.send(JSON.stringify(amisJSONs[req.query.path] || {}));
});

module.exports = router;