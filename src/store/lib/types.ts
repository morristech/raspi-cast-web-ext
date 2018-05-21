import { CastMeta, CastOptions } from 'raspi-cast-common';

export interface State {
  meta?: CastMeta;
  status: string;
  isReady: boolean;
  isPending: boolean;
  isSeeking: boolean;
  notification: boolean;
  pageUrl: string;
  error?: string;
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
  seek: number;
  volume: number;
  error: string;

  setState: Partial<State>;
}
