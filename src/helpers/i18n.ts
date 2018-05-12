import { addLocaleData, IntlProvider } from 'react-intl';
import enData from 'react-intl/locale-data/en';
import frData from 'react-intl/locale-data/fr';

import en from '../lang/en.json';
import fr from '../lang/fr.json';

addLocaleData([...enData, ...frData]);

export const getTranslations = () => {
  switch (navigator.language) {
    case 'fr':
      return fr;
    case 'en':
    default:
      return en;
  }
};

const { intl } = new IntlProvider(
  {
    locale: navigator.language,
    messages: getTranslations(),
    defaultLocale: 'en',
  },
  {},
).getChildContext();

export default intl;
