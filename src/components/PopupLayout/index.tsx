import glamorous from 'glamorous';
import React from 'react';

import { WithTheme } from '../../style/theme';

export const PopupLayout: React.SFC<{}> = ({ children }) => (
  <Layout>{children}</Layout>
);

const Layout = glamorous.div<WithTheme>(({ theme }) => ({
  width: theme.popupWidth,
  height: theme.popupHeight,
}));
