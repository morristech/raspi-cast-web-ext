import glamorous, { withTheme } from 'glamorous';
import React from 'react';
import Spinkit from 'react-spinkit';

import { WithTheme } from '../../style/theme';

interface SpinnerProps {
  name?: any;
}

export const Spinner = withTheme<WithTheme & SpinnerProps>(
  ({ name = 'pacman', theme }: WithTheme & SpinnerProps) => {
    return (
      <SpinnerWrapper>
        <Spinkit name={name} color={theme.spinnerColor} />
      </SpinnerWrapper>
    );
  },
);

const SpinnerWrapper = glamorous.div({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
});
