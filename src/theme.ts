export interface Theme {
  primaryColor: string;
  secondaryColor: string;
  lightGrey: string;
  white: string;
}

export interface WithTheme {
  theme: Theme;
}

export const theme: Theme = {
  lightGrey: '#d7dcdf',
  primaryColor: '#1abc9c',
  secondaryColor: '#2c3e50',
  white: '#fff',
};
