export interface BaseTheme {
  beat: any;

  castButtonWidth: string;
  popupWidth: number;
  popupHeight: number;
  popupWidthPlaying: number;
  popupHeightPlaying: number;
  progressHeight: string;
  textSize: string;
  textSizeLg: string;
}

export interface ColorTheme {
  backgroundColor: string;
  primaryColor: string;
  secondaryColor: string;
  thirdaryColor: string;
  errorColor: string;
  textColor: string;
  spinnerColor: string;
}

export interface WithTheme {
  theme: BaseTheme & ColorTheme;
}
