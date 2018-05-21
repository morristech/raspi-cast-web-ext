import glamorous from 'glamorous';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { componentFromStream } from 'recompose';
import { filter, map, tap } from 'rxjs/operators';

import { ControlBar } from '../../containers/ControlBar';
import { IpForm } from '../../containers/IpForm';
import { PopupHeader } from '../../containers/PopupHeader';
import { getTheme, ThemeProvider } from '../../containers/ThemeProvider';
import { getTranslations } from '../../helpers/i18n';
import { store } from '../../store';
import { WithTheme } from '../../style/themes/Theme';

export const PopupLayout = componentFromStream(props$ =>
  store.pick('isPlaying', 'theme', 'isReady', 'castIp').pipe(
    tap(
      ({ theme }) =>
        (document.body.style.backgroundColor = getTheme(theme).backgroundColor),
    ),
    filter(({ isReady }) => isReady),
    map(({ isPlaying, theme, castIp }) => (
      <IntlProvider
        locale={navigator.language}
        messages={getTranslations()}
        defaultLocale="en"
      >
        <ThemeProvider>
          <Layout isPlaying={isPlaying}>
            {!castIp && <IpForm />}
            {!!castIp && <PopupHeader />}
            {isPlaying && (
              <Main>
                <ControlBar />
              </Main>
            )}
          </Layout>
        </ThemeProvider>
      </IntlProvider>
    )),
  ),
);

const Layout = glamorous.div<WithTheme & { isPlaying: boolean }>(
  ({ theme, isPlaying }) => ({
    overflowX: 'hidden',
    transition: 'height 0.3s linear, width 0.3s linear',
    width: isPlaying ? theme.popupWidthPlaying : theme.popupWidth,
    height: isPlaying ? theme.popupHeightPlaying : theme.popupHeight,
    backgroundColor: theme.backgroundColor,
    margin: 0,
  }),
);

const Main = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'spaceBetween',
  padding: '0 40px',
});
