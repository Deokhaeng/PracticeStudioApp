import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { AlertModal, CheckToggle, Spacer, TextInputBox, Typo } from '@components/common';
import BackButton from '@assets/image/icon-arrow-back.svg';
import EllipseIcon from '@assets/image/icon-ellipse.svg';
import ArrowBottomIcon from '@assets/image/icon-arrow-bottom.svg';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~types/navigationTypes';
import theme from '@theme/index';
import { DateSettingModal } from '@components/profile';
import { useAuth } from '@hooks/auth';
import { Modal } from 'react-native';

const Profile = {
  Container: styled.SafeAreaView(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.LIGHTGRAY,
  })),
  ContentBox: styled.View({
    alignItems: 'center',
    paddingTop: 40,
    paddingHorizontal: 30,
  }),
  Image: styled.Image({}),
  Button: styled.TouchableOpacity({
    width: '100%',
    height: 100,
    backgroundColor: 'tomato',
  }),
  Typo: styled(Typo.Normal_4)<{ title?: boolean }>(({ theme, title }) => ({
    fontWeight: title ? 500 : 'normal',
    color: title ? theme.colors.DARKGRAY : theme.colors.BLACK,
    width: '100%',
  })),
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
  EllipseButton: styled.TouchableOpacity({
    position: 'absolute',
    right: 0,
    height: '100%',
    width: 55,
    alignItems: 'center',
    justifyContent: 'center',
  }),
};

const DateOfBirth = {
  Box: styled.View(({ theme }) => ({
    backgroundColor: theme.colors.BACKGROUND,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    paddingLeft: 30,
    paddingRight: 20,
    borderRadius: 4,
    flexDirection: 'row',
  })),
  Button: styled.TouchableOpacity({
    width: 30,
  }),
};

const Gender = {
  Box: styled.View({
    width: '100%',
    paddingLeft: 5,
  }),
  InnnerBox: styled.View({
    width: '60%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  ContentBox: styled.View({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  Typo: styled(Typo.Normal_4)<{ checked: boolean }>(({ theme, checked }) => ({
    fontWeight: 500,
    color: checked ? theme.colors.BLACK : theme.colors.MIDIUMGRAY,
  })),
};

const Alert = {
  Background: styled.Pressable(({ theme }) => ({
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  })),
  Box: styled.View(({ theme }) => ({
    position: 'absolute',
    backgroundColor: theme.colors.WHITE,
    width: 90,
    height: 85,
    top: '11%',
    right: '7%',
    borderRadius: 6,
    justifyContent: 'space-evenly',
  })),
  Button: styled.TouchableOpacity({
    width: '100%',
    padding: 6,
    alignItems: 'center',
  }),
  Typo: styled(Typo.Normal_3)(({ theme }) => ({
    fontWeight: 500,
    color: theme.colors.MIDIUMGRAY,
  })),
};

export type GenderType = 'male' | 'female';

const ProfileScreen: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { getProfile } = useAuth();
  const profile = getProfile.data?.data;
  const [name, setName] = useState<string>(profile?.name || '');
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>('');
  const [checkedMale, setCheckedMale] = useState<boolean>(false);
  const [checkedFemale, setCheckedFemale] = useState<boolean>(false);
  const [checkedGender, setCheckedGender] = useState<GenderType | null>(null);
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  console.log(profile);

  const handleDateOfBirth = (date: string) => {
    setDateOfBirth(date);
  };

  const handleDateModal = (visible: boolean) => {
    setDateModalVisible(visible);
  };

  const handleModal = (visible: boolean) => {
    setModalVisible(visible);
  };

  const handleMale = (checked: boolean) => {
    if (checkedGender === 'male') return;
    setCheckedMale(checked);
    setCheckedFemale(!checked);
    setCheckedGender('male');
  };

  const handleFemale = (checked: boolean) => {
    if (checkedGender === 'female') return;
    setCheckedFemale(checked);
    setCheckedMale(!checked);
    setCheckedGender('female');
  };

  // () => navigation.push('ProfileSettingScreen', {})
  if (true) {
    return (
      <Profile.Container>
        <Header.Box>
          <Header.BackButton onPress={() => navigation.replace('AppMain', {})}>
            <BackButton />
          </Header.BackButton>
          <Header.Typo>Profile</Header.Typo>
          <Header.EllipseButton onPress={() => setModalVisible(true)}>
            <EllipseIcon />
          </Header.EllipseButton>
        </Header.Box>
        <Profile.ContentBox>
          <Profile.Image source={require('../../assets/image/image-profile-default.png')} />
          <Spacer height={30} />
          <Profile.Typo title>Name</Profile.Typo>
          <Spacer height={5} />
          <TextInputBox
            minWidth={'100%'}
            placeholder={'이름을 입력해 주세요.'}
            onChangeText={setName}
            value={name}
            backgroundColor={theme.colors.BACKGROUND}
            paddingHorizontal={15}
          />
          <Spacer height={20} />
          <Profile.Typo title>Gender</Profile.Typo>
          <Spacer height={10} />
          <Gender.Box>
            <Gender.InnnerBox>
              <Gender.ContentBox>
                <CheckToggle handleToggle={handleMale} type="gender" checked={checkedMale} />
                <Spacer width={10} />
                <Gender.Typo checked={checkedMale}>남성</Gender.Typo>
              </Gender.ContentBox>
              <Gender.ContentBox>
                <CheckToggle handleToggle={handleFemale} type="gender" checked={checkedFemale} />
                <Spacer width={10} />
                <Gender.Typo checked={checkedFemale}>여성</Gender.Typo>
              </Gender.ContentBox>
            </Gender.InnnerBox>
          </Gender.Box>
          <Spacer height={20} />
          <Profile.Typo title>Date of birth</Profile.Typo>
          <Spacer height={5} />
          <DateOfBirth.Box>
            <Profile.Typo>{dateOfBirth}</Profile.Typo>
            <DateOfBirth.Button onPress={() => setModalVisible(true)}>
              <ArrowBottomIcon />
            </DateOfBirth.Button>
          </DateOfBirth.Box>
        </Profile.ContentBox>
        <DateSettingModal modalVisible={dateModalVisible} handleModal={handleDateModal} handleDateOfBirth={handleDateOfBirth} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(false);
          }}
        >
          <Alert.Background
            onPress={() => {
              setModalVisible(false);
            }}
          />
          <Alert.Box>
            <Alert.Button
              onPress={() => {
                setModalVisible(false);
                navigation.push('ProfileSettingScreen', {});
              }}
            >
              <Alert.Typo>Account</Alert.Typo>
            </Alert.Button>
            <Alert.Button>
              <Alert.Typo>Edit</Alert.Typo>
            </Alert.Button>
          </Alert.Box>
        </Modal>
      </Profile.Container>
    );
  }
  return <></>;
};

export default ProfileScreen;
