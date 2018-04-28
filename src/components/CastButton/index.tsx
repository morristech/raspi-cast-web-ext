import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';
import { Icon } from '../Icon';

interface CastButtonProps {
  isCasting?: boolean;
}
/* I use before and after class here because i was unbale to figure out how
 * to use :focus:before selector with glamorous.
 */
export const CastButton: React.SFC<CastButtonProps> = () => (
  <ButtonWrapper>
    <Button>
      <span className="before" />
      <span className="after" />
      <Icon name="cast" size={5} />
    </Button>
  </ButtonWrapper>
);

const ButtonWrapper = glamorous.div({
  textAlign: 'center',
});

const Button = glamorous.button<WithTheme>(({ theme }) => ({
  backgroundColor: theme.secondaryColor,
  border: '0 none',
  borderRadius: '50%',
  color: theme.white,
  display: 'flex',
  height: theme.castButtonWidth,
  lineHeight: theme.castButtonWidth,
  padding: 0,
  position: 'relative',
  textAlign: 'center',
  transition: 'all 0.25s ease-in-out',
  width: theme.castButtonWidth,
  margin: '30px auto',
  cursor: 'pointer',

  ':hover': {
    backgroundColor: theme.primaryColor,
    color: '#fff',
    '& .before': {
      animation: `${theme.beat} 1.5s ease-out infinite`,
    },

    '& .after': {
      animation: `${theme.beat} 1.5s ease-out 0.4s infinite`,
    },
  },

  '& span': {
    backgroundColor: theme.primaryColor,
    borderRadius: '50%',
    content: '',
    display: 'block',
    height: '100%',
    left: 0,
    opacity: 0,
    position: 'absolute',
    top: 0,
    transition: 'all 0.25s ease-in-out',
    width: '100%',
    zIndex: -1,
  },
}));
