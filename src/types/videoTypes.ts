export interface VideoContentsPropsType {
  video: VideoContentType;
}

export interface VideoHeaderPropsType {
  value: boolean;
  setValue(): void;
  handleProgress(index: number): void;
  presentStatus: ProgressType;
}

export interface VideoContentType {
  _id: string;
  videoId: string;
  url: string;
  title: string;
  thumbnail: string;
  description: string;
  date: string;
  progress_status: number;
}

export type ProgressType = '진행중' | '완료' | '전체';
export type LearningStateType = 'learned' | 'beforeLearned';
