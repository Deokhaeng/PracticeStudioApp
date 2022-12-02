import React, { useState } from 'react';
import ScreensLayout from '@components/ScreensLayout';
import VideoNoneIcon from '@assets/image/icon-video-none.svg';
import styled from 'styled-components/native';
import SearchIcon from '@assets/image/icon-search.svg';
import { Spacer, TextInputBox } from '@components/index';
import { SearchVideoContents } from '@components/searchVideo';

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

const dummySearchVideoList = [
  {
    id: 1,
    url: '',
    title: 'hihop dance title',
    thumbnail: 'https://i.ytimg.com/vi/exppHlhjp9k/maxresdefault.jpg',
    description: 'String',
  },
  {
    id: 2,
    url: '',
    title: 'hihop dance title2',
    thumbnail: 'https://i.ytimg.com/vi/exppHlhjp9k/maxresdefault.jpg',
    description: 'String',
  },
  {
    id: 3,
    url: '',
    title: 'hihop dance title3',
    thumbnail: 'https://i.ytimg.com/vi/exppHlhjp9k/maxresdefault.jpg',
    description: 'String',
  },
];

export default function SearchVideoScreen() {
  const [videoName, setVideoName] = useState<string>('');

  return (
    <ScreensLayout>
      <Spacer height={15} />
      <SearchVideo.Box>
        <SearchIcon />
        <TextInputBox minWidth={'75%'} placeholder={'Search Videos'} onChangeText={setVideoName} value={videoName} />
      </SearchVideo.Box>
      <SearchVideo.Container>
        {dummySearchVideoList.map((video) => (
          <SearchVideoContents searchVideo={video} key={video.id} />
        ))}
        <VideoNoneIcon />
        <Spacer height={55} />
      </SearchVideo.Container>
    </ScreensLayout>
  );
}
