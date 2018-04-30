import { createStore } from 'lenrix';
import { QueueingSubject } from 'queueing-subject';
import { Subscription } from 'rxjs';
import websocketConnect from 'rxjs-websockets';
import { delay, filter, map, retryWhen, switchMap } from 'rxjs/operators';

import { Ports } from '../enums/Port';
import { SocketMessage } from '../enums/SocketMessage';
import { Actions, State } from './type';

const initialState: State = {
  isPlaying: false,
  isPending: true,
  positionPending: false,
  position: 0,
  duration: 0,
  settings: {
    castIp: '',
    maxVolume: 5000,
    minVolume: 0,
  },
  pageUrl: '',
  castUrl: '',
  theme: 'default',
  previouslyWatched: [],
};

const wsSubject = new QueueingSubject<string>();

export const store = createStore<State>(initialState)
  .actionTypes<Actions>()
  .updates(lens => ({
    setIsPlaying: isPlaying => lens.focusPath('isPlaying').setValue(isPlaying),
    setError: error => lens.focusPath('error').setValue(error),
    setPosition: position => lens.focusPath('position').setValue(position),
    setSettings: settings => lens.focusPath('settings').setValue(settings),
    cast: isPlaying => lens.focusPath('isPlaying').setValue(isPlaying),
    setPageUrl: pageUrl => lens.focusPath('pageUrl').setValue(pageUrl),
  }))
  .sideEffects({
    setSettings: settings => browser.storage.local.set({ settings }),
    sendWsMessage: wsSubject.next,
    setError: console.error,
  });

export const connectToWsServer = (): Subscription => {
  return store
    .focusPath('settings')
    .pluck('castIp')
    .pipe(
      filter(Boolean),
      switchMap(castIp => {
        const { messages } = websocketConnect(
          `ws://${castIp}:${Ports.UPDATE_PORT}`,
          wsSubject,
        );
        return messages.pipe(retryWhen(errors => errors.pipe(delay(1000))));
      }),
      map(message => JSON.parse(message)),
    )
    .subscribe(onNewMessage, onWsError);
};

export const initPageUrl = () => {
  browser.tabs
    .query({
      active: true,
      windowId: (browser.windows as any).WINDOW_ID_CURRENT,
    })
    .then(([tabInfo]) =>
      store.dispatch({
        setPageUrl: escape(tabInfo.url as string),
      }),
    );
};

export const initSettings = () => {
  browser.storage.local.get('settings').then(({ settings }) =>
    store.dispatch({
      setSettings: settings,
    }),
  );
};

const onNewMessage = ({ messageType, playbackStatus, position }: any) => {
  switch (messageType) {
    case SocketMessage.STATUS:
      store.dispatch({ setIsPlaying: playbackStatus === 'Playing' });
      break;
    case SocketMessage.POSITION:
      if (!store.currentState.positionPending) {
        const duration = store.currentState.duration;
        if (position < duration) {
          store.dispatch({
            setPosition: Math.floor(position / duration * (100 - 0) + 0),
          });
        }
      }
      break;
    default:
      break;
  }
};

const onWsError = (error: Error) => {
  store.dispatch({ setError: error });
};
