import { Spacer, Typo } from '@components/common';
import useYearMonthData from '@hooks/profile/useYearMonthData';
import dayjs from 'dayjs';
import { Dispatch, FC, SetStateAction, useState } from 'react';
import { Modal, useWindowDimensions } from 'react-native';
import WheelPicker from 'react-native-wheely';
import styled from 'styled-components/native';

const PopUp = {
  Background: styled.Pressable({
    flex: 1,
    backgroundColor: 'transparent',
  }),
  Container: styled.View<{ screenWidth: number }>(({ theme, screenWidth }) => ({
    position: 'absolute',
    bottom: 0,
    width: screenWidth,
    height: 228,
    backgroundColor: theme.colors.BACKGROUND,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    shadowColor: theme.colors.BLACK,
    shadowOffset: '0px 10px',
    shadowOpacity: '0.3',
    shadowRadius: 14,
    elevation: '14',
    alignItems: 'center',
  })),
  TopBox: styled.View({
    alignItems: 'center',
  }),
  InnerTopBox: styled.View({
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    width: '100%',
  }),
  InnerBottomBox: styled.View<{ screenWidth: number }>(({ screenWidth }) => ({
    position: 'absolute',
    flexDirection: 'row',
    width: screenWidth,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  })),
  BottomBox: styled.View<{ screenWidth: number }>(({ screenWidth }) => ({
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: screenWidth,
    marginTop: 'auto',
    height: 150,
    paddingBottom: 60,
  })),
  PickerBox: styled.View({
    height: 150,
    width: 60,
  }),
  TopIcon: styled.View(({ theme }) => ({
    width: 50,
    height: 5,
    borderRadius: 5,
    backgroundColor: theme.colors.LIGHTGRAY,
  })),
  Button: styled.TouchableOpacity({
    alignItems: 'center',
    justifyContent: 'center',
    width: 70,
    height: 50,
  }),
  Typo: styled(Typo.Normal_3)<{ cancle?: boolean }>(({ theme, cancle }) => ({
    fontSize: 15,
    color: cancle ? theme.colors.DARKGRAY : theme.colors.TEXT_DEFAULT,
  })),
};

interface DateSettingModalPropsType {
  modalVisible: boolean;
  handleModal: (visible: boolean) => void;
  handleDateOfBirth: (date: string) => void;
}

const DateSettingModal: FC<DateSettingModalPropsType> = ({ modalVisible, handleModal, handleDateOfBirth }) => {
  const [selectedYearIndex, setSelectedYearIndex] = useState<number>(0);
  const [selectedMonthIndex, setSelectedMonthIndex] = useState<number>(0);
  const [selectedDayIndex, setSelectiedDayIndex] = useState<number>(0);
  const { width: screenWidth } = useWindowDimensions();

  const { yearOption, monthOption, dayOption, selectedYear, selectedMonth, selectedDay } = useYearMonthData(
    selectedYearIndex,
    selectedMonthIndex,
    selectedDayIndex
  );

  const handleDate = () => {
    const selectedDate = dayjs()
      .set('year', parseInt(selectedYear, 10))
      .set('month', parseInt(selectedMonth, 10) - 1)
      .set('date', parseInt(selectedDay, 10));

    const selectedDateString = dayjs(selectedDate).format('YYYY-MM-DD');
    handleDateOfBirth(selectedDateString);
    handleModal(false);
  };

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
            <PopUp.Button onPress={handleDate}>
              <PopUp.Typo>완료</PopUp.Typo>
            </PopUp.Button>
          </PopUp.InnerBottomBox>
        </PopUp.TopBox>
        <PopUp.BottomBox screenWidth={screenWidth}>
          <PopUp.PickerBox>
            <WheelPicker
              selectedIndex={selectedYearIndex}
              options={yearOption}
              onChange={(index) => setSelectedYearIndex(index)}
              containerStyle={{
                width: 70,
                height: 120,
              }}
              itemHeight={25}
              itemTextStyle={{ fontSize: 15 }}
              selectedIndicatorStyle={{ backgroundColor: 'transparant' }}
            />
          </PopUp.PickerBox>
          <Spacer width={10} />
          <PopUp.PickerBox>
            <WheelPicker
              selectedIndex={selectedMonthIndex}
              options={monthOption}
              onChange={(index) => setSelectedMonthIndex(index)}
              containerStyle={{
                width: 60,
                height: 120,
              }}
              itemHeight={25}
              itemTextStyle={{ fontSize: 15 }}
              selectedIndicatorStyle={{ backgroundColor: 'transparant' }}
            />
          </PopUp.PickerBox>
          <PopUp.PickerBox>
            <WheelPicker
              selectedIndex={selectedDayIndex}
              options={dayOption}
              onChange={(index) => setSelectiedDayIndex(index)}
              containerStyle={{
                width: 60,
                height: 120,
              }}
              itemHeight={25}
              itemTextStyle={{ fontSize: 15 }}
              selectedIndicatorStyle={{ backgroundColor: 'transparant' }}
            />
          </PopUp.PickerBox>
        </PopUp.BottomBox>
      </PopUp.Container>
    </Modal>
  );
};

export default DateSettingModal;
