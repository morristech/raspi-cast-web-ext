import glamorous from 'glamorous';
import React from 'react';
import { injectIntl } from 'react-intl';

import { OptionsForm } from '../../containers/OptionsForm';
import { noop } from '../../helpers/noop';
import { WithTheme } from '../../style/theme';

export const OptionsLayout = injectIntl<{}>(({ intl }) => (
  <Layout>
    <OptionsForm onSubmit={noop} intl={intl} />
  </Layout>
));

const Layout = glamorous.div<WithTheme>(({ theme }) => ({}));
