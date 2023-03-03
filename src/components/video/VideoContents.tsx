import React, { useEffect, useState } from 'react';
import { Dimensions, useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { Spacer, Typo, CheckToggle, AlertModal } from '@components/common';
import { VideoContentsPropsType } from '~types/videoTypes';
import { useNavigation } from '@react-navigation/native';
import { NavigationProps } from '~types/navigationTypes';
import theme from '@theme/index';
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

[
  {
    _id: '63ee1790ede0de3679960923',
    date: '2023-02-16 08:46:24',
    description: "[스우파] 홀리뱅(HolyBang) l '제시 신곡 안무 창작 미션' 대중 평가 크루들의 안무 퍼포먼스 영상을 평가하라! - 평가 기간: 10/6(수) ...",
    progress_status: 0,
    thumbnail: 'https://i.ytimg.com/vi/q6qQbLqw3dQ/hqdefault.jpg',
    title: '[스우파] 홀리뱅(HolyBang) l ‘제시 신곡 안무 창작 미션’ 대중 평가',
    url: 'https://www.youtube.com/watch?v=q6qQbLqw3dQ',
    userEmail: '6rz9snzyn5@privaterelay.appleid.com',
    videoId: 'q6qQbLqw3dQ',
  },
];
type LearningStateType = 'learned' | 'beforeLearned';

export default function VideoContents({ video, progressStatus }: VideoContentsPropsType) {
  const [checked, setChecked] = useState<boolean>(false);
  const navigation = useNavigation<NavigationProps>();
  const { width: screenWidth } = useWindowDimensions();
  const { patchProgressStatus } = useVideos();
  const [learningState, setLearingState] = useState<LearningStateType>('beforeLearned');
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  const handleToggle = (checked: boolean) => {
    setChecked(checked);
  };

  const handleLearning = (state: LearningStateType) => {
    setLearingState(state);
  };

  const handleModal = (visible: boolean) => {
    setModalVisible(visible);
  };

  const completeLearning = () => {
    if (learningState === 'beforeLearned') {
      handleLearning('learned');
      setChecked(true);
      patchProgressStatus.mutate({ id: video._id, progressStatus: 1 });
    } else {
      handleLearning('beforeLearned');
      setChecked(false);
      patchProgressStatus.mutate({ id: video._id, progressStatus: 0 });
    }
  };

  console.log(video);
  //   useEffect(() => {
  // if(progressStatus)
  //   },[video.progressStatus])

  return (
    <>
      <VideoContent.Box onPress={() => navigation.push('VideoPlayerScreen', { videoContent: video })} screenWidth={screenWidth}>
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
          <CheckToggle handleToggle={() => handleModal(true)} checked={checked} type="learned" />
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
