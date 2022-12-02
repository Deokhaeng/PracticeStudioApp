import React, { useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { Spacer, Typo, CheckToggle, AlertModal } from '@components/index';
import { VideoContentsPropsType } from '~types/videoTypes';

const windowWidth = Dimensions.get('window').width;

const VideoContent = {
  Box: styled.TouchableOpacity({
    width: windowWidth / 2 - 24,
    marginHorizontal: 7,
  }),
  Image: styled.Image({
    height: windowWidth / 3.5,
    width: windowWidth / 2 - 24,
    borderRadius: 4,
  }),
  Title: styled.View({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  Button: styled.TouchableOpacity({}),
  Typo: styled(Typo.Normal_4)({
    fontWeight: 500,
  }),
  SubTypo: styled(Typo.Normal_1)(({ theme }) => ({
    color: theme.colors.TEXT_SUB,
    fontWeight: 500,
  })),
};

export default function VideoContents({ video }: VideoContentsPropsType) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [learned, setLearned] = useState<boolean>(false);

  return (
    <VideoContent.Box>
      <VideoContent.Image
        source={{
          uri: video.thumbnail,
        }}
      />
      <Spacer height={8} />
      <VideoContent.Title>
        <VideoContent.Typo>{video.title}</VideoContent.Typo>
        <CheckToggle setModalVisible={setModalVisible} modalVisible={modalVisible} value={learned} />
      </VideoContent.Title>
      <Spacer height={10} />
      <VideoContent.SubTypo>{video.date}</VideoContent.SubTypo>
      <Spacer height={20} />
      {!learned && (
        <AlertModal
          alertText={'안무 습득을 완료하셨나요?'}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          setValue={setLearned}
          value={learned}
          check
        />
      )}
      {learned && (
        <AlertModal
          alertText={'안무 습득을 아직 못하셨나요?'}
          setModalVisible={setModalVisible}
          modalVisible={modalVisible}
          setValue={setLearned}
          value={learned}
          check
        />
      )}
    </VideoContent.Box>
  );
}
