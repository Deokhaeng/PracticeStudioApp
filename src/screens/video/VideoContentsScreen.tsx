import React, { useCallback, useState } from 'react';
import { ScreensLayout } from '@components/common';
import { VideoContents, VideoHeadr } from '@components/video';
import { ScrollView, RefreshControl } from 'react-native';
import styled from 'styled-components/native';
import useVideos from '@hooks/useVideos';

const Video = {
  Box: styled.View({
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    paddingHorizontal: 10,
  }),
};

const dummyVideos = [
  {
    _id: '638e19b7b2a4c32acf5c06d0',
    date: '2022-12-06 01:17:59',
    description: '바쁘다 바빠 현대사회   한번에 모아보는 #올타임레전드 요즘 뜨는 핫클립, 지금 생성 중! #샾잉 ▷ 샾잉 최신 콘텐츠 보러가기 ...',
    progress_status: 1,
    thumbnail: 'https://i.ytimg.com/vi/lTgNQ4b_4H0/hqdefault.jpg',
    title: '[스우파] 👑레전드 싹! 다! 모음.zip👑 이 영상을 전국에 있는 스우파 못 잃어 여러분께 바칩니다｜#올타임레전드 #샾잉',
    url: 'https://www.youtube.com/watch?v=lTgNQ4b_4H0',
    videoId: 'lTgNQ4b_4H0',
  },
  {
    _id: '638e199fb2a4c32acf5c06cf',
    date: '2022-12-06 01:17:35',
    description: '개인적으로 보고 지려서 최소30번씩 돌려본 배틀영상 검색하기 귀찮아서 만들었습니다.',
    progress_status: 0,
    thumbnail: 'https://i.ytimg.com/vi/_o9Qal4e0cY/hqdefault.jpg',
    title: '[스우파] 임팩트 컸던 배틀모음',
    url: 'https://www.youtube.com/watch?v=_o9Qal4e0cY',
    videoId: '_o9Qal4e0cY',
  },
  {
    _id: '638e198cb2a4c32acf5c06ce',
    date: '2022-12-06 01:17:16',
    description: "[스우파/4회] '범접 불가 퍼포먼스' YGX 댄스 비디오 @K-POP 4대 천왕 미션 여성 댄스 크루들의 자존심을 건 춤싸움 〈스트릿 우먼 ...",
    progress_status: 0,
    thumbnail: 'https://i.ytimg.com/vi/a53aJIuQ1ck/hqdefault.jpg',
    title: '[EN/JP] [스우파/4회] &#39;범접 불가 퍼포먼스&#39; YGX 댄스 비디오 @K-POP 4대 천왕 미션#스트릿우먼파이터 | Mnet 210914 방송',
    url: 'https://www.youtube.com/watch?v=a53aJIuQ1ck',
    videoId: 'a53aJIuQ1ck',
  },
];

export default function VideoContentsScreen() {
  const [onDropdown, setOnDropdown] = useState<boolean>(false);
  const { getVideos } = useVideos();
  const { data, refetch, isSuccess } = getVideos;
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [progressStatus, setProgressStatus] = useState<number>(0);
  const videoContents = data ?? [];

  const handleDropdown = () => {
    setOnDropdown(!onDropdown);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await refetch().then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <ScreensLayout>
      <VideoHeadr setValue={handleDropdown} value={onDropdown} setProgressStatus={setProgressStatus} />
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
        {!isSuccess && (
          <Video.Box>
            {dummyVideos.map((video) => (
              <VideoContents video={video} key={video?._id} progressStatus={progressStatus} />
            ))}
          </Video.Box>
        )}
      </ScrollView>
    </ScreensLayout>
  );
}
