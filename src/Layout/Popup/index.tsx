import glamorous from 'glamorous';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { PopupBody } from '../../containers/PopupBody';
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
        <PopupBody />
      </Layout>
    </ThemeProvider>
  </IntlProvider>
);

const Layout = glamorous.div<WithTheme>(({ theme }) => ({
  overflowX: 'hidden',
  width: theme.popupWidth,
  height: theme.popupHeight,
}));
