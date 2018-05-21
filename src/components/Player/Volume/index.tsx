import autobind from 'autobind-decorator';
import glamorous from 'glamorous';
import React from 'react';

import { RangeInput } from '../../Form';
import { Control } from '../Control';

interface VolumeProps {
  maxVolume: number;
  minVolume: number;
  volume: number;
  setVolume: (e: any) => void;
  onShow?: () => void;
  style?: any;
  disabled?: boolean;
}

interface VolumeState {
  visible: boolean;
  volume: number;
}

export class Volume extends React.PureComponent<VolumeProps, VolumeState> {
  public state: VolumeState = {
    visible: false,
    volume: this.props.volume,
  };

  private timeoutShow: any = undefined;
  private timeoutHide: any = undefined;

  public static getDerivedStateFromProps({
    volume,
  }: VolumeProps): Partial<VolumeState> {
    return { volume };
  }

  public componentWillUnmount(): void {
    this.clearTimeoutShow();
  }

  public render(): JSX.Element {
    const { visible, volume } = this.state;

    const { maxVolume, minVolume, style, disabled } = this.props;

    return (
      <VolumeWrapper style={style} onMouseMove={this.handleMouseMove}>
        <Control action={this.toggleMute} icon={this.getIconVolume()} />
        <ProgressWrapper visible={visible}>
          <RangeInput
            type="range"
            min={minVolume}
            max={maxVolume}
            step={0.01}
            value={volume}
            onChange={this.handleVolumeChange}
            disabled={disabled}
            style={{ width: '100%' }}
          />
        </ProgressWrapper>
      </VolumeWrapper>
    );
  }

  @autobind
  private handleVolumeChange(evt: any): void {
    this.setState({ volume: evt.target.value }, () =>
      this.props.setVolume(this.state.volume),
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
    const volume =
      this.props.volume === this.props.minVolume
        ? this.props.maxVolume
        : this.props.minVolume;

    this.setState({ volume }, () => this.props.setVolume(this.state.volume));
  }

  @autobind
  private getIconVolume(): string {
    let icon = 'volume-up';
    const volume = this.props.volume;

    if (volume < 5) {
      icon = 'volume-down';
    }

    if (volume === this.props.minVolume) {
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
