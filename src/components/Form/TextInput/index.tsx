import glamorous from 'glamorous';
import React from 'react';
import { FieldProp } from 'rx-react-form';

import { WithTheme } from '../../../style/themes/Theme';
import { InputWrapper } from '../InputWrapper';

interface TextInputProps {
  type?: string;
  value?: string;
  label?: string;
  name: string;
  meta?: FieldProp;
}

export const TextInput: React.SFC<TextInputProps> = ({
  label,
  type = 'text',
  meta,
  ...inputProps
}) => (
  <InputWrapper>
    <Input required={true} type={type} error={!!meta!.error} {...inputProps} />
    {!!label && <FloatingLabel error={!!meta!.error}>{label}</FloatingLabel>}
    <FocusBorder error={!!meta!.error} />
  </InputWrapper>
);

const Input = glamorous.input<WithTheme & { error: boolean }>(
  ({ theme, error }) => ({
    border: 0,
    borderBottom: `1px solid ${error ? theme.errorColor : theme.thirdaryColor}`,
    padding: '7px 0',
    width: '100%',

    ':focus ~ span': {
      transition: '0.4s',
      width: '100%',
    },

    ':focus ~ label, :valid ~ label': {
      top: '-5px',
      transform: 'scale(0.9)',
    },

    ':valid ~ label': {
      top: '-5px',
      transform: 'scale(0.9)',
    },
  }),
);

const FocusBorder = glamorous.span<WithTheme & { error?: boolean }>(
  ({ theme, error }) => ({
    backgroundColor: error ? theme.errorColor : theme.primaryColor,
    bottom: '10px',
    height: '2px',
    left: 0,
    position: 'absolute',
    transition: '0.4s',
    width: 0,
  }),
);

const FloatingLabel = glamorous.label<WithTheme & { error?: boolean }>(
  ({ theme, error }) => ({
    color: error ? theme.errorColor : 'inherit',
    left: '10px',
    position: 'absolute',
    top: '20px',
    transition: 'top 0.3s ease-in, transform 0.3s ease-in',
  }),
);
