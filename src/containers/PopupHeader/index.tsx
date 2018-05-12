import glamorous from 'glamorous';
import React from 'react';
import { componentFromStream } from 'recompose';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { CastButton } from '../../components/CastButton';
import { store } from '../../store';

const handleCast = (pageUrl: string): void => {
  store.dispatch({ cast: pageUrl });
};

export const PopupHeader = componentFromStream(props$ =>
  combineLatest(store.pluck('isPlaying'), store.pluck('pageUrl')).pipe(
    tap(console.log),
    map(([isPlaying, pageUrl]) => (
      <Header hasMessage={isPlaying}>
        <CastButton
          onClick={handleCast.bind({}, pageUrl)}
          isPlaying={isPlaying}
        />
      </Header>
    )),
  ),
);

const Header = glamorous.header<{ hasMessage: boolean }>(({ hasMessage }) => ({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'spaceBetween',
  padding: '0 40px',
}));
