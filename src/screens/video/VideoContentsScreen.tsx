import React, { useCallback, useMemo, useState } from 'react';
import { ScreensLayout } from '@components/common';
import { VideoContents, VideoHeadr } from '@components/video';
import { FlatList } from 'react-native';
import { ProgressType } from '~types/videoTypes';
import { usePagination } from '@hooks/query';
import API from 'api';

export default function VideoContentsScreen() {
  const [onDropdown, setOnDropdown] = useState<boolean>(false);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const progress: ProgressType[] = ['진행중', '완료', '전체'];
  const [index, setIndex] = useState<number>(0);
  const presentStatus: ProgressType = progress[index];
  const { data: videoContents, invalidate, fetchList, status } = usePagination({ callableFC: API.Video.getTest, apiKey: 'videos' });
  const currentVideos = useMemo(() => {
    if (presentStatus === '완료') {
      return videoContents.filter((item) => item.progress_status === 1);
    }
    if (presentStatus === '진행중') {
      return videoContents.filter((item) => item.progress_status === 0);
    }
    return videoContents;
  }, [presentStatus, videoContents]);

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
        data={currentVideos}
        contentContainerStyle={{ padding: 0, margin: 0 }}
        renderItem={({ item }) => <VideoContents video={item} />}
        keyExtractor={(item, index) => `key_${index}`}
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
