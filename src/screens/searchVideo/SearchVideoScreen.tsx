import React, { useEffect, useState } from 'react';
import VideoNoneIcon from '@assets/image/icon-video-none.svg';
import styled from 'styled-components/native';
import SearchIcon from '@assets/image/icon-search.svg';
import { Spacer, TextInputBox, ScreensLayout } from '@components/common';
import { SearchVideoContents } from '@components/searchVideo';
import { ScrollView } from 'react-native';
import { VideoContentType } from '~types/videoTypes';
import useVideos from '@hooks/useVideos';

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

const dumyData: any = [
  {
    description: '바쁘다 바빠 현대사회   한번에 모아보는 #올타임레전드 요즘 뜨는 핫클립, 지금 생성 중! #샾잉 ▷ 샾잉 최신 콘텐츠 보러가기 ...',
    thumbnail: 'https://i.ytimg.com/vi/lTgNQ4b_4H0/hqdefault.jpg',
    title: '[스우파] 👑레전드 싹! 다! 모음.zip👑 이 영상을 전국에 있는 스우파 못 잃어 여러분께 바칩니다｜#올타임레전드 #샾잉',
    url: 'https://www.youtube.com/watch?v=lTgNQ4b_4H0',
    videoId: 'lTgNQ4b_4H0',
  },
  {
    description: '개인적으로 보고 지려서 최소30번씩 돌려본 배틀영상 검색하기 귀찮아서 만들었습니다.',
    thumbnail: 'https://i.ytimg.com/vi/_o9Qal4e0cY/hqdefault.jpg',
    title: '[스우파] 임팩트 컸던 배틀모음',
    url: 'https://www.youtube.com/watch?v=_o9Qal4e0cY',
    videoId: '_o9Qal4e0cY',
  },
  {
    description: "[스우파/4회] '범접 불가 퍼포먼스' YGX 댄스 비디오 @K-POP 4대 천왕 미션 여성 댄스 크루들의 자존심을 건 춤싸움 〈스트릿 우먼 ...",
    thumbnail: 'https://i.ytimg.com/vi/a53aJIuQ1ck/hqdefault.jpg',
    title: '[EN/JP] [스우파/4회] &#39;범접 불가 퍼포먼스&#39; YGX 댄스 비디오 @K-POP 4대 천왕 미션#스트릿우먼파이터 | Mnet 210914 방송',
    url: 'https://www.youtube.com/watch?v=a53aJIuQ1ck',
    videoId: 'a53aJIuQ1ck',
  },
];

export default function SearchVideoScreen() {
  const [videoName, setVideoName] = useState<string>('');
  const { getSearchVideos } = useVideos();
  const { data, isSuccess } = getSearchVideos;

  useEffect(() => {
    if (!videoName) return;
    // getSearchVideos.mutate(videoName);
    console.log('videoName', videoName);
  }, [videoName]);

  console.log('data', data);

  return (
    <ScreensLayout>
      <Spacer height={15} />
      <SearchVideo.Box>
        <SearchIcon />
        <TextInputBox minWidth={'75%'} placeholder={'Search Videos'} onChangeText={setVideoName} value={videoName} />
      </SearchVideo.Box>
      <SearchVideo.Container>
        <Spacer height={20} />
        {dumyData?.length !== 0 && dumyData && !videoName ? (
          <ScrollView>
            {dumyData.map((video: VideoContentType) => (
              <SearchVideoContents videoContents={video} key={video?.videoId} />
            ))}
          </ScrollView>
        ) : (
          <>
            <VideoNoneIcon />
            <Spacer height={55} />
          </>
        )}
        {/* {data?.length !== 0 && data && !videoName && isSuccess ? (
          <ScrollView>
            {dumyData.map((video) => (
              <SearchVideoContents videoContents={video} key={video?.videoId} />
            ))}
          </ScrollView>
        ) : (
          <>
            <VideoNoneIcon />
            <Spacer height={55} />
          </>
        )} */}
      </SearchVideo.Container>
    </ScreensLayout>
  );
}
