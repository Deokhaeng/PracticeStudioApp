import React, { useCallback, useState } from 'react';
import { ScreensLayout } from '@components/common';
import { VideoContents, VideoHeadr } from '@components/video';
import { FlatList } from 'react-native';
import styled from 'styled-components/native';
import { ProgressType } from '~types/videoTypes';
import { usePagination } from '@hooks/query';
import API from 'api';

const Video = {
  Container: styled.View({
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignContent: 'stretch',
    paddingHorizontal: 10,
  }),
  Box: styled.View({}),
};

export default function VideoContentsScreen() {
  const [onDropdown, setOnDropdown] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const progress: ProgressType[] = ['진행중', '완료', '전체'];
  const [index, setIndex] = useState<number>(0);
  const presentStatus: ProgressType = progress[index];
  const { data: videoContents, invalidate, fetchList } = usePagination({ callableFC: API.Video.getTest, apiKey: 'Videos' });

  const handleProgress = (_index: number) => {
    setIndex(_index);
  };

  const handleDropdown = () => {
    setOnDropdown(!onDropdown);
  };

  const onRefresh = useCallback(async () => {
    setRefreshing(true);

    await invalidate.then(() => {
      setRefreshing(false);
    });
  }, []);

  return (
    <ScreensLayout>
      <VideoHeadr setValue={handleDropdown} value={onDropdown} handleProgress={handleProgress} presentStatus={presentStatus} />
      <FlatList
        numColumns={2}
        style={{ paddingHorizontal: 10, marginTop: 5 }}
        data={videoContents}
        contentContainerStyle={{ padding: 0, margin: 0 }}
        renderItem={({ item }) => (
          <Video.Box key={item._id}>
            {item.progress_status === index && presentStatus !== '전체' && <VideoContents video={item} />}
            {presentStatus === '전체' && <VideoContents video={item} />}
          </Video.Box>
        )}
        keyExtractor={(item) => item._id}
        onEndReached={() => {
          fetchList();
        }}
        onEndReachedThreshold={1}
        refreshing={refreshing}
        onRefresh={onRefresh}
      />
    </ScreensLayout>
  );
}
