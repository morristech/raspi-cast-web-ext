import React from 'react';
import RSwitch from 'react-switch';

import { InputWrapper } from '../InputWrapper';
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
  <InputWrapper>
    <Label htmlFor={id}>{label}</Label>
    <RSwitch onChange={onChange} checked={value} id={id} />
  </InputWrapper>
);
