import React, { useState } from 'react';
import styled from 'styled-components/native';
import ArrowBottomIcon from '@assets/image/icon-arrow-buttom.svg';
import ArrowTopIcon from '@assets/image/icon-arrow-top.svg';
import { Spacer, Typo } from '@components/common';
import { VideoHeaderPropsType } from '~types/videoTypes';

const Header = {
  Container: styled.View({
    height: 30,
    alignItems: 'flex-end',
    justifyContent: 'center',
    zIndex: 1,
  }),
  Button: styled.TouchableOpacity({
    paddingHorizontal: 25,
    flexDirection: 'row',
    alignItems: 'center',
  }),
  ArrowIconBox: styled.View({
    width: 20,
    justifyContent: 'center',
    alignItems: 'flex-end',
  }),
  Typo: styled(Typo.Normal_2)(({ theme }) => ({
    fontWeight: 500,
    color: theme.colors.TEXT_SUB,
  })),
};

const Dropdown = {
  Box: styled.View(({ theme }) => ({
    position: 'absolute',
    top: 27,
    right: 24,
    width: 79,
    height: 90,
    backgroundColor: theme.colors.WHITE,
    borderWidth: 1,
    borderColor: theme.colors.LIGHTGRAY,
    zIndex: 2,
    justifyContent: 'space-evenly',
    paddingLeft: 10,
  })),
  Button: styled.TouchableOpacity({
    height: 24,
    justifyContent: 'center',
  }),
  Typo: styled(Typo.Normal_2)<{ checked?: boolean }>(({ theme, checked }) => ({
    color: checked ? theme.colors.SKYBLUE : theme.colors.MIDIUMGRAY,
    fontWeight: 500,
  })),
};

export default function VideoHeader({ setValue, value, setProgressStatus }: VideoHeaderPropsType) {
  const progress = ['진행중', '완료', '전체'];
  const [index, setIndex] = useState<number>(0);
  const presentStatus: string = progress[index];

  const handleProgress = (_index: number) => {
    setIndex(_index);
    setProgressStatus(_index);
  };

  return (
    <Header.Container>
      <Spacer height={3} />
      <Header.Button onPress={setValue}>
        <Header.Typo>{presentStatus}</Header.Typo>
        <Header.ArrowIconBox>{value ? <ArrowTopIcon /> : <ArrowBottomIcon />}</Header.ArrowIconBox>
      </Header.Button>
      {value && (
        <Dropdown.Box>
          <Dropdown.Button
            onPress={() => {
              handleProgress(0);
              setValue();
            }}
          >
            {presentStatus === '진행중' ? <Dropdown.Typo checked>진행중</Dropdown.Typo> : <Dropdown.Typo>진행중</Dropdown.Typo>}
          </Dropdown.Button>
          <Dropdown.Button
            onPress={() => {
              handleProgress(1);
              setValue();
            }}
          >
            {presentStatus === '완료' ? <Dropdown.Typo checked>완료</Dropdown.Typo> : <Dropdown.Typo>완료</Dropdown.Typo>}
          </Dropdown.Button>
          <Dropdown.Button
            onPress={() => {
              handleProgress(2);
              setValue();
            }}
          >
            {presentStatus === '전체' ? <Dropdown.Typo checked>전체</Dropdown.Typo> : <Dropdown.Typo>전체</Dropdown.Typo>}
          </Dropdown.Button>
        </Dropdown.Box>
      )}
    </Header.Container>
  );
}
