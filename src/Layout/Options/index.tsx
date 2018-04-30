import glamorous from 'glamorous';
import React from 'react';
import { IntlProvider } from 'react-intl';

import { OptionsForm } from '../../containers/OptionsForm';
import { ThemeProvider } from '../../containers/ThemeProvider';
import { getTranslations } from '../../helpers/i18n';
import { noop } from '../../helpers/noop';
import { WithTheme } from '../../style/theme';

export const OptionsLayout: React.SFC<{}> = () => (
  <IntlProvider
    locale={navigator.language}
    messages={getTranslations()}
    defaultLocale="en"
  >
    <ThemeProvider>
      <Layout>
        <OptionsForm onSubmit={noop} />
      </Layout>
    </ThemeProvider>
  </IntlProvider>
);

const Layout = glamorous.div<WithTheme>(({ theme }) => ({}));
