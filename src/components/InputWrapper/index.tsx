import glamorous from 'glamorous';

import { WithTheme } from '../../theme';

export const InputWrapper = glamorous.div<WithTheme>(({ theme }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'flex-start',
  margin: '60px 0 0 0%',
  padding: '10px 10px 10px 10px',
  position: 'relative',
}));
