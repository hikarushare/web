/**
 * @file database.d.ts
 * @author LittleYe233
 * @brief Declarations of database.js.
 */

/** */

import * as pmysql from 'promise-mysql';
import * as Bluebird from 'bluebird';
import { BasicConnectionConfig, BasicMySQLConfig } from './config';

export type validateParams = {
  passkey: string,
  info_hash: string,
  peer_id: string,
  port: number,
  uploaded: number,
  downloaded: number,
  left: number,
  compact?: number,
  no_peer_id?: number,
  event?: 'started' | 'completed' | 'stopped' | 'paused' | '',
  ip?: string,
  numwant?: number,
  trackerid?: unknown
};

type DatabaseConn = BasicConnectionConfig;

export type MySQLConn = DatabaseConn & {
  // from arguments
  db?: string;
  tbl?: string;

  // important for internal use
  conn?: pmysql.Connection;

  // methods
  connect?(...args: any[]): Promise<unknown>;
}

export type ActiveClientsQueryParams = {
  passkey?: string;
  peer_id?: string;
  info_hash?: string;
  ip?: string;
  port?: number;  // SMALLINT UNSIGNED (0~65535)
  left?: number;  // BIGINT UNSIGNED (0~2^64-1)
};

export type TorrentsQueryParams = {
  info_hash?: string;
  category?: number;    // TINYINT (-128~127)
  title?: string;       // VARCHAR(1024)
  dateUploaded?: Date;  // DATETIME (can be converted to JS `Date` type)
  size?: number;        // BIGINT UNSIGNED (0~2^64-1)
  seeders?: number;     // MEDIUMINT UNSIGNED (0~16777215)
  leechers?: number;    // MEDIUMINT UNSIGNED (0~16777215)
  completes?: number;   // MEDIUMINT UNSIGNED (0~16777215)
  uploader?: number;    // MEDIUMINT (-8388608~8388607)
};

type ActiveClientsSpecMethods = {
  _gethash?(client: ActiveClientsQueryParams): string;
  initialize?(): Promise<unknown>;

  addClient?(client: ActiveClientsQueryParams, params: validateParams | undefined): Promise<unknown> | Bluebird<unknown>;

  removeClients?(cond: ActiveClientsQueryParams, params: validateParams | undefined): Promise<unknown> | Bluebird<unknown>;

  updateClients?(cond: ActiveClientsQueryParams, client: ActiveClientsQueryParams, options: Record<string, unknown>, params: validateParams | undefined): Promise<unknown> | Bluebird<unknown>;

  queryClients?(cond: ActiveClientsQueryParams, params: validateParams | undefined): Promise<Record<string, unknown>[]> | Bluebird<Record<string, unknown>[]>;

  queryTable?(): Promise<unknown> | Bluebird<unknown>;
};

type TorrentsSpecMethods = {
  _gethash?(torrent: TorrentsQueryParams): string;
  initialize?(): Promise<unknown>;

  addTorrent?(torrent: TorrentsQueryParams, params: validateParams | undefined): Promise<unknown> | Bluebird<unknown>;

  removeTorrents?(cond: TorrentsQueryParams, params: validateParams | undefined): Promise<unknown> | Bluebird<unknown>;

  updateTorrents?(cond: TorrentsQueryParams, torrent: TorrentsQueryParams, options: Record<string, unknown>, params: validateParams | undefined): Promise<unknown> | Bluebird<unknown>;

  queryTorrents?(cond: TorrentsQueryParams, params: validateParams | undefined): Promise<Record<string, unknown>[]> | Bluebird<Record<string, unknown>[]>;

  queryTable?(): Promise<unknown> | Bluebird<unknown>;
};

type AuthUsersSpecMethods = {};

export type ActiveClientsConfig = BasicMySQLConfig;
export type TorrentsConfig = BasicMySQLConfig;
export type AuthUsersConfig = BasicMySQLConfig;

export type _ActiveClientsConn = MySQLConn & ActiveClientsSpecMethods;
export type _TorrentsConn = MySQLConn & TorrentsSpecMethods;
export type _AuthUsersConn = MySQLConn & AuthUsersSpecMethods;

export function ActiveClientsConn(params: ActiveClientsConfig): _ActiveClientsConn;
export function TorrentsConn(params: TorrentsConfig): _TorrentsConn;
export function AuthUsersConn(params: AuthUsersConfig): _AuthUsersConn;