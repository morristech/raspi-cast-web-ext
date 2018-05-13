import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { PlaybackStatus } from '../enums/PlaybackStatus';
import { store } from './index';

export const isPlaying$ = store
  .pluck('status')
  .pipe(map(status => status === PlaybackStatus.PLAYING));

export const isStopped$ = store
  .pluck('status')
  .pipe(map(status => status === PlaybackStatus.STOPPED));

export const meta$ = store.pluck('meta');

export const pageUrl$ = store.pluck('pageUrl');

export const player$ = combineLatest(
  isPlaying$,
  store.pluck('volume'),
  store.pluck('muted'),
).pipe(
  map(([playing, volume, muted]) => ({
    playing,
    volume,
    muted,
  })),
);

export const progress$ = combineLatest(
  store.pluck('duration'),
  store.pluck('position'),
).pipe(
  map(([duration, position]) => ({
    duration,
    position,
  })),
);
