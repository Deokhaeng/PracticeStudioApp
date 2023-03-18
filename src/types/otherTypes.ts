import { ReactNode } from 'react';
import { GestureResponderEvent } from 'react-native';
import { DefaultTheme } from 'styled-components';

export type SpacerPropsType = {
  height: number;
  width: number;
};

export type TypoPropsType = {
  color: string | undefined;
  weight: string | number;
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

export type ModalType = 'cancel' | 'check' | 'save' | 'remove' | 'profile' | 'learned' | 'beforeLearned';

export interface AlertModalPropsType {
  alertText: string;
  type: ModalType;
  modalVisible: boolean;
  setValue?(value: boolean): void;
  value?: boolean;
  modalWidth?: number;
  handleModal: (visible: boolean) => void;
  onPress?: (event?: GestureResponderEvent) => void;
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

export type Integerable = string | number;

export type ResourceType = 'Videos';
