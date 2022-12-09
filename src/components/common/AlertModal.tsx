import React from 'react';
import { Dimensions, Modal } from 'react-native';
import styled from 'styled-components/native';
import { AlertModalPropsType } from '~types/otherTypes';
import Divider from './Divider';
import Spacer from './Spacer';
import Typo from './Typo';

const screenWidth = Math.round(Dimensions.get('window').width);
const modalWidth = screenWidth - 80;
const modalHeight = screenWidth - 100;

const Alert = {
  Background: styled.Pressable(({ theme }) => ({
    backgroundColor: theme.colors.BLACK,
    width: '100%',
    height: '100%',
    opacity: 0.3,
  })),
  Box: styled.View<Partial<AlertModalPropsType>>(({ theme, save, deletes }) => ({
    position: 'absolute',
    backgroundColor: theme.colors.WHITE,
    width: modalWidth,
    height: save || deletes ? 163 : 139,
    top: '50%',
    left: '50%',
    marginTop: save || deletes ? -(163 / 2) : -(139 / 2),
    marginLeft: -(modalWidth / 2),
    borderRadius: 6,
    justifyContent: 'space-between',
    alignItems: 'center',
  })),
  TopBox: styled.View({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: modalWidth,
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
  Typo: styled(Typo.Normal_4)<Partial<AlertModalPropsType>>(({ theme, cancel, deletes, check, save }) => ({
    fontWeight: 600,
    color: cancel ? theme.colors.WHITE : deletes ? theme.colors.PINK : check || save ? theme.colors.SKYBLUE : theme.colors.TEXT_DEFAULT,
  })),
  SubTypo: styled(Typo.Normal_3)(({ theme }) => ({
    color: theme.colors.MIDIUMGRAY,
    fontWeight: 600,
  })),
};

export default function AlertModal({ alertText, setModalVisible, modalVisible, save, deletes, check, setValue, value }: Partial<AlertModalPropsType>) {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      // presentationStyle={'overFullScreen'}
      onRequestClose={() => {
        setModalVisible && setModalVisible(!modalVisible);
      }}
    >
      <Alert.Background
        onPress={() => {
          setModalVisible && setModalVisible(!modalVisible);
        }}
      />
      <Alert.Box save={save} deletes={deletes}>
        <Alert.TopBox>
          <Alert.Typo numberOfLines={1} ellipsizeMode="tail">
            {alertText}
          </Alert.Typo>
          {save && (
            <>
              <Spacer height={8} />
              <Alert.SubTypo>위의 동영상을 저장할까요?</Alert.SubTypo>
            </>
          )}
          {deletes && (
            <>
              <Spacer height={8} />
              <Alert.SubTypo>위의 동영상을 삭제할까요?</Alert.SubTypo>
            </>
          )}
        </Alert.TopBox>
        <Alert.BottomBox>
          {check || save || deletes ? (
            <>
              <Alert.Button
                onPress={() => {
                  setModalVisible && setModalVisible(!modalVisible);
                }}
              >
                <Alert.Typo cancel>취소</Alert.Typo>
              </Alert.Button>
              <Divider height />
              <Alert.Button
                onPress={() => {
                  setModalVisible && setModalVisible(!modalVisible);
                  setValue && setValue(!value);
                }}
              >
                {check && <Alert.Typo check>확인</Alert.Typo>}
                {save && <Alert.Typo save>저장</Alert.Typo>}
                {deletes && <Alert.Typo deletes>삭제</Alert.Typo>}
              </Alert.Button>
            </>
          ) : (
            <Alert.Button
              onPress={() => {
                setModalVisible && setModalVisible(!modalVisible);
                setValue && setValue(!value);
              }}
            >
              <Alert.Typo check>확인</Alert.Typo>
            </Alert.Button>
          )}
        </Alert.BottomBox>
      </Alert.Box>
    </Modal>
  );
}
