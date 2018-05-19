import { ThemeProvider as GlamorousThemeProvider } from 'glamorous';
import React from 'react';
import { componentFromStream } from 'recompose';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { store } from '../../store';
import { baseTheme } from '../../style/themes/base';
import { darkTheme } from '../../style/themes/dark';
import { lightTheme } from '../../style/themes/light';
import { BaseTheme, ColorTheme } from '../../style/themes/Theme';

export const getTheme = (
  themeName: string | undefined,
): BaseTheme & ColorTheme => {
  switch (themeName) {
    case 'dark':
      return { ...darkTheme, ...baseTheme };
    case 'light':
    default:
      return { ...lightTheme, ...baseTheme };
  }
};

export const ThemeProvider = componentFromStream<{ children: any }>(props$ =>
  combineLatest(store.pluck('theme'), props$).pipe(
    map(([themeName, { children }]) => (
      <GlamorousThemeProvider theme={getTheme(themeName)}>
        {children}
      </GlamorousThemeProvider>
    )),
  ),
);
