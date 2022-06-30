/**
 * @file config.js
 * @author LittleYe233
 * @email 30514318+LittleYe233@users.noreply.github.com
 * @date 2022-04-25
 * @brief An utility to process with project configurations.
 */

/** */

const yaml = require('yaml');
const fs = require('fs');
const path = require('path');
const { merge } = require('lodash');

const DEFAULT_CONFIG_PATH = './config.yml';  // relative to `app.js`
const DEFAULT_CONFIG = {
  client: {
    databases: {
      auth_users: {
        host: 'localhost',
        port: 3306
      },
      active_clients: {
        host: 'localhost',
        port: 6379
      },
      torrents: {
        host: 'localhost',
        port: 3306
      }
    }
  },
  server: {
    databases: {
      auth_users: {
        host: 'localhost',
        port: 3306
      },
      active_clients: {
        host: 'localhost',
        port: 6379
      },
      torrents: {
        host: 'localhost',
        port: 3306
      }
    }
  }
};

/**
 * Parse a configuration file.
 * @type {import('./config').parseConfig}
 * @param filename Filename of the configuration file
 * @param encoding Encoding of the configuration file (default: utf8)
 * @returns Parsed configurations
 */
function parseConfig(filename, encoding='utf8') {
  const cfgFile = fs.readFileSync(filename, {encoding: encoding});
  /** @type {import('./config').ParseConfigReturns} */
  const cfg = yaml.parse(cfgFile);
  
  return cfg;
}

/**
 * Parse a configuration file with secrets.
 * @type {import('./config').parseConfigWithSecrets}
 * @param filename Filename of the configuration file
 * @param options Optional parameters
 * @returns Parsed configurations
 */
function parseConfigWithSecrets(filename, options={}) {
  // parse options
  const {
    encoding = 'utf-8',
    rmsecrets = true
  } = options;

  // parse raw config
  let cfg = parseConfig(filename, encoding);

  // parse secret configs and merge all
  if (Array.isArray(cfg.secrets)) {
    for (let fp of cfg.secrets) {
      if (typeof fp === 'string') {
        var resolvedFp = path.join(path.dirname(filename), fp);
        const secretCfg = parseConfig(resolvedFp, encoding);
        cfg = merge(cfg, secretCfg);
      }
    }
  }
  // delete this key to protect privacy
  if (rmsecrets) {
    delete cfg.secrets;
  }

  return cfg;
}

/**
 * Parse a project configuration file with pre- and post-processes.
 * @type {import('./config').parseProjectConfig}
 * @param options Optional parameters
 */
function parseProjectConfig(options={}) {
  let cfg = parseConfigWithSecrets(DEFAULT_CONFIG_PATH, options);

  // merge default configurations
  cfg = merge(DEFAULT_CONFIG, cfg);

  return cfg;
}

module.exports = {
  parseProjectConfig: parseProjectConfig
};