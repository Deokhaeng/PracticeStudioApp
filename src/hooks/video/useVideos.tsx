import { useMutation, useQuery } from '@tanstack/react-query';
import API from 'api';
import videoApi from 'api/Video';

export default function useVideos() {
  const getVideos = useQuery(['videos'], () => API.Video.getItem(), {
    retry: 0,
    onError: (error) => {
      console.log('getVideos_error', error);
    },
    onSuccess: (data) => {
      console.log('data', data);
    },
  });

  const addVideos = useMutation(API.Video.postItem, {
    onError: (error) => {
      console.log('addVideos_error', error);
    },
    onSuccess: (data) => {
      console.log('data', data);
      getVideos.refetch();
    },
  });
  const getSearchVideos = useMutation(API.Video.searchItem, {
    onError: (error) => {
      console.log('getSearchVideos_error', error);
    },
    onSuccess: (data) => {
      console.log('data', data);
    },
  });

  return {
    getVideos,
    addVideos,
    getSearchVideos,
  };
}
