/**
 * @file config.d.ts
 * @author LittleYe233
 * @email 30514318+LittleYe233@users.noreply.github.com
 * @date 2022-04-25
 * @brief Declarations of config.js.
 */

/** */

export type BasicConnectionConfig = {
  host?: string,
  port?: number,
  user?: string,   // forcely require this field for convenience
  pass?: string
};

export type BasicMySQLConfig = BasicConnectionConfig & {
  db?: string,
  tbl?: string
};

export type BasicRedisConfig = BasicConnectionConfig & {
  db?: number,    // Redis database index (0-15)
  key?: string
};

export type ParseConfigReturns = {
  secrets?: Array<string>;
  client: {
    databases: {
      auth_users: BasicMySQLConfig,
      active_clients: BasicMySQLConfig,
      torrents: BasicMySQLConfig
    }
  },
  server: {
    databases: {
      auth_users: BasicMySQLConfig,
      active_clients: BasicMySQLConfig,
      torrents: BasicMySQLConfig
    }
  }
};

export function parseConfig(
  filename: string,
  encoding: BufferEncoding
): ParseConfigReturns;

export function parseConfigWithSecrets(
  filename: string,
  options?: {
    encoding?: BufferEncoding,
    rmsecrets?: boolean
  }
): ParseConfigReturns;

export function parseProjectConfig(
  options?: {
    encoding?: BufferEncoding,
    rmsecrets?: boolean
  }
): ParseConfigReturns;