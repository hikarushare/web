/**
 * @file process.d.ts
 * @author LittleYe233
 * @email 30514318+LittleYe233@users.noreply.github.com
 * @date 2022-04-25
 * @brief Declarations of process.js.
 */

export type RawResp = {
  'failure reason'?: string;
  'warning meesage'?: string;
  interval: number;
  'min interval'?: number;
  'tracker id'?: unknown;
  complete: number;
  incomplete: number;
  peers: Peer[] | string;
  peers6: Peer[] | string;
};

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

export type ValidateReturns = {
  status: string,
  message?: string,
  params: validateParams,
  result: string,
  rawResp: RawResp
};

export type GetPeersParams = {
  info_hash: string
};

export type Peer = {
  'peer id'?: string,
  ip?: string,
  port?: number
};

export type GetPeersReturns = {
  peers: Peer[],
  complete: number,
  incomplete: number
};

export function dumpEscaped(escaped: string): string;
export function validate(params: validateParams): ValidateReturns;
export function validateAsync(params: validateParams): Promise<ValidateReturns>;
export function getPeers(params: string | GetPeersParams): Promise<GetPeersReturns>;
export function compactPeers(params: {ip: string, port: number}[], options: string): string;