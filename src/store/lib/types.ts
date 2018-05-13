export interface PreviouslyWatched {
  date: number;
  url: string;
}

interface CastMeta {
  title?: string;
  description?: string;
  thumbnail?: string;
}

export interface State {
  meta: CastMeta;
  status: string;
  isPending: boolean;
  pageUrl: string;
  error?: Error;
  duration: number;
  position: number;
  volume: number;
  muted: boolean;
  positionPending: boolean;
  previouslyWatched: PreviouslyWatched[];
  castIp: string;
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
  setState: Record<string, any>;
}

export interface StoreState {
  state: State;
  computedValues: {};
  actions: Actions;
  dependencies: {};
}

export type CastType = 'youtubedl';

export interface CastOptions {
  type: CastType;
  data: string;
}
