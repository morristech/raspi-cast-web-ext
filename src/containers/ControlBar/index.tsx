import glamorous from 'glamorous';
import React from 'react';
import { componentFromStream } from 'recompose';
import { map } from 'rxjs/operators';

import { Control } from '../../components/Control';
import { SeekBar } from '../../components/SeekBar';
import { Time } from '../../components/Time';
import { Volume } from '../../components/Volume';
import { store } from '../../store';
import { WithTheme } from '../../style/theme';

export const ControlBar = componentFromStream(props$ =>
  store
    .pick(
      'duration',
      'isPlaying',
      'muted',
      'position',
      'volume',
      'minVolume',
      'maxVolume',
    )
    .pipe(
      map(({ duration, position, ...props }) => ({
        ...props,
        progress: {
          duration,
          position,
        },
        actions: {
          pause: () => store.dispatch({ pause: undefined }),
          play: () => store.dispatch({ play: undefined }),
          setVolume: (volume: number) => store.dispatch({ volume }),
          seek: console.log,
        },
      })),
      map(({ isPlaying, progress, volume, actions, maxVolume, minVolume }) => (
        <ControlBarWrapper>
          {!isPlaying && (
            <Control action={actions.play} icon="play" disabled={false} />
          )}
          {isPlaying && (
            <Control action={actions.pause} icon="pause" disabled={false} />
          )}

          <SeekBar
            progress={progress}
            seek={actions.seek}
            seekAllowed={isPlaying}
          />

          <Time {...progress} />

          <Volume
            volume={volume}
            setVolume={actions.setVolume}
            maxVolume={maxVolume}
            minVolume={minVolume}
            disabled={!isPlaying}
          />
        </ControlBarWrapper>
      )),
    ),
);

const ControlBarWrapper = glamorous.div<WithTheme>(({ theme }) => ({
  backgroundColor: theme.secondaryColor,
  display: 'flex',
  height: '45px',
  borderRadius: '8px',
  alignItems: 'center',
  padding: '0 10px',
}));
