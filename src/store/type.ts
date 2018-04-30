export interface PreviouslyWatched {
  date: number;
  url: string;
}

interface Settings {
  castIp: string;
  maxVolume: number;
  minVolume: number;
}

export interface State {
  isPlaying: boolean;
  isPending: boolean;
  castUrl: string;
  pageUrl: string;
  error?: Error;
  duration: number;
  position: number;
  positionPending: boolean;
  previouslyWatched: PreviouslyWatched[];
  settings: Settings;
  theme?: string;
}

export interface Actions {
  cast: boolean;
  setIsPlaying: boolean;
  setPosition: number;
  sendWsMessage: any;
  setSettings: any;
  setError: Error;
  setPageUrl: string;
}
