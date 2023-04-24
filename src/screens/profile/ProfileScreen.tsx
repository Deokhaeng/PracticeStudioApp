import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { CustomButton, Spacer, TextInputBox, Typo } from '@components/common';
import BackButton from '@assets/image/icon-arrow-back.svg';
import EllipseIcon from '@assets/image/icon-ellipse.svg';
import ArrowBottomIcon from '@assets/image/icon-arrow-bottom.svg';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~types/navigationTypes';
import theme from '@theme/index';
import { DateSettingModal, GenderSettingModal, ProfileSettingModal } from '@components/profile';
import { GenderType } from 'api/Auth';
import { useGetQuery } from '@hooks/query';
import API from 'api';
import { usePatchMutation } from '@hooks/mutation';

const Profile = {
  Container: styled.SafeAreaView(({ theme }) => ({
    flex: 1,
    backgroundColor: theme.colors.LIGHTGRAY,
    justifyContent: 'space-between',
  })),
  TopBox: styled.View({}),
  BottomBox: styled.View({
    paddingHorizontal: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }),
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
  TypoBox: styled.View(({ theme }) => ({
    height: 40,
    width: '100%',
    borderRadius: 4,
    backgroundColor: theme.colors.BACKGROUND,
    justifyContent: 'center',
    paddingHorizontal: 15,
  })),
  Typo: styled(Typo.Normal_4)<{ title?: boolean; name?: boolean; version?: boolean }>(({ theme, title, name, version }) => ({
    fontWeight: title || name ? 500 : 'normal',
    color: title ? theme.colors.DARKGRAY : version ? theme.colors.MIDIUMGRAY : theme.colors.BLACK,
    width: version ? 'auto' : '100%',
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

const WheelPicker = {
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

const ProfileScreen: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { data: profile, status } = useGetQuery(API.Auth.getProfile, ['profile']);
  const { mutateAsync: editProfile } = usePatchMutation(API.Auth.putProfile, ['profile']);
  const [name, setName] = useState<string>(profile?.nickname || '');
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>(profile?.birth || '');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [genderModalVisible, setGenderModalVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [selectedGender, setSelectedGender] = useState<GenderType | undefined>(profile?.gender || undefined);

  const handleDateOfBirth = (date: string) => {
    setDateOfBirth(date);
  };

  const handleDateModal = (visible: boolean) => {
    setDateModalVisible(visible);
  };

  const handelProfielSettingModal = (visible: boolean) => {
    setModalVisible(visible);
  };

  const handleEditMode = () => {
    setTimeout(() => {
      setEditMode(!editMode);
    }, 100);
  };

  const handleGender = (gender: GenderType) => {
    setSelectedGender(gender);
    setGenderModalVisible(false);
  };

  const editProfileState = () => {
    editProfile({ nickname: name, birth: dateOfBirth, gender: selectedGender }).then(() => handleEditMode());
  };

  useEffect(() => {
    if (['loading', 'error'].includes(status)) return;
    if (!profile?.gender || !profile?.nickname) {
      setEditMode(true);
    }
  }, [status]);

  useEffect(() => {});

  return (
    <Profile.Container>
      <Profile.TopBox>
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
          {editMode ? (
            <TextInputBox
              minWidth={'100%'}
              placeholder={'이름을 입력해 주세요.'}
              onChangeText={setName}
              value={name}
              backgroundColor={theme.colors.BACKGROUND}
              paddingHorizontal={15}
            />
          ) : (
            <Profile.TypoBox>
              <Profile.Typo name>{profile?.nickname}</Profile.Typo>
            </Profile.TypoBox>
          )}
          <Spacer height={20} />
          <Profile.Typo title>Gender</Profile.Typo>
          <Spacer height={11} />
          {editMode ? (
            <WheelPicker.Box>
              <Profile.Typo>{selectedGender}</Profile.Typo>
              <WheelPicker.Button onPress={() => setGenderModalVisible(true)}>
                <ArrowBottomIcon />
              </WheelPicker.Button>
            </WheelPicker.Box>
          ) : (
            <Profile.TypoBox>
              <Profile.Typo>{profile?.gender ? profile.gender : '-'}</Profile.Typo>
            </Profile.TypoBox>
          )}
          <Spacer height={20} />
          <Profile.Typo title>Date of birth</Profile.Typo>
          <Spacer height={5} />
          {editMode ? (
            <WheelPicker.Box>
              <Profile.Typo>{dateOfBirth}</Profile.Typo>
              <WheelPicker.Button onPress={() => setDateModalVisible(true)}>
                <ArrowBottomIcon />
              </WheelPicker.Button>
            </WheelPicker.Box>
          ) : (
            <Profile.TypoBox>
              <Profile.Typo>{profile?.birth ? profile.birth : '-'}</Profile.Typo>
            </Profile.TypoBox>
          )}
        </Profile.ContentBox>
      </Profile.TopBox>
      <Profile.BottomBox>
        {editMode ? (
          <>
            <CustomButton buttontext="확인" onPress={() => editProfileState()} />
            <Spacer height={20} />
          </>
        ) : (
          <Profile.Typo version>VERSION 0.0.1</Profile.Typo>
        )}
      </Profile.BottomBox>
      <DateSettingModal modalVisible={dateModalVisible} handleModal={handleDateModal} handleDateOfBirth={handleDateOfBirth} />
      <GenderSettingModal modalVisible={genderModalVisible} handleModal={(visible: boolean) => setGenderModalVisible(visible)} handleGender={handleGender} />
      <ProfileSettingModal
        modalVisible={modalVisible}
        handleModalVisible={handelProfielSettingModal}
        handleEditMode={() => {
          setEditMode(true);
        }}
      />
    </Profile.Container>
  );
};

export default ProfileScreen;
