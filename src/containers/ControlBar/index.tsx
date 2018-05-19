import glamorous from 'glamorous';
import React from 'react';
import { componentFromStream } from 'recompose';
import { map } from 'rxjs/operators';

import { Control } from '../../components/Control';
import { SeekBar } from '../../components/SeekBar';
import { Time } from '../../components/Time';
import { Volume } from '../../components/Volume';
import { store } from '../../store';
import { WithTheme } from '../../style/themes/Theme';

const actions = {
  pause: () => store.dispatch({ pause: undefined }),
  play: () => store.dispatch({ play: undefined }),
  setVolume: (volume: number) => store.dispatch({ volume }),
  seek: (seek: number) => store.dispatch({ seek }),
};

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
      'isSeeking',
    )
    .pipe(
      map(
        ({
          isPlaying,
          duration,
          position,
          volume,
          maxVolume,
          minVolume,
          isSeeking,
        }) => (
          <ControlBarWrapper>
            {!isPlaying && (
              <Control action={actions.play} icon="play" disabled={false} />
            )}
            {isPlaying && (
              <Control action={actions.pause} icon="pause" disabled={false} />
            )}

            <SeekBar
              duration={duration}
              position={position}
              seek={actions.seek}
              seekAllowed={!isSeeking}
            />

            <Time duration={duration} position={position} />

            <Volume
              volume={volume}
              setVolume={actions.setVolume}
              maxVolume={maxVolume}
              minVolume={minVolume}
              disabled={!isPlaying}
            />
          </ControlBarWrapper>
        ),
      ),
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
