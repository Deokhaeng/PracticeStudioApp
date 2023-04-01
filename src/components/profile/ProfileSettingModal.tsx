import { Typo } from '@components/common';
import { useNavigation } from '@react-navigation/native';
import { FC } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { NavigationProps } from '~types/navigationTypes';

const Alert = {
  Background: styled.Pressable({
    backgroundColor: 'transparent',
    width: '100%',
    height: '100%',
  }),
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

const ProfileSettingModal: FC<{ modalVisible: boolean; handleModalVisible: (visible: boolean) => void; handleEditMode: () => void }> = ({
  modalVisible,
  handleModalVisible,
  handleEditMode,
}) => {
  const navigation = useNavigation<NavigationProps>();

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleModalVisible(false);
      }}
    >
      <Alert.Background
        onPress={() => {
          handleModalVisible(false);
        }}
      />
      <Alert.Box>
        <Alert.Button
          onPress={() => {
            handleModalVisible(false);
            navigation.push('ProfileSettingScreen', {});
          }}
        >
          <Alert.Typo>Account</Alert.Typo>
        </Alert.Button>
        <Alert.Button
          onPress={() => {
            handleModalVisible(false);
            handleEditMode();
          }}
        >
          <Alert.Typo>Edit</Alert.Typo>
        </Alert.Button>
      </Alert.Box>
    </Modal>
  );
};

export default ProfileSettingModal;
