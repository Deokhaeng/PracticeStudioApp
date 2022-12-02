import React, { useState } from 'react';
import ScreensLayout from '@components/ScreensLayout';
import { VideoContents, VideoHeadr } from '@components/video';
import { ScrollView, Text, TouchableOpacity } from 'react-native';
import styled from 'styled-components/native';

const Video = {
  Box: styled.View({
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    paddingHorizontal: 10,
  }),
};

const dummyVideoList = [
  {
    id: 1,
    url: '',
    title: 'hihop dance title',
    thumbnail: 'https://i.ytimg.com/vi/exppHlhjp9k/maxresdefault.jpg',
    date: '2022 10 27',
    description: 'String',
    progressStatus: 0,
  },
  {
    id: 2,
    url: '',
    title: 'hihop dance title2',
    thumbnail: 'https://i.ytimg.com/vi/exppHlhjp9k/maxresdefault.jpg',
    date: '2022 10 27',
    description: 'String',
    progressStatus: 1,
  },
  {
    id: 3,
    url: '',
    title: 'hihop dance title3',
    thumbnail: 'https://i.ytimg.com/vi/exppHlhjp9k/maxresdefault.jpg',
    date: '2022 10 27',
    description: 'String',
    progressStatus: 0,
  },
];

export default function VideoScreen() {
  const [onDropdown, setOnDropdown] = useState<boolean>(false);

  const handleDropdown = () => {
    setOnDropdown(!onDropdown);
  };

  return (
    <ScreensLayout>
      <VideoHeadr setValue={handleDropdown} value={onDropdown} />
      <ScrollView>
        <Video.Box>
          {dummyVideoList.map((video) => (
            <VideoContents video={video} key={video.id} />
          ))}
        </Video.Box>
      </ScrollView>
    </ScreensLayout>
  );
}
