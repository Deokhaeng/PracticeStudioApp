import React, { useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { Spacer, Typo, CheckToggle, AlertModal } from '@components/common';
import { LearningStateType, VideoContentsPropsType } from '~types/videoTypes';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~types/navigationTypes';
import useVideos from '@hooks/video/useVideos';

const VideoContent = {
  Box: styled.TouchableOpacity<{ screenWidth: number }>(({ screenWidth }) => ({
    width: screenWidth / 2 - 24,
    marginHorizontal: 7,
  })),
  Image: styled.Image<{ screenWidth: number }>(({ screenWidth }) => ({
    height: screenWidth / 3.5,
    width: screenWidth / 2 - 24,
    borderRadius: 4,
  })),
  Title: styled.View({
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  }),
  ButtonBox: styled.Pressable({
    position: 'absolute',
    width: 50,
    height: 55,
    right: 0,
    bottom: 15,
    zIndex: 999,
  }),
  Button: styled.TouchableOpacity({}),
  Typo: styled(Typo.Normal_3)<{ screenWidth: number }>(({ screenWidth }) => ({
    fontWeight: 500,
    width: screenWidth / 2 - 48,
  })),
  SubTypo: styled(Typo.Normal_1)(({ theme }) => ({
    color: theme.colors.TEXT_SUB,
    fontWeight: 500,
  })),
};

export default function VideoContents({ video }: VideoContentsPropsType) {
  const navigation = useNavigation<NavigationProps>();
  const { width: screenWidth } = useWindowDimensions();
  const { patchProgressStatus } = useVideos();
  const [learningState, setLearingState] = useState<LearningStateType>('beforeLearned');
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const isChecked = learningState === 'learned' ? true : false;

  const handleLearning = (state: LearningStateType) => {
    setLearingState(state);
  };

  const handleModal = (visible: boolean) => {
    setModalVisible(visible);
  };

  const completeLearning = () => {
    if (learningState === 'beforeLearned') {
      handleLearning('learned');
      patchProgressStatus.mutate({ id: video._id, progressStatus: 1 });
    } else {
      handleLearning('beforeLearned');
      patchProgressStatus.mutate({ id: video._id, progressStatus: 0 });
    }
  };

  useEffect(() => {
    if (video.progress_status === 0) {
      setLearingState('beforeLearned');
    } else {
      setLearingState('learned');
    }
  }, [video.progress_status]);

  return (
    <>
      <VideoContent.Box onPress={() => navigation.push('VideoPlayerScreen', { videoContent: video })} screenWidth={screenWidth}>
        <VideoContent.ButtonBox onPress={() => handleModal(true)} />

        <VideoContent.Image
          source={{
            uri: video.thumbnail,
          }}
          screenWidth={screenWidth}
        />
        <Spacer height={8} />
        <VideoContent.Title>
          <VideoContent.Typo numberOfLines={1} ellipsizeMode="tail" screenWidth={screenWidth}>
            {video.title}
          </VideoContent.Typo>
          <CheckToggle handleToggle={() => {}} checked={isChecked} type="learned" />
        </VideoContent.Title>
        <Spacer height={10} />
        <VideoContent.SubTypo>{video.date}</VideoContent.SubTypo>
        <Spacer height={20} />
      </VideoContent.Box>
      <AlertModal
        alertText={learningState === 'beforeLearned' ? '안무 습득을 완료하셨나요?' : '안무 습득을 아직 못하셨나요?'}
        handleModal={handleModal}
        modalVisible={modalVisible}
        onPress={completeLearning}
        type={learningState}
      />
    </>
  );
}
