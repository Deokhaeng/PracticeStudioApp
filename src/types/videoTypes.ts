export interface VideoContentsPropsType {
  video: Partial<VideoContentType>;
  progressStatus: number;
}

export interface VideoHeaderPropsType {
  value: boolean;
  setValue(): void;
  setProgressStatus(_index: number): void;
}

export interface VideoContentType {
  _id: string;
  videoId: string;
  url: string;
  title: string;
  thumbnail: string;
  description: string;
  date: string;
  progressStatus?: number;
}
