import glamorous from 'glamorous';

import { WithTheme } from '../../../style/themes/Theme';

export const InputWrapper = glamorous.div<WithTheme>(({ theme }) => ({
  margin: '40px 0 0 0%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
}));
