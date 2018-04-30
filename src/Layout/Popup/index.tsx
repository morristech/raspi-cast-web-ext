import glamorous from 'glamorous';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { ControlBar } from '../../components/ControlBar';
import { PopupHeader } from '../../containers/PopupHeader';
import { ThemeProvider } from '../../containers/ThemeProvider';
import { getTranslations } from '../../helpers/i18n';
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
  <IntlProvider
    locale={navigator.language}
    messages={getTranslations()}
    defaultLocale="en"
  >
    <ThemeProvider>
      <Layout>
        <PopupHeader />
        <ControlBar {...props} />
      </Layout>
    </ThemeProvider>
  </IntlProvider>
);

const Layout = glamorous.div<WithTheme>(({ theme }) => ({
  overflowX: 'hidden',
  width: theme.popupWidth,
  height: theme.popupHeight,
}));
