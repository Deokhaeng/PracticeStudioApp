import React, { FC, useState } from 'react';
import VideoNoneIcon from '@assets/image/icon-video-none.svg';
import styled from 'styled-components/native';
import SearchIcon from '@assets/image/icon-search.svg';
import { Spacer, TextInputBox, ScreensLayout } from '@components/common';
import { SearchVideoContents } from '@components/searchVideo';
import { ScrollView } from 'react-native';
import { useGetMutation } from '@hooks/mutation';
import API from 'api';

const SearchVideo = {
  Container: styled.View({
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }),
  Box: styled.View(({ theme }) => ({
    flexDirection: 'row',
    backgroundColor: theme.colors.LIGHTGRAY,
    height: 40,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
    marginHorizontal: 20,
  })),
};

const SearchVideoScreen: FC = () => {
  const [videoName, setVideoName] = useState<string>('');
  const { data: searchedVideos = [], mutateAsync: searchVideos, state } = useGetMutation(API.Video.searchItem, ['videos', 'search'], { search: videoName });

  const searchVideo = () => {
    if (!videoName) return;
    searchVideos();
  };

  return (
    <ScreensLayout>
      <Spacer height={15} />
      <SearchVideo.Box>
        <SearchIcon />
        <TextInputBox
          minWidth={'75%'}
          placeholder={'Search Videos'}
          onChangeText={setVideoName}
          value={videoName}
          onSubmitEditing={searchVideo}
          returnKeyType="done"
        />
      </SearchVideo.Box>
      <SearchVideo.Container>
        <Spacer height={20} />
        {state === 'success' ? (
          <ScrollView>
            {searchedVideos.map((video) => (
              <SearchVideoContents videoContents={video} key={video?.videoId} />
            ))}
          </ScrollView>
        ) : (
          <>
            <VideoNoneIcon />
            <Spacer height={55} />
          </>
        )}
      </SearchVideo.Container>
    </ScreensLayout>
  );
};

export default SearchVideoScreen;
