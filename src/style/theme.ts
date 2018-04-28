import { beat } from './animations';

export interface Theme {
  beat: any;
  castButtonWidth: string;
  popupWidth: number;
  popupHeight: number;
  primaryColor: string;
  secondaryColor: string;
  errorColor: string;
  lightGrey: string;
  white: string;
}

export interface WithTheme {
  theme: Theme;
}

export const theme: Theme = {
  beat,
  castButtonWidth: '8.5em',
  lightGrey: '#d7dcdf',
  primaryColor: '#1abc9c',
  secondaryColor: '#2c3e50',
  errorColor: '#ff0033',
  white: '#fff',
  popupWidth: 400,
  popupHeight: 400,
};
