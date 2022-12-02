import React from 'react';
import styled from 'styled-components/native';
import { Typo } from '@components/index';
import { useNavigation } from '@react-navigation/native';

const SignInMain = {
  Container: styled.View({
    flex: 1,
  }),
  Button: styled.TouchableOpacity({}),
  Typo: styled(Typo.Normal_3)({}),
};

export default function SignInMainScreen({ navigation }: any) {
  // const navigation = useNavigation();

  return (
    <SignInMain.Container>
      <SignInMain.Button onPress={() => navigation.navigate('AppMain', {})}>
        <SignInMain.Typo>SignInMain</SignInMain.Typo>
      </SignInMain.Button>
    </SignInMain.Container>
  );
}
