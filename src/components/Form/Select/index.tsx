import React from 'react';
import { injectIntl } from 'react-intl';

import { InputWrapper } from '../InputWrapper';
import { Label } from '../Label';

interface SelectProps {
  options: Array<{ label: string; value: string }>;
  name: string;
  label?: string;
}

export const Select = injectIntl<SelectProps>(
  ({ label, name, options = [], intl }) => (
    <InputWrapper>
      {!!label && <Label>{label}</Label>}
      <select name={name}>
        {options.map((opt, idx) => (
          <option key={idx} value={opt.value}>
            {intl.formatMessage({ id: opt.label })}
          </option>
        ))}
      </select>
    </InputWrapper>
  ),
);
