import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();

const ColorsBase = {
  PINK: '#FD3049',
  SKYBLUE: '#18A0FB',
  BLACK: '#1C1B1F',
  WHITE: '#FFF',
  LIGHTGRAY: '#EFEFF0',
  MIDIUMGRAY: '#92979A',
  DARKGRAY: '#686C6E',
};

const theme = {
  colors: {
    ...ColorsBase,
    PRIMARY: ColorsBase.PINK,

    BACKGROUND: ColorsBase.WHITE,

    TEXT_DEFAULT: ColorsBase.BLACK,
    TEXT_SUB: ColorsBase.DARKGRAY,
    TEXT_REVERSE: ColorsBase.WHITE,
  },
  fonts: {
    fontScale: fontScale,
  },
};

declare module 'styled-components/native' {
  export interface DefaultTheme {
    colors: typeof theme.colors;
    fonts: typeof theme.fonts;
  }
}

export default theme;
