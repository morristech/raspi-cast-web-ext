import { createStore } from 'lenrix';
import { fromEvent, merge } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
import io from 'socket.io-client';

import { initialState } from './lib/initialState';
import { Actions, State } from './lib/types';
let socket: any;

export const store = createStore<State>(initialState)
  .actionTypes<Actions>()
  .updates(lens => ({
    setState: update => {
      const key = Object.keys(update).shift() as keyof State;
      return lens.focusPath(key).setValue(update[key]);
    },
    setError: error => lens.focusPath('error').setValue(error),
  }))
  .sideEffects({
    cast: castOptions => socket.emit('cast', castOptions),
    play: () => socket.emit('play'),
    pause: () => socket.emit('pause'),
    status: () => socket.emit('status'),
    duration: () => socket.emit('duration'),
    position: position => socket.emit('position', position),
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
        // fromEvent(socket, 'play').pipe(map(() => [{ status:  }])),
        // fromEvent(socket, 'pause').pipe(map(() => [{ isPlaying: false }])),
        fromEvent(socket, 'status').pipe(map(status => [{ status }])),
        fromEvent(socket, 'meta').pipe(map(meta => ({ meta: { meta } }))),
        fromEvent(socket, 'duration').pipe(
          map((duration: number) => [
            { duration: Math.round(duration / 1000 / 1000) },
            { isPending: false },
          ]),
        ),
        fromEvent(socket, 'position').pipe(
          map((position: number) => [
            { position: Math.round(position / 1000 / 1000) },
          ]),
        ),
        fromEvent(socket, 'volume').pipe(map((volume: number) => [{ volume }])),
      ).subscribe((updates: any[]) => {
        Object.values(updates).forEach(update => {
          store.dispatch({ setState: update });
        });
      });
      socket.emit('status');
    }),
  )
  .subscribe();
