import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';
import { InputWrapper } from '../InputWrapper';

interface TextInputProps {
  type?: string;
  value?: string;
  label?: string;
  name: string;
}

// export class TextInput extend React.PureComponent<TextInputProps> {
//   public render() {

//     return (
//       <InputWrapper>
//         <Input {...inputProps} />
//           {!!label && <FloatingLabel>{label}</FloatingLabel>}
//         <FocusBorder />
//     </InputWrapper>
//     )
//   }
// }

export const TextInput: React.SFC<TextInputProps> = ({
  label,
  type = 'text',
  ...inputProps
}) => (
  <InputWrapper>
    <Input required={true} type={type} {...inputProps} />
    {!!label && <FloatingLabel>{label}</FloatingLabel>}
    <FocusBorder />
  </InputWrapper>
);

const Input = glamorous.input<WithTheme>(({ theme }) => ({
  border: 0,
  borderBottom: '1px solid #ccc',
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
}));

const FocusBorder = glamorous.span<WithTheme>(({ theme }) => ({
  backgroundColor: '#3399FF',
  bottom: '10px',
  height: '2px',
  left: 0,
  position: 'absolute',
  transition: '0.4s',
  width: 0,
}));

const FloatingLabel = glamorous.label({
  left: '10px',
  position: 'absolute',
  top: '20px',
  transition: 'top 0.3s ease-in, transform 0.3s ease-in',
});
