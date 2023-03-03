import React from 'react';
import styled from 'styled-components/native';
import CheckIcon from '@assets/image/icon-check.svg';
import { CheckTogglePropsType } from '~types/otherTypes';
import useTheme from '@theme/useTheme';

const CheckToggleContainer = styled.TouchableOpacity({
  marginRight: 0,
});

export default function CheckToggle({ value, setValue, modalVisible, setModalVisible }: Partial<CheckTogglePropsType>) {
  const theme = useTheme();

  return (
    <CheckToggleContainer
      onPress={() => {
        setValue && setValue(!value);
        setModalVisible && setModalVisible(!modalVisible);
      }}>
      <CheckIcon fill={value ? theme.colors.PRIMARY : theme.colors.LIGHTGRAY} width={20} height={20} />
    </CheckToggleContainer>
  );
}
