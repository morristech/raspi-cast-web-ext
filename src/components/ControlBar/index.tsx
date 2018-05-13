import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';
import { Control } from './Control';
import { SeekBar } from './SeekBar';
import { Time } from './Time';
import { Volume } from './Volume';

interface ControlBarProps {
  actions: {
    pause: () => void;
    play: () => void;
    setVolume: () => void;
    seek: (e: any) => void;
    slide: (e: any) => void;
  };
  progress: {
    position: number;
    duration: number;
  };
  player: {
    playing: boolean;
    volume: number;
    muted: boolean;
  };
}

export class ControlBar extends React.PureComponent<ControlBarProps> {
  public render(): JSX.Element {
    const { actions, player, progress } = this.props;
    const { play, pause, setVolume, ...seekActions } = actions;

    return (
      <ControlBarWrapper>
        {!player.playing && <Control action={play} icon="play" />}
        {player.playing && <Control action={pause} icon="pause" />}

        <SeekBar progress={progress} actions={seekActions} seekAllowed={true} />

        <Time {...progress} />

        <Volume volume={player.volume} setVolume={setVolume} />
      </ControlBarWrapper>
    );
  }
}

const ControlBarWrapper = glamorous.div<WithTheme>(({ theme }) => ({
  backgroundColor: theme.secondaryColor,
  display: 'flex',
  height: '45px',
  borderRadius: '8px',
  alignItems: 'center',
  padding: '0 10px',
}));
