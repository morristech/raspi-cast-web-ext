import { withTheme } from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';

interface IconProps {
  name: string;
  size?: number;
  active?: boolean;
}

export const Icon = withTheme<WithTheme & IconProps>(
  ({ active, name, size, theme }: WithTheme & IconProps) => {
    return (
      <i
        className={`zmdi zmdi-${name} ${size ? `zmdi-hc-${size}x` : ''}`}
        style={{
          alignSelf: 'center',
          margin: 'auto auto',
          color: active ? theme.primaryColor : 'inherit',
        }}
      />
    );
  },
);
