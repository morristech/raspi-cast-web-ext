import React from 'react';

interface IconProps {
  name: string;
  size?: number;
}

export const Icon: React.SFC<IconProps> = ({ name, size = 2 }) => {
  return (
    <i
      className={`zmdi zmdi-${name} zmdi-hc-${size}x`}
      style={{ alignSelf: 'center', margin: 'auto auto' }}
    />
  );
};
