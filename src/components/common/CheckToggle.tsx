import React, { FC } from 'react';
import styled from 'styled-components/native';
import CheckIcon from '@assets/image/icon-check.svg';
import { CheckTogglePropsType } from '~types/otherTypes';
import theme from '@theme/index';

const CheckToggleContainer = styled.TouchableOpacity({
  marginRight: 0,
});

const Chcek = {
  Container: styled.TouchableOpacity({
    marginRight: 0,
  }),
  Circle: styled.View<{ checked: boolean }>(({ theme, checked }) => ({
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: checked ? theme.colors.BLACK : theme.colors.WHITE,
  })),
};

const CheckToggle: FC<CheckTogglePropsType> = ({ value, setValue, checked, handleToggle, onColor, type }) => {
  return (
    <Chcek.Container
      onPress={() => {
        setValue && setValue(!value);
        handleToggle(!checked);
      }}
    >
      {type === 'learned' && <CheckIcon fill={checked ? theme.colors.PRIMARY : theme.colors.LIGHTGRAY} width={20} height={20} />}
      {type === 'gender' && <Chcek.Circle checked={checked} />}
    </Chcek.Container>
  );
};

export default CheckToggle;
