import glamorous from 'glamorous';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { ControlBar } from '../../containers/ControlBar';
import { PopupHeader } from '../../containers/PopupHeader';
import { ThemeProvider } from '../../containers/ThemeProvider';
import { getTranslations } from '../../helpers/i18n';
import { WithTheme } from '../../style/theme';

export const PopupLayout: React.SFC<{}> = ({ children }) => (
  <IntlProvider
    locale={navigator.language}
    messages={getTranslations()}
    defaultLocale="en"
  >
    <ThemeProvider>
      <Layout>
        <PopupHeader />
        <Main>
          <ControlBar />
        </Main>
      </Layout>
    </ThemeProvider>
  </IntlProvider>
);

const Layout = glamorous.div<WithTheme>(({ theme }) => ({
  overflowX: 'hidden',
  width: theme.popupWidth,
  height: theme.popupHeight,
}));

const Main = glamorous.main({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'spaceBetween',
  padding: '0 40px',
});
