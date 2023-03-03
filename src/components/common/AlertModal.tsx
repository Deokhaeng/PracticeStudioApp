import React, { FC } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { AlertModalPropsType, ModalType } from '~types/otherTypes';
import Divider from './Divider';
import Spacer from './Spacer';
import Typo from './Typo';

const Alert = {
  Background: styled.Pressable(({ theme }) => ({
    backgroundColor: theme.colors.BLACK,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  })),
  Box: styled.View<{ type?: ModalType }>(({ theme, type }) => ({
    position: 'absolute',
    backgroundColor: theme.colors.WHITE,
    width: 300,
    height: type && ['save', 'remove'].includes(type) ? 164 : 140,
    top: '50%',
    left: '50%',
    marginTop: type && ['save', 'remove'].includes(type) ? -(164 / 2) : -(140 / 2),
    marginLeft: -(300 / 2),
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  })),
  TopBox: styled.View({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: 300,
    paddingHorizontal: '7%',
  }),
  BottomBox: styled.View(({ theme }) => ({
    flexDirection: 'row',
    backgroundColor: theme.colors.BLACK,
    alignItems: 'center',
    width: '100%',
    height: 54,
    borderBottomLeftRadius: 6,
    borderBottomRightRadius: 6,
  })),
  Button: styled.TouchableOpacity({
    flex: 1,
    alignItems: 'center',
  }),
  Typo: styled(Typo.Normal_4)<{ type?: ModalType }>(({ theme, type }) => ({
    fontWeight: 600,
    color:
      type === 'cancel'
        ? theme.colors.WHITE
        : type === 'remove'
        ? theme.colors.PINK
        : type && ['check', 'save'].includes(type)
        ? theme.colors.SKYBLUE
        : theme.colors.TEXT_DEFAULT,
  })),
  SubTypo: styled(Typo.Normal_3)(({ theme }) => ({
    color: theme.colors.MIDIUMGRAY,
    fontWeight: 600,
  })),
};

const AlertModal: FC<AlertModalPropsType> = ({ alertText, handleModal, setValue, value, type, modalVisible, onPress }) => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        handleModal(false);
      }}
    >
      <Alert.Background
        onPress={() => {
          handleModal(false);
        }}
      />
      {['save', 'remove', 'check', 'learned', 'beforeLearned'].includes(type) && (
        <Alert.Box type={type}>
          <Alert.TopBox>
            <Alert.Typo numberOfLines={1} ellipsizeMode="tail">
              {alertText}
            </Alert.Typo>
            {type === 'save' && (
              <>
                <Spacer height={8} />
                <Alert.SubTypo>위의 동영상을 저장할까요?</Alert.SubTypo>
              </>
            )}
            {type === 'remove' && (
              <>
                <Spacer height={8} />
                <Alert.SubTypo>위의 동영상을 삭제할까요?</Alert.SubTypo>
              </>
            )}
          </Alert.TopBox>
          <Alert.BottomBox>
            {['check', 'save', 'remove', 'learned', 'beforeLearned'].includes(type) ? (
              <>
                <Alert.Button
                  onPress={() => {
                    handleModal(false);
                  }}
                >
                  <Alert.Typo type="cancel">취소</Alert.Typo>
                </Alert.Button>
                <Divider height />
                <Alert.Button
                  onPress={() => {
                    handleModal(false);
                    setValue && setValue(!value);
                    onPress && onPress();
                  }}
                >
                  {['check', 'learned', 'beforeLearned'].includes(type) && <Alert.Typo type="check">확인</Alert.Typo>}
                  {type === 'save' && <Alert.Typo type={type}>저장</Alert.Typo>}
                  {type === 'remove' && <Alert.Typo type={type}>삭제</Alert.Typo>}
                </Alert.Button>
              </>
            ) : (
              <Alert.Button
                onPress={() => {
                  handleModal(false);
                  setValue && setValue(!value);
                }}
              >
                <Alert.Typo type="check">확인</Alert.Typo>
              </Alert.Button>
            )}
          </Alert.BottomBox>
        </Alert.Box>
      )}
    </Modal>
  );
};

export default AlertModal;
