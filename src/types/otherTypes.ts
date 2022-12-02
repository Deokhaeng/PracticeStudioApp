import { ReactNode } from 'react';
import { DefaultTheme } from 'styled-components';

export type UseThemeType = () => DefaultTheme;

export type SpacerPropsType = {
  height: number;
  width: number;
};

export type TypoPropsType = {
  color: string | undefined;
  weight: string;
  align: string | number;
};

export type ShadowPropsType = {
  borderRadius: number;
  _isAndroid: boolean;
  children: ReactNode;
};

export interface ScreensLayoutPropsType {
  children: ReactNode;
}

export interface CheckTogglePropsType {
  setValue(value: boolean): void;
  value: boolean;
  setModalVisible(value: boolean): void;
  modalVisible: boolean;
  onPress(): void;
}

export interface AlertModalPropsType {
  cancel: boolean;
  check: boolean;
  save: boolean;
  deletes: boolean;
  alertText: string;
  setModalVisible(value: boolean): void;
  modalVisible: boolean;
  setValue(value: boolean): void;
  value: boolean;
}

export type TextInputBoxProps = {
  borderRadius: number;
  fontWeight: string;
  fontSize: number;
  padding: string;
  width: number | string;
  minWidth: number | string;
  maxWidth: number;
};
