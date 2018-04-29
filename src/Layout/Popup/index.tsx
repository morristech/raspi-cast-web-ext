import glamorous from 'glamorous';
import React from 'react';

import { CastButton } from '../../components/CastButton';
import { ControlBar } from '../../components/ControlBar';
import { WithTheme } from '../../style/theme';

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
  <Layout>
    <CastButton />
    <ControlBar {...props} />
  </Layout>
);

const Layout = glamorous.div<WithTheme>(({ theme }) => ({
  overflowX: 'hidden',
  width: theme.popupWidth,
  height: theme.popupHeight,
}));
