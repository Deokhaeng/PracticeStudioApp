import React, { useState } from 'react';
import { Modal, useWindowDimensions } from 'react-native';
import { PopUp } from './DateSettingModal';
import WheelPicker from 'react-native-wheely';
import styled from 'styled-components/native';
import { GenderType } from 'api/Auth';

const WheelPickerBox = styled.View<{ screenWidth: number }>(({ screenWidth }) => ({
  width: screenWidth,
  paddingTop: 30,
}));

interface GendefSettingModalPropsType {
  modalVisible: boolean;
  handleModal: (visible: boolean) => void;
  handleGender: (gender: GenderType) => void;
}

export default function GendefSettingModal({ modalVisible, handleModal, handleGender }: GendefSettingModalPropsType) {
  const { width: screenWidth } = useWindowDimensions();
  const [selectedIndex, setSelectedIndex] = useState<number>(0);

  const genderOptions: GenderType[] = ['남성', '여성', '논바이너리', '답변하고 싶지 않음', '기타'];

  return (
    <Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={() => handleModal(false)}>
      <PopUp.Background onPress={() => handleModal(false)} />
      <PopUp.Container screenWidth={screenWidth}>
        <PopUp.TopBox>
          <PopUp.InnerTopBox>
            <PopUp.TopIcon />
          </PopUp.InnerTopBox>
          <PopUp.InnerBottomBox screenWidth={screenWidth}>
            <PopUp.Button onPress={() => handleModal(false)}>
              <PopUp.Typo cancle>취소</PopUp.Typo>
            </PopUp.Button>
            <PopUp.Button onPress={() => handleGender(genderOptions[selectedIndex])}>
              <PopUp.Typo>완료</PopUp.Typo>
            </PopUp.Button>
          </PopUp.InnerBottomBox>
        </PopUp.TopBox>
        <WheelPickerBox screenWidth={screenWidth}>
          <WheelPicker
            selectedIndex={selectedIndex}
            options={genderOptions}
            onChange={(index: number) => setSelectedIndex(index)}
            containerStyle={{
              width: screenWidth,
            }}
            itemHeight={25}
            itemTextStyle={{ fontSize: 15 }}
            selectedIndicatorStyle={{ backgroundColor: 'transparant' }}
          />
        </WheelPickerBox>
      </PopUp.Container>
    </Modal>
  );
}
