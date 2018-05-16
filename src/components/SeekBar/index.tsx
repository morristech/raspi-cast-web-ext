import autobind from 'autobind-decorator';
import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';
import { RangeInput } from '../Slider';

interface SeekBarProps {
  seek: (e: any) => void;
  position: number;
  duration: number;
  seekAllowed: boolean;
}

interface SeekBarState {
  position: number;
}

export class SeekBar extends React.PureComponent<SeekBarProps, SeekBarState> {
  public state: SeekBarState = {
    position: this.props.position,
  };

  public static getDerivedStateFromProps(
    { position, seekAllowed }: SeekBarProps,
    state: SeekBarState,
  ): Partial<SeekBarState> {
    return seekAllowed ? { position } : state;
  }

  @autobind
  private handleChange(evt: any): void {
    this.setState({ position: evt.target.value }, () =>
      this.props.seek(this.state.position),
    );
  }

  public render(): JSX.Element {
    const { duration, seekAllowed = true } = this.props;

    return (
      <SeekbarContainer>
        <RangeInput
          type="range"
          min={0}
          max={duration}
          value={this.state.position}
          onChange={this.handleChange}
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
  cursor: 'pointer',
}));
