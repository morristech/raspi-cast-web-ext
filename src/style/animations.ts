import { css } from 'glamor';

export const beat = css.keyframes({
  '0%': {
    opacity: 0.8,
    transform: 'scale(1)',
  },
  '70%': {
    opacity: 0,
    transform: 'scale(1.5)',
  },
  '100%': {
    opacity: 0,
  },
});
