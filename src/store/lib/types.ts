import { CastMeta, CastOptions } from 'raspi-cast-common';

export interface State {
  meta?: CastMeta;
  status: string;
  isPending: boolean;
  isSeeking: boolean;
  pageUrl: string;
  error?: Error;
  duration: number;
  position: number;
  maxVolume: number;
  minVolume: number;
  volume: number;
  muted: boolean;
  positionPending: boolean;
  castIp?: string;
  theme?: string;
}

export interface Actions {
  cast: CastOptions;
  play: void;
  pause: void;
  quit: void;
  status: void;
  position: number | void;
  duration: number | void;
  seek: number;
  volume: number;

  setError: Error;
  setState: Partial<State>;
}
