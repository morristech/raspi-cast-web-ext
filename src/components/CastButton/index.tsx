import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';

interface CastButtonProps {
  isCasting?: boolean;
}

export const CastButton: React.SFC<CastButtonProps> = () => (
  <ButtonWrapper>
    <Button>
      <span className="foo" />
      <span className="bar" />
      <i
        className="zmdi zmdi-cast zmdi-hc-5x"
        style={{ alignSelf: 'center', margin: 'auto auto' }}
      />
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
    '& .foo': {
      animation: `${theme.beat} 1.5s ease-out infinite`,
    },

    '& .bar': {
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
