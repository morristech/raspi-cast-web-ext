import glamorous from 'glamorous';
import React from 'react';
import { componentFromStream } from 'recompose';
import { map } from 'rxjs/operators';

import { CastButton } from '../../components/CastButton';
import { store } from '../../store';

const handleCast = (cast: boolean): void => {
  store.dispatch({ cast });
};

export const PopupHeader = componentFromStream(props$ =>
  store.pluck('isPlaying').pipe(
    map(isPlaying => ({ isPlaying })),
    map(({ isPlaying }) => (
      <Header hasMessage={isPlaying}>
        <CastButton
          onClick={handleCast.bind({}, !isPlaying)}
          style={getCastButtonStyle(isPlaying)}
        />
      </Header>
    )),
  ),
);

const getCastButtonStyle = (isPlaying: boolean) => ({
  flex: isPlaying ? 0 : 1,
  transition: 'flex .3s ease-out',
  selfAlign: isPlaying ? 'flex-start' : 'center',
});

const Header = glamorous.header<{ hasMessage: boolean }>(({ hasMessage }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'spaceBetween',
  padding: '0 40px',
}));
