import { createStore } from 'lenrix';

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
  isCasting: boolean;
  isPending: boolean;
  castUrl: string;
  previouslyWatched: PreviouslyWatched[];
  settings: Settings;
}

const initialState: State = {
  isCasting: false,
  isPending: true,
  settings: {
    castIp: '',
    maxVolume: 5000,
    minVolume: 0,
  },
  castUrl: '',
  previouslyWatched: [],
};

export const store = createStore<State>(initialState)
  .actionTypes<{
    setSettings: any;
  }>()
  .updates(lens => ({
    setSettings: settings => {
      return lens.focusPath('settings').setValue(settings);
    },
  }))
  .sideEffects({
    setSettings: settings => {
      browser.storage.local.set({ settings });
    },
  });

browser.storage.local.get('settings').then(({ settings }) =>
  store.dispatch({
    setSettings: settings,
  }),
);
