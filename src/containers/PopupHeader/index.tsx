import glamorous from 'glamorous';
import { CastType } from 'raspi-cast-common';
import React from 'react';
import { componentFromStream } from 'recompose';
import { map, tap } from 'rxjs/operators';

import { Card } from '../../components/Card';
import { CastButton } from '../../components/CastButton';
import { Spinner } from '../../components/Spinner';
import { store } from '../../store';

const handleCast = (pageUrl: string): void => {
  store.dispatch({ cast: { data: pageUrl, type: CastType.YOUTUBEDL } });
};

const handleStop = () => {
  store.dispatch({ quit: undefined });
};

export const PopupHeader = componentFromStream(props$ =>
  store.pick('isStopped', 'pageUrl', 'meta', 'isPending').pipe(
    tap(foo => console.log('POPUPHEADER', foo)),
    map(({ isStopped, pageUrl, meta, isPending }) => (
      <Header isStopped={isStopped}>
        {!isPending && (
          <React.Fragment>
            <CastButton
              onClick={!isStopped ? handleStop : handleCast.bind({}, pageUrl)}
              isPlaying={!isStopped}
            />
            {!isStopped && <Card {...meta} />}
          </React.Fragment>
        )}
        {isPending && <Spinner />}
      </Header>
    )),
  ),
);

const Header = glamorous.header<{ isStopped: boolean }>(({ isStopped }) => ({
  height: isStopped ? '100%' : 'inherits',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  padding: '0 40px',
}));
