import React, { FC, useEffect, useState } from 'react';
import { useWindowDimensions } from 'react-native';
import styled from 'styled-components/native';
import { SearchVideoContentsType } from '~types/searchVideoTypes';
import { AlertModal, Spacer, Typo } from '@components/common';
import { usePostMutation } from '@hooks/mutation';
import API from 'api';

const SerchVideo = {
  Container: styled.TouchableOpacity(({ theme }) => ({})),
  Box: styled.View({
    paddingHorizontal: 13,
  }),
  Image: styled.Image<{ screenWidth: number }>(({ screenWidth }) => ({
    height: screenWidth / 1.78,
    width: screenWidth,
    borderRadius: 0,
  })),
  Typo: styled(Typo.Normal_4)({
    fontWeight: 500,
  }),
  SubTypo: styled(Typo.Normal_3)(({ theme }) => ({
    color: theme.colors.MIDIUMGRAY,
    fontWeight: 500,
  })),
};

const SearchVideoContents: FC<SearchVideoContentsType> = ({ videoContents }) => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);
  const { width: screenWidth } = useWindowDimensions();
  const { mutateAsync: addVideos } = usePostMutation(API.Video.postItem, ['videos']);

  const handleModal = (visible: boolean) => {
    setModalVisible(visible);
  };

  useEffect(() => {
    if (!saved) return;
    if (!videoContents) return;
    addVideos({ variables: videoContents });
  }, [saved]);

  return (
    <>
      <SerchVideo.Container onPress={() => setModalVisible(!modalVisible)}>
        <SerchVideo.Image
          source={{
            uri: videoContents?.thumbnail,
          }}
          screenWidth={screenWidth}
        />
        <Spacer height={15} />
        <SerchVideo.Box>
          <SerchVideo.Typo numberOfLines={2} ellipsizeMode="tail">
            {videoContents?.title}
          </SerchVideo.Typo>
          <Spacer height={10} />
          <SerchVideo.SubTypo numberOfLines={1} ellipsizeMode="tail">
            {videoContents?.description}
          </SerchVideo.SubTypo>
        </SerchVideo.Box>
        <Spacer height={20} />
      </SerchVideo.Container>
      <AlertModal alertText={videoContents.title} handleModal={handleModal} modalVisible={modalVisible} setValue={setSaved} value={saved} type="save" />
    </>
  );
};

export default SearchVideoContents;
