import autobind from 'autobind-decorator';
import glamorous from 'glamorous';
import React from 'react';

import { noop } from '../../../helpers/noop';
import { WithTheme } from '../../../style/themes/Theme';
import { Icon } from '../../Icon';

interface ControlProps {
  action: (...args: any[]) => void;
  icon: string;
  disabled?: boolean;
  active?: boolean;
}

export class Control extends React.PureComponent<ControlProps> {
  public render(): JSX.Element {
    const { icon, active, disabled } = this.props;

    return (
      <ControlWrapper disabled={disabled} onClick={this.handleClick}>
        <Icon name={icon} active={active} />
      </ControlWrapper>
    );
  }

  @autobind
  private handleClick(evt: any): void {
    const { action = noop, disabled } = this.props;

    if (!disabled) {
      action(evt);
    }
  }
}

const ControlWrapper = glamorous.div<WithTheme & { disabled?: boolean }>(
  ({ disabled, theme }) => ({
    margin: '0 5px',
    display: 'inline-block',
    cursor: 'pointer',
    textAlign: 'center',
    position: 'relative',
    transition: 'background 0.3s',
    color: theme.textColor,
    fontSize: '25px',
    lineHeight: '20px',
    borderRadius: '50%',
    ':first-child': {
      marginLeft: 0,
    },
    ':last-child': {
      marginRight: 0,
    },
    '& i': {
      cursor: disabled ? 'default' : 'inherit',
      opacity: disabled ? 0.5 : 'inherit',
    },
  }),
);
