/**
 * @file database.js
 * @author LittleYe233
 * @brief Utility of connecting with databases and providing JSON outputs.
 */

/** */

const mysql = require('mysql');
const pmysql = require('promise-mysql');
const MD5 = require('crypto-js/md5');
const assert = require('assert');

/********************************************
 *
 * Common
 *
 *******************************************/

/**
 * @param {import('./config').BasicMySQLConfig} params
 */
function MySQLConn(params) {
  /** @type {import('./database').MySQLConn} */
  let inst = {
    host: params.host,
    port: params.port,
    user: params.user,
    pass: params.pass,
    db: params.db,
    tbl: params.tbl
  };

  /**
   * Connect to the database asynchronously.
   * @returns a promise returning a `MySQL.Connection` if fulfilled
   */
  inst.connect = async (...args) => {
    return new Promise((resolve, reject) => {
      pmysql
        .createConnection({
          host: inst.host,
          port: inst.port,
          user: inst.user,
          password: inst.pass,
          database: inst.db
        })
        .then((conn) => {
          inst.conn = conn;
          resolve(conn);
        })
        .catch((err) =>
          reject({
            code: err.code,
            errno: err.errno,
            fatal: err.fatal,
            sql: err.sql,
            sqlState: err.sqlState,
            sqlMessage: err.sqlMessage
          })
        );
    });
  };

  return inst;
}

/********************************************
 *
 * Torrents Database
 *
 *******************************************/

const torrentsNames = [
  'info_hash',
  'category',
  'title',
  'dateUploaded',
  'size',
  'seeders',
  'leechers',
  'completes',
  'uploader'
];
const torrentsMembers = (client) => torrentsNames.map((k) => client[k]);

const _gethashTorrents = (torrent) => MD5(torrent.info_hash).toString();

/**
 * @param {import('./database').TorrentsConfig} params
 */
function TorrentsConn(params = {}) {
  /** @type {import('./database')._TorrentsConn} */
  let inst = MySQLConn(params);

  /**
   * Initialize the database asynchronously.
   * @note This is a destructive operation that will erase all previous data and
   * reset the database to a default state.
   * @returns a promise returning an array of results of two statements if fulfilled
   */
  inst.initialize = () =>
    Promise.all([
      inst.conn.query(`DROP TABLE IF EXISTS ${mysql.escapeId(inst.tbl)}`),
      // `hashval` is for primary key to avoid duplication
      // NOTE: See <http://www.bittorrent.org/beps/bep_0023.html> for an
      // explanation of type of `ip` field, or have a look at the documentation
      // of this project.
      inst.conn.query(
        `CREATE TABLE ${mysql.escapeId(
          inst.tbl
        )} (\`info_hash\` CHAR(40) NOT NULL, \`category\` TINYINT NOT NULL, \`title\` VARCHAR(1024) NOT NULL, \`dateUploaded\` DATETIME NOT NULL, \`size\` BIGINT UNSIGNED NOT NULL, \`seeders\` MEDIUMINT UNSIGNED NOT NULL, \`leechers\` MEDIUMINT UNSIGNED NOT NULL, \`completes\` MEDIUMINT UNSIGNED NOT NULL, \`uploader\` MEDIUMINT NOT NULL, \`_hashval\` CHAR(32) NOT NULL, PRIMARY KEY (\`_hashval\`)) ENGINE=InnoDB DEFAULT CHARSET=utf8`
      )
    ]);

  /**
   * Add a torrent to the database asynchronously.
   * @returns a promise returning the result of the statement
   */
  inst.addTorrent = (torrent, params) => {
    torrentsNames.forEach((n) => {
      assert(
        torrent[n] !== undefined,
        ReferenceError(`property ${n} is not defined`)
      );
    });

    return inst.conn.query(
      `INSERT INTO ${mysql.escapeId(inst.tbl)} (\`info_hash\`, \`category\`, \`title\`, \`dateUploaded\`, \`size\`, \`seeders\`, \`leechers\`, \`completes\`, \`uploader\`, \`_hashval\`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [...torrentsMembers(torrent), _gethashTorrents(torrent)]
    );
  };

  /**
   * Remove torrents from the database asynchronously.
   * @param cond Conditions of the torrents to be removed.
   * @returns a promise returning the result of the statement if fulfilled
   */
  inst.removeTorrents = (cond, params) => {
    // a definitely true statement, causing all torrents are selected
    let whereClasue = '1=1';
    // as a prefix
    let cond1 = cond === undefined,
      cond2 = null;
    if (!cond1) {
      cond2 = torrentsMembers(cond).some((v) => v !== undefined);
    }
    if (cond1 || cond2) {
      if (!cond1) {
        torrentsNames.forEach((n) => {
          if (cond[n] !== undefined) {
            whereClasue += ` AND ${mysql.escapeId(n)}=${mysql.escape(cond[n])}`;
          }
        });
      }
    } else return Promise.reject('unsupported type');

    return inst.conn.query(
      `DELETE FROM ${mysql.escapeId(inst.tbl)} WHERE ` + whereClasue
    );
  };

  /**
   * Update torrents from the database asynchronously.
   * @returns An array of promises with results of main query operations and
   * results of the update/add statement if fulfilled.
   */
  inst.updateTorrents = async (
    cond,
    torrent,
    options = { allowAdd: false },
    params
  ) => {
    // a definitely true statement, causing all torrents are selected
    let whereClasue = '1=1',
      targets = null;
    // as a prefix
    let cond1 = cond === undefined,
      cond2 = null;
    if (!cond1) {
      cond2 = torrentsMembers(cond).some((v) => v !== undefined);
    }
    if (cond1 || cond2) {
      if (!cond1) {
        torrentsNames.forEach((n) => {
          if (cond[n] !== undefined) {
            whereClasue += ` AND ${mysql.escapeId(n)}=${mysql.escape(cond[n])}`;
          }
        });
      }
    } else if (!options.allowAdd) {
      return [targets, Promise.reject('unsupported type of condition')];
    }

    torrent = torrent ?? {};
    if (torrentsMembers(torrent).some((v) => v !== undefined)) {
      targets = null;
      let results = [];
      try {
        targets = await inst.queryTorrents(cond, params);
      } catch (e) {
        return [targets, Promise.reject(e)];
      }

      // NOTE: `target` has full fields
      if (!targets.length && options.allowAdd) {
        let newTorrent = {};
        torrentsNames.forEach((k) => {
          newTorrent[k] = torrent[k] ?? cond[k];
        });
        return [targets, inst.addTorrent(newTorrent, params)];
      }

      for (const target of targets) {
        let newTorrent = { ...target }; // copy `target`
        for (const k of Object.keys(torrent)) {
          if (torrentsNames.includes(k)) {
            newTorrent[k] = torrent[k];
          }
        }
        let newTorrentMembers = torrentsNames.map((v) => newTorrent[v]);
        try {
          results.push(
            await inst.conn.query(
              `UPDATE ${mysql.escapeId(
                inst.tbl
              )} SET \`info_hash\`=?, \`category\`=?, \`title\`=?, \`dateUploaded\`=?, \`size\`=?, \`seeders\`=?, \`leechers\`=?, \`completes\`=?, \`uploader\`=?, \`_hashval\`=? WHERE ` +
              whereClasue,
              [...newTorrentMembers, _gethashTorrents(newTorrent)]
            )
          );
        } catch (e) {
          return [targets, Promise.reject({ message: e, results: results })];
        }
      }
      return [targets, Promise.resolve(results)];
    } else return [targets, Promise.reject('unsupport type of torrent')];
  };

  /**
   * Query torrents from the database asynchronously.
   * @returns a promise returning the result of the statement if fulfilled
   */
  inst.queryTorrents = (cond, params) => {
    // a definitely true statement, causing all torrents are selected
    let whereClasue = '1=1';
    // as a prefix
    let cond1 = cond === undefined,
      cond2 = null;
    if (!cond1) {
      cond2 = torrentsMembers(cond).some((v) => v !== undefined);
    }
    if (cond1 || cond2) {
      if (!cond1) {
        torrentsNames.forEach((n) => {
          if (cond[n] !== undefined) {
            whereClasue += ` AND ${mysql.escapeId(n)}=${mysql.escape(cond[n])}`;
          }
        });
      }
    } else return Promise.reject('unsupported type');

    return inst.conn.query(
      `SELECT \`info_hash\`, \`category\`, \`title\`, \`dateUploaded\`, \`size\`, \`seeders\`, \`leechers\`, \`completes\`, \`uploader\` FROM ${mysql.escapeId(
        inst.tbl
      )} WHERE ` + whereClasue
    );
  };

  inst.queryTable = () =>
    inst.conn.query(`SELECT * FROM ${mysql.escapeId(inst.tbl)}`);

  return inst;
}

module.exports = {
  TorrentsConn: TorrentsConn
};