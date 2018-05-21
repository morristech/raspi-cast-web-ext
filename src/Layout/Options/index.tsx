import glamorous from 'glamorous';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { OptionsForm } from '../../containers/OptionsForm';
import { ThemeProvider } from '../../containers/ThemeProvider';
import { getTranslations } from '../../helpers/i18n';
import { WithTheme } from '../../style/themes/Theme';

export const OptionsLayout: React.SFC<{}> = () => (
  <IntlProvider
    locale={navigator.language}
    messages={getTranslations()}
    defaultLocale="en"
  >
    <ThemeProvider>
      <Layout>
        <OptionsForm />
      </Layout>
    </ThemeProvider>
  </IntlProvider>
);

const Layout = glamorous.div<WithTheme>(({ theme }) => ({}));
