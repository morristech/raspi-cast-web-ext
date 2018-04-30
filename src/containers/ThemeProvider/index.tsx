import { ThemeProvider as GlamorousThemeProvider } from 'glamorous';
import React from 'react';
import { componentFromStream } from 'recompose';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';

import { store } from '../../store';
import { theme } from '../../style/theme';

const getTheme = (themeName: string | undefined) => theme;

export const ThemeProvider = componentFromStream<{ children: any }>(props$ =>
  combineLatest(store.pluck('theme'), props$).pipe(
    tap(foo => console.log('THEME', foo)),
    map(([themeName, { children }]) => (
      <GlamorousThemeProvider theme={getTheme(themeName)}>
        {children}
      </GlamorousThemeProvider>
    )),
  ),
);
