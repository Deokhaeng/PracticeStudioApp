import { PixelRatio } from 'react-native';

const fontScale = PixelRatio.getFontScale();

/**
 * hex color (#ffcb32 ...)에 alpha를 적용합니다.
 * @param color hex color
 * @param opacity 0 ~ 1 사이 값
 */
export function toRGBA(color: string, opacity: number): string {
  const match = color.match(/^#?([0-9a-zA-Z]{3}|[0-9a-zA-Z]{6})$/);
  if (match === null) {
    return color;
  }

  const [, hexColor] = match;

  const pattern = hexColor.length === 3 ? /(.)/g : /(.{2})/g;
  const [r, g, b] = hexColor
    .match(pattern)!
    .map((x) => (x.length === 2 ? x : x + x))
    .map((x) => parseInt(x, 16));

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

const ColorsBase = {
  PINK: '#FD3049',
  SKYBLUE: '#18A0FB',
  BLACK: '#1C1B1F',
  WHITE: '#FFF',
  LIGHTGRAY: '#EFEFF0',
  MIDIUMGRAY: '#92979A',
  DARKGRAY: '#686C6E',
};

export const LightColors = {
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

export const DarkColors = {
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
    colors: typeof LightColors.colors;
    fonts: typeof LightColors.fonts;
  }
}
