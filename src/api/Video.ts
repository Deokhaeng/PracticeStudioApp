import { VideoContentType } from '~types/videoTypes';
import { client } from './client';
import { AxiosResponse } from 'axios';

type ProgressUpsetType = {
  id: string;
  progressStatus: number;
};

const Video = {
  getItem(): Promise<AxiosResponse<VideoContentType[]>> {
    const endpoint = '/videos/1';

    return client.get(endpoint);
  },
  postItem(params: VideoContentType): Promise<AxiosResponse<VideoContentType>> {
    const endpoint = '/videos';

    return client.post(endpoint, params);
  },
  searchItem(params: string): Promise<AxiosResponse<VideoContentType[]>> {
    const endpoint = `/searchVideos?search=${params}`;

    return client.get(endpoint);
  },
  patchProgressStatus(params: ProgressUpsetType): Promise<AxiosResponse<any>> {
    const endpoint = `/progressStatus/${params.id}`;

    return client.put(endpoint, params.progressStatus);
  },
};

export default Video;
