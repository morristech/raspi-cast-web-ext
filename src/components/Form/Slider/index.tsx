import autobind from 'autobind-decorator';
import { css } from 'glamor';
import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../../style/themes/Theme';
import { InputWrapper } from '../InputWrapper';

css.insert('::-moz-range-track { background: #d7dcdf; border: 0; }');

interface SliderProps {
  label?: string;
  value?: number;
  onInput?: (value: number) => void;
  step?: number;
  withTooltip?: boolean;
  name: string;
  min: number;
  max: number;
}

interface SliderState {
  value: number;
  init: boolean;
}

export class Slider extends React.PureComponent<SliderProps, SliderState> {
  public state: SliderState = {
    value: this.props.value || this.props.min,
    init: false,
  };

  public render(): JSX.Element {
    const { label, withTooltip = true, ...inputProps } = this.props;

    return (
      <InputWrapper>
        {!!label && <label>{label}</label>}
        <RangeInput
          {...inputProps}
          type="range"
          value={this.state.value}
          onInput={this.handleInput}
          innerRef={this.setRef}
        />
        {withTooltip && <Value>{this.state.value}</Value>}
      </InputWrapper>
    );
  }

  @autobind
  private setRef(element: any): void {
    if (!this.state.init && !this.props.value) {
      setTimeout(() => {
        this.setState({ value: element.value, init: true });
      }, 500);
    }
  }

  @autobind
  private handleInput(e: any): void {
    this.setState(
      {
        value: Number(e.target.value),
      },
      () => !!this.props.onInput && this.props.onInput(this.state.value),
    );
  }
}

const Value = glamorous.span<WithTheme>(({ theme }) => ({
  background: theme.secondaryColor,
  borderRadius: '3px',
  color: theme.textColor,
  display: 'inline-block',
  lineHeight: '20px',
  marginLeft: '8px',
  padding: '5px 10px',
  position: 'relative',
  textAlign: 'center',
  width: '60px',

  ':after': {
    borderBottom: '7px solid transparent',
    borderRight: `7px solid ${theme.secondaryColor}`,
    borderTop: '7px solid transparent',
    content: '',
    height: 0,
    left: '-7px',
    position: 'absolute',
    top: '8px',
    width: 0,
  },
}));

export const RangeInput = glamorous.input<WithTheme>(({ theme }) => ({
  alignSelf: 'center',
  background: theme.thirdaryColor,
  borderRadius: '5px',
  height: '10px',
  margin: 0,
  outline: 'none',
  padding: 0,
  width: 'calc(100% - (73px))',

  '::-moz-range-thumb': {
    background: theme.thirdaryColor,
    border: 0,
    borderRadius: '50%',
    cursor: 'pointer',
    height: '20px',
    transition: 'background 0.15s ease-in-out',
    width: '20px',
  },

  '::-moz-range-thumb:hover': {
    background: theme.primaryColor,
  },

  ':active::-moz-range-thumb': {
    background: theme.primaryColor,
  },
}));
