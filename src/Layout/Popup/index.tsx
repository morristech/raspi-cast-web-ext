import glamorous from 'glamorous';
import React from 'react';
import { IntlProvider } from 'react-intl';
import { componentFromStream } from 'recompose';
import { map, tap } from 'rxjs/operators';

import { ControlBar } from '../../containers/ControlBar';
import { PopupHeader } from '../../containers/PopupHeader';
import { getTheme, ThemeProvider } from '../../containers/ThemeProvider';
import { getTranslations } from '../../helpers/i18n';
import { store } from '../../store';
import { WithTheme } from '../../style/themes/Theme';

export const PopupLayout = componentFromStream(props$ =>
  store.pick('isPlaying', 'theme').pipe(
    tap(
      ({ theme }) =>
        (document.body.style.backgroundColor = getTheme(theme).backgroundColor),
    ),
    map(({ isPlaying, theme }) => (
      <IntlProvider
        locale={navigator.language}
        messages={getTranslations()}
        defaultLocale="en"
      >
        <ThemeProvider>
          <Layout isPlaying={isPlaying}>
            <PopupHeader />
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
