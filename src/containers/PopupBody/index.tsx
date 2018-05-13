import glamorous from 'glamorous';
import React from 'react';
import { componentFromStream } from 'recompose';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { ControlBar } from '../../components/ControlBar';
// import { store } from '../../store';
import { isPlaying$, player$, progress$ } from '../../store/selectors';

export const PopupBody = componentFromStream(props$ =>
  combineLatest(isPlaying$, player$, progress$).pipe(
    map(([isPlaying, player, progress]) => ({
      isPlaying,
      progress,
      player,
      actions: {
        pause: console.log,
        play: console.log,
        setVolume: console.log,
        seek: console.log,
        slide: console.log,
      },
    })),
    map(({ isPlaying, ...controlBarProps }) => (
      <Main>{isPlaying && <ControlBar {...controlBarProps} />}</Main>
    )),
  ),
);

const Main = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'spaceBetween',
  padding: '0 40px',
});
