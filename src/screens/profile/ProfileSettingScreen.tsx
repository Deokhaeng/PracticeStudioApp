import { Spacer, Typo } from '@components/common';
import { useAuth } from '@hooks/auth';
import { useNavigation } from '@react-navigation/native';
import { FC, useEffect } from 'react';
import { SafeAreaView } from 'react-native';
import styled from 'styled-components/native';
import { NavigationProps } from '~types/navigationTypes';
import BackButton from '@assets/image/icon-arrow-back.svg';

const Profile = {
  Container: styled.View(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.LIGHTGRAY,
    padding: 30,
  })),
  Button: styled.TouchableOpacity(({ theme }) => ({
    width: '100%',
    height: 45,
    borderRadius: 4,
    backgroundColor: theme.colors.BACKGROUND,
    justifyContent: 'center',
    alignItems: 'center',
  })),
  Typo: styled(Typo.Normal_3)({}),
};

const Header = {
  Box: styled.View(({ theme }) => ({
    backgroundColor: theme.colors.BLACK,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  })),
  Typo: styled(Typo.Normal_5)(({ theme }) => ({
    fontWeight: 500,
    color: theme.colors.WHITE,
  })),
  BackButton: styled.TouchableOpacity({
    position: 'absolute',
    left: 20,
  }),
};

const ProfileSettingScreen: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { logout, withdraw } = useAuth();

  useEffect(() => {
    if (!withdraw.isSuccess) return;
    navigation.replace('Auth', {});
  }, [withdraw.isSuccess]);

  return (
    <SafeAreaView>
      <Header.Box>
        <Header.BackButton onPress={() => navigation.replace('ProfileScreen', {})}>
          <BackButton />
        </Header.BackButton>
        <Header.Typo>Account</Header.Typo>
      </Header.Box>
      <Profile.Container>
        <Profile.Button onPress={logout}>
          <Profile.Typo>로그아웃</Profile.Typo>
        </Profile.Button>
        <Spacer height={20} />
        <Profile.Button
          onPress={() => {
            withdraw.mutate();
          }}
        >
          <Profile.Typo>회원탈퇴</Profile.Typo>
        </Profile.Button>
      </Profile.Container>
    </SafeAreaView>
  );
};

export default ProfileSettingScreen;
