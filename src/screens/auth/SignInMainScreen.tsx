import React from 'react';
import styled from 'styled-components/native';
import { Spacer, Typo } from '@components/common';
import { useNavigation } from '@react-navigation/native';
import AppleIcon from '@assets/image/icon-apple.svg';
import FacebookIcon from '@assets/image/icon-facebook.svg';
import GoogleIcon from '@assets/image/icon-google.svg';
import KakaoIcon from '@assets/image/icon-kakao.svg';
import isAndroid from '@utils/isAndroid';
import { NavigationProps } from '~types/navigationTypes';
import useAppleAuth from '@hooks/auth/useAppleAuth';
import useAuth from '@hooks/auth/useAuth';
import useKakaoAuth from '@hooks/auth/useKakaoAuth';
import theme from '@theme/index';
// import { LoginManager } from 'react-native-fbsdk-next';

const SignInMain = {
  Container: styled.View(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  })),
  TopBox: styled.View({
    justifyContent: 'center',
    alignItems: 'center',
  }),
  BottomBox: styled.View({
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  }),
  Button: styled.TouchableOpacity({}),
  Typo: styled(Typo.Normal_6)<{ sub?: boolean }>(({ theme, sub }) => ({
    fontWeight: sub ? 'normal' : 600,
    fontSize: sub ? 16 : 26,
    color: sub ? theme.colors.MIDIUMGRAY : theme.colors.TEXT_DEFAULT,
  })),
};

export default function SignInMainScreen() {
  const navigation = useNavigation<NavigationProps>();
  const appleAuth = useAppleAuth();
  const kakaoAuth = useKakaoAuth();
  const { getTpToken } = useAuth();

  const performTPLogin = async (type: 'facebook' | 'kakao' | 'apple' | 'google', tokenPromise: Promise<string | null>) => {
    let token: string | null = null;
    token = await tokenPromise;
    console.log(token);
    if (!token) {
      // Alert.alert('로그인 실패', '외부 서비스 연결에 실패하였습니다.');
      return;
    }
    getTpToken.mutate({ type, token });
  };

  // const facebookLogin = () => {
  //   LoginManager.logInWithPermissions(['public_profile']).then(
  //     function (result) {
  //       if (result.isCancelled) {
  //         console.log('Login cancelled');
  //       } else {
  //         console.log('Login success with permissions: ' + result.grantedPermissions!.toString());
  //       }
  //     },
  //     function (error) {
  //       console.log('Login fail with error: ' + error);
  //     }
  //   );
  // };

  return (
    <SignInMain.Container>
      <SignInMain.TopBox>
        <SignInMain.Typo>Practice Studio</SignInMain.Typo>
        <Spacer height={35} />
        <SignInMain.Typo sub>소셜 로그인</SignInMain.Typo>
      </SignInMain.TopBox>
      <Spacer height={11} />
      <SignInMain.BottomBox>
        <SignInMain.Button onPress={() => performTPLogin('apple', appleAuth())}>
          <AppleIcon fill={theme.colors.BLACK} />
        </SignInMain.Button>
        <Spacer width={11} />
        <SignInMain.Button onPress={() => performTPLogin('kakao', kakaoAuth())}>
          <KakaoIcon />
        </SignInMain.Button>
        <Spacer width={11} />
        {/* <SignInMain.Button onPress={() => facebookLogin()}>
          <FacebookIcon />
        </SignInMain.Button> */}
      </SignInMain.BottomBox>
    </SignInMain.Container>
  );
}
