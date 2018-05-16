import glamorous from 'glamorous';
import React from 'react';
import { componentFromStream } from 'recompose';
import { map } from 'rxjs/operators';

import { CastButton } from '../../components/CastButton';
import { MetaCard } from '../../components/MetaCard';
import { CastType } from '../../enums/CastType';
import { store } from '../../store';

const handleCast = (pageUrl: string): void => {
  store.dispatch({ cast: { data: pageUrl, type: CastType.YOUTUBEDL } });
};

const handleStop = () => {
  store.dispatch({ quit: undefined });
};

export const PopupHeader = componentFromStream(props$ =>
  store.pick('isStopped', 'pageUrl', 'meta').pipe(
    map(({ isStopped, pageUrl, meta }) => (
      <Header hasMessage={isStopped}>
        <CastButton
          onClick={!isStopped ? handleStop : handleCast.bind({}, pageUrl)}
          isPlaying={!isStopped}
        />
        {!isStopped && <MetaCard {...meta} />}
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
