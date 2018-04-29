import glamorous from 'glamorous';
import { QueueingSubject } from 'queueing-subject';
import React from 'react';
import { adopt } from 'react-adopt';

import { CastButton } from '../../components/CastButton';
import { ControlBar } from '../../components/ControlBar';
import { Tab } from '../../containers/Tab';
import { WebSocket } from '../../containers/WebSocket';
import { WithTheme } from '../../style/theme';

const Composed = adopt({
  websocket: (
    <WebSocket
      connectionStatus={0}
      messages={''}
      ws$={new QueueingSubject<string>()}
    />
  ),
  tab: <Tab url="" />,
});

const props = {
  actions: {
    pause: console.log,
    play: console.log,
    setVolume: console.log,
    seek: console.log,
    slide: console.log,
  },
  progress: {
    seekProgress: 34,
    fluxDuration: 342424,
  },
  player: {
    playing: false,
    volume: 89,
    muted: false,
    loading: false,
    error: false,
  },
};

export const PopupLayout: React.SFC<{}> = ({ children }) => (
  <Composed>
    {() => (
      <Layout>
        <CastButton />
        <ControlBar {...props} />
      </Layout>
    )}
  </Composed>
);

const Layout = glamorous.div<WithTheme>(({ theme }) => ({
  overflowX: 'hidden',
  width: theme.popupWidth,
  height: theme.popupHeight,
}));
