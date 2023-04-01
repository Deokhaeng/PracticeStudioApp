import { VideoContentType } from '~types/videoTypes';
import { client } from './client';
import { AxiosResponse } from 'axios';

export interface Paginated<T> {
  /** 전체 리소스 수 */
  total_page: number;
  /** 다음 목록을 가지고 오기 위한 Page */
  next_page: string;
  /** 현재 데이터 */
  results: T[];
}

type ProgressUpsetType = {
  id: string;
  progressStatus: number;
};

type ProgressResponseType = {
  message: string;
};

export interface ListArgs {
  nextPage?: number;
  /** 검색 키워드 */
  search?: string;
}

const Video = {
  getItem(params: ListArgs): Promise<AxiosResponse<VideoContentType[]>> {
    const endpoint = `/videos/${params.nextPage}`;

    return client.get(endpoint);
  },
  getTest(params: ListArgs): Promise<AxiosResponse<Paginated<VideoContentType>>> {
    const endpoint = `/videotest/${params.nextPage}`;

    return client.get(endpoint);
  },
  postItem(params: VideoContentType): Promise<AxiosResponse<VideoContentType>> {
    const endpoint = '/videos';

    return client.post(endpoint, params);
  },
  searchItem(params: ListArgs): Promise<AxiosResponse<VideoContentType[]>> {
    const endpoint = `/searchVideos?search=${params.search}`;

    return client.get(endpoint);
  },
  patchProgressStatus(params: ProgressUpsetType): Promise<AxiosResponse<ProgressResponseType>> {
    const { id, progressStatus } = params;
    const endpoint = `/progressStatus/${id}`;

    return client.put(endpoint, { progressStatus });
  },
};

export default Video;
