const router = require('express-promise-router')();
const { TorrentsConn } = require('../../utils/common/database');
const { parseProjectConfig } = require('../../utils/common/config');

const cfg = parseProjectConfig();

async function getTorrents() {
  let inst = TorrentsConn(cfg.client.databases.torrents);
  await inst.connect();
  let torrents = await inst.queryTorrents();
  await inst.conn.end();
  return torrents;
}

router.get('/api/getTorrents', async (req, res, next) => {
  let torrents = await getTorrents();
  res.type('json');
  res.send(JSON.stringify(torrents));
});

module.exports = router;