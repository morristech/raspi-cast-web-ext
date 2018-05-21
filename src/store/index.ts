import { createStore } from 'lenrix';
import { PlaybackStatus } from 'raspi-cast-common';
import { fromEvent, merge } from 'rxjs';
import { delay, filter, tap } from 'rxjs/operators';
import io from 'socket.io-client';

import intl from '../helpers/i18n';
import { initialState } from './lib/initialState';
import { Actions, State } from './lib/types';
let socket: any;

export const store = createStore<State>(initialState)
  .actionTypes<Actions>()
  .updates(lens => ({
    setState: update => lens.setFields(update),
    error: error => lens.setFields({ error, isPending: false }),
    volume: volume => lens.focusPath('volume').setValue(volume),
    cast: () => lens.focusPath('isPending').setValue(true),
    initialState: () => lens.focusPath('isPending').setValue(true),
    seek: () => lens.focusPath('isSeeking').setValue(true),
  }))
  .compute(({ status }) => ({
    isPlaying: status === PlaybackStatus.PLAYING,
    isStopped: status === PlaybackStatus.STOPPED,
  }))
  .sideEffects({
    cast: castOptions => socket.emit('cast', castOptions),
    play: () => socket.emit('play'),
    pause: () => socket.emit('pause'),
    volume: volume => socket.emit('volume', volume),
    seek: position => socket.emit('seek', position),
    quit: () => socket.emit('quit'),

    error: err => {
      if (store.currentState.notification) {
        browser.notifications.create('error', {
          title: intl.formatMessage({ id: 'error.notification' }),
          message: err,
          type: 'basic',
          iconUrl: browser.extension.getURL('icons/ic_cast_3x.png'),
        });
      }
    },
  });

store
  .pluck('castIp')
  .pipe(
    filter(Boolean),
    tap(castIp => {
      socket = io(`http://${castIp}:${process.env.REACT_APP_SOCKET_PORT}`);
      fromEvent(socket, 'fail').subscribe(err =>
        store.dispatch({ error: intl.formatMessage({ id: `error.${err}` }) }),
      );

      merge(
        fromEvent(socket, 'initialState'),
        fromEvent(socket, 'status'),
        fromEvent(socket, 'position'),
        fromEvent(socket, 'seek').pipe(delay(4000)),
      ).subscribe((updates: any) => store.dispatch({ setState: updates }));

      socket.emit('initialState');
    }),
  )
  .subscribe();
