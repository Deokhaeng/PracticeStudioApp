import { ReactNode } from 'react';
import { DefaultTheme } from 'styled-components';

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

export type ToggleType = 'learned' | 'gender';

export interface CheckTogglePropsType {
  setValue?(value: boolean): void;
  value?: boolean;
  checked: boolean;
  handleToggle: (checked: boolean) => void;
  onPress?(): void;
  onColor?: string;
  type: ToggleType;
}

export type ModalType = 'cancel' | 'check' | 'save' | 'remove' | 'profile';

export interface AlertModalPropsType {
  alertText: string;
  type: ModalType;
  modalVisible: boolean;
  setValue(value: boolean): void;
  value: boolean;
  modalWidth?: number;
  handleModal: (visible: boolean) => void;
}

export type TextInputBoxProps = {
  borderRadius: number;
  fontWeight: string;
  fontSize: number;
  padding: string;
  width: number | string;
  minWidth: number | string;
  maxWidth: number;
  backgroundColor: string;
  paddingHorizontal: string | number;
};
