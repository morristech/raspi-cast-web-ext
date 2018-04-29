import autobind from 'autobind-decorator';
import glamorous from 'glamorous';
import React from 'react';

import { RangeInput } from '../../Slider';
import { Control } from '../Control';

export const MIN_VOLUME = 0;
export const MAX_VOLUME = 10;

interface VolumeProps {
  volume: number;
  setVolume: (e: any) => void;
  onShow?: () => void;
  style?: any;
}

interface VolumeState {
  visible: boolean;
}

export class Volume extends React.PureComponent<VolumeProps, VolumeState> {
  public state: VolumeState = {
    visible: false,
  };

  private timeoutShow: any = undefined;
  private timeoutHide: any = undefined;

  public componentWillUnmount(): void {
    this.clearTimeoutShow();
  }

  public render(): JSX.Element {
    const { visible } = this.state;

    const { setVolume, style } = this.props;

    return (
      <VolumeWrapper style={style} onMouseMove={this.handleMouseMove}>
        <Control action={this.toggleMute} icon={this.getIconVolume()} />
        <ProgressWrapper visible={visible}>
          <RangeInput
            type="range"
            min={MIN_VOLUME}
            max={MAX_VOLUME}
            // value={volume}
            onChange={setVolume}
            disabled={false}
            style={{ width: '100%' }}
          />
        </ProgressWrapper>
      </VolumeWrapper>
    );
  }

  @autobind
  private handleMouseMove(): void {
    this.clearTimeoutHide();
    this.clearTimeoutShow();
    this.timeoutShow = setTimeout(() => {
      if (this.props.onShow) {
        this.props.onShow();
      }
      this.setState(
        {
          visible: true,
        },
        () => {
          this.timeoutHide = setTimeout(() => {
            this.setState({ visible: false });
          }, 1000);
        },
      );
    }, 100);
  }

  @autobind
  private toggleMute(): void {
    this.props.setVolume(
      this.props.volume === MIN_VOLUME ? MAX_VOLUME : MIN_VOLUME,
    );
  }

  @autobind
  private getIconVolume(): string {
    let icon = 'volume-up';
    const volume = this.props.volume;

    if (volume < 5) {
      icon = 'volume-down';
    }

    if (volume === MIN_VOLUME) {
      icon = 'volume-mute';
    }

    return icon;
  }

  @autobind
  private clearTimeoutShow(): void {
    clearTimeout(this.timeoutShow);
    this.timeoutShow = undefined;
  }

  @autobind
  private clearTimeoutHide(): void {
    clearTimeout(this.timeoutHide);
    this.timeoutHide = undefined;
  }
}

const VolumeWrapper = glamorous.div({
  padding: '2px 0',
  borderRadius: '2px',
  marginLeft: '5px',
  display: 'flex',
  justifyContent: 'flex-start',
  flexDirection: 'row',
});

const ProgressWrapper = glamorous.div<{ visible: boolean }>(({ visible }) => ({
  zIndex: 1,
  width: visible ? '100px' : 0,
  opacity: visible ? 1 : 0,
  transition: 'width 0.2s, opacity 0.2s',
}));
