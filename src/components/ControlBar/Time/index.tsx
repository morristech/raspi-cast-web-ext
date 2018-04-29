import autobind from 'autobind-decorator';
import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../../style/theme';

interface TimeProps {
  start: number;
  remaining: number;
  end: number;
  style?: any;
}

interface TimeState {
  displayRemaining: boolean;
}

export class Time extends React.PureComponent<TimeProps, TimeState> {
  public state: TimeState = {
    displayRemaining: false,
  };

  public render(): JSX.Element {
    const { start = 0, remaining = 0, end = 0, style } = this.props;

    const { displayRemaining } = this.state;

    return (
      <TimeWrapper style={style} onClick={this.handleClick}>
        <TimeLabel>
          {displayRemaining
            ? `- ${this.formatSeconds(remaining)}`
            : this.formatSeconds(start)}{' '}
          / {this.formatSeconds(end)}
        </TimeLabel>
      </TimeWrapper>
    );
  }

  @autobind
  private handleClick(): void {
    this.setState({ displayRemaining: !this.state.displayRemaining });
  }

  private formatSeconds(secs: number): string {
    let hours = Math.floor(secs / 3600);
    let minutes = Math.floor((secs - hours * 3600) / 60);
    let seconds = secs - hours * 3600 - minutes * 60;

    hours = hours < 10 ? Number(`0${hours}`) : hours;
    minutes = minutes < 10 ? Number(`0${minutes}`) : minutes;
    seconds = seconds < 10 ? Number(`0${seconds}`) : seconds;

    return `${hours}:${minutes}:${seconds}`;
  }
}

const TimeWrapper = glamorous.div<WithTheme>(({ theme }) => ({
  verticalAlign: '8px',
  cursor: 'pointer',
  color: theme.white,
  opacity: 0.7,
  ':hover': {
    color: theme.primaryColor,
    opacity: 1,
  },
}));

const TimeLabel = glamorous.span({
  display: 'flex',
  width: '110px',
  alignItems: 'center',
  fontSize: '12px',
});
