import glamorous from 'glamorous';

import { WithTheme } from '../../../style/themes/Theme';

export const InputWrapper = glamorous.div<WithTheme>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  width: '100%',
  margin: '40px 0 0 0%',
  padding: '10px 10px 10px 10px',
  position: 'relative',
}));
