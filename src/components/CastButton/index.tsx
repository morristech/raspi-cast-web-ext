import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/themes/Theme';
import { Icon } from '../Icon';

interface CastButtonProps {
  isPlaying: boolean;
  onClick: (e: any) => void;
  style?: any;
}
/* I use before and after class here because i was unbale to figure out how
 * to use :focus:before selector with glamorous.
 */
export const CastButton: React.SFC<CastButtonProps> = ({
  isPlaying,
  onClick,
  style,
}) => (
  <ButtonWrapper style={style}>
    <Button onClick={onClick} isPlaying={isPlaying}>
      <span className="before" />
      <span className="after" />
      <Icon name={isPlaying ? 'stop' : 'cast'} size={5} />
    </Button>
  </ButtonWrapper>
);

const ButtonWrapper = glamorous.div({
  textAlign: 'center',
});

const Button = glamorous.button<WithTheme & { isPlaying: boolean }>(
  ({ theme, isPlaying }) => ({
    backgroundColor: theme.secondaryColor,
    border: '0 none',
    borderRadius: '50%',
    color: theme.textColor,
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
    flex: isPlaying ? 0 : 1,
    selfAlign: isPlaying ? 'flex-start' : 'center',

    ':hover': {
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
  }),
);
