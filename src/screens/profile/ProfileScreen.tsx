import React, { FC, useEffect, useState } from 'react';
import styled from 'styled-components/native';
import { CheckToggle, CustomButton, Spacer, TextInputBox, Typo } from '@components/common';
import BackButton from '@assets/image/icon-arrow-back.svg';
import EllipseIcon from '@assets/image/icon-ellipse.svg';
import ArrowBottomIcon from '@assets/image/icon-arrow-bottom.svg';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~types/navigationTypes';
import theme from '@theme/index';
import { DateSettingModal, ProfileSettingModal } from '@components/profile';
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
    width: '90%',
    flexDirection: 'row',
    justifyContent: 'space-between',
  }),
  ContentBox: styled.Pressable({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  Typo: styled(Typo.Normal_4)<{ checked: boolean }>(({ theme, checked }) => ({
    fontWeight: 500,
    color: checked ? theme.colors.BLACK : theme.colors.MIDIUMGRAY,
  })),
};

interface GenderStatusType {
  gender: GenderType;
  checked: boolean;
}

const defaultGenderStatus: GenderStatusType[] = [
  { gender: '남성', checked: false },
  { gender: '여성', checked: false },
  { gender: '선택 안함', checked: false },
];

const ProfileScreen: FC = () => {
  const navigation = useNavigation<NavigationProps>();
  const { data: profile } = useGetQuery(API.Auth.getProfile, ['profile']);
  const { mutateAsync: editProfile } = usePatchMutation(API.Auth.putProfile, ['profile']);
  const [name, setName] = useState<string>(profile?.nickname || '');
  const [dateModalVisible, setDateModalVisible] = useState<boolean>(false);
  const [dateOfBirth, setDateOfBirth] = useState<string>(profile?.birth || '');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [editMode, setEditMode] = useState<boolean>(false);
  const [genderStatus, setGenderStatus] = useState<GenderStatusType[]>(defaultGenderStatus);

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
    setGenderStatus((prev) => {
      const current = [...prev];
      current.map((item) => {
        return [item, (item.checked = false)];
      });
      const index = current.findIndex((item) => item.gender === gender);
      current[index].checked = true;

      return current;
    });
  };

  const editProfileState = () => {
    const selectedGender = genderStatus.find((item) => item.checked === true)?.gender;
    editProfile({ nickname: name, birth: dateOfBirth, gender: selectedGender }).then(() => handleEditMode());
  };

  useEffect(() => {
    if (!profile?.gender || !profile.nickname) {
      setEditMode(true);
    }

    if (profile?.gender) {
      handleGender(profile.gender);
    }
  }, [profile]);

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
          <Gender.Box>
            <Gender.InnnerBox>
              {editMode ? (
                genderStatus.map((item, index) => (
                  <Gender.ContentBox key={`gender_${index}`} onPress={() => handleGender(item.gender)}>
                    <CheckToggle handleToggle={() => {}} type="gender" checked={item.checked} />
                    <Spacer width={10} />
                    <Gender.Typo checked={item.checked}>{item.gender}</Gender.Typo>
                  </Gender.ContentBox>
                ))
              ) : (
                <Gender.ContentBox>
                  <CheckToggle handleToggle={() => {}} type="gender" checked={true} />
                  <Spacer width={10} />
                  <Gender.Typo checked={true}>{profile?.gender}</Gender.Typo>
                </Gender.ContentBox>
              )}
            </Gender.InnnerBox>
          </Gender.Box>
          <Spacer height={20} />
          <Profile.Typo title>Date of birth</Profile.Typo>
          <Spacer height={5} />
          {editMode ? (
            <DateOfBirth.Box>
              <Profile.Typo>{dateOfBirth}</Profile.Typo>
              <DateOfBirth.Button onPress={() => setDateModalVisible(true)}>
                <ArrowBottomIcon />
              </DateOfBirth.Button>
            </DateOfBirth.Box>
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
            <CustomButton
              buttontext="확인"
              onPress={() => {
                editProfileState();
              }}
            />
            <Spacer height={20} />
          </>
        ) : (
          <Profile.Typo version>VERSION 0.0.1</Profile.Typo>
        )}
      </Profile.BottomBox>
      <DateSettingModal modalVisible={dateModalVisible} handleModal={handleDateModal} handleDateOfBirth={handleDateOfBirth} />
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
