import { ThemeProvider } from 'glamorous';
import React from 'react';
import { render } from 'react-dom';
import { IntlProvider } from 'react-intl';

import { CastPopup } from './containers/CastPopup';
import { getTranslations } from './helpers/i18n';
import { theme } from './style/theme';

const Popup = () => (
  <IntlProvider
    locale={navigator.language}
    messages={getTranslations()}
    defaultLocale="fr"
  >
    <ThemeProvider theme={theme}>
      <CastPopup />
    </ThemeProvider>
  </IntlProvider>
);

render(<Popup />, document.getElementById('popup-app'));
