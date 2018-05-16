import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';
import { RangeInput } from '../Slider';

interface SeekBarProps {
  seek: (e: any) => void;
  progress: {
    position: number;
    duration: number;
  };
  seekAllowed: boolean;
}

export class SeekBar extends React.PureComponent<SeekBarProps> {
  public render(): JSX.Element {
    const { seek, progress, seekAllowed = true } = this.props;

    return (
      <SeekbarContainer>
        <RangeInput
          type="range"
          min={0}
          max={progress.duration}
          value={progress.position}
          onChange={seek}
          disabled={!seekAllowed}
          style={{ position: 'absolute', width: '100%' }}
        />
      </SeekbarContainer>
    );
  }
}

const SeekbarContainer = glamorous.div<WithTheme>(({ theme }) => ({
  position: 'relative',
  background: 'rgba(216, 216, 216, 0.5)',
  boxShadow: `2px 1px 10px ${theme.secondaryColor}`,
  width: '100%',
  height: theme.progressHeight,
  borderRadius: '4px',
}));
