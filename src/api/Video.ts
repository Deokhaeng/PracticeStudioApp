import { VideoContentType } from '~types/videoTypes';
import { client } from './client';

const Video = {
  getItem(): Promise<VideoContentType[]> {
    const endpoint = '/videos';

    return client.get(endpoint);
  },
  postItem(params: any): Promise<VideoContentType[]> {
    const endpoint = '/videos';

    return client.post(endpoint, params);
  },
  searchItem(params: any): Promise<VideoContentType[]> {
    const endpoint = `/searchVideos?search=${params}`;

    return client.get(endpoint);
  },
};

export default Video;
