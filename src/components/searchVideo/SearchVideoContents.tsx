import React, { useEffect, useState } from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components/native';
import { SearchVideoContentsType } from '~types/searchVideoTypes';
import { AlertModal, Spacer, Typo } from '@components/common';

const screenWidth = Dimensions.get('window').width;

const SerchVideo = {
  Container: styled.TouchableOpacity(({ theme }) => ({})),
  Box: styled.View({
    paddingHorizontal: 13,
  }),
  Image: styled.Image({
    height: screenWidth / 1.78,
    width: screenWidth,
    borderRadius: 0,
  }),
  Typo: styled(Typo.Normal_4)({
    fontWeight: 500,
  }),
  SubTypo: styled(Typo.Normal_3)(({ theme }) => ({
    color: theme.colors.MIDIUMGRAY,
    fontWeight: 500,
  })),
};

export default function SearchVideoContents({ videoContents }: SearchVideoContentsType) {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [saved, setSaved] = useState<boolean>(false);

  useEffect(() => {
    if (!saved) return;
    console.log('저장');
  }, [saved]);

  return (
    <>
      <SerchVideo.Container onPress={() => setModalVisible(!modalVisible)}>
        <SerchVideo.Image
          source={{
            uri: videoContents?.thumbnail,
          }}
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
      <AlertModal alertText={videoContents?.title} setModalVisible={setModalVisible} modalVisible={modalVisible} setValue={setSaved} value={saved} save />
    </>
  );
}
