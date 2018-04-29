import { css } from 'glamor';
import { ThemeProvider } from 'glamorous';
import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';

import OptionsForm from './containers/OptionsForm';
import { getTranslations } from './helpers/i18n';
import { noop } from './helpers/noop';
import { theme } from './style/theme';

css.global('input::-moz-focus-inner,input::-moz-focus-outer { border: 0; }');

const Options = () => (
  <IntlProvider
    locale={navigator.language}
    messages={getTranslations()}
    defaultLocale="en"
  >
    <ThemeProvider theme={theme}>
      <OptionsForm onSubmit={noop} />
    </ThemeProvider>
  </IntlProvider>
);

render(<Options />, document.getElementById('options-app'));
