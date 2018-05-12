export interface PreviouslyWatched {
  date: number;
  url: string;
}

// interface Settings {
//   castIp: string;
//   maxVolume: number;
//   minVolume: number;
// }

export interface State {
  isPlaying: boolean;
  isPending: boolean;
  castUrl: string;
  pageUrl: string;
  error?: Error;
  duration: number;
  position: number;
  volume: number;
  positionPending: boolean;
  previouslyWatched: PreviouslyWatched[];
  castIp: string;
  theme?: string;
}

export interface Actions {
  cast: string;
  play: void;
  pause: void;
  quit: void;
  status: string | void;
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
