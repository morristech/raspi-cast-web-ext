import { css } from 'glamor';
import { ThemeProvider } from 'glamorous';
import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';

import { getTranslations } from './helpers/i18n';
import { PopupLayout } from './Layout/Popup';
import { theme } from './style/theme';

css.global('button::-moz-focus-inner,button::-moz-focus-outer { border: 0; }');
css.global('input::-moz-focus-inner,input::-moz-focus-outer { border: 0; }');

const Popup = () => (
  <IntlProvider
    locale={navigator.language}
    messages={getTranslations()}
    defaultLocale="en"
  >
    <ThemeProvider theme={theme}>
      <PopupLayout />
    </ThemeProvider>
  </IntlProvider>
);

render(<Popup />, document.getElementById('popup-app'));
