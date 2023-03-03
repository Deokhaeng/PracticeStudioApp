import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import API from 'api';

export default function useVideos() {
  const quaryClient = useQueryClient();
  const getVideos = useQuery(['videos'], () => API.Video.getItem(), {
    retry: 0,
    onError: (error) => {},
    onSuccess: (data) => {},
  });

  const addVideos = useMutation(API.Video.postItem, {
    onError: (error) => {},
    onSuccess: (data) => {
      quaryClient.invalidateQueries(['videos']);
    },
  });

  const getSearchVideos = useMutation(API.Video.searchItem, {
    onError: (error) => {},
    onSuccess: (data) => {},
  });

  const patchProgressStatus = useMutation(API.Video.patchProgressStatus, {
    onError: (error) => {},
    onSuccess: (data) => {},
  });

  return {
    getVideos,
    addVideos,
    getSearchVideos,
    patchProgressStatus,
  };
}
