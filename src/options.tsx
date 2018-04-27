import { css } from 'glamor';
import { ThemeProvider } from 'glamorous';
import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';

import OptionsForm from './containers/OptionsForm';
import { getTranslations } from './helpers/i18n';
import { theme } from './theme';

css.insert('input::-moz-focus-inner,input::-moz-focus-outer { border: 0; }');

/* tslint:disable */
const onSubmit = () => {};
/* tslint:enable */

const Options = () => (
  <IntlProvider
    locale={navigator.language}
    messages={getTranslations()}
    defaultLocale="fr"
  >
    <ThemeProvider theme={theme}>
      <OptionsForm onSubmit={onSubmit} />
    </ThemeProvider>
  </IntlProvider>
);

render(<Options />, document.getElementById('options-app'));
