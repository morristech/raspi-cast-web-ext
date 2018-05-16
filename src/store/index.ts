import { createStore } from 'lenrix';
import { fromEvent, merge } from 'rxjs';
import { filter, tap } from 'rxjs/operators';
import io from 'socket.io-client';

import { PlaybackStatus } from '../enums/PlaybackStatus';
import { initialState } from './lib/initialState';
import { Actions, State } from './lib/types';
let socket: any;

export const store = createStore<State>(initialState)
  .actionTypes<Actions>()
  .updates(lens => ({
    setState: update => lens.setFields(update),
    setError: error => lens.focusPath('error').setValue(error),
    volume: volume => lens.focusPath('volume').setValue(volume),
    seek: () => lens.focusPath('isPending').setValue(true),
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

    setError: err => console.error(err),
  });

store
  .pluck('castIp')
  .pipe(
    filter(Boolean),
    tap(castIp => {
      socket = io(`http://${castIp}:${process.env.REACT_APP_SOCKET_PORT}`);

      merge(
        fromEvent(socket, 'initialState'),
        fromEvent(socket, 'status'),
        fromEvent(socket, 'position'),
        fromEvent(socket, 'seek'),
      ).subscribe((updates: any) => store.dispatch({ setState: updates }));

      socket.emit('initialState');
    }),
  )
  .subscribe();
