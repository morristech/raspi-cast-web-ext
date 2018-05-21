import React from 'react';
import RSwitch from 'react-switch';

import { Label } from '../Label';

interface SwitchProps {
  label?: string;
  id?: string;
  value: boolean;
  onChange: (e?: any) => void;
}

export const Switch: React.SFC<SwitchProps> = ({
  label,
  id = 'switch',
  onChange,
  value,
}) => (
  <React.Fragment>
    <Label htmlFor={id}>{label}</Label>
    <RSwitch onChange={onChange} checked={value} id={id} />
  </React.Fragment>
);
