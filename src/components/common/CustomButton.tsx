import React from 'react';
import styled from 'styled-components/native';
import { TypoPropsType } from '~types/otherTypes';
import Typo from './Typo';
import { GestureResponderEvent } from 'react-native';

export interface CustomButtonPropsType {
  height: number;
  width: string | number;
  paddingHorizontal: string | number;
  backgroundColor: string;
  color: string;
  border: string;
  borderRadius: number;
  buttontext: string;
  onPress: (event: GestureResponderEvent) => void;
  fontWeight: string | number;
  fontSize: number;
}

const Button = {
  Container: styled.TouchableOpacity<Partial<CustomButtonPropsType>>(({ theme, ...props }) => ({
    height: props.height || 50,
    width: props.width || '100%',
    flexDirection: 'row',
    paddingHorizontal: props.paddingHorizontal,
    backgroundColor: props.backgroundColor || theme.colors.BLACK,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: props.borderRadius || 4,
  })),
  Typo: styled(Typo.Normal_3)<Partial<CustomButtonPropsType & TypoPropsType>>(({ theme, ...props }) => ({
    fontSize: props.fontSize || 16,
    color: props.color || theme.colors.TEXT_REVERSE,
  })),
};

export default function CustomButton(props: Partial<CustomButtonPropsType>) {
  return (
    <Button.Container
      height={props.height}
      width={props.width}
      backgroundColor={props.backgroundColor}
      border={props.border}
      borderRadius={props.borderRadius}
      paddingHorizontal={props.paddingHorizontal}
      onPress={props.onPress}
    >
      <Button.Typo color={props.color} weight={props.fontWeight || 'bold'} fontSize={props.fontSize}>
        {props.buttontext}
      </Button.Typo>
    </Button.Container>
  );
}
